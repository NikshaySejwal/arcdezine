/**
 * Arcdezine Contact & Qualification Form Handler
 * Handles source attribution, client-side validation, backend forwarding, fail-safe storage, and analytics.
 */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#project-enquiry-form");
  if (!form) return;

  const cfg = window.ARCDEZINE_CONFIG || {};

  // 1. Source attribution tracking
  const params = new URLSearchParams(window.location.search);
  const sourceField = document.querySelector("#lead-source");
  const ctaParam = params.get("cta") || "";
  const sourceParam = params.get("source") || (document.referrer ? new URL(document.referrer, window.location.origin).hostname : "direct");
  
  if (sourceField) {
    sourceField.value = `${sourceParam}${ctaParam ? `:${ctaParam}` : ""}`;
  }

  // Pre-select project type if query string has it (e.g. ?type=villa or ?type=commercial)
  const typeParam = params.get("type");
  if (typeParam && form.projectType) {
    for (let option of form.projectType.options) {
      if (option.value.toLowerCase().includes(typeParam.toLowerCase())) {
        option.selected = true;
        break;
      }
    }
  }

  // 2. Track form_start event on first input interaction
  let formStarted = false;
  form.addEventListener("input", () => {
    if (!formStarted) {
      formStarted = true;
      if (typeof trackEvent === "function") {
        trackEvent("form_start", {
          source: sourceField ? sourceField.value : "unknown",
          page_path: window.location.pathname
        });
      }
    }
  }, { once: true });

  // 3. Form submission handling
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitBtn = form.querySelector("button[type=submit]");
    const errorBox = form.querySelector(".form-error");

    if (errorBox) {
      errorBox.hidden = true;
      errorBox.textContent = "";
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Reviewing brief & sending…";
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data.submittedAt = new Date().toISOString();
    data.referrer = document.referrer;
    data.pageUrl = window.location.href;

    // Attach Web3Forms key if configured
    if (cfg.web3FormsAccessKey && !data.access_key) {
      data.access_key = cfg.web3FormsAccessKey;
    }

    try {
      // Always store locally as offline/audit fail-safe
      try {
        const storedLeads = JSON.parse(localStorage.getItem("arcdezine_leads") || "[]");
        storedLeads.push(data);
        localStorage.setItem("arcdezine_leads", JSON.stringify(storedLeads));
      } catch (storageErr) {
        console.warn("Storage warning:", storageErr);
      }

      // Try sending to the configured formEndpoint or /api/leads
      const targetEndpoint = cfg.formEndpoint || "/api/leads";
      let networkSuccess = false;

      if (targetEndpoint) {
        try {
          const response = await fetch(targetEndpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(data)
          });

          if (response.ok) {
            networkSuccess = true;
          }
        } catch (netErr) {
          console.warn("Endpoint submission attempt note:", netErr.message);
        }
      }

      // Fire analytics conversion event
      if (typeof trackEvent === "function") {
        trackEvent("lead_submit", {
          project_type: data.projectType || "unspecified",
          city: data.city || "unspecified",
          budget_band: data.budget || "Prefer to discuss",
          source: data.source || "direct",
          delivered_online: networkSuccess
        });
      }

      // Store current lead name in sessionStorage for customized thank-you screen
      if (data.name) {
        sessionStorage.setItem("recent_lead_name", data.name);
      }
      if (data.projectType) {
        sessionStorage.setItem("recent_project_type", data.projectType);
      }
      if (data.phone) {
        sessionStorage.setItem("recent_lead_phone", data.phone);
      }

      // Redirect to thank-you page
      window.location.href = `thank-you.html?source=${encodeURIComponent(data.source || "direct")}&type=${encodeURIComponent(data.projectType || "")}`;

    } catch (err) {
      console.error("Submission error:", err);
      if (errorBox) {
        errorBox.textContent = "We encountered a temporary network issue. Please message us directly on WhatsApp below so your enquiry is received immediately.";
        errorBox.hidden = false;
      }
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Request feasibility consultation";
      }
    }
  });
});

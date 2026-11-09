/**
 * Arcdezine WhatsApp URL Builder & Click Tracking
 * Centralizes WhatsApp message generation with safe encoding and event tracking.
 */
function buildWhatsAppUrl({ product, source = "website", project = "" } = {}) {
  const cfg = window.ARCDEZINE_CONFIG || { whatsappNumber: "919899624693" };
  const number = cfg.whatsappNumber;

  let textLines = [];

  if (product) {
    textLines = [
      "Hi Arcdezine,",
      `I am interested in: ${product}`,
      `Source: ${source}`,
      "Please share specifications, material options and next steps."
    ];
  } else if (project) {
    textLines = [
      "Hi Arcdezine,",
      `I want to discuss a project similar to: ${project}`,
      `Source: ${source}`,
      "Please let me know how we can schedule an initial feasibility consultation."
    ];
  } else if (source.includes("contact")) {
    textLines = [
      "Hi Arcdezine,",
      "I submitted / want to submit a project brief for a Delhi NCR space.",
      "Please share your consultation availability."
    ];
  } else {
    textLines = [
      "Hi Arcdezine,",
      "I want to discuss a Delhi NCR design-build project with your team.",
      `Source: ${source}`
    ];
  }

  const message = textLines.join("\n");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

function trackAndOpenWhatsApp(link) {
  if (typeof trackEvent === 'function') {
    trackEvent("whatsapp_click", {
      source: link.dataset.source || "unknown",
      product: link.dataset.product || "",
      project: link.dataset.project || ""
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Bind dynamic whatsapp CTAs
  document.querySelectorAll(".whatsapp-cta, .whatsapp-sticky, a[href*='wa.me']").forEach((link) => {
    const product = link.dataset.product || "";
    const project = link.dataset.project || "";
    const source = link.dataset.source || (link.classList.contains("whatsapp-sticky") ? "floating_button" : "website");

    // Only rebuild link if it does not already have an explicit encoded query or has data attributes
    const currentHref = link.getAttribute("href") || "";
    if (!currentHref.includes("text=") || product || project || link.dataset.autoWa === "true") {
      link.href = buildWhatsAppUrl({ product, source, project });
    }
    link.target = "_blank";
    link.rel = "noopener";
  });

  // Track all wa.me clicks
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href*='wa.me']");
    if (link) {
      trackAndOpenWhatsApp(link);
    }
  });
});


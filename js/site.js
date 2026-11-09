/**
 * Arcdezine Shared Site Utilities
 * Handles navigation interactivity, mobile menus, accessibility, and scroll effects.
 */
document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Interactivity (supports both #menu-btn and #hamburgerMenu)
  const menuBtn = document.getElementById("menu-btn") || document.getElementById("hamburgerMenu");
  const mobileMenu = document.getElementById("mobile-menu") || document.getElementById("mobileNavMenu");

  if (menuBtn && mobileMenu) {
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-controls", mobileMenu.id);
    menuBtn.addEventListener("click", () => {
      const isHidden = mobileMenu.classList.toggle("hidden");
      menuBtn.setAttribute("aria-expanded", (!isHidden).toString());
    });
  }

  // 2. Dynamic Footer Year
  const yearSpans = document.querySelectorAll("#currentYear, .footer-year");
  const currentYear = new Date().getFullYear();
  yearSpans.forEach(span => {
    span.textContent = currentYear;
  });

  // 3. Scroll Reveal Animations
  const revealElements = document.querySelectorAll(".reveal");
  if (revealElements.length > 0 && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add("visible"));
  }

  // 4. Keyboard accessibility: Close mobile nav on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu && !mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.add("hidden");
      if (menuBtn) menuBtn.focus();
    }
  });
});


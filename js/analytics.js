/**
 * Arcdezine Analytics & Conversion Event Bus
 * Dispatches structured events to dataLayer, GA4 (gtag), and debug console.
 */
window.dataLayer = window.dataLayer || [];

function trackEvent(name, params = {}) {
  const payload = {
    event: name,
    page_path: window.location.pathname,
    page_title: document.title,
    timestamp: new Date().toISOString(),
    ...params
  };
  window.dataLayer.push(payload);

  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }

  // Developer debugging aid
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.debug('[Analytics Tracked]', name, payload);
  }
}

// Dynamically initialize GA4 if a real measurement ID is provided
(function initGA4() {
  const cfg = window.ARCDEZINE_CONFIG;
  if (!cfg) return;
  const gaId = cfg.gaMeasurementId;

  if (gaId && !gaId.includes('REPLACE') && gaId !== 'G-MEASUREMENT_ID' && gaId.startsWith('G-')) {
    // Inject official Google Tag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
    document.head.appendChild(script);

    function gtag(){ window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', gaId, {
      send_page_view: true
    });
    console.info('[GA4 Initialized]', gaId);
  }
})();

// Global click tracking for conversion-critical actions
document.addEventListener('DOMContentLoaded', () => {
  // Initial page view event
  trackEvent('page_view', {
    page_path: window.location.pathname,
    referrer: document.referrer || 'direct'
  });

  // Delegated click tracker
  document.addEventListener('click', (event) => {
    // 1. Phone link click
    const phoneLink = event.target.closest('a[href^="tel:"]');
    if (phoneLink) {
      trackEvent('phone_click', {
        phone_number: phoneLink.getAttribute('href').replace('tel:', ''),
        source: phoneLink.dataset.source || 'header_or_page'
      });
    }

    // 2. CTA button clicks
    const ctaLink = event.target.closest('.button-primary, .button-secondary, .btn-gold, [data-track-cta]');
    if (ctaLink && !ctaLink.closest('form')) {
      trackEvent('cta_click', {
        text: (ctaLink.innerText || '').trim(),
        href: ctaLink.getAttribute('href') || '',
        source: ctaLink.dataset.source || 'cta_button'
      });
    }

    // 3. Project view click
    const projectCardLink = event.target.closest('a[href*="project-detail.html"], a[href*="/projects/"]');
    if (projectCardLink) {
      const url = new URL(projectCardLink.href, window.location.origin);
      const projectSlug = url.searchParams.get('project') || projectCardLink.pathname.split('/').filter(Boolean).pop() || 'unknown';
      trackEvent('project_view', {
        project_slug: projectSlug,
        source: projectCardLink.dataset.source || 'project_card'
      });
    }

    // 4. External review / portfolio link click
    const reviewLink = event.target.closest('a[data-track="review"], a[data-track="portfolio"]');
    if (reviewLink) {
      trackEvent('review_link_click', {
        url: reviewLink.getAttribute('href') || '',
        label: (reviewLink.innerText || '').trim()
      });
    }
  });
});

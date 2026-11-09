/**
 * Arcdezine Shared Configuration
 * Centralized contact information, brand metadata, and tracking identifiers.
 */
window.ARCDEZINE_CONFIG = {
  brand: "Arcdezine",
  furnitureBrand: "Nishawe",
  phoneDisplay: "+91 98996 24693",
  phoneTel: "+919899624693",
  whatsappNumber: "919899624693",
  email: "arcdezine27@gmail.com",
  instagram: "https://www.instagram.com/arcdezineofficial",
  location: "Sector 48, Gurugram, Haryana",
  address: "3rd Floor, Syndicate Realtors, Arcade-48, Sector 48, Gurugram, Haryana 122001",
  
  // Google Analytics 4 Measurement ID
  // Replace "G-MEASUREMENT_ID" with your real GA4 ID (e.g., "G-ABC123XYZ")
  gaMeasurementId: "G-MEASUREMENT_ID",

  // Lead Form Backend Endpoint:
  // Since GitHub Pages is static, configure a form forwarder endpoint here.
  // Recommended options that forward leads to arcdezine27@gmail.com:
  // 1. Formspree: "https://formspree.io/f/YOUR_FORM_ID"
  // 2. Web3Forms: "https://api.web3forms.com/submit" (requires access_key in form or config)
  // 3. Custom Serverless Function / Cloudflare Worker / Google Apps Script
  formEndpoint: "", 
  
  // Optional Web3Forms Access Key (if using Web3Forms)
  web3FormsAccessKey: "",

  consultationCtaText: "Book a feasibility consultation"
};

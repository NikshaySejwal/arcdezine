import { products } from '../data/products.js';

document.addEventListener('DOMContentLoaded', () => {
    const productsGrid = document.querySelector('.js-products-grid');
    const mainFilterButtons = document.querySelectorAll('.main-filters .filter-btn');
    const subFilterContainers = document.querySelectorAll('.sub-filters > div');

    const getWhatsAppUrl = (name) => {
        if (typeof window.buildWhatsAppUrl === 'function') {
            return window.buildWhatsAppUrl({ product: name, source: 'interior-catalogue' });
        }
        return `https://wa.me/919899624693?text=${encodeURIComponent(`Hi Arcdezine,\nI am interested in: ${name}\nSource: interior-catalogue\nPlease share specifications, material options and next steps.`)}`;
    };

    // 1. Create product cards
    let productsHTML = '';
    products.forEach((product) => {
        if (['kitchen', 'wardrobe', 'vanity'].includes(product.category)) {
            const url = getWhatsAppUrl(product.name);
            productsHTML += `
                <div class="product-card flex flex-col justify-between" data-category="${product.category}" data-subcategory="${product.subcategory}">
                  <div class="product-image">
                    <img src="${product.image}" loading="lazy" alt="${product.name}" class="w-full h-64 object-cover" width="400" height="300">
                  </div>
                  <div class="product-content p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <span class="eyebrow text-xs uppercase mb-1 block">${product.category} · ${product.subcategory || 'custom'}</span>
                      <h3 class="text-xl font-bold text-charcoal mb-2">${product.name || ''}</h3>
                      <p class="text-sm text-gray-600 mb-4 leading-relaxed">${product.description || ''}</p>
                      <div class="text-xs text-gray-500 mb-4 bg-cream p-2.5 rounded-lg border border-gray-100">
                        <strong>Specification:</strong> Custom-built to room dimensions with commercial hardware and written finishes.
                      </div>
                    </div>
                    <a href="${url}" target="_blank" rel="noopener" class="button button-primary whatsapp-cta w-full text-center text-sm" data-product="${product.name}" data-source="interior-catalogue">
                      <i class="fab fa-whatsapp mr-2"></i> Request specification on WhatsApp
                    </a>
                  </div>
                </div>`;
        }
    });

    if (productsGrid) {
        productsGrid.innerHTML = productsHTML;
    }

    const productCards = document.querySelectorAll('.product-card');

    // 2. Filter functionality
    const applyFilter = (category, subcategory) => {
        productCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardSubcategory = card.getAttribute('data-subcategory');

            const showByCategory = (category === 'all' || cardCategory === category);
            const showBySubcategory = (subcategory === 'all' || cardSubcategory === subcategory);

            if (showByCategory && showBySubcategory) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    };

    // 3. Event Listeners for main filters
    mainFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            mainFilterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const mainFilterValue = button.getAttribute('data-filter');

            subFilterContainers.forEach(container => {
                if (container.getAttribute('data-parent-filter') === mainFilterValue) {
                    container.classList.remove('hidden');
                } else {
                    container.classList.add('hidden');
                }
            });

            document.querySelectorAll('.sub-filters .filter-btn').forEach(btn => btn.classList.remove('active'));
            applyFilter(mainFilterValue, 'all');
        });
    });

    // 4. Event Listeners for sub-filters
    document.querySelectorAll('.sub-filters .filter-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const parentContainer = button.closest('[data-parent-filter]');
            const parentFilterValue = parentContainer.getAttribute('data-parent-filter');

            parentContainer.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const subFilterValue = button.getAttribute('data-filter');
            applyFilter(parentFilterValue, subFilterValue);
        });
    });

    // Read URL query parameter for initial filter
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
        const matchingBtn = document.querySelector(`.main-filters .filter-btn[data-filter="${categoryParam}"]`);
        if (matchingBtn) {
            matchingBtn.click();
        } else {
            applyFilter('all', 'all');
        }
    } else {
        applyFilter('all', 'all');
        subFilterContainers.forEach(container => container.classList.add('hidden'));
    }

    // Dynamic track interest on button click
    if (productsGrid) {
        productsGrid.addEventListener('click', (e) => {
            const btn = e.target.closest('.whatsapp-cta');
            if (btn && typeof window.trackEvent === 'function') {
                window.trackEvent('catalogue_item_interest', {
                    product: btn.dataset.product || '',
                    source: 'interior_catalogue'
                });
            }
        });
    }
});

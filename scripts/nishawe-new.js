import { products } from '../data/products.js';

document.addEventListener('DOMContentLoaded', () => {
    const productsGrid = document.querySelector('.js-products-grid');
    const mainFilterButtons = document.querySelectorAll('.main-filters .filter-btn');
    const subFilterContainers = document.querySelectorAll('.sub-filters > div');

    // 1. Create all product cards once and add them to the grid
    let productsHTML = '';
    products.forEach((product) => {
        // Only generate HTML for furniture categories
        if (['chair', 'sofa', 'bed', 'cabinet'].includes(product.category)) {
            const whatsappLink = `https://wa.me/919899624693?text=Hi, I'm interested in the ${product.name}.`;
            productsHTML += `
                <div class="product-card" data-category="${product.category}" data-subcategory="${product.subcategory}">
                  <div class="product-image">
                    <img src="${product.image}" loading="lazy" alt="${product.name}">
                  </div>
                  <div class="product-content">
                    <h3>${product.name || ''}</h3>
                    <p>${product.description || ''}</p>
                    <a href="${whatsappLink}" target="_blank" class="btn-gold mt-4 inline-block">Quote on WhatsApp</a>
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
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    };

    // 3. Event Listeners for main filters
    mainFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Manage active classes for main filters
            mainFilterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const mainFilterValue = button.getAttribute('data-filter');

            // Show/hide relevant sub-filters
            subFilterContainers.forEach(container => {
                if (container.getAttribute('data-parent-filter') === mainFilterValue) {
                    container.classList.remove('hidden');
                } else {
                    container.classList.add('hidden');
                }
            });
            // Reset active class on all sub-filter buttons
            document.querySelectorAll('.sub-filters .filter-btn').forEach(btn => btn.classList.remove('active'));

            // Apply the main filter (showing all subcategories initially)
            applyFilter(mainFilterValue, 'all');
        });
    });

    // 4. Event Listeners for sub-filters
    document.querySelectorAll('.sub-filters .filter-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent main filter click event
            const parentContainer = button.closest('[data-parent-filter]');
            const parentFilterValue = parentContainer.getAttribute('data-parent-filter');

            // Manage active classes within the same sub-filter group
            parentContainer.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const subFilterValue = button.getAttribute('data-filter');

            // Apply the combined filter
            applyFilter(parentFilterValue, subFilterValue);
        });
    });


    // Initial load: show all products and hide all sub-filters
    applyFilter('all', 'all');
    subFilterContainers.forEach(container => container.classList.add('hidden'));

    // --- Hamburger Menu Functionality ---
    const hamburger = document.getElementById('hamburgerMenu');
    const mobileNav = document.getElementById('mobileNavMenu');

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', function() {
            mobileNav.classList.toggle('hidden');
        });
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.add('hidden');
            });
        });
    }
});

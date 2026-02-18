import { products } from '../data/products.js';

document.addEventListener('DOMContentLoaded', () => {
    const productsGrid = document.querySelector('.js-products-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // 1. Create all product cards once
    let productsHTML = '';
    products.forEach((product) => {
        // Only generate HTML for furniture categories
        if (['chair', 'sofa', 'bed', 'cabinet'].includes(product.category)) {
            const whatsappLink = `https://wa.me/919899731201?text=Hi, I'm interested in the ${product.name}.`;
            productsHTML += `
                <div class="product-card" data-category="${product.category}">
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

    // 2. Main filter functionality (hide and show)
    const applyFilter = (filter) => {
        productCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const showCard = (filter === 'all' || cardCategory === filter);

            if (showCard) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    };

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filterValue = button.getAttribute('data-filter');
            applyFilter(filterValue);
        });
    });

    // Initial load
    applyFilter('all');

    // --- Hamburger Menu Functionality (copied from interior.js) ---
    const hamburger = document.getElementById('hamburgerMenu');
    const mobileNav = document.getElementById('mobileNavMenu');

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', function() {
            mobileNav.classList.toggle('open');
        });
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('open');
            });
        });
    }
});

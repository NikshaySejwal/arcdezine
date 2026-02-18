import { products } from '../data/products.js';

document.addEventListener('DOMContentLoaded', () => {
    const featuredGrid = document.querySelector('.featured-products-grid');
    const featuredProducts = products.filter(p => p.featured);

    if (featuredGrid && featuredProducts.length > 0) {
        featuredProducts.forEach(product => {
            const productCardHTML = `
            <div class="card-hover overflow-hidden rounded-lg">
                <a href="nishawe.html?category=${product.category}" class="block">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-80 object-cover">
                    <div class="p-4 bg-white">
                        <h3 class="text-lg font-semibold text-charcoal">${product.name}</h3>
                    </div>
                </a>
            </div>
            `;
            featuredGrid.insertAdjacentHTML('beforeend', productCardHTML);
        });
    } 
});

import { products } from '../data/products.js';

let productsHTML='';

products.forEach((product)=>{
    productsHTML+=`
        <div class="product-card" data-category="${product.category}"data-subcategory="${product.subcategory || ''}">
          <div class="product-image">
            <img src="${product.image}">
            
          </div>
          <div class="product-content">
            <h3>${product.name || ''}</h3>
            <p>${product.description || ''}</p>
            
          </div>
        </div>`;
});
document.querySelector('.js-products-grid').innerHTML = productsHTML; 
 

const subFilterDescriptions = {
    'kitchen': 'Discover the endless possibilities with our stunning modular kitchens! Introducing a captivating collection that transforms your culinary space into the heart of your home. With a variety of shapes, stylish accessories, and innovative hardware, each kitchen is designed to inspire creativity and elevate your cooking experience. Embrace the art of customization and bring your dream kitchen to life with us!',


    'l-shape': "Transform your culinary experience with our innovative L-shaped modular kitchen! This design creates a seamless and efficient workspace, allowing you to easily arrange appliances and cabinets along the stylish right-angled walls. Say goodbye to clutter and hello to a kitchen that's as functional as it is beautiful!",


    'u-shape': 'Discover the charm of ultimate U-shaped modular kitchen designs, where ample space invites collaboration and creativity in cooking. This layout not only enhances functionality but also brings a sleek and stylish aesthetic to your culinary haven. With its smart modularity, the U-shaped kitchen showcases a perfect blend of form and function, making it an ideal setting for families and friends to gather and enjoy the art of cooking together.',


    'island': 'Island kitchen designs encourage you to break free from convention! Whether you want to showcase your unique style or create a cozy, functional space, these innovative layouts offer endless possibilities to elevate your home. Embrace creativity and let your kitchen become a stunning centerpiece!',


    'straight': "India's straight modular kitchen design stands out as one of the most practical and stylish layouts ever created. Often referred to as the one-wall kitchen, this design is tailored perfectly for modern living spaces, offering a blend of elegance and functionality that’s ideal for upscale residential areas.",


    'parallel': 'Imagine stepping into a galley or parallel modular kitchen, where efficiency meets style in a sleek, narrow space flanked by two walls and a cozy corridor. This layout is a dream come true for any home chef, as it offers a straightforward design without the hassle of awkward corner cabinets. With everything within easy reach, cooking becomes a delightful experience, and the possibilities in this compact yet functional kitchen are endless!',


    'g-shape': 'Transform your culinary space with a g-shaped modular kitchen design that maximizes every inch for an inviting and spacious atmosphere. The addition of a sleek peninsula not only enhances functionality but also transforms your kitchen into a stylish kitchenette, beautifully framed by three walls of cabinetry. Embrace the perfect blend of practicality and elegance!',

    'wardrobe':"Your wardrobe is more than just storage; it’s the curated gallery of your personal style. We introduce a collection where masterful design meets intuitive function. Each piece is crafted not only to house your garments but to elevate your space with luxurious finishes and thoughtful details. From seamless soft-close drawers to intelligently partitioned spaces, experience the harmony of having a place for everything, beautifully.",

    'hindge-wardrobe':'Get ready to elevate your home with our stunning closet designs! Our hinged wardrobe style stands out as a classic choice, boasting a stylish door that swings open to reveal everything in your collection. While it does require a bit of extra space for those grand openings, the reward is seeing your beautiful accessories and outfits in all their glory. Crafted with meticulous care and precision by top-notch manufacturers, these modern wardrobes come in an exciting array of textures and colors. Transform your space into a masterpiece that reflects your personal style!',

    'sliding-wardrobe':'Elevate your living space with our stunning sliding wardrobes that blend elegance and functionality! With their sleek finishes, these wardrobes not only save valuable space but also display your treasured belongings in a captivating way. Let our expert team inspire you with stylish solutions that will transform your home into a chic haven!',

    'walkin-wardrobe':' Step into a world of luxury with our breathtaking walk-in wardrobes! Our talented architects and designers craft stunning, innovative spaces that seamlessly blend practicality with style. Get ready to transform your everyday routine into an extraordinary experience—your dream wardrobe awaits!',

    'sofa':"It’s more than just a place to sit. It's the heart of your home. It’s the front-row seat for movie marathons, the cozy corner for late-night chats, the imaginary ship in a child's game, and the comfortable silence shared with someone you love. Crafted for connection, its deep, inviting cushions and durable, welcoming fabric are made to handle every moment—from quiet mornings to laughter-filled evenings. This is the gathering place where your favorite stories will be told and memories will be made for years to come.",

    'sectional':'A sectional sofa is the ultimate statement in comfort and configuration. Designed to adapt to your space, it can be arranged in L-shape, U-shape, or custom modular layouts. Ideal for large living rooms, family lounges, or open-plan spaces',

    'recliner':'Sink into relaxation with a recliner sofa. Built-in mechanisms allow you to adjust the backrest and footrest at the touch of a button (or manually), offering the ultimate lounging experience.',

    'loveseat':'A loveseat is a compact two-seater designed for small spaces or cozy corners. Whether used as a stand-alone piece or paired with a larger sofa, it brings warmth and functionality to modern homes.',

    'chaise':'A chaise sofa combines the spacious comfort of a traditional sofa with the graceful extension of a chaise lounge—inviting you to sit, stretch, or sprawl in effortless style. Designed for both lounging and visual impact, it adds a sculptural elegance to living rooms, bedrooms, or reading corners.',

    'bed':"More than just a piece of furniture, it's where your best self is recharged. This isn't just a bed; it's your personal retreat, the launchpad for your most productive days, and the quiet sanctuary where clarity finds you. Every curve, every fiber, is meticulously crafted to deliver an unparalleled experience of restorative rest. Feel the precise support and luxurious embrace that adapts to your unique needs, night after night. This is where the day's demands melt away, replaced by profound tranquility, preparing you to awaken invigorated and ready to conquer tomorrow. Invest in more than sleep; invest in the revitalization of your mind, body, and spirit.",

    'platform-bed':"Dive into modern design with our platform beds, featuring a striking low-profile silhouette and bold architectural lines that speak to the contemporary aficionado. Forget the box spring—experience pure elegance combined with the ultimate in comfort!",
    'storage-bed':"Unlock a world of organized elegance with our storage bed! Seamlessly blending chic style with smart functionality, these beautifully crafted beds offer discreet, integrated storage perfect for everything from chic urban apartments to tranquil villas. Say goodbye to clutter and hello to sophistication!",
    'day-bed':"Elevate your space with the multi-functional allure of our day bed! Whether you're lounging, curling up with a good book, or welcoming guests, this stylish piece brings a touch of grace and practicality to any room. ",

    'vanity':'Toilet Vanities – Modular Collection : Crafted for modern living. Designed to fit your space and style.',

    'single-sink':'Perfect for smaller bathrooms, this vanity offers a seamless sink with closed shutter cabinets for organized, discreet storage.',

    'double-sink':'Designed for shared bathrooms or larger layouts, this piece combines closed storage with open shelf display—ideal for towels, baskets, or décor.',

    'floting-sink':'A clean, wall-mounted design that opens up the floor and enhances space. Great for urban apartments and sleek contemporary interiors.',
    'traditional-sink':'A classic design that combines elegance with functionality. Features a closed cabinet for storage and a timeless aesthetic that complements any bathroom style.',

    'cabinet':"More than just storage, this is where your life finds its place. Our cabinets aren't just built to hold things; they're designed to safeguard your stories, organize your passions, and elevate your everyday. Imagine a space where cherished heirlooms are beautifully displayed, where clutter disappears to reveal calm, and where every item has a purpose and a home. From the satisfying glide of a drawer to the quiet close of a door, every detail invites you to interact, to simplify, and to appreciate the beauty of an organized life. This isn't just a cabinet; it's a curator of your world, transforming chaos into composure, one thoughtfully crafted space at a time.",

    'tv':"It’s more than a screen; it's your portal to new worlds, shared laughter, and unforgettable moments. This TV brings your favorite stories to life with stunning clarity, transforming any room into a vibrant hub of entertainment. From movie nights with loved ones to catching up on the news, it’s designed to connect you to what matters most, brilliantly and beautifully.",


    'side':"More than just a surface, it's where style meets substance in your home. This sideboard isn't just for display; it's a stage for your cherished collections, a quiet home for essentials, and a seamless blend of beauty and utility. Crafted to complement any space, it helps you curate, organize, and tell your unique story, one artful piece at a time.",
    'tall':"More than just a cabinet, this is where your aspirations reach new heights. This tall cabinet isn't just storage; it's a command center for your organization, a display for your cherished achievements, and a seamless blend of striking presence and smart utility. Crafted to draw the eye upwards, it helps you curate, organize, and elevate your space, one thoughtfully designed tier at a time.",


    'puja':"Designed for profound spiritual connection, this Puja cabinet offers a beautiful and respectful home for your sacred practices. Its elegant form and thoughtful compartments create an inspiring focal point for devotion, ensuring every prayer feels grounded and serene.",

    'other-cabinets':"More than just extra room, this is where everyday chaos meets elegant calm. Our storage cabinets are designed to be the unsung heroes of your home, discreetly tucking away clutter while adding practical beauty. From linens to crafts, feel the relief of a perfectly organized space, allowing your rooms to breathe and your mind to relax. It's about making your life simpler, one smart storage solution at a time.",

    'chair':"This isn't merely a place to rest; it's a sculptural statement, an intentional piece designed to engage the eye and inspire conversation. Crafted with a discerning aesthetic in mind, this chair elevates your space, transforming a functional object into a focal point of design. It's for those who appreciate bold lines, innovative materials, and a quiet confidence in their surroundings. More than just furniture, it's an extension of your personal style—a piece that doesn't just fill a room, but defines it.",

    'dining-chair':"It's where everyday meals transform into shared experiences. These chairs hold not just bodies, but the unspoken stories and quiet connections built around your table.",
    'arm-chiar':"Your personal haven for profound comfort and quiet introspection. This piece cradles you, inviting moments of pure tranquility and serene escape.",

    'puffs':" These versatile pieces add spontaneous comfort and a pop of playful style. They're the unexpected seats where casual moments and cozy connections effortlessly unfold.",

    'stool':"It's the dynamic accent that offers flexible seating and a quick surface for life's spontaneous moments. This piece is all about adaptable convenience and understated style."





};






    // Enhanced filter functionality with sub-filters
        const filterButtons = document.querySelectorAll('.filter-btn');
        const subFilters = document.querySelectorAll('.sub-filter');
        const productCards = document.querySelectorAll('.product-card');
        const descriptionBox = document.getElementById('subfilter-description');
        // --- Hamburger Menu Functionality ---
        const hamburger = document.getElementById('hamburgerMenu');
        const mobileNav = document.getElementById('mobileNavMenu');

        if (hamburger && mobileNav) {
            hamburger.addEventListener('click', function() {
                hamburger.classList.toggle('active');
                mobileNav.classList.toggle('open');
                // Removed body.no-scroll toggle as it's no longer a full-screen overlay
            });

            // Close mobile menu when a link is clicked
            mobileNav.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function() {
                    hamburger.classList.remove('active');
                    mobileNav.classList.remove('open');
                });
            });
        }

        // Close mobile menu if window is resized to desktop size
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 768) { // Matches your @media (min-width: 768px) breakpoint
                if (hamburger) hamburger.classList.remove('active');
                if (mobileNav) mobileNav.classList.remove('open');
            }
        });


let currentMainFilter = 'all';
let currentSubFilter = 'all';

// Main filter functionality
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all main filter buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');
        currentMainFilter = filterValue;
        currentSubFilter = 'all'; // Reset sub-filter when main filter changes

        // Hide all sub-filters first
        subFilters.forEach(subFilter => {
            subFilter.style.display = 'none';
        });

        // Show relevant sub-filter if it exists
        const relevantSubFilter = document.querySelector(`[data-parent="${filterValue}"]`);
        if (relevantSubFilter && filterValue !== 'all') {
            relevantSubFilter.style.display = 'block';
            
            // Reset sub-filter buttons to default state
            const subFilterButtons = relevantSubFilter.querySelectorAll('button');
            subFilterButtons.forEach(btn => btn.classList.remove('active'));
        }

        // Apply filtering
        applyFilters();
    });
});

// Sub-filter functionality
subFilters.forEach(subFilter => {
    const subFilterButtons = subFilter.querySelectorAll('button');
    
    subFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all sub-filter buttons in this group
            subFilterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            currentSubFilter = button.getAttribute('data-sub');
            
            // Apply filtering
            applyFilters();
        });
    });
});

// Apply filters function
function applyFilters() {
    productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const cardSubCategory = card.getAttribute('data-subcategory');
        
        let showCard = false;

        if (currentMainFilter === 'all') {
            // Show all products when "All Products" is selected
            showCard = true;
        } else if (cardCategory === currentMainFilter) {
            // Check if sub-filter is applied
            if (currentSubFilter === 'all' || !currentSubFilter) {
                // No sub-filter or "all" sub-filter selected
                showCard = true;
            } else if (cardSubCategory === currentSubFilter) {
                // Sub-filter matches
                showCard = true;
            }
        }

        if (showCard) {
            card.style.display = 'block';
            card.style.opacity = '0';
            setTimeout(() => {
                card.style.opacity = '1';
            }, 50);
        } else {
            card.style.display = 'none';
        }
    });

    // ✅ Generalized way to show descriptions
    if (currentSubFilter !== 'all' && subFilterDescriptions[currentSubFilter]) {
        descriptionBox.textContent = subFilterDescriptions[currentSubFilter];
        descriptionBox.style.display = 'block';
    } else if (subFilterDescriptions[currentMainFilter]) {
        descriptionBox.textContent = subFilterDescriptions[currentMainFilter];
        descriptionBox.style.display = 'block';
    } else {
        descriptionBox.style.display = 'none';
    }
}
// Image popup functionality
document.querySelectorAll('.product-image img').forEach(img => {
    img.addEventListener('click', function() {
        // Create popup if it doesn't exist
        let popup = document.querySelector('.image-popup');
        if (!popup) {
            popup = document.createElement('div');
            popup.className = 'image-popup';
            popup.innerHTML = '<img src="" alt=""><span class="close">&times;</span>';
            popup.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: none;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                cursor: pointer;
            `;
            popup.querySelector('img').style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
            `;
            popup.querySelector('.close').style.cssText = `
                position: absolute;
                top: 20px;
                right: 30px;
                color: white;
                font-size: 40px;
                cursor: pointer;
            `;
            document.body.appendChild(popup);
        }

        // Show popup with clicked image
        const popupImg = popup.querySelector('img');
        popupImg.src = this.src;
        popupImg.alt = this.alt;
        popup.style.display = 'flex';

        // Close popup when clicked
        popup.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    });
});
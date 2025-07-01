import { projects } from '../data/projects.js';

let projectsHTML='';

projects.forEach((project)=>{
    let projectImagesHTML = '';
    // Assuming project.images is an array of image URLs
    project.image.forEach((imageSrc, index) => {
        projectImagesHTML += `
            <img src="${imageSrc}" class="popup-img project-slide ${index === 0 ? 'active' : ''}" alt="${project.name} - Image ${index + 1}">
        `;
    });

    let projectDotsHTML = '';
    if (project.image.length > 1) { // Only show dots if there's more than one image
        for (let i = 0; i < project.image.length; i++) {
            projectDotsHTML += `<span class="project-dot ${i === 0 ? 'active' : ''}" data-image-index="${i}"></span>`;
        }
    }
    projectsHTML+=`
        <div class="project-card" data-category="${project.category}">
          <div class="project-image-carousel project-image">
            <div class="project-image-wrapper">
                    ${projectImagesHTML}
                </div>
                ${project.image.length > 1 ? `
                    <button class="nav-button prev-project">‹</button>
                    <button class="nav-button next-project">›</button>
                    <div class="dots-container project-dots-container">
                        ${projectDotsHTML}
                    </div>
                ` : ''}
            <div class="project-overlay">${project.year}</div>
          </div>
          <div class="project-content">
            <h3>${project.name}</h3>
            <p class="project-description line-clamp" data-full="false">
            ${project.description}</p>

            <button class="read-more-btn">Read More</button>

            <div class="project-meta">
              <div class="location">📍 ${project.location}</div>
              <div class="area">${project.area}</div>
            </div>
          </div>
        </div>`;
});
document.querySelector('.js-projects-grid').innerHTML = projectsHTML; 





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




    // Filter functionality
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        




        // Map a project card element to its current slide index
const projectCarouselStates = new WeakMap(); 
// WeakMap is ideal here because it automatically cleans up entries when the DOM element is removed (e.g., by filtering)

function initializeProjectCarousels() {
    document.querySelectorAll('.project-card').forEach(card => {
        // Initialize current index for each project to 0 if not already set
        if (!projectCarouselStates.has(card)) {
            projectCarouselStates.set(card, 0); 
        }
        updateprojectCarousel(card); // Set initial state
    });
}

    function updateprojectCarousel(projectCardElement) {
        const currentprojectIndex = projectCarouselStates.get(projectCardElement);
        const wrapper = projectCardElement.querySelector('.project-image-wrapper');
        const slides = projectCardElement.querySelectorAll('.project-slide');
        const dots = projectCardElement.querySelectorAll('.project-dot');

        if (!wrapper || slides.length === 0) return; // Exit if no carousel or no slides

        // Move the wrapper to show the current slide
        const offset = -currentprojectIndex * 100;
        wrapper.style.transform = `translateX(${offset}%)`;

        // Update active slide class (useful for CSS transitions like fade-in)
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentprojectIndex);
        });

        // Update active dot class
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentprojectIndex);
        });
    }

    function changeprojectSlide(projectCardElement, direction) {
        const slides = projectCardElement.querySelectorAll('.project-slide');
        
        if (slides.length <= 1) return; // No need to slide if 0 or 1 slide

        let newIndex = projectCarouselStates.get(projectCardElement) + direction;

        if (newIndex >= slides.length) {
            newIndex = 0;
        } else if (newIndex < 0) {
            newIndex = slides.length - 1;
        }

        projectCarouselStates.set(projectCardElement, newIndex);
        updateprojectCarousel(projectCardElement);
    }

    function goToprojectSlide(projectCardElement, index) {
        const slides = projectCardElement.querySelectorAll('.project-slide');
        if (slides.length === 0) return;

        projectCarouselStates.set(projectCardElement, index);
        updateprojectCarousel(projectCardElement);
    }



        filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.6s ease forwards';
            } else {
                card.style.display = 'none';
            }
            });
        });
        });


// Image popup functionality
document.querySelectorAll('.project-image img').forEach(img => {
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


// --- Event Listeners for project Card Carousels (delegated) ---
// These listeners will find the closest .project-card from the clicked button/dot
document.addEventListener('click', (event) => {
    // Handle Next/Prev buttons for individual project cards
    if (event.target.classList.contains('nav-button') && (event.target.classList.contains('prev-project') || event.target.classList.contains('next-project'))) {
        const projectCard = event.target.closest('.project-card'); // Find the parent project card
        if (!projectCard) return; // Should not happen if structure is correct
        
        if (event.target.classList.contains('prev-project')) {
            changeprojectSlide(projectCard, -1);
        } else {
            changeprojectSlide(projectCard, 1);
        }
    }

    // Handle dot clicks for individual project cards
    if (event.target.classList.contains('project-dot')) {
        const projectCard = event.target.closest('.project-card'); // Find the parent project card
        if (!projectCard) return;
        const index = parseInt(event.target.dataset.imageIndex);
        goToprojectSlide(projectCard, index);
    }
});





function setupReadMoreButtons() {
  document.querySelectorAll('.read-more-btn').forEach(button => {
    button.addEventListener('click', () => {
        
      const card = button.closest('.project-content');
      const desc = card.querySelector('.project-description');
      const isExpanded = desc.classList.contains('expanded');
      desc.classList.toggle('expanded');
      desc.classList.toggle('line-clamp');

      button.textContent = isExpanded ? 'Read More' : 'Read Less';
    });
  });

  document.querySelectorAll('.project-description').forEach(desc => {
    const btn = desc.nextElementSibling;
    if (!btn) return;
    const lineHeight = parseFloat(getComputedStyle(desc).lineHeight);
    const lines = desc.scrollHeight / lineHeight;

    if (lines <= 8) {
      btn.style.display = 'none'; // Hide button for short descriptions
    }
  });
}



// --- Initial Setup on DOM Load ---
document.addEventListener('DOMContentLoaded', () => {
    // Initialize carousels after products are rendered
    initializeProjectCarousels(); 
    // Apply initial filters (e.g., if 'all' is default active)
    // applyFilters(); 
    setupReadMoreButtons();
});

        

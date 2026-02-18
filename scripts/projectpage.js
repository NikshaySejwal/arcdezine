document.addEventListener('DOMContentLoaded', () => {

    const projects = [
      {
        name: "Laxmi Shopping Mall",
        category: "commercial",
        location: "Rewari",
        image: [
          "images/projects/shoppingmall/1.jpg",
          "images/projects/shoppingmall/2.jpg",
          "images/projects/shoppingmall/3.jpg"
        ],
        description: "A modern shopping destination in Rewari, featuring a multi-level design with a focus on natural light and open spaces to enhance the retail experience."
      },
      {
        name: "Raghuram Jeweller's",
        category: "showroom",
        location: "Gurgaon",
        image: [
          "images/projects/Raghuramjeweller/VIEW1.jpg",
          "images/projects/Raghuramjeweller/view2.jpg",
          "images/projects/Raghuramjeweller/view3.jpg",
          "images/projects/Raghuramjeweller/view4.jpg",
          "images/projects/Raghuramjeweller/view5.jpg",
          "images/projects/Raghuramjeweller/view6.jpg",
          "images/projects/Raghuramjeweller/view7.jpg",
          "images/projects/Raghuramjeweller/view8.jpg",
          "images/projects/Raghuramjeweller/view9.png",
          "images/projects/Raghuramjeweller/view10.png",
          "images/projects/Raghuramjeweller/view11.png",
          "images/projects/Raghuramjeweller/VIEW12.png"
        ],
        description: "A minimalist and glamorous interior for a jewelry showroom. The color palette is composed of white, grey, and accents of gold, creating a luxurious and inviting atmosphere."
      },
      {
        name: "Modern Luxury Villa",
        category: "villa",
        location: "Nirvana Country, Gurgaon",
        image: [
            "images/projects/manoj_bungalow/1.jpg",
            "images/projects/manoj_bungalow/2.jpg",
            "images/projects/manoj_bungalow/3.jpg",
            "images/projects/manoj_bungalow/4.jpg",
            "images/projects/manoj_bungalow/5.jpg",
            "images/projects/manoj_bungalow/6.jpg",
            "images/projects/manoj_bungalow/7.jpg",
            "images/projects/manoj_bungalow/8.jpg",
            "images/projects/manoj_bungalow/9.jpg",
            "images/projects/manoj_bungalow/10.jpg",
            "images/projects/manoj_bungalow/11.jpg",
            "images/projects/manoj_bungalow/12.jpg",
            "images/projects/manoj_bungalow/13.jpg",
            "images/projects/manoj_bungalow/14.jpg"
        ],
        description: "A stunning modern villa designed for luxury living. This project features spacious interiors, high-end finishes, and a seamless connection between indoor and outdoor spaces."
      }
    ];

    const projectsGrid = document.querySelector('.js-projects-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    if (!projectsGrid) return;

    let lightbox, lightboxImg, lightboxTitle, lightboxDesc, closeLightbox, nextBtn, prevBtn;
    let currentProjectImages = [];
    let currentImageIndex = 0;

    function createLightbox() {
        const lightboxHTML = `
            <div id="project-lightbox" class="fixed inset-0 bg-black/80 z-[200] hidden items-center justify-center p-4">
                <div class="bg-white rounded-lg overflow-hidden max-w-6xl w-full h-[90vh] relative flex flex-col md:flex-row">
                    <button id="close-lightbox" class="absolute top-2 right-4 text-3xl text-charcoal hover:text-gold z-30">&times;</button>
                    <div class="w-full md:w-3/4 h-2/3 md:h-full flex items-center justify-center bg-black relative">
                        <img id="lightbox-img" src="" alt="Lightbox image" class="max-w-full max-h-full object-contain">
                        <button id="lightbox-prev" class="absolute left-4 text-white text-3xl z-20">&lt;</button>
                        <button id="lightbox-next" class="absolute right-4 text-white text-3xl z-20">&gt;</button>
                    </div>
                    <div class="w-full md:w-1/4 h-1/3 md:h-full p-6 overflow-y-auto">
                        <h3 id="lightbox-title" class="text-2xl font-bold"></h3>
                        <div id="lightbox-desc" class="text-charcoal-light mt-4"></div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);

        lightbox = document.getElementById('project-lightbox');
        lightboxImg = document.getElementById('lightbox-img');
        lightboxTitle = document.getElementById('lightbox-title');
        lightboxDesc = document.getElementById('lightbox-desc');
        closeLightbox = document.getElementById('close-lightbox');
        nextBtn = document.getElementById('lightbox-next');
        prevBtn = document.getElementById('lightbox-prev');

        closeLightbox.addEventListener('click', hideLightbox);
        nextBtn.addEventListener('click', showNextImage);
        prevBtn.addEventListener('click', showPrevImage);
        lightbox.addEventListener('click', (e) => { if (e.target === lightbox) hideLightbox(); });
    }

    function showLightbox(project) {
        currentProjectImages = project.image;
        currentImageIndex = 0;
        lightboxTitle.textContent = project.name;
        lightboxDesc.innerHTML = project.description;
        updateLightboxImage();
        lightbox.classList.remove('hidden');
        lightbox.classList.add('flex');
    }

    function hideLightbox() {
        lightbox.classList.add('hidden');
        lightbox.classList.remove('flex');
    }

    function updateLightboxImage() {
        lightboxImg.src = currentProjectImages[currentImageIndex];
        prevBtn.style.display = currentProjectImages.length > 1 ? 'block' : 'none';
        nextBtn.style.display = currentProjectImages.length > 1 ? 'block' : 'none';
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % currentProjectImages.length;
        updateLightboxImage();
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + currentProjectImages.length) % currentProjectImages.length;
        updateLightboxImage();
    }

    function renderProjects(filter = 'all') {
        projectsGrid.innerHTML = '';
        const filteredProjects = (filter === 'all') ? projects : projects.filter(p => p.category.toLowerCase().includes(filter.toLowerCase()));

        filteredProjects.forEach((project) => {
            const originalIndex = projects.indexOf(project);
            const projectCard = `
                <div class="filter-item card-hover overflow-hidden rounded-lg shadow-lg" data-category="${project.category}">
                    <a href="#" class="block cursor-pointer project-trigger" data-project-index="${originalIndex}">
                        <img src="${project.image[0]}" alt="${project.name}" class="w-full h-64 object-cover">
                        <div class="p-4 bg-white">
                           <p class="font-semibold text-lg text-charcoal">${project.name}</p>
                           <p class="text-sm text-gray-600">${project.location || ''}</p>
                        </div>
                    </a>
                </div>`;
            projectsGrid.insertAdjacentHTML('beforeend', projectCard);
        });
    }

    projectsGrid.addEventListener('click', (e) => {
        const trigger = e.target.closest('.project-trigger');
        if (trigger) {
            e.preventDefault();
            const card = trigger.closest('[data-project-index]');
            const projectIndex = parseInt(card.dataset.projectIndex, 10);
            showLightbox(projects[projectIndex]);
        }
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            renderProjects(button.dataset.filter);
        });
    });
    
    // Mobile nav toggle for project page
    const hamburger = document.getElementById('hamburgerMenu');
    const mobileNav = document.getElementById('mobileNavMenu');
    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            mobileNav.classList.toggle('open');
        });
    }

    createLightbox();
    renderProjects();
});

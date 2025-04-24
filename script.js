// JavaScript for interactivity will go here

document.addEventListener('DOMContentLoaded', () => {
    console.log("Website loaded");

    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const navbar = document.getElementById('navbar');

    if (menuBtn && navbar) {
        menuBtn.addEventListener('click', () => {
            navbar.classList.toggle('active');
            // Optional: Change hamburger icon to 'X'
            const icon = menuBtn.querySelector('i');
            if (navbar.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        // Close mobile menu when a link is clicked
        navbar.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', () => {
                if (navbar.classList.contains('active')) {
                    navbar.classList.remove('active');
                     menuBtn.querySelector('i').classList.remove('fa-times');
                     menuBtn.querySelector('i').classList.add('fa-bars');
                }
            });
        });
    }

    // --- Project Filtering --- 
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Set active button
                filterBtns.forEach(el => el.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                // Show/Hide cards
                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filterValue === 'all' || category.includes(filterValue)) {
                        // Check if animation observer exists before trying to unobserve
                        if (window.observer && card.style.display === 'none') {
                             window.observer.unobserve(card); // Stop observing if hidden by filter
                        }
                        card.style.display = 'flex';
                         // If card becomes visible again due to filter, re-observe if observer exists
                         if (window.observer) {
                            window.observer.observe(card);
                         }
                    } else {
                         if (window.observer) {
                              window.observer.unobserve(card); // Stop observing if hidden by filter
                         }
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // --- Project Modals --- 
    const modalTriggers = document.querySelectorAll('.project-modal-trigger');
    const modals = document.querySelectorAll('.modal');
    const closeBtns = document.querySelectorAll('.close-btn');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.getAttribute('data-modal-target');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
            }
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Close modal if clicking outside the content
    window.addEventListener('click', (event) => {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    // --- Smooth Scrolling --- 
    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Check if it's a link to an actual section (not just href="#")
            if (this.hash !== "") {
                e.preventDefault();

                const hash = this.hash;
                const targetElement = document.querySelector(hash);

                if (targetElement) {
                    // Calculate position, considering the sticky header height
                    const headerHeight = document.getElementById('main-header')?.offsetHeight || 0;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });

                    // Optional: Add hash to URL without jumping
                    // history.pushState(null, null, hash);
                }
            }
        });
    });

    // --- Scroll Triggered Animations --- 
    const observerOptions = {
        root: null, // relative to document viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const animationCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    };

    window.observer = new IntersectionObserver(animationCallback, observerOptions);

    // Select elements to animate
    const elementsToAnimate = document.querySelectorAll(
        'section > .container > h2, '
        + '.timeline-item, '
        + '.experience-card, '
        + '.project-card, '
        + '.skill-category, '
        + '.patents-copyrights li, '
        + '.certificate-item, '
        + '.team-experience li, '
        + '.contact-container > *, '
        + '.language-skills' // Add other selectors as needed
    );

    elementsToAnimate.forEach(el => {
        // Only observe elements currently displayed (relevant for filtered projects)
        if (window.getComputedStyle(el).display !== 'none') {
            window.observer.observe(el);
        }
    });

    // Optional: Highlight active nav link based on scroll position
    // (Add this code later if desired)

    // Add other event listeners and functions here (e.g., smooth scroll)
}); 
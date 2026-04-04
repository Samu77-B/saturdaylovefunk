// Header/Navigation Component
// This component creates a reusable header and navigation menu for all pages

(function() {
    'use strict';

    // Header HTML template
    const headerHTML = `
        <!-- Navigation Overlay -->
        <div class="nav-overlay" id="navOverlay"></div>

        <!-- Header -->
        <header>
            <div class="header-bar">
                <div class="header-left">
                    <div class="logo logo-header-brand">
                        <a href="index.html"><img src="SLF-Logo.png" alt="Saturday Love Funk"></a>
                    </div>
                </div>
                <div class="header-sponsors">
                    <span class="logo-sponsor-wink-label">Our Main Sponsors</span>
                    <div class="header-sponsors-logos">
                        <div class="logo-sponsor-wink-wrap">
                            <a href="https://www.winkworth.co.uk/estate-agents/palmers-green" target="_blank" rel="noopener noreferrer"><img src="Sponsor-Wink2.png" alt="Winkworth"></a>
                        </div>
                        <a href="https://www.instagram.com/philanthropylondon/?hl=en" target="_blank" rel="noopener noreferrer"><img src="Sponsor-Phil.png" alt="Philanthropy London" class="logo-sponsor-phil"></a>
                    </div>
                </div>
                <div class="header-actions">
                    <button class="menu-toggle" id="menuToggle" aria-label="Toggle menu">
                        <i class="ri-menu-line"></i>
                    </button>
                </div>
            </div>
            <nav id="mainNav">
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="index.html#about">About</a></li>
                    <li><a href="index.html#lineup">The Line Up</a></li>
                    <li><a href="gallery-2024.html">Gallery</a></li>
                    <li><a href="terms-and-conditions.html">Terms & Conditions</a></li>
                </ul>
                <div class="nav-buttons">
                    <a href="https://urnextevent.com/events/saturday-love-all-dayer-2026" target="_blank" class="btn btn-fill nav-btn">BUY NOW SLF26</a>
                    <a href="index.html#lineup" class="btn nav-btn">The Line Up</a>
                    <a href="index.html#upcoming-events" class="btn nav-btn">Upcoming Events</a>
                </div>
            </nav>
        </header>
    `;

    // Insert header into the page
    function initHeader() {
        const headerContainer = document.getElementById('header-container');
        if (headerContainer) {
            headerContainer.innerHTML = headerHTML;
            
            // Initialize menu functionality after header is inserted
            initMenuToggle();
            initHeaderScroll();
        }
    }

    // Menu toggle functionality
    function initMenuToggle() {
        const menuToggle = document.getElementById('menuToggle');
        const mainNav = document.getElementById('mainNav');
        const navOverlay = document.getElementById('navOverlay');
        
        if (!menuToggle || !mainNav || !navOverlay) return;
        
        function toggleMenu() {
            mainNav.classList.toggle('active');
            navOverlay.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('ri-menu-line');
                icon.classList.add('ri-close-line');
                document.body.style.overflow = 'hidden';
            } else {
                icon.classList.remove('ri-close-line');
                icon.classList.add('ri-menu-line');
                document.body.style.overflow = '';
            }
        }

        function closeMenu() {
            mainNav.classList.remove('active');
            navOverlay.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('ri-close-line');
            icon.classList.add('ri-menu-line');
            document.body.style.overflow = '';
        }
        
        menuToggle.addEventListener('click', toggleMenu);

        // Close menu when clicking on overlay
        navOverlay.addEventListener('click', closeMenu);

        // Close menu when clicking on a link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close menu on Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && mainNav.classList.contains('active')) {
                closeMenu();
            }
        });
    }

    // Header shrink on scroll down
    function initHeaderScroll() {
        let lastScrollTop = 0;
        const header = document.querySelector('header');
        if (!header) return;
        
        const scrollThreshold = 50; // Minimum scroll distance before header shrinks

        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop <= scrollThreshold) {
                // At top of page - enlarge header
                header.classList.remove('scrolled-up');
            } else if (scrollTop > lastScrollTop) {
                // Scrolling down - shrink header
                header.classList.add('scrolled-up');
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeader);
    } else {
        initHeader();
    }
})();


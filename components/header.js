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
                    <a href="https://open.spotify.com/user/31l67ucegyd54r3r3kczdbnoikim?si=b9f49e3e56b34b87" target="_blank" rel="noopener noreferrer" class="header-spotify-link" aria-label="SLF Sound Tracks on Spotify">
                        <i class="ri-spotify-fill" aria-hidden="true"></i>
                        <span class="header-spotify-label">SLF Sound Tracks</span>
                    </a>
                    <button class="menu-toggle" id="menuToggle" aria-label="Toggle menu">
                        <i class="ri-menu-line"></i>
                    </button>
                </div>
            </div>
            <nav id="mainNav">
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="index.html#about">About</a></li>
                    <li><a href="index.html#lineup">Line Up</a></li>
                    <li><a href="index.html#past-lineup">Past Line Up</a></li>
                    <li><a href="index.html#running-order">Running Order</a></li>
                    <li><a href="gallery-2024.html">Gallery</a></li>
                    <li><a href="merch.html">Merch</a></li>
                    <li><a href="https://open.spotify.com/user/31l67ucegyd54r3r3kczdbnoikim?si=b9f49e3e56b34b87" target="_blank" rel="noopener noreferrer">Spotify</a></li>
                    <li><a href="terms-and-conditions.html">Terms & Conditions</a></li>
                </ul>
                <div class="nav-buttons">
                    <a href="https://urnextevent.com/events/saturday-love-funk-the-big-club-night-all-dayer" target="_blank" rel="noopener noreferrer" class="btn btn-fill nav-btn">GET TICKETS</a>
                    <a href="index.html#lineup" class="btn nav-btn">Line Up</a>
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
            initPaySynkCart();
        }
    }

    // PaySynk cart: load once, then move the launcher into the header bar
    function initPaySynkCart() {
        if (!document.getElementById('paysynk-header-cart-style')) {
            const style = document.createElement('style');
            style.id = 'paysynk-header-cart-style';
            style.textContent = [
                '#paysynk-cart-launcher{position:static!important;right:auto!important;bottom:auto!important;z-index:2!important;flex-shrink:0;background:var(--primary-orange,#EE592D)!important;color:#fff!important;border:0!important;border-radius:999px!important;padding:8px 14px!important;font:700 11px MiSans,sans-serif!important;letter-spacing:1px!important;text-transform:uppercase!important;box-shadow:none!important;cursor:pointer;white-space:nowrap;line-height:1.2}',
                '#paysynk-cart-launcher:hover{background:#d4481f!important}',
                '@media (max-width:767px){#paysynk-cart-launcher{padding:7px 10px!important;font-size:10px!important}}'
            ].join('');
            document.head.appendChild(style);
        }

        if (!document.querySelector('script[src*="paysynk.com/cart.js"]')) {
            const script = document.createElement('script');
            script.src = 'https://paysynk.com/cart.js';
            script.async = true;
            script.setAttribute('data-store', 'saturday-love-funk');
            script.setAttribute('data-merchant-id', 'cmsw40218000004kv58tadmc6');
            document.body.appendChild(script);
        }

        function placeLauncher() {
            const launcher = document.getElementById('paysynk-cart-launcher');
            const actions = document.querySelector('.header-actions');
            const menuToggle = document.getElementById('menuToggle');
            if (!launcher || !actions) return false;
            if (launcher.parentElement !== actions) {
                if (menuToggle) {
                    actions.insertBefore(launcher, menuToggle);
                } else {
                    actions.appendChild(launcher);
                }
            }
            return true;
        }

        if (placeLauncher()) return;

        const observer = new MutationObserver(function() {
            if (placeLauncher()) observer.disconnect();
        });
        observer.observe(document.body, { childList: true, subtree: true });
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


// Header/Navigation Component
// This component creates a reusable header and navigation menu for all pages

(function() {
    'use strict';

    // Flip to true when the client's Stripe / PaySynk account is connected.
    const PAYSYNK_SHOP_LIVE = true;
    window.PAYSYNK_SHOP_LIVE = PAYSYNK_SHOP_LIVE;

    if (!document.getElementById('slf-mobile-header-style')) {
        const mobileStyle = document.createElement('style');
        mobileStyle.id = 'slf-mobile-header-style';
        mobileStyle.textContent = [
            '@media (max-width:767px){',
            '.header-sponsors{display:none!important}',
            'header .header-bar{grid-template-columns:1fr auto!important}',
            '.header-left{grid-column:1!important;grid-row:1}',
            '.header-actions{grid-column:2!important;grid-row:1;justify-self:end}',
            '}'
        ].join('');
        document.head.appendChild(mobileStyle);
    }

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
                    <li class="nav-item-merch"><a href="merch.html">Merch</a></li>
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
            if (PAYSYNK_SHOP_LIVE) {
                initPaySynkCart();
            } else {
                const merchItem = headerContainer.querySelector('.nav-item-merch');
                if (merchItem) merchItem.hidden = true;
            }
        }
    }

    // PaySynk cart: load once, move into the header, then show an icon instead of "Cart"
    function initPaySynkCart() {
        if (!document.getElementById('paysynk-header-cart-style')) {
            const style = document.createElement('style');
            style.id = 'paysynk-header-cart-style';
            style.textContent = [
                '#paysynk-cart-launcher{position:relative!important;right:auto!important;bottom:auto!important;z-index:2!important;flex-shrink:0;width:42px;height:42px;display:inline-flex!important;align-items:center;justify-content:center;background:var(--primary-orange,#EE592D)!important;color:#fff!important;border:0!important;border-radius:999px!important;padding:0!important;box-shadow:none!important;cursor:pointer;line-height:1}',
                '#paysynk-cart-launcher:hover{background:#d4481f!important}',
                '#paysynk-cart-launcher .header-cart-icon{font-size:22px;line-height:1}',
                '#paysynk-cart-launcher .header-cart-count{position:absolute;top:-4px;right:-4px;min-width:16px;height:16px;padding:0 4px;border-radius:999px;background:var(--gold,#c9a961);color:#0a0a0a;font:700 10px MiSans,sans-serif;display:flex;align-items:center;justify-content:center;line-height:1}',
                '#paysynk-cart-launcher .header-cart-count[hidden]{display:none!important}',
                '@media (max-width:767px){#paysynk-cart-launcher{width:36px;height:36px}#paysynk-cart-launcher .header-cart-icon{font-size:20px}}',
                '.slf-continue-shopping{width:100%;margin-top:10px;border:1px solid #d4d4d8;background:#fff;border-radius:999px;padding:.7rem 1rem;font:600 14px Outfit,MiSans,system-ui,sans-serif;cursor:pointer;color:#18181b}',
                '.slf-continue-shopping:hover{background:#f4f4f5}',
                '.slf-continue-shopping-wrap{padding:12px 18px 16px}'
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

        function restyleCartButton(launcher) {
            const raw = (launcher.textContent || '').trim();
            const hasIcon = !!launcher.querySelector('.header-cart-icon');
            if (hasIcon && !/^Cart/i.test(raw)) return;

            const match = raw.match(/(\d+)/);
            const n = match ? parseInt(match[1], 10) : 0;
            launcher.innerHTML = '<i class="ri-shopping-cart-2-line header-cart-icon" aria-hidden="true"></i>' +
                '<span class="header-cart-count"' + (n ? '' : ' hidden') + '>' + (n || '') + '</span>';
            launcher.setAttribute('aria-label', n ? 'Open cart, ' + n + ' items' : 'Open cart');
        }

        function watchLauncher(launcher) {
            restyleCartButton(launcher);
            const buttonObserver = new MutationObserver(function() {
                restyleCartButton(launcher);
            });
            buttonObserver.observe(launcher, { childList: true, characterData: true, subtree: true });
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
            if (!launcher.getAttribute('data-slf-cart-watched')) {
                launcher.setAttribute('data-slf-cart-watched', '1');
                watchLauncher(launcher);
            }
            return true;
        }

        function addContinueShopping() {
            const root = document.getElementById('paysynk-cart-root');
            if (!root || root.style.display === 'none') return;
            const aside = root.querySelector('aside');
            if (!aside || aside.querySelector('.slf-continue-shopping')) return;

            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'slf-continue-shopping';
            btn.textContent = 'Continue shopping';
            btn.addEventListener('click', function() {
                if (window.PaySynkCart && typeof window.PaySynkCart.close === 'function') {
                    window.PaySynkCart.close();
                }
            });

            const checkoutBtn = aside.querySelector('[data-ps-checkout]');
            if (checkoutBtn && checkoutBtn.parentElement) {
                checkoutBtn.parentElement.appendChild(btn);
            } else {
                const wrap = document.createElement('div');
                wrap.className = 'slf-continue-shopping-wrap';
                wrap.appendChild(btn);
                aside.appendChild(wrap);
            }
        }

        function watchCartDrawer() {
            function attach() {
                const root = document.getElementById('paysynk-cart-root');
                if (!root || root.getAttribute('data-slf-continue-watched')) return !!root;
                root.setAttribute('data-slf-continue-watched', '1');
                const drawerObserver = new MutationObserver(function() {
                    addContinueShopping();
                });
                drawerObserver.observe(root, { childList: true, subtree: true, attributes: true });
                addContinueShopping();
                return true;
            }

            if (attach()) return;
            const wait = new MutationObserver(function() {
                if (attach()) wait.disconnect();
            });
            wait.observe(document.body, { childList: true, subtree: true });
        }

        if (!placeLauncher()) {
            const observer = new MutationObserver(function() {
                if (placeLauncher()) observer.disconnect();
            });
            observer.observe(document.body, { childList: true, subtree: true });
        }
        watchCartDrawer();
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


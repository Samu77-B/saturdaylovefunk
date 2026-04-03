// Footer Component
// This component creates a reusable footer for all pages

(function() {
    'use strict';

    // Footer HTML template
    const footerHTML = `
        <!-- Footer -->
        <footer>
            <div class="footer-col">
                <div class="logo" style="margin-bottom: 20px;">
                    <img src="SLF-Logo.png" alt="Saturday Love Funk">
                    <a href="https://www.winkworth.co.uk/estate-agents/palmers-green" target="_blank" rel="noopener noreferrer"><img src="Sponsor-Wink.png" alt="Winkworth"></a>
                    <a href="https://www.instagram.com/philanthropylondon/?hl=en" target="_blank" rel="noopener noreferrer"><img src="Sponsor-Phil.png" alt="Philanthropy London" class="logo-sponsor-phil"></a>
                </div>
                <p>Promoter: Saturday Love Funk</p>
                <p>Sponsors: Winkworth &amp; Philanthropy London</p>
            </div>
            <div class="footer-col">
                <h4>Event Details</h4>
                <p>Broomfield Park<br>Palmers Green<br>London N13 4HE</p>
                <p>Summer 2026</p>
            </div>
            <div class="footer-col">
                <h4>Contact</h4>
                <a href="mailto:contact@saturdaylovefunk.com">contact@saturdaylovefunk.com</a>
                <div style="margin-top: 20px; display: flex; gap: 15px;">
                    <a href="https://www.instagram.com/saturdaylovefunk" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i class="ri-instagram-line" style="font-size: 24px;"></i></a>
                    <a href="https://www.youtube.com/@saturdaylovefunk" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i class="ri-youtube-line" style="font-size: 24px;"></i></a>
                </div>
            </div>
        </footer>
        <div class="footer-bottom">
            <p>&copy; 2026 Saturday Love Funk. All Rights Reserved.</p>
            <p>Website designed, built and maintained by <a href="https://paradigmstudio.net/" target="_blank" rel="noopener noreferrer">Paradigm Studio</a></p>
        </div>
    `;

    // Insert footer into the page
    function initFooter() {
        const footerContainer = document.getElementById('footer-container');
        if (footerContainer) {
            footerContainer.innerHTML = footerHTML;
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFooter);
    } else {
        initFooter();
    }
})();


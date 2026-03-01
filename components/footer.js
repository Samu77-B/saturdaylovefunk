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
                    <img src="sfl-winkworth-wht.png" alt="Saturday Love Funk">
                </div>
                <p>Promoter: Saturday Love Funk</p>
                <p>Sponsor: Winkworth</p>
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
                    <a href="#" aria-label="Instagram"><i class="ri-instagram-line" style="font-size: 24px;"></i></a>
                    <a href="#" aria-label="Facebook"><i class="ri-facebook-fill" style="font-size: 24px;"></i></a>
                    <a href="#" aria-label="Twitter"><i class="ri-twitter-x-line" style="font-size: 24px;"></i></a>
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


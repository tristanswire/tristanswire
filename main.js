/**
 * Minimal interactions for personal website
 * Smooth scroll and simple sticky header
 */

(function() {
    'use strict';

    // Smooth scroll to sections
    function initSmoothScroll() {
        const navLinks = document.querySelectorAll('.nav a[href^="#"]');

        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();

                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    const headerOffset = 80; // Account for sticky header
                    const elementPosition = targetSection.offsetTop;
                    const offsetPosition = elementPosition - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Add subtle shadow to header on scroll
    function initStickyHeader() {
        const header = document.querySelector('.header');
        let lastScroll = 0;

        function handleScroll() {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                header.classList.add('header--scrolled');
            } else {
                header.classList.remove('header--scrolled');
            }

            lastScroll = currentScroll;
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check on load
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initSmoothScroll();
            initStickyHeader();
        });
    } else {
        initSmoothScroll();
        initStickyHeader();
    }

})();

/**
 * Personal Website - Main JavaScript
 * Handles navigation active states and scroll behavior
 */

(function() {
    'use strict';

    // ===================================
    // Intersection Observer for Active Nav States
    // ===================================

    /**
     * Set up intersection observer to detect which section is in view
     * and update navigation active states accordingly
     */
    function initScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav__link');

        // Configuration for intersection observer
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px', // Trigger when section is ~20% from top
            threshold: 0
        };

        // Create intersection observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.getAttribute('id');
                    updateActiveNavLink(sectionId, navLinks);
                }
            });
        }, observerOptions);

        // Observe all sections
        sections.forEach(section => {
            observer.observe(section);
        });
    }

    /**
     * Update the active state of navigation links
     * @param {string} activeSectionId - The ID of the currently active section
     * @param {NodeList} navLinks - All navigation links
     */
    function updateActiveNavLink(activeSectionId, navLinks) {
        navLinks.forEach(link => {
            const href = link.getAttribute('href');

            // Remove active class from all links
            link.classList.remove('nav__link--active');

            // Add active class to the link matching the active section
            if (href === `#${activeSectionId}`) {
                link.classList.add('nav__link--active');
            }
        });
    }

    // ===================================
    // Smooth Scroll Enhancement
    // ===================================

    /**
     * Add smooth scroll behavior to navigation links
     * Enhances CSS smooth-scroll with offset for sticky header
     */
    function initSmoothScroll() {
        const navLinks = document.querySelectorAll('.nav__link');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');

                // Only handle internal links
                if (href && href.startsWith('#')) {
                    const targetId = href.substring(1);
                    const targetSection = document.getElementById(targetId);

                    if (targetSection) {
                        e.preventDefault();

                        // Get header height for offset
                        const header = document.querySelector('.header');
                        const headerHeight = header ? header.offsetHeight : 0;

                        // Calculate target position with offset
                        const targetPosition = targetSection.offsetTop - headerHeight;

                        // Smooth scroll to target
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });

                        // Update URL hash without jumping
                        history.pushState(null, null, href);
                    }
                }
            });
        });
    }

    // ===================================
    // Header Scroll Behavior
    // ===================================

    /**
     * Add visual feedback to header when scrolling
     * Adds shadow when user scrolls down
     */
    function initHeaderScrollBehavior() {
        const header = document.querySelector('.header');
        let lastScrollY = window.scrollY;

        function handleScroll() {
            const currentScrollY = window.scrollY;

            // Add shadow class when scrolled down
            if (currentScrollY > 10) {
                header.classList.add('header--scrolled');
            } else {
                header.classList.remove('header--scrolled');
            }

            lastScrollY = currentScrollY;
        }

        // Throttle scroll event for performance
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Check initial state
        handleScroll();
    }

    // ===================================
    // Initialize All Features
    // ===================================

    /**
     * Initialize all features when DOM is ready
     */
    function init() {
        initScrollSpy();
        initSmoothScroll();
        initHeaderScrollBehavior();
    }

    // Run when DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // DOM is already loaded
        init();
    }

})();

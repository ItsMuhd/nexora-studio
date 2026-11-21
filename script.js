/* =========================================
   NEXORA STUDIO — MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    // =====================================
    // MOBILE NAVIGATION
    // =====================================

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {

        function openMenu() {
            navMenu.classList.add("show");
            menuToggle.setAttribute("aria-expanded", "true");
            menuToggle.setAttribute("aria-label", "Close navigation");
        }

        function closeMenu() {
            navMenu.classList.remove("show");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation");
        }

        menuToggle.addEventListener("click", (event) => {
            event.stopPropagation();

            const isOpen = navMenu.classList.contains("show");

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close menu after selecting a page.
        navMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        // Close menu when clicking outside.
        document.addEventListener("click", (event) => {
            if (
                !navMenu.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMenu();
            }
        });

        // Close menu with Escape key.
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        // Reset mobile menu when returning to desktop.
        window.addEventListener("resize", () => {
            if (window.innerWidth > 760) {
                closeMenu();
            }
        });
    }

    // =====================================
    // AUTOMATIC FOOTER YEAR
    // =====================================

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // =====================================
    // ACTIVE NAVIGATION LINK
    // =====================================

    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    const navLinks = document.querySelectorAll(".nav-menu a");

    navLinks.forEach(link => {
        const linkPage = link.getAttribute("href")
            .split("/")
            .pop()
            .toLowerCase();

        if (linkPage === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    // =====================================
    // PROFILE IMAGE FALLBACK
    // =====================================

    const profileImage = document.querySelector(".profile-image");

    if (profileImage) {
        profileImage.addEventListener("error", () => {
            profileImage.style.display = "none";
            console.warn("Profile image could not be loaded.");
        });
    }

    // =====================================
    // REVEAL ANIMATIONS
    // =====================================

    const revealElements = document.querySelectorAll(
        ".preview-card, .intro-card, .cta-card"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver((entries, observerInstance) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    observerInstance.unobserve(entry.target);
                }

            });

        }, {
            threshold: 0.12
        });

        revealElements.forEach(element => {
            element.classList.add("reveal");
            observer.observe(element);
        });

    } else {
        revealElements.forEach(element => {
            element.classList.add("revealed");
        });
    }

    // =====================================
    // CURRENT PAGE READY
    // =====================================

    document.body.classList.add("website-ready");

    console.log("NEXORA STUDIO successfully initialized.");
});
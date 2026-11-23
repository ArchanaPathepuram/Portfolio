
document.addEventListener("DOMContentLoaded", function () {

    // 1. TYPING ANIMATION

    const typedRole = document.getElementById("typedRole");

    if (typedRole) {
        const roles = [
            "Software Engineer",
            "Software Developer",
            "Python Developer",
            "Frontend Developer",
            "Problem Solver"
        ];

        let roleIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typeEffect() {
            const currentRole = roles[roleIndex];

            if (deleting) {
                charIndex--;
            } else {
                charIndex++;
            }

            typedRole.textContent = currentRole.substring(0, charIndex);

            let speed = deleting ? 55 : 100;

            if (!deleting && charIndex === currentRole.length) {
                deleting = true;
                speed = 1300;
            } else if (deleting && charIndex === 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                speed = 400;
            }

            setTimeout(typeEffect, speed);
        }

        typeEffect();
    }


    // 2. MOBILE NAVIGATION

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {

            const isOpen = navLinks.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", isOpen);
            menuToggle.textContent = isOpen ? "✕" : "☰";

        });

        navLinks.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.textContent = "☰";

            });

        });
    }


    // 3. PROJECT FILTERING

    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedFilter = button.getAttribute("data-filter");

            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            projectCards.forEach(function (card) {

                const category = card.getAttribute("data-category");

                if (selectedFilter === "all" || category === selectedFilter) {
                    card.classList.remove("hide");
                } else {
                    card.classList.add("hide");
                }

            });

        });

    });


    // 4. SCROLL REVEAL ANIMATION

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    revealObserver.unobserve(entry.target);
                }

            });

        }, {
            threshold: 0.12
        });

        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });

    }


    // 5. ACTIVE NAVIGATION ON SCROLL

    const sections = document.querySelectorAll("main section[id]");
    const navigationLinks = document.querySelectorAll(".nav-links a");

    function updateActiveNavigation() {

        let currentSection = "home";

        sections.forEach(function (section) {

            const sectionTop = section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }

        });

        navigationLinks.forEach(function (link) {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + currentSection) {
                link.classList.add("active");
            }

        });

    }

    window.addEventListener("scroll", updateActiveNavigation);
    updateActiveNavigation();


    // 6. AUTOMATIC FOOTER YEAR

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // 7. CONSOLE MESSAGE

    console.log("Portfolio JavaScript loaded successfully!");

});

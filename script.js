
// ======================================
// 1. TYPING ANIMATION
// ======================================

const roles = [
    "Software Engineer",
    "Software Developer",
    "Python Developer",
    "Backend Developer",
    "Web Developer",
    "AI/ML Enthusiast"
];

const typedRole = document.getElementById("typedRole");

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeRole() {

    if (!typedRole) return;

    const currentRole = roles[roleIndex];

    typedRole.textContent = currentRole.substring(0, charIndex);

    if (!deleting && charIndex < currentRole.length) {

        charIndex++;
        setTimeout(typeRole, 85);

    } else if (!deleting) {

        deleting = true;
        setTimeout(typeRole, 1200);

    } else if (charIndex > 0) {

        charIndex--;
        setTimeout(typeRole, 40);

    } else {

        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;

        setTimeout(typeRole, 250);
    }
}


// ======================================
// 2. MOBILE NAVIGATION
// ======================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });
}


// ======================================
// 3. PROJECT FILTERING
// ======================================

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filter = button.dataset.filter;

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        projectCards.forEach(card => {

            const category = card.dataset.category;

            if (filter === "all" || filter === category) {

                card.hidden = false;

            } else {

                card.hidden = true;

            }

        });

    });

});


// ======================================
// 4. SCROLL REVEAL ANIMATION
// ======================================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

} else {

    revealElements.forEach(element => {
        element.classList.add("visible");
    });

}


// ======================================
// 5. ACTIVE NAVIGATION ON SCROLL
// ======================================

const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");

if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    navItems.forEach(link => {

                        const isActive =
                            link.getAttribute("href") ===
                            "#" + entry.target.id;

                        link.classList.toggle(
                            "active",
                            isActive
                        );

                    });

                }

            });

        },

        {
            rootMargin: "-35% 0px -55% 0px"
        }

    );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

}


// ======================================
// 6. AUTOMATIC FOOTER YEAR
// ======================================

const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}


// ======================================
// 7. START ANIMATIONS
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    typeRole();

});


document.addEventListener("DOMContentLoaded", function () {

  // Mobile navigation
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const navItems = document.querySelectorAll(".nav-link");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // Close mobile menu after clicking a link
  navItems.forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Typing animation
  const typingText = document.getElementById("typing-text");

  if (typingText) {
    const roles = [
      "Software Developer",
      "Python Programmer",
      "AI/ML Enthusiast",
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

      typingText.textContent = currentRole.substring(0, charIndex);

      let delay = deleting ? 45 : 90;

      if (!deleting && charIndex === currentRole.length) {
        deleting = true;
        delay = 1300;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 350;
      }

      setTimeout(typeEffect, delay);
    }

    typeEffect();
  }

  // Project filters
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const selectedFilter = button.dataset.filter;

      filterButtons.forEach(function (item) {
        item.classList.remove("active");
      });

      button.classList.add("active");

      projectCards.forEach(function (card) {
        const category = card.dataset.category;
        const showCard =
          selectedFilter === "all" || selectedFilter === category;

        card.classList.toggle("hidden", !showCard);
      });
    });
  });

  // Scroll reveal
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(function (element) {
      observer.observe(element);
    });
  } else {
    revealElements.forEach(function (element) {
      element.classList.add("show");
    });
  }

  // Active navigation while scrolling
  const sections = document.querySelectorAll("main section[id]");

  function updateActiveLink() {
    let currentSection = "home";

    sections.forEach(function (section) {
      if (window.scrollY >= section.offsetTop - 160) {
        currentSection = section.id;
      }
    });

    navItems.forEach(function (link) {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === "#" + currentSection
      );
    });
  }

  // Back to top
  const backToTop = document.getElementById("back-to-top");

  function handleScroll() {
    updateActiveLink();

    if (backToTop) {
      backToTop.classList.toggle("visible", window.scrollY > 400);
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true });

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // Footer year
  const currentYear = document.getElementById("current-year");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  handleScroll();
});

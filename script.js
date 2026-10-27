
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const navigationLinks = document.querySelectorAll(".nav-links a");
  const revealElements = document.querySelectorAll(".reveal");
  const pageSections = document.querySelectorAll("main section[id]");

  // Mobile navigation
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );
    });

    navigationLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
      });
    });

    document.addEventListener("click", (event) => {
      if (
        navLinks.classList.contains("open") &&
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
      }
    });
  }

  // Reveal elements when they enter the screen
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if ("IntersectionObserver" in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -25px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // Highlight the navigation link for the current section
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const currentId = entry.target.id;

            navigationLinks.forEach((link) => {
              const isCurrent = link.getAttribute("href") === `#${currentId}`;

              link.classList.toggle("active", isCurrent);

              if (isCurrent) {
                link.setAttribute("aria-current", "location");
              } else {
                link.removeAttribute("aria-current");
              }
            });
          }
        });
      },
      {
        rootMargin: "-30% 0px -60% 0px",
        threshold: 0
      }
    );

    pageSections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // Graceful handling if the profile photo is missing
  const profilePhoto = document.querySelector(".profile-photo");

  if (profilePhoto) {
    profilePhoto.addEventListener("error", () => {
      profilePhoto.alt = "Profile photo could not be loaded. Check archana.jpg.";
      profilePhoto.style.background =
        "linear-gradient(135deg, #312e81, #164e63)";
    });
  }

  // Update the footer year automatically if a year element is added later
  const yearElement = document.getElementById("currentYear");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

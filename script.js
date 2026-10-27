const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle?.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

navMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    projectCards.forEach(card => {
      card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
    });
  });
});

const roleElement = document.getElementById('typedRole');
const roles = ['Artificial Intelligence', 'Machine Learning', 'Data Science', 'Generative AI'];
let roleIndex = 0;
let charIndex = roles[0].length;
let deleting = false;
function typeRole() {
  if (!roleElement || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const current = roles[roleIndex];
  if (!deleting) {
    charIndex++;
    roleElement.textContent = current.slice(0, charIndex);
    if (charIndex >= current.length) {
      deleting = true;
      setTimeout(typeRole, 1350);
      return;
    }
  } else {
    charIndex--;
    roleElement.textContent = current.slice(0, charIndex);
    if (charIndex <= 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeRole, deleting ? 35 : 65);
}
setTimeout(typeRole, 1500);

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('is-visible'));
}

const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section[id]');
if ('IntersectionObserver' in window) {
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
      }
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach(section => navObserver.observe(section));
}

document.getElementById('year').textContent = new Date().getFullYear();
const copyEmailButton = document.getElementById('copyEmail');
copyEmailButton?.addEventListener('click', async () => {
  const email = copyEmailButton.dataset.email;
  if (!email || email === 'YOUR_EMAIL@example.com') {
    const emailText = document.getElementById('emailText');
    if (emailText) emailText.textContent = 'Add your email in index.html';
    return;
  }
  try {
    await navigator.clipboard.writeText(email);
    const emailText = document.getElementById('emailText');
    if (emailText) emailText.textContent = 'Email copied to clipboard ✓';
  } catch {
    window.location.href = `mailto:${email}`;
  }
});

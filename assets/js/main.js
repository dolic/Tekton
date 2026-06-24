/* TEKTON Holzpflaster – Main JavaScript */

// --- Sticky Navigation ---
const nav = document.querySelector('.site-nav');
const burger = document.querySelector('.nav-burger');
const mobileNav = document.querySelector('.nav-mobile');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

burger?.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
  const spans = burger.querySelectorAll('span');
  if (mobileNav.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close mobile nav on link click
mobileNav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    const spans = burger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// --- Scroll Animations ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up').forEach((el, i) => {
  el.style.setProperty('--i', i % 6);
  observer.observe(el);
});

// --- Contact Form ---
const form = document.querySelector('.contact-form form');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('.form-submit');
  const original = btn.innerHTML;
  btn.innerHTML = '&#10003; Nachricht gesendet';
  btn.disabled = true;
  btn.style.background = '#2d6a2d';
  setTimeout(() => {
    btn.innerHTML = original;
    btn.disabled = false;
    btn.style.background = '';
    form.reset();
  }, 4000);
});

// --- Active nav link on scroll ---
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + entry.target.id
          ? 'var(--c-accent-lt)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

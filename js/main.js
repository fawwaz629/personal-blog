/* =====================
   NAVIGATION / SPA ROUTING
===================== */
const navLinks = document.querySelectorAll('.nav-links a');
const pages    = document.querySelectorAll('.page');
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

function showPage(id) {
  pages.forEach(p => p.classList.remove('active'));
  navLinks.forEach(l => l.classList.remove('active'));

  const target = document.getElementById(id);
  if (target) target.classList.add('active');

  const activeLink = document.querySelector(`.nav-links a[data-page="${id}"]`);
  if (activeLink) activeLink.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Re-trigger animations
  if (id === 'about') initSkillBars();
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const page = link.dataset.page;
    showPage(page);
    if (navMenu) navMenu.classList.remove('open');
  });
});

// Hamburger toggle
if (hamburger) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
}

// Blog cards navigation
document.addEventListener('click', e => {
  const btn = e.target.closest('[data-goto]');
  if (btn) showPage(btn.dataset.goto);
});

/* =====================
   TYPING EFFECT
===================== */
const phrases = [
  'Cybersecurity Enthusiast',
  'Network Security Student',
  'Problem Solver',
  'UniSZA FIK Student',
];

let phraseIdx = 0, charIdx = 0, isDeleting = false;
const typingEl = document.getElementById('typing-text');

function type() {
  if (!typingEl) return;
  const current = phrases[phraseIdx];

  if (isDeleting) {
    typingEl.textContent = current.substring(0, charIdx - 1);
    charIdx--;
  } else {
    typingEl.textContent = current.substring(0, charIdx + 1);
    charIdx++;
  }

  let delay = isDeleting ? 60 : 110;

  if (!isDeleting && charIdx === current.length) {
    delay = 2000;
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
    delay = 400;
  }

  setTimeout(type, delay);
}

/* =====================
   SKILL BARS ANIMATION
===================== */
function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  fills.forEach(fill => {
    fill.style.width = '0';
    setTimeout(() => {
      fill.style.width = fill.dataset.width;
    }, 150);
  });
}

/* =====================
   CONTACT FORM
===================== */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    contactForm.style.opacity = '0';
    setTimeout(() => {
      contactForm.style.display = 'none';
      formSuccess.style.display = 'block';
      formSuccess.style.opacity = '1';
    }, 300);
  });
}

/* =====================
   BLOG FILTER
===================== */
const filterBtns = document.querySelectorAll('.filter-btn');
const blogCards  = document.querySelectorAll('.blog-card[data-category]');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cat = btn.dataset.filter;
    blogCards.forEach(card => {
      if (cat === 'all' || card.dataset.category === cat) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

/* =====================
   SCROLL: NAVBAR SHADOW
===================== */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

/* =====================
   INIT
===================== */
document.addEventListener('DOMContentLoaded', () => {
  showPage('home');
  setTimeout(type, 600);
});

/* =============================================
   GEOFFREY MUMO — main.js
   Shared across all pages
   ============================================= */

/* ---- Custom Cursor ---- */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');

if (window.matchMedia('(pointer: fine)').matches && cursor) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
    setTimeout(() => {
      ring.style.left = e.clientX + 'px';
      ring.style.top  = e.clientY + 'px';
    }, 80);
  });
  document.querySelectorAll('a, button, .skill-card, .project-card, .do-chip, .tool-pill, .filter-btn').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('expand'); ring.classList.add('expand'); });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('expand'); ring.classList.remove('expand'); });
  });
}

/* ---- Navbar Toggle ---- */
const toggle     = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (toggle) {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  document.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ---- Active Nav Link ---- */
(function markActive() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/* ---- Navbar shrink on scroll ---- */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  nav.style.padding = window.scrollY > 50 ? '0.55rem 2rem' : '1rem 2rem';
}, { passive: true });

/* ---- Smooth anchor scroll ---- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH = document.querySelector('.navbar')?.offsetHeight || 70;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH - 16, behavior: 'smooth' });
    }
  });
});

/* ---- Reveal on Scroll ---- */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ---- Skill Bars ---- */
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.bar-fill').forEach(b => { b.style.width = b.dataset.w; });
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-card').forEach(c => barObs.observe(c));

/* ---- Count-Up ---- */
const countObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const target = parseInt(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      let cur = 0;
      const step = Math.max(1, Math.ceil(target / 50));
      const iv = setInterval(() => {
        cur = Math.min(cur + step, target);
        el.textContent = cur + suffix;
        if (cur >= target) clearInterval(iv);
      }, 35);
      countObs.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => countObs.observe(el));

/* ---- Typewriter (index only) ---- */
const typeEl = document.getElementById('typewriter');
if (typeEl) {
  const phrases = ['Full-Stack Developer','Computer Literacy Trainer','Agricultural Tech Innovator','UI/UX Designer','Problem Solver'];
  let pi = 0, ci = 0, deleting = false;
  function type() {
    const cur = phrases[pi];
    typeEl.textContent = deleting ? cur.substring(0, ci - 1) : cur.substring(0, ci + 1);
    deleting ? ci-- : ci++;
    if (!deleting && ci === cur.length) { deleting = true; setTimeout(type, 1800); return; }
    if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    setTimeout(type, deleting ? 55 : 85);
  }
  type();
}

/* ---- Project Filter (projects.html only) ---- */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = '';
        setTimeout(() => card.style.opacity = '1', 10);
      } else {
        card.style.opacity = '0';
        setTimeout(() => card.style.display = 'none', 300);
      }
    });
  });
});

/* ---- Contact Form ---- */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('[type="submit"]');
    const orig = btn.innerHTML;
    btn.innerHTML = '✅ Message Sent!';
    btn.style.background = 'rgba(0,255,178,0.2)';
    btn.disabled = true;
    setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; btn.disabled = false; this.reset(); }, 3500);
  });
}

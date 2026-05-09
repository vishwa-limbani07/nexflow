/* NexFlow — main.js */

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger, Observer);

  // ---- PAGE LOADER ----
  const loader = document.createElement('div');
  loader.className = 'page-loader';
  loader.innerHTML = `
    <div class="page-loader__logo">⬡ NexFlow</div>
    <div class="page-loader__bar"><div class="page-loader__bar-fill" id="loader-fill"></div></div>
  `;
  document.body.appendChild(loader);

  const fill = document.getElementById('loader-fill');
  let progress = 0;
  const tick = setInterval(() => {
    progress += Math.random() * 16 + 4;
    if (progress >= 100) { progress = 100; clearInterval(tick); }
    fill.style.width = progress + '%';
  }, 55);

  setTimeout(() => {
    gsap.to(loader, {
      opacity: 0, duration: 0.5, ease: 'power2.in',
      onComplete: () => { loader.remove(); startAnimations(); },
    });
  }, 900);

  // ---- SCROLL PROGRESS BAR ----
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);

  // ---- CUSTOM CURSOR ----
  // top/left:0 in CSS, GSAP drives x/y with half-size offset for centering
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('follower') || document.getElementById('cursor-follower');
  const HALF_C = 5;   // half of cursor width (10px)
  const HALF_F = 19;  // half of follower width (38px)

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;
  let cursorVisible = false;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!cursorVisible) {
      cursorVisible = true;
      followerX = mouseX;
      followerY = mouseY;
      if (cursor)   cursor.style.opacity   = '1';
      if (follower) follower.style.opacity = '1';
    }
    gsap.to(cursor, { x: mouseX - HALF_C, y: mouseY - HALF_C, duration: 0.08, ease: 'none' });
  });

  // Smooth follower via ticker
  gsap.ticker.add(() => {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    if (follower) gsap.set(follower, { x: followerX - HALF_F, y: followerY - HALF_F });
  });

  // Hover state
  document.querySelectorAll('a, button, .feature-card, .pricing-card, .testimonial-card, .hiw__step, .btn').forEach((el) => {
    el.addEventListener('mouseenter', () => follower && follower.classList.add('is-hovering'));
    el.addEventListener('mouseleave', () => follower && follower.classList.remove('is-hovering'));
  });

  document.addEventListener('mousedown', () => follower && follower.classList.add('is-clicking'));
  document.addEventListener('mouseup',   () => follower && follower.classList.remove('is-clicking'));

  // ---- NAVBAR SCROLL EFFECT ----
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // ---- MOBILE MENU ----
  const burger     = document.getElementById('nav-burger');
  const mobileMenu = document.getElementById('mobile-menu');
  let menuOpen = false;

  burger.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('open', menuOpen);
    const spans = burger.querySelectorAll('span');
    if (menuOpen) {
      gsap.to(spans[0], { rotate: 45,  y: 7,  duration: 0.3 });
      gsap.to(spans[1], { opacity: 0,          duration: 0.2 });
      gsap.to(spans[2], { rotate: -45, y: -7, duration: 0.3 });
    } else {
      gsap.to(spans[0], { rotate: 0, y: 0, duration: 0.3 });
      gsap.to(spans[1], { opacity: 1,       duration: 0.2 });
      gsap.to(spans[2], { rotate: 0, y: 0, duration: 0.3 });
    }
  });

  mobileMenu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      menuOpen = false;
      mobileMenu.classList.remove('open');
    });
  });

  // ---- SMOOTH ANCHOR SCROLL (native, no plugin needed) ----
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ---- MAGNETIC BUTTONS ----
  document.querySelectorAll('.btn--primary, .btn--ghost').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const dx = (e.clientX - rect.left - rect.width  / 2) * 0.28;
      const dy = (e.clientY - rect.top  - rect.height / 2) * 0.28;
      gsap.to(btn, { x: dx, y: dy, duration: 0.4, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    });
  });

  // ---- PRICING TOGGLE ----
  const toggleBtns = document.querySelectorAll('.pricing__toggle-btn');
  toggleBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      toggleBtns.forEach(b => b.classList.remove('pricing__toggle-btn--active'));
      btn.classList.add('pricing__toggle-btn--active');
      const period = btn.dataset.period;
      document.querySelectorAll('.pricing-card__amount').forEach((el) => {
        const val = el.dataset[period];
        if (!val) return;
        gsap.to(el, {
          opacity: 0, y: -8, duration: 0.18, ease: 'power2.in',
          onComplete() {
            el.textContent = val;
            gsap.to(el, { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out' });
          },
        });
      });
    });
  });

  // ---- ACTIVE NAV LINK ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav__link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => io.observe(s));

  // ---- START ALL ANIMATIONS ----
  function startAnimations() {
    initHeroAnimations();
    initFeaturesAnimations();
    initScrollTriggerAnimations();
  }
});

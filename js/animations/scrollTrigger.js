/* ScrollTrigger animations — pinning, counters, card reveals, parallax */

function hideScrollTriggerElements() {
  gsap.set('.testimonial-card', { opacity: 0, y: 50 });
  gsap.set('.pricing-card', { opacity: 0, y: 50 });
  gsap.set('.stat-item', { opacity: 0, y: 40 });
  gsap.set('.section-tag', { opacity: 0, scale: 0.85, y: 10 });
  gsap.set('.section-sub', { opacity: 0, y: 20 });
}

function initScrollTriggerAnimations() {

  // ---- TESTIMONIALS ----
  const testimonialCards = gsap.utils.toArray('.testimonial-card');
  testimonialCards.forEach((card, i) => {
    gsap.to(card, {
      opacity: 1, y: 0,
      duration: 0.75, ease: 'power3.out',
      delay: (i % 3) * 0.12,
      scrollTrigger: {
        trigger: card,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    });
  });

  // ---- PRICING CARDS ----
  const pricingCards = gsap.utils.toArray('.pricing-card');
  pricingCards.forEach((card, i) => {
    gsap.to(card, {
      opacity: 1, y: 0,
      duration: 0.75, ease: 'power3.out',
      delay: i * 0.15,
      scrollTrigger: {
        trigger: card,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    });
  });

  // ---- STAT ITEMS ----
  const statItems = gsap.utils.toArray('.stat-item');
  statItems.forEach((el, i) => {
    gsap.to(el, {
      opacity: 1, y: 0,
      duration: 0.7, ease: 'power3.out', delay: i * 0.1,
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
    });
  });

  // ---- STAT COUNTERS ----
  document.querySelectorAll('.stat-counter').forEach((el) => {
    const target   = parseFloat(el.dataset.target);
    const suffix   = el.dataset.suffix   || '';
    const decimals = parseInt(el.dataset.decimals ?? '0', 10);

    ScrollTrigger.create({
      trigger: el, start: 'top 88%', once: true,
      onEnter: () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target, duration: 2.8, ease: 'power1.out',
          delay: 0.3,
          onUpdate() {
            const formatted = target >= 1000
              ? Math.floor(obj.val).toLocaleString()
              : obj.val.toFixed(decimals);
            el.textContent = formatted + suffix;
          },
        });
      },
    });
  });

  // ---- HOW IT WORKS — pinned scroll ----
  const hiwSteps   = document.querySelectorAll('.hiw__step');
  const hiwScreens = document.querySelectorAll('.hiw__screen');

  function activateHiwStep(index) {
    hiwSteps.forEach((s, i)   => s.classList.toggle('hiw__step--active',   i === index));
    hiwScreens.forEach((s, i) => s.classList.toggle('hiw__screen--active', i === index));
  }

  if (window.innerWidth > 900) {
    ScrollTrigger.create({
      trigger: '.how-it-works',
      start: 'top top',
      end: '+=200%',
      pin: '#hiw-pin',
      scrub: 1,
      onUpdate(self) {
        activateHiwStep(Math.min(2, Math.floor(self.progress * 3)));
      },
    });
  } else {
    hiwSteps.forEach(s => s.classList.add('hiw__step--active'));
    hiwScreens.forEach((s, i) => {
      s.classList.add('hiw__screen--active');
      gsap.set(s, { opacity: 1, position: 'relative' });
    });
  }

  // ---- CTA SECTION ----
  ScrollTrigger.create({
    trigger: '#cta-inner', start: 'top 80%', once: true,
    onEnter() {
      const el = document.querySelector('#cta-title');
      if (el) {
        const lines = splitTextIntoLines(el);
        gsap.from(lines, {
          y: 60, opacity: 0,
          stagger: 0.18, duration: 0.9, ease: 'power4.out',
        });
      }
      gsap.from('.cta-section__sub',     { opacity: 0, y: 20, duration: 0.7, ease: 'power3.out', delay: 0.4 });
      gsap.from('.cta-section__actions', { opacity: 0, y: 20, duration: 0.7, ease: 'power3.out', delay: 0.6 });
    },
  });

  // ---- SECTION HEADINGS reveal ----
  ['#testimonials-title', '#pricing-title', '#hiw-title'].forEach((sel) => {
    ScrollTrigger.create({
      trigger: sel, start: 'top 85%', once: true,
      onEnter() {
        const el = document.querySelector(sel);
        if (!el) return;
        const lines = splitTextIntoLines(el);
        gsap.from(lines, { y: 50, opacity: 0, stagger: 0.15, duration: 0.75, ease: 'power4.out' });
      },
    });
  });

  // ---- SECTION TAGS ----
  gsap.utils.toArray('.section-tag').forEach((tag) => {
    gsap.to(tag, {
      opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.5)',
      scrollTrigger: { trigger: tag, start: 'top 92%', toggleActions: 'play none none none' },
    });
  });

  // ---- SECTION SUBS ----
  gsap.utils.toArray('.section-sub').forEach((el) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
    });
  });

  // ---- PARALLAX ORB on scroll ----
  gsap.to('.hero__orb--1', {
    y: -140,
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.2 },
  });
  gsap.to('.hero__orb--2', {
    y: -90,
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.8 },
  });

  // ---- SCROLL PROGRESS BAR ----
  const bar = document.querySelector('.scroll-progress');
  if (bar) {
    gsap.to(bar, {
      scaleX: 1, ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0 },
    });
  }
}

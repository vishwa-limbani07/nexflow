/* Features section — ScrollTrigger stagger + tilt hover */

function initFeaturesAnimations() {
  const cards = gsap.utils.toArray('.feature-card');

  // Set initial hidden state in JS
  gsap.set(cards, { opacity: 0, y: 50 });

  cards.forEach((card, i) => {
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

    // 3D tilt on hover
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width  / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      gsap.to(card, {
        rotateX: -dy * 7, rotateY: dx * 7,
        transformPerspective: 900,
        duration: 0.35, ease: 'power2.out',
      });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.55, ease: 'power3.out' });
    });
  });

  // Section heading chars reveal
  ScrollTrigger.create({
    trigger: '#features-title',
    start: 'top 85%',
    once: true,
    onEnter: () => {
      const el = document.querySelector('#features-title');
      if (!el) return;
      const lines = splitTextIntoLines(el);
      gsap.from(lines, {
        y: 50, opacity: 0,
        stagger: 0.15, duration: 0.7, ease: 'power4.out',
      });
    },
  });
}

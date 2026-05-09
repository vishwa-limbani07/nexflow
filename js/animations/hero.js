/* Hero section — particle canvas + GSAP entrance timeline */

function initParticleCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles, animId;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function createParticles() {
    const count = Math.floor((W * H) / 14000);
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 0.8,
      alpha: Math.random() * 0.5 + 0.2,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Draw connection lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(249,115,22,${0.12 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Draw particles
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(249,115,22,${p.alpha})`;
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    });

    animId = requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();

  // Mouse repel
  canvas.parentElement.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    particles.forEach(p => {
      const dx = p.x - mx;
      const dy = p.y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 80) {
        p.vx += (dx / dist) * 0.3;
        p.vy += (dy / dist) * 0.3;
        const maxV = 2;
        p.vx = Math.max(-maxV, Math.min(maxV, p.vx));
        p.vy = Math.max(-maxV, Math.min(maxV, p.vy));
      }
    });
  });

  window.addEventListener('resize', () => {
    cancelAnimationFrame(animId);
    resize();
    createParticles();
    draw();
  });
}

function hideHeroElements() {
  gsap.set('#hero-badge',    { opacity: 0, y: 20 });
  gsap.set('#hero-subtitle', { opacity: 0, y: 30 });
  gsap.set('#hero-cta',      { opacity: 0, y: 30 });
  gsap.set('#hero-proof',    { opacity: 0, y: 20 });
  gsap.set('#hero-visual',   { opacity: 0, x: 60 });
  gsap.set('#hero-scroll',   { opacity: 0 });
  gsap.set('.hero__orb--1',  { scale: 0.7, opacity: 0 });
  gsap.set('.hero__orb--2',  { scale: 0.7, opacity: 0 });
  gsap.set('.hero__orb--3',  { scale: 0.7, opacity: 0 });
  gsap.set('#float-1',       { opacity: 0, x: -20, y: 20 });
  gsap.set('#float-2',       { opacity: 0, x: 20,  y: -20 });
  gsap.set('#pill-1',        { opacity: 0, x: -40 });
  gsap.set('#pill-2',        { opacity: 0, x: 40 });
  gsap.set('#pill-3',        { opacity: 0, y: 40 });
  gsap.set('.hero__title-line', { opacity: 0, y: 80, skewY: 3 });
}

function initHeroAnimations() {
  const titleLines = document.querySelectorAll('.hero__title-line');

  const tl = gsap.timeline({ delay: 0.5 });

  // Orbs bloom
  tl.to('.hero__orb--1', { scale: 1, opacity: 0.3, duration: 1.2, ease: 'power3.out' }, 0)
    .to('.hero__orb--2', { scale: 1, opacity: 0.25, duration: 1.2, ease: 'power3.out' }, 0.1)
    .to('.hero__orb--3', { scale: 1, opacity: 0.2,  duration: 1.2, ease: 'power3.out' }, 0.2);

  // Badge
  tl.to('#hero-badge', { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.4)' }, 0.3);

  // Title lines — slide up with skew unwrap
  tl.to(titleLines, {
    opacity: 1, y: 0, skewY: 0,
    stagger: 0.14,
    duration: 0.85, ease: 'power4.out',
  }, 0.45);

  // Subtitle
  tl.to('#hero-subtitle', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.9);

  // CTA
  tl.to('#hero-cta', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 1.05);

  // Social proof
  tl.to('#hero-proof', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 1.2);

  // Dashboard (desktop only)
  tl.to('#hero-visual', { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }, 0.6);
  tl.to('#float-1', { opacity: 1, x: 0, y: 0, duration: 0.7, ease: 'back.out(1.7)' }, 1.1);
  tl.to('#float-2', { opacity: 1, x: 0, y: 0, duration: 0.7, ease: 'back.out(1.7)' }, 1.2);

  // Pills
  tl.to('#pill-1', { opacity: 1, x: 0, duration: 0.7, ease: 'back.out(1.4)' }, 0.8);
  tl.to('#pill-2', { opacity: 1, x: 0, duration: 0.7, ease: 'back.out(1.4)' }, 1.0);
  tl.to('#pill-3', { opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.4)' }, 1.15);

  // Scroll hint
  tl.to('#hero-scroll', { opacity: 1, duration: 0.6 }, 1.5);

  // Continuous pill floats
  gsap.to('#pill-1', { y: -14, rotation: -1, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2 });
  gsap.to('#pill-2', { y: -18, rotation:  1, duration: 2.8, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2.3 });
  gsap.to('#pill-3', { y: -10, rotation:  2, duration: 3.5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2.6 });

  // Orb parallax on mouse move
  const orbs = document.querySelectorAll('.hero__orb');
  document.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    orbs.forEach((orb, i) => {
      const d = (i + 1) * 14;
      gsap.to(orb, { x: dx * d, y: dy * d, duration: 1.5, ease: 'power2.out' });
    });
    // Dashboard tilt
    gsap.to('#hero-visual', {
      rotateY: dx * 5, rotateX: -dy * 3,
      duration: 1.5, ease: 'power2.out', transformPerspective: 900,
    });
  });

  // Particle canvas
  initParticleCanvas();
}

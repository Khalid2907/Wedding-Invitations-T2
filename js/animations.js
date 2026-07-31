/* ============================================================
   AURORA LUXURY INVITATION — Shader & Animation Engine (animations.js)
   ============================================================ */

export class AnimationEngine {
  init() {
    this.initAuroraCanvas();
    this.initParticlesCanvas();
    this.initGlassTilt();
    this.initScrollReveal();
  }

  /* ── Canvas GPU Volumetric Aurora Shader ── */
  initAuroraCanvas() {
    const canvas = document.getElementById('aurora-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let time = 0;
    let animId;

    const render = () => {
      time += 0.004;
      ctx.clearRect(0, 0, width, height);

      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#040D0A');
      bgGrad.addColorStop(0.5, '#0A1D1A');
      bgGrad.addColorStop(1, '#040D0A');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      // Cyan Wave
      const grad1 = ctx.createRadialGradient(
        width * 0.3 + Math.sin(time) * 150,
        height * 0.3 + Math.cos(time * 0.8) * 100,
        50,
        width * 0.3,
        height * 0.3,
        width * 0.6
      );
      grad1.addColorStop(0, 'rgba(142, 235, 227, 0.18)');
      grad1.addColorStop(0.5, 'rgba(52, 211, 153, 0.08)');
      grad1.addColorStop(1, 'rgba(4, 13, 10, 0)');

      ctx.fillStyle = grad1;
      ctx.beginPath();
      ctx.arc(
        width * 0.3 + Math.sin(time) * 150,
        height * 0.3 + Math.cos(time * 0.8) * 100,
        width * 0.5,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Gold Wave
      const grad2 = ctx.createRadialGradient(
        width * 0.7 - Math.cos(time * 0.7) * 120,
        height * 0.6 + Math.sin(time * 0.9) * 120,
        40,
        width * 0.7,
        height * 0.6,
        width * 0.5
      );
      grad2.addColorStop(0, 'rgba(226, 199, 153, 0.14)');
      grad2.addColorStop(0.6, 'rgba(184, 151, 98, 0.04)');
      grad2.addColorStop(1, 'rgba(4, 13, 10, 0)');

      ctx.fillStyle = grad2;
      ctx.beginPath();
      ctx.arc(
        width * 0.7 - Math.cos(time * 0.7) * 120,
        height * 0.6 + Math.sin(time * 0.9) * 120,
        width * 0.45,
        0,
        Math.PI * 2
      );
      ctx.fill();

      ctx.restore();

      if (!document.hidden) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) cancelAnimationFrame(animId);
      else render();
    });
  }

  /* ── Canvas Ambient Stardust Particles ── */
  initParticlesCanvas() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animId;

    const particles = [];
    const count = Math.min(Math.floor(width / 25), 45);
    const colors = ['#8EEBE3', '#E2C799', '#34D399', '#FAF5EB'];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.6,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.4 - 0.1,
        alpha: Math.random(),
        alphaSpeed: (Math.random() - 0.5) * 0.015,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.alphaSpeed;

        if (p.alpha <= 0.1 || p.alpha >= 0.9) p.alphaSpeed = -p.alphaSpeed;
        if (p.y < 0) { p.y = height; p.x = Math.random() * width; }

        ctx.save();
        ctx.globalAlpha = Math.max(0.1, Math.min(0.9, p.alpha));
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      if (!document.hidden) animId = requestAnimationFrame(render);
    };

    render();

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  }

  /* ── Interactive Glass Card Reflection Tilt ── */
  initGlassTilt() {
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rX = ((y - centerY) / centerY) * -4;
        const rY = ((x - centerX) / centerX) * 4;

        card.style.transform = `perspective(1000px) rotateX(${rX}deg) rotateY(${rY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  /* ── Scroll Reveal via IntersectionObserver ── */
  initScrollReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('.reveal-up, .reveal-scale').forEach((el) => {
      observer.observe(el);
    });
  }
}

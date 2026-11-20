/* ═══════════════════════════════════════════════════════
   BIRTHDAY SURPRISE WEBSITE — SCRIPT.JS
   Features: Countdown · Navigation · Particles · Gift
             Confetti · Music · Scroll Animations
═══════════════════════════════════════════════════════ */

/* ── CONFIG ─────────────────────────────────────────── */
// Set your sister's next birthday here (YYYY, Month-1, Day)
// Month is 0-indexed: Jan=0, Feb=1 ... Dec=11
const BIRTHDAY = new Date(new Date().getFullYear(), 10, 25); // Nov 25
// If birthday has passed this year, count to next year
if (BIRTHDAY < new Date()) BIRTHDAY.setFullYear(BIRTHDAY.getFullYear() + 1);

/* ══════════════════════════════════════════════════════
   1. DOM READY
══════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initStarField();
  initFloatingHearts();
  initButterflies();
  initCountdown();
  initNavbar();
  initScrollAnimations();
  initWishesParticles();
  initGiftBox();
  initMusicControl();
  initScrollSpy();
});

/* ══════════════════════════════════════════════════════
   2. STAR FIELD (background ambient stars)
══════════════════════════════════════════════════════ */
function initStarField() {
  const layer = document.getElementById('starsLayer');
  if (!layer) return;
  const count = 180;
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star-dot';
    const size = Math.random() * 2.5 + 0.5;
    const x    = Math.random() * 100;
    const y    = Math.random() * 100;
    const dur  = Math.random() * 4 + 2;
    const del  = Math.random() * 5;
    star.style.cssText = `
      left:${x}%; top:${y}%;
      width:${size}px; height:${size}px;
      animation-duration:${dur}s;
      animation-delay:${del}s;
      opacity:${Math.random() * 0.6 + 0.1};
    `;
    layer.appendChild(star);
  }

  // Also add a few emoji stars scattered
  const emojiStars = ['✦','★','✶','✸','✵'];
  for (let i = 0; i < 20; i++) {
    const el = document.createElement('div');
    el.style.cssText = `
      position:absolute;
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      font-size:${Math.random()*0.6+0.5}rem;
      color:rgba(233,213,255,${Math.random()*0.3+0.1});
      animation:starTwinkle ${Math.random()*3+2}s ease-in-out ${Math.random()*4}s infinite;
      pointer-events:none;
    `;
    el.textContent = emojiStars[Math.floor(Math.random() * emojiStars.length)];
    layer.appendChild(el);
  }
}

/* ══════════════════════════════════════════════════════
   3. FLOATING HEARTS
══════════════════════════════════════════════════════ */
function initFloatingHearts() {
  const container = document.getElementById('floatingHearts');
  if (!container) return;
  const hearts = ['💜','🩷','💫','🌸','✨','💕','💗','🌺'];

  function spawnHeart() {
    const el = document.createElement('div');
    el.className = 'float-heart';
    el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    const x   = Math.random() * 100;
    const dur  = Math.random() * 8 + 7;
    const size = Math.random() * 0.6 + 0.7;
    el.style.cssText = `
      left:${x}%; bottom:-30px;
      font-size:${size}rem;
      animation-duration:${dur}s;
      animation-delay:0s;
    `;
    container.appendChild(el);
    setTimeout(() => el.remove(), dur * 1000);
  }

  // Initial burst
  for (let i = 0; i < 10; i++) {
    setTimeout(spawnHeart, i * 500);
  }
  // Continuous
  setInterval(spawnHeart, 1200);
}

/* ══════════════════════════════════════════════════════
   4. BUTTERFLIES
══════════════════════════════════════════════════════ */
function initButterflies() {
  const container = document.getElementById('butterflies');
  if (!container) return;
  const bf = ['🦋','🌸','✨'];

  function spawnButterfly() {
    const el = document.createElement('div');
    el.className = 'butterfly';
    el.textContent = bf[Math.floor(Math.random() * bf.length)];
    const y   = Math.random() * 60 + 10;
    const dur  = Math.random() * 12 + 10;
    const size = Math.random() * 0.5 + 0.9;
    el.style.cssText = `
      top:${y}%; left:-50px;
      font-size:${size}rem;
      animation-duration:${dur}s;
    `;
    container.appendChild(el);
    setTimeout(() => el.remove(), dur * 1000);
  }

  for (let i = 0; i < 4; i++) setTimeout(spawnButterfly, i * 3000);
  setInterval(spawnButterfly, 4000);
}

/* ══════════════════════════════════════════════════════
   5. COUNTDOWN TIMER
══════════════════════════════════════════════════════ */
function initCountdown() {
  const daysEl    = document.getElementById('cdDays');
  const hoursEl   = document.getElementById('cdHours');
  const minsEl    = document.getElementById('cdMinutes');
  const secsEl    = document.getElementById('cdSeconds');
  const noteEl    = document.getElementById('countdownNote');

  if (!daysEl) return;

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    const now  = new Date();
    const diff = BIRTHDAY - now;

    if (diff <= 0) {
      // It's the birthday!
      daysEl.textContent  = '00';
      hoursEl.textContent = '00';
      minsEl.textContent  = '00';
      secsEl.textContent  = '00';
      if (noteEl) {
        noteEl.textContent = '🎉 Today is YOUR day! Happy Birthday! 🎂';
        noteEl.style.color = '#f9a8d4';
        noteEl.style.fontWeight = '600';
      }
      triggerBirthdayMode();
      return;
    }

    const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs  = Math.floor((diff % (1000 * 60)) / 1000);

    // Animate number change
    animateNum(daysEl,  pad(days));
    animateNum(hoursEl, pad(hours));
    animateNum(minsEl,  pad(mins));
    animateNum(secsEl,  pad(secs));
  }

  function animateNum(el, newVal) {
    if (el.textContent !== newVal) {
      el.style.transform = 'scale(1.25)';
      el.style.color = '#f9a8d4';
      el.textContent = newVal;
      setTimeout(() => {
        el.style.transform = 'scale(1)';
        el.style.color = '';
      }, 300);
    }
  }

  tick();
  setInterval(tick, 1000);
}

/* Birthday mode — auto-fire confetti when it's the birthday */
function triggerBirthdayMode() {
  launchConfetti();
  setTimeout(launchFireworks, 1000);
}

/* ══════════════════════════════════════════════════════
   6. NAVBAR
══════════════════════════════════════════════════════ */
function initNavbar() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  const links     = document.querySelectorAll('.nav-link');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const spans = hamburger.querySelectorAll('span');
      if (navLinks.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
  }

  // Smooth scroll + close mobile menu
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const target = link.getAttribute('href');
      if (target && target.startsWith('#')) {
        e.preventDefault();
        const section = document.querySelector(target);
        if (section) {
          const navH = document.getElementById('navbar')?.offsetHeight || 72;
          const top  = section.getBoundingClientRect().top + window.scrollY - navH;
          window.scrollTo({ top, behavior: 'smooth' });
        }
        if (navLinks) navLinks.classList.remove('open');
        const spans = hamburger?.querySelectorAll('span');
        spans?.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
  });

  // CTA button
  const cta = document.querySelector('.cta-btn');
  if (cta) {
    cta.addEventListener('click', (e) => {
      e.preventDefault();
      const section = document.getElementById('surprise');
      if (section) {
        const navH = document.getElementById('navbar')?.offsetHeight || 72;
        window.scrollTo({ top: section.offsetTop - navH, behavior: 'smooth' });
      }
    });
  }

  // Scroll down indicator
  const scrollDown = document.querySelector('.scroll-down');
  if (scrollDown) {
    scrollDown.addEventListener('click', () => {
      const about = document.getElementById('about');
      if (about) {
        const navH = document.getElementById('navbar')?.offsetHeight || 72;
        window.scrollTo({ top: about.offsetTop - navH, behavior: 'smooth' });
      }
    });
  }
}

/* ══════════════════════════════════════════════════════
   7. SCROLL SPY — highlight active nav link
══════════════════════════════════════════════════════ */
function initScrollSpy() {
  const sections = document.querySelectorAll('.section');
  const links    = document.querySelectorAll('.nav-link');
  const navH     = 80;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(l => {
          l.classList.toggle('active', l.dataset.section === id);
        });
      }
    });
  }, { rootMargin: `-${navH}px 0px -50% 0px`, threshold: 0 });

  sections.forEach(s => observer.observe(s));
}

/* ══════════════════════════════════════════════════════
   8. SCROLL ANIMATIONS
══════════════════════════════════════════════════════ */
function initScrollAnimations() {
  // Add animation classes to elements
  const targets = [
    ...document.querySelectorAll('.polaroid'),
    ...document.querySelectorAll('.mini-wish'),
    ...document.querySelectorAll('.about-trait'),
    ...document.querySelectorAll('.section-header'),
    ...document.querySelectorAll('.wish-card'),
    ...document.querySelectorAll('.memories-note'),
  ];

  targets.forEach((el, i) => {
    el.classList.add('fade-in-up');
    el.style.transitionDelay = `${(i % 6) * 0.08}s`;
  });

  const zoomTargets = [
    document.querySelector('.countdown-card'),
    document.querySelector('.photo-frame'),
    document.querySelector('.gift-box'),
  ].filter(Boolean);

  zoomTargets.forEach(el => el.classList.add('zoom-in-el'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  [...targets, ...zoomTargets].forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════════════════════
   9. WISHES SECTION PARTICLES
══════════════════════════════════════════════════════ */
function initWishesParticles() {
  const starsC  = document.getElementById('wishesStars');
  const heartsC = document.getElementById('wishesHearts');
  if (!starsC || !heartsC) return;

  const starSymbols = ['✦','★','✶','✸','✵','✷'];
  for (let i = 0; i < 25; i++) {
    const el = document.createElement('div');
    el.className = 'wish-star-el';
    const x   = Math.random() * 100;
    const y   = Math.random() * 80 + 10;
    const dur  = Math.random() * 4 + 3;
    const del  = Math.random() * 6;
    el.textContent = starSymbols[Math.floor(Math.random() * starSymbols.length)];
    el.style.cssText = `
      left:${x}%; top:${y}%;
      animation-duration:${dur}s;
      animation-delay:${del}s;
      font-size:${Math.random()*0.5+0.6}rem;
    `;
    starsC.appendChild(el);
  }

  const heartSymbols = ['💜','💫','🌸','✨'];
  for (let i = 0; i < 15; i++) {
    const el = document.createElement('div');
    el.className = 'wish-heart-el';
    const x   = Math.random() * 100;
    const y   = Math.random() * 80 + 10;
    const dur  = Math.random() * 5 + 4;
    const del  = Math.random() * 7;
    el.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    el.style.cssText = `
      left:${x}%; top:${y}%;
      animation-duration:${dur}s;
      animation-delay:${del}s;
    `;
    heartsC.appendChild(el);
  }
}

/* ══════════════════════════════════════════════════════
   10. GIFT BOX INTERACTION
══════════════════════════════════════════════════════ */
function initGiftBox() {
  const giftBox    = document.getElementById('giftBox');
  const openBtn    = document.getElementById('openGiftBtn');
  const giftReveal = document.getElementById('giftReveal');
  const replayBtn  = document.getElementById('replayBtn');
  const giftArea   = document.getElementById('giftArea');

  if (!openBtn || !giftBox) return;

  function openGift() {
    // Disable button
    openBtn.disabled = true;
    openBtn.textContent = 'Opening... 💜';

    // Shake animation
    giftBox.style.animation = 'none';
    giftBox.style.transition = 'transform 0.1s ease';
    let shakeCount = 0;
    const shakeInterval = setInterval(() => {
      const dirs = [-8, 8, -6, 6, -4, 4, 0];
      giftBox.style.transform = `rotate(${dirs[shakeCount % dirs.length]}deg) scale(1.05)`;
      shakeCount++;
      if (shakeCount >= 10) {
        clearInterval(shakeInterval);
        // Open lid
        giftBox.classList.add('opened');

        // Burst of sparkles
        spawnGiftSparkles();

        // Show confetti & fireworks
        setTimeout(() => {
          launchConfetti();
          setTimeout(launchFireworks, 500);
        }, 400);

        // Reveal message
        setTimeout(() => {
          if (giftArea) giftArea.style.opacity = '0.3';
          if (giftReveal) {
            giftReveal.classList.add('show');
            giftReveal.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 1000);
      }
    }, 80);
  }

  openBtn.addEventListener('click', openGift);
  giftBox.addEventListener('click', () => {
    if (!giftBox.classList.contains('opened')) openGift();
  });

  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      // Reset everything
      giftBox.classList.remove('opened');
      giftBox.style.transform = '';
      giftBox.style.animation = '';
      giftBox.style.opacity   = '1';
      if (giftArea) giftArea.style.opacity = '1';
      if (giftReveal) giftReveal.classList.remove('show');
      openBtn.disabled = false;
      openBtn.innerHTML = '<span>Open Your Gift</span> 🎁';

      // Clear confetti
      document.getElementById('confettiContainer').innerHTML = '';
      document.getElementById('fireworksContainer').innerHTML = '';

      // Scroll back to surprise section
      const surprise = document.getElementById('surprise');
      if (surprise) {
        const navH = document.getElementById('navbar')?.offsetHeight || 72;
        window.scrollTo({ top: surprise.offsetTop - navH, behavior: 'smooth' });
      }
    });
  }
}

/* Sparkles burst on gift open */
function spawnGiftSparkles() {
  const giftBox = document.getElementById('giftBox');
  if (!giftBox) return;
  const rect = giftBox.getBoundingClientRect();
  const symbols = ['✨','💜','🌸','⭐','💫','✦','🎊'];
  for (let i = 0; i < 20; i++) {
    const el = document.createElement('div');
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    const angle = (i / 20) * 360;
    const dist  = Math.random() * 100 + 50;
    const dx    = Math.cos(angle * Math.PI / 180) * dist;
    const dy    = Math.sin(angle * Math.PI / 180) * dist;
    el.style.cssText = `
      position:fixed;
      left:${rect.left + rect.width/2}px;
      top:${rect.top + rect.height/2}px;
      font-size:${Math.random()*0.8+0.8}rem;
      pointer-events:none;
      z-index:9999;
      transition:all 0.8s cubic-bezier(0.25,0.46,0.45,0.94);
      transform:translate(0,0) scale(1);
    `;
    document.body.appendChild(el);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transform  = `translate(${dx}px, ${dy}px) scale(0) rotate(${Math.random()*360}deg)`;
        el.style.opacity    = '0';
      });
    });
    setTimeout(() => el.remove(), 900);
  }
}

/* ══════════════════════════════════════════════════════
   11. CONFETTI
══════════════════════════════════════════════════════ */
function launchConfetti() {
  const container = document.getElementById('confettiContainer');
  if (!container) return;

  const colors = [
    '#a855f7','#c084fc','#e879f9','#f472b6','#f9a8d4',
    '#fbbf24','#34d399','#60a5fa','#ffffff','#fde68a'
  ];
  const shapes = ['circle', 'rect'];

  for (let i = 0; i < 120; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    const color  = colors[Math.floor(Math.random() * colors.length)];
    const shape  = shapes[Math.floor(Math.random() * shapes.length)];
    const size   = Math.random() * 8 + 5;
    const left   = Math.random() * 100;
    const delay  = Math.random() * 2;
    const dur    = Math.random() * 3 + 2.5;
    const rot    = Math.random() * 360;

    piece.style.cssText = `
      left:${left}%;
      top:-20px;
      width:${size}px;
      height:${size * (shape === 'rect' ? 1.6 : 1)}px;
      background:${color};
      border-radius:${shape === 'circle' ? '50%' : '2px'};
      animation-duration:${dur}s;
      animation-delay:${delay}s;
      transform:rotate(${rot}deg);
      opacity:1;
    `;
    container.appendChild(piece);
    setTimeout(() => piece.remove(), (delay + dur + 0.5) * 1000);
  }
}

/* ══════════════════════════════════════════════════════
   12. FIREWORKS
══════════════════════════════════════════════════════ */
function launchFireworks() {
  const container = document.getElementById('fireworksContainer');
  if (!container) return;

  const colors = ['#a855f7','#f472b6','#fbbf24','#34d399','#60a5fa','#e879f9'];

  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      const x = Math.random() * 80 + 10;
      const y = Math.random() * 60 + 10;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size  = Math.random() * 60 + 40;

      // Core burst
      const burst = document.createElement('div');
      burst.className = 'firework-burst';
      burst.style.cssText = `
        left:${x}%; top:${y}%;
        width:${size}px; height:${size}px;
        background:radial-gradient(circle, ${color} 0%, transparent 70%);
        margin-left:-${size/2}px; margin-top:-${size/2}px;
        animation-duration:0.8s;
      `;
      container.appendChild(burst);
      setTimeout(() => burst.remove(), 900);

      // Sparkle particles
      const count = 12;
      for (let j = 0; j < count; j++) {
        const angle = (j / count) * 360;
        const dist  = Math.random() * 60 + 30;
        const particle = document.createElement('div');
        particle.style.cssText = `
          position:absolute;
          left:${x}%; top:${y}%;
          width:4px; height:4px;
          background:${color};
          border-radius:50%;
          pointer-events:none;
          transition:all 0.7s ease-out;
          transform:translate(-50%,-50%);
          box-shadow:0 0 6px ${color};
        `;
        container.appendChild(particle);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const dx = Math.cos(angle * Math.PI/180) * dist;
            const dy = Math.sin(angle * Math.PI/180) * dist;
            particle.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0)`;
            particle.style.opacity   = '0';
          });
        });
        setTimeout(() => particle.remove(), 800);
      }
    }, i * 350);
  }
}

/* ══════════════════════════════════════════════════════
   13. MUSIC CONTROL
══════════════════════════════════════════════════════ */
function initMusicControl() {
  const control    = document.getElementById('musicControl');
  const audio      = document.getElementById('bgMusic');
  const icon       = document.getElementById('musicIcon');
  const label      = document.getElementById('musicLabel');

  if (!control || !audio) return;

  let playing = false;
  let started = false;

  function tryPlay() {
    if (!started) {
      audio.volume = 0.35;
      audio.play()
        .then(() => {
          started = true;
          playing = true;
          updateUI();
        })
        .catch(() => {
          // Autoplay blocked — will start on first user click
        });
    }
  }

  function updateUI() {
    if (playing) {
      icon.className  = 'fas fa-music';
      label.textContent = 'Music';
      control.classList.remove('muted');
      control.title   = 'Mute Music';
    } else {
      icon.className  = 'fas fa-volume-mute';
      label.textContent = 'Muted';
      control.classList.add('muted');
      control.title   = 'Play Music';
    }
  }

  control.addEventListener('click', () => {
    if (!started) {
      // First interaction — try to play
      audio.volume = 0.35;
      audio.play()
        .then(() => { started = true; playing = true; updateUI(); })
        .catch(() => {});
      return;
    }
    if (playing) {
      audio.pause();
      playing = false;
    } else {
      audio.play().catch(() => {});
      playing = true;
    }
    updateUI();
  });

  // Start on any first user interaction
  const startOnInteraction = () => {
    tryPlay();
    document.removeEventListener('click', startOnInteraction);
    document.removeEventListener('keydown', startOnInteraction);
    document.removeEventListener('touchstart', startOnInteraction);
  };
  document.addEventListener('click', startOnInteraction);
  document.addEventListener('keydown', startOnInteraction);
  document.addEventListener('touchstart', startOnInteraction);

  updateUI();
}

/* ══════════════════════════════════════════════════════
   14. BACKGROUND AMBIENT PARTICLES
══════════════════════════════════════════════════════ */
// Soft purple orbs drifting in background
(function initAmbientOrbs() {
  const container = document.getElementById('bgParticles');
  if (!container) return;

  const orbs = [
    { x: 15, y: 20, size: 300, color: 'rgba(109,40,217,0.12)', dur: 18 },
    { x: 75, y: 60, size: 400, color: 'rgba(168,85,247,0.08)', dur: 22 },
    { x: 50, y: 85, size: 250, color: 'rgba(192,132,252,0.10)', dur: 15 },
    { x: 85, y: 15, size: 200, color: 'rgba(244,114,182,0.08)', dur: 20 },
    { x: 25, y: 70, size: 350, color: 'rgba(76,29,149,0.15)',  dur: 25 },
  ];

  orbs.forEach((orb, i) => {
    const el = document.createElement('div');
    el.style.cssText = `
      position:absolute;
      left:${orb.x}%; top:${orb.y}%;
      width:${orb.size}px; height:${orb.size}px;
      background:radial-gradient(circle, ${orb.color} 0%, transparent 70%);
      border-radius:50%;
      transform:translate(-50%,-50%);
      animation:floatOrb ${orb.dur}s ease-in-out ${i * 2}s infinite;
      pointer-events:none;
    `;
    container.appendChild(el);
  });

  // Inject orb keyframe if not present
  if (!document.getElementById('orbKeyframe')) {
    const style = document.createElement('style');
    style.id = 'orbKeyframe';
    style.textContent = `
      @keyframes floatOrb {
        0%,100%{transform:translate(-50%,-50%) scale(1);}
        33%{transform:translate(-40%,-60%) scale(1.1);}
        66%{transform:translate(-60%,-45%) scale(0.9);}
      }
    `;
    document.head.appendChild(style);
  }
})();

/* ══════════════════════════════════════════════════════
   15. UTILITY — Smooth hover ripple on CTA button
══════════════════════════════════════════════════════ */
document.querySelectorAll('.cta-btn, .open-gift-btn, .replay-btn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    btn.style.setProperty('--mx', `${x}%`);
    btn.style.setProperty('--my', `${y}%`);
  });
});

/* ══════════════════════════════════════════════════════
   16. SCROLL-DOWN INDICATOR hide on scroll
══════════════════════════════════════════════════════ */
window.addEventListener('scroll', () => {
  const scrollDown = document.querySelector('.scroll-down');
  if (scrollDown) {
    scrollDown.style.opacity = window.scrollY > 60 ? '0' : '1';
    scrollDown.style.pointerEvents = window.scrollY > 60 ? 'none' : 'auto';
  }
}, { passive: true });

/* ══════════════════════════════════════════════════════
   17. NAVBAR shadow on scroll
══════════════════════════════════════════════════════ */
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    if (window.scrollY > 10) {
      navbar.style.background = 'rgba(13,3,32,0.95)';
      navbar.style.boxShadow  = '0 2px 40px rgba(76,29,149,0.6)';
    } else {
      navbar.style.background = '';
      navbar.style.boxShadow  = '';
    }
  }
}, { passive: true });

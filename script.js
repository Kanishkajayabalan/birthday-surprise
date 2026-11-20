/* ═══════════════════════════════════════════════════════
   BIRTHDAY SURPRISE WEBSITE — SCRIPT.JS
   Multi-page version | No countdown timer
═══════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════════
   1. DOM READY
══════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initStarField();
  initSparkleLayer();
  initAmbientOrbs();
  initFloatingHearts();
  initButterflies();
  initNavbar();
  initScrollAnimations();
  initWishesParticles();
  initGiftBox();
  initMusicControl();
});

/* ══════════════════════════════════════════════════════
   2. STAR FIELD
══════════════════════════════════════════════════════ */
function initStarField() {
  const layer = document.getElementById('starsLayer');
  if (!layer) return;

  for (let i = 0; i < 180; i++) {
    const star = document.createElement('div');
    star.className = 'star-dot';
    const size = Math.random() * 2.2 + 0.4;
    star.style.cssText = `
      left:${Math.random()*100}%; top:${Math.random()*100}%;
      width:${size}px; height:${size}px;
      animation-duration:${Math.random()*4+2}s;
      animation-delay:${Math.random()*5}s;
      opacity:${Math.random()*0.5+0.05};
    `;
    layer.appendChild(star);
  }

  const emojiStars = ['✦','★','✶','✸','✵'];
  for (let i = 0; i < 20; i++) {
    const el = document.createElement('div');
    el.textContent = emojiStars[Math.floor(Math.random() * emojiStars.length)];
    el.style.cssText = `
      position:absolute;
      left:${Math.random()*100}%; top:${Math.random()*100}%;
      font-size:${Math.random()*0.6+0.5}rem;
      color:rgba(185,138,255,${Math.random()*0.25+0.08});
      animation:starTwinkle ${Math.random()*3+2}s ease-in-out ${Math.random()*4}s infinite;
      pointer-events:none;
    `;
    layer.appendChild(el);
  }
}

/* ══════════════════════════════════════════════════════
   3. SPARKLE LAYER — tiny glowing dots + crosses
══════════════════════════════════════════════════════ */
function initSparkleLayer() {
  const layer = document.getElementById('sparkleLayer');
  if (!layer) return;

  const dotColors = [
    'rgba(185,138,255,0.9)', 'rgba(240,181,255,0.85)',
    'rgba(255,255,255,0.90)', 'rgba(212,168,255,0.85)',
  ];
  for (let i = 0; i < 90; i++) {
    const dot = document.createElement('div');
    dot.className = 'sparkle-dot';
    const size = Math.random() * 2.5 + 1;
    dot.style.cssText = `
      left:${Math.random()*100}%; top:${Math.random()*100}%;
      width:${size}px; height:${size}px;
      background:${dotColors[Math.floor(Math.random()*dotColors.length)]};
      animation-duration:${Math.random()*3+2}s;
      animation-delay:${Math.random()*6}s;
    `;
    layer.appendChild(dot);
  }

  const crosses = ['✦','✧','✶','✷','✸'];
  for (let i = 0; i < 40; i++) {
    const el = document.createElement('div');
    el.className = 'sparkle-cross';
    el.textContent = crosses[Math.floor(Math.random() * crosses.length)];
    el.style.cssText = `
      left:${Math.random()*100}%; top:${Math.random()*100}%;
      font-size:${Math.random()*0.5+0.5}rem;
      animation-duration:${Math.random()*3+2}s;
      animation-delay:${Math.random()*8}s;
    `;
    layer.appendChild(el);
  }
}

/* ══════════════════════════════════════════════════════
   4. AMBIENT ORBS
══════════════════════════════════════════════════════ */
function initAmbientOrbs() {
  const container = document.getElementById('bgParticles');
  if (!container) return;

  const orbs = [
    { x:15, y:20, size:320, color:'rgba(84,34,168,0.14)',   dur:18 },
    { x:75, y:60, size:420, color:'rgba(185,138,255,0.07)', dur:22 },
    { x:50, y:85, size:260, color:'rgba(185,138,255,0.09)', dur:15 },
    { x:85, y:15, size:210, color:'rgba(240,181,255,0.07)', dur:20 },
    { x:25, y:70, size:370, color:'rgba(27,11,53,0.18)',    dur:25 },
    { x:60, y:35, size:280, color:'rgba(84,34,168,0.10)',   dur:19 },
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
      animation:floatOrb ${orb.dur}s ease-in-out ${i*2}s infinite;
      pointer-events:none;
    `;
    container.appendChild(el);
  });

  if (!document.getElementById('orbKeyframe')) {
    const style = document.createElement('style');
    style.id = 'orbKeyframe';
    style.textContent = `@keyframes floatOrb {
      0%,100%{transform:translate(-50%,-50%) scale(1);}
      33%{transform:translate(-40%,-60%) scale(1.1);}
      66%{transform:translate(-60%,-45%) scale(0.9);}
    }`;
    document.head.appendChild(style);
  }
}

/* ══════════════════════════════════════════════════════
   5. FLOATING HEARTS
══════════════════════════════════════════════════════ */
function initFloatingHearts() {
  const container = document.getElementById('floatingHearts');
  if (!container) return;
  const hearts = ['💜','🩷','💫','🌸','✨','💕','💗','🌺'];

  function spawnHeart() {
    const el = document.createElement('div');
    el.className = 'float-heart';
    el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    const dur = Math.random() * 8 + 7;
    el.style.cssText = `
      left:${Math.random()*100}%; bottom:-30px;
      font-size:${Math.random()*0.6+0.7}rem;
      animation-duration:${dur}s;
    `;
    container.appendChild(el);
    setTimeout(() => el.remove(), dur * 1000);
  }

  for (let i = 0; i < 10; i++) setTimeout(spawnHeart, i * 500);
  setInterval(spawnHeart, 1200);
}

/* ══════════════════════════════════════════════════════
   6. BUTTERFLIES
══════════════════════════════════════════════════════ */
function initButterflies() {
  const container = document.getElementById('butterflies');
  if (!container) return;
  const bf = ['🦋','🌸','✨'];

  function spawnButterfly() {
    const el = document.createElement('div');
    el.className = 'butterfly';
    el.textContent = bf[Math.floor(Math.random() * bf.length)];
    const dur = Math.random() * 12 + 10;
    el.style.cssText = `
      top:${Math.random()*60+10}%; left:-50px;
      font-size:${Math.random()*0.5+0.9}rem;
      animation-duration:${dur}s;
    `;
    container.appendChild(el);
    setTimeout(() => el.remove(), dur * 1000);
  }

  for (let i = 0; i < 4; i++) setTimeout(spawnButterfly, i * 3000);
  setInterval(spawnButterfly, 4000);
}

/* ══════════════════════════════════════════════════════
   7. NAVBAR — hamburger menu (multi-page)
══════════════════════════════════════════════════════ */
function initNavbar() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

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

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => {
        s.style.transform = ''; s.style.opacity = '';
      });
    });
  });
}

/* ══════════════════════════════════════════════════════
   8. SCROLL ANIMATIONS (fade-in on scroll)
══════════════════════════════════════════════════════ */
function initScrollAnimations() {
  const targets = [
    ...document.querySelectorAll('.polaroid'),
    ...document.querySelectorAll('.mini-wish'),
    ...document.querySelectorAll('.about-trait'),
    ...document.querySelectorAll('.section-header'),
    ...document.querySelectorAll('.wish-card'),
    ...document.querySelectorAll('.memories-note'),
    ...document.querySelectorAll('.home-nav-card'),
    ...document.querySelectorAll('.page-nav'),
  ];

  targets.forEach((el, i) => {
    el.classList.add('fade-in-up');
    el.style.transitionDelay = `${(i % 6) * 0.08}s`;
  });

  const zoomTargets = [
    document.querySelector('.photo-frame'),
    document.querySelector('.gift-box'),
  ].filter(Boolean);
  zoomTargets.forEach(el => el.classList.add('zoom-in-el'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.10 });

  [...targets, ...zoomTargets].forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════════════════════
   9. WISHES PARTICLES
══════════════════════════════════════════════════════ */
function initWishesParticles() {
  const starsC  = document.getElementById('wishesStars');
  const heartsC = document.getElementById('wishesHearts');

  if (starsC) {
    const starSymbols = ['✦','★','✶','✸','✵','✷'];
    for (let i = 0; i < 25; i++) {
      const el = document.createElement('div');
      el.className = 'wish-star-el';
      el.textContent = starSymbols[Math.floor(Math.random() * starSymbols.length)];
      el.style.cssText = `
        left:${Math.random()*100}%; top:${Math.random()*80+10}%;
        animation-duration:${Math.random()*4+3}s;
        animation-delay:${Math.random()*6}s;
        font-size:${Math.random()*0.5+0.6}rem;
      `;
      starsC.appendChild(el);
    }
  }

  if (heartsC) {
    const heartSymbols = ['💜','💫','🌸','✨'];
    for (let i = 0; i < 15; i++) {
      const el = document.createElement('div');
      el.className = 'wish-heart-el';
      el.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
      el.style.cssText = `
        left:${Math.random()*100}%; top:${Math.random()*80+10}%;
        animation-duration:${Math.random()*5+4}s;
        animation-delay:${Math.random()*7}s;
      `;
      heartsC.appendChild(el);
    }
  }
}

/* ══════════════════════════════════════════════════════
   10. GIFT BOX
══════════════════════════════════════════════════════ */
function initGiftBox() {
  const giftBox    = document.getElementById('giftBox');
  const openBtn    = document.getElementById('openGiftBtn');
  const giftReveal = document.getElementById('giftReveal');
  const replayBtn  = document.getElementById('replayBtn');
  const giftArea   = document.getElementById('giftArea');
  if (!openBtn || !giftBox) return;

  function openGift() {
    openBtn.disabled = true;
    openBtn.textContent = 'Opening... 💜';
    giftBox.style.animation = 'none';
    giftBox.style.transition = 'transform 0.1s ease';
    let count = 0;
    const dirs = [-8,8,-6,6,-4,4,0];
    const shake = setInterval(() => {
      giftBox.style.transform = `rotate(${dirs[count % dirs.length]}deg) scale(1.05)`;
      count++;
      if (count >= 10) {
        clearInterval(shake);
        giftBox.classList.add('opened');
        spawnGiftSparkles();
        setTimeout(() => { launchConfetti(); setTimeout(launchFireworks, 500); }, 400);
        setTimeout(() => {
          if (giftArea) giftArea.style.opacity = '0.3';
          if (giftReveal) {
            giftReveal.classList.add('show');
            giftReveal.scrollIntoView({ behavior:'smooth', block:'center' });
          }
        }, 1000);
      }
    }, 80);
  }

  openBtn.addEventListener('click', openGift);
  giftBox.addEventListener('click', () => { if (!giftBox.classList.contains('opened')) openGift(); });

  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      giftBox.classList.remove('opened');
      giftBox.style.transform = '';
      giftBox.style.animation = '';
      if (giftArea) giftArea.style.opacity = '1';
      if (giftReveal) giftReveal.classList.remove('show');
      openBtn.disabled = false;
      openBtn.innerHTML = '<span>Open Your Gift</span> 🎁';
      const cc = document.getElementById('confettiContainer');
      const fc = document.getElementById('fireworksContainer');
      if (cc) cc.innerHTML = '';
      if (fc) fc.innerHTML = '';
    });
  }
}

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
    const dx = Math.cos(angle * Math.PI / 180) * dist;
    const dy = Math.sin(angle * Math.PI / 180) * dist;
    el.style.cssText = `
      position:fixed;
      left:${rect.left + rect.width/2}px; top:${rect.top + rect.height/2}px;
      font-size:${Math.random()*0.8+0.8}rem;
      pointer-events:none; z-index:9999;
      transition:all 0.8s cubic-bezier(0.25,0.46,0.45,0.94);
    `;
    document.body.appendChild(el);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.transform = `translate(${dx}px,${dy}px) scale(0) rotate(${Math.random()*360}deg)`;
      el.style.opacity   = '0';
    }));
    setTimeout(() => el.remove(), 900);
  }
}

/* ══════════════════════════════════════════════════════
   11. CONFETTI
══════════════════════════════════════════════════════ */
function launchConfetti() {
  const container = document.getElementById('confettiContainer');
  if (!container) return;
  const colors = ['#5422A8','#7B4FD4','#B98AFF','#D4A8FF','#F0B5FF','#E8D5FF','#9B6FE0','#C4A0FF','#ffffff','#F5DCFF'];
  for (let i = 0; i < 120; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    const isCircle = Math.random() > 0.5;
    const size = Math.random() * 8 + 5;
    const delay = Math.random() * 2;
    const dur   = Math.random() * 3 + 2.5;
    piece.style.cssText = `
      left:${Math.random()*100}%; top:-20px;
      width:${size}px; height:${size * (isCircle ? 1 : 1.6)}px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      border-radius:${isCircle ? '50%' : '2px'};
      animation-duration:${dur}s; animation-delay:${delay}s;
      transform:rotate(${Math.random()*360}deg); opacity:1;
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
  const colors = ['#5422A8','#B98AFF','#F0B5FF','#E8D5FF','#7B4FD4','#D4A8FF'];
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      const x = Math.random() * 80 + 10;
      const y = Math.random() * 60 + 10;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size  = Math.random() * 60 + 40;
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

      for (let j = 0; j < 12; j++) {
        const angle = (j / 12) * 360;
        const dist  = Math.random() * 60 + 30;
        const p = document.createElement('div');
        p.style.cssText = `
          position:absolute; left:${x}%; top:${y}%;
          width:4px; height:4px; background:${color};
          border-radius:50%; pointer-events:none;
          transition:all 0.7s ease-out;
          transform:translate(-50%,-50%);
          box-shadow:0 0 6px ${color};
        `;
        container.appendChild(p);
        requestAnimationFrame(() => requestAnimationFrame(() => {
          const dx = Math.cos(angle * Math.PI/180) * dist;
          const dy = Math.sin(angle * Math.PI/180) * dist;
          p.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0)`;
          p.style.opacity = '0';
        }));
        setTimeout(() => p.remove(), 800);
      }
    }, i * 350);
  }
}

/* ══════════════════════════════════════════════════════
   13. MUSIC CONTROL
══════════════════════════════════════════════════════ */
function initMusicControl() {
  const control = document.getElementById('musicControl');
  const audio   = document.getElementById('bgMusic');
  const icon    = document.getElementById('musicIcon');
  const label   = document.getElementById('musicLabel');
  if (!control || !audio) return;

  let playing = false;
  let started = false;

  function updateUI() {
    if (playing) {
      icon.className = 'fas fa-music';
      label.textContent = 'Music';
      control.classList.remove('muted');
    } else {
      icon.className = 'fas fa-volume-mute';
      label.textContent = 'Muted';
      control.classList.add('muted');
    }
  }

  function tryPlay() {
    if (started) return;
    audio.volume = 0.35;
    audio.play().then(() => { started = true; playing = true; updateUI(); }).catch(() => {});
  }

  control.addEventListener('click', () => {
    if (!started) { tryPlay(); return; }
    if (playing) { audio.pause(); playing = false; }
    else { audio.play().catch(() => {}); playing = true; }
    updateUI();
  });

  const onInteract = () => {
    tryPlay();
    ['click','keydown','touchstart'].forEach(e => document.removeEventListener(e, onInteract));
  };
  ['click','keydown','touchstart'].forEach(e => document.addEventListener(e, onInteract));
  updateUI();
}

/* ══════════════════════════════════════════════════════
   14. NAVBAR SHADOW ON SCROLL
══════════════════════════════════════════════════════ */
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  if (window.scrollY > 10) {
    navbar.style.background = 'rgba(8,8,23,0.97)';
    navbar.style.boxShadow  = '0 2px 40px rgba(84,34,168,0.55)';
  } else {
    navbar.style.background = '';
    navbar.style.boxShadow  = '';
  }
}, { passive: true });

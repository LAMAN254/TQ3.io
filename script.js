/* =====================================================
   LLOA TECH — JAVASCRIPT
   Technology in Daily Activities — Lloa, Ecuador
   ===================================================== */

'use strict';

// ============================================================
// 1. READING PROGRESS BAR
// ============================================================
const readingProgress = document.getElementById('readingProgress');

function updateReadingProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  readingProgress.style.width = pct + '%';
}

window.addEventListener('scroll', updateReadingProgress, { passive: true });

// ============================================================
// 2. NAVBAR — scroll effect & hamburger menu
// ============================================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ============================================================
// 3. DARK / LIGHT MODE
// ============================================================
const darkModeToggle = document.getElementById('darkModeToggle');
const html = document.documentElement;

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('lloa-theme', theme);
}

darkModeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});

// Load saved preference
const savedTheme = localStorage.getItem('lloa-theme') || 'dark';
setTheme(savedTheme);

// ============================================================
// 4. BACK TO TOP BUTTON
// ============================================================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================================
// 5. SCROLL REVEAL ANIMATIONS
// ============================================================
const revealElements = document.querySelectorAll(
  '.reveal-up, .reveal-fade, .reveal-left, .reveal-right'
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Optional: stop observing after reveal
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach(el => revealObserver.observe(el));

// ============================================================
// 6. PARALLAX HERO
// ============================================================
const heroParallax = document.getElementById('heroParallax');

function updateParallax() {
  if (heroParallax && window.scrollY < window.innerHeight) {
    heroParallax.style.transform = `translateY(${window.scrollY * 0.4}px)`;
  }
}

window.addEventListener('scroll', updateParallax, { passive: true });

// ============================================================
// 7. HERO PARTICLES
// ============================================================
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = 30;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (Math.random() * 12 + 8) + 's';
    p.style.animationDelay = (Math.random() * 12) + 's';
    p.style.width = p.style.height = (Math.random() * 3 + 1) + 'px';
    p.style.background = Math.random() > 0.5 ? '#4FC3F7' : '#2E8B57';
    container.appendChild(p);
  }
}
createParticles();

// ============================================================
// 8. TYPING EFFECT — Hero title
// ============================================================
const typingEl = document.getElementById('typingTitle');

function typeText(el, text, speed = 60) {
  el.innerHTML = '';
  const cursor = document.createElement('span');
  cursor.className = 'typing-cursor';
  let i = 0;

  function type() {
    if (i < text.length) {
      el.innerHTML = text.slice(0, i + 1);
      el.appendChild(cursor);
      i++;
      setTimeout(type, speed);
    } else {
      // Keep cursor blinking at end
      el.appendChild(cursor);
    }
  }
  type();
}

// Start typing after a short delay for polish
setTimeout(() => {
  typeText(typingEl, 'Unidos en Cada Paso', 80);
}, 600);

// ============================================================
// 9. DYNAMIC COUNTERS
// ============================================================
function animateCounter(el, target, duration = 1800) {
  const startTime = performance.now();
  const start = 0;

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (target - start) * eased);
    el.textContent = current.toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('.counter-num').forEach(el => counterObserver.observe(el));

// ============================================================
// 10. ANIMATED PROGRESS BARS (Agriculture section)
// ============================================================
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const pct = fill.dataset.pct || 0;
        setTimeout(() => { fill.style.width = pct + '%'; }, 300);
        barObserver.unobserve(fill);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('.stat-fill').forEach(el => barObserver.observe(el));

// ============================================================
// 11. CANVAS — SINE WAVE (animated)
// ============================================================
function drawSineWave() {
  const canvas = document.getElementById('sineWave');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  let offset = 0;

  function draw() {
    ctx.clearRect(0, 0, w, h);

    // Grid lines
    ctx.strokeStyle = 'rgba(79,195,247,0.1)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= w; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y <= h; y += 35) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    // X axis
    ctx.strokeStyle = 'rgba(79,195,247,0.35)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2); ctx.stroke();

    // Sine wave
    const amplitude = h / 3;
    const frequency = 0.035;

    ctx.beginPath();
    ctx.strokeStyle = '#4FC3F7';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#4FC3F7';
    ctx.shadowBlur = 8;

    for (let x = 0; x <= w; x++) {
      const y = h / 2 + amplitude * Math.sin(frequency * x + offset);
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Moving dot
    const dotX = 80;
    const dotY = h / 2 + amplitude * Math.sin(frequency * dotX + offset);
    ctx.beginPath();
    ctx.arc(dotX, dotY, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#4FC3F7';
    ctx.shadowBlur = 15;
    ctx.fill();

    ctx.shadowBlur = 0;
    offset += 0.04;
    requestAnimationFrame(draw);
  }
  draw();
}
drawSineWave();

// ============================================================
// 12. CANVAS — CYCLOID
// ============================================================
function drawCycloid() {
  const canvas = document.getElementById('cycloidWave');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  const r = 25; // wheel radius
  let animT = 0;

  function draw() {
    ctx.clearRect(0, 0, w, h);

    // Ground line
    ctx.strokeStyle = 'rgba(46,139,87,0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, h - 20); ctx.lineTo(w, h - 20); ctx.stroke();

    // Draw cycloid path
    ctx.beginPath();
    ctx.strokeStyle = '#3EAD72';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#2E8B57';
    ctx.shadowBlur = 6;

    const tMax = Math.PI * 6;
    const xScale = (w - 40) / tMax;
    const baseY = h - 20 - r;

    for (let t = 0; t <= tMax; t += 0.05) {
      const x = 20 + (r * (t - Math.sin(t))) * xScale;
      const y = baseY - r * (1 - Math.cos(t)) + r;
      t === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Rolling wheel
    const wheelT = animT % tMax;
    const wheelX = 20 + (r * (wheelT - Math.sin(wheelT))) * xScale;
    const wheelY = h - 20 - r;

    // Wheel circle
    ctx.beginPath();
    ctx.arc(wheelX, wheelY, r, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(79,195,247,0.5)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Rim dot (traces the cycloid)
    const dotX = wheelX + r * Math.sin(-wheelT) * xScale / xScale;
    const dotY = wheelY - r * Math.cos(wheelT);
    ctx.beginPath();
    ctx.arc(
      wheelX - r * Math.sin(wheelT),
      wheelY + r * Math.cos(wheelT),
      5, 0, Math.PI * 2
    );
    ctx.fillStyle = '#E8A020';
    ctx.shadowColor = '#E8A020';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;

    animT += 0.03;
    requestAnimationFrame(draw);
  }
  draw();
}
drawCycloid();

// ============================================================
// 13. INTERACTIVE QUIZ
// ============================================================
const quizData = [
  {
    question: "What technology helps farmers in Lloa save water in their fields?",
    options: ["Satellite TV", "IoT soil-moisture sensors & drip irrigation", "Wind turbines", "Cloud seeding"],
    correct: 1,
    explanation: "IoT soil-moisture sensors control drip lines automatically, reducing water use by 45%."
  },
  {
    question: "Which satellite system monitors ground deformation around the Pichincha volcano?",
    options: ["Hubble Space Telescope", "NASA Mars Reconnaissance", "ESA Sentinel-1 InSAR", "GPS-only network"],
    correct: 2,
    explanation: "ESA Sentinel-1 uses radar interferometry (InSAR) to detect millimeter-level ground shifts every 6 days."
  },
  {
    question: "What mathematical curve is traced by a point on the rim of a rolling wheel?",
    options: ["Parabola", "Ellipse", "Hyperbola", "Cycloid"],
    correct: 3,
    explanation: "A cycloid is described by x = r(t − sin t), y = r(1 − cos t). Cyclists in Lloa trace it with every wheel revolution."
  },
  {
    question: "Which Newton's law states that ΣF = ma?",
    options: ["First law (inertia)", "Second law (acceleration)", "Third law (action-reaction)", "Law of gravitation"],
    correct: 1,
    explanation: "Newton's Second Law: the net force equals mass times acceleration, written ΣF = ma."
  },
  {
    question: "How does GPS navigation work?",
    options: ["Radio waves from cell towers", "Triangulation from at least 4 satellites", "Underground cables", "Solar panels on vehicles"],
    correct: 1,
    explanation: "GPS calculates position by measuring time delays from signals sent by at least 4 satellites orbiting Earth."
  },
  {
    question: "What does NDVI stand for in satellite agriculture monitoring?",
    options: [
      "Normalized Difference Vegetation Index",
      "National Digital Vegetation Image",
      "New Digital Vision Infrastructure",
      "Natural Drone Visual Inspection"
    ],
    correct: 0,
    explanation: "NDVI (Normalized Difference Vegetation Index) measures crop health from the difference in near-infrared and red light reflectance."
  },
  {
    question: "At what altitude range is the parish of Lloa located?",
    options: ["500 – 1,200 m", "1,500 – 2,000 m", "2,700 – 4,787 m", "5,000 – 6,000 m"],
    correct: 2,
    explanation: "Lloa spans from about 2,700 m to 4,787 m above sea level in the Western Andes of Ecuador."
  },
  {
    question: "In the formula y(t) = A · sin(ωt + φ), what does 'A' represent?",
    options: ["Angular velocity", "Phase shift", "Amplitude (maximum displacement)", "Frequency in Hertz"],
    correct: 2,
    explanation: "A is the amplitude — the maximum displacement from the centre position, equal to the wheel's radius in circular motion."
  },
  {
    question: "Which software tool is used for interactive mathematics graphing in Lloa's schools?",
    options: ["Adobe Photoshop", "GeoGebra", "AutoCAD", "Microsoft Excel"],
    correct: 1,
    explanation: "GeoGebra is free dynamic mathematics software used to create interactive graphs, including sine waves and Newton's law diagrams."
  },
  {
    question: "What is the name of Ecuador's geophysical institute that monitors Pichincha?",
    options: ["SENAGUA", "INEC", "IGEPN", "INAMHI"],
    correct: 2,
    explanation: "IGEPN (Instituto Geofísico – Escuela Politécnica Nacional) operates the 24/7 volcanic monitoring network for Pichincha and all Ecuadorian volcanoes."
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

function renderQuestion() {
  const quizArea = document.getElementById('quizArea');
  const quizResult = document.getElementById('quizResult');
  const quizCounter = document.getElementById('quizCounter');
  const quizScore = document.getElementById('quizScore');
  const progressFill = document.getElementById('quizProgressFill');

  if (currentQuestion >= quizData.length) {
    showResult();
    return;
  }

  const q = quizData[currentQuestion];
  const progress = ((currentQuestion) / quizData.length) * 100;

  progressFill.style.width = progress + '%';
  quizCounter.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
  quizScore.textContent = `Score: ${score}`;
  quizResult.style.display = 'none';
  quizArea.style.display = 'block';

  quizArea.innerHTML = `
    <div class="quiz-question">${currentQuestion + 1}. ${q.question}</div>
    <div class="quiz-options">
      ${q.options.map((opt, i) => `
        <button class="quiz-option" data-index="${i}">${opt}</button>
      `).join('')}
    </div>
    <div id="quizFeedback"></div>
  `;

  answered = false;

  quizArea.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => handleAnswer(btn));
  });
}

function handleAnswer(btn) {
  if (answered) return;
  answered = true;

  const idx = parseInt(btn.dataset.index);
  const q = quizData[currentQuestion];
  const allBtns = document.querySelectorAll('.quiz-option');

  allBtns.forEach(b => b.disabled = true);

  const isCorrect = idx === q.correct;
  btn.classList.add(isCorrect ? 'correct' : 'wrong');
  allBtns[q.correct].classList.add('correct');

  if (isCorrect) score++;

  document.getElementById('quizFeedback').innerHTML = `
    <div class="quiz-feedback ${isCorrect ? 'correct' : 'wrong'}">
      ${isCorrect ? '✅ Correct!' : '❌ Not quite.'} — ${q.explanation}
    </div>
    <button class="quiz-next" id="nextBtn">
      ${currentQuestion < quizData.length - 1 ? 'Next Question →' : 'See Results'}
    </button>
  `;

  document.getElementById('nextBtn').addEventListener('click', () => {
    currentQuestion++;
    renderQuestion();
  });
}

function showResult() {
  const quizArea = document.getElementById('quizArea');
  const quizResult = document.getElementById('quizResult');
  const progressFill = document.getElementById('quizProgressFill');
  const quizScore = document.getElementById('quizScore');

  progressFill.style.width = '100%';
  quizScore.textContent = `Final Score: ${score}/${quizData.length}`;
  quizArea.style.display = 'none';
  quizResult.style.display = 'block';

  const pct = Math.round((score / quizData.length) * 100);
  let message, emoji;

  if (pct === 100) { message = 'Perfect Score! You are a Lloa Tech Expert!'; emoji = '🏆'; }
  else if (pct >= 80) { message = 'Excellent! Outstanding knowledge of Lloa!'; emoji = '🌟'; }
  else if (pct >= 60) { message = 'Good work! Keep exploring Lloa\'s technology!'; emoji = '👍'; }
  else if (pct >= 40) { message = 'Not bad — review the sections and try again!'; emoji = '📚'; }
  else { message = 'Keep learning about technology in Lloa!'; emoji = '🌱'; }

  quizResult.innerHTML = `
    <div class="result-score">${score}/${quizData.length}</div>
    <div style="font-size: 3rem; margin: 0.5rem 0">${emoji}</div>
    <div class="result-message">${message}</div>
    <p class="result-sub">You scored ${pct}% — ${score} correct answers out of ${quizData.length} questions.</p>
    <button class="quiz-restart" id="restartBtn">🔄 Try Again</button>
  `;

  document.getElementById('restartBtn').addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    renderQuestion();
  });
}

// Initialize quiz
renderQuestion();

// ============================================================
// 14. CURIOSITIES CAROUSEL
// ============================================================
const curiosities = [
  {
    num: '01',
    icon: '🌋',
    title: 'Pichincha Has Erupted 30+ Times',
    text: 'Since 1534 the Pichincha volcano has had more than 30 recorded eruptions. The most recent significant eruption in 1999 covered Quito in 1–3 cm of ash.'
  },
  {
    num: '02',
    icon: '🌿',
    title: 'Cloud Forests Store 30% More Carbon',
    text: 'The cloud forests surrounding Lloa sequester roughly 30% more carbon per hectare than lowland tropical forests due to persistent moisture and slow decomposition rates.'
  },
  {
    num: '03',
    icon: '📡',
    title: 'GPS Uses Einstein\'s Relativity',
    text: 'Without correcting for both special and general relativity, GPS satellites would accumulate errors of up to 10 km per day — making navigation impossible.'
  },
  {
    num: '04',
    icon: '🚲',
    title: 'The Cycloid is the Fastest Slide',
    text: 'A cycloid curve is the brachistochrone — the path of fastest descent under gravity. A ball sliding down a cycloid reaches the bottom faster than any straight or curved ramp.'
  },
  {
    num: '05',
    icon: '💧',
    title: '1 Drip = 200 L of Water Saved',
    text: 'A single drip-irrigation system on a 1-hectare farm can save over 200,000 litres of water per growing season compared to flood irrigation — crucial in Andean drought seasons.'
  },
  {
    num: '06',
    icon: '🦅',
    title: 'Lloa Has 120+ Bird Species',
    text: 'The altitude gradient from 2,700 m to 4,787 m creates multiple ecological zones, supporting over 120 bird species including the Andean condor with its 3.3 m wingspan.'
  },
  {
    num: '07',
    icon: '🛰️',
    title: 'InSAR Sees 3mm Ground Movement',
    text: 'Synthetic Aperture Radar Interferometry (InSAR) can detect ground deformation of just 3 millimetres by comparing radar phase from satellite passes days apart.'
  },
  {
    num: '08',
    icon: '🌊',
    title: 'Sound is a Sine Wave',
    text: 'Every sound — from a guitar string to a human voice — is a combination of sine waves. The pure sine wave y = A·sin(ωt) is the fundamental building block of all acoustics.'
  },
  {
    num: '09',
    icon: '🤖',
    title: 'AI Can Identify Crops From Space',
    text: 'Modern machine learning models trained on satellite imagery can identify individual crop types — wheat, potato, maize — with over 90% accuracy from 10-metre resolution images.'
  },
  {
    num: '10',
    icon: '⚡',
    title: 'A Truck on 8% Grade Fights 80 N/100 kg',
    text: 'On Lloa\'s 8% gradient roads, gravity exerts 80 Newtons per 100 kg of vehicle weight along the slope direction — demonstrating Newton\'s second law in every journey.'
  }
];

function buildCarousel() {
  const track = document.getElementById('carouselTrack');
  const dots = document.getElementById('carouselDots');
  if (!track) return;

  curiosities.forEach((c, i) => {
    const card = document.createElement('div');
    card.className = 'curiosity-card';
    card.innerHTML = `
      <div class="curiosity-num">${c.num}</div>
      <div class="curiosity-icon">${c.icon}</div>
      <h4>${c.title}</h4>
      <p>${c.text}</p>
    `;
    track.appendChild(card);

    const dot = document.createElement('div');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(i));
    dots.appendChild(dot);
  });
}

let currentSlide = 0;
const VISIBLE_CARDS = 3; // how many visible at once on desktop

function goToSlide(index) {
  const track = document.getElementById('carouselTrack');
  const cards = track.querySelectorAll('.curiosity-card');
  const allDots = document.querySelectorAll('.carousel-dot');

  const maxSlide = Math.max(0, curiosities.length - VISIBLE_CARDS);
  currentSlide = Math.max(0, Math.min(index, maxSlide));

  const cardWidth = cards[0] ? cards[0].offsetWidth + 24 : 344; // card width + gap
  track.style.transform = `translateX(-${currentSlide * cardWidth}px)`;

  allDots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
}

document.getElementById('carouselPrev')?.addEventListener('click', () => {
  goToSlide(currentSlide - 1);
});

document.getElementById('carouselNext')?.addEventListener('click', () => {
  goToSlide(currentSlide + 1);
});

buildCarousel();

// Auto-advance carousel
let autoCarousel = setInterval(() => {
  const max = Math.max(0, curiosities.length - VISIBLE_CARDS);
  goToSlide(currentSlide >= max ? 0 : currentSlide + 1);
}, 4500);

// Pause on hover
document.getElementById('carouselTrack')?.addEventListener('mouseenter', () => clearInterval(autoCarousel));
document.getElementById('carouselTrack')?.addEventListener('mouseleave', () => {
  autoCarousel = setInterval(() => {
    const max = Math.max(0, curiosities.length - VISIBLE_CARDS);
    goToSlide(currentSlide >= max ? 0 : currentSlide + 1);
  }, 4500);
});

// ============================================================
// 15. GALLERY LIGHTBOX
// ============================================================
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightboxContent');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxOverlay = document.getElementById('lightboxOverlay');

document.querySelectorAll('.gallery-zoom').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const card = e.target.closest('.gallery-card');
    if (!card) return;
    const icon = card.querySelector('.gallery-placeholder')?.textContent || '🌋';
    const title = card.querySelector('h4')?.textContent || '';
    const desc = card.querySelector('p')?.textContent || '';

    lightboxContent.innerHTML = `
      <div style="font-size: 5rem; margin-bottom: 1rem;">${icon}</div>
      <h3 style="margin-bottom: 0.75rem; font-family: var(--font-head); font-size: 1.4rem;">${title}</h3>
      <p style="color: var(--text-secondary); font-size: 0.92rem; max-width: 320px; margin: 0 auto;">${desc}</p>
    `;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

lightboxClose?.addEventListener('click', closeLightbox);
lightboxOverlay?.addEventListener('click', closeLightbox);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// ============================================================
// 16. FLIP CARDS (touch/click support)
// ============================================================
document.querySelectorAll('.flip-card').forEach(card => {
  card.addEventListener('click', () => card.classList.toggle('flipped'));
});

// ============================================================
// 17. SMOOTH SCROLL for all anchor links
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 70;
    const top = target.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ============================================================
// 18. ACTIVE NAV LINK on scroll
// ============================================================
const sections = document.querySelectorAll('section[id]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        document.querySelectorAll('.nav-links a').forEach(a => {
          a.style.color = '';
          if (a.getAttribute('href') === `#${id}`) {
            a.style.color = 'var(--accent-blue)';
          }
        });
      }
    });
  },
  { threshold: 0.35 }
);

sections.forEach(s => sectionObserver.observe(s));

// ============================================================
// 19. RESIZE HANDLER — recalculate carousel
// ============================================================
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    goToSlide(currentSlide);
  }, 200);
});

// ============================================================
// 20. PAGE LOAD ANIMATION — stagger nav
// ============================================================
window.addEventListener('load', () => {
  document.querySelectorAll('.nav-links a').forEach((a, i) => {
    a.style.opacity = '0';
    a.style.transform = 'translateY(-8px)';
    setTimeout(() => {
      a.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      a.style.opacity = '';
      a.style.transform = '';
    }, 100 + i * 60);
  });
});

console.log(`
  ╔═══════════════════════════════════════════════╗
  ║   LLOA TECH — Interdisciplinary Project 2024  ║
  ║   Technology in Daily Activities in Lloa      ║
  ║   Built with HTML5 · CSS3 · JavaScript        ║
  ╚═══════════════════════════════════════════════╝
`);
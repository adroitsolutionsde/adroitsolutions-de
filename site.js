/* ============================================================
   Adroit Solutions – Site-wide JavaScript
   Include at end of <body> on every page.
   ============================================================ */

/* ── LANGUAGE SWITCHER ── */
function setLang(lang) {
  var isEn = lang === 'en';
  document.body.classList.toggle('lang-en', isEn);
  document.getElementById('btn-de').className = 'lang-btn' + (!isEn ? ' active' : '');
  document.getElementById('btn-en').className = 'lang-btn' + (isEn ? ' active' : '');
  sessionStorage.setItem('adroit-lang', lang);
  document.dispatchEvent(new Event('lang-changed'));
}
var savedLang = sessionStorage.getItem('adroit-lang') || 'de';
setLang(savedLang);

/* ── SCROLL PROGRESS + NAV SHRINK + SCROLL BUTTONS ── */
(function () {
  var upBtn = document.createElement('button');
  upBtn.id = 'scrollToTop';
  upBtn.className = 'scroll-fab';
  upBtn.setAttribute('aria-label', 'Scroll to top');
  upBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>';
  upBtn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  var downBtn = document.createElement('button');
  downBtn.id = 'scrollToBottom';
  downBtn.className = 'scroll-fab';
  downBtn.setAttribute('aria-label', 'Scroll to bottom');
  downBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';
  downBtn.addEventListener('click', function () { window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); });

  document.body.appendChild(upBtn);
  document.body.appendChild(downBtn);

  window.addEventListener('scroll', function () {
    var scrolled = window.scrollY;
    var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    var prog = (scrolled / maxScroll) * 100;
    var bar = document.getElementById('scrollProgress');
    if (bar) bar.style.width = prog + '%';
    var nav = document.getElementById('mainNav');
    if (nav) nav.style.padding = scrolled > 50 ? '0.4rem 4rem' : '0.75rem 4rem';
    upBtn.classList.toggle('visible', scrolled > 300);
    downBtn.classList.toggle('visible', scrolled < maxScroll - 100);
  }, { passive: true });
})();

/* ── SCROLL REVEAL (IntersectionObserver) ── */
var obs = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger').forEach(function (el) {
  obs.observe(el);
});

/* ── SMOOTH ANCHOR SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    e.preventDefault();
    var t = document.querySelector(a.getAttribute('href'));
    if (t) window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
  });
});

/* ── TIME-BASED LIGHT / DARK MODE ── */
function applyTimeMode() {
  var hour = new Date().getHours();
  var isDark = hour >= 19 || hour < 7;
  document.documentElement.setAttribute('data-mode', isDark ? 'dark' : 'light');
  document.body.style.background = isDark ? '#0a0a0a' : '#f5f2eb';
  document.body.style.color      = isDark ? '#f5f4f0' : '#0a0a0a';
}
applyTimeMode();
setInterval(applyTimeMode, 3600000);

/* ── HAMBURGER MENU ── */
(function () {
  var btn = document.getElementById('menuBtn');
  var links = document.querySelector('.nav-links');
  if (!btn || !links) return;
  btn.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
  });
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      links.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
})();

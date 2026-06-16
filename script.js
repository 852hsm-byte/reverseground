// ── HERO SLIDER ──
const slides = document.querySelectorAll('.hero__slide');
const dots = document.querySelectorAll('.dot');
const progressBar = document.querySelector('.hero__progress-bar');

if (slides.length && progressBar) {
  let current = 0;
  let autoTimer = null;
  const DURATION = 5000;

  function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    resetProgress();
  }

  function resetProgress() {
    progressBar.style.transition = 'none';
    progressBar.style.width = '0%';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        progressBar.style.transition = `width ${DURATION}ms linear`;
        progressBar.style.width = '100%';
      });
    });
  }

  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), DURATION);
  }

  const heroNext = document.querySelector('.hero__next');
  const heroPrev = document.querySelector('.hero__prev');
  if (heroNext) heroNext.addEventListener('click', () => { goTo(current + 1); startAuto(); });
  if (heroPrev) heroPrev.addEventListener('click', () => { goTo(current - 1); startAuto(); });
  dots.forEach(dot => {
    dot.addEventListener('click', () => { goTo(+dot.dataset.idx); startAuto(); });
  });

  goTo(0);
  startAuto();
}

// ── MOBILE NAV / STICKY HEADER → gnb.js 컴포넌트로 이전 ──

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.service-card, .feature-item, .news-card, .about__visual, .about__body, .intro-strip__item, .client-badge'
).forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
  observer.observe(el);
});

// ── CONTACT FORM ──
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-submit');
  btn.textContent = '전송 완료!';
  btn.disabled = true;
  btn.style.background = '#2d6a4f';
  setTimeout(() => {
    btn.textContent = '문의 보내기';
    btn.disabled = false;
    btn.style.background = '';
    e.target.reset();
  }, 3000);
}

// ── Pricing 모바일 탭 ──
document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.pricing__mobile-tab');
  const panels = document.querySelectorAll('.pricing__grid [data-ppanel]');
  if (!tabs.length) return;

  // 초기: 첫 번째 카드 활성
  panels.forEach(p => p.classList.remove('active'));
  const firstTab = tabs[0].dataset.ptab;
  document.querySelector(`[data-ppanel="${firstTab}"]`)?.classList.add('active');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      panels.forEach(p => p.classList.remove('active'));
      document.querySelector(`[data-ppanel="${tab.dataset.ptab}"]`)?.classList.add('active');
    });
  });
});

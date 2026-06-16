/* ============================================================
   GNB Component — ReverseGround
   사용법: <script src="components/gnb.js"></script>
           <div id="gnb-root"></div> 를 <body> 최상단에
   ============================================================ */

(function () {
  // 메인 페이지가 아닌 곳(terms.html, privacy.html 등)에서는
  // 앵커 링크를 메인 페이지로 보내도록 접두사를 붙인다
  const MAIN_PAGE = 'option-a-proctabs.html';
  const isMainPage = /(^|\/)(option-a-proctabs\.html)?$/.test(location.pathname);
  const anchorPrefix = isMainPage ? '' : MAIN_PAGE;

  const MENU = [
    { label: '회사 소개', href: '#about' },
    {
      label: '서비스',
      href: '#services',
      children: [
        {
          title: 'Procsy',
          desc: '구매·발주·정산을 하나로',
          href: '#platform-detail',
          icon: '🛒',
        },
        {
          title: 'Grove',
          desc: 'HR·인사 운영 플랫폼',
          href: '#grove-detail',
          icon: '🌿',
        },
      ],
    },
    { label: '요금제', href: '#pricing' },
    { label: '문의', href: '#contact' },
  ];

  const CTA = {
    label: '도입 문의',
    href: 'https://docs.google.com/forms/d/e/1FAIpQLScvLJw9_BAMzTJJOBYJ0WZ_li9ZGZTWDzjpKdU3_JXFrfQx-w/viewform',
  };

  // ── HTML 생성 ──────────────────────────────────────────────
  function navHref(href) {
    return href.startsWith('#') ? anchorPrefix + href : href;
  }

  function buildDesktopNav() {
    return MENU.map(item => {
      if (!item.children) {
        return `<li class="gnb-item">
          <a class="gnb-link" href="${navHref(item.href)}">${item.label}</a>
        </li>`;
      }
      const drops = item.children.map(c => `
        <a class="gnb-drop__item" href="${navHref(c.href)}">
          <span class="gnb-drop__icon">${c.icon}</span>
          <span class="gnb-drop__body">
            <span class="gnb-drop__title">${c.title}</span>
            <span class="gnb-drop__desc">${c.desc}</span>
          </span>
        </a>`).join('');
      return `<li class="gnb-item gnb-item--has-drop">
        <a class="gnb-link gnb-link--arrow" href="${navHref(item.href)}">
          ${item.label}
          <svg class="gnb-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
        <div class="gnb-drop">${drops}</div>
      </li>`;
    }).join('');
  }

  function buildMobileNav() {
    return MENU.map(item => {
      if (!item.children) {
        return `<li><a class="gnb-mob__link" href="${navHref(item.href)}">${item.label}</a></li>`;
      }
      const subs = item.children.map(c => `
        <a class="gnb-mob__sub" href="${navHref(c.href)}">
          <span class="gnb-mob__sub-icon">${c.icon}</span>
          <span>
            <span class="gnb-mob__sub-title">${c.title}</span>
            <span class="gnb-mob__sub-desc">${c.desc}</span>
          </span>
        </a>`).join('');
      return `<li class="gnb-mob__item--has-sub">
        <button class="gnb-mob__link gnb-mob__toggle" type="button">
          ${item.label}
          <svg class="gnb-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="gnb-mob__sub-panel">${subs}</div>
      </li>`;
    }).join('');
  }

  const html = `
  <header class="gnb" id="gnb">
    <div class="gnb__inner container">

      <!-- 로고 -->
      <a href="${isMainPage ? '#' : MAIN_PAGE}" class="gnb__logo">
        <span class="gnb__logo-rev">REVERSE</span><span class="gnb__logo-gnd">GROUND</span>
      </a>

      <!-- 데스크톱 메뉴 -->
      <nav class="gnb__nav" aria-label="주메뉴">
        <ul class="gnb__list">${buildDesktopNav()}</ul>
      </nav>

      <!-- CTA -->
      <a class="gnb__cta" href="${CTA.href}" target="_blank" rel="noopener noreferrer">
        ${CTA.label}
      </a>

      <!-- 햄버거 -->
      <button class="gnb__burger" aria-label="메뉴 열기" aria-expanded="false" aria-controls="gnb-mobile">
        <span></span><span></span><span></span>
      </button>

    </div>

    <!-- 모바일 메뉴 -->
    <nav class="gnb__mobile" id="gnb-mobile" aria-label="모바일 메뉴" aria-hidden="true">
      <ul class="gnb__mob-list">${buildMobileNav()}</ul>
      <a class="gnb__mob-cta" href="${CTA.href}" target="_blank" rel="noopener noreferrer">
        ${CTA.label}
      </a>
    </nav>
  </header>`;

  // ── DOM 주입 ───────────────────────────────────────────────
  const root = document.getElementById('gnb-root');
  if (root) root.outerHTML = html;
  else document.body.insertAdjacentHTML('afterbegin', html);

  // ── CSS 주입 ───────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
/* ── GNB Base ── */
.gnb {
  position: sticky;
  top: 0;
  z-index: 200;
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(20px) saturate(160%);
  -webkit-backdrop-filter: blur(20px) saturate(160%);
  box-shadow: 0 1px 0 rgba(0,0,0,0.07);
  transition: box-shadow 0.2s;
}
.gnb.scrolled {
  box-shadow: 0 2px 16px rgba(0,0,0,0.1);
}
.gnb__inner {
  display: flex;
  align-items: center;
  height: 64px;
  gap: 0;
}

/* ── Logo ── */
.gnb__logo {
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.01em;
  flex-shrink: 0;
  text-decoration: none;
}
.gnb__logo-rev { color: #111; }
.gnb__logo-gnd { color: var(--brand, #BE9055); }

/* ── Desktop nav ── */
.gnb__nav { margin: 0 auto; }
.gnb__list {
  display: flex;
  list-style: none;
  gap: 0;
  margin: 0; padding: 0;
}
.gnb-item { position: relative; }
.gnb-link {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: rgba(0,0,0,0.6);
  white-space: nowrap;
  border-radius: 8px;
  text-decoration: none;
  transition: color 0.15s, background 0.15s;
}
.gnb-link:hover,
.gnb-item--has-drop:hover > .gnb-link {
  color: #111;
  background: rgba(0,0,0,0.04);
}
.gnb-chevron {
  transition: transform 0.2s;
  opacity: 0.45;
  flex-shrink: 0;
}
.gnb-item--has-drop:hover .gnb-chevron { transform: rotate(180deg); }

/* ── Dropdown ── */
.gnb-drop {
  display: none;
  position: absolute;
  top: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  min-width: 260px;
  background: #fff;
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 16px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06);
  padding: 8px;
  z-index: 300;
}
/* hover bridge — gap 사이 마우스 이탈 방지 */
.gnb-item--has-drop::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 0; right: 0;
  height: 10px;
}
.gnb-item--has-drop:hover .gnb-drop { display: block; }

.gnb-drop__item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 10px;
  text-decoration: none;
  transition: background 0.15s;
}
.gnb-drop__item:hover { background: rgba(190,144,85,0.07); }
.gnb-drop__icon {
  font-size: 20px;
  width: 36px; height: 36px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(190,144,85,0.08);
  border-radius: 8px;
  flex-shrink: 0;
}
.gnb-drop__body { display: flex; flex-direction: column; gap: 2px; }
.gnb-drop__title { font-size: 14px; font-weight: 600; color: #111; }
.gnb-drop__desc  { font-size: 12px; color: rgba(0,0,0,0.45); }

/* ── CTA ── */
.gnb__cta {
  flex-shrink: 0;
  background: #16130E;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  padding: 9px 20px;
  letter-spacing: -0.01em;
  border-radius: 999px;
  text-decoration: none;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
  white-space: nowrap;
}
.gnb__cta:hover {
  background: #BE9055;
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(190,144,85,0.35);
}

/* ── Burger ── */
.gnb__burger {
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 36px; height: 36px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 8px;
  transition: background 0.15s;
}
.gnb__burger:hover { background: rgba(0,0,0,0.05); }
.gnb__burger span {
  display: block;
  width: 20px; height: 1.5px;
  background: #111;
  transition: transform 0.25s, opacity 0.25s;
  transform-origin: center;
}
/* open 상태 햄버거 → X */
.gnb__burger[aria-expanded="true"] span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
.gnb__burger[aria-expanded="true"] span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.gnb__burger[aria-expanded="true"] span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

/* ── Mobile nav ── */
.gnb__mobile {
  display: none;
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.3s ease;
  background: rgba(255,255,255,0.98);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(0,0,0,0.05);
  box-shadow: 0 8px 32px rgba(0,0,0,0.08);
}
.gnb__mobile.open { max-height: 600px; }
.gnb__mob-list {
  list-style: none;
  margin: 0; padding: 8px 0;
}
.gnb-mob__link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 13px 24px;
  font-size: 15px;
  font-weight: 500;
  color: rgba(0,0,0,0.75);
  text-decoration: none;
  background: none;
  border: none;
  border-bottom: 1px solid rgba(0,0,0,0.05);
  cursor: pointer;
  text-align: left;
}
.gnb-mob__link:hover { background: rgba(0,0,0,0.02); }
.gnb-mob__toggle .gnb-chevron { transition: transform 0.25s; }
.gnb-mob__item--has-sub.open .gnb-mob__toggle .gnb-chevron { transform: rotate(180deg); }

/* 서비스 서브패널 */
.gnb-mob__sub-panel {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.25s ease;
  background: rgba(0,0,0,0.02);
}
.gnb-mob__item--has-sub.open .gnb-mob__sub-panel { max-height: 300px; }
.gnb-mob__sub {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 32px;
  text-decoration: none;
  border-bottom: 1px solid rgba(0,0,0,0.04);
}
.gnb-mob__sub:hover { background: rgba(190,144,85,0.05); }
.gnb-mob__sub-icon {
  font-size: 18px;
  width: 32px; height: 32px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(190,144,85,0.1);
  border-radius: 8px;
  flex-shrink: 0;
}
.gnb-mob__sub-title { display: block; font-size: 14px; font-weight: 600; color: #111; }
.gnb-mob__sub-desc  { display: block; font-size: 12px; color: rgba(0,0,0,0.45); }

/* 모바일 CTA */
.gnb__mob-cta {
  display: block;
  margin: 12px 24px 16px;
  padding: 13px;
  text-align: center;
  background: #16130E;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  border-radius: 999px;
  text-decoration: none;
  transition: background 0.2s;
}
.gnb__mob-cta:hover { background: #BE9055; }

/* ── Responsive ── */
@media (max-width: 768px) {
  .gnb__nav, .gnb__cta { display: none; }
  .gnb__burger { display: flex; }
  .gnb__mobile { display: block; }
  .gnb__inner { justify-content: space-between; }
}
  `;
  document.head.appendChild(style);

  // ── JS 동작 ───────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    const gnb    = document.getElementById('gnb');
    const burger = gnb.querySelector('.gnb__burger');
    const mobile = document.getElementById('gnb-mobile');

    // 햄버거 토글
    burger.addEventListener('click', function () {
      const isOpen = mobile.classList.toggle('open');
      burger.setAttribute('aria-expanded', isOpen);
      mobile.setAttribute('aria-hidden', !isOpen);
    });

    // 모바일 서비스 아코디언
    gnb.querySelectorAll('.gnb-mob__toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const li = btn.closest('.gnb-mob__item--has-sub');
        li.classList.toggle('open');
      });
    });

    // 모바일 링크 클릭 시 닫기
    mobile.querySelectorAll('.gnb-mob__link:not(.gnb-mob__toggle), .gnb-mob__sub, .gnb__mob-cta').forEach(function (a) {
      a.addEventListener('click', function () {
        mobile.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        mobile.setAttribute('aria-hidden', 'true');
      });
    });

    // 스크롤 시 헤더 강화
    window.addEventListener('scroll', function () {
      gnb.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  });

})();

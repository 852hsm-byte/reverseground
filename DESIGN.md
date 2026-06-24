# ReverseGround Design Guide

> `option-a-proctabs.html` 기반 랜딩페이지 디자인 규칙.  
> 수정·추가 시 이 문서를 기준으로 일관성을 유지하세요.

---

## 파일 구조

```
reverseground-v2/
├── option-a-proctabs.html     ← 메인 페이지
├── components/
│   └── gnb.js                 ← GNB (HTML + CSS + JS 통합)
└── css/
    ├── tokens.css             ← 디자인 토큰 (변수 정의) ★ 가장 먼저 로드
    ├── base.css               ← 리셋, 공통 레이아웃, 버튼
    ├── hero.css               ← 히어로 + Intro strip
    ├── services.css           ← 플랫폼 카드 (Procsy / Grove 서비스 섹션)
    ├── platform-tabs.css      ← Procsy 3탭 상세 (#platform-detail)
    ├── features.css           ← 도입 효과 + 클라이언트 카드
    ├── about.css              ← 회사 소개
    ├── vision.css             ← 비전
    ├── howto.css              ← 도입 과정
    ├── pricing.css            ← 요금제
    ├── contact.css            ← 문의
    ├── footer.css             ← 푸터
    ├── modern-proctabs.css    ← 추가 커스텀 스타일
    └── responsive.css         ← 반응형 오버라이드 ★ 항상 마지막 로드
```

> **CSS 캐스케이드 주의**: `responsive.css`가 마지막 로드 → 반응형 값이 우선 적용됨.  
> 같은 속성을 다른 파일에서 쓰면 responsive.css 값이 이깁니다.

---

## 브레이크포인트

| 이름 | 범위 | 섹션 패딩 | 컨테이너 패딩 |
|------|------|-----------|--------------|
| Desktop | ≥ 1025px | 160px | `--space-5` (20px) |
| Tablet | 769px – 1024px | 100px | `--space-5` (20px) |
| Mobile | ≤ 768px | 72px | `--space-3` (12px) |

---

## 브랜드 컬러

| 역할 | 변수 | 값 |
|------|------|----|
| 브랜드 메인 (럭셔리 골드) | `--brand` | `#BE9055` |
| 브랜드 호버 | `--brand-hover` | `#A87038` |
| 브랜드 프레스 | `--brand-press` | `#7A5420` |
| 다크 배경 (Hero, Footer, Procsy 카드, GNB CTA) | — | `#16130E` |
| 다크 카드 (Procsy head, About meta) | — | `#1E1A13` |
| 페이지 배경 | `--bg-default` | `#FFFFFF` |
| 서브 배경 (Grove 카드, Feature 카드) | `--bg-subtle` | `#FAFAFA` |
| 섹션 배경 (Pricing) | — | `#F5F5F7` |

### Gold 팔레트 전체

```
--orange-50:  #FAF4EB   배경 subtle
--orange-100: #F3E5CC
--orange-200: #E6CA9A
--orange-300: #CF9F68
--orange-400: #BE9055   ← 브랜드 메인 (--brand)
--orange-500: #A87038   ← hover (--brand-hover)
--orange-600: #7A5420   ← pressed (--brand-press)
```

---

## 텍스트 컬러

| 역할 | 변수 | 값 |
|------|------|----|
| 기본 | `--text-default` / `--color-text-primary` | `#191919` |
| 보조 | `--text-muted` / `--color-text-secondary` | `#505050` |
| 약한 | `--text-subtle` / `--color-text-tertiary` | `#A0A0A0` |
| 비활성 | `--color-text-disabled` | `#D2D2D2` |
| 반전 (다크 배경) | `--color-text-inverse` | `#FFFFFF` |

> **Pure black `#000` 사용 금지** — 항상 `#191919` 사용

---

## 타이포그래피

폰트: **Pretendard Variable**  
CDN: `https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css`

### 폰트 사이즈

| 변수 | Desktop | Tablet | Mobile | 용도 |
|------|---------|--------|--------|------|
| `--font-size-heading-3xl` | 48px | 36px | 30px | 섹션 타이틀 |
| `--font-size-heading-2xl` | 36px | 30px | 24px | 카드 헤딩 |
| `--font-size-heading-1xl` | 30px | 28px | 22px | 서브 헤딩 |
| `--font-size-heading-lg` | 24px | 22px | 20px | 소헤딩 |
| `--font-size-heading-md` | 20px | 20px | 18px | 카드 타이틀 |
| `--font-size-heading-sm` | 18px | 18px | 16px | 소타이틀 |
| `--font-size-body-1xl` | 20px | 18px | 16px | 리드 텍스트 |
| `--font-size-body-lg` | 18px | 18px | 16px | 본문 기본 |
| `--font-size-body-md` | 16px | 16px | 14px | 보조 텍스트 |
| `--font-size-body-sm` | 14px | 14px | 14px | 캡션/라벨 |

### 하드코딩 클래스 반응형 오버라이드 (responsive.css)

| 클래스 | Desktop | Tablet | Mobile |
|--------|---------|--------|--------|
| `.intro-strip__item strong` | 48px | 36px | 20px |
| `.platform-card__name` | 2.4rem | 1.9rem | 1.4rem |
| `.platform-card__stat strong` | 26px | 22px | 20px |
| `.pricing-card__num` | 42px | 34px | 32px |
| `.pricing-card__title` | 22px | 20px | 22px (fixed, `--font-size-22`) |
| `.contact__stat-num` | 32px | 28px | 24px |

### Letter-spacing 원칙

- **모든 타이틀·헤딩·버튼·탭·링크: `letter-spacing: 0`** (음수 자간 금지)
- 예외 — 양수 자간 허용 요소 (의도된 디자인):
  - `.section-label`, `.howto-card__step`, 컬럼 타이틀 등 uppercase 배지류: `0.06em ~ 0.14em`
  - `.about__info-label` (기업정보 라벨): `0.06em`
- 예외 — 장식 요소 1개:
  - `.platform-card__deco` (180px 배경 장식 레터): `-0.06em` (의도적 유지)

### 폰트 굵기

| 변수 | 값 |
|------|----|
| `--font-weight-bold` | 700 |
| `--font-weight-medium` | 500 |
| `--font-weight-normal` | 400 |
| (특별 강조) | 800 |

---

## 스페이싱

| 변수 | 값 |
|------|----|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 20px |
| `--space-6` | 24px |
| `--space-8` | 32px |
| `--space-10` | 40px |
| `--space-12` | 48px |
| `--space-16` | 64px |

---

## 보더 레디우스

| 변수 | 값 | 용도 |
|------|----|------|
| `--radius-sm` | 2px | — |
| `--radius-md` | 4px | — |
| `--radius-lg` | 6px | — |
| `--radius-xl` | 8px | 버튼, 인풋 |
| `--radius-2xl` | 12px | 카드 (모바일 로고박스) |
| `--radius-3xl` | 16px | 드롭다운, Trust 카드 |
| (20px) | 20px | 플랫폼 카드, 피처 카드 |
| `--radius-rounded` | 9999px | Pill — 배지, CTA 버튼 |

---

## 버튼

| 클래스 | 배경 | 텍스트 | 용도 |
|--------|------|--------|------|
| `.btn-hero--white` | `--brand` #BE9055 | #FFFFFF | Hero 주요 CTA |
| `.btn-hero--outline` | 반투명 흰색 | rgba(255,255,255,0.85) | Hero 보조 CTA (다크 배경) |
| `.gnb__cta` | #16130E | #FFFFFF → hover: `--brand` | GNB 상단 CTA |
| `.btn-outline` | transparent | `--text-default` | 일반 아웃라인 |
| `.btn-text` | none | `--brand` | 텍스트 링크 |
| `.btn-submit` | `--brand` | #FFFFFF | 폼 제출 |

모든 버튼 전환: `transition: 0.3s ease`  
Hero CTA 버튼 모바일: `width: 100%; max-width: 320px; justify-content: center`

---

## 공통 클래스

### 섹션 구조

```html
<section class="section [section--bg|section--dark]" id="...">
  <div class="container">
    <span class="section-label">라벨</span>
    <h2 class="section-title">제목 <em class="point">강조</em></h2>
    <p class="section-desc">설명</p>
  </div>
</section>
```

| 클래스 | 설명 |
|--------|------|
| `.section` | 기본 섹션 (흰 배경, 상하 패딩) |
| `.section--bg` | 연회색 배경 `#F5F5F7` |
| `.section--dark` | 다크 배경 `#191919` |
| `.section-label` | 골드 Pill 레이블 (uppercase, 11px, `letter-spacing: 0.14em`) |
| `.section-title` | 섹션 제목 `clamp(2.2rem, 4vw, 3.6rem)` / font-weight 700 / `letter-spacing: 0` |
| `.section-title .point` | 골드 강조 텍스트 |
| `.section-desc` | 섹션 설명 `body-lg` (Desktop: 18px, Mobile: 16px) |
| `.container` | max-width 1440px, 가운데 정렬 |
| `.reveal` | 스크롤 애니메이션 (opacity + translateY) |

---

## 섹션별 컴포넌트 스펙

### GNB (components/gnb.js)

- 높이: 64px / position: sticky / z-index: 200
- 배경: `rgba(255,255,255,0.9)` + `backdrop-filter: blur(20px)`
- 스크롤 시 `.scrolled` 클래스 → `box-shadow: 0 2px 16px rgba(0,0,0,0.1)`
- Mobile (≤768px): 햄버거 버튼 전환, 아코디언 메뉴

**네비게이션 링크:**

| 메뉴 | href | 비고 |
|------|------|------|
| 회사 소개 | `#about` | |
| 서비스 › Procsy | `#platform-detail` | |
| 서비스 › Grove | `#grove-detail` | |
| 요금제 | `#pricing` | |
| 문의 | `#contact` | |
| 도입 문의 CTA | Google Forms URL | target="_blank" |

---

### Hero 섹션

- 배경: `#16130E` (다크) + 골드 radial-gradient blob 애니메이션
- 그리드 패턴 오버레이: `rgba(255,255,255,0.025)`
- 최소 높이: `92vh` (Tablet/Mobile: `auto`, padding: `80px 0 60px`)
- 헤드라인: `clamp(3rem, 5.5vw, 4.8rem)` / font-weight 800 / `letter-spacing: 0` (max 76.8px)
- 서브텍스트: `clamp(1rem, 1.4vw, 1.25rem)` / `rgba(220,195,160,0.75)`
- 배지 eyebrow: 골드 테두리 pill + 펄스 애니메이션 점

**Intro strip** (히어로 하단 수치 띠)
- 배경: `#1E1A13` / 골드 상하 테두리
- 숫자: `CF9F68` (골드 라이트) / 설명: `rgba(208,165,106,0.55)`
- Desktop: 가로 나열, padding `56px 72px` / Tablet: `36px 24px` / Mobile: flex-wrap nowrap, 설명 숨김

---

### 서비스 섹션 — 플랫폼 카드 (`#services`)

- 2열 그리드, gap: 32px
- Desktop: 2열 표시 / Tablet·Mobile: 탭 UI로 전환 (한 번에 1개)
- 탭: `.services__mobile-tabs` (≤1024px에서 표시)

**플랫폼 카드 공통**
- border-radius: 20px / border: `1.5px solid #E8E4DC`
- hover: `translateY(-4px)`, `box-shadow: 0 24px 60px rgba(0,0,0,0.14)`

| 항목 | Procsy | Grove |
|------|--------|-------|
| 헤드 배경 | `#1E1A13` (다크) | `#F5F5F7` (라이트) |
| 텍스트 컬러 | 흰색 | `--text-default` |
| 최소 헤드 높이 | 520px | 520px |
| 피처 영역 배경 | `#FFFFFF` | `#FFFFFF` |

---

### Platform Detail 섹션 (`#platform-detail`)

3탭 구조: Procsy 개요 / 핵심 기능 / 도입 과정

**실제 탭 스타일 (modern-proctabs.css가 platform-tabs.css를 `!important`로 전부 오버라이드)**

- 탭 컨테이너: `background: #EEEBE6`, `border-radius: 14px`, `padding: 6px`, `gap: 6px`
- 탭 버튼: `border-radius: 10px`, `padding: 16px 24px`, border 없음
- 탭 버튼 텍스트: `font-size: 1rem / font-weight: 600` / 설명 텍스트 숨김
- 활성 탭: `background: #FFFFFF`, `box-shadow: 0 1px 6px rgba(0,0,0,0.1)`, border-top 없음
- 비활성 hover: `background: rgba(255,255,255,0.4)`
- 패널: border 없음, `background: transparent`, `padding: 64px 0 40px`
- 패널 타이틀: `clamp(1.9rem, 3.4vw, 3rem)` / font-weight: 700 / `letter-spacing: 0` / Tablet override: 32px
- Howto 그리드 (패널 내): `gap: 4px`, 화살표 `rgba(190,144,85,0.7)` / 18px

> ⚠ `modern-proctabs.css`가 마지막에 로드되어 `platform-tabs.css`와 `responsive.css`의 탭 스타일을 `!important`로 모두 오버라이드. 탭 관련 수정은 반드시 `modern-proctabs.css`에서 할 것.

**Procsy 핵심 기능 카드**
- 2열 그리드 / `background: #F9F8F6` / border-radius: 20px / padding: `40px 36px 44px`
- hover: 상단 3px 골드 라인 등장
- Mobile: 1열

---

### 도입 효과 — 피처 카드 (`.feature-item`)

- 배경: `#FFFFFF` / border: `1.5px solid #E8E4DC` / border-radius: 20px
- padding: `48px 44px` / 2열 그리드
- hover: 상단 3px 골드 그라디언트 라인 (`opacity: 0 → 1`)
- Mobile: 2열 유지, padding `28px 20px`

---

### 클라이언트 카드 (`.client-card`)

**그리드**

| 항목 | Desktop | Tablet | Mobile |
|------|---------|--------|--------|
| 열 수 | 4열 | 4열 | 2열 |
| column-gap | 20px | 16px | 16px |
| row-gap | 20px | 16px | 24px |

**로고 박스**

| 항목 | Desktop | Tablet | Mobile |
|------|---------|--------|--------|
| 높이 | aspect-ratio 4/3 | 110px | 72px |
| border-radius | 20px | 14px | 12px |
| padding | auto | 20px | 20px 16px |

**카드 gap (로고 ↔ 기업명)**

| Desktop | Tablet | Mobile |
|---------|--------|--------|
| 14px | 18px | 8px |

**로고 사이즈**

| 로고 | Desktop | Tablet | Mobile |
|------|---------|--------|--------|
| 기본 | — | 20px | 20px |
| logo--coupang | 24px | 18px | 16px |
| logo--welcomepayments | 20px | 13px | 12px |
| logo--dior | 26px | 17px | 16px |
| logo--handok | 30px | 21px | 18px |

**산업군 배지**
- Desktop: `.client-card__industry--badge` (absolute, 카드 위에 떠있음)
- Tablet·Mobile: `.client-card__industry--inline` (기업명 아래 2번째 줄, `display: block`)

---

### About 섹션

- Trust Grid: Desktop 4열 / Tablet 2열 / Mobile 2열
- Trust 카드: `border-radius: 16px` / padding `28px 24px`
- 기업 정보 (`.about__meta--dark`): `background: #1E1A13` / `border-radius: 20px` / `padding: 56px 64px`
- Tablet에서 `.about__meta--dark`: 1열, `padding: 48px 40px`

---

### Vision 섹션

- 클래스: `.vision.section.vision--dark`
- 배경: `#16130E` + 골드 radial-gradient 글로우 (`::before`)
- 섹션 레이블: `.section-label--light` (골드 outline)
- 타이틀: `clamp(2.2rem, 4vw, 3.6rem)` / 흰색 / `letter-spacing: 0` / 이탤릭 강조 `.vision__accent` → `#CF9F68`
- 서브텍스트: `rgba(255,255,255,0.45)`

**Vision 카드 그리드 (`.vision__strategy`)**
- Desktop: 3열, gap 16px / Tablet: 3열 / Mobile: 탭 전환 (1개씩)
- 카드 배경: `rgba(255,255,255,0.04)` / border: `1px solid rgba(190,144,85,0.15)` / border-radius: 20px
- padding: `52px 44px` / hover: 상단 2px 골드 라인
- 아이콘 박스: 48×48px / `border-radius: 13px` / 골드 배경
- Mobile: Pill 탭 스타일 (`background: rgba(190,144,85,0.15)` 활성 시)

---

### Howto 섹션 (도입 과정)

- 배경: `#F5F5F7`
- Desktop: flex 가로 나열, 카드 사이 골드 화살표 (`.howto__arrow`)
- Tablet·Mobile: Pill 탭 전환 + 좌우 화살표 네비게이션 (`.howto__mobile-nav`)

**Howto 카드 (`.howto-card`)**
- 배경: `#FFFFFF` / border: `1.5px solid #E8E4DC` / border-radius: 20px / padding: `40px 36px`
- 아이콘 박스: 52×52px / `border-radius: 14px` / 골드 배경
- 스텝 레이블 (`.howto-card__step`): 골드 / uppercase / letter-spacing 0.1em
- hover: `translateY(-3px)` + 골드 border + shadow

**Howto 탭 (Tablet·Mobile, ≤1024px)**
- 감싸는 컨테이너: `background: #ECEAE6` (Howto 전용 — 다른 섹션의 `#E8E5E0`와 다름)
- 활성 탭: `background: #fff`
- 페이지네이션 dot: 비활성 `6×6px` 원 / 활성 `20×6px` 골드 pill

---

### Grove Detail 섹션 (`#grove-detail`)

- 클래스: `.platform-detail.section.section--bg`
- 배경: `#F5F5F7`
- Procsy 연동 배지 (`.grove-panel-sync`): 골드 아이콘 + 설명 / `background: rgba(190,144,85,0.06)` / border-radius: 12px / margin-top: 48px
- 피처 카드: `.features__grid` (2열) + `.feature-item` — features.css 와 동일한 컴포넌트 재사용
- 베타 안내 (`.grove-panel-beta`): `background: #FAFAF8` / border-radius: 10px / margin-top: 48px
- 베타 링크 (`.grove-panel-beta__link`): 골드 / underline

---

### News 섹션

- Desktop: 3열 그리드, gap `--card-gap` (20px) / Tablet: 2열 (3번째 카드 숨김) / Mobile: 1열 (모두 표시)
- 카드: `border-radius: 20px` / border: `1.5px solid #E8E4DC`
- 이미지 영역: height 200px / 그라디언트 배경 (실제 이미지 없을 때)
  - `--1`: `linear-gradient(135deg, #1D1D1F, #3A3A3C)`
  - `--2`: `linear-gradient(135deg, #BE9055, #A87038)`
  - `--3`: `linear-gradient(135deg, #2C2C2E, #48484A)`
- 태그: 골드 / uppercase / `border-radius: --radius-rounded`
- hover: `translateY(-4px)` + 골드 border + shadow

---

### Pricing 섹션

- 배경: `#F5F5F7`
- Desktop: 3열 그리드 / Tablet·Mobile: 탭 UI 전환 (Pill 스타일)
- 기본 카드: `background: #FFFFFF` / `border: 1.5px solid rgba(0,0,0,0.07)`
- 추천 카드: `background: #2C2620` (다크)
- padding: `48px 44px 52px` / border-radius: 24px
- Mobile padding: `32px 24px 28px`

**요금 탭 (Pill)**
- 감싸는 컨테이너: `background: #E8E5E0`, `border-radius: 12px`
- Tablet: 탭 padding `10px 6px` / Mobile: 동일

---

### Footer

- 배경: `#16130E` / padding: `64px 0 40px`
- 상단 골드 글로우 오버레이 (`::before`)
- Desktop: 4열 (1.8fr + 1fr×3) / Mobile: 브랜드 풀 width + 링크 3열

**링크 컬러**: `rgba(255,255,255,0.55)` → hover `rgba(255,255,255,0.9)`  
**컬럼 타이틀**: `var(--brand)` opacity 0.75 / uppercase / letter-spacing 0.1em

**푸터 네비게이션 링크:**

| 메뉴 | href |
|------|------|
| Procsy | `#platform-detail` |
| Grove | `#grove-detail` |
| 회사 소개 | `#about` |
| 요금제 | `#pricing` |
| 문의 | `#contact` |

---

## 터치/호버 처리 원칙

- 마우스 hover 효과: `@media (hover: hover) and (pointer: fine)` 내에서만
- 터치 디바이스: `@media (hover: none)` — transform/shadow/transition 모두 제거
- 카드 `-webkit-tap-highlight-color: transparent` 공통 적용
- 카드 자체: `pointer-events: none` (터치) / 내부 링크·버튼: `pointer-events: auto`

---

## 애니메이션

| 이름 | 용도 | 값 |
|------|------|---|
| `blobFloat` | Hero 배경 blob | 8–10s ease-in-out infinite |
| `pulse` | Hero eyebrow 점 | 2s ease-in-out infinite |
| `.reveal` | 스크롤 등장 | opacity 0→1 + translateY 24px→0 / 0.6s |
| 카드 hover | transform translateY(-3~4px) | 0.25s ease |
| 전환 공통 | `--transition` | 0.3s ease |

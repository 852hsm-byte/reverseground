# ReverseGround v2 — Claude Instructions

## 프로젝트 개요

ReverseGround의 랜딩페이지. 메인 파일은 `option-a-proctabs.html`.  
Procsy(구매·발주·정산 플랫폼)와 Grove(HR 플랫폼) 두 제품을 소개한다.

## 작업 시작 전 필수

**반드시 `DESIGN.md`를 먼저 읽어라.** 모든 수정·추가 작업의 기준이다.  
시각적 확인이 필요하면 `styleguide.html`을 참조하라.

## 핵심 규칙

### CSS
- 변수는 항상 `css/tokens.css`에 정의된 것을 사용한다 (`--brand`, `--space-*`, `--font-size-*` 등)
- 반응형 오버라이드는 반드시 `css/responsive.css`에 작성한다 (항상 마지막 로드)
- `css/features.css`는 `css/responsive.css`보다 먼저 로드된다 — 같은 속성은 responsive.css가 이긴다
- 브레이크포인트: Desktop `≥1025px` / Tablet `769–1024px` / Mobile `≤768px`
- hover 효과는 반드시 `@media (hover: hover) and (pointer: fine)` 안에만 넣는다
- 터치 디바이스 리셋은 `@media (hover: none)` 안에 넣는다
- Pure black `#000` 사용 금지 — 텍스트는 `#191919` (`--text-default`) 사용

### 브랜드 컬러
- 브랜드 골드: `#BE9055` (`--brand`)
- 다크 배경: `#16130E` (Hero, Footer, GNB CTA) / `#1E1A13` (Procsy 카드, About)
- 임의 색상 추가 금지 — 반드시 `tokens.css` 팔레트 내에서 사용

### 네비게이션 링크 (GNB + 푸터 동일하게 유지)
- Procsy → `#platform-detail`
- Grove → `#grove-detail`
- 회사 소개 → `#about`
- 요금제 → `#pricing`
- 문의 → `#contact`

### 플랫폼 탭 수정 시 주의
- `platform-tabs.css`와 `responsive.css`의 탭 스타일은 `modern-proctabs.css`가 `!important`로 전부 덮어씌움
- **탭 관련 수정은 반드시 `css/modern-proctabs.css`에서 할 것**
- 실제 탭 컨테이너: bg `#EEEBE6` / border-radius 14px / padding 6px
- 실제 활성 탭: bg `#FFFFFF` / box-shadow만, border-top 없음
- 실제 패널(desktop): border 없음, bg transparent, padding `64px 0 40px`
- ⚠️ **`modern-proctabs.css`는 HTML에서 `responsive.css`보다 나중에 로드됨** — `responsive.css`의 모바일 `@media (max-width:768px)` 안에 `.platform-panel` 등을 `!important` 없이 오버라이드해도 무시된다 (둘 다 `!important`면 나중에 로드되는 쪽이 이김). **모바일에서 탭/패널 간격을 바꿔야 하면 `responsive.css`가 아니라 `modern-proctabs.css` 안에 `@media (max-width:768px) { ... !important }` 블록을 추가할 것.** (실제 모바일 패널 padding: `28px 0 36px`)
- `.platform-detail.section`(클래스 셀렉터)는 **Procsy(`#platform-detail`)와 Grove(`#grove-detail`) 둘 다**에 걸린다 — 한쪽만 다른 배경/스타일을 주려면 `.platform-detail.section`이 아니라 `#platform-detail` / `#grove-detail` ID로 타겟할 것
- Procsy↔Grove 전환부 구분: 배경색을 다르게 주면 그룹 정체성이 왜곡될 수 있어(Pricing 등 인접 섹션과 색이 겹치거나, 서로 다른 카테고리인데 같은 색으로 묶여 보임) **구분선(`#grove-detail .container::before`)**로 처리한다. 구분선 위/아래 여백은 해당 브레이크포인트의 `.section` 기본 패딩과 동일하게 맞춰져 있음(데스크탑 160px / 태블릿 100px / 모바일 72px) — `platform-tabs.css`(데스크탑·태블릿 베이스)와 `responsive.css`의 태블릿·모바일 블록 양쪽에 값이 나뉘어 있으니 한쪽만 고치지 말 것
- ⚠️ **`border-top`을 풀블리드 섹션/컨테이너에 직접 주면 padding과 무관하게 항상 박스 경계(=뷰포트 폭)에 그려진다.** padding은 안쪽 콘텐츠 위치만 밀어줄 뿐 border 폭에는 영향이 없음. 컨텐츠 폭에만 맞는 구분선이 필요하면 `border` 대신 `::before { height:1px; background:... }` 가상요소를 써서 padding 안쪽 흐름을 타게 할 것

### HTML 구조
- GNB는 `components/gnb.js`가 주입 — HTML 파일에서 직접 수정하지 말 것
- 섹션 구조: `.section > .container > .section-label + .section-title + .section-desc`
- 새 섹션 추가 시 위 구조를 따르고 `tokens.css` 변수를 사용할 것

### 로컬 서버
- `python3 -m http.server 3030 --bind 0.0.0.0` 으로 실행 (IPv4 바인딩 필수)
- 아이폰 접속: `http://192.168.219.42:3030/option-a-proctabs.html`

## 작업 금지 사항

- `css/tokens.css` 변수값 임의 변경 금지
- `components/gnb.js` 내 네비게이션 링크를 DESIGN.md 기준과 다르게 바꾸지 말 것
- 하드코딩 색상값 추가 금지 (토큰 없이 hex 직접 사용)
- 새 CSS 파일 추가 시 `responsive.css`보다 앞에 로드할 것

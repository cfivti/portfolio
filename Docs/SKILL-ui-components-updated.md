---
name: portfolio-ui-components
description: Use this skill when building any UI component or page layout for the designer's portfolio website. It describes how to assemble components from design tokens — Header, CaseCard, buttons, synopsis toggle, tables — for every breakpoint. Always load portfolio-design-tokens SKILL.md first, then this file.
---

# Portfolio UI Components — Assembly Guide

> **Prerequisites:** load `portfolio-design-tokens` SKILL.md before this file.  
> **Stack:** Astro · Vanilla CSS · Vanilla JS  
> **Pages in scope:** Homepage (`/`), Case pages (`/cases/[slug]`), 404 (design TBD — skip for now)

---

## Component map

```
Layout
└── <BaseLayout>          — html/head/body wrapper, loads fonts + global CSS vars
    ├── <Header>          — two variants: homepage / case page
    ├── <slot />          — page content
    └── (no global footer defined yet)

Homepage (/)
└── <BaseLayout>
    └── <Header variant="home">
    └── <main>
        └── CaseList      — single column, content-wrap width
            └── <CaseCard> × N

Case page (/cases/[slug])
└── <BaseLayout>
    └── <Header variant="case">  — adds KeyWordToggle
    └── <main>
        └── article.case-content
            ├── Case body blocks (text, images, video, tables)
            └── CaseFooterCard    — leads to next case
```

---

## 1. BaseLayout

Wraps every page. Responsibilities: load Onest font, inject CSS custom properties, set `<html lang>`.

```astro
---
// src/layouts/BaseLayout.astro
const { title } = Astro.props;
---
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500&display=swap"
    rel="stylesheet"
  />
  <link rel="stylesheet" href="/styles/tokens.css" />  <!-- CSS custom properties -->
  <link rel="stylesheet" href="/styles/global.css" />
</head>
<body>
  <slot />
</body>
</html>
```

`tokens.css` — paste the full `:root {}` block from `portfolio-design-tokens` SKILL.md (typography, colors, effects, opacity vars).

---

## 2. Header

### Key visual concept — pill container IS the header

The header is not a full-width bar. The **pill itself is the header**: a capsule-shaped container with `border-radius: 100px`, backdrop blur and shadow applied to the pill, not to a background strip. It is centred on the page and matches content-wrap width exactly.

```
<header> — full viewport width, sticky, transparent bg
  └── .header__pill — the visible pill (800px / 640px / fluid)
        └── contents vary by variant and breakpoint
```

---

### Two variants

| Variant | Page | Desktop/Tablet pill contents | Mobile pill contents |
|---|---|---|---|
| `home` | `/` | NameBlock (left) · ResumeButton (right) | BurgerButton only (left-aligned) |
| `case` | `/cases/[slug]` | NameBlock (left) · ResumeButton (right) + KeyWordToggle **outside pill left** | BurgerButton · KeyWordToggle · NameBlock · ResumeButton (all inside pill, space-between) |

On the **case page desktop/tablet** the KeyWordToggle sits **outside and to the left of the pill**, in the same flex row as the pill, gap `clamp(12px, 2vw, 20px)`. The outer row is `[KeyWordToggle · pill]`.

On **case page mobile (≤440px)** ALL elements move inside the pill in a single row with `justify-content: space-between`: `[BurgerButton] [KeyWordToggle] [NameBlock] [ResumeButton]`. The desktop KeyWordToggle is hidden (`display: none`) and the mobile instance (`.header__toggle-mobile`) is shown.

---

### Pill sizing per breakpoint

| Breakpoint | Pill width | Side margins |
|---|---|---|
| Desktop ≥ 1440px | 800px | auto (centred) |
| H-Tablet 745–1439px | 800px | auto (centred) |
| V-Tablet ≤ 744px | 640px | auto (centred) |
| Mobile ≤ 440px | fluid | 20px each side |

---

### Desktop / H-Tablet (≥745px)

```
┌─────────────────── viewport ───────────────────┐
│          ╭── pill 800px ──────────────────╮     │
│          │ vanya.cfivti        [Резюме]   │     │  ← homepage
│          ╰────────────────────────────────╯     │
└────────────────────────────────────────────────┘

┌─────────────────── viewport ───────────────────┐
│     [≡]  ╭── pill 800px ──────────────────╮    │
│          │ vanya.cfivti        [Резюме]   │    │  ← case page
│          ╰────────────────────────────────╯    │
└────────────────────────────────────────────────┘
```

#### NameBlock
- Text: designer name + alias, single node
- Typography: `--text-header-3` (20px Medium)
- Link to `/`

#### ResumeButton
- `btn--header btn--pill` (radius 100px, inside pill)
- Default: transparent fill, `border: 1px solid var(--color-black-1050)`, text `--text-button-1`
- Hover: fill `var(--color-black-1000)`, text → `icon-arrow-1`, **no transition**
- `href` → Yandex Disk, `target="_blank"`

#### KeyWordToggle (case page, desktop)
- Sits left of pill, gap `clamp(12px, 2vw, 20px)`
- Icons: `icon-text-false` (default) / `icon-text-true` (active)
- Active fill: `var(--color-accent-blue-4000)`
- Toggles `synopsis-mode` on `<body>`

---

### V-Tablet (≤744px)

Same structure as desktop. Pill width → 640px.

---

### Mobile (≤440px)

The pill adapts: fluid width, `margin-inline: 20px`. Contents change per variant.

**Homepage mobile:**
```
╭── pill (fluid, justify-content: flex-start) ──╮
│ [☰]                                           │   ← BurgerButton only, left-aligned
╰───────────────────────────────────────────────╯
```
Name and ResumeButton are hidden (`display: none`) via `.variant-home .header__name` and `.variant-home .header__resume`.

**Case page mobile:**
```
╭── pill (fluid, justify-content: space-between) ─────────────────╮
│ [☰]   [≡ toggle]    vanya.cfivti           [Резюме]             │
╰──────────────────────────────────────────────────────────────────╯
```
All four elements inside the pill. Desktop KeyWordToggle hidden. Mobile KeyWordToggle (`.header__toggle-mobile`) shown.

#### BurgerButton states
| State | Icon | aria-label |
|---|---|---|
| Closed | `icon-burger` | "Открыть меню" |
| Open | `icon-arrow-left` | "Закрыть меню" |

Swap is **instant, no transition**.

#### Mobile menu overlay
- `position: fixed; inset: 0; z-index: 200`
- Background: `var(--color-white-3000)`
- Two plain text links — no border, no icon, no pill shape:

```
На главную страницу   — --text-button-1, color: --color-black-1000
Резюме                — --text-button-1, color: --color-black-1000
```

- Hover: `var(--color-accent-blue-4050)`, no transition
- Closes on: second tap of burger, or any link tap
- `<body>` gets `overflow: hidden` while open

---

```astro
---
// src/components/Header.astro
const { variant = 'home' } = Astro.props;
---
<header class="site-header" id="site-header">
  <div class="site-header__row">

    {variant === 'case' && (
      <button class="keyword-toggle header__toggle-desktop"
              id="keyword-toggle"
              aria-pressed="false" aria-label="Режим чтения">
        <span class="keyword-toggle__off"><!-- icon-text-false --></span>
        <span class="keyword-toggle__on"><!-- icon-text-true --></span>
      </button>
    )}

    <!-- THE PILL -->
    <div class="header__pill">

      <!-- Mobile: burger (always) -->
      <button class="btn btn--circle header__burger" id="burger-btn"
              aria-label="Открыть меню" aria-expanded="false"
              aria-controls="mobile-menu">
        <span class="burger-icon"><!-- icon-burger --></span>
        <span class="burger-back"><!-- icon-arrow-left --></span>
      </button>

      {variant === 'case' && (
        <!-- Mobile: keyword toggle inside pill -->
        <button class="keyword-toggle header__toggle-mobile"
                aria-pressed="false" aria-label="Режим чтения">
          <span class="keyword-toggle__off"><!-- icon-text-false --></span>
          <span class="keyword-toggle__on"><!-- icon-text-true --></span>
        </button>
      )}

      <!-- Name (hidden on mobile homepage, visible on mobile case) -->
      <a href="/" class="header__name">vanya.cfivti</a>

      <!-- Resume button (hidden on mobile homepage, visible on mobile case) -->
      <a href="https://disk.yandex.ru/..."
         target="_blank" rel="noopener"
         class="btn btn--header btn--pill header__resume"
         aria-label="Открыть резюме">
        <span class="btn__text">Резюме</span>
        <span class="btn__icon" aria-hidden="true"><!-- icon-arrow-1 --></span>
      </a>

    </div><!-- /.header__pill -->
  </div><!-- /.site-header__row -->

  <!-- Mobile menu overlay -->
  <div class="mobile-menu" id="mobile-menu" aria-hidden="true">
    <nav class="mobile-menu__nav">
      <a href="/" class="mobile-menu__link">На главную страницу</a>
      <a href="https://disk.yandex.ru/..." target="_blank" rel="noopener"
         class="mobile-menu__link">Резюме</a>
    </nav>
  </div>

</header>
```

```css
/* ── Outer wrapper ── */
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-block: 16px;
}

/* ── Row: [toggle] [pill] ── */
.site-header__row {
  display: flex;
  align-items: center;
  gap: clamp(12px, 2vw, 20px);
  width: 800px;          /* matches content-wrap desktop */
}

/* ── THE PILL ── */
.header__pill {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 100px;
  padding: 10px 10px 10px 24px;
  background: var(--color-white-3050);
  backdrop-filter: var(--effect-header-blur);
  box-shadow: var(--effect-header-shadow);
}

/* ── NameBlock ── */
.header__name {
  font: var(--text-header-3);
  color: var(--color-black-1000);
  text-decoration: none;
}

/* ── KeyWordToggle ── */
.keyword-toggle__on  { display: none; }
.keyword-toggle__off { display: inline-flex; }
.keyword-toggle[aria-pressed="true"] .keyword-toggle__on  { display: inline-flex; }
.keyword-toggle[aria-pressed="true"] .keyword-toggle__off { display: none; }
.keyword-toggle[aria-pressed="true"] { color: var(--color-accent-blue-4000); }

/* ── BurgerButton: hidden on desktop ── */
.header__burger      { display: none; }
.burger-back         { display: none; }
.header__burger[aria-expanded="true"] .burger-icon { display: none; }
.header__burger[aria-expanded="true"] .burger-back { display: inline-flex; }

/* ── Mobile keyword toggle inside pill: hidden on desktop ── */
.header__toggle-mobile { display: none; }

/* ── Mobile menu overlay ── */
.mobile-menu {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 200;
  background: var(--color-white-3000);
  flex-direction: column;
  justify-content: center;
  padding-inline: 20px;
}
.mobile-menu[aria-hidden="false"] { display: flex; }
.mobile-menu__nav {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.mobile-menu__link {
  font: var(--text-button-1);
  color: var(--color-black-1000);
  text-decoration: none;
  background: none;
  border: none;
}
.mobile-menu__link:hover { color: var(--color-accent-blue-4050); }

/* ── V-Tablet ── */
@media (max-width: 744px) {
  .site-header__row { width: 640px; }
}

/* ── Mobile ── */
@media (max-width: 440px) {
  .site-header__row {
    width: auto;
    margin-inline: 20px;
  }

  /* hide desktop keyword toggle (it moves inside pill) */
  .header__toggle-desktop { display: none; }

  /* show burger */
  .header__burger { display: inline-flex; }

  /* show mobile keyword toggle (case page) */
  .header__toggle-mobile { display: inline-flex; }

  /* homepage mobile: hide name + resume, pill shows only burger */
  .site-header.variant-home .header__name,
  .site-header.variant-home .header__resume { display: none; }

  /* pill on mobile: left-align burger for homepage */
  .site-header.variant-home .header__pill { justify-content: flex-start; }
}
```

```js
// Scroll effect — pill always has blur/shadow; no class needed
// (shadow/blur are baked into .header__pill — always visible)

// Burger
const burgerBtn  = document.getElementById('burger-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (burgerBtn && mobileMenu) {
  burgerBtn.addEventListener('click', () => {
    const isOpen = burgerBtn.getAttribute('aria-expanded') === 'true';
    burgerBtn.setAttribute('aria-expanded', String(!isOpen));
    burgerBtn.setAttribute('aria-label', isOpen ? 'Открыть меню' : 'Закрыть меню');
    mobileMenu.setAttribute('aria-hidden', String(isOpen));
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burgerBtn.setAttribute('aria-expanded', 'false');
      burgerBtn.setAttribute('aria-label', 'Открыть меню');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });
}

// Synopsis toggle — sync all instances
document.querySelectorAll('.keyword-toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const active = toggle.getAttribute('aria-pressed') === 'true';
    document.querySelectorAll('.keyword-toggle').forEach(t =>
      t.setAttribute('aria-pressed', String(!active))
    );
    document.body.classList.toggle('synopsis-mode', !active);
  });
});
```

### Important note on scroll effect

Since the pill **always** has backdrop blur and shadow baked in, there is no scroll-triggered class needed on the header itself (unlike a traditional full-width header bar). The `header-shadow` and `header-substrate` effects are permanent properties of `.header__pill`.
  font: var(--text-button-1);       /* 20px Regular */
  color: var(--color-black-1000);
  text-decoration: none;
  background: none;
  border: none;
}
.mobile-menu__link:hover { color: var(--color-accent-blue-4050); }

/* ── Breakpoints ── */
@media (max-width: 744px) {
  .header__band { width: 640px; }
}

@media (max-width: 440px) {
  .header__band   { display: none; }      /* hide desktop band entirely */
  .header__mobile {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-inline: 20px;
    padding-block: 16px;
  }
}
```

```js
// Scroll effect
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 0);
});

// Burger menu
const burgerBtn  = document.getElementById('burger-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (burgerBtn && mobileMenu) {
  burgerBtn.addEventListener('click', () => {
    const isOpen = burgerBtn.getAttribute('aria-expanded') === 'true';
    burgerBtn.setAttribute('aria-expanded', String(!isOpen));
    burgerBtn.setAttribute('aria-label', isOpen ? 'Открыть меню' : 'Закрыть меню');
    mobileMenu.setAttribute('aria-hidden', String(isOpen));
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  // Close on link tap
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burgerBtn.setAttribute('aria-expanded', 'false');
      burgerBtn.setAttribute('aria-label', 'Открыть меню');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });
}

// Synopsis toggle (works for both desktop and mobile instances)
document.querySelectorAll('.keyword-toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const active = toggle.getAttribute('aria-pressed') === 'true';
    // sync both instances
    document.querySelectorAll('.keyword-toggle').forEach(t => {
      t.setAttribute('aria-pressed', String(!active));
    });
    document.body.classList.toggle('synopsis-mode', !active);
  });
});
```

```css
/* header layout */
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  transition: box-shadow 0.2s, backdrop-filter 0.2s;
}

.site-header.scrolled {
  box-shadow: var(--effect-header-shadow);
  backdrop-filter: var(--effect-header-blur);
  background: linear-gradient(to bottom, var(--color-white-3000), var(--color-white-3050));
}

.header__band {
  display: flex;
  align-items: center;
  gap: clamp(12px, 2vw, 20px);
  width: 800px;
  margin-inline: auto;
  padding-block: 16px;
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
}

/* keyword toggle state */
.keyword-toggle__on  { display: none; }
.keyword-toggle__off { display: inline-flex; }
.keyword-toggle[aria-pressed="true"] .keyword-toggle__on  { display: inline-flex; }
.keyword-toggle[aria-pressed="true"] .keyword-toggle__off { display: none; }
.keyword-toggle[aria-pressed="true"] { color: var(--color-accent-blue-4000); }

/* mobile: hide name + resume btn, show burger */
.header__burger { display: none; }

@media (max-width: 744px) {
  .header__band { width: 640px; }
}

@media (max-width: 440px) {
  .header__band { width: auto; padding-inline: 20px; }
  .header__name,
  .btn--header:not(.header__burger) { display: none; }
  .header__burger { display: inline-flex; }
}
```

```js
// scroll class
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 0);
});

// synopsis toggle
const toggle = document.getElementById('keyword-toggle');
if (toggle) {
  toggle.addEventListener('click', () => {
    const active = toggle.getAttribute('aria-pressed') === 'true';
    toggle.setAttribute('aria-pressed', String(!active));
    document.body.classList.toggle('synopsis-mode', !active);
  });
}
```

---

## 3. CaseCard

Used on homepage (list) and at the bottom of case pages (footer card — next case).

### Layout per breakpoint

| Breakpoint | Container width | Card width |
|---|---|---|
| Desktop / H-Tablet | 800px (content-wrap) | Fill — 100% of content-wrap |
| V-Tablet | 640px | Fill — 100% of 640px column |
| Mobile | fluid (minus 20px margins) | Fill — 100% |

Single column always. Cards stack vertically.

### Card anatomy

```
CaseCard
├── Image / Cover         — responsive <picture> with 2–3 srcset copies
├── Meta row
│   ├── Project type      — description-1 (16px Regular)  ← key token usage
│   └── Year / Tags       — description-1
└── Title                 — header-1 (28px Medium)
    └── OpenButton        — btn--page (radius 8px), icon-arrow-1
```

> `description-1` is the **only** token used for the project type label under the card title and in the case footer card meta. Do not use body-1 or body-2 here.

```astro
---
// src/components/CaseCard.astro
const { title, type, year, cover, href } = Astro.props;
---
<article class="case-card">
  <a href={href} class="case-card__cover-link" tabindex="-1" aria-hidden="true">
    <picture>
      <source media="(max-width: 440px)"  srcset={cover.mobile} />
      <source media="(max-width: 744px)"  srcset={cover.tablet} />
      <img src={cover.desktop} alt={title} loading="lazy" />
    </picture>
  </a>
  <div class="case-card__meta">
    <span class="case-card__type">{ type }</span>
    <span class="case-card__year">{ year }</span>
  </div>
  <div class="case-card__footer">
    <h2 class="case-card__title">
      <a href={href}>{ title }</a>
    </h2>
    <a href={href} class="btn btn--page" aria-label={`Открыть кейс: ${title}`}>
      <span class="btn__icon" aria-hidden="true"><!-- icon-arrow-1 --></span>
    </a>
  </div>
</article>
```

```css
.case-card {
  width: 100%; /* fill content-wrap */
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.case-card__cover-link img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
}

.case-card__meta {
  display: flex;
  gap: 12px;
  font: var(--text-description-1);     /* 16px Regular — project type token */
  color: var(--color-black-1050);
}

.case-card__title {
  font: var(--text-header-1);          /* 28px Medium */
  color: var(--color-black-1000);
}

.case-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

### CaseFooterCard (bottom of case page)

Same component, different context — sits in the case article after the last content block. Leads to the next case. Uses identical token set: `description-1` for type label, `header-1` for title.

---

## 4. Case page — content area

```
<main>
  <article class="case-content content-wrap">
    <h1 class="case-title">          — title-1 (32px Medium) — page title ONLY
    <div class="case-body">
      <p>                            — body-1 (24px Regular), opacity --text-opacity-default (55%)
      <span class="key">             — keyword, opacity raised to 100% in synopsis-mode
      <h2>                           — header-2 (24px Medium)
      <h3>                           — header-3 (20px Medium)
      <picture> / <video>            — responsive media
      <div class="tbl-scroll-wrap">  — table with sticky first column on mobile/v-tablet
```

### Synopsis mode CSS (place in global.css)

```css
article p,
article li { opacity: var(--text-opacity-default); transition: opacity 0.15s; }
article .key { opacity: var(--text-opacity-default); }

body.synopsis-mode article p,
body.synopsis-mode article li  { opacity: var(--text-opacity-dim); }
body.synopsis-mode article .key { opacity: var(--text-opacity-key); }
```

### body-2 usage rule

`body-2` (20px Regular) is **mobile-only body text**. Apply via media query — never hardcode it on desktop:

```css
.case-body p { font: var(--text-body-1); }  /* 24px — all breakpoints */

@media (max-width: 440px) {
  .case-body p { font: var(--text-body-2); } /* 20px — mobile only */
}
```

---

## 5. Responsive images & video

Every visual asset in case pages comes in **2–3 size copies** for different breakpoints. Always use `<picture>` for images and `<source>` for video.

```html
<!-- Image -->
<picture>
  <source media="(max-width: 440px)"  srcset="/img/case-name-mobile.webp" />
  <source media="(max-width: 744px)"  srcset="/img/case-name-tablet.webp" />
  <img src="/img/case-name-desktop.webp" alt="Description" loading="lazy" />
</picture>

<!-- Video -->
<video autoplay muted loop playsinline>
  <source media="(max-width: 440px)"  src="/video/case-name-mobile.mp4"  type="video/mp4" />
  <source media="(max-width: 744px)"  src="/video/case-name-tablet.mp4"  type="video/mp4" />
  <source                             src="/video/case-name-desktop.mp4" type="video/mp4" />
</video>
```

**Format rules:**
- Images → WebP, max 2 MB per file
- Video → MP4 (H.264) or WebM; host heavy video on external service (Vimeo / Cloudflare Stream) and embed — do not self-host files over 2 MB

---

## 6. Page entry animation (Homepage)

Text blocks on the homepage animate in on scroll using `IntersectionObserver`. CSS-only, no libraries.

```css
.animate-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.animate-in.visible {
  opacity: 1;
  transform: none;
}
```

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));
```

Apply `.animate-in` to: `CaseCard`, section headings, hero text blocks.

---

## 7. Content-wrap — single source of truth

All page content sits inside `.content-wrap`. One definition, used everywhere:

```css
.content-wrap {
  width: 800px;
  margin-inline: auto;
}

@media (max-width: 744px) {
  .content-wrap { width: 640px; }
}

@media (max-width: 440px) {
  .content-wrap { width: auto; padding-inline: 20px; }
}
```

**Never** set a fixed width on a component itself — let it `fill` (width: 100%) inside `.content-wrap`.

---

## 8. Quick assembly checklist

Before writing any component, run through this list:

```
1. Does it need a content-wrap?          → yes if it's page-level content
2. What typography token?                → check token table, never guess sizes
3. Which button context?                 → btn--page (8px) or btn--header (100px)
4. Does the button have text OR icon?    → never both in same state
5. Is this a case page?                  → add KeyWordToggle to Header
6. Are there images/video?               → use <picture> + WebP, 2–3 sizes
7. Is there a table?                     → wrap in .tbl-scroll-wrap, sticky first col on mobile
8. Does text need synopsis support?      → wrap key phrases in <span class="key">
9. Mobile breakpoint?                    → body-2 for text, burger replaces name+resume
10. New case to add?                     → new file in /src/pages/cases/[slug].astro only
```

---

## 9. File structure reference

```
src/
├── components/
│   ├── Header.astro
│   ├── CaseCard.astro
│   └── KeyWordToggle.astro
├── icons/
│   ├── arrow-1.svg
│   ├── arrow-2-right.svg
│   ├── arrow-2-left.svg
│   ├── arrow-right.svg
│   ├── arrow-left.svg
│   ├── pin.svg
│   ├── text-true.svg
│   ├── text-false.svg
│   └── burger.svg
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── index.astro          ← homepage
│   └── cases/
│       ├── case-1.astro
│       └── case-2.astro     ← add new cases here only
├── styles/
│   ├── tokens.css           ← :root { all CSS custom properties }
│   └── global.css           ← resets, .content-wrap, .btn, synopsis, animate-in
└── public/
    ├── img/                 ← case images (WebP, 3 sizes each)
    └── video/               ← case videos (MP4/WebM, 3 sizes each)
```

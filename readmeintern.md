# Baghlabs — Internal Engineering Guide

Internal reference for maintaining this site. Read this before touching
anything so the small stuff (locales, chapter labels, agency register,
motion primitives) doesn't blow up on you.

---

## 1. What this site is

Baghlabs is a solo **AI systems studio** in Vlaanderen. The site
positions Baghlabs as: _bespoke internal AI software for businesses that
have outgrown off-the-shelf tools_.

It sells five service pillars:

| # | Pillar | Slug (URL) | Notes |
|---|---|---|---|
| 01 | AI Workflows | `ai-workflows` | Yellow-ish accent internally |
| 02 | Knowledge Bases (Besloten kennissystemen) | `kennissystemen` | Cyan-ish |
| 03 | Document & Data Processing | `documentverwerking` | Magenta-ish |
| 04 | Systems Integration | `integraties` | Lime-ish |
| 05 | Custom Software Development | `softwareontwikkeling` | Neutral, foundation |

> **Note:** the "accent colours" above only survive as historical hints
> in `src/data/services/*.json`. The site itself no longer uses them —
> everything is **noir/paper/oxblood**. See §5.

The site is **bilingual, Dutch-first**. URLs are translated: NL uses
`/diensten/`, `/projecten/`, `/over-ons/`; English mirrors under `/en/`
use `/services/`, `/cases/`, `/about/`.

---

## 2. Quick start

```bash
npm install
npm run dev              # Vite dev server, hot reload
npm run dev:netlify      # Netlify Dev (runs functions locally too)
npm run build            # production build → /dist
npm run preview          # preview the production build
npm run lint             # ESLint (strict: 0 warnings)
```

Node 18+ recommended (Netlify pins 18 in `netlify.toml`).

---

## 3. Tech stack

| Layer | Library | Where |
|---|---|---|
| Framework | React 18 + Vite | root |
| Routing | react-router-dom v6 | `src/App.jsx` |
| Styling | Tailwind CSS + custom utilities | `tailwind.config.js`, `src/index.css` |
| i18n | react-i18next | `src/lib/i18n.js` |
| Motion | Framer Motion | throughout |
| Smooth scroll | Lenis | `src/components/LenisProvider.jsx` |
| WebGL (hero bg) | Vanta HALO + three.js | `src/components/ui/vanta-halo.jsx` |
| WebGL (case gallery) | three.js (custom shader) | `src/components/sections/Home/SelectedWork.jsx` |
| Icons | lucide-react | throughout |
| Forms | react-google-recaptcha | `src/pages/Contact.jsx` |
| Fonts | Google Fonts (Fraunces, Inter, JetBrains Mono) | `@import` in `src/index.css` |

---

## 4. Directory map

```
src/
├── App.jsx                       # route tree — NL + EN mirrors
├── main.jsx                      # root render, wraps <App> in <LenisProvider>
├── index.css                     # Tailwind + design tokens + utilities + @keyframes fadeIn
│
├── assets/                       # /public images live in ../public/assets
│
├── components/
│   ├── Layout.jsx                # wraps every route, syncs i18n lang, renders Header + Outlet
│   ├── Header.jsx                # floating top bar (wordmark + Menu button) + full-screen menu with services dropdown
│   ├── ScrollToTop.jsx           # on route/hash change, tells Lenis to scroll (top OR #id)
│   ├── LenisProvider.jsx         # sets up the Lenis instance, exposes it via context
│   │
│   ├── motion/                   # Reusable scroll/reveal primitives
│   │   ├── SplitReveal.jsx       # word-by-word mask reveal
│   │   ├── Parallax.jsx          # useScroll → y-translate
│   │   └── CursorSpotlight.jsx   # radial oxblood glow that follows cursor (desktop)
│   │
│   ├── sections/
│   │   ├── Home/
│   │   │   ├── index.js          # exports HeroBlock, SelectedWork, PillarGrid, ProcessStages, CTASection
│   │   │   ├── HeroBlock.jsx     # Vanta halo + poster h1 + tagline + CTA
│   │   │   ├── SelectedWork.jsx  # full-viewport WebGL gallery with grain-dissolve between cases
│   │   │   ├── PillarGrid.jsx    # typographic index of 4 pillars + foundation
│   │   │   ├── ProcessStages.jsx # pinned viewport, AnimatePresence cross-fade between 3 stages
│   │   │   └── CTASection.jsx    # pre-footer CTA slab + colophon footer with lang toggle
│   │   └── About/
│   │       ├── HeroSection.jsx, StorySection.jsx, NetworkSection.jsx, TestimonialsSection.jsx
│   │
│   └── ui/                       # Building blocks (some legacy, some current)
│       ├── vanta-halo.jsx        # dynamic-imports vanta+three, HALO backdrop for hero
│       ├── service-graphic.jsx   # 5 mini-UI mockups (kanban, chat, extractor, hub, editor)
│       ├── planning-timeline.jsx # Gantt-style schedule from intro-call → live
│       ├── container-scroll.jsx  # 3D perspective scroll hero (used by CaseDetail for web/software cases)
│       ├── creative-hero.jsx     # full-viewport parallax image hero (used by CaseDetail for creative cases)
│       ├── case-gallery.jsx      # embla carousel of case cards (used on service detail related-work section)
│       ├── case-tabs.jsx         # tabs for /projecten filtering
│       ├── glow-button.jsx       # oxblood-on-paper button (`solid`, `ghost`, `outline`, `poster`)
│       ├── surface.jsx           # dark card container with hairline borders
│       ├── animated-testimonials.jsx  # carousel of client quotes (used by Contact + About)
│       └── (shadcn primitives)   # input, textarea, label, checkbox, radio-group, avatar, separator, badge, card, button
│
├── data/
│   ├── cases/                    # 12 case JSONs, one per project — see §9
│   │   ├── index.js              # exports { cases, webCases, creativeCases, getCaseById, getFeaturedCases }
│   │   └── *.json                # availly, shiftend, ...
│   ├── services/                 # 5 pillar JSONs — see §8
│   │   ├── index.js              # exports { pillars, getPillar }
│   │   └── *.json                # ai-workflows, kennissystemen, ...
│   └── testimonials.json         # client quotes for AnimatedTestimonials
│
├── lib/
│   ├── i18n.js                   # i18next config, imports all locale JSONs
│   ├── useLenis.js               # hook to grab the Lenis instance
│   ├── usePathAlternate.js       # NL↔EN URL segment translator + useLangPath / useCurrentLang
│   └── utils.js                  # cn() (tailwind class merge)
│
├── locales/                      # ALL user-visible copy lives here
│   ├── nl/                       # common, home, cases, services, contact, about
│   └── en/                       # mirror
│
└── pages/                        # Route components
    ├── Home.jsx                  # renders 5 Home sections
    ├── Cases.jsx                 # listing with filter tabs, calls CaseGallery
    ├── CaseDetail.jsx            # per-project detail; renders ContainerScroll OR CreativeHero based on template
    ├── ServiceDetail.jsx         # per-pillar detail; renders ServiceGraphic + PlanningTimeline + (optional) related cases
    ├── About.jsx                 # essay layout
    └── Contact.jsx               # multi-step form
```

---

## 5. Design tokens

Defined in `tailwind.config.js`. Retinting values here propagates
everywhere — don't inline hex colours in components.

### Palette

| Token | Hex | Meaning |
|---|---|---|
| `bg-noir` | `#0C0A08` | Page background (dark warm charcoal) |
| `bg-noir-2` | `#141110` | Raised surfaces (cards) |
| `bg-noir-3` | `#1D1815` | Deeper surface (inputs, inner frames) |
| `bg-noir-4` | `#2A231D` | Hover states on `noir-3` |
| `text-paper` | `#E8E1D0` | Primary text on dark |
| `text-paper-2` | `#D6CCB4` | Secondary paper (rarely used) |
| `text-oxblood` | `#9C2626` | Signature accent (borders, CTAs, chapter labels, highlights) |
| `text-oxblood-2` | `#7A1E1E` | Deeper oxblood (hover / darker fills) |
| `text-oxblood-3` | `#5C1616` | Deepest oxblood |

**Text opacity ladder** (Tailwind arbitrary alpha):
`text-paper` (100), `/85`, `/70`, `/60`, `/45`, `/35`, `/25`, `/15`, `/10`.

### Typography

| Class | Font | Size | Use |
|---|---|---|---|
| `.poster-1` | Fraunces 700 | clamp(2.25rem, min(10vw, 13vh), 9rem) | Hero H1 (constrained by viewport height so it never eats the fold) |
| `.poster-2` | Fraunces 700 | clamp(2.5rem, 6vw, 5rem) | Section H2 |
| `.poster-3` | Fraunces 600 | clamp(1.6rem, 3.2vw, 2.25rem) | Card / sub-section titles |
| `.chapter` | Inter 600 uppercase | 0.68rem, tracking 0.22em, **oxblood** | Section eyebrow labels ("Cap. II — Recent werk") |
| `.smallcaps` | Inter 500 uppercase | 0.7rem, tracking 0.18em | UI microtext (labels, meta, counters) |
| `font-display` | Fraunces | — | Add to `<p>` for italic serif body accents |
| `font-mono` | JetBrains Mono | — | Code, small numeric labels |

### Utility classes worth knowing

| Class | What it does |
|---|---|
| `.container-custom` | max-w-6xl, centered, horizontal padding |
| `.container-wide` | max-w-1440px, centered, horizontal padding |
| `.rule-oxblood` | 1px oxblood horizontal rule |
| `.rule-ink` | 1px paper/10 rule |
| `.frame` | 1px oxblood border |
| `.frame-ink` | 1px paper/15 border |
| `.dot-leader` | Fills a flex row with dot-leaders between two spans (used in `PillarGrid`, footer `Index`) |
| `.split-word` | Ships with `SplitReveal` — has padding-bottom+neg-margin to protect descenders inside the mask clip |
| `.section-padding` | py-20 md:py-32 |

### `@keyframes fadeIn`

Defined at the bottom of `src/index.css`. **Do not remove** — the Hero
tagline and CTA use inline `animation: fadeIn` styles, and Tailwind
won't emit the keyframe if no class references it. Removing this makes
those elements silently stay at `opacity: 0` forever.

---

## 6. Motion & third-party components

### Lenis smooth scroll

`LenisProvider` wraps `<App />` in `main.jsx`. On mount it creates a
Lenis instance, ties a requestAnimationFrame loop to it, and exposes it
via context.

- To scroll programmatically: `const lenis = useLenis(); lenis?.scrollTo(target, opts)`.
- `ScrollToTop.jsx` intercepts route + hash changes and calls
  `lenis.scrollTo(0, { immediate: true })` for top or
  `lenis.scrollTo(#hash-el, { offset: -80, duration: 1.4 })` for anchors.
- Lenis skips init on `prefers-reduced-motion`; the fallback is native
  scroll.
- Related CSS lives under the `/* Lenis */` block in `src/index.css`.

### Framer Motion

Used throughout. Common patterns:

```jsx
<motion.div
  initial={{ opacity: 0, y: 16 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-60px' }}
  transition={{ duration: 0.4, delay: index * 0.08 }}
>
```

For pinned/sticky scroll sections, use `useScroll` + `useTransform` (see
`ProcessStages.jsx` and `SelectedWork.jsx` for the shape).

### Motion primitives

- **`<SplitReveal>`** — wrap a string; it splits into words and reveals
  them via a mask (translateY 110% → 0) with stagger. Two triggers:
  `trigger="load"` fires immediately with a delay, `trigger="view"` fires
  on IntersectionObserver.
- **`<Parallax>`** — wraps children with a scroll-linked Y translate.
- **`<CursorSpotlight>`** — soft radial oxblood glow that follows the
  cursor with `mix-blend-mode: screen`. Desktop only (touch detection
  skips it).

### Vanta HALO

`src/components/ui/vanta-halo.jsx` dynamically imports `vanta/dist/vanta.halo.min`
and `three`. Config is tuned deeper than Vanta's default preset
(`amplitudeFactor: 1.6`, off-center xOffset). Renders in the Home hero
behind a linear gradient overlay that protects text contrast. Skips init
on reduced motion.

### Full-screen WebGL case gallery

`SelectedWork.jsx` runs its **own** three.js scene (separate from Vanta).
Preloads all featured case textures on mount, renders a full-screen
plane with a custom fragment shader that grain-dissolves between the
current and next textures based on scroll progress. Also applies a
velocity-driven horizontal shear so fast scrolling warps the image.

**Featured case list** is a constant `FEATURED_IDS` at the top of
`SelectedWork.jsx` — edit that array to change which cases show up on
the home page.

---

## 7. Home page anatomy

`src/pages/Home.jsx` just composes these in order:

```
HeroBlock       — Vanta halo + Fraunces poster h1 + tagline + CTA
SelectedWork    — full-viewport WebGL case gallery (curated 6)
PillarGrid      — typographic index of 4 pillars + foundation strip
ProcessStages   — pinned viewport, cross-fade between 3 process stages
CTASection      — pre-footer CTA + colophon footer with NL/EN toggle
```

To reorder or remove: edit `src/pages/Home.jsx` and its imports.

---

## 8. Editing content

### Golden rule: **content lives in `src/locales/{nl,en}/*.json`**, not in components.

Components pull strings via `t('key')` from react-i18next. If you find
yourself changing a JSX literal, stop and move it to the locale file.

### Locale namespaces

| Namespace | Where it's used |
|---|---|
| `common` | Nav labels, footer, shared UI microtext (sections, cta) |
| `home` | Home page — chapters, labels, hero, pillars, process, cta |
| `about` | About page |
| `services` | Service detail pages + shared page labels |
| `cases` | Cases listing + per-case name/tagline/description/challenge/solution/etc |
| `contact` | Contact form (fields, steps, budget, services checkboxes) |

### Common edits — where to change what

| I want to change… | File | Key |
|---|---|---|
| Hero H1 lines | `locales/{nl,en}/home.json` | `hero.titleLine1/2/3` |
| Hero tagline | same | `hero.tagline` |
| Hero CTA button label | same | `hero.primaryCta` |
| Chapter labels ("Cap. II — Recent werk") | `home.json` | `chapters.manifest / work / services / process / next` |
| Small UI labels ("Scroll", "Werk", "Fase", "Colofon") | `home.json` | `labels.*` |
| Nav item names | `common.json` | `nav.*` (`cases` = "Case Studies", `about` = "Studio", …) |
| Footer description | `common.json` | `footer.description` |
| Footer CTA button | `common.json` | `footer.workWithUs` |
| Pre-footer headline / body | `home.json` | `cta.headline / body / primary / secondary` |
| Pillar cards on home | `home.json` | `pillars.items[*]` |
| Process stages | `home.json` | `process.stages[*]` |
| Individual pillar page copy | `services.json` | `<pillarId>.{title, subtitle, heroDescription, example}` |
| Pillar hero background copy (scope, deliverables, notForYouIf) | `data/services/<pillarId>.json` | `scope.{nl,en}`, `deliverables.{nl,en}`, `notForYouIf.{nl,en}` |
| Pillar display name (nav dropdown, footer) | `data/services/<pillarId>.json` | `label.{nl,en}` |
| Case name/tagline/description/challenge etc. | `locales/{nl,en}/cases.json` | `<caseId>.{name, tagline, description, longDescription, challenge, solution, results, ...}` |
| Case structural data (image, template, category, year, tech, gallery, videos) | `data/cases/<caseId>.json` | direct fields |
| Timeline phases on service page | `components/ui/planning-timeline.jsx` | `PHASES.nl` / `PHASES.en` constants at top |
| Service graphics content | `components/ui/service-graphic.jsx` | each sub-component (`WorkflowsBoard`, `KnowledgeChat`, …) |

**Voice / copy register** — Dutch uses agency-flavoured anglicisms
("workflow", "brief", "handover", "shippen", "fixed price", "intro call").
Follow the pattern already there. Do NOT translate industry terms
literally — Belgian Dutch business writing does not.

### Nav & menu

`src/components/Header.jsx`:
- Wordmark left, hamburger right (on all breakpoints).
- Full-screen menu contains: main nav (Case Studies, Studio, Contact)
  and an expandable **Services** row that lists all 5 pillars from
  `data/services/index.js`. Add a new pillar there and it appears
  automatically.
- Hardcoded strings in header ("AI Studio" subtitle, "MMXXVI · Vlaanderen"
  in mobile menu colophon) are NOT localized — edit directly if needed.

---

## 9. Cases (portfolio)

### Structure

Each case is a JSON file in `src/data/cases/`. Registered in `index.js`.

```json
{
  "id": "availly",
  "template": "web",           // "web" → ContainerScroll hero, "creative" → CreativeHero
  "image": "/assets/availly/thumbnail.png",
  "heroImage": "/assets/availly/hero.png",  // optional; falls back to image
  "year": "2023",              // optional
  "technologies": [...],       // web-only
  "services": [...],           // creative-only
  "gallery": [...],            // array of image paths
  "videos": [...],             // creative-only, embed URLs
  "category": "productivity",  // free-form category tag (visible)
  "relatedService": "development",  // "development" | "others" — used for filtering on /projecten
  "comingSoon": false,         // if true, listing shows placeholder + disables link
  "websiteUrl": "https://..."  // web-only
}
```

All **user-visible text** for a case lives in `src/locales/{nl,en}/cases.json`
under the case's `id`.

### How templates render

`src/pages/CaseDetail.jsx` reads `template`:
- `template === "web"` → renders `<ContainerScroll>` — 3D perspective
  scroll hero with the screenshot inside a browser-frame that rotates
  and scales as you scroll.
- `template === "creative"` → renders `<CreativeHero>` — full-viewport
  parallax image with a dark overlay and a big Fraunces title.

The floating back-link chip and category chip sit on top of both.

### Adding a new case study

1. Add images to `/public/assets/<case-id>/`.
2. Create `src/data/cases/<case-id>.json` with all structural fields
   (`id`, `template`, `image`, `heroImage`, `gallery`, `category`,
   `relatedService`, etc.).
3. Register it in `src/data/cases/index.js`:
   ```js
   import newcase from './new-case.json'
   export const cases = [newcase, ...others]
   ```
4. Add the case's copy to **both** locale files:
   `src/locales/nl/cases.json` and `src/locales/en/cases.json`, keyed
   by the case's `id`:
   ```json
   "new-case": {
     "name": "New Case",
     "tagline": "One-line pitch.",
     "description": "Short.",
     "longDescription": "Long paragraph.",
     "challenge": "Brief in one sentence.",
     "solution": "Approach in one paragraph.",
     "category": "Ops",
     "industry": "Retail",
     "client": "Client Name",
     "results": ["metric 1", "metric 2"]
   }
   ```
5. To surface it on the **home page** as one of the six spinning cards,
   add its `id` to `FEATURED_IDS` in
   `src/components/sections/Home/SelectedWork.jsx`.
6. `npm run build` — smoke test.

### Filtering on `/projecten`

The tabs on the listing use `relatedService`:
- `all` → everything
- `development` → software work (currently 6 cases tagged `"development"`)
- `ai` → **intentionally empty** with a "coming soon / NDA" state
- `others` → cases tagged `"others"` (branding + marketing legacy work)

If you add an AI case, tag it `"relatedService": "ai"` — the empty
state disappears automatically and the case shows in that tab.

---

## 10. Services / pillars

### Structure

Each pillar is a JSON file in `src/data/services/`. Registered in
`index.js`.

```json
{
  "id": "ai-workflows",
  "slug": "ai-workflows",       // URL segment (matches id)
  "accent": "yellow",           // legacy — no longer used visually
  "order": 1,                   // sort order in menus
  "label": {
    "nl": "AI Workflows",
    "en": "AI Workflows"
  },
  "tagline": { "nl": "…", "en": "…" },
  "positioning": { "nl": "…", "en": "…" },
  "scope": { "nl": [...], "en": [...] },
  "deliverables": { "nl": [...], "en": [...] },
  "notForYouIf": { "nl": [...], "en": [...] }
}
```

Structural bilingual content sits in `data/services/*.json` (bilingual
inline). Per-page copy lives in `locales/{nl,en}/services.json`
under the pillar `id`:
```json
"ai-workflows": {
  "eyebrow": "// Service 01",
  "title": "AI Workflows",
  "subtitle": "Handmatige admin wordt een werkend systeem.",
  "heroDescription": "…",
  "example": { "title": "In practice", "body": "…" }
}
```

### Service detail page layout

`src/pages/ServiceDetail.jsx` renders, in order:
1. Hero (title, subtitle, heroDescription)
2. **Fig. I** — Positioning (tagline + long-form positioning)
3. **Fig. II** — Animated flow graphic (`<ServiceGraphic serviceId={id} lang={lang} />`)
4. Scope + Deliverables (two typographic lists)
5. Example plate (framed callout)
6. Not for you (line-through list)
7. **Planning** — Gantt timeline (`<PlanningTimeline lang={lang} />`)
8. Related cases — **only rendered if there's actual work to show**
9. Other pillars (typographic index)
10. Shared `<CTASection />` (pre-footer + footer)

### Adding a new pillar

1. Create `src/data/services/<new-pillar>.json` (see structure above).
2. Register it in `src/data/services/index.js`:
   ```js
   import newpillar from './new-pillar.json'
   export const pillars = [aiWorkflows, ..., newpillar]
   ```
3. Add its copy to **both** `locales/{nl,en}/services.json` under the
   pillar id.
4. Update the Home page `PillarGrid` locale (`home.pillars.items`) if you
   want it visible on the home page — this array is separate from
   `data/services` because the home page shows a curated subset with
   custom descriptions.
5. Add a per-pillar mockup in
   `src/components/ui/service-graphic.jsx`: add a case to the switch
   in `<ServiceGraphic>` and write its mini-UI component. Follow the
   `<Frame>` + `<Chrome>` pattern used by the other 5.
6. `RELATED_MAP` in `src/pages/ServiceDetail.jsx` — if this new pillar
   has existing cases you want to show under it, add the mapping
   (defaults to `serviceId`, meaning it filters by its own id, which is
   fine for AI pillars that have no cases yet).

### Editing the planning timeline

`src/components/ui/planning-timeline.jsx`. Edit the `PHASES.nl` and
`PHASES.en` arrays at the top. Each phase has:

```js
{
  Icon,            // lucide-react component
  label,           // stage title
  duration,        // human-readable duration (goes into the bar)
  startWeek,       // where bar starts on the ruler (0..TOTAL_WEEKS)
  lengthWeeks,     // bar length in weeks
  desc,            // one-line description under the label
}
```

`TOTAL_WEEKS` is a constant — increase if you add phases that stretch
past week 12.

### Editing service graphics

Each of the 5 pillars has its own mini-UI mockup component in
`src/components/ui/service-graphic.jsx`:

- `WorkflowsBoard` — kanban
- `KnowledgeChat` — chat with streaming answer + source
- `DocumentExtractor` — PDF preview → JSON extraction
- `SystemsHub` — network graph with animated packets
- `CodeEditor` — code editor + terminal

Every graphic uses the shared `<Frame>` + `<Chrome>` wrappers so they
stay visually consistent. All strings inside are inline-localized via
`lang` prop (no locale file entries) — if you add a new mockup, follow
this pattern or add a `serviceGraphic` block to the locales.

---

## 11. Routes & i18n

### Route tree

`src/App.jsx`:

```jsx
// NL (default, no prefix)
/                    → Home
/projecten           → Cases
/projecten/:caseName → CaseDetail
/diensten/:serviceId → ServiceDetail
/contact             → Contact
/over-ons            → About

// EN mirror
/en                    → Home (English)
/en/cases              → Cases
/en/cases/:caseName    → CaseDetail
/en/services/:serviceId → ServiceDetail
/en/contact            → Contact
/en/about              → About
```

### Language switching

Use these helpers from `src/lib/usePathAlternate.js`:

```jsx
import {
  useCurrentLang,     // 'nl' | 'en'
  useLangPath,        // langPath('projects', 'availly') → '/projecten/availly' (or /en/cases/availly)
  usePathAlternate,   // for a given current path, returns the mirror in the other language
  buildLangPath,      // pure function version of useLangPath
} from '@/lib/usePathAlternate'
```

`useLangPath` route keys: `home`, `services`, `projects`, `about`, `contact`.

The **language toggle in the footer** (`CTASection.jsx`) uses
`usePathAlternate` to preserve the current page when switching languages
— so if you're on `/diensten/ai-workflows` and click EN, you land on
`/en/services/ai-workflows`.

### Redirects

`netlify.toml` has 301 redirects from the old NL paths (`/cases`,
`/about`, `/services/*`) to the new ones (`/projecten`, `/over-ons`,
`/diensten/*`). If you rename a route, update these too.

---

## 12. Adding a new page/route

1. Create `src/pages/NewPage.jsx`.
2. Add routes in `src/App.jsx` — both NL and EN trees.
3. If the URL segment is translated, add both segments to `NL_TO_EN` /
   `EN_TO_NL` maps in `src/lib/usePathAlternate.js` and update
   `buildLangPath`.
4. Add nav entry in `src/components/Header.jsx` (`navLinks`) if you
   want it in the menu.
5. Add copy namespace to `src/locales/{nl,en}/` and register it in
   `src/lib/i18n.js`.

---

## 13. Gotchas

- **Do NOT remove `@keyframes fadeIn`** from `src/index.css`. Hero
  tagline + CTA rely on inline `animation: fadeIn ...` styles which
  need the keyframe to exist in compiled CSS. Without it they stay
  invisible.

- **`.split-word` has `overflow: hidden`** to make the mask reveal
  work. It also has `padding-bottom: 0.2em; margin-bottom: -0.2em` so
  descenders (y, j, g, p, q) don't get clipped. Don't remove the
  padding trick.

- **Poster h1 is height-capped**: `clamp(2.25rem, min(10vw, 13vh), 9rem)`.
  The `13vh` cap is deliberate — with 3 lines at 0.95 line-height, the
  hero fits in one viewport with room for tagline + CTA. Lift the cap
  and things will spill off-screen because the hero section is
  `h-screen overflow-hidden`.

- **Lenis + framer-motion sticky sections**: `useScroll` reads native
  scrollY, which Lenis animates. Everything works, but if you see
  janky behaviour make sure the sticky element's parent isn't
  `overflow: hidden` (it can break sticky).

- **three.js is a big chunk** (~734 kB). Vanta HALO and the SelectedWork
  gallery both dynamic-import it, so it's lazy — only loaded on pages
  that need it (basically the home page). Don't top-level-import three
  anywhere else.

- **Text/image sync in SelectedWork**: the shader transition happens in
  the middle 30% of each scroll slot (`smoothstep(0.35, 0.65, ...)`)
  and the text swap is midpoint-shifted (`Math.floor(total + 0.5)`).
  These are paired — changing one requires updating the other.

- **`ContainerScroll` is intentionally light-themed** (`bg-white`,
  `border-[#e2e8f0]`). This makes it look like a physical device
  presented on the dark page — that's the intent, not a bug. If you
  retint it dark it loses that "screen mockup" feel.

- **Avoid-list terms** — do not put these back into copy: `chatbot`,
  `AI solutions`, `digital transformation`, `no-code`, `AI automation
  agency`. There are a few intentional uses in "enemy" positioning
  (comparison table, notForYouIf blocks) — leave those.

- **Chapter labels look language-neutral** (`Cap. II — Recent werk`)
  but the second half changes per language. All chapters + UI labels
  are in `home.chapters.*` and `home.labels.*`. Don't hardcode.

---

## 14. Build & deploy

- **Build**: `npm run build` → outputs to `/dist/`. Netlify runs this
  automatically on push.
- **Netlify config**: `netlify.toml` at repo root (publish dir, redirects,
  Node version, functions dir).
- **Functions**: `netlify/functions/send-contact.js` — the contact form
  posts to `/api/send-contact` which Netlify routes here.
- **Environment variables**: `VITE_RECAPTCHA_SITE_KEY` for the contact
  form's reCAPTCHA (optional; form works without it, recaptcha
  validation is skipped when unset).

---

## 15. When in doubt

- **Copy change** → `src/locales/{nl,en}/*.json`.
- **New pillar** → `src/data/services/` + `services.json` locales +
  optional service-graphic.jsx mockup.
- **New case** → `src/data/cases/` + `cases.json` locales + `FEATURED_IDS`
  if you want it on home.
- **Colour or font** → `tailwind.config.js` + `src/index.css`.
- **Motion tweak** → `src/components/motion/` or the section component
  itself.
- **Chapter label wording** → `home.json` under `chapters.*`.
- **Nav item wording** → `common.json` under `nav.*`.

That's it. Keep the copy in locale files, keep motion in the primitives,
and don't touch the fadeIn keyframe.

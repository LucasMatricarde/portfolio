<div align="center">

# Lucas Matricarde — Portfolio

### *"Engenharia com Alma"*

A professional portfolio built with Angular 21, Three.js, and GSAP — warm stone-beige palette, hexagonal 3D visualization, and accessible by design.

[![Angular](https://img.shields.io/badge/Angular-21-DD0031?style=flat-square&logo=angular)](https://angular.dev)
[![Three.js](https://img.shields.io/badge/Three.js-0.184-black?style=flat-square&logo=threedotjs)](https://threejs.org)
[![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?style=flat-square)](https://gsap.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

**[🔗 Live Demo](#)** <!-- replace with your deployed URL -->

<!-- Add a screenshot or GIF after deploying: -->
<!-- ![Portfolio Preview](./docs/preview.png) -->

</div>

---

## About

Personal portfolio for **Lucas Eduardo de Oliveira Matricarde**, Senior Java Full Stack Developer from Curitiba, Brazil, with 8 years of experience building corporate systems, REST APIs, and scalable architectures.

The visual concept **"Engenharia com Alma"** (*Engineering with Soul*) blends warmth with technical depth:

- **Palette** — stone beige `#f4f1ec` · petróleo blue `#1e5c7a` · amber gold `#a87a28`
- **3D Hero** — concentric hexagon wireframes built with Three.js, referencing [Hexagonal Architecture (Ports & Adapters)](https://alistair.cockburn.us/hexagonal-architecture/)
- **Animations** — GSAP ScrollTrigger reveals, animated counters, 3D tilt on cards
- **Stack** — Angular 21 standalone components, TypeScript 5.9, SCSS with CSS custom properties

Portfolio content is in **Brazilian Portuguese (PT-BR)**.

---

## Features

- **🔷 Three.js Hex Scene** — interactive 3D hexagon visualization in the hero section; reacts to mouse movement, pauses when off-screen via `IntersectionObserver`, degrades gracefully with an inline SVG fallback on no-WebGL environments
- **✨ GSAP Animations** — `ScrollTrigger` scroll-reveal on all sections, animated number counters, `TiltDirective` with up to 5° 3D rotation on cards
- **📬 EmailJS Contact Form** — serverless form submission with no backend required; `@emailjs/browser` is dynamically imported (lazy-loaded)
- **♿ WCAG AA Accessibility** — every `<section>` has `aria-labelledby`, form errors use `aria-live="polite"`, SPA navigation uses `aria-current="location"` (ARIA 1.1), `aria-controls` is only set when the referenced element exists in the DOM
- **📱 Fully Responsive** — mobile-first layout, Three.js DPR capped at 1.5× on mobile, scene group scaled to 0.75× for smaller viewports
- **⚡ Performance** — Three.js is lazy-loaded in a separate chunk (initial bundle < 500 kB), `prefers-reduced-motion` respected in both JS and CSS

---

## Tech Stack

| Category | Technologies |
|---|---|
| **Framework** | Angular 21, TypeScript 5.9, standalone components, `@if`/`@for` control flow |
| **3D & Animation** | Three.js 0.184, GSAP 3.15 (ScrollTrigger, timeline, tilt), Anime.js 4.4 |
| **Styling** | SCSS, CSS Custom Properties, Google Fonts (Outfit, Source Sans 3) |
| **Contact Form** | EmailJS Browser 4.4 (dynamic import → lazy loaded) |
| **Build** | Angular CLI 21, esbuild + Vite |
| **Testing** | Vitest 4, jsdom, `window.matchMedia` mock for GSAP |

---

## Project Structure

```
src/
├── app/
│   ├── app.ts                    # Root standalone component
│   ├── components/               # 10 standalone section components
│   │   ├── header/               # Sticky nav with scroll-spy & mobile menu
│   │   ├── hero/
│   │   │   └── hex-scene/        # Three.js 3D hexagon visualization
│   │   ├── about/
│   │   ├── highlights/           # Animated metric counters
│   │   ├── experience/           # Timeline (GSAP ScrollTrigger)
│   │   ├── projects/
│   │   ├── skills/
│   │   ├── education/
│   │   ├── contact/              # EmailJS form
│   │   └── footer/
│   ├── shared/
│   │   ├── directives/
│   │   │   ├── tilt.directive.ts     # GSAP 3D tilt on hover (≤ 5°)
│   │   │   └── counter.directive.ts  # ScrollTrigger animated counter
│   │   └── models/
│   │       └── portfolio.models.ts   # TypeScript interfaces
│   └── core/
│       └── services/
│           └── contact.service.ts    # EmailJS → Observable wrapper
├── environments/
│   └── environment.ts            # EmailJS credentials (fill before use)
└── styles/
    ├── _variables.scss           # CSS tokens + SCSS mixins/breakpoints
    ├── _reset.scss
    ├── _typography.scss          # Google Fonts + type scale
    └── _animations.scss          # Keyframe library
```

**TypeScript path aliases:**

| Alias | Resolves to |
|---|---|
| `@components/*` | `src/app/components/*` |
| `@shared/*` | `src/app/shared/*` |
| `@core/*` | `src/app/core/*` |
| `@environments/*` | `src/environments/*` |
| `@styles/*` | `src/styles/*` |

---

## Getting Started

### Prerequisites

- **Node.js** 22+
- **npm** 11+

### Install & Run

```bash
git clone https://github.com/LucasMatricarde/portfolio.git
cd portfolio
npm install
npm start        # → http://localhost:4200
```

### Run Tests

```bash
npm test
```

---

## EmailJS Configuration

The contact form uses [EmailJS](https://www.emailjs.com) — no server needed.

1. Create a free account at [emailjs.com](https://www.emailjs.com)
2. Create an **Email Service** and an **Email Template** with these variables:

   | Variable | Value |
   |---|---|
   | `from_name` | Sender's name |
   | `from_email` | Sender's email |
   | `message` | Message body |
   | `to_name` | `Lucas Matricarde` |

3. Fill in `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  emailjs: {
    serviceId:  'YOUR_SERVICE_ID',   // e.g. 'service_abc123'
    templateId: 'YOUR_TEMPLATE_ID',  // e.g. 'template_xyz456'
    publicKey:  'YOUR_PUBLIC_KEY',   // found in Account → API Keys
  },
};
```

---

## Build & Deploy

```bash
npm run build
# Output: dist/portofolio/browser/
```

### Deploy Options

| Platform | Notes |
|---|---|
| **Vercel** (recommended) | Connect GitHub repo → auto-deploy on push |
| **Netlify** | Connect GitHub repo → set build command `npm run build`, publish dir `dist/portofolio/browser` |
| **GitHub Pages** | Add `--base-href /portfolio/` to the build command |

---

## Accessibility

This project was built with accessibility as a first-class concern:

- All `<section>` elements have `aria-labelledby` pointing to their `<h2>` heading
- Contact form: `aria-live="polite"` live regions for validation errors (always present in DOM — VoiceOver fix), `aria-busy`/`aria-disabled` on the submit button during loading
- SPA navigation: `aria-current="location"` on the active link (ARIA 1.1 — correct for in-page scroll, not `"page"`)
- `aria-controls` is conditional — only set when `id="mobile-nav"` actually exists in the DOM
- `aria-hidden="true"` on all decorative icons and SVGs
- `prefers-reduced-motion` respected: Three.js rotation stops, GSAP animations skip, CSS transitions disable
- Color contrast: amber darkened to `#a87a28` (from `#c8973a`) to meet WCAG AA 4.5:1 ratio on beige

---

## License

MIT © Lucas Eduardo de Oliveira Matricarde

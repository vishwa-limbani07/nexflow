# NexFlow — AI-Powered Workflow Automation Landing Page

A high-fidelity SaaS marketing website built with **vanilla HTML, CSS, and JavaScript** — no frameworks, no build tools. Features premium GSAP animations, a fully responsive layout, and a custom orange/red design theme.

---

## Preview

> Live demo: (https://nexflow-psi.vercel.app/)

---

## Features

- **GSAP Animations** — scroll-triggered reveals, pinned "How It Works" section, parallax orbs, stat counters, magnetic buttons
- **Particle Canvas** — interactive WebGL-style particle network in the hero with mouse-repel physics
- **Floating Pill Navbar** — glassmorphism nav that collapses to a burger menu on mobile
- **Custom Cursor** — smooth follower cursor with hover and click states
- **Pricing Toggle** — animated monthly/annual billing switcher
- **Page Loader** — branded entry animation with progress bar
- **Scroll Progress Bar** — fixed top indicator driven by GSAP ScrollTrigger
- **Fully Responsive** — tested across desktop, tablet, and mobile (480px–1440px+)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic) |
| Styling | CSS3 (custom properties, grid, flexbox, clamp) |
| Animations | [GSAP 3](https://gsap.com) + ScrollTrigger + Observer |
| Fonts | Inter + Syne via Google Fonts |
| Icons | Inline SVG |
| Build | None — zero dependencies, zero bundler |

---

## Project Structure

```
nexflow/
├── index.html              # Single-page HTML
├── favicon.svg             # Brand favicon (SVG)
├── css/
│   ├── style.css           # All styles + responsive breakpoints
│   └── animations.css      # Keyframe animations & animation helpers
└── js/
    ├── main.js             # App bootstrap, cursor, nav, pricing toggle
    └── animations/
        ├── hero.js         # Particle canvas + hero entrance timeline
        ├── features.js     # Feature card scroll reveals
        ├── scrollTrigger.js # Pinned HIW section, counters, parallax
        └── splitText.js    # Text line-splitting utility for GSAP
```

---

## Sections

1. **Hero** — headline, CTA, social proof, live particle canvas, floating stat pills
2. **Logos** — auto-scrolling trusted-by ticker
3. **Features** — 6-card grid with icon SVGs and scroll reveals
4. **How It Works** — 3-step pinned scroll section with animated screen mockups
5. **Stats** — animated counters (12K+, 99.9%, 4.2min, 340%)
6. **Testimonials** — 3-column testimonial cards
7. **Pricing** — 3-tier cards with monthly/annual toggle
8. **CTA** — full-width call-to-action with orb background
9. **Footer** — brand, links, and social icons

---

## Getting Started

No installation or build step needed.

```bash
# Clone the repo
git clone https://github.com/vishwa-limbani07/nexflow.git

# Open in browser
open nexflow/index.html
```

Or use any static file server:

```bash
# With Node.js
npx serve nexflow

# With Python
cd nexflow && python3 -m http.server 8080
```

---

## Responsive Breakpoints

| Breakpoint | Layout |
|---|---|
| ≥ 1101px | Full pill navbar with separators |
| ≤ 1100px | Compact navbar (no separators) |
| ≤ 1024px | Single-column hero, 2-col features/stats |
| ≤ 900px | Burger menu, 2-col pricing |
| ≤ 768px | Full mobile layout, stacked HIW screens |
| ≤ 480px | Small mobile, vertical CTA buttons |

---

## Design System

| Token | Value |
|---|---|
| Primary accent | `#f97316` (Orange 500) |
| Secondary accent | `#ef4444` (Red 500) |
| Tertiary accent | `#f59e0b` (Amber 400) |
| Background | `#080507` |
| Surface | `#1c1820` |
| Display font | Syne |
| Body font | Inter |

---

## License

MIT — free to use for personal and commercial projects.

---

*Built by [Vishwa Limbani](https://github.com/vishwa-limbani07)*

# Rab6 Aurora — Production Zero-Dependency Vanilla Digital Invitation

An ultra-luxury, high-performance digital wedding invitation template re-engineered into pure, zero-dependency HTML5, CSS3 (Custom Properties), and Vanilla ES6+ JavaScript.

---

## Technical Stack & Features

- **Zero Build Tools**: No React, Vue, Next.js, Node.js, Webpack, or npm packages required. Runs directly on any static web host or browser.
- **Bilingual Engine**: Complete runtime language toggle between Arabic (RTL) and English (LTR) with true layout mirroring using CSS Logical Properties (`margin-inline`, `padding-inline`, `text-align: start/end`).
- **GPU Canvas Shaders**: Atmospheric volumetric northern lights shader ribbon canvas and ambient stardust particles powered by `requestAnimationFrame` with browser tab visibility optimization.
- **Micro-Interactions**: Interactive glass reflection cards with mouse perspective tilt, real-time countdown timer, gallery lightbox modal with keyboard controls (Esc, Left, Right), and floating luxury audio controller.
- **Accessibility & SEO**: WCAG 2.1 AA contrast compliance, `@media (prefers-reduced-motion: reduce)` fallbacks, OpenGraph tags, Twitter Cards, and Google Event JSON-LD schema.

---

## File Structure

```
/
├── index.html              # Main semantic HTML5 document
├── css/
│   ├── variables.css       # CSS Design tokens (Colors, typography, radii, blur)
│   ├── style.css           # Core layouts, glass cards, reset & form controls
│   ├── animations.css      # Keyframes, hover motion, scroll-reveal IntersectionObserver
│   └── responsive.css      # Fluid media queries & viewport safe areas
├── js/
│   ├── app.js              # Entry point importing ES6 modules
│   ├── animations.js       # Shader canvas, stardust, glass tilt & scroll reveal
│   ├── countdown.js        # Real-time event ticker
│   ├── gallery.js          # Photo category tabs & lightbox modal
│   ├── language.js         # Bilingual i18n manager & dictionary data
│   ├── scroll.js           # Smooth scroll & back-to-top controller
│   └── utils.js            # Copy to clipboard & calendar export (.ics / Google)
└── README.md
```

---

## How to Run

1. Open `index.html` directly in any web browser.
2. Alternatively, serve using any static web server:
   ```bash
   python -m http.server 8000
   ```

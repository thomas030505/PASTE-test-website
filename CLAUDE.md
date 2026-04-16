# PASTE. Website — Claude Code Guide

## Project
Single-file HTML landing page for PASTE., a premium refillable toothpaste brand.
Working file: `index.html`
Assets: `logo-and-website-photos/`

## Screenshot workflow (Puppeteer)

After making visual changes, run the screenshot loop to verify output:

```bash
node screenshot.js
```

Screenshots are saved to `temporary_screenshots/` with a timestamp prefix.
Each run produces: full-page + per-section shots at desktop (1440px), tablet (768px), and mobile (390px).

**Iteration process:**
1. Make CSS/HTML changes to `index.html`
2. Run `node screenshot.js`
3. Review screenshots section by section
4. Fix mismatches
5. Re-run — repeat until output matches intent
6. Periodically delete old screenshots: `rm temporary_screenshots/*`

## Brand design system

**Colors:**
- Forest: `#132B1C` — primary dark bg
- Gold: `#C4923A` — accents, borders, CTAs
- Cream: `#EAE0C8` — light section bg, body text on dark
- White: `#F8F5F0` — warm white, product body tone

**Fonts (Google Fonts):**
- Playfair Display 700/900 — hero title, display
- Cormorant Garamond 300/400/500 — section headings
- Jost 300/400/500 — body text
- DM Mono 400 — labels, monospace details

**Layout rules:**
- Sections alternate dark (forest) and light (cream) backgrounds
- Generous vertical padding: minimum `clamp(80px, 10vw, 120px)`
- Gold ornamental SVG flourishes between label and heading
- All copy is in Norwegian

## Key rules
- Never use pure white — always warm cream `#EAE0C8`
- No English copy on the page
- No social media links (contact only: post@pasteco.no)
- No excessive animation — subtle fade-in on scroll only
- The product image is always the visual hero

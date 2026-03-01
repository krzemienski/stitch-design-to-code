# Design System

The brutalist-cyberpunk token system powering the Stitch design-to-code workflow.

## Design Philosophy

Pure black backgrounds. Hot pink accents. Cyan highlights. Zero border radius. JetBrains Mono everywhere. This is not a design system that apologizes for itself.

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `background` | `#000000` | Page background |
| `primary` | `#e050b0` | Hot pink — CTAs, highlights, links |
| `secondary` | `#4dacde` | Cyan — secondary actions, badges |
| `surface` | `#111111` | Cards, panels |
| `surfaceAlt` | `#1a1a1a` | Elevated surfaces |
| `text` | `#ffffff` | Primary text |
| `textSecondary` | `#a0a0a0` | Secondary/muted text |
| `border` | `#2a2a2a` | Borders, dividers |

## Typography

**Font:** JetBrains Mono — used exclusively across all text elements.

### Install JetBrains Mono

**Option 1: Google Fonts (recommended for web)**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
```

**Option 2: npm package**
```bash
npm install @fontsource/jetbrains-mono
```
```js
// In your _app.tsx or layout.tsx
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import '@fontsource/jetbrains-mono/700.css';
```

**Option 3: Download**
https://www.jetbrains.com/lp/mono/

## Using the Tailwind Preset

### Installation

1. Install the package (or copy the files directly):
```bash
cp -r design-system/ your-project/
```

2. Configure `tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('./design-system/tailwind-preset')],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Add your own theme extensions here
}
```

3. Import in your global CSS:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    background-color: #000000;
    color: #ffffff;
    font-family: 'JetBrains Mono', monospace;
  }
}
```

## Token Reference

### Colors in Tailwind

```html
<!-- Backgrounds -->
<div class="bg-background">          <!-- #000000 -->
<div class="bg-surface">             <!-- #111111 -->
<div class="bg-surface-alt">         <!-- #1a1a1a -->

<!-- Accents -->
<div class="bg-primary">             <!-- #e050b0 -->
<div class="bg-secondary">           <!-- #4dacde -->
<div class="bg-primary-subtle">      <!-- rgba(224,80,176,0.1) -->

<!-- Text -->
<p class="text-text">               <!-- #ffffff -->
<p class="text-text-secondary">     <!-- #a0a0a0 -->
```

### Shadows / Glows

```html
<div class="shadow-card">           <!-- Dark card shadow -->
<div class="shadow-primary-glow">   <!-- Hot pink glow -->
<div class="shadow-secondary-glow"> <!-- Cyan glow -->
```

### Border Radius (Always 0)

All border-radius values are `0px` by design. The brutalist aesthetic demands sharp edges. Never round your corners here.

## Modifying Tokens

Edit `tokens.json` and the Tailwind preset automatically picks up changes. The preset reads tokens at build time via `require('./tokens.json')`.

If you need to override a token for a specific component, use Tailwind's arbitrary value syntax:
```html
<div class="bg-[#1c1c1c] shadow-[0_0_30px_rgba(224,80,176,0.5)]">
```

## Design Principles

1. **No border radius** — Sharp edges everywhere. `border-radius: 0` is non-negotiable.
2. **Monospaced everything** — JetBrains Mono at all sizes, for all text.
3. **Dark surfaces** — Nothing brighter than `#1a1a1a` for backgrounds.
4. **Neon accents** — Use `#e050b0` and `#4dacde` sparingly for maximum impact.
5. **Glow effects** — Box shadows with color are encouraged for interactive states.
6. **High contrast** — White text on black/dark surfaces only.

# Design-to-Code Workflow Guide

The complete step-by-step process for going from zero to production-ready React components using Stitch MCP and Puppeteer validation.

## Overview

```
Phase 1: Design System     → Establish tokens, colors, typography
Phase 2: Prompt Crafting   → Write screen prompts with embedded design system
Phase 3: Stitch Generation → Generate designs via Stitch MCP
Phase 4: React Conversion  → Convert Stitch output to React/Next.js
Phase 5: Validation        → Run Puppeteer check suite
Phase 6: Iteration         → Fix failures, re-generate, re-validate
```

---

## Phase 1: Establish the Design System

**Goal:** Lock in all visual decisions before writing a single prompt.

### Step 1.1 — Define your color palette

Write every color down as a hex value. No ambiguity. "Dark gray" becomes `#111111`. "Accent blue" becomes `#4dacde`. Document:
- Background color
- Primary and secondary accents
- Surface colors (cards, panels, elevated)
- Text colors (primary, secondary, muted)
- Border color
- Semantic colors (success, warning, error)

### Step 1.2 — Choose your typography

For this project: JetBrains Mono exclusively. Document:
- Font family (with fallbacks)
- Size scale (xs through 4xl in rem)
- Weight scale
- Line height presets

### Step 1.3 — Set border radius globally

This project: `0px` everywhere. Brutalist aesthetic. Make this a hard rule — add it to your design token file.

### Step 1.4 — Write your tokens.json

Reference: `design-system/tokens.json` in this repo. This file becomes the single source of truth for every prompt and every component.

### Step 1.5 — Configure your Tailwind preset

Reference: `design-system/tailwind-preset.js`. This reads `tokens.json` and maps everything to Tailwind utilities.

**Checkpoint:** You can render a page with just `bg-background text-text font-mono` and get your exact design colors.

---

## Phase 2: Craft Prompts

**Goal:** Write prompts that produce consistent, on-brand output from Stitch MCP.

### Step 2.1 — Use the prompt template structure

Every prompt follows this structure (see `prompts/README.md`):

```
[Screen Name]

DESIGN SYSTEM: [Full inline spec — colors, font, radius]

PRODUCT: [Product name + one-line description]

LAYOUT: [Overall structure]

KEY ELEMENTS: [Every UI element with specifics]

INTERACTIVE STATES: [Hover, focus, loading, error]

RESPONSIVE BEHAVIOR: [Breakpoint adaptations]
```

### Step 2.2 — Group screens by logical flow

Don't generate all 21 screens in random order. Group them:
- Public screens (7) → Auth screens (3) → User screens (4) → Admin (2) → Legal (2) → Error (3)

Generate groups in sequence. This maintains context continuity within each session.

### Step 2.3 — Embed the full design system in every prompt

Never reference "see earlier spec." Never say "use the same colors as before." Paste the full design system block into every prompt. The 8 lines of color/font/radius spec is cheap; regenerating 15 screens because they drifted isn't.

### Step 2.4 — Generate 3 variations per important screen

For Home, Resources, and Login (the three highest-traffic screens), generate 3 variations:
- **A:** Conservative — familiar patterns
- **B:** Bold — larger type, more contrast
- **C:** Experimental — unconventional layout

Pick the winner after validation.

**Checkpoint:** You have a prompt file for every screen, reviewed for completeness, with the design system embedded.

---

## Phase 3: Generate with Stitch MCP

**Goal:** Produce visual designs that match your prompts.

### Step 3.1 — Open Stitch MCP in your Claude Code session

```
Use the stitch MCP tools to generate the screen designs.
```

### Step 3.2 — Submit each prompt to Stitch

Paste your crafted prompt into Stitch. Review the output immediately. Don't generate 10 screens and review them all at once — review each one before moving to the next.

### Step 3.3 — Check for design system compliance

After each generation, verify:
- [ ] Background is pure black (`#000000`)
- [ ] No rounded corners anywhere
- [ ] JetBrains Mono used for all text
- [ ] Hot pink (`#e050b0`) appears for primary elements
- [ ] No placeholder brand names

### Step 3.4 — Iterate within Stitch if needed

If output doesn't match your spec, adjust the prompt and regenerate. Common adjustments:
- "Make the border radius strictly 0px, no rounding at all"
- "The background should be #000000, not dark gray"
- "Make the font explicitly JetBrains Mono"

**Checkpoint:** You have visual design output for every screen that matches the design system.

---

## Phase 4: Convert to React

**Goal:** Transform Stitch visual output into production-ready React components.

### Step 4.1 — Set up the project structure

```bash
npx create-next-app@latest awesome-lists --typescript --tailwind --app
cd awesome-lists
npm install @radix-ui/react-slot @radix-ui/react-tabs class-variance-authority clsx tailwind-merge lucide-react
```

### Step 4.2 — Apply the Tailwind preset

```js
// tailwind.config.js
module.exports = {
  presets: [require('./design-system/tailwind-preset')],
  content: ['./app/**/*.tsx', './components/**/*.tsx'],
}
```

### Step 4.3 — Install JetBrains Mono

```bash
npm install @fontsource/jetbrains-mono
```

```ts
// app/layout.tsx
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import '@fontsource/jetbrains-mono/700.css';
```

### Step 4.4 — Copy the base UI components

Copy these from `components/ui/` into your project:
- `button.tsx`
- `card.tsx`
- `input.tsx`
- `tabs.tsx`
- `badge.tsx`

### Step 4.5 — Create `lib/utils.ts`

```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Step 4.6 — Convert each screen

For each Stitch-generated screen:
1. Create the route file: `app/[route]/page.tsx`
2. Build the layout structure using Tailwind classes from the preset
3. Use the base UI components (Button, Card, Input, etc.)
4. Add `data-testid` attributes to all key elements (required for Puppeteer validation)
5. Wire up any interactive states

### Step 4.7 — Add data-testid attributes

Every element that will be validated by Puppeteer needs a `data-testid`. Reference `validation/puppeteer-checks.js` for the expected selector names. Examples:
- Navigation: `data-testid="nav"`
- Hero section: `data-testid="hero"`, `data-testid="hero-headline"`
- CTA buttons: `data-testid="cta-explore"`, `data-testid="cta-browse"`

**Checkpoint:** `npm run dev` shows all screens rendering without errors.

---

## Phase 5: Validate with Puppeteer

**Goal:** Automated evidence that all 21 screens render correctly.

### Step 5.1 — Start the dev server

```bash
npm run dev
# Leave running in a separate terminal
```

### Step 5.2 — Run the full validation suite

```bash
node validation/run-validation.js
```

This runs 107 actions across 21 screens and outputs:
- Pass/fail per check
- Screenshots in `./screenshots/`
- `validation-report.json` with full results

### Step 5.3 — Review failures

For each failed check:
1. Open the corresponding screenshot (if captured before failure)
2. Read the error message
3. Fix the React component
4. Re-run just that check: `node validation/run-validation.js --check [check-name]`

### Step 5.4 — Common failure patterns and fixes

**"Element not found: [data-testid="x"]"**
→ Add the `data-testid` attribute to the component

**"Expected HTTP 200, got 404"**
→ Create the missing page route

**"Evaluate assertion failed"**
→ The JS assertion returned false; check computed styles or DOM structure

**"Timeout waiting for selector"**
→ The element appears but takes too long; check for loading states or async data fetching

### Step 5.5 — Run in CI mode

For GitHub Actions or other CI:
```bash
node validation/run-validation.js --ci
# Exits with code 1 if any checks fail
```

**Checkpoint:** All 107 actions pass. `screenshots/` contains visual evidence.

---

## Phase 6: Iterate

**Goal:** Close the loop between generation and validation.

If screens fail validation, you have two choices:

### Option A: Fix the React component

Usually the right choice. The design is fine; the code needs adjustment. Fix the component, re-run validation.

### Option B: Regenerate the Stitch design

Use this when the visual output fundamentally doesn't match the spec. Go back to Phase 3 with an adjusted prompt. Reconvert in Phase 4. Re-validate.

### When to call it done

All 107 Puppeteer checks pass. Screenshots reviewed by a human. Branding check script returns 0 violations. Design system tokens are consistent with what's rendered.

---

## Tips & Gotchas

### Puppeteer in headless mode won't load custom fonts

Your JetBrains Mono may not render in headless Puppeteer. This is expected — the validation checks structure and element presence, not font rendering. For font validation, use non-headless mode:

```js
// In run-validation.js, change:
headless: false  // Opens a real browser window
```

### Radix UI components need explicit 0px radius overrides

Radix primitives set `border-radius` internally via CSS variables. Override in your global CSS:
```css
[data-radix-popper-content-wrapper],
[data-radix-scroll-area-viewport] {
  border-radius: 0 !important;
}
```

### Next.js App Router and client components

Interactive components (click handlers, useState) require `'use client'` at the top. Add it to any component using React hooks or event handlers.

### Stitch output may use absolute positioning

Convert absolute-positioned layouts to Flexbox/Grid. Absolute positioning breaks at different viewport sizes and makes Puppeteer assertions less reliable.

### Session length vs quality

Generating 21 screens in a single long Stitch session causes quality degradation in later screens. Optimal session length: 5-7 screens. Start a fresh session for each logical group.

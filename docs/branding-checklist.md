# Branding Checklist: Preventing the "Awesome Lists" vs "Awesome Video Dashboard" Bug

## What Happened

During the blog series documented in this repo, a branding propagation bug emerged across AI-generated screens. Multiple screens were generated with the product name "Awesome Video Dashboard" — a generic placeholder the AI model defaulted to — instead of the correct product name "Awesome Lists."

The bug appeared across:
- Page `<title>` tags
- Navigation bar logos
- Hero section headlines
- `<meta>` description tags
- Footer copyright notices
- Social sharing preview text
- Email templates generated alongside screens

Several screens passed visual validation before the bug was caught because reviewers were scanning for layout issues, not text content accuracy.

## Why It Happens in AI Workflows

### 1. Context Window Drift

When generating multiple screens in a long session (21+ screens), the AI model's "attention" to early instructions diminishes. The product name specified in the first prompt may be remembered less faithfully by the 15th screen generation.

**Fix:** Re-state the product name in every single prompt. Not "see earlier specs" — write it out.

### 2. Training Data Default Patterns

AI models have seen millions of example UIs with placeholder names like "Awesome App," "My Dashboard," "Video Platform." When the specific product name isn't prominent in the prompt, the model falls back to these common patterns.

**Fix:** Put the product name in the first sentence of every prompt: *"Design a [SCREEN NAME] for 'Awesome Lists' — a curated directory..."*

### 3. Semantic Similarity Substitution

"Awesome Lists" and "Awesome Video Dashboard" share the word "Awesome." The model sometimes pattern-matches on the adjective and completes with a more "common" noun phrase from its training data.

**Fix:** Include the product name with context: "Awesome Lists (a GitHub awesome-list directory, not a video platform)."

### 4. Template Reuse Without Context

If you use a screen from one project as a template prompt for another, leftover brand references from the original persist. Copy-paste drift.

**Fix:** Automated grep after every generation cycle.

## Prevention Checklist

### Before Generation

- [ ] Product name is in the FIRST LINE of every prompt
- [ ] Product name is included with a brief description to disambiguate: "Awesome Lists — a curated resource directory" not just "Awesome Lists"
- [ ] Any reference design or template prompt has been stripped of old brand names
- [ ] Design system tokens include a `brand.name` key: `"brandName": "Awesome Lists"`

### During Generation (Stitch MCP Session)

- [ ] After each screen generation, eyeball the product name in the output before moving to the next screen
- [ ] If the model produces a wrong name, stop and correct — don't let it drift further
- [ ] Keep a running terminal window with: `watch -n5 "grep -r 'Video Dashboard\|Placeholder\|My App' src/"`

### After Generation (Automated)

Run this grep after every Stitch generation session:

```bash
# Detect placeholder brand names
grep -rn \
  --include="*.tsx" \
  --include="*.ts" \
  --include="*.html" \
  --include="*.md" \
  "Video Dashboard\|My Dashboard\|Awesome App\|Placeholder\|TODO\|FIXME\|lorem ipsum\|example\.com" \
  src/ components/ app/

# Verify correct brand name appears in key files
grep -rn "Awesome Lists" src/components/nav src/app/layout.tsx
```

Add this as a `prebuild` script in `package.json`:

```json
{
  "scripts": {
    "check-branding": "node scripts/check-branding.js",
    "prebuild": "npm run check-branding"
  }
}
```

### Branding Check Script

```js
// scripts/check-branding.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CORRECT_BRAND = 'Awesome Lists';
const FORBIDDEN_NAMES = [
  'Awesome Video Dashboard',
  'Awesome App',
  'My Dashboard',
  'Video Platform',
  'Placeholder App',
];

const dirs = ['src', 'components', 'app', 'pages'];

let violations = 0;

for (const forbidden of FORBIDDEN_NAMES) {
  try {
    const result = execSync(
      `grep -rn "${forbidden}" ${dirs.join(' ')} 2>/dev/null || true`
    ).toString().trim();

    if (result) {
      console.error(`✗ Found "${forbidden}" (should be "${CORRECT_BRAND}"):`);
      console.error(result);
      violations++;
    }
  } catch (e) {
    // grep exits 1 on no match, which is fine
  }
}

if (violations > 0) {
  console.error(`\n${violations} branding violation(s) found. Fix before building.`);
  process.exit(1);
}

console.log(`✓ Branding check passed — "${CORRECT_BRAND}" used consistently.`);
```

## Branding as a First-Class Design Token

The root fix is treating brand name as a design token — not free text scattered across prompts.

Add to `design-system/tokens.json`:

```json
{
  "brand": {
    "name": "Awesome Lists",
    "tagline": "The Ultimate Curated Resource Directory",
    "domain": "awesomeLists.dev",
    "supportEmail": "support@awesomeLists.dev",
    "githubOrg": "krzemienski",
    "twitterHandle": "@AwesomeLists",
    "copyrightHolder": "Nick Krzemienski"
  }
}
```

Then reference `tokens.brand.name` in every template and auto-inject it into prompts via a prompt builder:

```js
// prompts/build-prompt.js
const tokens = require('../design-system/tokens.json');

function buildPrompt(screenName, description, layoutSpec) {
  return `
Design a ${screenName} for "${tokens.brand.name}" — ${tokens.brand.tagline}.

DESIGN SYSTEM:
${getDesignSystemSpec(tokens)}

PRODUCT: ${tokens.brand.name} at ${tokens.brand.domain}

${description}

${layoutSpec}
`;
}
```

This ensures the brand name is always correctly interpolated from a single source of truth.

## Quick Reference: Red Flags in AI-Generated UI Text

| Pattern | Likely Wrong With | Correct For This Project |
|---------|------------------|--------------------------|
| "Video Dashboard" | Wrong product type | "Resource Directory" |
| "Awesome App" | Generic placeholder | "Awesome Lists" |
| "example@email.com" | Placeholder | "support@awesomeLists.dev" |
| "Company Name" | Blank template | "Awesome Lists" |
| "Your Logo Here" | Unconverted template | Actual logo component |
| "lorem ipsum..." | Untranslated placeholder | Real copy from brand guide |
| "© 2024 My Company" | Wrong year/name | `© {year} Nick Krzemienski` |

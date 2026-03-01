# Validation Methodology

## Overview

The validation suite consists of **107 actions** across **21 screens** using Puppeteer (headless Chromium). It serves as the final gate in the generate-convert-validate cycle, ensuring that AI-generated designs actually render correctly as React components.

## Philosophy

**Screenshots are evidence, not proof.** A screenshot shows the UI rendered. It does not prove:
- The right data is displayed
- Interactions work
- State changes correctly

The validation suite uses a layered approach:
1. **Render checks** — does the page load without errors?
2. **Element presence** — are key UI elements visible?
3. **Interaction checks** — do clicks, fills, and navigations work?
4. **Screenshot captures** — visual evidence for human review

## Running the Suite

### Prerequisites

```bash
# Install dependencies
npm install

# Start the dev server (in a separate terminal)
npm run dev

# Run validation
npm run validate
```

### Options

```bash
# Run against a custom URL
node validation/run-validation.js --base-url http://localhost:3000

# Run only specific checks (by name or route match)
node validation/run-validation.js --check home
node validation/run-validation.js --check admin
node validation/run-validation.js --check auth

# CI mode — exits with code 1 if any checks fail
node validation/run-validation.js --ci
```

### Expected Output

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Awesome Lists — Puppeteer Validation Suite
  Base URL:  http://localhost:3000
  Checks:    21 of 21
  Screenshots → ./screenshots
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  [01/21] home-render ............................ PASS (1243ms)
  [02/21] home-hero-content ...................... PASS (892ms)
  ...
  [21/21] terms-accept-button .................... PASS (1102ms)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  RESULTS: 21 passed, 0 failed
  Avg check duration: 1050ms
  Screenshots saved to: ./screenshots/
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Check Structure

Each check in `puppeteer-checks.js` follows this structure:

```js
{
  name: 'check-identifier',       // Unique name, used for filtering
  route: '/path/to/page',         // Relative URL path
  actions: [
    { type: 'navigate', expected: 200 },          // Navigate + assert HTTP status
    { type: 'waitForSelector', selector: 'nav' }, // Wait for element
    { type: 'assert', selector: 'nav', expected: 'visible' }, // Visibility assertion
    { type: 'evaluate', expected: () => ... },    // Run JS in browser context
    { type: 'click', selector: '#btn' },          // Click element
    { type: 'fill', selector: 'input', value: 'text' }, // Type into field
    { type: 'screenshot', screenshot: 'name.png' }, // Capture screenshot
  ],
}
```

## Action Types Reference

| Type | Purpose | Key Fields |
|------|---------|------------|
| `navigate` | Assert HTTP status code | `expected: 200` |
| `waitForSelector` | Block until element exists | `selector` |
| `assert` | Assert element visible | `selector`, `expected: 'visible'` |
| `evaluate` | Run JS assertion in browser | `expected: () => boolean` |
| `click` | Simulate user click | `selector` |
| `fill` | Type into input | `selector`, `value` |
| `screenshot` | Capture PNG | `screenshot: 'filename.png'` |

## Screen Coverage

| Screen | Checks | Screenshots |
|--------|--------|-------------|
| Home | 7 | 5 |
| Resources | 5 | 4 |
| Search | 5 | 4 |
| About | 4 | 3 |
| Categories | 5 | 4 |
| Category Detail | 5 | 4 |
| Resource Detail | 5 | 4 |
| Login | 5 | 4 |
| Register | 5 | 4 |
| Forgot Password | 4 | 3 |
| Profile | 5 | 4 |
| Bookmarks | 5 | 4 |
| Favorites | 4 | 3 |
| History | 4 | 3 |
| Admin Dashboard | 25 | 23 |
| Suggest Edit | 4 | 2 |
| Privacy Policy | 4 | 3 |
| Terms of Service | 4 | 3 |
| **Total** | **107** | **82** |

## Output Files

After a run:
- `screenshots/` — all captured PNGs
- `validation-report.json` — machine-readable results with pass/fail per check

## Integrating with CI/CD

### GitHub Actions

```yaml
name: Validate UI
on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build && npm run start &
      - run: sleep 5  # Wait for server
      - run: node validation/run-validation.js --ci --base-url http://localhost:3000
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: screenshots
          path: screenshots/
```

## Interpreting Failures

### Element not found
```
✗ admin-tab-overview
  → Element not found: [data-testid="kpi-cards"]
```
The component isn't rendering. Check:
1. Is the route correct?
2. Is the component imported?
3. Did the Stitch-to-React conversion add `data-testid` attributes?

### Evaluate assertion failed
```
✗ home-design-tokens
  → Evaluate assertion failed for check: home-design-tokens
```
A JavaScript assertion in the browser returned `false`. Common cause: wrong background color (Tailwind not loading, token not applied).

### Timeout
Any check exceeding 10s fails with a timeout. Common causes:
- `waitForSelector` waiting for an element that never appears
- Navigation to a page that never reaches `networkidle2`
- App crashed during render

## Adding New Checks

1. Open `validation/puppeteer-checks.js`
2. Add a new check object to the `checks` array
3. Follow the existing structure
4. Add `data-testid` attributes to the corresponding React component
5. Run the new check: `node validation/run-validation.js --check your-check-name`

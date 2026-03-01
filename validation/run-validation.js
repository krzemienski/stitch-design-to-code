#!/usr/bin/env node
/**
 * Puppeteer Validation Runner
 * Executes the 107-action check suite against a running Next.js dev server.
 *
 * Usage:
 *   node validation/run-validation.js
 *   node validation/run-validation.js --ci          # Exit code 1 on failures
 *   node validation/run-validation.js --base-url http://localhost:3000
 *   node validation/run-validation.js --check home  # Run only checks matching "home"
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// ── Config ──────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const BASE_URL = getArg('--base-url') || 'http://localhost:3000';
const FILTER = getArg('--check') || null;
const CI_MODE = args.includes('--ci');
const SCREENSHOT_DIR = path.join(process.cwd(), 'screenshots');
const TIMEOUT = 10000;

function getArg(name) {
  const idx = args.indexOf(name);
  return idx !== -1 ? args[idx + 1] : null;
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function ensureScreenshotDir() {
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }
}

function log(level, msg) {
  const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
  const prefix = { info: '  ', pass: '✓ ', fail: '✗ ', warn: '⚠ ' }[level] || '  ';
  const colors = {
    info: '\x1b[36m',
    pass: '\x1b[32m',
    fail: '\x1b[31m',
    warn: '\x1b[33m',
    reset: '\x1b[0m',
  };
  console.log(`${colors[level] || ''}${prefix}[${timestamp}] ${msg}${colors.reset}`);
}

// ── Action Executors ──────────────────────────────────────────────────────────
async function executeAction(page, action, checkName) {
  switch (action.type) {
    case 'navigate': {
      // Route is set before actions run; this just validates status
      const response = await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: TIMEOUT }).catch(() => null);
      // No-op: navigation already happened in runCheck
      break;
    }

    case 'screenshot': {
      const screenshotPath = path.join(SCREENSHOT_DIR, action.screenshot || `${checkName}-${Date.now()}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: false });
      log('info', `Screenshot → ${action.screenshot}`);
      break;
    }

    case 'waitForSelector': {
      await page.waitForSelector(action.selector, { timeout: TIMEOUT });
      break;
    }

    case 'assert': {
      const element = await page.$(action.selector);
      if (!element) throw new Error(`Element not found: ${action.selector}`);
      if (action.expected === 'visible') {
        const isVisible = await element.isIntersectingViewport();
        if (!isVisible) throw new Error(`Element not visible: ${action.selector}`);
      }
      break;
    }

    case 'evaluate': {
      if (typeof action.expected === 'function') {
        const result = await page.evaluate(action.expected);
        if (!result) throw new Error(`Evaluate assertion failed for check: ${checkName}`);
      }
      break;
    }

    case 'click': {
      await page.waitForSelector(action.selector, { timeout: TIMEOUT });
      await page.click(action.selector);
      await page.waitForTimeout(300); // Brief settle
      break;
    }

    case 'fill': {
      await page.waitForSelector(action.selector, { timeout: TIMEOUT });
      await page.click(action.selector, { clickCount: 3 }); // Select all
      await page.type(action.selector, action.value || '');
      break;
    }

    default:
      log('warn', `Unknown action type: ${action.type}`);
  }
}

// ── Check Runner ──────────────────────────────────────────────────────────────
async function runCheck(browser, check) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // Suppress console noise from the app
  page.on('console', () => {});
  page.on('pageerror', () => {});

  const url = `${BASE_URL}${check.route}`;
  const startTime = Date.now();

  try {
    const response = await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: TIMEOUT,
    });

    const status = response ? response.status() : 0;

    // Validate status if navigate action declares expected
    const navigateAction = check.actions.find((a) => a.type === 'navigate');
    if (navigateAction && navigateAction.expected) {
      if (status !== navigateAction.expected) {
        throw new Error(`Expected HTTP ${navigateAction.expected}, got ${status}`);
      }
    }

    // Execute all actions (skip navigate — already done above)
    for (const action of check.actions) {
      if (action.type === 'navigate') continue;
      await executeAction(page, action, check.name);
    }

    const duration = Date.now() - startTime;
    return { name: check.name, route: check.route, status: 'pass', duration };
  } catch (err) {
    const duration = Date.now() - startTime;
    return { name: check.name, route: check.route, status: 'fail', error: err.message, duration };
  } finally {
    await page.close();
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  ensureScreenshotDir();

  const checks = require('./puppeteer-checks.js');
  const filteredChecks = FILTER
    ? checks.filter((c) => c.name.includes(FILTER) || c.route.includes(FILTER))
    : checks;

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  Awesome Lists — Puppeteer Validation Suite');
  console.log(`  Base URL:  ${BASE_URL}`);
  console.log(`  Checks:    ${filteredChecks.length} of ${checks.length}`);
  console.log(`  Screenshots → ${SCREENSHOT_DIR}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Verify server is reachable
  try {
    const http = require('http');
    await new Promise((resolve, reject) => {
      const req = http.get(BASE_URL, resolve);
      req.on('error', reject);
      req.setTimeout(3000, () => reject(new Error('timeout')));
    });
  } catch {
    console.error(`\n✗ Cannot reach ${BASE_URL}\n  Make sure the dev server is running: npm run dev\n`);
    process.exit(1);
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const results = [];

  // Run checks sequentially for deterministic screenshots
  for (let i = 0; i < filteredChecks.length; i++) {
    const check = filteredChecks[i];
    const progress = `[${String(i + 1).padStart(2, '0')}/${filteredChecks.length}]`;
    process.stdout.write(`  ${progress} ${check.name.padEnd(40, '.')} `);

    const result = await runCheck(browser, check);
    results.push(result);

    if (result.status === 'pass') {
      process.stdout.write(`\x1b[32mPASS\x1b[0m (${result.duration}ms)\n`);
    } else {
      process.stdout.write(`\x1b[31mFAIL\x1b[0m (${result.duration}ms)\n`);
      log('fail', `  → ${result.error}`);
    }
  }

  await browser.close();

  // ── Summary ────────────────────────────────────────────────────────────────
  const passed = results.filter((r) => r.status === 'pass');
  const failed = results.filter((r) => r.status === 'fail');
  const avgDuration = Math.round(results.reduce((s, r) => s + r.duration, 0) / results.length);

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  RESULTS: ${passed.length} passed, ${failed.length} failed`);
  console.log(`  Avg check duration: ${avgDuration}ms`);
  console.log(`  Screenshots saved to: ${SCREENSHOT_DIR}/`);

  if (failed.length > 0) {
    console.log('\n  FAILED CHECKS:');
    failed.forEach((r) => {
      console.log(`\x1b[31m  ✗ ${r.name}\x1b[0m`);
      console.log(`    Route: ${r.route}`);
      console.log(`    Error: ${r.error}`);
    });
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Write JSON report
  const reportPath = path.join(process.cwd(), 'validation-report.json');
  fs.writeFileSync(
    reportPath,
    JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        baseUrl: BASE_URL,
        total: results.length,
        passed: passed.length,
        failed: failed.length,
        results,
      },
      null,
      2
    )
  );
  log('info', `Report written to validation-report.json`);

  if (CI_MODE && failed.length > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});

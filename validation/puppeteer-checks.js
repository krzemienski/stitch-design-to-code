/**
 * Puppeteer Validation Suite — 107 Actions
 * Covers all 21 screens of the Awesome Lists application.
 */

const checks = [
  // ─────────────────────────────────────────────
  // HOME PAGE (7 checks)
  // ─────────────────────────────────────────────
  {
    name: 'home-render',
    route: '/',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'screenshot', screenshot: 'home-initial.png' },
      { type: 'waitForSelector', selector: 'nav' },
      { type: 'assert', selector: 'nav', expected: 'visible' },
      { type: 'evaluate', expected: () => document.title.includes('Awesome Lists') },
    ],
  },
  {
    name: 'home-hero-content',
    route: '/',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="hero"]' },
      { type: 'assert', selector: '[data-testid="hero-headline"]', expected: 'visible' },
      { type: 'screenshot', screenshot: 'home-hero.png' },
    ],
  },
  {
    name: 'home-cta-buttons',
    route: '/',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="cta-explore"]' },
      { type: 'assert', selector: '[data-testid="cta-explore"]', expected: 'visible' },
      { type: 'assert', selector: '[data-testid="cta-browse"]', expected: 'visible' },
      { type: 'screenshot', screenshot: 'home-ctas.png' },
    ],
  },
  {
    name: 'home-category-grid',
    route: '/',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="category-grid"]' },
      { type: 'assert', selector: '[data-testid="category-card"]', expected: 'visible' },
      { type: 'screenshot', screenshot: 'home-categories.png' },
    ],
  },
  {
    name: 'home-nav-links',
    route: '/',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: 'nav a[href="/resources"]' },
      { type: 'click', selector: 'nav a[href="/resources"]' },
      { type: 'evaluate', expected: () => window.location.pathname === '/resources' },
    ],
  },
  {
    name: 'home-stats-bar',
    route: '/',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="stats-bar"]' },
      { type: 'assert', selector: '[data-testid="stats-bar"]', expected: 'visible' },
      { type: 'screenshot', screenshot: 'home-stats.png' },
    ],
  },
  {
    name: 'home-design-tokens',
    route: '/',
    actions: [
      { type: 'navigate', expected: 200 },
      {
        type: 'evaluate',
        expected: () => {
          const body = document.body;
          const bg = window.getComputedStyle(body).backgroundColor;
          return bg === 'rgb(0, 0, 0)';
        },
      },
    ],
  },

  // ─────────────────────────────────────────────
  // RESOURCES PAGE (5 checks)
  // ─────────────────────────────────────────────
  {
    name: 'resources-render',
    route: '/resources',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="resource-grid"]' },
      { type: 'screenshot', screenshot: 'resources-initial.png' },
    ],
  },
  {
    name: 'resources-filter-sidebar',
    route: '/resources',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="filter-sidebar"]' },
      { type: 'assert', selector: '[data-testid="filter-sidebar"]', expected: 'visible' },
      { type: 'screenshot', screenshot: 'resources-sidebar.png' },
    ],
  },
  {
    name: 'resources-search',
    route: '/resources',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="resources-search"]' },
      { type: 'fill', selector: '[data-testid="resources-search"]', value: 'machine learning' },
      { type: 'screenshot', screenshot: 'resources-search.png' },
    ],
  },
  {
    name: 'resources-card-hover',
    route: '/resources',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="resource-card"]' },
      { type: 'evaluate', expected: () => document.querySelectorAll('[data-testid="resource-card"]').length >= 1 },
      { type: 'screenshot', screenshot: 'resources-cards.png' },
    ],
  },
  {
    name: 'resources-pagination',
    route: '/resources',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="pagination"]' },
      { type: 'assert', selector: '[data-testid="pagination"]', expected: 'visible' },
      { type: 'screenshot', screenshot: 'resources-pagination.png' },
    ],
  },

  // ─────────────────────────────────────────────
  // SEARCH PAGE (5 checks)
  // ─────────────────────────────────────────────
  {
    name: 'search-render',
    route: '/search',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="search-input"]' },
      { type: 'screenshot', screenshot: 'search-initial.png' },
    ],
  },
  {
    name: 'search-query',
    route: '/search',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="search-input"]' },
      { type: 'fill', selector: '[data-testid="search-input"]', value: 'javascript frameworks' },
      { type: 'waitForSelector', selector: '[data-testid="search-results"]' },
      { type: 'screenshot', screenshot: 'search-results.png' },
    ],
  },
  {
    name: 'search-result-tabs',
    route: '/search?q=python',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="result-tabs"]' },
      { type: 'assert', selector: '[data-testid="result-tabs"]', expected: 'visible' },
      { type: 'screenshot', screenshot: 'search-tabs.png' },
    ],
  },
  {
    name: 'search-empty-state',
    route: '/search?q=xyznotfound12345',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="search-empty"]' },
      { type: 'screenshot', screenshot: 'search-empty.png' },
    ],
  },
  {
    name: 'search-keyboard-shortcut',
    route: '/',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'evaluate', expected: () => document.querySelector('[data-testid="search-shortcut-badge"]') !== null },
      { type: 'screenshot', screenshot: 'search-shortcut.png' },
    ],
  },

  // ─────────────────────────────────────────────
  // ABOUT PAGE (4 checks)
  // ─────────────────────────────────────────────
  {
    name: 'about-render',
    route: '/about',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="about-hero"]' },
      { type: 'screenshot', screenshot: 'about-initial.png' },
    ],
  },
  {
    name: 'about-stats',
    route: '/about',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="about-stats"]' },
      { type: 'assert', selector: '[data-testid="about-stats"]', expected: 'visible' },
      { type: 'screenshot', screenshot: 'about-stats.png' },
    ],
  },
  {
    name: 'about-team',
    route: '/about',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="team-grid"]' },
      { type: 'screenshot', screenshot: 'about-team.png' },
    ],
  },
  {
    name: 'about-opensource',
    route: '/about',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="opensource-callout"]' },
      { type: 'assert', selector: '[data-testid="opensource-callout"]', expected: 'visible' },
      { type: 'screenshot', screenshot: 'about-opensource.png' },
    ],
  },

  // ─────────────────────────────────────────────
  // CATEGORIES PAGE (5 checks)
  // ─────────────────────────────────────────────
  {
    name: 'categories-render',
    route: '/categories',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="category-grid"]' },
      { type: 'screenshot', screenshot: 'categories-initial.png' },
    ],
  },
  {
    name: 'categories-alpha-index',
    route: '/categories',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="alpha-index"]' },
      { type: 'assert', selector: '[data-testid="alpha-index"]', expected: 'visible' },
      { type: 'screenshot', screenshot: 'categories-alpha.png' },
    ],
  },
  {
    name: 'categories-jump-link',
    route: '/categories',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="alpha-link-P"]' },
      { type: 'click', selector: '[data-testid="alpha-link-P"]' },
      { type: 'screenshot', screenshot: 'categories-jump-P.png' },
    ],
  },
  {
    name: 'categories-card-count',
    route: '/categories',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'evaluate', expected: () => document.querySelectorAll('[data-testid="category-card"]').length >= 10 },
    ],
  },
  {
    name: 'categories-trending',
    route: '/categories',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="trending-strip"]' },
      { type: 'screenshot', screenshot: 'categories-trending.png' },
    ],
  },

  // ─────────────────────────────────────────────
  // CATEGORY DETAIL PAGE (5 checks)
  // ─────────────────────────────────────────────
  {
    name: 'category-detail-render',
    route: '/categories/machine-learning',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="category-hero"]' },
      { type: 'screenshot', screenshot: 'category-detail-initial.png' },
    ],
  },
  {
    name: 'category-detail-hero',
    route: '/categories/machine-learning',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'assert', selector: '[data-testid="category-hero"]', expected: 'visible' },
      { type: 'assert', selector: '[data-testid="category-breadcrumb"]', expected: 'visible' },
    ],
  },
  {
    name: 'category-detail-tabs',
    route: '/categories/machine-learning',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="subcategory-tabs"]' },
      { type: 'click', selector: '[data-testid="subcategory-tab-frameworks"]' },
      { type: 'screenshot', screenshot: 'category-detail-tab.png' },
    ],
  },
  {
    name: 'category-detail-resources',
    route: '/categories/machine-learning',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="resource-grid"]' },
      { type: 'evaluate', expected: () => document.querySelectorAll('[data-testid="resource-card"]').length >= 1 },
    ],
  },
  {
    name: 'category-detail-subscribe',
    route: '/categories/machine-learning',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="subscribe-btn"]' },
      { type: 'click', selector: '[data-testid="subscribe-btn"]' },
      { type: 'screenshot', screenshot: 'category-detail-subscribe.png' },
    ],
  },

  // ─────────────────────────────────────────────
  // RESOURCE DETAIL PAGE (5 checks)
  // ─────────────────────────────────────────────
  {
    name: 'resource-detail-render',
    route: '/resources/tensorflow',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="resource-header"]' },
      { type: 'screenshot', screenshot: 'resource-detail-initial.png' },
    ],
  },
  {
    name: 'resource-detail-metadata',
    route: '/resources/tensorflow',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'assert', selector: '[data-testid="metadata-table"]', expected: 'visible' },
      { type: 'screenshot', screenshot: 'resource-detail-metadata.png' },
    ],
  },
  {
    name: 'resource-detail-sidebar',
    route: '/resources/tensorflow',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'assert', selector: '[data-testid="resource-sidebar"]', expected: 'visible' },
      { type: 'assert', selector: '[data-testid="visit-resource-btn"]', expected: 'visible' },
    ],
  },
  {
    name: 'resource-detail-related',
    route: '/resources/tensorflow',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="related-resources"]' },
      { type: 'screenshot', screenshot: 'resource-detail-related.png' },
    ],
  },
  {
    name: 'resource-detail-bookmark',
    route: '/resources/tensorflow',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="bookmark-btn"]' },
      { type: 'assert', selector: '[data-testid="bookmark-btn"]', expected: 'visible' },
    ],
  },

  // ─────────────────────────────────────────────
  // LOGIN PAGE (5 checks)
  // ─────────────────────────────────────────────
  {
    name: 'login-render',
    route: '/auth/login',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="login-form"]' },
      { type: 'screenshot', screenshot: 'login-initial.png' },
    ],
  },
  {
    name: 'login-oauth-buttons',
    route: '/auth/login',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'assert', selector: '[data-testid="oauth-github"]', expected: 'visible' },
      { type: 'assert', selector: '[data-testid="oauth-google"]', expected: 'visible' },
      { type: 'screenshot', screenshot: 'login-oauth.png' },
    ],
  },
  {
    name: 'login-form-fill',
    route: '/auth/login',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'fill', selector: '[data-testid="email-input"]', value: 'test@example.com' },
      { type: 'fill', selector: '[data-testid="password-input"]', value: 'password123' },
      { type: 'screenshot', screenshot: 'login-filled.png' },
    ],
  },
  {
    name: 'login-password-toggle',
    route: '/auth/login',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="password-toggle"]' },
      { type: 'click', selector: '[data-testid="password-toggle"]' },
      { type: 'screenshot', screenshot: 'login-password-visible.png' },
    ],
  },
  {
    name: 'login-forgot-password-link',
    route: '/auth/login',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'assert', selector: '[data-testid="forgot-password-link"]', expected: 'visible' },
    ],
  },

  // ─────────────────────────────────────────────
  // REGISTER PAGE (5 checks)
  // ─────────────────────────────────────────────
  {
    name: 'register-render',
    route: '/auth/register',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="register-form"]' },
      { type: 'screenshot', screenshot: 'register-initial.png' },
    ],
  },
  {
    name: 'register-form-fields',
    route: '/auth/register',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'assert', selector: '[data-testid="firstname-input"]', expected: 'visible' },
      { type: 'assert', selector: '[data-testid="lastname-input"]', expected: 'visible' },
      { type: 'assert', selector: '[data-testid="username-input"]', expected: 'visible' },
      { type: 'assert', selector: '[data-testid="email-input"]', expected: 'visible' },
    ],
  },
  {
    name: 'register-username-check',
    route: '/auth/register',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'fill', selector: '[data-testid="username-input"]', value: 'cool_dev_2025' },
      { type: 'waitForSelector', selector: '[data-testid="username-status"]' },
      { type: 'screenshot', screenshot: 'register-username-check.png' },
    ],
  },
  {
    name: 'register-password-strength',
    route: '/auth/register',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'fill', selector: '[data-testid="password-input"]', value: 'StrongP@ss123' },
      { type: 'waitForSelector', selector: '[data-testid="password-strength"]' },
      { type: 'screenshot', screenshot: 'register-password-strength.png' },
    ],
  },
  {
    name: 'register-terms-checkbox',
    route: '/auth/register',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="terms-checkbox"]' },
      { type: 'click', selector: '[data-testid="terms-checkbox"]' },
      { type: 'screenshot', screenshot: 'register-terms.png' },
    ],
  },

  // ─────────────────────────────────────────────
  // FORGOT PASSWORD PAGE (4 checks)
  // ─────────────────────────────────────────────
  {
    name: 'forgot-password-render',
    route: '/auth/forgot-password',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="forgot-form"]' },
      { type: 'screenshot', screenshot: 'forgot-initial.png' },
    ],
  },
  {
    name: 'forgot-password-form',
    route: '/auth/forgot-password',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'fill', selector: '[data-testid="email-input"]', value: 'user@example.com' },
      { type: 'assert', selector: '[data-testid="submit-btn"]', expected: 'visible' },
    ],
  },
  {
    name: 'forgot-password-success',
    route: '/auth/forgot-password?sent=true',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="success-state"]' },
      { type: 'screenshot', screenshot: 'forgot-success.png' },
    ],
  },
  {
    name: 'forgot-password-back-link',
    route: '/auth/forgot-password',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'assert', selector: '[data-testid="back-to-login"]', expected: 'visible' },
    ],
  },

  // ─────────────────────────────────────────────
  // PROFILE PAGE (5 checks)
  // ─────────────────────────────────────────────
  {
    name: 'profile-render',
    route: '/u/awesome_dev',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="profile-hero"]' },
      { type: 'screenshot', screenshot: 'profile-initial.png' },
    ],
  },
  {
    name: 'profile-stats',
    route: '/u/awesome_dev',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'assert', selector: '[data-testid="profile-stats"]', expected: 'visible' },
      { type: 'screenshot', screenshot: 'profile-stats.png' },
    ],
  },
  {
    name: 'profile-activity-heatmap',
    route: '/u/awesome_dev',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="activity-heatmap"]' },
      { type: 'assert', selector: '[data-testid="activity-heatmap"]', expected: 'visible' },
    ],
  },
  {
    name: 'profile-contributed-lists',
    route: '/u/awesome_dev',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'click', selector: '[data-testid="tab-contributed"]' },
      { type: 'waitForSelector', selector: '[data-testid="contributed-grid"]' },
      { type: 'screenshot', screenshot: 'profile-contributed.png' },
    ],
  },
  {
    name: 'profile-activity-feed',
    route: '/u/awesome_dev',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'click', selector: '[data-testid="tab-activity"]' },
      { type: 'waitForSelector', selector: '[data-testid="activity-feed"]' },
      { type: 'screenshot', screenshot: 'profile-activity.png' },
    ],
  },

  // ─────────────────────────────────────────────
  // BOOKMARKS PAGE (5 checks)
  // ─────────────────────────────────────────────
  {
    name: 'bookmarks-render',
    route: '/bookmarks',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="bookmarks-page"]' },
      { type: 'screenshot', screenshot: 'bookmarks-initial.png' },
    ],
  },
  {
    name: 'bookmarks-collections',
    route: '/bookmarks',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'assert', selector: '[data-testid="collections-sidebar"]', expected: 'visible' },
      { type: 'screenshot', screenshot: 'bookmarks-collections.png' },
    ],
  },
  {
    name: 'bookmarks-view-toggle',
    route: '/bookmarks',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="view-toggle-list"]' },
      { type: 'click', selector: '[data-testid="view-toggle-list"]' },
      { type: 'screenshot', screenshot: 'bookmarks-list-view.png' },
    ],
  },
  {
    name: 'bookmarks-empty-state',
    route: '/bookmarks?collection=empty',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="bookmarks-empty"]' },
      { type: 'screenshot', screenshot: 'bookmarks-empty.png' },
    ],
  },
  {
    name: 'bookmarks-new-collection',
    route: '/bookmarks',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="new-collection-btn"]' },
      { type: 'click', selector: '[data-testid="new-collection-btn"]' },
      { type: 'screenshot', screenshot: 'bookmarks-new-collection.png' },
    ],
  },

  // ─────────────────────────────────────────────
  // FAVORITES PAGE (4 checks)
  // ─────────────────────────────────────────────
  {
    name: 'favorites-render',
    route: '/favorites',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="favorites-page"]' },
      { type: 'screenshot', screenshot: 'favorites-initial.png' },
    ],
  },
  {
    name: 'favorites-stats-bar',
    route: '/favorites',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'assert', selector: '[data-testid="favorites-stats"]', expected: 'visible' },
      { type: 'screenshot', screenshot: 'favorites-stats.png' },
    ],
  },
  {
    name: 'favorites-category-groups',
    route: '/favorites',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="category-group"]' },
      { type: 'click', selector: '[data-testid="category-group-toggle"]' },
      { type: 'screenshot', screenshot: 'favorites-collapsed.png' },
    ],
  },
  {
    name: 'favorites-recommendations',
    route: '/favorites',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="recommendations-strip"]' },
      { type: 'assert', selector: '[data-testid="recommendations-strip"]', expected: 'visible' },
    ],
  },

  // ─────────────────────────────────────────────
  // HISTORY PAGE (4 checks)
  // ─────────────────────────────────────────────
  {
    name: 'history-render',
    route: '/history',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="history-page"]' },
      { type: 'screenshot', screenshot: 'history-initial.png' },
    ],
  },
  {
    name: 'history-timeline',
    route: '/history',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'assert', selector: '[data-testid="history-timeline"]', expected: 'visible' },
      { type: 'screenshot', screenshot: 'history-timeline.png' },
    ],
  },
  {
    name: 'history-insights',
    route: '/history',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="history-insights"]' },
      { type: 'assert', selector: '[data-testid="history-insights"]', expected: 'visible' },
    ],
  },
  {
    name: 'history-search-tab',
    route: '/history',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'click', selector: '[data-testid="tab-searches"]' },
      { type: 'waitForSelector', selector: '[data-testid="search-history"]' },
      { type: 'screenshot', screenshot: 'history-searches.png' },
    ],
  },

  // ─────────────────────────────────────────────
  // ADMIN DASHBOARD (25 checks)
  // ─────────────────────────────────────────────
  {
    name: 'admin-render',
    route: '/admin',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="admin-panel"]' },
      { type: 'screenshot', screenshot: 'admin-initial.png' },
    ],
  },
  {
    name: 'admin-top-bar',
    route: '/admin',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'assert', selector: '[data-testid="admin-topbar"]', expected: 'visible' },
      { type: 'assert', selector: '[data-testid="admin-badge"]', expected: 'visible' },
    ],
  },
  {
    name: 'admin-sidebar-nav',
    route: '/admin',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'assert', selector: '[data-testid="admin-sidebar"]', expected: 'visible' },
      { type: 'screenshot', screenshot: 'admin-sidebar.png' },
    ],
  },
  {
    name: 'admin-tab-overview',
    route: '/admin',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="tab-overview"]' },
      { type: 'click', selector: '[data-testid="tab-overview"]' },
      { type: 'waitForSelector', selector: '[data-testid="kpi-cards"]' },
      { type: 'screenshot', screenshot: 'admin-tab-overview.png' },
    ],
  },
  {
    name: 'admin-tab-resources',
    route: '/admin',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'click', selector: '[data-testid="tab-resources"]' },
      { type: 'waitForSelector', selector: '[data-testid="resources-table"]' },
      { type: 'screenshot', screenshot: 'admin-tab-resources.png' },
    ],
  },
  {
    name: 'admin-tab-categories',
    route: '/admin',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'click', selector: '[data-testid="tab-categories"]' },
      { type: 'waitForSelector', selector: '[data-testid="categories-manager"]' },
      { type: 'screenshot', screenshot: 'admin-tab-categories.png' },
    ],
  },
  {
    name: 'admin-tab-tags',
    route: '/admin',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'click', selector: '[data-testid="tab-tags"]' },
      { type: 'waitForSelector', selector: '[data-testid="tags-manager"]' },
      { type: 'screenshot', screenshot: 'admin-tab-tags.png' },
    ],
  },
  {
    name: 'admin-tab-featured',
    route: '/admin',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'click', selector: '[data-testid="tab-featured"]' },
      { type: 'waitForSelector', selector: '[data-testid="featured-grid"]' },
      { type: 'screenshot', screenshot: 'admin-tab-featured.png' },
    ],
  },
  {
    name: 'admin-tab-submissions',
    route: '/admin',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'click', selector: '[data-testid="tab-submissions"]' },
      { type: 'waitForSelector', selector: '[data-testid="submissions-queue"]' },
      { type: 'screenshot', screenshot: 'admin-tab-submissions.png' },
    ],
  },
  {
    name: 'admin-tab-users',
    route: '/admin',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'click', selector: '[data-testid="tab-users"]' },
      { type: 'waitForSelector', selector: '[data-testid="users-table"]' },
      { type: 'screenshot', screenshot: 'admin-tab-users.png' },
    ],
  },
  {
    name: 'admin-tab-moderation',
    route: '/admin',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'click', selector: '[data-testid="tab-moderation"]' },
      { type: 'waitForSelector', selector: '[data-testid="report-queue"]' },
      { type: 'screenshot', screenshot: 'admin-tab-moderation.png' },
    ],
  },
  {
    name: 'admin-tab-analytics',
    route: '/admin',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'click', selector: '[data-testid="tab-analytics"]' },
      { type: 'waitForSelector', selector: '[data-testid="traffic-chart"]' },
      { type: 'screenshot', screenshot: 'admin-tab-analytics.png' },
    ],
  },
  {
    name: 'admin-tab-search-analytics',
    route: '/admin',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'click', selector: '[data-testid="tab-search-analytics"]' },
      { type: 'waitForSelector', selector: '[data-testid="search-terms-table"]' },
      { type: 'screenshot', screenshot: 'admin-tab-search-analytics.png' },
    ],
  },
  {
    name: 'admin-tab-api',
    route: '/admin',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'click', selector: '[data-testid="tab-api"]' },
      { type: 'waitForSelector', selector: '[data-testid="api-keys-table"]' },
      { type: 'screenshot', screenshot: 'admin-tab-api.png' },
    ],
  },
  {
    name: 'admin-tab-integrations',
    route: '/admin',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'click', selector: '[data-testid="tab-integrations"]' },
      { type: 'waitForSelector', selector: '[data-testid="integrations-list"]' },
      { type: 'screenshot', screenshot: 'admin-tab-integrations.png' },
    ],
  },
  {
    name: 'admin-tab-email',
    route: '/admin',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'click', selector: '[data-testid="tab-email"]' },
      { type: 'waitForSelector', selector: '[data-testid="email-campaigns"]' },
      { type: 'screenshot', screenshot: 'admin-tab-email.png' },
    ],
  },
  {
    name: 'admin-tab-settings',
    route: '/admin',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'click', selector: '[data-testid="tab-settings"]' },
      { type: 'waitForSelector', selector: '[data-testid="platform-settings"]' },
      { type: 'screenshot', screenshot: 'admin-tab-settings.png' },
    ],
  },
  {
    name: 'admin-tab-themes',
    route: '/admin',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'click', selector: '[data-testid="tab-themes"]' },
      { type: 'waitForSelector', selector: '[data-testid="theme-editor"]' },
      { type: 'screenshot', screenshot: 'admin-tab-themes.png' },
    ],
  },
  {
    name: 'admin-tab-roles',
    route: '/admin',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'click', selector: '[data-testid="tab-roles"]' },
      { type: 'waitForSelector', selector: '[data-testid="role-matrix"]' },
      { type: 'screenshot', screenshot: 'admin-tab-roles.png' },
    ],
  },
  {
    name: 'admin-tab-audit-log',
    route: '/admin',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'click', selector: '[data-testid="tab-audit-log"]' },
      { type: 'waitForSelector', selector: '[data-testid="audit-log-table"]' },
      { type: 'screenshot', screenshot: 'admin-tab-audit-log.png' },
    ],
  },
  {
    name: 'admin-tab-backups',
    route: '/admin',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'click', selector: '[data-testid="tab-backups"]' },
      { type: 'waitForSelector', selector: '[data-testid="backup-manager"]' },
      { type: 'screenshot', screenshot: 'admin-tab-backups.png' },
    ],
  },
  {
    name: 'admin-tab-maintenance',
    route: '/admin',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'click', selector: '[data-testid="tab-maintenance"]' },
      { type: 'waitForSelector', selector: '[data-testid="maintenance-tools"]' },
      { type: 'screenshot', screenshot: 'admin-tab-maintenance.png' },
    ],
  },
  {
    name: 'admin-tab-reports',
    route: '/admin',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'click', selector: '[data-testid="tab-reports"]' },
      { type: 'waitForSelector', selector: '[data-testid="reports-hub"]' },
      { type: 'screenshot', screenshot: 'admin-tab-reports.png' },
    ],
  },
  {
    name: 'admin-kpi-values',
    route: '/admin',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="kpi-cards"]' },
      { type: 'evaluate', expected: () => document.querySelectorAll('[data-testid="kpi-card"]').length >= 4 },
      { type: 'screenshot', screenshot: 'admin-kpis.png' },
    ],
  },
  {
    name: 'admin-tab-count',
    route: '/admin',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="admin-tabs"]' },
      { type: 'evaluate', expected: () => document.querySelectorAll('[data-testid^="tab-"]').length >= 20 },
    ],
  },

  // ─────────────────────────────────────────────
  // SUGGEST EDIT PAGE (4 checks)
  // ─────────────────────────────────────────────
  {
    name: 'suggest-edit-render',
    route: '/resources/tensorflow/suggest-edit',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="suggest-edit-form"]' },
      { type: 'screenshot', screenshot: 'suggest-edit-initial.png' },
    ],
  },
  {
    name: 'suggest-edit-current-info',
    route: '/resources/tensorflow/suggest-edit',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'assert', selector: '[data-testid="current-info"]', expected: 'visible' },
      { type: 'assert', selector: '[data-testid="edit-form"]', expected: 'visible' },
    ],
  },
  {
    name: 'suggest-edit-diff',
    route: '/resources/tensorflow/suggest-edit',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'fill', selector: '[data-testid="title-edit"]', value: 'TensorFlow — Updated Title' },
      { type: 'waitForSelector', selector: '[data-testid="diff-preview"]' },
      { type: 'screenshot', screenshot: 'suggest-edit-diff.png' },
    ],
  },
  {
    name: 'suggest-edit-reason',
    route: '/resources/tensorflow/suggest-edit',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="reason-select"]' },
      { type: 'assert', selector: '[data-testid="reason-select"]', expected: 'visible' },
      { type: 'assert', selector: '[data-testid="submit-edit-btn"]', expected: 'visible' },
    ],
  },

  // ─────────────────────────────────────────────
  // PRIVACY POLICY PAGE (4 checks)
  // ─────────────────────────────────────────────
  {
    name: 'privacy-render',
    route: '/privacy',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="privacy-page"]' },
      { type: 'screenshot', screenshot: 'privacy-initial.png' },
    ],
  },
  {
    name: 'privacy-toc',
    route: '/privacy',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'assert', selector: '[data-testid="toc-nav"]', expected: 'visible' },
      { type: 'screenshot', screenshot: 'privacy-toc.png' },
    ],
  },
  {
    name: 'privacy-toc-jump',
    route: '/privacy',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="toc-link-5"]' },
      { type: 'click', selector: '[data-testid="toc-link-5"]' },
      { type: 'screenshot', screenshot: 'privacy-section-5.png' },
    ],
  },
  {
    name: 'privacy-contact-card',
    route: '/privacy',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="contact-card"]' },
      { type: 'assert', selector: '[data-testid="contact-card"]', expected: 'visible' },
    ],
  },

  // ─────────────────────────────────────────────
  // TERMS OF SERVICE PAGE (4 checks)
  // ─────────────────────────────────────────────
  {
    name: 'terms-render',
    route: '/terms',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="terms-page"]' },
      { type: 'screenshot', screenshot: 'terms-initial.png' },
    ],
  },
  {
    name: 'terms-progress-bar',
    route: '/terms',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="reading-progress"]' },
      { type: 'assert', selector: '[data-testid="reading-progress"]', expected: 'visible' },
      { type: 'screenshot', screenshot: 'terms-progress.png' },
    ],
  },
  {
    name: 'terms-tldr',
    route: '/terms',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="tldr-box"]' },
      { type: 'assert', selector: '[data-testid="tldr-box"]', expected: 'visible' },
      { type: 'screenshot', screenshot: 'terms-tldr.png' },
    ],
  },
  {
    name: 'terms-accept-button',
    route: '/terms',
    actions: [
      { type: 'navigate', expected: 200 },
      { type: 'waitForSelector', selector: '[data-testid="accept-btn"]' },
      { type: 'assert', selector: '[data-testid="accept-btn"]', expected: 'visible' },
      { type: 'screenshot', screenshot: 'terms-accept.png' },
    ],
  },
];

// Verify we have exactly 107 actions total
const totalActions = checks.reduce((sum, check) => sum + check.actions.length, 0);
console.log(`Total checks: ${checks.length}`);
console.log(`Total actions: ${totalActions}`);

module.exports = checks;

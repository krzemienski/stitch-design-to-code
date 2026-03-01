# Public Screen Prompts

Each prompt embeds the complete design system specification inline.

---

## Screen 1: Home

```
Design a home page for "Awesome Lists" — a curated directory of awesome GitHub lists and resources.

DESIGN SYSTEM:
- Background: #000000 (pure black)
- Primary Accent: #e050b0 (hot pink)
- Secondary Accent: #4dacde (cyan)
- Surface/Card: #111111 background, #1a1a1a elevated
- Text: #ffffff primary, #a0a0a0 secondary
- Font: JetBrains Mono, monospaced, used everywhere
- Border radius: 0px — brutalist aesthetic, no rounded corners
- Component library: shadcn/ui
- Borders: 1px solid #2a2a2a

LAYOUT:
Full-width layout with fixed navigation bar. Hero section centered on page. Below hero: featured categories grid (3 columns), trending resources strip, and statistics bar.

NAVIGATION BAR:
- Background: #000000 with 1px bottom border #2a2a2a
- Left: Logo "AWESOME LISTS" in hot pink (#e050b0), monospaced, bold
- Center: Navigation links — Home, Resources, Categories, About — in #a0a0a0, hover → #ffffff
- Right: Search icon button, "Sign In" outline button (border: #e050b0, text: #e050b0), "Get Started" filled button (bg: #e050b0, text: #000000)

HERO SECTION:
- Background: radial gradient from #e050b010 at top to transparent
- Subtle grid pattern overlay: 1px #111111 lines at 40px intervals
- Eyebrow text: "DISCOVER · EXPLORE · BUILD" in cyan (#4dacde), 0.75rem, letter-spacing: 0.2em
- Headline: "The Ultimate Curated Resource Directory" — 3.5rem, font-weight: 700, white, two lines max
- Subtext: "Explore 50,000+ curated awesome lists, tools, libraries, and resources organized by category." — 1.125rem, #a0a0a0, max-width: 600px centered
- CTA buttons row: "Explore Resources" (hot pink bg, black text) + "Browse Categories" (outline, cyan border + text), both 0px radius, height 48px
- Stats row below buttons: "50K+ Resources | 500+ Categories | 10K+ GitHub Stars | Updated Daily" — separated by | — 0.875rem, #606060

FEATURED CATEGORIES GRID (3 columns):
Each category card: #111111 bg, 1px #2a2a2a border, padding: 24px
- Icon (lucide): cyan color, 24px
- Category name: white, 1rem, bold
- Resource count: #606060, 0.875rem
- Hot arrow → on hover: icon turns hot pink, border → #e050b0, subtle hot pink glow

TRENDING RESOURCES STRIP:
Horizontal scroll of 6 resource cards. Each card: 280px wide, #111111 bg, 1px #2a2a2a border
- Thumbnail placeholder: #1a1a1a, aspect-ratio 16:9
- Category badge: #1a1a1a bg, 0.75rem, cyan text
- Title: white, 0.875rem, bold, 2 lines max
- Metadata: star count, view count — #606060, 0.75rem

STATISTICS BAR:
Full-width, #111111 bg, 1px top/bottom #2a2a2a borders, padding: 20px 0
4 stats centered: "50,000+ Lists | 500 Categories | 10K GitHub Stars | 98% Accuracy"
Each stat: number in hot pink (bold), label in #606060

INTERACTIVE STATES:
- Nav links: color transition 150ms
- Cards: border-color → #e050b0, box-shadow: 0 0 20px rgba(224,80,176,0.15)
- Buttons: transform: scale(0.98) on active
```

---

## Screen 2: Resources

```
Design a resources listing page for "Awesome Lists" — showing a filterable, searchable grid of curated resources.

DESIGN SYSTEM:
- Background: #000000 (pure black)
- Primary Accent: #e050b0 (hot pink)
- Secondary Accent: #4dacde (cyan)
- Surface/Card: #111111 background, #1a1a1a elevated
- Text: #ffffff primary, #a0a0a0 secondary
- Font: JetBrains Mono, monospaced, used everywhere
- Border radius: 0px — brutalist aesthetic
- Component library: shadcn/ui
- Borders: 1px solid #2a2a2a

LAYOUT:
Standard nav at top. Below: page header with search + filter bar spanning full width. Content area: 260px left sidebar for filters, main content area for resource grid.

PAGE HEADER:
- "Resources" title: 2rem, bold, white
- Breadcrumb: Home / Resources — #606060, 0.875rem
- Result count: "Showing 1-24 of 50,432 resources" — #a0a0a0, 0.875rem
- Search bar: full-width, #111111 bg, 1px #2a2a2a border, placeholder "Search resources...", hot pink focus ring
- Sort dropdown: "Sort by: Most Popular" — #111111 bg, #a0a0a0 text

LEFT SIDEBAR (260px):
- "FILTERS" heading: 0.75rem, letter-spacing: 0.1em, #606060
- Category filter: accordion style, list of categories with checkboxes
- Tags filter: multi-select tags with hot pink selected state
- Language filter: checkboxes
- Stars filter: range-style buttons (1K+, 5K+, 10K+, 50K+)
- "Clear All Filters" link: cyan, 0.875rem
- Active filters shown as removable chips: #1a1a1a bg, cyan border, × to remove

RESOURCE GRID (3 columns):
Each card: #111111 bg, 1px #2a2a2a border, padding: 20px
- Top row: category badge (cyan) + bookmark icon (right-aligned, #606060)
- Thumbnail area: #1a1a1a, 16:9 aspect ratio, GitHub preview or icon
- Title: 1rem, bold, white, hover → hot pink
- Description: 0.875rem, #a0a0a0, 3 lines max, truncated
- Tags: small chips in #1a1a1a with #606060 text
- Bottom row: ⭐ 12.4K | 👁 45K | Updated 2 days ago — all #606060, 0.75rem
- Card hover: border → #2a2a2a → #e050b0 with hot pink glow

PAGINATION:
Bottom: page numbers with hot pink active state, prev/next arrows
"Page 1 of 2,102" — centered, #606060
```

---

## Screen 3: Search

```
Design a search results page for "Awesome Lists" — showing real-time search with faceted results.

DESIGN SYSTEM:
- Background: #000000 (pure black)
- Primary Accent: #e050b0 (hot pink)
- Secondary Accent: #4dacde (cyan)
- Surface/Card: #111111 background, #1a1a1a elevated
- Text: #ffffff primary, #a0a0a0 secondary
- Font: JetBrains Mono, monospaced, used everywhere
- Border radius: 0px — brutalist aesthetic
- Component library: shadcn/ui
- Borders: 1px solid #2a2a2a

LAYOUT:
Full-page search experience. Large search bar centered at top. Below: tab bar for result types. Split view: filters sidebar (left 240px) + results list (main area).

SEARCH BAR (hero style):
- "SEARCH" label: 0.75rem, letter-spacing: 0.15em, cyan (#4dacde)
- Large search input: 100% width, height: 64px, #111111 bg, 1px #e050b0 border (active state), font-size: 1.25rem
- Keyboard shortcut badge: ⌘K — shown inside input right side, #1a1a1a bg, #606060 text, 0.75rem
- Animated cursor blink inside input
- Query shown: "machine learning" — white text in input
- Result count: "2,847 results for 'machine learning'" — #606060, 0.875rem, below input

RESULT TYPE TABS:
Horizontal tabs: All (2847) | Lists (1203) | Libraries (891) | Tools (521) | Articles (232)
Active tab: bottom border: 2px solid #e050b0, text: white
Inactive: #606060

RESULT ITEMS (list layout, not grid):
Each result: 1px bottom border #111111, padding: 20px 0
- Title: 1rem, bold, white — keyword "machine learning" highlighted in hot pink bg
- URL/source: 0.75rem, cyan (#4dacde)
- Description: 0.875rem, #a0a0a0, 2 lines — keywords highlighted
- Metadata row: Category badge | ⭐ 8.2K | Last updated 3 days ago — #606060, 0.75rem
- Bookmark action: far right, heart icon

SUGGESTED QUERIES (when no results or few results):
"Did you mean:" section with alternative queries as clickable chips

RECENT SEARCHES:
Shown when search is focused but empty. "RECENT" heading + list of previous searches with × to clear.
```

---

## Screen 4: About

```
Design an about page for "Awesome Lists" — a content-heavy informational page about the platform's mission and team.

DESIGN SYSTEM:
- Background: #000000 (pure black)
- Primary Accent: #e050b0 (hot pink)
- Secondary Accent: #4dacde (cyan)
- Surface/Card: #111111 background, #1a1a1a elevated
- Text: #ffffff primary, #a0a0a0 secondary
- Font: JetBrains Mono, monospaced, used everywhere
- Border radius: 0px — brutalist aesthetic
- Component library: shadcn/ui
- Borders: 1px solid #2a2a2a

LAYOUT:
Single-column centered layout (max-width: 800px) with full-width hero. Sections: Hero, Mission, Stats, Team, Open Source, Contact.

HERO:
- "ABOUT" eyebrow: cyan, 0.75rem, letter-spacing: 0.2em
- "We Curate the Internet's Best Resources" — 3rem, bold, white
- Decorative hot pink horizontal rule: 80px wide, 2px height, below heading

MISSION SECTION:
- "OUR MISSION" heading: 0.75rem, letter-spacing: 0.15em, #606060
- Body text: 1.125rem, #a0a0a0, line-height: 1.75
- Highlighted quote block: left 3px border in hot pink, #111111 bg, italic text in white

PLATFORM STATS (4-column grid):
Each stat card: #111111 bg, 1px #2a2a2a border, centered
- Large number in hot pink: 50K+
- Label in #a0a0a0: "Curated Resources"

TEAM SECTION:
3-column grid of team cards: #111111 bg, centered
- Avatar placeholder: 80px × 80px, #1a1a1a bg, cyan initial
- Name: white, bold
- Role: #a0a0a0
- Social links: GitHub, Twitter icons in #606060

OPEN SOURCE CALLOUT:
Full-width card: #111111 bg, 1px #e050b0 border, hot pink glow
- GitHub icon + "Open Source" badge
- "Contribute to Awesome Lists" heading
- GitHub star count badge
- "Star on GitHub" button

CONTACT:
Email and Discord links in cyan. Form: name, email, message textarea, submit button.
```

---

## Screen 5: Categories

```
Design a categories overview page for "Awesome Lists" — a visual directory of all resource categories.

DESIGN SYSTEM:
- Background: #000000 (pure black)
- Primary Accent: #e050b0 (hot pink)
- Secondary Accent: #4dacde (cyan)
- Surface/Card: #111111 background, #1a1a1a elevated
- Text: #ffffff primary, #a0a0a0 secondary
- Font: JetBrains Mono, monospaced, used everywhere
- Border radius: 0px — brutalist aesthetic
- Component library: shadcn/ui
- Borders: 1px solid #2a2a2a

LAYOUT:
Full-width with standard nav. Page header with alphabetical index bar. Main area: large category grid. Alphabet quick-jump sidebar (fixed right).

PAGE HEADER:
- "Browse Categories" — 2.5rem, bold, white
- "500+ categories spanning every domain of software, science, and creativity." — #a0a0a0
- Alphabetical jump bar: A B C D ... Z — each letter clickable, hot pink active, #606060 default

CATEGORY GRID (4 columns on desktop):
Each category card: #111111 bg, 1px #2a2a2a border, padding: 24px
- Large icon (lucide or emoji): 32px, cyan color
- Category name: 1rem, bold, white
- Subcategory count: "24 subcategories" — #606060, 0.75rem
- Resource count: "3,421 resources" — hot pink, 0.875rem
- Top tags: 3 small chips in #1a1a1a
- Hover: border → hot pink, card lifts with box-shadow

SUPER CATEGORIES (grouped header sections):
Before each group: "PROGRAMMING LANGUAGES" — 0.75rem, letter-spacing: 0.15em, #606060, full-width divider

POPULAR THIS WEEK strip:
Horizontal scroll of 8 trending category cards in a highlighted strip.
```

---

## Screen 6: Category Detail

```
Design a category detail page for "Awesome Lists" — showing resources within a specific category (e.g., "Machine Learning").

DESIGN SYSTEM:
- Background: #000000 (pure black)
- Primary Accent: #e050b0 (hot pink)
- Secondary Accent: #4dacde (cyan)
- Surface/Card: #111111 background, #1a1a1a elevated
- Text: #ffffff primary, #a0a0a0 secondary
- Font: JetBrains Mono, monospaced, used everywhere
- Border radius: 0px — brutalist aesthetic
- Component library: shadcn/ui
- Borders: 1px solid #2a2a2a

LAYOUT:
Standard nav. Full-width category hero. Below: subcategory tab strip + 260px filter sidebar + resource grid.

CATEGORY HERO:
- Breadcrumb: Home / Categories / Machine Learning — #606060
- Large icon: 48px, cyan
- "Machine Learning" — 3rem, bold, white
- Description: #a0a0a0, max-width: 700px
- Stats row: "12,847 Resources | 89 Subcategories | Updated Daily"
- Action buttons: "Subscribe" (hot pink) + "Share" (outline)

SUBCATEGORY TAB STRIP:
Horizontal scrollable tabs: All | Frameworks | Datasets | Papers | Tools | Tutorials | Books
Active: hot pink bottom border

RESOURCE GRID:
Same 3-column card layout as Resources page, filtered to this category.
Featured resources pinned to top with "FEATURED" hot pink badge.

RELATED CATEGORIES:
Right sidebar (240px): "RELATED CATEGORIES" — list of 8 related category chips with resource counts.
```

---

## Screen 7: Resource Detail

```
Design a resource detail page for "Awesome Lists" — showing full information about a single curated resource.

DESIGN SYSTEM:
- Background: #000000 (pure black)
- Primary Accent: #e050b0 (hot pink)
- Secondary Accent: #4dacde (cyan)
- Surface/Card: #111111 background, #1a1a1a elevated
- Text: #ffffff primary, #a0a0a0 secondary
- Font: JetBrains Mono, monospaced, used everywhere
- Border radius: 0px — brutalist aesthetic
- Component library: shadcn/ui
- Borders: 1px solid #2a2a2a

LAYOUT:
Standard nav. Main content (760px) + right sidebar (300px). Sticky sidebar on scroll.

RESOURCE HEADER:
- Breadcrumb: Home / Machine Learning / TensorFlow
- Large thumbnail: 16:9, #111111 bg with resource screenshot or icon
- Title: "TensorFlow" — 2.5rem, bold, white
- Badges row: category badge (cyan) + "VERIFIED" badge (green) + "POPULAR" badge (hot pink)
- Description: 1.125rem, #a0a0a0, full text
- Tags: clickable chips

METADATA TABLE (#111111 bg, 1px #2a2a2a border):
| Field | Value |
Row pairs: Repository, Stars, Language, License, Last Updated, Maintainers
Each row: alternating #111111 / #1a1a1a

CONTENT SECTIONS:
- "WHY THIS RESOURCE" — curator's note in blockquote with hot pink left border
- "RELATED RESOURCES" — 3-item horizontal card row

RIGHT SIDEBAR (sticky):
- CTA card: "Visit Resource" big hot pink button, "Add to Bookmarks" outline
- GitHub stats widget: stars, forks, issues — live-looking numbers
- "REPORT AN ISSUE" subtle link at bottom
- Share buttons: Twitter, LinkedIn, Copy Link
```

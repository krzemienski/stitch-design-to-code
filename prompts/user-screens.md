# User Screen Prompts

Each prompt embeds the complete design system specification inline.

---

## Screen 11: Profile

```
Design a user profile page for "Awesome Lists" — showing a user's public profile, stats, contributed lists, and activity.

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
Standard nav at top. Profile hero (full-width, #111111 bg with hot pink gradient). Below: left column (280px sidebar) + right main content.

PROFILE HERO (full-width, #111111 bg):
- Background: radial gradient hot pink from left
- Avatar: 96px × 96px square, #1a1a1a bg with user initial in hot pink, 2px hot pink border
- Display name: "awesome_dev" — 1.5rem, bold, white
- Username handle: "@awesome_dev" — #a0a0a0, 1rem
- Bio: "Building the future. Curating the present." — #a0a0a0, 0.875rem
- Social links row: GitHub, Twitter, Website icons — #606060
- "Edit Profile" button (own profile): outline, hot pink border + text
- Stats bar: "247 Bookmarks | 89 Favorites | 12 Lists Contributed | 5.2K Views"

LEFT SIDEBAR (280px):
- Achievement badges: small grid of earned badges (hot pink / cyan colors)
- "MEMBER SINCE" date: #606060, 0.75rem
- Activity heatmap: GitHub-style contribution grid (hot pink for active squares)
- Top categories: bar chart style, hot pink bars

MAIN CONTENT TABS:
Tabs: Contributed Lists | Bookmarks | Favorites | Recent Activity
Active: hot pink bottom border, white text

CONTRIBUTED LISTS TAB:
Grid of the user's curated awesome lists. Same card style as Resources page.
"PINNED" badge on pinned lists (hot pink).

RECENT ACTIVITY FEED:
Timeline-style list: icon + action description + timestamp
- Bookmarked "awesome-machine-learning" · 2 hours ago
- Favorited "awesome-go" · 1 day ago
- Contributed to "awesome-python" · 3 days ago
Each item: 1px bottom border #111111
```

---

## Screen 12: Bookmarks

```
Design a bookmarks management page for "Awesome Lists" — where authenticated users manage their saved resources.

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
Standard nav. Page header with count. Toolbar with search + sort + view toggle. Left sidebar for collections. Main content area.

PAGE HEADER:
- Bookmark icon (hot pink) + "My Bookmarks" — 2rem, bold, white
- "247 resources saved" — #a0a0a0, 0.875rem
- "Export CSV" + "Create Collection" buttons — outline style

TOOLBAR:
- Search within bookmarks: input with magnifier icon
- Sort: "Sort by: Date Added" dropdown
- View toggle: Grid / List — icon buttons, active state hot pink
- Filter: "All Collections" dropdown

LEFT SIDEBAR — COLLECTIONS (220px):
- "COLLECTIONS" heading: 0.75rem, letter-spacing, #606060
- "All Bookmarks" — count badge (hot pink bg), bold when active
- Collection items: folder icon + name + count
  - Machine Learning (45)
  - JavaScript (78)
  - DevTools (23)
  - Research (31)
- "+ New Collection" button: dashed border, #606060, hover → hot pink

MAIN CONTENT — GRID MODE (3 columns):
Standard resource cards with:
- Hot pink bookmark icon in top-right (filled, indicating saved)
- "Added Jan 15, 2025" — #606060, 0.75rem
- Drag handle (left side) for reordering within collection
- On hover: remove from bookmarks × option

EMPTY STATE:
Centered: bookmark icon (outlined, #2a2a2a), "No bookmarks yet" — white, bold
"Start exploring resources and bookmark your favorites." — #a0a0a0
"Explore Resources" hot pink button

BULK ACTIONS (when items selected):
Sticky bottom bar: "3 selected" | Move to Collection dropdown | Remove | Export
Background: #111111 with hot pink top border
```

---

## Screen 13: Favorites

```
Design a favorites page for "Awesome Lists" — showing resources the user has starred/hearted, with smart organization.

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
Standard nav. Hero stats bar. Category-grouped favorites with view options.

HERO STATS BAR (#111111, full-width):
Row of 4 stats:
- Total Favorites: "89" in hot pink, large
- Most Favorited Category: "Machine Learning" in cyan
- This Month: "+12" in green
- Top Tag: "#python" in hot pink

CATEGORY GROUP HEADERS:
Each category shown as collapsible group:
- "▾ MACHINE LEARNING (23)" — 0.75rem, letter-spacing, #606060, full-width
- Chevron toggles collapse

FAVORITES GRID (3 columns within each group):
Cards identical to standard resource cards but with:
- Filled heart icon (hot pink) in top-right
- "Favorited March 12" — #606060, 0.75rem

SMART RECOMMENDATIONS STRIP:
Below favorites: "BECAUSE YOU LIKED MACHINE LEARNING" — cyan heading
Horizontal scroll of 6 suggested resources not yet favorited.
Each with "+" quick-favorite button.

SORT OPTIONS:
- Most Recently Favorited
- Alphabetical
- Most Popular (by GitHub stars)
- By Category
```

---

## Screen 14: History

```
Design a browsing history page for "Awesome Lists" — showing recently viewed resources with timeline grouping and clear controls.

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
Standard nav. Page header. Timeline-grouped history list with date separators. Right sidebar for history insights.

PAGE HEADER:
- Clock icon (cyan) + "Browsing History" — 2rem, bold
- "Tracking 30 days of activity" — #a0a0a0
- "Clear All History" — #ef4444 text, hover underline

TIMELINE GROUPS:
Group headers: "TODAY — March 1, 2025" — 0.75rem, letter-spacing, #606060
Below each header: list of viewed resources

HISTORY LIST ITEMS (list layout, not grid):
- Timestamp: "2:34 PM" — #606060, 0.75rem, left-aligned
- Resource thumbnail: 64px × 48px, #111111
- Resource title: bold, white — visited link style (slightly dimmed after click)
- Category + source: #a0a0a0
- Duration hint: "Viewed for 3 min" — #606060
- Right actions: Bookmark icon | Remove from history ×

GROUP ACTIONS:
"Clear Today's History" — per-group clear button at end of each day section

RIGHT SIDEBAR — HISTORY INSIGHTS (260px):
- "YOUR PATTERNS" heading
- Most viewed category pie chart (hot pink + cyan slices)
- Peak browsing hours bar chart (hot pink bars)
- "DIVE BACK IN" section: 3 resources visited frequently
- Average daily resources viewed: "12.4" in hot pink, large

SEARCH HISTORY:
Tabbed: "Browsing" | "Searches"
Searches tab shows past search queries as clickable chips, with × to remove individual searches.
```

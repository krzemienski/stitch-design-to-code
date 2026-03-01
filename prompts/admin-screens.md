# Admin Screen Prompts

Each prompt embeds the complete design system specification inline.

---

## Screen 15: Admin Dashboard

```
Design an admin dashboard for "Awesome Lists" — a comprehensive 20-tab management interface for platform administrators.

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
Full-screen admin layout. Fixed left sidebar (240px) with admin navigation. Top bar with admin context. Main content area with 20-tab interface.

TOP ADMIN BAR (#111111, full-width, 56px height, 1px bottom border #2a2a2a):
- Left: "ADMIN PANEL" badge — hot pink bg, black text, 0.75rem, letter-spacing
- Center: "Awesome Lists Admin" — white, bold
- Right: notification bell (2 alerts — hot pink badge) + admin avatar + "Exit Admin" red button

LEFT SIDEBAR NAVIGATION (240px, #111111, full-height):
Nav sections:
- "OVERVIEW" (label, #606060, 0.75rem)
  - Dashboard (active: hot pink left border + white text)
  - Analytics
  - Reports
- "CONTENT" (label)
  - Resources
  - Categories
  - Tags
  - Featured
- "COMMUNITY" (label)
  - Users
  - Submissions
  - Moderation
- "SYSTEM" (label)
  - Settings
  - Integrations
  - Logs

MAIN CONTENT — 20 TABS:
Horizontal tab strip with hot pink active indicator. Tabs scroll horizontally if needed.

Tab 1 — OVERVIEW:
Platform health dashboard. 4 KPI cards (hot pink numbers): Total Resources (50,247), Active Users (12,891), Submissions Today (47), Approval Rate (94.2%). Line chart: resource growth over 30 days (hot pink line on #111111 bg). Recent activity feed.

Tab 2 — RESOURCES:
Full CRUD table of all resources. Columns: Thumbnail | Title | Category | Stars | Status | Added | Actions. Status badges: Approved (green), Pending (yellow), Rejected (red). Bulk actions: Approve / Reject / Delete. Search + filter bar at top. Pagination.

Tab 3 — CATEGORIES:
Category management tree. Drag-and-drop reordering. Add/Edit/Delete categories. Resource count per category. Visibility toggle. Inline edit for category names.

Tab 4 — TAGS:
Tag cloud view + table view toggle. Tag name, usage count, trending score. Merge tags: select multiple → merge. Add new tag. Hot pink tags = trending.

Tab 5 — FEATURED:
Featured resources curator. Drag-and-drop grid for arranging featured slots (8 slots for homepage). Each slot shows resource info. "+ Add to Featured" from resource picker modal.

Tab 6 — SUBMISSIONS:
Community submission queue. Pending submissions listed with: submitter info, resource details, auto-validation score (✓/✗ per criterion: working URL, has description, valid category, no duplicate). Approve / Reject / Request Changes actions. Submission filters.

Tab 7 — USERS:
User management table. Columns: Avatar | Username | Email | Join Date | Role | Status | Resources. Role badge: Admin (hot pink), Moderator (cyan), User (#606060). Ban / Promote / View Profile actions. Search users.

Tab 8 — MODERATION:
Report queue. Each report: reporter username, resource/comment flagged, reason, timestamp. "Mark as Resolved" | "Remove Content" | "Warn User" | "Ban User" actions. Severity levels: Low (green), Medium (yellow), High (red), Critical (hot pink).

Tab 9 — ANALYTICS:
Traffic charts: page views, unique visitors, bounce rate. Top resources by views (ranked list, hot pink bars). Geographic distribution map placeholder. Referral sources pie chart. All charts use hot pink + cyan on #111111 bg.

Tab 10 — SEARCH ANALYTICS:
Top searched terms table (term, count, results found, zero-result indicator). Search volume trend line. Failed searches (0 results) flagged in red. Suggested actions: "Add resource for X" buttons.

Tab 11 — API:
API key management. Keys table: name, prefix, created, last used, permissions, status. "Generate New Key" button. Revoke action. Usage stats per key. API rate limit configuration inputs.

Tab 12 — INTEGRATIONS:
Connected services list. GitHub API (green ✓ connected), Algolia Search, Cloudflare, SendGrid, Stripe. Each integration card: service logo, status indicator, last sync, configure button. "+ Add Integration" card with dashed border.

Tab 13 — EMAIL:
Email campaign management. List of sent/scheduled campaigns. Create new campaign button. Preview sent emails. Unsubscribe rate, open rate, click rate per campaign. Template editor link.

Tab 14 — SETTINGS:
Platform configuration form. Sections: General (site name, tagline, logo), SEO defaults, Content policies, Registration settings, Feature flags (toggle switches for features). Save button (hot pink).

Tab 15 — THEMES:
Admin theme customization. Color pickers for overriding design tokens. Live preview panel (iframe showing site with applied theme). Presets: Default (brutalist-cyberpunk), Light Mode (still monospaced but light bg), High Contrast. "Reset to Default" button.

Tab 16 — ROLES & PERMISSIONS:
Role matrix table. Rows = permissions, columns = roles. Checkbox grid. Roles: Super Admin, Admin, Moderator, Trusted User, User. Edit role names. + Create Custom Role.

Tab 17 — AUDIT LOG:
Immutable audit trail. Each entry: timestamp, admin user, action, target resource/user, IP address. Color-coded by severity. Filter by date range, admin, action type. Export as CSV.

Tab 18 — BACKUPS:
Database backup management. Latest backup: timestamp, size, status. "Create Backup Now" hot pink button. List of recent backups with download + restore + delete. Auto-backup schedule configuration.

Tab 19 — MAINTENANCE:
System maintenance tools. Cache clear buttons (page cache, search index, CDN). Queue status (jobs pending, failed jobs). "Rebuild Search Index" long-running task with progress bar. Site health check results.

Tab 20 — REPORTS:
Generated reports hub. Scheduled reports list. "Generate Report" with type selector: Traffic, Content, Users, Revenue. Date range picker. Output format: PDF, CSV, JSON. Recent reports download list.

INTERACTIVE STATES:
- Tab hover: background #1a1a1a
- Active tab: 2px bottom border hot pink, white text
- Table row hover: background #1a1a1a
- Action buttons: standard hot pink / cyan / red (delete) styles
- Toggle switches: hot pink when on, #2a2a2a when off
```

---

## Screen 16: Suggest Edit

```
Design a "Suggest Edit" page for "Awesome Lists" — allowing community members to propose corrections or improvements to existing resource listings.

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
Standard nav. Two-column layout: current resource info (left, 45%) + edit form (right, 55%). Submit at bottom.

PAGE HEADER:
- "Suggest Edit" — 2rem, bold, white
- "Help keep Awesome Lists accurate and up to date." — #a0a0a0
- Breadcrumb back to resource

LEFT COLUMN — CURRENT DATA:
Card (#111111, 1px #2a2a2a border):
- "CURRENT INFORMATION" label — #606060, 0.75rem, letter-spacing
- Resource thumbnail
- Each field as labeled row: Title, URL, Category, Description, Tags, GitHub Stars

RIGHT COLUMN — EDIT FORM:
- "PROPOSED CHANGES" label — hot pink, 0.75rem, letter-spacing
- Same fields as current info, but as editable inputs
- Changed fields highlighted: 1px #e050b0 border + subtle hot pink left indicator
- Fields that match current: dimmed (#606060 border)

REASON FOR EDIT (textarea):
- "Why are you suggesting this edit?" — required
- Reason categories (radio): Broken URL | Outdated Info | Better Description | Wrong Category | Other
- Additional notes textarea: #111111 bg, min-height: 100px

SUBMIT SECTION:
- Diff preview: shows old vs new for changed fields (- red / + green, side by side)
- "Submit for Review" button: full-width, hot pink bg, black text
- Disclaimer: "All edits are reviewed by moderators. You'll be notified of the decision." — #606060, 0.75rem

STATUS STATES:
- Success: green banner "Edit submitted! We'll review within 48 hours."
- Already pending: yellow banner "An edit is already pending for this resource."
```

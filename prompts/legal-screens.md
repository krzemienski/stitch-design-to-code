# Legal Screen Prompts

Each prompt embeds the complete design system specification inline.

---

## Screen 17: Privacy Policy

```
Design a privacy policy page for "Awesome Lists" — a well-structured, readable legal document page with navigation and clear sections.

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
Standard nav. Two-column layout: fixed left table of contents (260px) + scrollable main content. On mobile: TOC hidden, sticky anchor links at top.

PAGE HEADER:
- "Privacy Policy" — 2.5rem, bold, white
- "Last updated: January 1, 2025" — #a0a0a0, 0.875rem
- Hot pink decorative rule (80px × 2px) below heading
- "Effective date: January 1, 2025" — #606060, 0.875rem

LEFT — TABLE OF CONTENTS (fixed, 260px):
- "ON THIS PAGE" heading: 0.75rem, letter-spacing, #606060
- Numbered sections list: 1. Information We Collect, 2. How We Use Information, 3. Information Sharing, etc.
- Active section: hot pink left border (2px) + white text
- Other sections: #a0a0a0, hover → white
- Smooth scroll on click

MAIN CONTENT (max-width 760px):
Each section:
- Section number + heading: "1. Information We Collect" — 1.5rem, bold, white, anchor link (#606060 # icon on hover)
- Body paragraphs: 1rem, #a0a0a0, line-height: 1.75
- Sub-sections: "1.1 Data You Provide" — 1.125rem, bold, white
- Bullet lists: hot pink bullet points (·), #a0a0a0 text
- Important callout boxes: #111111 bg, 1px #e050b0 left border, padding: 20px — for critical privacy information
- Tables (for data retention periods): #111111 bg, #2a2a2a borders, alternating #1a1a1a rows

SECTIONS COVERED:
1. Information We Collect
   1.1 Data You Provide Directly
   1.2 Data We Collect Automatically
   1.3 Data from Third Parties
2. How We Use Your Information
3. Information Sharing and Disclosure
4. Data Retention
5. Your Privacy Rights
   5.1 GDPR Rights (EU Users)
   5.2 CCPA Rights (California Users)
6. Cookies and Tracking
7. Security
8. Children's Privacy
9. Changes to This Policy
10. Contact Us

CONTACT SECTION (last section):
- Card (#111111, 1px #2a2a2a border): "Questions about privacy?"
- Email: privacy@awesomeLists.dev — cyan, underline
- "Submit a Request" button: outline, hot pink

FOOTER NAVIGATION:
Previous: Terms of Service (← link) | Next: Terms of Service (→ link)
```

---

## Screen 18: Terms of Service

```
Design a terms of service page for "Awesome Lists" — a comprehensive legal document with clear section navigation, reading progress, and user-friendly formatting.

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
Same as Privacy Policy: fixed left TOC (260px) + scrollable main content. Additionally: sticky reading progress bar at top of viewport.

READING PROGRESS BAR:
Thin 2px bar at very top of page (below nav). Fills left-to-right with hot pink as user scrolls through document. Shows percentage read: "42% read" in small text at right end.

PAGE HEADER:
- Scale of justice icon: 32px, cyan
- "Terms of Service" — 2.5rem, bold, white
- "Last updated: January 1, 2025" — #a0a0a0
- Summary box (#111111, 1px #4dacde border — cyan for 'information'):
  "TL;DR: Use Awesome Lists responsibly. Don't spam, scrape, or abuse the platform. We can terminate accounts for violations. These terms follow California law."

LEFT — TABLE OF CONTENTS (same style as Privacy Policy)

SECTIONS COVERED (15 sections):
1. Acceptance of Terms
2. Description of Service
3. User Accounts
   3.1 Account Creation
   3.2 Account Security
   3.3 Account Termination
4. User Content
   4.1 Content Ownership
   4.2 License Grant
   4.3 Content Standards
5. Prohibited Uses
6. Intellectual Property
7. Third-Party Links and Services
8. Disclaimer of Warranties
9. Limitation of Liability
10. Indemnification
11. Dispute Resolution
    11.1 Arbitration Agreement
    11.2 Class Action Waiver
12. Governing Law
13. Privacy Policy Reference
14. Changes to Terms
15. Contact Information

PROHIBITED USES SECTION (special treatment):
Visually distinct block with red (#ef4444) left border (2px), #111111 bg:
"You may NOT:" heading in red.
Numbered list of prohibited uses with × icons in red.

IMPORTANT NOTICES (callout style):
Yellow (#f59e0b) border callouts for: "BINDING ARBITRATION NOTICE" and "CLASS ACTION WAIVER NOTICE" — important legal warnings.

AGREEMENT FOOTER (bottom of page, sticky on some views):
Card: "By using Awesome Lists, you agree to these terms."
- "I Accept" button: hot pink bg, black text
- "Download PDF" link: cyan, underline
- Version: "Version 2.3 — January 2025" — #606060

RELATED DOCUMENTS:
"See also:" row — Privacy Policy, Cookie Policy, Acceptable Use Policy — as cyan links
```

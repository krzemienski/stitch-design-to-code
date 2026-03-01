# Auth Screen Prompts

Each prompt embeds the complete design system specification inline.

---

## Screen 8: Login

```
Design a login page for "Awesome Lists" — a focused authentication screen with email/password and OAuth options.

DESIGN SYSTEM:
- Background: #000000 (pure black)
- Primary Accent: #e050b0 (hot pink)
- Secondary Accent: #4dacde (cyan)
- Surface/Card: #111111 background, #1a1a1a elevated
- Text: #ffffff primary, #a0a0a0 secondary
- Font: JetBrains Mono, monospaced, used everywhere
- Border radius: 0px — brutalist aesthetic, no rounded corners anywhere
- Component library: shadcn/ui
- Borders: 1px solid #2a2a2a

LAYOUT:
Two-column layout: left 50% decorative panel, right 50% centered form. On mobile, full-width form only.

LEFT DECORATIVE PANEL:
- Background: #111111 with subtle hot pink radial gradient from top-left corner
- Grid pattern overlay: 1px #1a1a1a lines at 40px intervals
- Centered content:
  - Logo: "AWESOME LISTS" in hot pink (#e050b0), 1.5rem, bold, monospaced
  - Below logo: animated terminal window mockup, #0a0a0a bg, cyan text typing "$ discovering 50,000+ resources..."
  - Bottom: 3 testimonial quotes from users, hot pink quotation marks, white text, #a0a0a0 attribution
- Left panel has 1px right border: #2a2a2a

RIGHT FORM PANEL (background: #000000):
- Centered container: max-width 400px
- "WELCOME BACK" label: 0.75rem, letter-spacing: 0.2em, cyan (#4dacde)
- "Sign In" heading: 2rem, bold, white
- Subtext: "New to Awesome Lists? " + "Create an account" link in hot pink (#e050b0)

OAUTH BUTTONS (top of form, before email/password):
- "Continue with GitHub" button: full-width, #1a1a1a bg, 1px #2a2a2a border, GitHub icon (white), text white
- "Continue with Google" button: same style, Google icon
- Both: height 48px, hover → border: #e050b0

DIVIDER:
Full-width line with "or continue with email" centered text in #606060, lines in #2a2a2a

EMAIL/PASSWORD FORM:
Label + Input pairs:
- "Email" label: 0.75rem, #a0a0a0, letter-spacing: 0.05em
- Email input: #111111 bg, 1px #2a2a2a border, white text, height: 48px, focus → 1px #e050b0 border + subtle glow
- "Password" label: same style
- Password input: same style + show/hide toggle icon (eye icon) in right side, #606060
- "Forgot password?" link: far right below password field, 0.875rem, cyan (#4dacde)

SIGN IN BUTTON:
- Full-width, height: 48px
- Background: #e050b0, text: #000000, font-weight: 700, 1rem
- Hover: background shifts to #c040a0, box-shadow: 0 0 20px rgba(224,80,176,0.4)
- Loading state: spinner + "Signing in..." text, 50% opacity, disabled

ERROR STATE:
- Error message below form: red (#ef4444) text with warning icon
- Input borders turn red on validation error

BOTTOM:
- Terms text: "By signing in, you agree to our Terms and Privacy Policy" — #606060, 0.75rem, centered
- Links: hot pink underline
```

---

## Screen 9: Register

```
Design a registration page for "Awesome Lists" — a multi-field signup form with OAuth options and feature highlights.

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
Same two-column layout as Login. Left: feature highlights panel. Right: registration form.

LEFT PANEL:
- Logo + tagline at top
- "JOIN 10,000+ DEVELOPERS" — cyan, letter-spacing: 0.15em, 0.75rem
- 5 feature bullet points with hot pink checkmark icons:
  • Save and organize your favorite resources
  • Get personalized recommendations
  • Contribute to the community
  • Early access to new features
  • Zero ads, forever
- Subtle animated gradient border effect on left panel: cycling from hot pink to cyan

RIGHT FORM PANEL:
- "GET STARTED" label: cyan, letter-spacing: 0.2em, 0.75rem
- "Create Account" heading: 2rem, bold, white
- "Already have an account? Sign in" with hot pink link

OAUTH BUTTONS: (same as Login page)

DIVIDER: (same as Login page)

REGISTRATION FORM FIELDS:
- First Name + Last Name: two columns side by side, each 50% minus gap
- Email address: full-width
- Username: full-width, with availability check indicator (✓ green / ✗ red, real-time)
- Password: full-width, show/hide toggle
- Confirm Password: full-width
- Password strength meter: 4-segment bar below password field
  - 1 segment: red (Weak), 2: orange (Fair), 3: yellow (Good), 4: green (Strong)

USERNAME AVAILABILITY:
- Loading: cyan spinner while checking
- Available: green (✓) "awesome_dev is available"
- Taken: red (✗) "username taken, try awesome_dev2"

CREATE ACCOUNT BUTTON:
- Same hot pink style as Login "Sign In" button
- Disabled until all fields valid

TERMS CHECKBOX:
- Custom checkbox (1px #2a2a2a border, hot pink when checked)
- "I agree to the Terms of Service and Privacy Policy"

BOTTOM: Same terms text as Login
```

---

## Screen 10: Forgot Password

```
Design a forgot password page for "Awesome Lists" — a simple, focused password reset initiation screen.

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
Single centered panel on full black background. No decorative left column — full focus on the reset form. Panel max-width: 440px, centered vertically and horizontally.

BACKGROUND DECORATION:
- Subtle hot pink radial glow from center (very subtle, 10% opacity)
- Faint grid pattern (same as other pages)

PANEL (#111111 bg, 1px #2a2a2a border, padding: 48px):
- Lock icon at top: 48px, hot pink (#e050b0), centered
- "ACCOUNT RECOVERY" label: 0.75rem, letter-spacing: 0.2em, cyan, centered
- "Reset Password" heading: 2rem, bold, white, centered
- Instructions text: "Enter your email address and we'll send you a link to reset your password." — 1rem, #a0a0a0, centered, line-height: 1.625

FORM:
- "Email Address" label: 0.75rem, #a0a0a0
- Email input: #0a0a0a bg (darker to feel contained within the card), 1px #2a2a2a border, focus → hot pink
- "Send Reset Link" button: full-width, hot pink bg, black text, bold

SUCCESS STATE (after submission):
- Panel content replaced with:
  - Checkmark icon: 48px, green (#22c55e)
  - "Check Your Email" heading
  - "We sent a reset link to dev@example.com. Check your spam folder if you don't see it." — #a0a0a0
  - "Resend Email" text button in cyan (with 60s cooldown shown as countdown)
  - "← Back to Sign In" link

BACK LINK:
- "← Back to Sign In" — bottom of panel, #606060, hover → white
- Subtle left arrow animation on hover
```

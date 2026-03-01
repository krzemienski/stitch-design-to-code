# Prompt Engineering Guide — Stitch MCP Design-to-Code

## Why Embed the Full Design System in Every Prompt

The single most important rule: **embed the complete design system specification in every Stitch prompt.** Not a reference. Not a link. The full spec, inline.

### The Problem with References

When you write "use the design system from tokens.json," the AI has no idea what that means. It will default to:
- Generic shadcn/ui defaults (rounded corners, gray accents)
- Its training data's most common patterns
- Whatever looks "reasonable" to it

The result is inconsistency across screens. Your Login page will have different border-radius than your Dashboard. Your primary color will drift. Your font will change.

### The Solution: Inline Everything

Every prompt must contain:

```
DESIGN SYSTEM:
- Background: #000000 (pure black)
- Primary Accent: #e050b0 (hot pink)
- Secondary Accent: #4dacde (cyan)
- Surface: #111111 cards, #1a1a1a elevated
- Text: #ffffff primary, #a0a0a0 secondary
- Font: JetBrains Mono (monospaced), all sizes
- Border radius: 0px everywhere — brutalist aesthetic
- Component library: shadcn/ui
```

This gives the AI a complete, unambiguous specification for every generation.

## The Generate-Convert-Validate Cycle

```
1. CRAFT PROMPT
   Write a detailed prompt with embedded design system.
   Describe layout, key elements, interactions, edge cases.

2. STITCH MCP → DESIGN OUTPUT
   Stitch generates the visual design based on your prompt.
   Review the output. Iterate if needed (run cycle again with adjusted prompt).

3. CONVERT TO REACT
   Take the Stitch output and convert to React/Next.js components.
   Apply shadcn/ui primitives. Wire up the design tokens.

4. PUPPETEER VALIDATION
   Run automated checks: rendering, layout, interactive states.
   Capture screenshots as evidence.
   Fix failures → re-run validation.
```

## Tips for Stitch MCP Prompts

### 1. Describe, Don't Request

**Bad:** "Make a login page"
**Good:** "A login page with a centered card (max-w-md) on a pure black background. The card uses #111111 background with a 1px #2a2a2a border. Contains: email input, password input with show/hide toggle, 'Sign In' CTA button in hot pink (#e050b0), 'Forgot Password' link in cyan (#4dacde), divider with 'or', Google and GitHub OAuth buttons in #1a1a1a."

### 2. Specify Exact Colors

Always use hex values. "Dark gray" means different things to different models. `#111111` means exactly one thing.

### 3. Describe Interactive States

Include hover states, focus rings, loading states:
- "Input focus ring: 1px solid #e050b0"
- "Button hover: background shifts to #c040a0, box-shadow: 0 0 20px rgba(224,80,176,0.4)"
- "Loading state: spinner in primary color, button disabled and at 50% opacity"

### 4. Define Layout with Specifics

Don't leave layout to interpretation:
- "Sidebar: fixed, 240px wide, #111111 background"
- "Main content: ml-240px, full height"
- "Card grid: 3 columns on desktop, 2 on tablet, 1 on mobile"

### 5. Anchor Typography

Always specify font sizes and weights explicitly:
- "Page title: 2rem, font-weight: 700, letter-spacing: -0.025em"
- "Body text: 0.875rem, font-weight: 400, line-height: 1.625"
- "Caption/metadata: 0.75rem, #a0a0a0"

## A/B/C Variation Testing Strategy

For each screen, generate 3 variations with subtle differences:

**Variation A:** Conservative layout — established patterns, maximum usability
**Variation B:** Bold layout — larger typography, more whitespace, dramatic accents
**Variation C:** Experimental layout — unconventional structure, maximum visual impact

### How to Request Variations in Stitch

Append to your prompt:
```
Generate 3 variations of this screen:
- Variation A: Conservative, sidebar navigation, card-based content
- Variation B: Bold, centered layout, large hero typography
- Variation C: Full-bleed, edge-to-edge content, navigation overlay
```

Then validate all 3 with Puppeteer and pick the winner based on:
1. Visual consistency with design system
2. Interaction clarity
3. Information hierarchy

## Common Pitfalls

### Branding Drift
If you generate screens across multiple sessions, the AI may introduce inconsistent product names. Always include the product name in the prompt and verify with automated grep:
```bash
grep -r "Awesome Lists\|Video Dashboard\|placeholder" src/
```

### Color Substitution
The AI may substitute similar colors. `#e050b0` might become `#e91e8c` or `#d946ef`. Add explicit hex values and validate with Puppeteer color assertions.

### Font Fallback
JetBrains Mono may not load in Puppeteer's headless browser during validation. Always include fallback fonts in your CSS and validate both loaded and fallback states.

### Border Radius Creep
Shadcn/ui defaults include `border-radius`. Always explicitly set `border-radius: 0` on all components. Add a global CSS reset:
```css
*, *::before, *::after {
  border-radius: 0 !important;
}
```

## Prompt Template Structure

```markdown
# Screen Name

## Design System
[Always paste the full design system spec here]

## Screen Purpose
[1-2 sentences on what this screen does]

## Layout
[Describe the overall layout structure]

## Key Elements
[Bullet list of all UI elements with specifics]

## Interactive States
[Hover, focus, loading, error states]

## Responsive Behavior
[How layout adapts at different breakpoints]

## Data / Content
[What real-world data should appear, including edge cases]
```

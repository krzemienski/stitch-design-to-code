const tokens = require('./tokens.json');

/** @type {import('tailwindcss').Config} */
const preset = {
  theme: {
    extend: {
      colors: {
        background: tokens.colors.background,
        primary: {
          DEFAULT: tokens.colors.primary,
          glow: tokens.colors.primaryGlow,
          subtle: tokens.colors.primarySubtle,
        },
        secondary: {
          DEFAULT: tokens.colors.secondary,
          glow: tokens.colors.secondaryGlow,
          subtle: tokens.colors.secondarySubtle,
        },
        surface: {
          DEFAULT: tokens.colors.surface,
          alt: tokens.colors.surfaceAlt,
          hover: tokens.colors.surfaceHover,
        },
        text: {
          DEFAULT: tokens.colors.text,
          secondary: tokens.colors.textSecondary,
          muted: tokens.colors.textMuted,
        },
        border: {
          DEFAULT: tokens.colors.border,
          accent: tokens.colors.borderAccent,
        },
        success: tokens.colors.success,
        warning: tokens.colors.warning,
        error: tokens.colors.error,
      },
      fontFamily: {
        mono: [tokens.typography.fontFamily, tokens.typography.fontFamilyFallback],
        sans: [tokens.typography.fontFamily, tokens.typography.fontFamilyFallback],
      },
      fontSize: {
        xs: [tokens.typography.sizes.xs, { lineHeight: tokens.typography.lineHeights.normal }],
        sm: [tokens.typography.sizes.sm, { lineHeight: tokens.typography.lineHeights.normal }],
        base: [tokens.typography.sizes.base, { lineHeight: tokens.typography.lineHeights.normal }],
        lg: [tokens.typography.sizes.lg, { lineHeight: tokens.typography.lineHeights.snug }],
        xl: [tokens.typography.sizes.xl, { lineHeight: tokens.typography.lineHeights.snug }],
        '2xl': [tokens.typography.sizes['2xl'], { lineHeight: tokens.typography.lineHeights.tight }],
        '3xl': [tokens.typography.sizes['3xl'], { lineHeight: tokens.typography.lineHeights.tight }],
        '4xl': [tokens.typography.sizes['4xl'], { lineHeight: tokens.typography.lineHeights.tight }],
      },
      spacing: tokens.spacing,
      borderRadius: {
        none: tokens.borderRadius.none,
        sm: tokens.borderRadius.sm,
        DEFAULT: tokens.borderRadius.base,
        md: tokens.borderRadius.md,
        lg: tokens.borderRadius.lg,
        xl: tokens.borderRadius.xl,
        '2xl': tokens.borderRadius['2xl'],
        full: tokens.borderRadius.full,
      },
      boxShadow: {
        subtle: tokens.shadows.subtle,
        card: tokens.shadows.card,
        elevated: tokens.shadows.elevated,
        overlay: tokens.shadows.overlay,
        'primary-glow': tokens.shadows.primaryGlow,
        'secondary-glow': tokens.shadows.secondaryGlow,
        'primary-inner': tokens.shadows.primaryInner,
        'secondary-inner': tokens.shadows.secondaryInner,
      },
      transitionDuration: {
        fast: '150ms',
        base: '200ms',
        slow: '300ms',
        slower: '500ms',
      },
      backgroundImage: {
        'primary-gradient': `linear-gradient(135deg, ${tokens.colors.primary}20 0%, transparent 60%)`,
        'secondary-gradient': `linear-gradient(135deg, ${tokens.colors.secondary}20 0%, transparent 60%)`,
        'surface-gradient': `linear-gradient(180deg, ${tokens.colors.surfaceAlt} 0%, ${tokens.colors.surface} 100%)`,
        'hero-gradient': `radial-gradient(ellipse at top, ${tokens.colors.primary}15 0%, transparent 60%), radial-gradient(ellipse at bottom right, ${tokens.colors.secondary}10 0%, transparent 50%)`,
        'grid-pattern': `linear-gradient(${tokens.colors.border} 1px, transparent 1px), linear-gradient(90deg, ${tokens.colors.border} 1px, transparent 1px)`,
      },
    },
  },
  plugins: [],
};

module.exports = preset;

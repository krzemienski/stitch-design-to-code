import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

/**
 * HomeHero — Full-width hero section for the Awesome Lists home page.
 * Brutalist-cyberpunk design: pure black background, hot pink + cyan accents,
 * JetBrains Mono, grid pattern overlay, radial glow.
 */

interface HomeHeroProps {
  headline?: string;
  subtext?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  stats?: Array<{ value: string; label: string }>;
  className?: string;
}

const DEFAULT_STATS = [
  { value: '50K+', label: 'Resources' },
  { value: '500+', label: 'Categories' },
  { value: '10K+', label: 'GitHub Stars' },
  { value: 'Daily', label: 'Updates' },
];

export function HomeHero({
  headline = 'The Ultimate Curated Resource Directory',
  subtext = 'Explore 50,000+ curated awesome lists, tools, libraries, and resources organized by category.',
  primaryCtaLabel = 'Explore Resources',
  primaryCtaHref = '/resources',
  secondaryCtaLabel = 'Browse Categories',
  secondaryCtaHref = '/categories',
  stats = DEFAULT_STATS,
  className,
}: HomeHeroProps) {
  return (
    <section
      data-testid="hero"
      className={cn(
        'relative w-full py-24 px-6 overflow-hidden',
        // Pure black background
        'bg-background',
        className
      )}
    >
      {/* Background: radial glow from top */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(224,80,176,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Grid pattern overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(42,42,42,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(42,42,42,0.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center gap-8">
        {/* Eyebrow */}
        <p className="text-xs font-mono font-semibold tracking-[0.25em] text-secondary uppercase">
          Discover · Explore · Build
        </p>

        {/* Headline */}
        <h1
          data-testid="hero-headline"
          className="text-5xl md:text-6xl font-mono font-bold text-text leading-tight tracking-tight max-w-3xl"
        >
          {headline}
        </h1>

        {/* Decorative rule */}
        <div className="w-20 h-0.5 bg-primary" aria-hidden="true" />

        {/* Subtext */}
        <p className="text-lg font-mono text-text-secondary max-w-2xl leading-relaxed">
          {subtext}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            size="lg"
            variant="default"
            asChild
            data-testid="cta-explore"
          >
            <a href={primaryCtaHref}>{primaryCtaLabel}</a>
          </Button>
          <Button
            size="lg"
            variant="secondary-outline"
            asChild
            data-testid="cta-browse"
          >
            <a href={secondaryCtaHref}>{secondaryCtaLabel}</a>
          </Button>
        </div>

        {/* Stats */}
        {stats.length > 0 && (
          <div
            data-testid="hero-stats"
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-4"
          >
            {stats.map((stat, idx) => (
              <React.Fragment key={stat.label}>
                <span className="font-mono text-sm text-text-muted">
                  <span className="text-primary font-bold">{stat.value}</span>{' '}
                  {stat.label}
                </span>
                {idx < stats.length - 1 && (
                  <span className="text-border font-mono" aria-hidden="true">
                    |
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ── Stats Bar ─────────────────────────────────────────────────────────────────

interface StatsBarProps {
  stats?: Array<{ value: string; label: string }>;
  className?: string;
}

export function StatsBar({ stats = DEFAULT_STATS, className }: StatsBarProps) {
  return (
    <div
      data-testid="stats-bar"
      className={cn(
        'w-full bg-surface border-y border-border py-5',
        className
      )}
    >
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6">
        {stats.map((stat, idx) => (
          <React.Fragment key={stat.label}>
            <div className="text-center">
              <span className="block font-mono font-bold text-xl text-primary">
                {stat.value}
              </span>
              <span className="block font-mono text-xs text-text-muted uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
            {idx < stats.length - 1 && (
              <span className="text-border hidden sm:block" aria-hidden="true">|</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

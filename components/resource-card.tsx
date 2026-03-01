import * as React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

/**
 * ResourceCard — Curated resource display card.
 * Brutalist-cyberpunk: dark surface, hot pink hover glow, monospaced text.
 */

interface ResourceCardProps {
  title: string;
  description: string;
  category?: string;
  tags?: string[];
  stars?: string | number;
  views?: string | number;
  updatedAt?: string;
  thumbnailUrl?: string;
  href?: string;
  isBookmarked?: boolean;
  isFeatured?: boolean;
  isVerified?: boolean;
  onBookmark?: () => void;
  className?: string;
  'data-testid'?: string;
}

export function ResourceCard({
  title,
  description,
  category,
  tags = [],
  stars,
  views,
  updatedAt,
  thumbnailUrl,
  href = '#',
  isBookmarked = false,
  isFeatured = false,
  isVerified = false,
  onBookmark,
  className,
  'data-testid': testId = 'resource-card',
}: ResourceCardProps) {
  return (
    <article
      data-testid={testId}
      className={cn(
        'group relative flex flex-col',
        'bg-surface border border-border font-mono',
        // Hover: hot pink glow
        'transition-all duration-200',
        'hover:border-primary hover:shadow-[0_0_20px_rgba(224,80,176,0.15)]',
        'hover:-translate-y-px',
        className
      )}
    >
      {/* Featured badge — overlays thumbnail */}
      {isFeatured && (
        <div className="absolute top-2 left-2 z-10">
          <Badge variant="featured">Featured</Badge>
        </div>
      )}

      {/* Bookmark button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          onBookmark?.();
        }}
        aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
        className={cn(
          'absolute top-2 right-2 z-10 p-1.5',
          'transition-colors duration-150',
          isBookmarked ? 'text-primary' : 'text-text-muted hover:text-primary'
        )}
      >
        <BookmarkIcon filled={isBookmarked} />
      </button>

      {/* Thumbnail */}
      <a href={href} className="block overflow-hidden">
        <div className="aspect-video bg-surface-alt border-b border-border flex items-center justify-center overflow-hidden">
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
            />
          ) : (
            <ResourcePlaceholder title={title} />
          )}
        </div>
      </a>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Category + verified */}
        <div className="flex items-center gap-2 flex-wrap">
          {category && (
            <Badge variant="secondary" size="sm">
              {category}
            </Badge>
          )}
          {isVerified && (
            <Badge variant="verified" size="sm">
              ✓ Verified
            </Badge>
          )}
        </div>

        {/* Title */}
        <h3 className="text-sm font-bold leading-snug">
          <a
            href={href}
            className="text-text hover:text-primary transition-colors duration-150 line-clamp-2"
          >
            {title}
          </a>
        </h3>

        {/* Description */}
        <p className="text-xs text-text-secondary leading-relaxed line-clamp-3 flex-1">
          {description}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono text-text-muted bg-surface-alt px-1.5 py-0.5"
              >
                #{tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="text-[10px] font-mono text-text-muted">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Metadata row */}
        <div className="flex items-center gap-3 text-[10px] text-text-muted border-t border-border pt-3 mt-auto">
          {stars !== undefined && (
            <span className="flex items-center gap-1">
              <StarIcon /> {formatNumber(stars)}
            </span>
          )}
          {views !== undefined && (
            <span className="flex items-center gap-1">
              <EyeIcon /> {formatNumber(views)}
            </span>
          )}
          {updatedAt && (
            <span className="ml-auto">{updatedAt}</span>
          )}
        </div>
      </div>
    </article>
  );
}

// ── Resource Grid ─────────────────────────────────────────────────────────────

interface ResourceGridProps {
  resources: ResourceCardProps[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export function ResourceGrid({ resources, columns = 3, className }: ResourceGridProps) {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  return (
    <div
      data-testid="resource-grid"
      className={cn('grid gap-4', gridCols[columns], className)}
    >
      {resources.map((resource, idx) => (
        <ResourceCard key={idx} {...resource} />
      ))}
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatNumber(n: string | number): string {
  const num = typeof n === 'string' ? parseFloat(n.replace(/[^0-9.]/g, '')) : n;
  if (isNaN(num)) return String(n);
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return String(num);
}

function ResourcePlaceholder({ title }: { title: string }) {
  const initial = title.charAt(0).toUpperCase();
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-2">
      <span className="text-2xl font-mono font-bold text-primary">{initial}</span>
      <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">
        Resource
      </span>
    </div>
  );
}

function BookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5z" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

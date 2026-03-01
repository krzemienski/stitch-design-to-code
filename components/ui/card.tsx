import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Card system — Brutalist-cyberpunk design.
 * Dark surfaces (#111111), zero border radius, subtle border.
 * Supports glow variants for accent states.
 */

// ── Root Card ─────────────────────────────────────────────────────────────────

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Accent border variant */
  accent?: 'primary' | 'secondary' | 'none';
  /** Show hover glow effect */
  hoverable?: boolean;
  /** Elevated surface (uses #1a1a1a bg) */
  elevated?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, accent = 'none', hoverable = false, elevated = false, ...props }, ref) => {
    const accentStyles = {
      none: 'border-border',
      primary: 'border-primary shadow-[0_0_20px_rgba(224,80,176,0.15)]',
      secondary: 'border-secondary shadow-[0_0_20px_rgba(77,172,222,0.15)]',
    };

    return (
      <div
        ref={ref}
        className={cn(
          // Base card
          'rounded-none border font-mono',
          elevated ? 'bg-surface-alt' : 'bg-surface',
          accentStyles[accent],
          // Hover state
          hoverable && [
            'transition-all duration-200 cursor-pointer',
            'hover:border-primary hover:shadow-[0_0_20px_rgba(224,80,176,0.2)]',
            'hover:-translate-y-px',
          ],
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

// ── Card Header ───────────────────────────────────────────────────────────────

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

// ── Card Title ────────────────────────────────────────────────────────────────

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        'text-lg font-bold text-text leading-tight tracking-tight font-mono',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
);
CardTitle.displayName = 'CardTitle';

// ── Card Description ──────────────────────────────────────────────────────────

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-text-secondary font-mono leading-relaxed', className)}
      {...props}
    />
  )
);
CardDescription.displayName = 'CardDescription';

// ── Card Content ──────────────────────────────────────────────────────────────

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-6 pt-0', className)}
      {...props}
    />
  )
);
CardContent.displayName = 'CardContent';

// ── Card Footer ───────────────────────────────────────────────────────────────

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Render a top border separator */
  bordered?: boolean;
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, bordered = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center p-6 pt-0',
        bordered && 'border-t border-border mt-0 pt-6',
        className
      )}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

// ── Stat Card ─────────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: string | number;
  accent?: 'primary' | 'secondary';
  className?: string;
}

function StatCard({ label, value, accent = 'primary', className }: StatCardProps) {
  const valueColor = accent === 'primary' ? 'text-primary' : 'text-secondary';

  return (
    <Card className={cn('p-6 text-center', className)}>
      <div className={cn('text-3xl font-bold font-mono', valueColor)}>{value}</div>
      <div className="text-sm text-text-secondary font-mono mt-1">{label}</div>
    </Card>
  );
}

// ── Resource Card ─────────────────────────────────────────────────────────────

interface ResourceCardProps {
  title: string;
  description: string;
  category?: string;
  stars?: string;
  views?: string;
  updatedAt?: string;
  href?: string;
  className?: string;
}

function ResourceCard({
  title,
  description,
  category,
  stars,
  views,
  updatedAt,
  href,
  className,
}: ResourceCardProps) {
  return (
    <Card hoverable className={cn('overflow-hidden', className)}>
      {/* Thumbnail */}
      <div className="aspect-video bg-surface-alt border-b border-border flex items-center justify-center">
        <span className="text-text-muted text-xs font-mono uppercase tracking-widest">Preview</span>
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Category badge */}
        {category && (
          <span className="inline-block text-xs font-mono font-semibold text-secondary bg-secondary-subtle px-2 py-0.5 border border-secondary">
            {category}
          </span>
        )}

        {/* Title */}
        <h4 className="text-sm font-bold text-text font-mono line-clamp-2 hover:text-primary transition-colors">
          {href ? <a href={href}>{title}</a> : title}
        </h4>

        {/* Description */}
        <p className="text-xs text-text-secondary font-mono line-clamp-3 leading-relaxed">
          {description}
        </p>

        {/* Metadata */}
        <div className="flex items-center gap-3 text-xs text-text-muted font-mono">
          {stars && <span>⭐ {stars}</span>}
          {views && <span>👁 {views}</span>}
          {updatedAt && <span className="ml-auto">{updatedAt}</span>}
        </div>
      </CardContent>
    </Card>
  );
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  StatCard,
  ResourceCard,
};

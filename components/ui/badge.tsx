import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Badge — Brutalist-cyberpunk inline label component.
 * Zero border radius, JetBrains Mono, hot pink / cyan accent system.
 */

const badgeVariants = cva(
  [
    'inline-flex items-center gap-1',
    'px-2 py-0.5',
    'text-xs font-mono font-semibold',
    'leading-none',
    // No border radius — brutalist
    'rounded-none',
    'border',
    'transition-colors duration-150',
    'select-none',
  ].join(' '),
  {
    variants: {
      variant: {
        /** Default — subtle surface */
        default: 'bg-surface border-border text-text-secondary',

        /** Hot pink primary */
        primary: 'bg-primary-subtle border-primary text-primary',

        /** Hot pink filled */
        'primary-filled': 'bg-primary border-primary text-black',

        /** Cyan secondary */
        secondary: 'bg-secondary-subtle border-secondary text-secondary',

        /** Cyan filled */
        'secondary-filled': 'bg-secondary border-secondary text-black',

        /** Success green */
        success: 'bg-[rgba(34,197,94,0.1)] border-success text-success',

        /** Warning amber */
        warning: 'bg-[rgba(245,158,11,0.1)] border-warning text-warning',

        /** Error red */
        error: 'bg-[rgba(239,68,68,0.1)] border-error text-error',

        /** Outline — border only, transparent bg */
        outline: 'bg-transparent border-border text-text-secondary hover:border-text-secondary',

        /** Dark filled — surface color, monochrome */
        dark: 'bg-surface-alt border-border text-text',

        /** "FEATURED" — special hot pink solid style */
        featured: 'bg-primary border-primary text-black uppercase tracking-wider',

        /** "VERIFIED" — green status badge */
        verified: 'bg-success border-success text-black uppercase tracking-wider',

        /** "TRENDING" — cyan with animation */
        trending: 'bg-secondary border-secondary text-black uppercase tracking-wider',

        /** "NEW" — animated outline */
        new: 'bg-transparent border-primary text-primary animate-pulse',

        /** "ADMIN" — admin role badge */
        admin: 'bg-primary border-primary text-black uppercase tracking-wider',

        /** "MOD" — moderator badge */
        mod: 'bg-secondary border-secondary text-black uppercase tracking-wider',
      },

      size: {
        xs: 'text-[10px] px-1.5 py-px',
        sm: 'text-xs px-2 py-0.5',
        default: 'text-xs px-2.5 py-1',
        lg: 'text-sm px-3 py-1.5',
      },

      dot: {
        true: '',
        false: '',
      },
    },

    defaultVariants: {
      variant: 'default',
      size: 'default',
      dot: false,
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Show a colored dot indicator before label */
  dot?: boolean;
  /** Override dot color (defaults to current text color) */
  dotColor?: string;
  /** Make the badge a removable chip (shows × button) */
  removable?: boolean;
  /** Called when × is clicked */
  onRemove?: () => void;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant,
      size,
      dot = false,
      dotColor,
      removable = false,
      onRemove,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size, dot }), className)}
        {...props}
      >
        {/* Status dot */}
        {dot && (
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0 bg-current"
            style={dotColor ? { backgroundColor: dotColor } : undefined}
            aria-hidden="true"
          />
        )}

        {children}

        {/* Remove button */}
        {removable && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove?.();
            }}
            className="ml-0.5 -mr-0.5 hover:text-white transition-colors duration-100 focus:outline-none"
            aria-label="Remove"
          >
            ×
          </button>
        )}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

// ── Badge Group ───────────────────────────────────────────────────────────────

interface BadgeGroupProps {
  badges: Array<{
    label: string;
    variant?: BadgeProps['variant'];
    removable?: boolean;
    onRemove?: () => void;
  }>;
  className?: string;
  maxVisible?: number;
}

function BadgeGroup({ badges, className, maxVisible }: BadgeGroupProps) {
  const visible = maxVisible ? badges.slice(0, maxVisible) : badges;
  const overflow = maxVisible ? badges.length - maxVisible : 0;

  return (
    <div className={cn('flex flex-wrap gap-1.5 items-center', className)}>
      {visible.map((badge, i) => (
        <Badge
          key={i}
          variant={badge.variant || 'default'}
          removable={badge.removable}
          onRemove={badge.onRemove}
        >
          {badge.label}
        </Badge>
      ))}
      {overflow > 0 && (
        <Badge variant="outline">+{overflow} more</Badge>
      )}
    </div>
  );
}

// ── Status Badge ──────────────────────────────────────────────────────────────

type StatusType = 'active' | 'inactive' | 'pending' | 'approved' | 'rejected' | 'banned';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<StatusType, { label: string; variant: BadgeProps['variant'] }> = {
  active: { label: 'Active', variant: 'success' },
  inactive: { label: 'Inactive', variant: 'default' },
  pending: { label: 'Pending', variant: 'warning' },
  approved: { label: 'Approved', variant: 'success' },
  rejected: { label: 'Rejected', variant: 'error' },
  banned: { label: 'Banned', variant: 'error' },
};

function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <Badge variant={config.variant} dot className={className}>
      {config.label}
    </Badge>
  );
}

export { Badge, badgeVariants, BadgeGroup, StatusBadge };

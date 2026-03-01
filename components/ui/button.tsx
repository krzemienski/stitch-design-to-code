import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Button — Brutalist-cyberpunk variant.
 * Zero border radius, JetBrains Mono, hot pink / cyan accent system.
 */
const buttonVariants = cva(
  // Base styles
  [
    'inline-flex items-center justify-center gap-2',
    'font-mono text-sm font-semibold',
    'border-0 outline-none',
    'transition-all duration-150',
    'cursor-pointer select-none',
    'disabled:pointer-events-none disabled:opacity-50',
    'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    // Brutalist — no border radius anywhere
    'rounded-none',
  ].join(' '),
  {
    variants: {
      variant: {
        /** Hot pink fill — primary CTA */
        default: [
          'bg-primary text-black',
          'hover:bg-[#c040a0] hover:shadow-[0_0_20px_rgba(224,80,176,0.4)]',
          'active:scale-[0.98] active:bg-[#b03090]',
        ].join(' '),

        /** Destructive — red for delete/danger actions */
        destructive: [
          'bg-error text-white',
          'hover:bg-[#dc2626] hover:shadow-[0_0_16px_rgba(239,68,68,0.4)]',
          'active:scale-[0.98]',
        ].join(' '),

        /** Outline — hot pink border, transparent bg */
        outline: [
          'border border-primary text-primary bg-transparent',
          'hover:bg-primary hover:text-black hover:shadow-[0_0_16px_rgba(224,80,176,0.3)]',
          'active:scale-[0.98]',
        ].join(' '),

        /** Secondary — cyan accent */
        secondary: [
          'bg-secondary text-black',
          'hover:bg-[#3a9bc7] hover:shadow-[0_0_20px_rgba(77,172,222,0.4)]',
          'active:scale-[0.98]',
        ].join(' '),

        /** Cyan outline */
        'secondary-outline': [
          'border border-secondary text-secondary bg-transparent',
          'hover:bg-secondary hover:text-black hover:shadow-[0_0_16px_rgba(77,172,222,0.3)]',
          'active:scale-[0.98]',
        ].join(' '),

        /** Ghost — subtle surface hover */
        ghost: [
          'bg-transparent text-text-secondary',
          'hover:bg-surface hover:text-text',
          'active:scale-[0.98]',
        ].join(' '),

        /** Link — inline text link style */
        link: [
          'bg-transparent text-primary underline-offset-4',
          'hover:underline hover:text-[#c040a0]',
          'p-0 h-auto',
        ].join(' '),

        /** Danger ghost — red text ghost */
        'ghost-danger': [
          'bg-transparent text-error',
          'hover:bg-[rgba(239,68,68,0.1)] hover:text-[#dc2626]',
          'active:scale-[0.98]',
        ].join(' '),
      },

      size: {
        xs: 'h-7 px-2 text-xs',
        sm: 'h-8 px-3 text-xs',
        default: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        xl: 'h-14 px-8 text-lg',
        icon: 'h-10 w-10 p-0',
        'icon-sm': 'h-8 w-8 p-0',
        'icon-lg': 'h-12 w-12 p-0',
      },
    },

    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as child element (for link wrapping via Radix Slot) */
  asChild?: boolean;
  /** Show loading spinner and disable interactions */
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <LoadingSpinner />
            <span className="opacity-70">{children}</span>
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

/** Inline spinner matching current text color */
function LoadingSpinner() {
  return (
    <svg
      className="animate-spin h-4 w-4 shrink-0"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

export { Button, buttonVariants };

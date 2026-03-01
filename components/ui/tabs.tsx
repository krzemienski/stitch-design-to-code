import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';

/**
 * Tabs — Brutalist-cyberpunk design using Radix UI primitives.
 * Hot pink active indicator, JetBrains Mono, zero border radius.
 */

// ── Root ──────────────────────────────────────────────────────────────────────

const Tabs = TabsPrimitive.Root;

// ── TabsList ──────────────────────────────────────────────────────────────────

interface TabsListProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  /** Visual variant for the tab strip */
  variant?: 'underline' | 'pills' | 'bordered';
}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant = 'underline', ...props }, ref) => {
  const variantStyles = {
    underline: 'border-b border-border bg-transparent',
    pills: 'bg-surface p-1 gap-1',
    bordered: 'border border-border bg-transparent',
  };

  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        'flex items-center font-mono',
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

// ── TabsTrigger ───────────────────────────────────────────────────────────────

interface TabsTriggerProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  /** Show a count badge next to the tab label */
  count?: number;
  /** The visual variant (should match parent TabsList) */
  variant?: 'underline' | 'pills' | 'bordered';
}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant = 'underline', count, children, ...props }, ref) => {
  const variantStyles = {
    underline: cn(
      'relative px-4 py-2.5 text-sm text-text-secondary',
      'border-b-2 border-transparent -mb-px',
      'hover:text-text transition-colors duration-150',
      'data-[state=active]:text-text data-[state=active]:border-primary'
    ),
    pills: cn(
      'px-3 py-1.5 text-sm text-text-secondary',
      'hover:text-text hover:bg-surface-alt transition-all duration-150',
      'data-[state=active]:text-text data-[state=active]:bg-surface-hover',
      'data-[state=active]:shadow-[inset_0_0_0_1px_rgba(224,80,176,0.5)]'
    ),
    bordered: cn(
      'px-4 py-2.5 text-sm text-text-secondary',
      'border-r border-border last:border-r-0',
      'hover:text-text hover:bg-surface transition-all duration-150',
      'data-[state=active]:text-text data-[state=active]:bg-surface',
      'data-[state=active]:shadow-[inset_0_-2px_0_0_#e050b0]'
    ),
  };

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        'inline-flex items-center gap-2 font-mono font-medium',
        'cursor-pointer select-none',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary',
        'disabled:pointer-events-none disabled:opacity-50',
        'rounded-none',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
      {count !== undefined && (
        <span className="text-xs font-mono text-text-muted bg-surface-alt px-1.5 py-0.5 min-w-[1.5rem] text-center">
          {count.toLocaleString()}
        </span>
      )}
    </TabsPrimitive.Trigger>
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

// ── TabsContent ───────────────────────────────────────────────────────────────

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-4',
      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary',
      // Subtle fade-in animation
      'data-[state=active]:animate-in data-[state=inactive]:animate-out',
      'data-[state=active]:fade-in-0 data-[state=inactive]:fade-out-0',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

// ── Scrollable Tabs ───────────────────────────────────────────────────────────

/**
 * Horizontally scrollable tab strip for large tab counts (e.g., 20-tab admin panel).
 */
interface ScrollableTabsProps {
  tabs: Array<{
    id: string;
    label: string;
    count?: number;
    testId?: string;
  }>;
  activeTab: string;
  onTabChange: (id: string) => void;
  className?: string;
}

function ScrollableTabs({ tabs, activeTab, onTabChange, className }: ScrollableTabsProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll active tab into view
  React.useEffect(() => {
    const container = scrollRef.current;
    const activeEl = container?.querySelector('[aria-selected="true"]') as HTMLElement;
    if (activeEl && container) {
      const left = activeEl.offsetLeft - container.clientWidth / 2 + activeEl.clientWidth / 2;
      container.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
    }
  }, [activeTab]);

  return (
    <div
      ref={scrollRef}
      className={cn(
        'flex items-center overflow-x-auto scrollbar-none',
        'border-b border-border',
        className
      )}
      style={{ scrollbarWidth: 'none' }}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            data-testid={tab.testId || `tab-${tab.id}`}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 shrink-0',
              'font-mono text-sm font-medium cursor-pointer',
              'border-b-2 -mb-px transition-all duration-150',
              'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary',
              isActive
                ? 'text-text border-primary'
                : 'text-text-secondary border-transparent hover:text-text'
            )}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className={cn(
                'text-xs px-1.5 py-0.5 min-w-[1.5rem] text-center',
                isActive ? 'text-primary bg-primary-subtle' : 'text-text-muted bg-surface-alt'
              )}>
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent, ScrollableTabs };

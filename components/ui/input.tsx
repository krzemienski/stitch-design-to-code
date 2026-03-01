import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Input — Brutalist-cyberpunk design.
 * Dark background, hot pink focus ring, JetBrains Mono, 0px border radius.
 */

// ── Base Input ────────────────────────────────────────────────────────────────

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Left-side icon element */
  leftIcon?: React.ReactNode;
  /** Right-side element (icon, button, badge) */
  rightElement?: React.ReactNode;
  /** Error message to display below input */
  error?: string;
  /** Helper text below input */
  hint?: string;
  /** Label above input */
  label?: string;
  /** Mark field as required */
  required?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', leftIcon, rightElement, error, hint, label, required, id, ...props }, ref) => {
    const inputId = id || React.useId();

    return (
      <div className="w-full space-y-1.5">
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-mono font-medium text-text-secondary tracking-wider uppercase"
          >
            {label}
            {required && <span className="text-primary ml-1">*</span>}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative">
          {/* Left icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
              {leftIcon}
            </div>
          )}

          <input
            id={inputId}
            type={type}
            ref={ref}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            className={cn(
              // Layout
              'flex w-full h-11 px-3 py-2',
              // Typography
              'font-mono text-sm text-text placeholder:text-text-muted',
              // Background & border
              'bg-surface border border-border',
              // Focus — hot pink ring
              'focus:outline-none focus:border-primary focus:shadow-[0_0_0_1px_#e050b0,0_0_12px_rgba(224,80,176,0.2)]',
              // Error state
              error && 'border-error focus:border-error focus:shadow-[0_0_0_1px_#ef4444]',
              // Disabled
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-alt',
              // No border radius — brutalist
              'rounded-none',
              // Icon padding adjustments
              leftIcon && 'pl-9',
              rightElement && 'pr-10',
              // Transition
              'transition-all duration-150',
              className
            )}
            {...props}
          />

          {/* Right element */}
          {rightElement && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
              {rightElement}
            </div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <p id={`${inputId}-error`} className="text-xs font-mono text-error flex items-center gap-1">
            <span>✗</span> {error}
          </p>
        )}

        {/* Hint text */}
        {!error && hint && (
          <p id={`${inputId}-hint`} className="text-xs font-mono text-text-muted">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// ── Textarea ──────────────────────────────────────────────────────────────────

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, required, id, ...props }, ref) => {
    const textareaId = id || React.useId();

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-xs font-mono font-medium text-text-secondary tracking-wider uppercase"
          >
            {label}
            {required && <span className="text-primary ml-1">*</span>}
          </label>
        )}

        <textarea
          id={textareaId}
          ref={ref}
          aria-invalid={!!error}
          className={cn(
            'flex w-full min-h-[100px] px-3 py-2.5',
            'font-mono text-sm text-text placeholder:text-text-muted',
            'bg-surface border border-border',
            'focus:outline-none focus:border-primary focus:shadow-[0_0_0_1px_#e050b0,0_0_12px_rgba(224,80,176,0.2)]',
            error && 'border-error focus:border-error',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'rounded-none resize-y',
            'transition-all duration-150',
            className
          )}
          {...props}
        />

        {error && (
          <p className="text-xs font-mono text-error">✗ {error}</p>
        )}
        {!error && hint && (
          <p className="text-xs font-mono text-text-muted">{hint}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

// ── Search Input ──────────────────────────────────────────────────────────────

export interface SearchInputProps extends Omit<InputProps, 'leftIcon'> {
  /** Show keyboard shortcut badge (e.g., "⌘K") */
  shortcutBadge?: string;
  /** Called when input value changes (debounce recommended) */
  onSearch?: (value: string) => void;
}

function SearchInput({ shortcutBadge, onSearch, onChange, className, ...props }: SearchInputProps) {
  const SearchIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    onSearch?.(e.target.value);
  };

  const rightEl = shortcutBadge ? (
    <span
      className="text-xs font-mono text-text-muted bg-surface-alt border border-border px-1.5 py-0.5"
      data-testid="search-shortcut-badge"
    >
      {shortcutBadge}
    </span>
  ) : undefined;

  return (
    <Input
      type="search"
      leftIcon={<SearchIcon />}
      rightElement={rightEl}
      onChange={handleChange}
      className={className}
      {...props}
    />
  );
}

export { Input, Textarea, SearchInput };

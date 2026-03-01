import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

/**
 * AuthForm — Unified authentication form supporting login and register modes.
 * Brutalist-cyberpunk: dark inputs, hot pink focus, JetBrains Mono.
 */

type AuthMode = 'login' | 'register' | 'forgot-password';

interface AuthFormProps {
  mode: AuthMode;
  onSubmit?: (data: Record<string, string>) => void | Promise<void>;
  isLoading?: boolean;
  error?: string;
  className?: string;
}

export function AuthForm({ mode, onSubmit, isLoading = false, error, className }: AuthFormProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState<Record<string, string>>({});
  const [passwordStrength, setPasswordStrength] = React.useState(0);
  const [usernameStatus, setUsernameStatus] = React.useState<'idle' | 'checking' | 'available' | 'taken'>('idle');

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === 'password') {
      setPasswordStrength(calculateStrength(value));
    }

    if (field === 'username' && mode === 'register' && value.length >= 3) {
      setUsernameStatus('checking');
      // Simulate async username check
      setTimeout(() => {
        setUsernameStatus(value === 'taken_user' ? 'taken' : 'available');
      }, 600);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit?.(formData);
  };

  return (
    <form
      data-testid={`${mode}-form`}
      onSubmit={handleSubmit}
      className={cn('space-y-5 font-mono', className)}
      noValidate
    >
      {/* Global error */}
      {error && (
        <div className="flex items-start gap-2 text-sm text-error bg-[rgba(239,68,68,0.08)] border border-error p-3">
          <span className="shrink-0">✗</span>
          <span>{error}</span>
        </div>
      )}

      {/* OAuth buttons (login + register only) */}
      {mode !== 'forgot-password' && (
        <>
          <div className="space-y-3">
            <OAuthButton provider="github" data-testid="oauth-github" />
            <OAuthButton provider="google" data-testid="oauth-google" />
          </div>

          <Divider label="or continue with email" />
        </>
      )}

      {/* Name fields (register only) */}
      {mode === 'register' && (
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="First Name"
            placeholder="Jane"
            required
            data-testid="firstname-input"
            onChange={handleChange('firstName')}
          />
          <Input
            label="Last Name"
            placeholder="Doe"
            required
            data-testid="lastname-input"
            onChange={handleChange('lastName')}
          />
        </div>
      )}

      {/* Username (register only) */}
      {mode === 'register' && (
        <div className="space-y-1">
          <Input
            label="Username"
            placeholder="awesome_dev"
            required
            data-testid="username-input"
            onChange={handleChange('username')}
            rightElement={
              <UsernameStatusIcon status={usernameStatus} />
            }
          />
          {usernameStatus === 'available' && (
            <p className="text-xs text-success font-mono" data-testid="username-status">
              ✓ {formData.username} is available
            </p>
          )}
          {usernameStatus === 'taken' && (
            <p className="text-xs text-error font-mono" data-testid="username-status">
              ✗ Username taken, try {formData.username}2
            </p>
          )}
          {usernameStatus === 'checking' && (
            <p className="text-xs text-text-muted font-mono" data-testid="username-status">
              Checking availability...
            </p>
          )}
        </div>
      )}

      {/* Email */}
      <Input
        type="email"
        label="Email Address"
        placeholder="you@example.com"
        required
        autoComplete={mode === 'login' ? 'email' : 'new-email'}
        data-testid="email-input"
        onChange={handleChange('email')}
      />

      {/* Password (login + register only) */}
      {mode !== 'forgot-password' && (
        <div className="space-y-2">
          <Input
            type={showPassword ? 'text' : 'password'}
            label="Password"
            placeholder={mode === 'register' ? 'Min 8 characters' : '••••••••'}
            required
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            data-testid="password-input"
            onChange={handleChange('password')}
            rightElement={
              <button
                type="button"
                data-testid="password-toggle"
                onClick={() => setShowPassword((v) => !v)}
                className="text-text-muted hover:text-text transition-colors focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            }
          />

          {/* Password strength (register only) */}
          {mode === 'register' && formData.password && (
            <PasswordStrengthMeter strength={passwordStrength} />
          )}

          {/* Forgot password link (login only) */}
          {mode === 'login' && (
            <div className="flex justify-end">
              <a
                href="/auth/forgot-password"
                data-testid="forgot-password-link"
                className="text-xs text-secondary hover:text-[#3a9bc7] transition-colors font-mono"
              >
                Forgot password?
              </a>
            </div>
          )}
        </div>
      )}

      {/* Confirm password (register only) */}
      {mode === 'register' && (
        <Input
          type={showPassword ? 'text' : 'password'}
          label="Confirm Password"
          placeholder="Repeat password"
          required
          data-testid="confirm-password-input"
          onChange={handleChange('confirmPassword')}
          error={
            formData.confirmPassword && formData.password !== formData.confirmPassword
              ? 'Passwords do not match'
              : undefined
          }
        />
      )}

      {/* Terms checkbox (register only) */}
      {mode === 'register' && (
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            data-testid="terms-checkbox"
            required
            className={cn(
              'mt-0.5 shrink-0 w-4 h-4 appearance-none',
              'border border-border bg-surface',
              'checked:bg-primary checked:border-primary',
              'focus:outline-none focus:ring-1 focus:ring-primary',
              'cursor-pointer'
            )}
            onChange={handleChange('terms')}
          />
          <span className="text-xs text-text-secondary font-mono leading-relaxed">
            I agree to the{' '}
            <a href="/terms" className="text-primary hover:underline">Terms of Service</a>{' '}
            and{' '}
            <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
          </span>
        </label>
      )}

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        variant="default"
        className="w-full"
        loading={isLoading}
        data-testid="submit-btn"
      >
        {mode === 'login' && 'Sign In'}
        {mode === 'register' && 'Create Account'}
        {mode === 'forgot-password' && 'Send Reset Link'}
      </Button>

      {/* Footer link */}
      <p className="text-center text-xs font-mono text-text-muted">
        {mode === 'login' ? (
          <>
            New to Awesome Lists?{' '}
            <a href="/auth/register" className="text-primary hover:underline">
              Create an account
            </a>
          </>
        ) : mode === 'register' ? (
          <>
            Already have an account?{' '}
            <a href="/auth/login" className="text-primary hover:underline">
              Sign in
            </a>
          </>
        ) : (
          <a
            href="/auth/login"
            data-testid="back-to-login"
            className="text-text-secondary hover:text-text transition-colors"
          >
            ← Back to Sign In
          </a>
        )}
      </p>
    </form>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function OAuthButton({ provider, ...props }: { provider: 'github' | 'google'; [key: string]: unknown }) {
  const config = {
    github: { label: 'Continue with GitHub', icon: <GitHubIcon /> },
    google: { label: 'Continue with Google', icon: <GoogleIcon /> },
  };
  const { label, icon } = config[provider];

  return (
    <button
      type="button"
      className={cn(
        'w-full h-11 flex items-center justify-center gap-3',
        'bg-surface-alt border border-border text-text',
        'font-mono text-sm font-medium',
        'hover:border-primary hover:bg-surface transition-all duration-150',
        'focus:outline-none focus:ring-1 focus:ring-primary',
        'rounded-none'
      )}
      {...props}
    >
      {icon}
      {label}
    </button>
  );
}

function Divider({ label }: { label: string }) {
  return (
    <div className="relative flex items-center gap-3">
      <div className="flex-1 h-px bg-border" />
      <span className="text-xs font-mono text-text-muted shrink-0">{label}</span>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

function PasswordStrengthMeter({ strength }: { strength: number }) {
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['', 'bg-error', 'bg-warning', 'bg-yellow-400', 'bg-success'];
  const textColors = ['', 'text-error', 'text-warning', 'text-yellow-400', 'text-success'];

  return (
    <div className="space-y-1" data-testid="password-strength">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={cn(
              'flex-1 h-1 transition-colors duration-200',
              level <= strength ? colors[strength] : 'bg-border'
            )}
          />
        ))}
      </div>
      {strength > 0 && (
        <p className={cn('text-xs font-mono', textColors[strength])}>
          {labels[strength]}
        </p>
      )}
    </div>
  );
}

function UsernameStatusIcon({ status }: { status: string }) {
  if (status === 'checking') {
    return <span className="text-xs font-mono text-secondary animate-pulse">...</span>;
  }
  if (status === 'available') return <span className="text-success text-sm">✓</span>;
  if (status === 'taken') return <span className="text-error text-sm">✗</span>;
  return null;
}

function calculateStrength(password: string): number {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

// Icons
function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

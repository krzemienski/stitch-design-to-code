import * as React from 'react';
import { cn } from '@/lib/utils';
import { ScrollableTabs } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

/**
 * AdminTabs — 20-tab admin dashboard management interface.
 * Brutalist-cyberpunk: dark sidebar, hot pink active states, scrollable tab strip.
 */

// ── Tab Definitions ───────────────────────────────────────────────────────────

export const ADMIN_TABS = [
  { id: 'overview',         label: 'Overview',         icon: '◈', section: 'overview', testId: 'tab-overview' },
  { id: 'resources',        label: 'Resources',        icon: '⟐', section: 'content',  testId: 'tab-resources' },
  { id: 'categories',       label: 'Categories',       icon: '◧', section: 'content',  testId: 'tab-categories' },
  { id: 'tags',             label: 'Tags',             icon: '◇', section: 'content',  testId: 'tab-tags' },
  { id: 'featured',        label: 'Featured',         icon: '★', section: 'content',  testId: 'tab-featured' },
  { id: 'submissions',      label: 'Submissions',      icon: '⊕', section: 'community', testId: 'tab-submissions' },
  { id: 'users',            label: 'Users',            icon: '◉', section: 'community', testId: 'tab-users' },
  { id: 'moderation',       label: 'Moderation',       icon: '⚑', section: 'community', testId: 'tab-moderation' },
  { id: 'analytics',        label: 'Analytics',        icon: '◈', section: 'overview', testId: 'tab-analytics' },
  { id: 'search-analytics', label: 'Search Analytics', icon: '⊗', section: 'overview', testId: 'tab-search-analytics' },
  { id: 'api',              label: 'API',              icon: '⟨⟩', section: 'system',  testId: 'tab-api' },
  { id: 'integrations',     label: 'Integrations',     icon: '⊞', section: 'system',  testId: 'tab-integrations' },
  { id: 'email',            label: 'Email',            icon: '◻', section: 'system',  testId: 'tab-email' },
  { id: 'settings',         label: 'Settings',         icon: '⚙', section: 'system',  testId: 'tab-settings' },
  { id: 'themes',           label: 'Themes',           icon: '◑', section: 'system',  testId: 'tab-themes' },
  { id: 'roles',            label: 'Roles & Perms',    icon: '◈', section: 'system',  testId: 'tab-roles' },
  { id: 'audit-log',        label: 'Audit Log',        icon: '⊠', section: 'system',  testId: 'tab-audit-log' },
  { id: 'backups',          label: 'Backups',          icon: '◫', section: 'system',  testId: 'tab-backups' },
  { id: 'maintenance',      label: 'Maintenance',      icon: '⚒', section: 'system',  testId: 'tab-maintenance' },
  { id: 'reports',          label: 'Reports',          icon: '◨', section: 'system',  testId: 'tab-reports' },
] as const;

export type AdminTabId = typeof ADMIN_TABS[number]['id'];

// ── Placeholder content per tab ───────────────────────────────────────────────

const TAB_CONTENT: Record<AdminTabId, React.ReactNode> = {
  overview: <OverviewContent />,
  resources: <TablePlaceholder testId="resources-table" label="Resources" columns={['Thumbnail', 'Title', 'Category', 'Stars', 'Status', 'Added', 'Actions']} />,
  categories: <div data-testid="categories-manager"><TablePlaceholder label="Categories" columns={['Name', 'Slug', 'Resources', 'Visible', 'Actions']} /></div>,
  tags: <div data-testid="tags-manager"><TablePlaceholder label="Tags" columns={['Tag', 'Uses', 'Trending Score', 'Actions']} /></div>,
  featured: <div data-testid="featured-grid"><GridPlaceholder label="Featured Slots" count={8} /></div>,
  submissions: <div data-testid="submissions-queue"><TablePlaceholder label="Pending Submissions" columns={['Submitter', 'Resource', 'Score', 'Submitted', 'Actions']} /></div>,
  users: <div data-testid="users-table"><TablePlaceholder label="Users" columns={['Avatar', 'Username', 'Email', 'Join Date', 'Role', 'Status', 'Actions']} /></div>,
  moderation: <div data-testid="report-queue"><TablePlaceholder label="Report Queue" columns={['Reporter', 'Content', 'Reason', 'Severity', 'Timestamp', 'Actions']} /></div>,
  analytics: <div data-testid="traffic-chart"><ChartPlaceholder label="Traffic Analytics" /></div>,
  'search-analytics': <div data-testid="search-terms-table"><TablePlaceholder label="Top Searches" columns={['Query', 'Count', 'Results Found', 'Zero Result']} /></div>,
  api: <div data-testid="api-keys-table"><TablePlaceholder label="API Keys" columns={['Name', 'Prefix', 'Created', 'Last Used', 'Permissions', 'Status', 'Actions']} /></div>,
  integrations: <div data-testid="integrations-list"><GridPlaceholder label="Connected Services" count={6} /></div>,
  email: <div data-testid="email-campaigns"><TablePlaceholder label="Email Campaigns" columns={['Name', 'Status', 'Sent', 'Open Rate', 'Click Rate', 'Actions']} /></div>,
  settings: <div data-testid="platform-settings"><SettingsPlaceholder /></div>,
  themes: <div data-testid="theme-editor"><ThemePlaceholder /></div>,
  roles: <div data-testid="role-matrix"><RoleMatrixPlaceholder /></div>,
  'audit-log': <div data-testid="audit-log-table"><TablePlaceholder label="Audit Log" columns={['Timestamp', 'Admin', 'Action', 'Target', 'IP']} /></div>,
  backups: <div data-testid="backup-manager"><BackupPlaceholder /></div>,
  maintenance: <div data-testid="maintenance-tools"><MaintenancePlaceholder /></div>,
  reports: <div data-testid="reports-hub"><GridPlaceholder label="Reports" count={4} /></div>,
};

// ── Main AdminTabs Component ──────────────────────────────────────────────────

interface AdminTabsProps {
  defaultTab?: AdminTabId;
  className?: string;
}

export function AdminTabs({ defaultTab = 'overview', className }: AdminTabsProps) {
  const [activeTab, setActiveTab] = React.useState<AdminTabId>(defaultTab);

  const scrollableTabs = ADMIN_TABS.map((tab) => ({
    id: tab.id,
    label: tab.label,
    testId: tab.testId,
  }));

  return (
    <div
      data-testid="admin-tabs"
      className={cn('flex flex-col h-full', className)}
    >
      {/* Scrollable tab strip */}
      <ScrollableTabs
        tabs={scrollableTabs}
        activeTab={activeTab}
        onTabChange={(id) => setActiveTab(id as AdminTabId)}
      />

      {/* Tab content */}
      <div className="flex-1 overflow-auto p-6">
        {TAB_CONTENT[activeTab]}
      </div>
    </div>
  );
}

// ── KPI Cards (Overview) ──────────────────────────────────────────────────────

function OverviewContent() {
  const kpis = [
    { label: 'Total Resources', value: '50,247', delta: '+124 today', positive: true },
    { label: 'Active Users', value: '12,891', delta: '+89 this week', positive: true },
    { label: 'Submissions Today', value: '47', delta: '3 pending review', positive: null },
    { label: 'Approval Rate', value: '94.2%', delta: '-0.3% this month', positive: false },
  ];

  return (
    <div className="space-y-6">
      {/* KPI row */}
      <div data-testid="kpi-cards" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            data-testid="kpi-card"
            className="bg-surface border border-border p-5 space-y-1"
          >
            <p className="text-xs font-mono text-text-muted uppercase tracking-wider">{kpi.label}</p>
            <p className="text-2xl font-mono font-bold text-primary">{kpi.value}</p>
            <p className={cn(
              'text-xs font-mono',
              kpi.positive === true ? 'text-success' : kpi.positive === false ? 'text-error' : 'text-text-muted'
            )}>
              {kpi.delta}
            </p>
          </div>
        ))}
      </div>

      {/* Chart placeholder */}
      <ChartPlaceholder label="Resource Growth — Last 30 Days" />

      {/* Recent activity */}
      <div className="bg-surface border border-border">
        <div className="px-5 py-3 border-b border-border">
          <h3 className="text-xs font-mono font-semibold text-text-muted uppercase tracking-wider">Recent Activity</h3>
        </div>
        <div className="divide-y divide-border">
          {[
            { action: 'Resource approved', detail: 'awesome-rust by @alice', time: '2m ago' },
            { action: 'User registered', detail: '@cool_dev_2025', time: '12m ago' },
            { action: 'Submission flagged', detail: 'Duplicate URL detected', time: '34m ago' },
            { action: 'Category created', detail: 'WebAssembly Tools', time: '1h ago' },
          ].map((item, i) => (
            <div key={i} className="px-5 py-3 flex items-center justify-between">
              <div>
                <span className="text-sm font-mono text-text">{item.action}</span>
                <span className="text-xs font-mono text-text-muted ml-2">{item.detail}</span>
              </div>
              <span className="text-xs font-mono text-text-muted shrink-0">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Reusable Placeholders ──────────────────────────────────────────────────────

function TablePlaceholder({ label, columns, testId }: { label: string; columns: string[]; testId?: string }) {
  const rows = 5;
  return (
    <div data-testid={testId} className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-mono font-bold text-text uppercase tracking-wider">{label}</h2>
        <Badge variant="primary-filled">{rows * 10}+ records</Badge>
      </div>
      <div className="border border-border overflow-hidden">
        <table className="w-full font-mono text-sm">
          <thead>
            <tr className="bg-surface-alt border-b border-border">
              {columns.map((col) => (
                <th key={col} className="px-4 py-2.5 text-left text-xs text-text-muted uppercase tracking-wider">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, i) => (
              <tr key={i} className={cn('border-b border-border', i % 2 === 0 ? 'bg-surface' : 'bg-surface-alt')}>
                {columns.map((col) => (
                  <td key={col} className="px-4 py-2.5">
                    <div className="h-3 bg-border w-3/4 animate-pulse" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ChartPlaceholder({ label }: { label: string }) {
  return (
    <div className="bg-surface border border-border p-5">
      <h3 className="text-xs font-mono font-semibold text-text-muted uppercase tracking-wider mb-4">{label}</h3>
      <div className="h-48 flex items-end gap-1">
        {Array.from({ length: 30 }).map((_, i) => {
          const h = 20 + Math.sin(i * 0.5) * 30 + Math.random() * 40;
          return (
            <div
              key={i}
              className="flex-1 bg-primary opacity-70 hover:opacity-100 transition-opacity"
              style={{ height: `${h}%` }}
            />
          );
        })}
      </div>
    </div>
  );
}

function GridPlaceholder({ label, count }: { label: string; count: number }) {
  return (
    <div className="space-y-4">
      <h2 className="text-sm font-mono font-bold text-text uppercase tracking-wider">{label}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="bg-surface border border-border p-4 space-y-2">
            <div className="h-3 bg-border w-2/3 animate-pulse" />
            <div className="h-2 bg-border w-full animate-pulse" />
            <div className="h-2 bg-border w-4/5 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsPlaceholder() {
  const sections = ['General', 'SEO Defaults', 'Content Policies', 'Registration', 'Feature Flags'];
  return (
    <div className="max-w-2xl space-y-6">
      {sections.map((section) => (
        <div key={section} className="bg-surface border border-border">
          <div className="px-5 py-3 border-b border-border">
            <h3 className="text-xs font-mono font-semibold text-text-muted uppercase tracking-wider">{section}</h3>
          </div>
          <div className="p-5 space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="space-y-1.5">
                <div className="h-2.5 bg-border w-24 animate-pulse" />
                <div className="h-10 bg-surface-alt border border-border w-full" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ThemePlaceholder() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-4">
        <h3 className="text-xs font-mono font-semibold text-text-muted uppercase tracking-wider">Color Tokens</h3>
        {['Background', 'Primary', 'Secondary', 'Surface', 'Text'].map((token) => (
          <div key={token} className="flex items-center gap-3">
            <div className="w-8 h-8 border border-border bg-primary opacity-80" />
            <span className="text-sm font-mono text-text">{token}</span>
          </div>
        ))}
      </div>
      <div className="bg-surface-alt border border-border p-4 flex items-center justify-center">
        <span className="text-xs font-mono text-text-muted">Live Preview</span>
      </div>
    </div>
  );
}

function RoleMatrixPlaceholder() {
  const roles = ['Super Admin', 'Admin', 'Moderator', 'User'];
  const perms = ['Approve Resources', 'Delete Users', 'Edit Categories', 'View Analytics', 'Manage API'];
  return (
    <div className="overflow-x-auto">
      <table className="w-full font-mono text-sm border border-border">
        <thead>
          <tr className="bg-surface-alt border-b border-border">
            <th className="px-4 py-2.5 text-left text-xs text-text-muted">Permission</th>
            {roles.map((r) => (
              <th key={r} className="px-4 py-2.5 text-center text-xs text-text-muted">{r}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {perms.map((perm, i) => (
            <tr key={perm} className={cn('border-b border-border', i % 2 === 0 ? 'bg-surface' : 'bg-surface-alt')}>
              <td className="px-4 py-2.5 text-text">{perm}</td>
              {roles.map((_, j) => (
                <td key={j} className="px-4 py-2.5 text-center">
                  <span className={j <= roles.length - i - 2 ? 'text-success' : 'text-border'}>
                    {j <= roles.length - i - 2 ? '✓' : '—'}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BackupPlaceholder() {
  return (
    <div className="space-y-4 max-w-2xl">
      <div className="bg-surface border border-primary p-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-mono text-text-muted uppercase tracking-wider">Latest Backup</p>
          <p className="text-sm font-mono text-text font-bold mt-1">March 1, 2025 — 04:00 UTC</p>
          <p className="text-xs font-mono text-text-muted">Size: 2.4 GB · Status: Complete</p>
        </div>
        <button className="px-4 py-2 bg-primary text-black text-sm font-mono font-bold">
          Create Backup
        </button>
      </div>
      <TablePlaceholder label="Backup History" columns={['Date', 'Size', 'Status', 'Actions']} />
    </div>
  );
}

function MaintenancePlaceholder() {
  const tools = [
    { label: 'Clear Page Cache', action: 'Clear', status: 'Ready' },
    { label: 'Rebuild Search Index', action: 'Rebuild', status: 'Ready' },
    { label: 'Clear CDN Cache', action: 'Clear', status: 'Ready' },
    { label: 'Process Failed Jobs', action: 'Run', status: '3 failed' },
  ];
  return (
    <div className="space-y-4 max-w-2xl">
      {tools.map((tool) => (
        <div key={tool.label} className="bg-surface border border-border p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-mono text-text font-bold">{tool.label}</p>
            <p className="text-xs font-mono text-text-muted">Status: {tool.status}</p>
          </div>
          <button className="px-3 py-1.5 border border-secondary text-secondary text-xs font-mono font-bold hover:bg-secondary hover:text-black transition-colors">
            {tool.action}
          </button>
        </div>
      ))}
    </div>
  );
}

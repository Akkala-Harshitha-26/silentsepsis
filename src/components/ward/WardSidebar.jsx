import { NavLink } from 'react-router-dom';
import { LayoutGrid, Stethoscope, Bell, BarChart3, ShieldCheck, Search } from 'lucide-react';

const NAV = [
  { to: '/nurse', icon: LayoutGrid, label: 'Ward' },
  { to: '/physician', icon: Stethoscope, label: 'Escalated' },
  { to: '/alerts', icon: Bell, label: 'Alerts' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/admin', icon: ShieldCheck, label: 'System' },
];

export function WardSidebar() {
  return (
    <aside className="w-[200px] shrink-0 border-r border-ink-100 bg-ink-50 flex flex-col h-screen sticky top-0">
      <div className="h-12 flex items-center px-3 gap-2 border-b border-ink-100">
        <div className="h-5 w-5 rounded bg-brand shrink-0" aria-hidden="true" />
        <span className="text-[13px] font-medium text-ink-900">SilentSepsis</span>
      </div>

      <button className="mx-3 mt-3 flex items-center gap-2 h-8 px-2.5 rounded-md border border-ink-200 text-ink-500 text-[12.5px] hover:border-ink-300 transition-colors">
        <Search size={13} aria-hidden="true" />
        Search patients
        <kbd className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-ink-100 text-ink-500 font-mono">⌘K</kbd>
      </button>

      <nav className="mt-4 px-2 space-y-0.5">
        {NAV.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-2.5 h-8 px-2.5 rounded-md text-[13px] transition-colors ${
                isActive ? 'bg-white text-ink-900 shadow-[0_0_0_1px_rgba(0,0,0,0.05)]' : 'text-ink-500 hover:bg-ink-100/70 hover:text-ink-900'
              }`
            }
          >
            <Icon size={15} aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto p-3 border-t border-ink-100 flex items-center gap-2">
        <div className="h-6 w-6 rounded-full bg-brand-light text-brand text-[10px] font-medium flex items-center justify-center">NT</div>
        <div className="min-w-0">
          <p className="text-[12.5px] text-ink-900 truncate">N. Thomas</p>
          <p className="text-[11px] text-ink-500 truncate">Ward 4B, RN</p>
        </div>
      </div>
    </aside>
  );
}

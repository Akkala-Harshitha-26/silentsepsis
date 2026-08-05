import { Moon, Sun } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { Button } from '../ui/button';

const NAV = [
  { to: '/nurse', label: 'Ward view' },
  { to: '/physician', label: 'Escalated' },
  { to: '/alerts', label: 'Alerts' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/admin', label: 'System' },
];

export function TopBar() {
  const darkMode = useAppStore((s) => s.darkMode);
  const toggleDarkMode = useAppStore((s) => s.toggleDarkMode);

  return (
    <div className="flex items-center gap-6 rounded-2xl border border-slate-200 dark:border-space-700/60 bg-white/80 dark:bg-space-800/60 backdrop-blur-md px-5 h-14 shadow-sm dark:shadow-none">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
        <span className="text-xs font-semibold tracking-wider text-slate-500 dark:text-space-400">LIVE</span>
      </div>

      <span className="font-semibold text-slate-900 dark:text-white">SilentSepsis</span>

      <nav className="flex items-center gap-1 flex-1">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-slate-900 text-white dark:bg-space-700 dark:text-white'
                  : 'text-slate-500 dark:text-space-400 hover:bg-slate-100 dark:hover:bg-space-700/50'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <Button variant="ghost" size="icon" onClick={toggleDarkMode} aria-label="Toggle dark mode" className="dark:text-space-300 dark:hover:bg-space-700/60">
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </Button>
    </div>
  );
}

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

export function ClinicalHeader() {
  const darkMode = useAppStore((s) => s.darkMode);
  const toggleDarkMode = useAppStore((s) => s.toggleDarkMode);

  return (
    <header className="border-b border-slate-200/60 dark:border-slate-700/60 bg-white/80 dark:bg-clinical-primary/90 backdrop-blur-sm sticky top-0 z-20">
      <div className="flex h-16 items-center px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mr-8">
          <div className="h-2 w-2 animate-pulse rounded-full bg-clinical-success" aria-hidden="true" />
          <span className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400">LIVE</span>
        </div>

        <span className="font-semibold text-clinical-text dark:text-white mr-8">SilentSepsis</span>

        <nav className="flex items-center gap-1 flex-1">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-clinical-secondary text-white'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Button variant="ghost" size="icon" onClick={toggleDarkMode} aria-label="Toggle dark mode">
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </Button>
      </div>
    </header>
  );
}

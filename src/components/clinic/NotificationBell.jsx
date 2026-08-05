import { useState, useRef, useEffect } from 'react';
import { Bell } from 'lucide-react';

const NOTIFICATIONS = [
  { id: 'n1', text: 'R. Patel crossed risk 88 — respiratory rate sustained rise', time: '2 min ago', tone: 'critical' },
  { id: 'n2', text: 'M. Diallo heart rate sustained above baseline', time: '14 min ago', tone: 'critical' },
  { id: 'n3', text: 'S. Kumar moved to watching tier', time: '40 min ago', tone: 'warning' },
  { id: 'n4', text: 'A. Okafor oxygen dip recovered by morning round', time: '1 hour ago', tone: 'stable' },
];

const DOT = { critical: 'bg-pastel-pink', warning: 'bg-pastel-amber', stable: 'bg-pastel-teal' };

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [readIds, setReadIds] = useState(new Set());
  const ref = useRef(null);

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const unreadCount = NOTIFICATIONS.filter((n) => !readIds.has(n.id)).length;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative h-9 w-9 rounded-full bg-white dark:bg-pastel-cardDark border border-pastel-brandLight dark:border-pastel-borderDark flex items-center justify-center text-pastel-sub dark:text-pastel-subDark hover:text-pastel-ink dark:hover:text-pastel-inkDark transition-colors"
        aria-expanded={open}
        aria-label={`Notifications, ${unreadCount} unread`}
      >
        <Bell size={16} aria-hidden="true" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-pastel-pink text-white text-[9px] font-bold flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white dark:bg-pastel-cardDark border border-pastel-brandLight dark:border-pastel-borderDark shadow-lg overflow-hidden z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b border-pastel-bg dark:border-pastel-borderDark">
            <p className="text-[13px] font-semibold text-pastel-ink dark:text-pastel-inkDark">Notifications</p>
            <button
              onClick={() => setReadIds(new Set(NOTIFICATIONS.map((n) => n.id)))}
              className="text-[11.5px] font-medium text-pastel-brand"
            >
              Mark all read
            </button>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {NOTIFICATIONS.map((n) => (
              <button
                key={n.id}
                onClick={() => setReadIds((prev) => new Set(prev).add(n.id))}
                className={`w-full flex items-start gap-2.5 px-4 py-3 text-left border-b last:border-b-0 border-pastel-bg dark:border-pastel-borderDark transition-colors ${
                  readIds.has(n.id) ? 'opacity-50' : 'hover:bg-pastel-bg/60 dark:hover:bg-white/5'
                }`}
              >
                <span className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${DOT[n.tone]}`} aria-hidden="true" />
                <div className="min-w-0">
                  <p className="text-[12.5px] text-pastel-ink dark:text-pastel-inkDark leading-snug">{n.text}</p>
                  <p className="text-[11px] text-pastel-sub dark:text-pastel-subDark mt-0.5">{n.time}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

import { Search, Grid3x3, MessageSquare, Moon, Sun, Download } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { NotificationBell } from './NotificationBell';
import { downloadWardReport } from '../../lib/downloadReport';
import { commandPatients } from '../../data/commandPatients';

export function ClinicTopbar() {
  const darkMode = useAppStore((s) => s.darkMode);
  const toggleDarkMode = useAppStore((s) => s.toggleDarkMode);

  return (
    <div className="h-16 flex items-center justify-between px-6">
      <div className="flex items-center gap-2 h-9 px-3.5 rounded-full bg-white dark:bg-pastel-cardDark border border-pastel-brandLight dark:border-pastel-borderDark w-72">
        <Search size={15} className="text-pastel-sub dark:text-pastel-subDark" aria-hidden="true" />
        <input
          placeholder="Search patients, rooms…"
          className="flex-1 bg-transparent text-[13px] text-pastel-ink dark:text-pastel-inkDark outline-none placeholder:text-pastel-sub/70 dark:placeholder:text-pastel-subDark/70"
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleDarkMode}
          className="h-9 w-9 rounded-full bg-white dark:bg-pastel-cardDark border border-pastel-brandLight dark:border-pastel-borderDark flex items-center justify-center text-pastel-sub dark:text-pastel-subDark hover:text-pastel-ink dark:hover:text-pastel-inkDark transition-colors"
          aria-pressed={darkMode}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button className="h-9 w-9 rounded-full bg-white dark:bg-pastel-cardDark border border-pastel-brandLight dark:border-pastel-borderDark flex items-center justify-center text-pastel-sub dark:text-pastel-subDark hover:text-pastel-ink dark:hover:text-pastel-inkDark transition-colors">
          <Grid3x3 size={16} aria-hidden="true" />
        </button>
        <button className="h-9 w-9 rounded-full bg-white dark:bg-pastel-cardDark border border-pastel-brandLight dark:border-pastel-borderDark flex items-center justify-center text-pastel-sub dark:text-pastel-subDark hover:text-pastel-ink dark:hover:text-pastel-inkDark transition-colors">
          <MessageSquare size={16} aria-hidden="true" />
        </button>
        <button
          onClick={() => downloadWardReport(commandPatients)}
          className="h-9 w-9 rounded-full bg-white dark:bg-pastel-cardDark border border-pastel-brandLight dark:border-pastel-borderDark flex items-center justify-center text-pastel-sub dark:text-pastel-subDark hover:text-pastel-ink dark:hover:text-pastel-inkDark transition-colors"
          aria-label="Download ward report"
          title="Download ward report"
        >
          <Download size={16} aria-hidden="true" />
        </button>
        <NotificationBell />
        <div className="flex items-center gap-2.5 pl-2">
          <div className="h-9 w-9 rounded-full bg-pastel-amberLight dark:bg-pastel-amberLightDark text-pastel-amber flex items-center justify-center text-[12px] font-semibold">NT</div>
          <div>
            <p className="text-[13px] font-medium text-pastel-ink dark:text-pastel-inkDark leading-tight">N. Thomas</p>
            <p className="text-[11px] text-pastel-sub dark:text-pastel-subDark leading-tight">Ward nurse</p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Moon, Sun } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export function LiveIndicator() {
  const nightMode = useAppStore((s) => s.nightMode);
  const toggleNightMode = useAppStore((s) => s.toggleNightMode);
  const accent = nightMode ? '#FF9100' : '#00F0FF';

  return (
    <div className="flex items-center justify-between px-6 h-16 border-b border-white/5">
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold tracking-wide text-command-text">SilentSepsis</span>
        <span className="text-[10px] text-white/30" aria-hidden="true">|</span>
        <span className="text-[10px] font-medium tracking-widest text-white/40 uppercase">Command view</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2" role="status" aria-label="Live data feed active">
          <div className="flex items-end gap-[2px] h-3" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="w-[2.5px] rounded-full animate-wave"
                style={{ height: '100%', background: accent, animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
          <span className="text-[11px] font-semibold tracking-wider text-white/50">LIVE</span>
        </div>

        <button
          onClick={toggleNightMode}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white/60 hover:bg-white/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ outlineColor: accent }}
          aria-pressed={nightMode}
        >
          {nightMode ? <Sun size={14} /> : <Moon size={14} />}
          Night mode
        </button>
      </div>
    </div>
  );
}

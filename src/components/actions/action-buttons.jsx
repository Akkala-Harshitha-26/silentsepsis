import { Check, X, ArrowUpRight } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export function ActionButtons({ patient }) {
  const acknowledge = useAppStore((s) => s.acknowledge);
  const dismiss = useAppStore((s) => s.dismiss);

  return (
    <div className="flex gap-2">
      <button
        onClick={() => acknowledge(patient.id)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
      >
        <Check size={14} aria-hidden="true" /> Confirm
      </button>
      <button
        onClick={() => dismiss(patient.id)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border border-slate-300 dark:border-space-600 text-slate-600 dark:text-space-300 hover:bg-slate-100 dark:hover:bg-space-700/50 transition-colors"
      >
        <X size={14} aria-hidden="true" /> Dismiss
      </button>
      <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-slate-900 dark:bg-cyan-500 text-white hover:opacity-90 transition-opacity">
        <ArrowUpRight size={14} aria-hidden="true" /> Escalate
      </button>
    </div>
  );
}

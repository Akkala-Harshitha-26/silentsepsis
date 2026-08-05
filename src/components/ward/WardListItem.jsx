const STATUS_DOT = { critical: 'bg-status-critical', warning: 'bg-status-warning', stable: 'bg-status-stable' };
const STATUS_TEXT = { critical: 'text-status-critical', warning: 'text-status-warning', stable: 'text-ink-500' };
const STATUS_LABEL = { critical: 'Critical', warning: 'Warning', stable: 'Stable' };

export function WardListItem({ patient, selected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(patient.id)}
      className={`w-full flex items-center gap-3 h-11 px-3 text-left border-b border-ink-100 transition-colors ${
        selected ? 'bg-brand-light' : 'hover:bg-ink-50'
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${STATUS_DOT[patient.status]}`} aria-hidden="true" />

      <span className="text-[13px] font-medium text-ink-900 w-32 truncate">{patient.name}</span>
      <span className="text-[12px] text-ink-500 w-16 shrink-0">{patient.room}</span>

      <span className={`text-[12px] font-medium w-16 shrink-0 ${STATUS_TEXT[patient.status]}`}>{STATUS_LABEL[patient.status]}</span>

      <span className="text-[12px] text-ink-500 flex-1 truncate hidden md:block">{patient.explanation}</span>

      <span className="text-[12.5px] font-mono font-medium text-ink-900 w-8 text-right shrink-0">{patient.risk}</span>
    </button>
  );
}

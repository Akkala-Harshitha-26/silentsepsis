import { Check, ArrowUpRight, MessageSquare, FileText } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export function ActionBar({ patient }) {
  const acknowledge = useAppStore((s) => s.acknowledge);
  const nightMode = useAppStore((s) => s.nightMode);
  const accent = nightMode ? '#FF9100' : '#00F0FF';

  const actions = [
    { key: 'ack', label: 'Acknowledge', icon: Check, primary: true },
    { key: 'escalate', label: 'Escalate', icon: ArrowUpRight },
    { key: 'message', label: 'Message', icon: MessageSquare },
    { key: 'notes', label: 'Notes', icon: FileText },
  ];

  return (
    <div className="grid grid-cols-2 gap-2.5 pt-4 mt-4 border-t border-white/5">
      {actions.map(({ key, label, icon: Icon, primary }) => (
        <button
          key={key}
          onClick={() => key === 'ack' && acknowledge(patient.id)}
          className={`flex items-center justify-center gap-2 h-12 rounded-xl text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 ${
            primary ? 'text-command-bg' : 'text-command-text border border-white/10 hover:bg-white/5'
          }`}
          style={primary ? { background: accent, outlineColor: accent } : { outlineColor: accent }}
        >
          <Icon size={16} aria-hidden="true" />
          {label}
        </button>
      ))}
    </div>
  );
}

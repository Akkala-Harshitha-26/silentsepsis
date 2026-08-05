import { motion } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';

const STATUS_META = {
  critical: { color: '#FF1744', label: 'Critical', pattern: '●●●' },
  warning: { color: '#FF9100', label: 'Warning', pattern: '▲▲' },
  stable: { color: '#00E676', label: 'Stable', pattern: '—' },
};

function PulseLine({ risk, color }) {
  // A stylized "pulse line" — height of the spike scales with risk, so the
  // shape itself communicates severity even without reading the color.
  const spike = 4 + (risk / 100) * 16;
  return (
    <svg width="72" height="24" viewBox="0 0 72 24" role="img" aria-label={`Risk pulse, ${risk} out of 100`}>
      <polyline
        points={`0,12 20,12 26,${12 - spike} 32,${12 + spike * 0.6} 38,12 72,12`}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MicroChart({ values, color }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const pts = values
    .map((v, i) => `${(i / (values.length - 1)) * 40},${16 - ((v - min) / range) * 14}`)
    .join(' ');
  return (
    <svg width="40" height="16" viewBox="0 0 40 16" aria-hidden="true">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
    </svg>
  );
}

export function PatientCard({ patient, selected, onSelect }) {
  const nightMode = useAppStore((s) => s.nightMode);
  const meta = STATUS_META[patient.status];
  const accent = nightMode && patient.status !== 'critical' ? '#FF9100' : meta.color;
  const hrSeries = patient.vitals.map((v) => v.hr);
  const rrSeries = patient.vitals.map((v) => v.rr);

  return (
    <motion.button
      onClick={() => onSelect(patient.id)}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.3 }}
      aria-pressed={selected}
      className={`w-full text-left rounded-xl p-4 border transition-colors ${
        selected ? 'border-white/20 bg-white/[0.06]' : 'border-white/5 bg-command-primary/40 hover:bg-white/[0.04]'
      } ${patient.status === 'critical' ? 'animate-breathe' : ''}`}
      style={{ backdropFilter: 'blur(6px)' }}
    >
      <div className="flex items-start justify-between mb-2.5">
        <div>
          <p className="text-sm font-semibold text-command-text">{patient.name}</p>
          <p className="text-[11px] text-white/40">Room {patient.room} · {patient.age}y</p>
        </div>
        <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide" style={{ color: accent }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent, animation: patient.status === 'critical' ? 'wave 1s ease-in-out infinite' : undefined }} aria-hidden="true" />
          {meta.label}
        </span>
      </div>

      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[10px] text-white/40 uppercase tracking-wide">Risk trend</span>
        <PulseLine risk={patient.risk} color={accent} />
      </div>

      <div className="grid grid-cols-3 gap-2 pt-2.5 border-t border-white/5">
        <div>
          <p className="text-[9px] text-white/35 mb-0.5">HR</p>
          <div className="flex items-center gap-1">
            <span className="text-xs font-medium text-command-text">{hrSeries[hrSeries.length - 1]}</span>
            <MicroChart values={hrSeries} color={accent} />
          </div>
        </div>
        <div>
          <p className="text-[9px] text-white/35 mb-0.5">RR</p>
          <div className="flex items-center gap-1">
            <span className="text-xs font-medium text-command-text">{rrSeries[rrSeries.length - 1]}</span>
            <MicroChart values={rrSeries} color={accent} />
          </div>
        </div>
        <div>
          <p className="text-[9px] text-white/35 mb-0.5">Risk</p>
          <span className="text-xs font-semibold" style={{ color: accent }}>{patient.risk}</span>
        </div>
      </div>
    </motion.button>
  );
}

import { motion } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';

function CertaintyGauge({ value, accent }) {
  const circumference = 2 * Math.PI * 26;
  const offset = circumference * (1 - value / 100);
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" role="img" aria-label={`Certainty ${value} percent`}>
      <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
      <circle
        cx="32" cy="32" r="26" fill="none" stroke={accent} strokeWidth="5" strokeLinecap="round"
        strokeDasharray={circumference} strokeDashoffset={offset}
        transform="rotate(-90 32 32)"
        style={{ transition: 'stroke-dashoffset 0.9s cubic-bezier(0.16,1,0.3,1)' }}
      />
      <text x="32" y="37" fontSize="14" fontWeight="700" textAnchor="middle" fill="#E8EDF5">{value}%</text>
    </svg>
  );
}

export function ConfidenceMeter({ patient }) {
  const nightMode = useAppStore((s) => s.nightMode);
  const accent = nightMode ? '#FF9100' : '#00F0FF';

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-white/40">AI confidence</h3>
        <CertaintyGauge value={patient.certainty} accent={accent} />
      </div>

      {patient.features.length === 0 ? (
        <p className="text-xs text-white/40">No significant feature contributions.</p>
      ) : (
        <div className="space-y-2.5 mb-3">
          {patient.features.map((f, i) => (
            <div key={f.name}>
              <div className="flex justify-between text-[11px] text-white/50 mb-1">
                <span>{f.name}</span>
                <span className="font-medium text-command-text">{f.contribution}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${f.contribution}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-white/50 leading-relaxed border-t border-white/5 pt-3">{patient.explanation}</p>
    </div>
  );
}

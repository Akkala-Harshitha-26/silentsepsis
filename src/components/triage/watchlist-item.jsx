import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { AvatarRiskRing } from '../ui/avatar-risk-ring';

export function WatchlistItem({ patient, selected }) {
  const isHighRisk = patient.risk > 70;
  const riskColorClass =
    isHighRisk ? 'text-rose-600 dark:text-clinical-rose'
    : patient.risk > 40 ? 'text-amber-600 dark:text-amber-400'
    : 'text-emerald-600 dark:text-emerald-400';

  return (
    <motion.div
      className={`
        relative p-4 rounded-xl transition-all duration-300 border
        ${selected
          ? 'bg-slate-100 dark:bg-space-700/60 border-slate-300 dark:border-cyan-400/20 shadow-sm dark:shadow-glow-cyan'
          : 'bg-white dark:bg-space-800/40 border-slate-200 dark:border-transparent hover:bg-slate-50 dark:hover:bg-space-700/30'}
      `}
      whileHover={{ x: 4 }}
    >
      {isHighRisk && (
        <div className="absolute inset-0 rounded-xl bg-rose-500/[0.04] dark:bg-clinical-rose/5 pointer-events-none" aria-hidden="true" />
      )}

      <div className="relative flex items-center gap-4">
        <div className="relative shrink-0">
          <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-space-600 flex items-center justify-center">
            <span className="text-sm font-medium text-slate-600 dark:text-space-200">{patient.initials}</span>
          </div>
          <AvatarRiskRing score={patient.risk} size={44} thickness={3} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-slate-900 dark:text-white truncate">{patient.name}</span>
            <span className="text-xs text-slate-400 dark:text-space-400">{patient.bed}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-space-400">
            <span>{patient.ward}</span>
            <span aria-hidden="true">·</span>
            <span>Last vitals {patient.lastVitals}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className={`text-sm font-semibold ${riskColorClass}`}>{patient.risk}</span>
          {patient.trend === 'up' ? (
            <ArrowUp size={13} className="text-rose-600 dark:text-clinical-rose" aria-label="Trending up" />
          ) : (
            <ArrowDown size={13} className="text-emerald-600 dark:text-emerald-400" aria-label="Trending down" />
          )}
        </div>
      </div>

      <div className="relative mt-2 text-xs text-slate-500 dark:text-space-300 line-clamp-1">
        {patient.explanation}
      </div>
    </motion.div>
  );
}

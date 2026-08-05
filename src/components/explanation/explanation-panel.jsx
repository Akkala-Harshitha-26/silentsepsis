import { motion } from 'framer-motion';
import { AlertTriangle, Activity, CheckCircle2 } from 'lucide-react';

const RISK_COPY = {
  high: {
    icon: AlertTriangle,
    text: 'This combination of trends has been associated with deterioration in prior cases.',
    className: 'text-rose-600 dark:text-clinical-rose',
  },
  medium: {
    icon: Activity,
    text: 'Early pattern detected. Continue monitoring closely.',
    className: 'text-amber-600 dark:text-amber-400',
  },
  low: {
    icon: CheckCircle2,
    text: 'All vitals within personal baseline range.',
    className: 'text-emerald-600 dark:text-emerald-400',
  },
};

export function ExplanationPanel({ features, riskLevel }) {
  const copy = RISK_COPY[riskLevel] || RISK_COPY.low;
  const Icon = copy.icon;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-slate-400 dark:text-space-400 uppercase tracking-wider">
          Why the model flagged this patient
        </span>
        <div className="flex-1 h-px bg-slate-200 dark:bg-space-700" />
      </div>

      <div className="space-y-2">
        {features.map((feature, index) => (
          <motion.div
            key={feature.name}
            className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-space-900/50"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="w-32 text-sm text-slate-600 dark:text-space-300 shrink-0">{feature.name}</div>
            <div className="flex-1 h-1.5 bg-slate-200 dark:bg-space-700 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${
                  feature.contribution > 60
                    ? 'bg-gradient-to-r from-rose-500 to-rose-700'
                    : feature.contribution > 30
                    ? 'bg-amber-400'
                    : 'bg-emerald-400'
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${feature.contribution}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
              />
            </div>
            <span className="text-sm font-medium text-slate-900 dark:text-white w-10 text-right">{feature.contribution}%</span>
          </motion.div>
        ))}
      </div>

      <div className={`mt-2 flex items-start gap-2 text-sm leading-relaxed ${copy.className}`}>
        <Icon size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
        <span>{copy.text}</span>
      </div>
    </div>
  );
}

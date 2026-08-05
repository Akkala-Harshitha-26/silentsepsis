import { motion } from 'framer-motion';
import { PulseIndicator } from '../ui/pulse-indicator';

export function AlertBanner({ count }) {
  if (count === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 rounded-xl bg-clinical-critical/8 dark:bg-clinical-critical/15 border border-clinical-critical/25 px-4 py-3 mb-5"
    >
      <PulseIndicator level="high" />
      <div>
        <p className="text-sm font-semibold text-clinical-critical">Attention required</p>
        <p className="text-xs text-slate-600 dark:text-slate-300">
          {count} {count === 1 ? 'patient has' : 'patients have'} a risk trend above 70%
        </p>
      </div>
    </motion.div>
  );
}

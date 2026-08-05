import { motion, AnimatePresence } from 'framer-motion';
import { WatchlistItem } from './watchlist-item';

export function Watchlist({ patients, selectedId, onSelect }) {
  const highRiskCount = patients.filter((p) => p.risk > 70).length;

  return (
    <motion.div
      className="w-[35%] min-w-[320px] flex flex-col gap-3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between px-1">
        <h2 className="text-sm font-medium text-slate-500 dark:text-space-300 tracking-wider uppercase">Watchlist</h2>
        <span className="text-xs text-slate-400 dark:text-space-400">{highRiskCount} high risk</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
        <AnimatePresence>
          {patients.map((patient, index) => (
            <motion.div
              key={patient.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onSelect(patient)}
              className={`cursor-pointer transition-transform duration-300 ${
                selectedId === patient.id ? 'scale-[1.02]' : 'hover:scale-[1.01]'
              }`}
            >
              <WatchlistItem patient={patient} selected={selectedId === patient.id} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

import { motion } from 'framer-motion';

// This subtle animation tells the nurse "pay attention" without alarm.
// Only 'high' actually animates — low/medium stay static so the eye is
// drawn to what matters, not everything at once.
export function PulseIndicator({ level = 'low' }) {
  const colors = {
    low: 'bg-clinical-success',
    medium: 'bg-clinical-warning',
    high: 'bg-clinical-critical',
  };

  return (
    <motion.div
      animate={{
        scale: level === 'high' ? [1, 1.4, 1] : 1,
        opacity: level === 'high' ? [0.8, 1, 0.8] : 0.8,
      }}
      transition={{
        duration: level === 'high' ? 1.5 : 0,
        repeat: level === 'high' ? Infinity : 0,
      }}
      className={`h-3 w-3 rounded-full ${colors[level]}`}
      aria-hidden="true"
    />
  );
}

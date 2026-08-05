import { motion } from 'framer-motion';
import CountUp from './CountUp';

export default function RadialGauge({ value, label, tone = 'watch' }) {
  const color = { stable: 'var(--trace-stable)', watch: 'var(--trace-watch)', critical: 'var(--trace-critical)' }[tone];
  const circumference = Math.PI * 60;
  const offset = circumference * (1 - value / 100);

  return (
    <svg width="100%" viewBox="0 0 160 100" role="img" aria-label={`${label}, ${value} percent`}>
      <path d="M20,80 A60,60 0 0,1 140,80" fill="none" stroke="var(--line)" strokeWidth="9" />
      <motion.path
        d="M20,80 A60,60 0 0,1 140,80"
        fill="none"
        stroke={color}
        strokeWidth="9"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      />
      <text x="80" y="66" fontSize="22" fontWeight="600" textAnchor="middle" fill="var(--text-primary)" fontFamily="var(--font-mono)">
        <CountUp value={value} suffix="%" />
      </text>
      <text x="80" y="88" fontSize="10" textAnchor="middle" fill="var(--text-secondary)">
        {label}
      </text>
    </svg>
  );
}

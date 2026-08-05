import { motion } from 'framer-motion';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { RiskGradientRing } from '../ui/risk-ring';
import { TrendSparkline } from '../ui/trend-sparkline';
import { PulseIndicator } from '../ui/pulse-indicator';
import { useAppStore } from '../../store/useAppStore';

const TIER_META = {
  critical: { badge: 'critical', label: 'High risk', pulse: 'high', ring: '#E17055' },
  watch: { badge: 'warning', label: 'Watching', pulse: 'medium', ring: '#FDCB6E' },
  stable: { badge: 'success', label: 'Stable', pulse: 'low', ring: '#00B894' },
};

export function PatientTrendCard({ patient, index = 0, onReview }) {
  const meta = TIER_META[patient.tier];
  const acknowledge = useAppStore((s) => s.acknowledge);
  const dismiss = useAppStore((s) => s.dismiss);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card className={patient.tier === 'critical' ? 'ring-1 ring-clinical-critical/30' : ''}>
        <CardContent className="pt-4">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <PulseIndicator level={meta.pulse} />
              <div>
                <p className="font-semibold text-sm text-clinical-text dark:text-slate-100">{patient.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{patient.bed} · {patient.ward}</p>
              </div>
            </div>
            <RiskGradientRing value={patient.risk} size={52} strokeWidth={5} />
          </div>

          <div className="flex items-center justify-between mb-3">
            <Badge variant={meta.badge}>{meta.label}</Badge>
            <TrendSparkline points={patient.trend} color={meta.ring} />
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug mb-1 line-clamp-2">{patient.reason}</p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-3">Last vitals {patient.lastVitals}</p>

          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="flex-1" onClick={() => onReview?.(patient)}>
              Review
            </Button>
            {patient.tier !== 'stable' && (
              <>
                <Button size="sm" variant="success" onClick={() => acknowledge(patient.id)} aria-label={`Acknowledge alert for ${patient.name}`}>
                  Ack
                </Button>
                <Button size="sm" variant="ghost" onClick={() => dismiss(patient.id)} aria-label={`Dismiss alert for ${patient.name}`}>
                  Dismiss
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

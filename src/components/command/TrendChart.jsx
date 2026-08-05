import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, ReferenceDot } from 'recharts';
import { Clock } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export function TrendChart({ patient }) {
  const nightMode = useAppStore((s) => s.nightMode);
  const accent = nightMode ? '#FF9100' : '#00F0FF';
  const annotationIndex = patient.annotation
    ? patient.vitals.findIndex((v) => v.time === patient.annotation.time)
    : -1;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-white/40">Respiratory rate, trend story</h3>
        {patient.timeToIntervention && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-command-danger/10 text-command-danger text-xs font-medium">
            <Clock size={12} aria-hidden="true" />
            Time to intervention: {patient.timeToIntervention}
          </div>
        )}
      </div>

      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={patient.vitals}>
            <defs>
              <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={accent} stopOpacity={0.35} />
                <stop offset="100%" stopColor={accent} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis dataKey="time" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={{ stroke: 'rgba(255,255,255,0.1)' }} tickLine={false} />
            <YAxis tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: '#131A2B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12, color: '#E8EDF5' }} />
            {/* baseline zone */}
            <ReferenceLine y={patient.baseline.rr} stroke="rgba(255,255,255,0.25)" strokeDasharray="4 4" label={{ value: 'Baseline', fill: 'rgba(255,255,255,0.4)', fontSize: 10, position: 'insideTopLeft' }} />
            <Area type="monotone" dataKey="rr" stroke={accent} strokeWidth={2.5} fill="url(#trendFill)" isAnimationActive animationDuration={900} />
            {annotationIndex >= 0 && (
              <ReferenceDot
                x={patient.vitals[annotationIndex].time}
                y={patient.vitals[annotationIndex].rr}
                r={5}
                fill={accent}
                stroke="#0A0E17"
                strokeWidth={2}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {patient.annotation && (
        <p className="mt-2 text-[11px] text-white/40">
          <span style={{ color: accent }} className="font-medium">● </span>
          {patient.annotation.label} at {patient.annotation.time}
        </p>
      )}
    </div>
  );
}

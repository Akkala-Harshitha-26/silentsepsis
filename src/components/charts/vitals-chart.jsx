import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useAppStore } from '../../store/useAppStore';

export function VitalsChart({ data, baseline }) {
  const darkMode = useAppStore((s) => s.darkMode);
  const gridColor = darkMode ? '#1C2438' : '#E2E8F0';
  const axisColor = darkMode ? '#8A93AC' : '#94A3B8';
  const tooltipBg = darkMode ? '#131A2B' : '#FFFFFF';
  const tooltipBorder = darkMode ? '#2A3450' : '#E2E8F0';

  return (
    <div className="h-full w-full min-h-[220px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke={gridColor} strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="time" tick={{ fill: axisColor, fontSize: 11 }} axisLine={{ stroke: gridColor }} tickLine={false} />
          <YAxis tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ background: tooltipBg, border: `1px solid ${tooltipBorder}`, borderRadius: 8, fontSize: 12 }} />
          {baseline?.hr && <ReferenceLine y={baseline.hr} stroke="#E11D48" strokeDasharray="4 4" strokeOpacity={0.4} />}
          <Line type="monotone" dataKey="hr" stroke="#E11D48" strokeWidth={2} dot={false} name="Heart rate" />
          <Line type="monotone" dataKey="rr" stroke="#F59E0B" strokeWidth={2} dot={false} name="Respiratory rate" />
          <Line type="monotone" dataKey="spo2" stroke="#06B6D4" strokeWidth={2} dot={false} name="SpO2" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

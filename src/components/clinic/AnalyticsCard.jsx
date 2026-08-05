import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAppStore } from '../../store/useAppStore';

const data = [
  { month: 'Jan', alerts: 18 }, { month: 'Feb', alerts: 22 }, { month: 'Mar', alerts: 15 },
  { month: 'Apr', alerts: 28 }, { month: 'May', alerts: 20 }, { month: 'Jun', alerts: 24 },
];

export function AnalyticsCard() {
  const darkMode = useAppStore((s) => s.darkMode);
  const gridColor = darkMode ? '#283335' : '#F3F5F4';
  const axisColor = darkMode ? '#9C97B8' : '#8B87A3';

  return (
    <div className="rounded-2xl bg-white dark:bg-pastel-cardDark p-5 shadow-[0_1px_2px_rgba(30,27,57,0.04),0_8px_20px_rgba(30,27,57,0.05)] dark:shadow-none dark:border dark:border-pastel-borderDark">
      <p className="text-[14px] font-semibold text-pastel-ink dark:text-pastel-inkDark mb-3">Alerts generated, by month</p>
      <div className="h-[160px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="tealFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#20C5A0" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#20C5A0" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={gridColor} vertical={false} />
            <XAxis dataKey="month" tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: `1px solid ${gridColor}`, background: darkMode ? '#1B2426' : '#fff', color: darkMode ? '#E9EEEE' : '#1B2426' }} />
            <Area type="monotone" dataKey="alerts" stroke="#20C5A0" strokeWidth={2.5} fill="url(#tealFill)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

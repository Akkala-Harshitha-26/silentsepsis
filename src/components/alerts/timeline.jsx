const TIMELINE = [
  { patient: 'R. Patel', event: 'Risk crossed 80% threshold', time: '18 min ago', tone: 'critical' },
  { patient: 'M. Diallo', event: 'Heart rate sustained rise flagged', time: '9 min ago', tone: 'critical' },
  { patient: 'S. Kumar', event: 'Moved to watch tier', time: '40 min ago', tone: 'warning' },
  { patient: 'A. Okafor', event: 'Oxygen saturation dip, recovered', time: '2 hours ago', tone: 'success' },
];

const DOT = {
  critical: 'bg-clinical-critical',
  warning: 'bg-clinical-warning',
  success: 'bg-clinical-success',
};

export function AlertsTimeline() {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0F2038] p-4">
      <h3 className="text-sm font-medium text-clinical-secondary dark:text-slate-200 mb-3">Recent alerts</h3>
      <div className="space-y-3">
        {TIMELINE.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${DOT[item.tone]}`} aria-hidden="true" />
            <div className="flex-1 flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-clinical-text dark:text-slate-200">{item.patient}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400"> — {item.event}</span>
              </div>
              <span className="text-[11px] text-slate-400 dark:text-slate-500 shrink-0 ml-3">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FeatureContribution({ features }) {
  if (!features || features.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0F2038] p-4">
        <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">No significant feature contributions</h4>
      </div>
    );
  }

  const sorted = [...features].sort((a, b) => b.weight - a.weight);

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0F2038] p-4">
      <h4 className="text-sm font-medium text-clinical-secondary dark:text-slate-200">Why this patient is at risk</h4>
      <div className="mt-3 space-y-2.5">
        {sorted.map((feature) => (
          <div key={feature.name} className="flex items-center gap-3">
            <div className="w-36 text-xs text-slate-600 dark:text-slate-300 shrink-0">{feature.name}</div>
            <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-risk"
                style={{ width: `${Math.round(feature.weight * 100)}%` }}
              />
            </div>
            <span className="text-xs font-medium text-clinical-text dark:text-slate-200 w-9 text-right">
              {Math.round(feature.weight * 100)}%
            </span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[11px] text-slate-400 dark:text-slate-500">
        {sorted[0].name} shows the strongest deviation from baseline.
      </p>
    </div>
  );
}

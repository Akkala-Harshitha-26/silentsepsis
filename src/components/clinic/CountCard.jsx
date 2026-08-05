export function CountCard({ label, value, delta, color, bg, darkBg }) {
  return (
    <div className="rounded-2xl bg-white dark:bg-pastel-cardDark p-5 shadow-[0_1px_2px_rgba(30,27,57,0.04),0_8px_20px_rgba(30,27,57,0.05)] dark:shadow-none dark:border dark:border-pastel-borderDark flex-1">
      <p className="text-[13px] font-medium text-pastel-sub dark:text-pastel-subDark mb-2">{label}</p>
      <div className="flex items-end justify-between">
        <span className="text-[28px] font-bold text-pastel-ink dark:text-pastel-inkDark leading-none">{value}</span>
        {delta && (
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ color, background: bg }}>
            {delta}
          </span>
        )}
      </div>
    </div>
  );
}

const rounds = [
  { time: '10:00', name: 'R. Patel', tag: 'Escalation review', color: 'text-pastel-pink bg-pastel-pinkLight dark:bg-pastel-pinkLightDark' },
  { time: '10:20', name: 'M. Diallo', tag: 'Physician round', color: 'text-pastel-pink bg-pastel-pinkLight dark:bg-pastel-pinkLightDark' },
  { time: '11:00', name: 'S. Kumar', tag: 'Vitals recheck', color: 'text-pastel-amber bg-pastel-amberLight dark:bg-pastel-amberLightDark' },
  { time: '11:30', name: 'A. Okafor', tag: 'Routine check', color: 'text-pastel-teal bg-pastel-tealLight dark:bg-pastel-tealLightDark' },
];

const days = ['Sun', 'Mon', 'Tue', 'Wed'];

export function UpcomingRoundsCard() {
  return (
    <div className="rounded-2xl bg-white dark:bg-pastel-cardDark p-5 shadow-[0_1px_2px_rgba(30,27,57,0.04),0_8px_20px_rgba(30,27,57,0.05)] dark:shadow-none dark:border dark:border-pastel-borderDark h-full">
      <p className="text-[14px] font-semibold text-pastel-ink dark:text-pastel-inkDark mb-3">Upcoming rounds</p>
      <div className="flex gap-1.5 mb-4">
        {days.map((d, i) => (
          <div key={d} className={`flex-1 text-center rounded-xl py-2 ${i === 1 ? 'bg-pastel-brand text-white' : 'bg-pastel-bg dark:bg-white/5 text-pastel-sub dark:text-pastel-subDark'}`}>
            <p className="text-[10px] font-medium">{d}</p>
            <p className="text-[13px] font-semibold">{22 + i}</p>
          </div>
        ))}
      </div>
      <div className="space-y-3">
        {rounds.map((r) => (
          <div key={r.name} className="flex items-center gap-3">
            <span className="text-[11.5px] font-mono text-pastel-sub dark:text-pastel-subDark w-10 shrink-0">{r.time}</span>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium text-pastel-ink dark:text-pastel-inkDark truncate">{r.name}</p>
              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${r.color}`}>{r.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

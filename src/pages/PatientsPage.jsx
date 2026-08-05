import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { ClinicSidebar } from '../components/clinic/ClinicSidebar';
import { ClinicTopbar } from '../components/clinic/ClinicTopbar';
import { commandPatients } from '../data/commandPatients';

const STATUS_CHIP = {
  critical: 'bg-pastel-pinkLight dark:bg-pastel-pinkLightDark text-pastel-pink',
  warning: 'bg-pastel-amberLight dark:bg-pastel-amberLightDark text-pastel-amber',
  stable: 'bg-pastel-tealLight dark:bg-pastel-tealLightDark text-pastel-teal',
};
const STATUS_LABEL = { critical: 'Critical', warning: 'Watching', stable: 'Stable' };
const AVATAR_BG = [
  'bg-pastel-brandLight dark:bg-pastel-brandLightDark text-pastel-brand',
  'bg-pastel-amberLight dark:bg-pastel-amberLightDark text-pastel-amber',
  'bg-pastel-tealLight dark:bg-pastel-tealLightDark text-pastel-teal',
  'bg-pastel-pinkLight dark:bg-pastel-pinkLightDark text-pastel-pink',
];

export default function PatientsPage() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const filtered = commandPatients
    .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.room.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => b.risk - a.risk);

  return (
    <div className="min-h-screen bg-pastel-bg dark:bg-pastel-bgDark flex transition-colors">
      <ClinicSidebar />
      <div className="flex-1 min-w-0">
        <ClinicTopbar />
        <main className="px-6 pb-8 max-w-[1000px]">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-[19px] font-semibold text-pastel-ink dark:text-pastel-inkDark">All patients</h1>
            <div className="flex items-center gap-2 h-9 px-3.5 rounded-full bg-white dark:bg-pastel-cardDark border border-pastel-brandLight dark:border-pastel-borderDark w-64">
              <Search size={14} className="text-pastel-sub dark:text-pastel-subDark" aria-hidden="true" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter by name or room…"
                className="flex-1 bg-transparent text-[13px] text-pastel-ink dark:text-pastel-inkDark outline-none placeholder:text-pastel-sub/70"
              />
            </div>
          </div>

          <div className="rounded-2xl bg-white dark:bg-pastel-cardDark shadow-[0_1px_2px_rgba(27,36,38,0.04),0_8px_20px_rgba(27,36,38,0.05)] dark:shadow-none dark:border dark:border-pastel-borderDark overflow-hidden">
            {filtered.length === 0 && (
              <p className="p-5 text-[13px] text-pastel-sub dark:text-pastel-subDark">No patients match "{query}".</p>
            )}
            {filtered.map((p, i) => (
              <button
                key={p.id}
                onClick={() => navigate('/nurse')}
                className="w-full flex items-center gap-3 p-3.5 border-b last:border-b-0 border-pastel-bg dark:border-pastel-borderDark hover:bg-pastel-bg/60 dark:hover:bg-white/5 transition-colors text-left"
              >
                <div className={`h-10 w-10 rounded-full flex items-center justify-center text-[12px] font-semibold shrink-0 ${AVATAR_BG[i % 4]}`}>
                  {p.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13.5px] font-medium text-pastel-ink dark:text-pastel-inkDark">{p.name}</p>
                  <p className="text-[12px] text-pastel-sub dark:text-pastel-subDark">{p.room} · {p.age}y · {p.explanation}</p>
                </div>
                <span className="text-[13px] font-mono font-medium text-pastel-ink dark:text-pastel-inkDark w-8 text-right">{p.risk}</span>
                <span className={`text-[10.5px] font-semibold px-2 py-1 rounded-full shrink-0 ${STATUS_CHIP[p.status]}`}>
                  {STATUS_LABEL[p.status]}
                </span>
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

import { ClinicSidebar } from '../components/clinic/ClinicSidebar';
import { ClinicTopbar } from '../components/clinic/ClinicTopbar';
import { RingStatCard } from '../components/clinic/RingStatCard';
import { CountCard } from '../components/clinic/CountCard';
import { PatientTodayList } from '../components/clinic/PatientTodayList';
import { UpcomingRoundsCard } from '../components/clinic/UpcomingRoundsCard';
import { AnalyticsCard } from '../components/clinic/AnalyticsCard';
import { WardCompositionCard } from '../components/clinic/WardCompositionCard';
import { ChatWidget } from '../components/clinic/ChatWidget';
import { PatientDetailDrawer } from '../components/clinic/PatientDetailDrawer';
import { commandPatients } from '../data/commandPatients';
import { useState } from 'react';

export default function ClinicDashboard() {
  const [selectedId, setSelectedId] = useState(null);
  const sorted = [...commandPatients].sort((a, b) => b.risk - a.risk);
  const selectedPatient = sorted.find((p) => p.id === selectedId);

  const counts = {
    Critical: sorted.filter((p) => p.status === 'critical').length,
    Warning: sorted.filter((p) => p.status === 'warning').length,
    Stable: sorted.filter((p) => p.status === 'stable').length,
  };

  return (
    <div className="min-h-screen bg-pastel-bg dark:bg-pastel-bgDark flex transition-colors">
      <ClinicSidebar />

      <div className="flex-1 min-w-0">
        <ClinicTopbar />

        <main className="px-6 pb-8 max-w-[1400px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <RingStatCard
              title="Total patients monitored"
              total={sorted.length}
              segments={[
                { label: 'Critical', value: counts.Critical, color: '#FF6B9D' },
                { label: 'Warning', value: counts.Warning, color: '#FDB022' },
                { label: 'Stable', value: counts.Stable, color: '#20C5A0' },
              ]}
            />
            <CountCard label="Active alerts" value={counts.Critical} delta="+2 today" color="#FF6B9D" bg="#FFE7EF" />
            <CountCard label="Avg confirm time" value="4m" delta="-1m" color="#20C5A0" bg="#E1F8F2" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4 mb-4">
            <PatientTodayList patients={sorted} onSelect={setSelectedId} selectedId={selectedId} />
            <UpcomingRoundsCard />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4">
            <AnalyticsCard />
            <WardCompositionCard counts={counts} />
          </div>
        </main>
      </div>

      {selectedPatient && <PatientDetailDrawer patient={selectedPatient} onClose={() => setSelectedId(null)} />}
      <ChatWidget />
    </div>
  );
}

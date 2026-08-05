import { useState, useEffect } from 'react';
import { PatientTrendCard } from '../components/patients/trend-card';
import { AlertBanner } from '../components/alerts/banner';
import { AlertsTimeline } from '../components/alerts/timeline';
import { FeatureContribution } from '../components/explainability/feature-contribution';
import { ClinicalHeader } from '../components/layout/clinical-header';
import { usePatients, useWardSummary } from '../hooks/usePatients';
import { useAppStore } from '../store/useAppStore';

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0F2038] p-4 animate-pulse">
      <div className="flex justify-between mb-4">
        <div className="space-y-2">
          <div className="h-3 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="h-2 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
        </div>
        <div className="h-12 w-12 rounded-full bg-slate-200 dark:bg-slate-700" />
      </div>
      <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded mb-2" />
      <div className="h-2 w-3/4 bg-slate-200 dark:bg-slate-700 rounded" />
    </div>
  );
}

export default function NurseDashboardV2() {
  const { data: patients, isLoading } = usePatients();
  const { data: summary } = useWardSummary();
  const darkMode = useAppStore((s) => s.darkMode);
  const [reviewing, setReviewing] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const attentionCount = (patients || []).filter((p) => p.risk > 70).length;
  const sorted = [...(patients || [])].sort((a, b) => b.risk - a.risk);

  return (
    <div className="min-h-screen bg-gradient-to-br from-clinical-card to-white dark:from-clinical-primary dark:to-[#0d1f38]">
      <ClinicalHeader />
      <main className="max-w-7xl mx-auto p-6">
        <div className="mb-5">
          <h1 className="text-xl font-semibold text-clinical-text dark:text-white">
            {summary ? summary.ward : 'Ward'}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {summary ? `${summary.totalPatients} patients, shift 07:00–19:00` : 'Loading ward summary…'}
          </p>
        </div>

        <AlertBanner count={attentionCount} />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 mb-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : sorted.map((patient, i) => (
                <PatientTrendCard key={patient.id} patient={patient} index={i} onReview={setReviewing} />
              ))}
        </div>

        {reviewing && (
          <div className="mb-6">
            <FeatureContribution features={reviewing.features} />
          </div>
        )}

        <AlertsTimeline />
      </main>
    </div>
  );
}

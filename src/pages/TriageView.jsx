import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TopBar } from '../components/layout/top-bar';
import { Watchlist } from '../components/triage/watchlist';
import { PatientStory } from '../components/triage/patient-story';
import { usePatients } from '../hooks/usePatients';
import { useAppStore } from '../store/useAppStore';
import { toTriagePatient } from '../lib/toTriagePatient';

export default function TriageView() {
  const { data: rawPatients, isLoading } = usePatients();
  const darkMode = useAppStore((s) => s.darkMode);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const patients = useMemo(
    () => (rawPatients || []).map(toTriagePatient).sort((a, b) => b.risk - a.risk),
    [rawPatients]
  );

  useEffect(() => {
    if (!selectedId && patients.length > 0) setSelectedId(patients[0].id);
  }, [patients, selectedId]);

  const selectedPatient = patients.find((p) => p.id === selectedId) || patients[0];

  if (isLoading || !selectedPatient) {
    return (
      <div className="min-h-screen bg-white dark:bg-space-950 flex items-center justify-center">
        <p className="text-sm text-slate-400 dark:text-space-400">Loading ward data…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-space-950 relative">
      <div className="fixed inset-0 bg-gradient-glow-light dark:bg-gradient-glow-dark pointer-events-none" aria-hidden="true" />

      <div className="fixed top-4 left-4 right-4 z-50">
        <TopBar />
      </div>

      <main className="pt-24 px-6 pb-6 min-h-screen flex flex-col md:flex-row gap-6">
        <Watchlist patients={patients} selectedId={selectedPatient.id} onSelect={(p) => setSelectedId(p.id)} />

        <motion.div
          className="flex-1 min-w-0"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <PatientStory patient={selectedPatient} />
        </motion.div>
      </main>
    </div>
  );
}

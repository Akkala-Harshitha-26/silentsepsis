import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LiveIndicator } from '../components/command/LiveIndicator';
import { AnimatedGridBackground } from '../components/command/AnimatedGridBackground';
import { PatientCard } from '../components/command/PatientCard';
import { TrendChart } from '../components/command/TrendChart';
import { ConfidenceMeter } from '../components/command/ConfidenceMeter';
import { ActionBar } from '../components/command/ActionBar';
import { SkeletonCard } from '../components/command/SkeletonCard';
import { commandPatients } from '../data/commandPatients';
import { useAppStore } from '../store/useAppStore';

export default function CommandDashboard() {
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const nightMode = useAppStore((s) => s.nightMode);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const sorted = [...commandPatients].sort((a, b) => b.risk - a.risk);
  const selected = sorted.find((p) => p.id === selectedId) || sorted[0];
  const accent = nightMode ? '#FF9100' : '#00F0FF';

  return (
    <div
      className="min-h-screen text-command-text transition-[filter] duration-500"
      style={{ background: '#0A0E17', filter: nightMode ? 'brightness(0.82)' : 'none' }}
    >
      <AnimatedGridBackground />
      <div className="relative z-10">
        <LiveIndicator />

        <main className="grid grid-cols-1 lg:grid-cols-[280px_1fr_300px] xl:grid-cols-[320px_1fr_340px] gap-4 p-4 max-w-[1600px] mx-auto">
          {/* Column 1: Patient list */}
          <section aria-label="Patient list" className="space-y-2.5 max-h-[calc(100vh-96px)] overflow-y-auto pr-1">
            <AnimatePresence>
              {loading
                ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                : sorted.map((patient) => (
                    <PatientCard
                      key={patient.id}
                      patient={patient}
                      selected={selected?.id === patient.id}
                      onSelect={setSelectedId}
                    />
                  ))}
            </AnimatePresence>
          </section>

          {/* Column 2: Patient detail / trend story */}
          <section aria-label="Patient detail" className="rounded-2xl border border-white/5 bg-command-primary/30 p-5" style={{ backdropFilter: 'blur(8px)' }}>
            {selected && (
              <motion.div key={selected.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h2 className="text-lg font-semibold">{selected.name}</h2>
                    <p className="text-xs text-white/40">Room {selected.room} · {selected.age} years old</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold" style={{ color: accent }}>{selected.risk}</p>
                    <p className="text-[10px] text-white/40 uppercase tracking-wide">Risk score</p>
                  </div>
                </div>
                <TrendChart patient={selected} />
              </motion.div>
            )}
          </section>

          {/* Column 3: AI explanation + actions */}
          <section aria-label="AI explanation and actions" className="rounded-2xl border border-white/5 bg-command-primary/30 p-5" style={{ backdropFilter: 'blur(8px)' }}>
            {selected && (
              <>
                <ConfidenceMeter patient={selected} />
                <ActionBar patient={selected} />
              </>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

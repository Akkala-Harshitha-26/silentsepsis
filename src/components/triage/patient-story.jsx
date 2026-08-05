import { motion } from 'framer-motion';
import { VitalsChart } from '../charts/vitals-chart';
import { ExplanationPanel } from '../explanation/explanation-panel';
import { ActionButtons } from '../actions/action-buttons';

export function PatientStory({ patient }) {
  return (
    <motion.div
      className="h-full flex flex-col bg-white dark:bg-space-800/40 rounded-2xl border border-slate-200 dark:border-space-700/30 p-6 shadow-sm dark:shadow-none backdrop-blur-sm"
      key={patient.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{patient.name}</h2>
            <span className="text-sm text-slate-400 dark:text-space-400">{patient.age}</span>
            <span className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-space-700 text-slate-500 dark:text-space-300">
              {patient.admission}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-3 text-sm text-slate-400 dark:text-space-400 flex-wrap">
            <span>Bed {patient.bed.replace('Bed ', '')}</span>
            <span aria-hidden="true">·</span>
            <span>{patient.ward}</span>
            <span aria-hidden="true">·</span>
            <span>Admitted {patient.admittedDays} days ago</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{patient.risk}</div>
            <div className="text-xs text-slate-400 dark:text-space-400">Risk score</div>
          </div>
          <div className="w-px h-12 bg-slate-200 dark:bg-space-600" />
          <div className="text-right">
            <div className="text-sm font-medium text-slate-600 dark:text-space-300">±{patient.confidence}</div>
            <div className="text-xs text-slate-400 dark:text-space-400">Confidence</div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex-1 min-h-0">
        <VitalsChart data={patient.vitals} baseline={patient.baseline} />
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <ExplanationPanel features={patient.explanationFeatures} riskLevel={patient.riskLevel} />
        </div>
        <div className="flex items-end">
          <ActionButtons patient={patient} />
        </div>
      </div>
    </motion.div>
  );
}

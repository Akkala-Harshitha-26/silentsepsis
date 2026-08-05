import { useState } from 'react';
import { X } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

const FIELDS = [
  { key: 'hr', label: 'Heart rate', unit: 'bpm', placeholder: '78' },
  { key: 'rr', label: 'Respiratory rate', unit: '/min', placeholder: '16' },
  { key: 'bp', label: 'Blood pressure (systolic)', unit: 'mmHg', placeholder: '120' },
  { key: 'spo2', label: 'Oxygen saturation', unit: '%', placeholder: '97' },
  { key: 'temp', label: 'Temperature', unit: '°C', placeholder: '37.0' },
];

export function VitalsEntryForm({ patient, onClose }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const addVitals = useAppStore((s) => s.addVitals);

  const filledCount = Object.values(values).filter((v) => v !== '' && v !== undefined).length;

  function handleSubmit(e) {
    e.preventDefault();
    addVitals(patient.id, { ...values, time: new Date().toISOString() });
    setSubmitted(true);
    setTimeout(onClose, 1100);
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30 backdrop-blur-[2px]" onClick={onClose}>
      <div
        className="w-[400px] rounded-2xl bg-white dark:bg-pastel-cardDark border border-pastel-brandLight dark:border-pastel-borderDark shadow-2xl p-5"
        onClick={(e) => e.stopPropagation()}
      >
        {submitted ? (
          <div className="py-6 text-center">
            <div className="h-10 w-10 rounded-full bg-pastel-tealLight dark:bg-pastel-tealLightDark text-pastel-teal flex items-center justify-center mx-auto mb-3 text-lg">✓</div>
            <p className="text-[14px] font-medium text-pastel-ink dark:text-pastel-inkDark">Vitals recorded</p>
            <p className="text-[12px] text-pastel-sub dark:text-pastel-subDark mt-1">Re-scoring {patient.name}'s risk trend…</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-[14.5px] font-semibold text-pastel-ink dark:text-pastel-inkDark">Add vitals</h3>
              <button onClick={onClose} aria-label="Close" className="text-pastel-sub dark:text-pastel-subDark hover:text-pastel-ink">
                <X size={16} />
              </button>
            </div>
            <p className="text-[12px] text-pastel-sub dark:text-pastel-subDark mb-4">
              {patient.name}, {patient.room} · manual entry for wards without continuous monitors
            </p>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-3 mb-5">
                {FIELDS.map((f) => (
                  <div key={f.key} className={f.key === 'bp' ? 'col-span-2' : ''}>
                    <label className="block text-[11.5px] font-medium text-pastel-ink dark:text-pastel-inkDark mb-1">
                      {f.label} <span className="text-pastel-sub dark:text-pastel-subDark font-normal">({f.unit})</span>
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder={f.placeholder}
                      value={values[f.key] || ''}
                      onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                      className="w-full h-10 px-3 rounded-xl border border-pastel-brandLight dark:border-pastel-borderDark bg-white dark:bg-pastel-bgDark text-[13px] text-pastel-ink dark:text-pastel-inkDark outline-none focus:border-pastel-brand"
                    />
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <button type="button" onClick={onClose} className="flex-1 h-10 rounded-xl border border-pastel-brandLight dark:border-pastel-borderDark text-[13px] font-medium text-pastel-ink dark:text-pastel-inkDark">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={filledCount === 0}
                  className="flex-1 h-10 rounded-xl bg-pastel-brand text-white text-[13px] font-semibold disabled:opacity-40"
                >
                  Save vitals
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

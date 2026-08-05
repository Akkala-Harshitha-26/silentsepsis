import { useState } from 'react';
import { X } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

const REASONS = [
  'False positive — vitals within acceptable range',
  'Patient recovering, trend already reversing',
  'Already reviewed by physician',
  'Known baseline for this patient',
  'Other',
];

export function DismissReasonModal({ patient, onClose }) {
  const [reason, setReason] = useState(REASONS[0]);
  const [note, setNote] = useState('');
  const dismiss = useAppStore((s) => s.dismiss);

  function handleConfirm() {
    dismiss(patient.id, reason, note.trim() || null);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30 backdrop-blur-[2px]" onClick={onClose}>
      <div
        className="w-[380px] rounded-2xl bg-white dark:bg-pastel-cardDark border border-pastel-brandLight dark:border-pastel-borderDark shadow-2xl p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-[14.5px] font-semibold text-pastel-ink dark:text-pastel-inkDark">Dismiss alert</h3>
          <button onClick={onClose} aria-label="Close" className="text-pastel-sub dark:text-pastel-subDark hover:text-pastel-ink">
            <X size={16} />
          </button>
        </div>
        <p className="text-[12px] text-pastel-sub dark:text-pastel-subDark mb-4">
          {patient.name}, {patient.room} — this reason feeds the model's false-positive tracking.
        </p>

        <label className="block text-[12px] font-medium text-pastel-ink dark:text-pastel-inkDark mb-1.5">Reason</label>
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full h-10 px-3 mb-4 rounded-xl border border-pastel-brandLight dark:border-pastel-borderDark bg-white dark:bg-pastel-bgDark text-[13px] text-pastel-ink dark:text-pastel-inkDark outline-none focus:border-pastel-brand"
        >
          {REASONS.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>

        <label className="block text-[12px] font-medium text-pastel-ink dark:text-pastel-inkDark mb-1.5">Notes (optional)</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          placeholder="Anything else worth logging…"
          className="w-full px-3 py-2 mb-5 rounded-xl border border-pastel-brandLight dark:border-pastel-borderDark bg-white dark:bg-pastel-bgDark text-[13px] text-pastel-ink dark:text-pastel-inkDark outline-none focus:border-pastel-brand resize-none"
        />

        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 h-10 rounded-xl border border-pastel-brandLight dark:border-pastel-borderDark text-[13px] font-medium text-pastel-ink dark:text-pastel-inkDark">
            Cancel
          </button>
          <button onClick={handleConfirm} className="flex-1 h-10 rounded-xl bg-pastel-brand text-white text-[13px] font-semibold">
            Confirm dismiss
          </button>
        </div>
      </div>
    </div>
  );
}

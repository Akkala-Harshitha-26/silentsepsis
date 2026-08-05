import { create } from 'zustand';

export const useAppStore = create((set) => ({
  darkMode: false,
  toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),

  // Night mode is distinct from dark/light theme: it dims overall brightness
  // and shifts the cyan accent to amber, for preserving night vision on a
  // ward — not a color-scheme preference, a clinical one.
  nightMode: false,
  toggleNightMode: () => set((s) => ({ nightMode: !s.nightMode })),

  acknowledgedIds: new Set(),
  acknowledge: (id) =>
    set((s) => {
      const next = new Set(s.acknowledgedIds);
      next.add(id);
      return {
        acknowledgedIds: next,
        auditLog: [{ id: crypto.randomUUID(), type: 'acknowledge', patientId: id, time: new Date() }, ...s.auditLog],
      };
    }),

  // Dismissals now actually capture why — this is the data the project's
  // own pitch says feeds back into retraining the false-positive rate.
  // Previously this parameter existed but was silently dropped.
  dismissedIds: new Map(),
  dismiss: (id, reason, note) =>
    set((s) => {
      const next = new Map(s.dismissedIds);
      next.set(id, { reason, note, time: new Date() });
      return {
        dismissedIds: next,
        auditLog: [{ id: crypto.randomUUID(), type: 'dismiss', patientId: id, reason, note, time: new Date() }, ...s.auditLog],
      };
    }),

  // Manually entered vitals, keyed by patient id. Demo-scoped (resets on
  // reload) since there's no backend yet, but the shape matches what a
  // real POST /api/vitals would send.
  manualVitals: {},
  addVitals: (id, entry) =>
    set((s) => ({
      manualVitals: { ...s.manualVitals, [id]: [...(s.manualVitals[id] || []), entry] },
      auditLog: [{ id: crypto.randomUUID(), type: 'vitals_entry', patientId: id, time: new Date() }, ...s.auditLog],
    })),

  auditLog: [],
  escalate: (id) =>
    set((s) => ({
      auditLog: [{ id: crypto.randomUUID(), type: 'escalate', patientId: id, time: new Date() }, ...s.auditLog],
    })),
}));

// Dedicated data set for the command dashboard — built to the exact
// distribution requested (2 critical / 2 warning / 2 stable) rather than
// reused from the shared mockData, which doesn't hit that split.

function makeVitals(startHr, endHr, startRr, endRr) {
  const points = 8;
  return Array.from({ length: points }, (_, i) => {
    const t = i / (points - 1);
    return {
      time: `${((points - 1 - i) * 1.5).toFixed(0)}h`,
      hr: Math.round(startHr + (endHr - startHr) * t),
      rr: Math.round(startRr + (endRr - startRr) * t),
    };
  });
}

export const commandPatients = [
  {
    id: 'c1', name: 'R. Patel', room: '304B', age: 62, risk: 88,
    status: 'critical',
    vitals: makeVitals(78, 112, 16, 25),
    baseline: { hr: 78, rr: 16 },
    annotation: { time: '3h', label: 'Trend deviation detected' },
    timeToIntervention: '~2h',
    features: [
      { name: 'Respiratory rate', contribution: 92 },
      { name: 'Heart rate variability', contribution: 71 },
      { name: 'Blood pressure trend', contribution: 48 },
    ],
    explanation: 'Respiratory rate has climbed steadily for 6 hours with no recovery — the strongest single predictor in this model.',
    certainty: 91,
  },
  {
    id: 'c2', name: 'M. Diallo', room: '211A', age: 55, risk: 84,
    status: 'critical',
    vitals: makeVitals(80, 109, 15, 21),
    baseline: { hr: 80, rr: 15 },
    annotation: { time: '4.5h', label: 'Sustained rise flagged' },
    timeToIntervention: '~3h',
    features: [
      { name: 'Heart rate trend', contribution: 85 },
      { name: 'Temperature rise', contribution: 63 },
      { name: 'Oxygen saturation', contribution: 40 },
    ],
    explanation: 'Heart rate has stayed above personal baseline for four consecutive readings, paired with a slow temperature climb.',
    certainty: 87,
  },
  {
    id: 'c3', name: 'S. Kumar', room: '118C', age: 48, risk: 68,
    status: 'warning',
    vitals: makeVitals(74, 88, 15, 18),
    baseline: { hr: 74, rr: 15 },
    annotation: { time: '6h', label: 'Early pattern' },
    timeToIntervention: '~8h',
    features: [
      { name: 'Blood pressure trend', contribution: 58 },
      { name: 'Respiratory rate', contribution: 34 },
    ],
    explanation: 'Blood pressure is drifting down gradually. Still within a survivable range, but the slope is worth watching.',
    certainty: 64,
  },
  {
    id: 'c4', name: 'A. Okafor', room: '402D', age: 71, risk: 57,
    status: 'warning',
    vitals: makeVitals(68, 76, 15, 17),
    baseline: { hr: 68, rr: 15 },
    annotation: { time: '8h', label: 'Mild deviation' },
    timeToIntervention: '~12h',
    features: [
      { name: 'Oxygen saturation', contribution: 41 },
      { name: 'Heart rate variability', contribution: 22 },
    ],
    explanation: 'A mild overnight oxygen dip that partially recovered by morning round. Below the confirmed-alert threshold.',
    certainty: 52,
  },
  {
    id: 'c5', name: 'J. Lee', room: '109A', age: 39, risk: 18,
    status: 'stable',
    vitals: makeVitals(72, 73, 14, 14),
    baseline: { hr: 72, rr: 14 },
    annotation: null,
    timeToIntervention: null,
    features: [],
    explanation: 'All vitals within personal baseline range across the full monitoring window.',
    certainty: 12,
  },
  {
    id: 'c6', name: 'T. Novak', room: '215B', age: 44, risk: 9,
    status: 'stable',
    vitals: makeVitals(70, 71, 14, 14),
    baseline: { hr: 70, rr: 14 },
    annotation: null,
    timeToIntervention: null,
    features: [],
    explanation: 'No meaningful trend detected. Routine monitoring only.',
    certainty: 6,
  },
];

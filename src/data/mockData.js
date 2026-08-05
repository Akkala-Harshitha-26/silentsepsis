export const patients = [
  {
    id: 'p1', name: 'R. Patel', initials: 'RP', bed: 'Bed 4', ward: 'Ward 4B',
    age: 62, sex: 'M', admitted: '3 days ago', note: 'Post-op, day 3',
    risk: 82, tier: 'critical', ci: 6,
    reason: 'Respiratory rate up 22% over last 3 readings, outside personal baseline',
    trajectory: 'High risk in ~4h', lastVitals: '18 min ago',
    trend: [16, 16, 17, 18, 19, 21, 22, 23, 24],
    features: [
      { name: 'Respiratory rate trend', weight: 0.9 },
      { name: 'Blood pressure delta', weight: 0.55 },
      { name: 'Heart rate variability', weight: 0.2 },
    ],
    vitalsHistory: [
      { t: '-12h', hr: 78, rr: 16, bp: 122, spo2: 98, temp: 37.0 },
      { t: '-9h', hr: 82, rr: 17, bp: 120, spo2: 97, temp: 37.1 },
      { t: '-6h', hr: 88, rr: 19, bp: 116, spo2: 96, temp: 37.4 },
      { t: '-3h', hr: 96, rr: 22, bp: 108, spo2: 95, temp: 37.9 },
      { t: 'now', hr: 104, rr: 24, bp: 100, spo2: 94, temp: 38.3 },
    ],
  },
  {
    id: 'p2', name: 'M. Diallo', initials: 'MD', bed: 'Bed 11', ward: 'Ward 2A',
    age: 55, sex: 'F', admitted: '5 days ago', note: 'UTI, day 5',
    risk: 79, tier: 'critical', ci: 8,
    reason: 'Heart rate sustained above baseline for 4 consecutive readings',
    trajectory: 'High risk in ~5h', lastVitals: '9 min ago',
    trend: [80, 84, 88, 92, 96, 100, 104, 106, 108],
    features: [
      { name: 'Heart rate trend', weight: 0.85 },
      { name: 'Temperature rise', weight: 0.6 },
      { name: 'Oxygen saturation', weight: 0.3 },
    ],
    vitalsHistory: [
      { t: '-12h', hr: 80, rr: 15, bp: 118, spo2: 98, temp: 37.0 },
      { t: '-9h', hr: 88, rr: 16, bp: 114, spo2: 97, temp: 37.3 },
      { t: '-6h', hr: 96, rr: 17, bp: 110, spo2: 96, temp: 37.8 },
      { t: '-3h', hr: 102, rr: 19, bp: 104, spo2: 95, temp: 38.2 },
      { t: 'now', hr: 108, rr: 20, bp: 98, spo2: 94, temp: 38.6 },
    ],
  },
  {
    id: 'p3', name: 'S. Kumar', initials: 'SK', bed: 'Bed 9', ward: 'Ward 4B',
    age: 48, sex: 'M', admitted: '2 days ago', note: 'Pneumonia, day 2',
    risk: 54, tier: 'watch', ci: 11,
    reason: 'Blood pressure drifting down slowly, within normal range so far',
    trajectory: 'Stable if trend flattens', lastVitals: '40 min ago',
    trend: [122, 120, 118, 117, 115, 113, 112, 110, 109],
    features: [
      { name: 'Blood pressure trend', weight: 0.5 },
      { name: 'Respiratory rate', weight: 0.25 },
    ],
    vitalsHistory: [
      { t: '-12h', hr: 74, rr: 15, bp: 122, spo2: 98, temp: 36.9 },
      { t: '-9h', hr: 75, rr: 15, bp: 119, spo2: 98, temp: 37.0 },
      { t: '-6h', hr: 76, rr: 16, bp: 116, spo2: 97, temp: 37.1 },
      { t: '-3h', hr: 78, rr: 16, bp: 113, spo2: 97, temp: 37.2 },
      { t: 'now', hr: 79, rr: 17, bp: 110, spo2: 96, temp: 37.3 },
    ],
  },
  {
    id: 'p4', name: 'J. Lee', initials: 'JL', bed: 'Bed 2', ward: 'Ward 4B',
    age: 39, sex: 'F', admitted: '1 day ago', note: 'Observation',
    risk: 12, tier: 'stable', ci: 4,
    reason: 'All vitals within personal baseline',
    trajectory: 'No concern', lastVitals: '55 min ago',
    trend: [72, 71, 73, 72, 71, 72, 73, 72, 71],
    features: [],
    vitalsHistory: [
      { t: '-12h', hr: 72, rr: 14, bp: 118, spo2: 99, temp: 36.7 },
      { t: '-9h', hr: 71, rr: 14, bp: 119, spo2: 99, temp: 36.7 },
      { t: '-6h', hr: 73, rr: 14, bp: 117, spo2: 99, temp: 36.8 },
      { t: '-3h', hr: 72, rr: 14, bp: 118, spo2: 98, temp: 36.7 },
      { t: 'now', hr: 71, rr: 14, bp: 119, spo2: 99, temp: 36.7 },
    ],
  },
  {
    id: 'p5', name: 'A. Okafor', initials: 'AO', bed: 'Bed 6', ward: 'Ward 4B',
    age: 71, sex: 'M', admitted: '4 days ago', note: 'CHF monitoring',
    risk: 34, tier: 'watch', ci: 9,
    reason: 'Mild oxygen saturation dip overnight, recovered by morning round',
    trajectory: 'Stable', lastVitals: '25 min ago',
    trend: [96, 95, 94, 95, 96, 96, 95, 96, 96],
    features: [{ name: 'Oxygen saturation', weight: 0.3 }],
    vitalsHistory: [
      { t: '-12h', hr: 68, rr: 15, bp: 128, spo2: 96, temp: 36.8 },
      { t: '-9h', hr: 70, rr: 16, bp: 126, spo2: 95, temp: 36.9 },
      { t: '-6h', hr: 69, rr: 15, bp: 127, spo2: 94, temp: 36.8 },
      { t: '-3h', hr: 68, rr: 15, bp: 128, spo2: 95, temp: 36.8 },
      { t: 'now', hr: 68, rr: 15, bp: 129, spo2: 96, temp: 36.7 },
    ],
  },
];

export const wardSummary = {
  ward: 'Ward 4B',
  activeAlerts: 2,
  trendingUp: 3,
  stable: 7,
  avgConfirmMinutes: 4,
  riskLoad: 42,
  totalPatients: 12,
};

export const precisionRecallHistory = [
  { day: 'Day 1', precision: 60, recall: 88 },
  { day: 'Day 5', precision: 65, recall: 89 },
  { day: 'Day 10', precision: 68, recall: 90 },
  { day: 'Day 15', precision: 71, recall: 90 },
  { day: 'Day 20', precision: 74, recall: 91 },
  { day: 'Day 25', precision: 76, recall: 91 },
  { day: 'Day 30', precision: 78, recall: 91 },
];

export const wardStaffResponse = [
  { ward: 'Ward 4B', reviewed: 96 },
  { ward: 'Ward 2A', reviewed: 72 },
  { ward: 'Ward 1C', reviewed: 94 },
];

export const auditLog = [
  { event: 'Alert dismissed — R. Patel', actor: 'N. Thomas, RN', time: '2 hours ago' },
  { event: 'Model recalibrated — ward 2A baseline', actor: 'System', time: 'Yesterday' },
  { event: 'Alert confirmed — M. Diallo', actor: 'Dr. A. Reyes', time: 'Yesterday' },
  { event: 'New patient baseline established — J. Lee', actor: 'System', time: '2 days ago' },
];

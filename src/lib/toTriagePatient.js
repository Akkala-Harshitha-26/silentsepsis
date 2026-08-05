// Adapts the shared patient records (src/data/mockData.js) into the
// richer shape the triage view expects. One source of truth for data;
// each view reshapes it for its own needs rather than forking the model.

function parseAdmittedDays(admitted) {
  const match = /^(\d+)/.exec(admitted);
  return match ? Number(match[1]) : 0;
}

export function toTriagePatient(p) {
  const trendDirection = p.trend[p.trend.length - 1] >= p.trend[0] ? 'up' : 'down';
  const riskLevel = p.tier === 'critical' ? 'high' : p.tier === 'watch' ? 'medium' : 'low';

  return {
    id: p.id,
    name: p.name,
    initials: p.initials,
    bed: p.bed,
    ward: p.ward,
    age: p.age,
    admission: p.note,
    admittedDays: parseAdmittedDays(p.admitted),
    risk: p.risk,
    confidence: p.ci,
    trend: trendDirection,
    lastVitals: p.lastVitals,
    explanation: p.reason,
    riskLevel,
    explanationFeatures: p.features.map((f) => ({ name: f.name, contribution: Math.round(f.weight * 100) })),
    vitals: p.vitalsHistory.map((v) => ({ time: v.t, hr: v.hr, rr: v.rr, bp: v.bp, spo2: v.spo2, temp: v.temp })),
    baseline: { hr: p.vitalsHistory[0].hr, rr: p.vitalsHistory[0].rr },
  };
}

import { useParams, useNavigate } from 'react-router-dom';
import { patients } from '../data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function PatientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const patient = patients.find((p) => p.id === id);

  if (!patient) return <p>Patient not found.</p>;

  return (
    <>
      <button className="btn ghost sm" style={{ marginBottom: 16 }} onClick={() => navigate(-1)}>
        <i className="ti ti-arrow-left" aria-hidden="true"></i> Back
      </button>

      <div className="flex justify-between items-center" style={{ marginBottom: 20 }}>
        <div className="flex items-center gap-12">
          <div className={`patient-avatar ${patient.tier}`} style={{ width: 48, height: 48, fontSize: 15 }}>{patient.initials}</div>
          <div>
            <h1 className="page-title">{patient.name}</h1>
            <p className="page-sub">{patient.bed}, {patient.ward} · {patient.age}{patient.sex} · admitted {patient.admitted} · {patient.note}</p>
          </div>
        </div>
        <span className={`badge ${patient.tier}`}>{patient.tier === 'critical' ? 'high risk' : patient.tier === 'watch' ? 'watching' : 'stable'}</span>
      </div>

      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
        <div className="stat-card">
          <p className="stat-label">Risk score</p>
          <p className={`stat-value ${patient.tier}`}>{patient.risk}<span className="stat-unit">/100</span></p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Confidence</p>
          <p className="stat-value">±{patient.ci}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Last vitals</p>
          <p style={{ fontSize: 15, fontWeight: 500, marginTop: 8 }}>{patient.lastVitals}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Trajectory</p>
          <p style={{ fontSize: 13, fontWeight: 500, marginTop: 8, color: patient.tier === 'critical' ? 'var(--trace-critical)' : 'var(--text-secondary)' }}>{patient.trajectory}</p>
        </div>
      </div>

      <div className="panel" style={{ marginBottom: 16 }}>
        <p className="panel-title">Full vitals history</p>
        <div style={{ height: 240 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={patient.vitalsHistory}>
              <CartesianGrid stroke="var(--line)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="t" tick={{ fill: 'var(--text-dim)', fontSize: 11 }} axisLine={{ stroke: 'var(--line)' }} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-dim)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--bg-card-raised)', border: '1px solid var(--line-strong)', borderRadius: 8, fontSize: 12 }} />
              <Line type="monotone" dataKey="hr" stroke="var(--trace-critical)" strokeWidth={2} dot name="Heart rate" />
              <Line type="monotone" dataKey="rr" stroke="var(--trace-watch)" strokeWidth={2} dot name="Respiratory rate" />
              <Line type="monotone" dataKey="bp" stroke="var(--trace-accent)" strokeWidth={2} dot name="Blood pressure" />
              <Line type="monotone" dataKey="spo2" stroke="var(--trace-stable)" strokeWidth={2} dot name="SpO2" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="panel" style={{ marginBottom: 16 }}>
        <p className="panel-title">Raw readings</p>
        <table className="data-table">
          <thead>
            <tr>
              <th>Time</th><th>Heart rate</th><th>Resp. rate</th><th>Blood pressure</th><th>SpO2</th><th>Temp</th>
            </tr>
          </thead>
          <tbody>
            {patient.vitalsHistory.map((v) => (
              <tr key={v.t}>
                <td className="mono">{v.t}</td>
                <td className="mono">{v.hr} bpm</td>
                <td className="mono">{v.rr} /min</td>
                <td className="mono">{v.bp} mmHg</td>
                <td className="mono">{v.spo2}%</td>
                <td className="mono">{v.temp}°C</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-8">
        <button className="btn confirm">
          <i className="ti ti-check" aria-hidden="true"></i> Confirm alert
        </button>
        <button className="btn ghost">Dismiss</button>
        <button className="btn primary">
          <i className="ti ti-file-plus" aria-hidden="true"></i> Escalate to physician
        </button>
      </div>
    </>
  );
}

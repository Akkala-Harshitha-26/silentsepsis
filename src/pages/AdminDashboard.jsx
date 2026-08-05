import Topbar from '../components/Topbar';
import { precisionRecallHistory, wardStaffResponse, auditLog } from '../data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function AdminDashboard() {
  return (
    <>
      <Topbar title="System health" subtitle="All wards, last 30 days" />

      <div className="flex justify-between items-center" style={{ marginBottom: 18 }}>
        <div />
        <button className="btn sm">
          <i className="ti ti-file-text" aria-hidden="true"></i> Full audit log
        </button>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <p className="stat-label">Alert precision</p>
          <p className="stat-value stable">78<span className="stat-unit">%</span></p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Alert recall</p>
          <p className="stat-value stable">91<span className="stat-unit">%</span></p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Model drift</p>
          <p style={{ fontSize: 15, fontWeight: 500, marginTop: 8, color: 'var(--trace-stable)' }}>Stable</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Wards live</p>
          <p className="stat-value">3<span className="stat-unit">/3</span></p>
        </div>
      </div>

      <div className="panel" style={{ marginBottom: 16 }}>
        <p className="panel-title">Precision and recall over time</p>
        <div style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={precisionRecallHistory}>
              <CartesianGrid stroke="var(--line)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: 'var(--text-dim)', fontSize: 11 }} axisLine={{ stroke: 'var(--line)' }} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-dim)', fontSize: 11 }} axisLine={false} tickLine={false} domain={[50, 100]} />
              <Tooltip contentStyle={{ background: 'var(--bg-card-raised)', border: '1px solid var(--line-strong)', borderRadius: 8, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12, color: 'var(--text-secondary)' }} />
              <Line type="monotone" dataKey="precision" stroke="var(--trace-accent)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="recall" stroke="var(--trace-stable)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid-2">
        <div className="panel">
          <p className="panel-title">Staff response by ward</p>
          {wardStaffResponse.map((w) => (
            <div key={w.ward} className="flex justify-between items-center" style={{ padding: '10px 0', borderBottom: '1px solid var(--line)' }}>
              <span style={{ fontSize: 13 }}>{w.ward}</span>
              <span
                className="mono text-sm"
                style={{ color: w.reviewed < 80 ? 'var(--trace-watch)' : 'var(--text-secondary)' }}
              >
                {w.reviewed}% alerts reviewed
              </span>
            </div>
          ))}
        </div>
        <div className="panel">
          <p className="panel-title">Recent audit entries</p>
          {auditLog.map((entry, i) => (
            <div key={i} style={{ padding: '10px 0', borderBottom: i < auditLog.length - 1 ? '1px solid var(--line)' : 'none' }}>
              <p style={{ fontSize: 12.5, margin: 0, color: 'var(--text-primary)' }}>{entry.event}</p>
              <p className="patient-meta text-dim">{entry.actor} · {entry.time}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

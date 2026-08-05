import Topbar from '../components/Topbar';
import { patients } from '../data/mockData';

const history = [
  { patient: 'R. Patel', bed: 'Bed 4', status: 'active', reason: 'Respiratory rate trend', time: '18 min ago', actor: '—' },
  { patient: 'M. Diallo', bed: 'Bed 11', status: 'active', reason: 'Heart rate sustained rise', time: '9 min ago', actor: '—' },
  { patient: 'S. Kumar', bed: 'Bed 9', status: 'watching', reason: 'Blood pressure drift', time: '40 min ago', actor: '—' },
  { patient: 'T. Novak', bed: 'Bed 7', status: 'confirmed', reason: 'Temperature spike', time: '3 hours ago', actor: 'N. Thomas, RN' },
  { patient: 'E. Brandt', bed: 'Bed 3', status: 'dismissed', reason: 'Respiratory rate blip', time: '5 hours ago', actor: 'K. Osei, RN' },
  { patient: 'A. Okafor', bed: 'Bed 6', status: 'resolved', reason: 'Oxygen saturation dip', time: 'Yesterday', actor: 'Dr. A. Reyes' },
];

const STATUS_TONE = { active: 'critical', watching: 'watch', confirmed: 'watch', dismissed: 'stable', resolved: 'stable' };

export default function Alerts() {
  return (
    <>
      <Topbar title="Alert history" subtitle="All wards" />

      <div className="panel" style={{ padding: 0 }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Patient</th><th>Reason</th><th>Status</th><th>Reviewed by</th><th>Time</th>
            </tr>
          </thead>
          <tbody>
            {history.map((h, i) => (
              <tr key={i}>
                <td>{h.patient} · {h.bed}</td>
                <td>{h.reason}</td>
                <td><span className={`badge ${STATUS_TONE[h.status]}`}>{h.status}</span></td>
                <td>{h.actor}</td>
                <td className="mono">{h.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

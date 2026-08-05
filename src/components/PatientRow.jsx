import { useNavigate } from 'react-router-dom';
import { Sparkline } from './Waveform';

const TIER_LABEL = { critical: 'high risk', watch: 'watching', stable: 'stable' };

export default function PatientRow({ patient, showActions = false, delay = 0 }) {
  const navigate = useNavigate();
  const { id, initials, name, bed, ward, reason, tier, trend, lastVitals } = patient;

  return (
    <div>
      <div className={`patient-row ${tier}`} style={{ animationDelay: `${delay}s` }} onClick={() => navigate(`/patient/${id}`)}>
        <div className={`patient-avatar ${tier}`}>{initials}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="flex justify-between items-center">
            <p className="patient-name">{name} — {bed}</p>
            <span className={`badge ${tier}`}>
              {tier === 'critical' && <span className="dot dot-critical dot-pulse"></span>}
              {TIER_LABEL[tier]}
            </span>
          </div>
          {tier !== 'stable' ? (
            <p className="patient-reason">{reason}</p>
          ) : (
            <p className="patient-meta">{reason}</p>
          )}
          {lastVitals && <p className="patient-meta text-dim">{ward} · last vitals {lastVitals}</p>}
        </div>
        <Sparkline points={trend} tone={tier} animate={tier === 'critical'} />
      </div>

      {showActions && tier !== 'stable' && (
        <div className="action-bar">
          <button className="btn confirm sm" onClick={(e) => e.stopPropagation()}>
            <i className="ti ti-check" aria-hidden="true"></i> Confirm
          </button>
          <button className="btn ghost sm" onClick={(e) => e.stopPropagation()}>Dismiss</button>
          <button className="btn ghost sm" onClick={() => navigate(`/patient/${id}`)}>View trend</button>
        </div>
      )}
    </div>
  );
}

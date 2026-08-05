import { useNavigate } from 'react-router-dom';
import PersonAvatar from './PersonAvatar';
import { Sparkline } from './Waveform';
import { HeartGlyph, LungsGlyph } from './VitalGlyphs';

const TIER_LABEL = { critical: 'High risk', watch: 'Watching', stable: 'Stable' };

export default function PatientCard({ patient, delay = 0 }) {
  const navigate = useNavigate();
  const { id, name, bed, ward, reason, tier, trend, lastVitals } = patient;

  return (
    <div className={`patient-card ${tier}`} style={{ animationDelay: `${delay}s` }} onClick={() => navigate(`/patient/${id}`)}>
      <div className="patient-card-top">
        <PersonAvatar tier={tier} size={46} breathing={tier === 'critical'} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p className="patient-card-name">{name}</p>
          <p className="patient-card-meta">{bed} · {ward}</p>
        </div>
        <span className={`badge ${tier}`}>
          {tier === 'critical' && <span className="dot dot-critical dot-pulse"></span>}
          {TIER_LABEL[tier]}
        </span>
      </div>

      <p className="patient-card-reason">{reason}</p>

      <div className="patient-card-foot">
        <div className="patient-card-glyphs">
          <HeartGlyph size={18} animate={tier === 'critical'} />
          <LungsGlyph size={18} animate={tier === 'critical'} />
        </div>
        <Sparkline points={trend} tone={tier} animate={tier === 'critical'} width={80} height={28} />
      </div>

      {lastVitals && <p className="patient-card-time">Last vitals {lastVitals}</p>}

      {tier !== 'stable' && (
        <div className="patient-card-actions">
          <button className="btn confirm sm" onClick={(e) => e.stopPropagation()}>
            <i className="ti ti-check" aria-hidden="true"></i> Confirm
          </button>
          <button className="btn ghost sm" onClick={(e) => e.stopPropagation()}>Dismiss</button>
        </div>
      )}
    </div>
  );
}

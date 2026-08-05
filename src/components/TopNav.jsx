import { NavLink } from 'react-router-dom';
import { BrandMark } from './Waveform';
import PersonAvatar from './PersonAvatar';

const NAV = [
  { to: '/nurse', icon: 'ti-layout-grid', text: 'Ward view' },
  { to: '/physician', icon: 'ti-stethoscope', text: 'Escalated' },
  { to: '/alerts', icon: 'ti-bell', text: 'Alerts' },
  { to: '/analytics', icon: 'ti-chart-bar', text: 'Analytics' },
  { to: '/admin', icon: 'ti-shield-check', text: 'System' },
];

export default function TopNav() {
  return (
    <header className="topnav">
      <div className="topnav-inner">
        <div className="topnav-brand">
          <BrandMark size={26} />
          <span className="topnav-brand-name">SilentSepsis</span>
        </div>

        <nav className="topnav-links">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => 'topnav-link' + (isActive ? ' active' : '')}>
              <i className={`ti ${item.icon}`} aria-hidden="true"></i>
              {item.text}
            </NavLink>
          ))}
        </nav>

        <div className="topnav-right">
          <span className="topnav-sync"><span className="dot dot-stable"></span>Synced 2m ago</span>
          <div style={{ width: 34, height: 34 }}><PersonAvatar tier="neutral" size={34} /></div>
        </div>
      </div>
    </header>
  );
}

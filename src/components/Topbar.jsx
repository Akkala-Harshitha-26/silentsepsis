import { useEffect, useState } from 'react';

// A real, ticking clock — not decoration. On a ward, "how long ago" only
// means something if the reference clock is actually live.
function useLiveClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export default function Topbar({ title, subtitle, alertCount = 0, user = { initials: 'NT', name: 'N. Thomas, RN' } }) {
  const now = useLiveClock();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div className="topbar">
      <div>
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="page-sub">{subtitle}</p>}
      </div>
      <div className="topbar-right">
        <div className="live-clock" title="Ward reference time">
          <span className="dot dot-stable" style={{ marginRight: 2 }}></span>
          <span className="mono">{time}</span>
        </div>
        <div className="icon-btn">
          <i className="ti ti-search" aria-hidden="true"></i>
        </div>
        <div className={`icon-btn${alertCount > 0 ? ' has-alert' : ''}`} aria-label={`${alertCount} unread alerts`}>
          <i className="ti ti-bell" aria-hidden="true"></i>
          {alertCount > 0 && <span className="badge-count"></span>}
        </div>
        <div className="flex items-center gap-8">
          <div className="avatar">{user.initials}</div>
        </div>
      </div>
    </div>
  );
}

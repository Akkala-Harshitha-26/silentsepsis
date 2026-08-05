// A wide illustrated ward scene — deliberately a different composition
// from the login desk illustration, so the app doesn't reuse one image
// everywhere the way a rushed build would.
export default function WardScene() {
  return (
    <svg viewBox="0 0 900 220" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration of a hospital ward with three monitored beds">
      {[80, 380, 680].map((x, i) => (
        <g key={x} transform={`translate(${x},0)`}>
          {/* bed */}
          <rect x="0" y="140" width="130" height="14" rx="4" fill="#D2CBBB" opacity="0.55" />
          <rect x="6" y="118" width="118" height="26" rx="8" fill="#FFFFFF" stroke="#E6E1D6" strokeWidth="1.5" />
          <rect x="14" y="112" width="34" height="14" rx="6" fill={i === 0 ? '#F6E7E2' : '#EDEAE0'} />

          {/* monitor stand */}
          <rect x="96" y="60" width="4" height="58" fill="#C7C0AF" />
          <rect x="70" y="34" width="60" height="40" rx="6" fill="#16233A" />
          <rect x="75" y="39" width="50" height="30" rx="3" fill="#1E304C" />
          <polyline
            points={`75,54 82,54 87,${i === 0 ? 42 : 50} 92,${i === 0 ? 64 : 58} 97,54 125,54`}
            fill="none"
            stroke={i === 0 ? '#C9836F' : '#5E9B7C'}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 90,
              strokeDashoffset: 90,
              animation: `ward-trace 2.6s ease-in-out ${i * 0.4}s infinite`,
            }}
          />
        </g>
      ))}

      <style>{`
        @keyframes ward-trace {
          0% { stroke-dashoffset: 90; }
          45% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -90; }
        }
      `}</style>
    </svg>
  );
}

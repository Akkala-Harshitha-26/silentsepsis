// The recurring visual signature of SilentSepsis: a live monitor-style trace.
// Used as the brand mark, and as sparklines on every patient row so the
// "shape" of a patient's deterioration is visible at a glance, not just a number.

export function BrandMark({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="14" fill="none" stroke="var(--trace-accent)" strokeWidth="1.5" opacity="0.35" />
      <path
        d="M4 16 H10 L13 8 L17 24 L20 16 H28"
        fill="none"
        stroke="var(--trace-accent)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ animation: 'brand-breathe 2.6s ease-in-out infinite' }}
      />
      <style>{`
        @keyframes brand-breathe {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.55; }
        }
      `}</style>
    </svg>
  );
}

// tone: 'stable' | 'watch' | 'critical'
const TONE_COLOR = {
  stable: 'var(--trace-stable)',
  watch: 'var(--trace-watch)',
  critical: 'var(--trace-critical)',
};

export function Sparkline({ points, tone = 'stable', width = 76, height = 30, animate = false }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const stepX = width / (points.length - 1);
  const coords = points.map((p, i) => {
    const x = i * stepX;
    const y = height - ((p - min) / range) * (height - 6) - 3;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const path = 'M' + coords.join(' L');
  const color = TONE_COLOR[tone];
  // Rough path length estimate, used to drive the draw-in animation
  const pathLength = coords.reduce((acc, c, i) => {
    if (i === 0) return 0;
    const [x1, y1] = coords[i - 1].split(',').map(Number);
    const [x2, y2] = c.split(',').map(Number);
    return acc + Math.hypot(x2 - x1, y2 - y1);
  }, 0);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`Trend, ${tone}`}>
      <polyline
        points={coords.join(' ')}
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
          animation: 'draw-trace 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s forwards',
        }}
      />
      {animate && (
        <circle r="2.4" fill={color}>
          <animateMotion dur="2.4s" repeatCount="indefinite" path={path} begin="0.8s" />
        </circle>
      )}
    </svg>
  );
}

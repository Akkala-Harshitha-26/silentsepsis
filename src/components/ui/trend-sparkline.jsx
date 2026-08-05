export function TrendSparkline({ points, color = '#1A3A5C', width = 90, height = 32 }) {
  const last6 = points.slice(-6);
  const max = Math.max(...last6);
  const min = Math.min(...last6);
  const range = max - min || 1;
  const stepX = width / (last6.length - 1);
  const coords = last6.map((p, i) => {
    const x = i * stepX;
    const y = height - ((p - min) / range) * (height - 6) - 3;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Trend over last 6 readings">
      <polyline points={coords.join(' ')} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={coords[coords.length - 1].split(',')[0]} cy={coords[coords.length - 1].split(',')[1]} r="2.5" fill={color} />
    </svg>
  );
}

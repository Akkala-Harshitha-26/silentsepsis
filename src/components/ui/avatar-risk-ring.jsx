export function AvatarRiskRing({ score, size = 44, thickness = 3 }) {
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - score / 100);
  const color = score > 70 ? '#E11D48' : score > 40 ? '#F59E0B' : '#10B981';

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="absolute -inset-1" role="img" aria-label={`Risk ${score}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        strokeWidth={thickness}
        className="stroke-slate-200 dark:stroke-space-700"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        strokeWidth={thickness}
        strokeLinecap="round"
        stroke={color}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16,1,0.3,1)' }}
      />
    </svg>
  );
}

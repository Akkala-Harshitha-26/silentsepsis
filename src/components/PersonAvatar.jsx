// An illustrated figure instead of a plain initials circle. Small, flat,
// consistent line weight — reads as a considered icon set, not clip art.
export default function PersonAvatar({ tier = 'stable', size = 44, breathing = false }) {
  const fill = {
    critical: '#F6E7E2',
    watch: '#F5EDDD',
    stable: '#E7F0EA',
    neutral: '#EDEAE0',
  }[tier];
  const stroke = {
    critical: '#AE4B34',
    watch: '#A8721E',
    stable: '#3F7A5C',
    neutral: '#6B6154',
  }[tier];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      role="img"
      aria-hidden="true"
      style={breathing ? { animation: 'avatar-breathe 2.4s ease-in-out infinite' } : undefined}
    >
      <circle cx="22" cy="22" r="21" fill={fill} />
      <circle cx="22" cy="17" r="7" fill="none" stroke={stroke} strokeWidth="1.8" />
      <path d="M9 36 C9 27 14.5 24 22 24 C29.5 24 35 27 35 36" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
      <style>{`
        @keyframes avatar-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
      `}</style>
    </svg>
  );
}

// A small consistent icon set for vitals — hand-drawn feeling line icons,
// each with one tiny built-in animation tied to what it represents.

export function HeartGlyph({ size = 22, animate = true }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 20 C6 15.5 2.5 12 2.5 8.2 C2.5 5.2 4.8 3 7.6 3 C9.4 3 11 4 12 5.5 C13 4 14.6 3 16.4 3 C19.2 3 21.5 5.2 21.5 8.2 C21.5 12 18 15.5 12 20 Z"
        stroke="#AE4B34" strokeWidth="1.6" strokeLinejoin="round"
        style={animate ? { transformOrigin: '12px 11px', animation: 'heart-beat 1.1s ease-in-out infinite' } : undefined}
      />
      <style>{`@keyframes heart-beat { 0%,100%{transform:scale(1);} 25%{transform:scale(1.12);} 40%{transform:scale(0.98);} }`}</style>
    </svg>
  );
}

export function LungsGlyph({ size = 22, animate = true }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3 V11" stroke="#2C5C77" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M12 11 C10 9 6 9 5 12 C4 15 5 20 8 20 C10 20 10.5 17 10.5 14"
        stroke="#2C5C77" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
        style={animate ? { animation: 'lung-breathe 3.2s ease-in-out infinite' } : undefined}
      />
      <path
        d="M12 11 C14 9 18 9 19 12 C20 15 19 20 16 20 C14 20 13.5 17 13.5 14"
        stroke="#2C5C77" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
        style={animate ? { animation: 'lung-breathe 3.2s ease-in-out infinite' } : undefined}
      />
      <style>{`@keyframes lung-breathe { 0%,100%{opacity:0.7; transform:scale(1);} 50%{opacity:1; transform:scale(1.05);} }`}</style>
    </svg>
  );
}

export function ThermoGlyph({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M13 4a2 2 0 0 0-4 0v9.5a4 4 0 1 0 4 0Z" stroke="#A8721E" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="11" cy="17.5" r="1.6" fill="#A8721E" />
    </svg>
  );
}

export function DropletGlyph({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3 C16 8.5 18.5 12 18.5 15 A6.5 6.5 0 0 1 5.5 15 C5.5 12 8 8.5 12 3 Z" stroke="#3F7A5C" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

// A flat-illustration doctor character, in the same spirit as the small
// mascot in the reference dashboard image — not a stock photo (this also
// has to work fully offline), animated with a gentle float + a breathing
// stethoscope-line pulse so it doesn't sit static on the page.
export function DoctorIllustration() {
  return (
    <svg viewBox="0 0 320 360" width="100%" height="100%" role="img" aria-label="Illustration of a doctor holding a clipboard, standing beside a monitor showing a heartbeat trace">
      <style>{`
        @keyframes doc-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes doc-trace { 0% { stroke-dashoffset: 140; } 60% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: -30; } }
        .doc-float-grp { animation: doc-float 4.5s ease-in-out infinite; transform-origin: center; }
        .doc-trace-line { stroke-dasharray: 140; animation: doc-trace 2.8s ease-in-out infinite; }
      `}</style>

      {/* ground shadow */}
      <ellipse cx="160" cy="340" rx="90" ry="10" fill="#0E7490" opacity="0.08" />

      <g className="doc-float-grp">
        {/* monitor beside the doctor */}
        <rect x="228" y="150" width="70" height="52" rx="8" fill="#1E1B39" />
        <rect x="234" y="156" width="58" height="34" rx="4" fill="#2A2650" />
        <polyline
          className="doc-trace-line"
          points="236,173 246,173 251,163 257,183 263,168 269,173 290,173"
          fill="none" stroke="#20C5A0" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
        />
        <rect x="258" y="202" width="10" height="14" fill="#1E1B39" />
        <rect x="246" y="216" width="34" height="6" rx="3" fill="#1E1B39" />

        {/* doctor body */}
        <rect x="118" y="150" width="70" height="110" rx="30" fill="#FFFFFF" stroke="#EFEBFE" strokeWidth="2" />
        <path d="M118 190 Q153 205 188 190 L188 220 Q153 232 118 220 Z" fill="#0E7490" />

        {/* stethoscope */}
        <path d="M140 160 Q140 185 153 185 Q166 185 166 160" fill="none" stroke="#20C5A0" strokeWidth="3" strokeLinecap="round" />
        <circle cx="153" cy="192" r="6" fill="#20C5A0" />

        {/* head */}
        <circle cx="153" cy="122" r="30" fill="#FFD9B3" />
        <path d="M123 118 Q123 92 153 92 Q183 92 183 118 L183 108 Q153 100 123 108 Z" fill="#3B3D46" />

        {/* clipboard */}
        <rect x="90" y="190" width="30" height="40" rx="3" fill="#FFFFFF" stroke="#EFEBFE" strokeWidth="2" />
        <rect x="96" y="198" width="18" height="2.5" fill="#DDD9F5" />
        <rect x="96" y="205" width="18" height="2.5" fill="#DDD9F5" />
        <rect x="96" y="212" width="12" height="2.5" fill="#DDD9F5" />
      </g>
    </svg>
  );
}

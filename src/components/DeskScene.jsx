// A small, illustrated scene instead of a stock photo — deliberately, since
// the real product has to work offline in a ward. Warm, human details (the
// plant, the mug) sit next to the one clinical element (the monitor trace)
// so it reads as a real place, not a tech-product hero graphic.

export default function DeskScene() {
  return (
    <svg viewBox="0 0 420 420" width="100%" height="100%" role="img" aria-label="Illustration of a calm nurses' station desk with a vitals monitor">
      <defs>
        <clipPath id="screenClip"><rect x="46" y="150" width="150" height="90" rx="6" /></clipPath>
      </defs>

      {/* soft background wash */}
      <rect x="0" y="0" width="420" height="420" fill="none" />

      {/* desk */}
      <rect x="20" y="300" width="380" height="14" rx="4" fill="#D2CBBB" opacity="0.6" />
      <rect x="20" y="314" width="10" height="60" fill="#D2CBBB" opacity="0.5" />
      <rect x="390" y="314" width="10" height="60" fill="#D2CBBB" opacity="0.5" />

      {/* monitor body */}
      <rect x="40" y="140" width="162" height="110" rx="10" fill="#1B2431" />
      <rect x="46" y="150" width="150" height="90" rx="6" fill="#16233A" />
      <rect x="108" y="250" width="26" height="18" fill="#1B2431" />
      <rect x="90" y="266" width="62" height="8" rx="4" fill="#1B2431" />

      {/* animated ECG trace on the monitor screen */}
      <g clipPath="url(#screenClip)">
        <polyline
          points="46,195 66,195 74,175 82,215 90,150 98,230 106,195 260,195"
          fill="none"
          stroke="#3F7A5C"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 320,
            strokeDashoffset: 320,
            animation: 'desk-trace 3.2s linear infinite',
          }}
        />
      </g>
      <circle cx="176" cy="163" r="3" fill="#3F7A5C">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.6s" repeatCount="indefinite" />
      </circle>

      {/* a plant, for warmth — the one deliberately "non-clinical" detail */}
      <rect x="330" y="270" width="34" height="30" rx="4" fill="#AE4B34" opacity="0.85" />
      <path d="M347,270 C330,250 328,220 347,205 C366,220 364,250 347,270 Z" fill="#3F7A5C" opacity="0.9" />
      <path d="M347,270 C338,255 336,235 347,220" fill="none" stroke="#2F5E45" strokeWidth="2" opacity="0.6" />

      {/* a mug, catching a little steam */}
      <rect x="250" y="278" width="26" height="22" rx="4" fill="#FFFFFF" stroke="#D2CBBB" strokeWidth="1.5" />
      <path d="M276,282 q10,0 10,9 q0,9 -10,9" fill="none" stroke="#D2CBBB" strokeWidth="2" />
      <path d="M260,272 q-4,-8 0,-14" fill="none" stroke="#C7C0AF" strokeWidth="1.6" strokeLinecap="round" opacity="0.7">
        <animate attributeName="d" values="M260,272 q-4,-8 0,-14;M260,272 q4,-8 0,-14;M260,272 q-4,-8 0,-14" dur="3s" repeatCount="indefinite" />
      </path>

      {/* clipboard */}
      <rect x="205" y="255" width="34" height="44" rx="3" fill="#FFFFFF" stroke="#D2CBBB" strokeWidth="1.5" />
      <rect x="211" y="264" width="22" height="2.5" fill="#D2CBBB" />
      <rect x="211" y="271" width="22" height="2.5" fill="#D2CBBB" />
      <rect x="211" y="278" width="14" height="2.5" fill="#D2CBBB" />

      <style>{`
        @keyframes desk-trace {
          0% { stroke-dashoffset: 320; }
          60% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -40; }
        }
      `}</style>
    </svg>
  );
}

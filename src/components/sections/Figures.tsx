export function OrbitFigure({ size = 360 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 360 360"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      style={{ display: "block", maxWidth: "100%", height: "auto" }}
      aria-hidden="true"
    >
      <circle cx="180" cy="180" r="160" strokeDasharray="2 5" />
      <circle cx="180" cy="180" r="112" />
      <circle cx="180" cy="180" r="64" strokeDasharray="6 4" />
      <circle cx="180" cy="180" r="6" fill="currentColor" />
      <line x1="20" y1="180" x2="340" y2="180" strokeWidth="0.5" />
      <line x1="180" y1="20" x2="180" y2="340" strokeWidth="0.5" />
      <circle cx="292" cy="180" r="4" fill="var(--bg)" />
      <circle cx="180" cy="68" r="4" fill="var(--bg)" />
      <circle cx="66.9" cy="115.5" r="4" fill="currentColor" />
      <path d="M180 20 A160 160 0 0 1 340 180" strokeWidth="2" />
      <g fontFamily="var(--font-mono)" fontSize="9" fill="var(--faint)" stroke="none">
        <text x="300" y="172">r = 112</text>
        <text x="186" y="60">apoapsis</text>
        <text x="40" y="108">Δv 0.42</text>
      </g>
    </svg>
  );
}

export function ArmFigure() {
  return (
    <svg
      viewBox="0 0 1030 220"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinejoin="round"
      strokeLinecap="round"
      style={{ display: "block", width: "100%", height: "auto" }}
      aria-hidden="true"
    >
      <rect x="40" y="170" width="140" height="30" />
      <line x1="20" y1="200" x2="1010" y2="200" stroke="var(--line-strong)" strokeDasharray="4 6" />
      <circle cx="110" cy="170" r="16" />
      <line x1="110" y1="170" x2="260" y2="60" />
      <line x1="118" y1="182" x2="268" y2="72" />
      <circle cx="264" cy="66" r="14" />
      <line x1="264" y1="66" x2="520" y2="98" />
      <line x1="262" y1="80" x2="518" y2="112" />
      <circle cx="519" cy="105" r="14" />
      <line x1="519" y1="105" x2="700" y2="150" />
      <circle cx="700" cy="150" r="10" />
      <path d="M700 150 L760 138 L790 152 M760 138 L768 118 M760 138 L768 160" stroke="var(--accent)" />
      <line x1="110" y1="170" x2="110" y2="30" stroke="var(--line-strong)" strokeDasharray="2 4" />
      <path d="M110 110 A60 60 0 0 1 160 74" stroke="var(--faint)" />
      <g fontFamily="var(--font-mono)" fontSize="10" fill="var(--faint)" stroke="none">
        <text x="146" y="104">θ1 = 36°</text>
        <text x="330" y="60">L2 = 258</text>
        <text x="880" y="192">datum</text>
      </g>
    </svg>
  );
}

/** KK monogram: two K's set back to back so their arms cross. The house signature. */
export function Monogram({ size = 32, color = "currentColor", className }: { size?: number; color?: string; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} role="img" aria-label="KAPDE monogram">
      <g fill="none" stroke={color} strokeWidth="9" strokeLinecap="butt">
        <path d="M14 4 V96 M86 4 V96" />
        <path d="M14 50 L86 4 M14 50 L86 96" />
        <path d="M86 50 L14 4 M86 50 L14 96" />
      </g>
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return <span className={`wordmark ${className ?? ""}`}>KAPDE</span>;
}

export default function Logo() {
  return <span className="lockup"><Wordmark /></span>;
}

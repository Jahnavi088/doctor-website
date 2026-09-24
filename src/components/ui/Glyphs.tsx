/**
 * Fine-line anatomical drawing: shown while the 3D scenes load, and when WebGL is unavailable.
 */
const common = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  vectorEffect: 'non-scaling-stroke' as const,
}

/** Front-view knee drawn as a fine-line anatomical study. Fallback for 3D and the mobile hero visual. */
export function KneeLineDrawing({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 520" aria-hidden="true" focusable="false">
      <g {...common} strokeWidth={1.1}>
        {/* femur */}
        <path d="M78 0v150c0 22-16 32-26 50-9 16-7 38 7 48 11 8 26 6 34-3 4-5 10-5 14 0 8 9 23 11 34 3 14-10 16-32 7-48-10-18-26-28-26-50V0" />
        <path d="M86 206c4 6 10 9 14 9s10-3 14-9" opacity={0.5} />
        {/* patella */}
        <path d="M100 176c16 0 24 12 22 26-2 12-10 22-22 26-12-4-20-14-22-26-2-14 6-26 22-26z" opacity={0.55} strokeDasharray="3 3" />
        {/* menisci */}
        <path d="M54 264c10-6 24-6 34-2M112 262c10-4 24-4 34 2" opacity={0.6} />
        {/* tibia */}
        <path d="M50 274c0-6 10-9 24-8 12 1 18 5 26 1 8 4 14 0 26-1 14-1 24 2 24 8 0 16-10 26-22 38-8 8-10 20-10 40l-2 168" />
        <path d="M50 274c0 16 10 28 22 38 8 7 10 20 10 40l2 168" />
        {/* fibula */}
        <path d="M144 318c8-6 18-2 18 8 0 6-4 10-6 14l-4 180M140 334l4 186" />
        {/* axis + measurement marks */}
        <path d="M100 0v520" strokeDasharray="2 5" opacity={0.35} />
        <circle cx="100" cy="258" r="46" opacity={0.25} />
        <path d="M40 258h-18M178 258h-18" opacity={0.5} />
      </g>
    </svg>
  )
}

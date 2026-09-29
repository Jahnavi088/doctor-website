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

/** Front-view right hip (half pelvis + proximal femur) as a fine-line study, matching the knee drawing. */
export function HipLineDrawing({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 240 520" aria-hidden="true" focusable="false">
      <g {...common} strokeWidth={1.1}>
        {/* iliac wing */}
        <path d="M18 40c30-26 92-34 140-14 22 9 30 30 22 52-8 20-26 30-30 52-3 16 2 30-6 42" />
        <path d="M18 40c-6 34 6 64 30 84 18 15 28 34 30 56" />
        {/* acetabulum (socket) */}
        <path d="M78 180c8-26 34-40 60-36 22 4 34 20 36 38" />
        <path d="M84 196c2 22 16 36 34 42" opacity={0.6} />
        {/* pubis / ischium */}
        <path d="M78 200c-10 26-14 50-6 70 8 20 30 26 44 14 10-9 8-24 2-36" opacity={0.8} />
        <path d="M86 238c10 8 22 10 30 6" opacity={0.5} />
        {/* femoral head, neck, trochanters */}
        <circle cx="136" cy="186" r="30" />
        <path d="M156 206c10 12 20 20 36 22" />
        <path d="M150 214c2 16-2 28-12 40" />
        <path d="M192 228c14-4 22 6 20 20-2 10-8 16-10 26" />
        <path d="M138 254c-8 10-10 20-6 30" opacity={0.7} />
        {/* femoral shaft */}
        <path d="M132 284c4 60 6 140 8 236M202 274c-6 64-10 150-12 246" />
        {/* axis + measurement marks */}
        <path d="M136 120v400" strokeDasharray="2 5" opacity={0.35} />
        <circle cx="136" cy="186" r="46" opacity={0.25} />
        <path d="M72 186H56M216 186h-16" opacity={0.5} />
      </g>
    </svg>
  )
}

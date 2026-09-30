import type { ReactNode } from 'react'

/**
 * Small line pictograms (24px grid, 1.6 stroke) that let a visitor recognise a condition or
 * step at a glance: joints, injuries and the practical steps of a visit.
 */
export type Picto =
  | 'knee'
  | 'hip'
  | 'arthritis'
  | 'stiffness'
  | 'ligament'
  | 'meniscus'
  | 'sport'
  | 'fracture'
  | 'calendar'
  | 'consult'
  | 'treatment'
  | 'recovery'
  | 'cap'
  | 'clock'
  | 'hospital'
  | 'badge'
  | 'shield'

const paths: Record<Picto, ReactNode> = {
  // thigh bone meeting shin bone
  knee: (
    <>
      <path d="M9 2v6.5c0 1.4-1.6 2-1.6 3.4 0 1.2 1 1.9 2.1 1.9.8 0 1.2-.4 2.5-.4s1.7.4 2.5.4c1.1 0 2.1-.7 2.1-1.9 0-1.4-1.6-2-1.6-3.4V2" />
      <path d="M8.6 15.4c.4.9 1.6 1.4 3.4 1.4s3-.5 3.4-1.4M10 17v5M14 17v5" />
    </>
  ),
  // pelvis wing, ball and thigh bone
  hip: (
    <>
      <path d="M3 5c3 .4 5.6 2 7 4.6.9 1.6 2.6 2.2 4.2 1.6" />
      <circle cx="15.6" cy="10" r="2.6" />
      <path d="m17 12.2 2.4 4.4c.6 1.1.3 2-.3 2.9L17.6 22" />
      <path d="M3 10c2 .4 3.4 1.6 4 3.4" />
    </>
  ),
  // knee joint with wear marks in the gap
  arthritis: (
    <>
      <path d="M7 2v5.5c0 1.2 1 2.5 5 2.5s5-1.3 5-2.5V2" />
      <path d="M7 22v-5.5c0-1.2 1-2.5 5-2.5s5 1.3 5 2.5V22" />
      <path d="M8.5 12h1M11.5 12h1M14.5 12h1" strokeWidth={2.2} />
    </>
  ),
  // bent joint with a limited arc of movement
  stiffness: (
    <>
      <path d="M5 21 10 12l8-4" />
      <circle cx="10" cy="12" r="1.8" />
      <path d="M14.6 14.4a5.5 5.5 0 0 0 .6-4" strokeDasharray="1.6 2" />
      <path d="m18.5 5.5 2 2M20.5 5.5l-2 2" />
    </>
  ),
  // two bones with a torn band between them
  ligament: (
    <>
      <path d="M8 2v6M16 2v6M8 16v6M16 16v6" />
      <path d="M8 8c0 1.4 1.8 2.4 4 2.4S16 9.4 16 8M8 16c0-1.4 1.8-2.4 4-2.4s4 1 4 2.4" />
      <path d="m9.4 10.8 2.2 1.2M14.6 13.2l-2.2-1.2" />
    </>
  ),
  // the C-shaped cartilage cushion with a tear
  meniscus: (
    <>
      <path d="M17.5 7.2A7 7 0 1 0 17.5 16.8" />
      <path d="M15 9.6a3.6 3.6 0 1 0 0 4.8" />
      <path d="m6.6 8.4 1.8 1.4" />
    </>
  ),
  // runner mid-stride
  sport: (
    <>
      <circle cx="14.5" cy="4" r="1.8" />
      <path d="m8 9.5 3.5-2 3 1.5 1.5 3 3 .5" />
      <path d="m11.5 7.5-1.5 6 3.5 2.5-1 5.5M10 13.5 7 17H3.5" />
    </>
  ),
  // bone with a break line
  fracture: (
    <>
      <path d="M10 2v7l2 1.5-2.5 2 2.5 2L10 16v6M15 2v6.5l-1.5 1.5 2.4 2.2-2.2 2.2L15 16v6" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
      <path d="m9 15 2 2 4-4" />
    </>
  ),
  consult: (
    <>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v7a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4h0A1.5 1.5 0 0 1 4 13.5z" />
      <path d="M8.5 8h7M8.5 11h4.5" />
    </>
  ),
  treatment: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
      <path d="M12 8v8M8 12h8" />
    </>
  ),
  recovery: (
    <>
      <circle cx="12.5" cy="3.8" r="1.8" />
      <path d="m9.5 21 2-6.5 2.5 2V21M11.5 14.5 12 8.5l3 3 3 .5M12 8.5 8 11l-1 3" />
      <path d="M17.5 14v7" />
    </>
  ),
  cap: (
    <>
      <path d="m2.5 9 9.5-4.5L21.5 9 12 13.5z" />
      <path d="M6.5 11v4.5c0 1.4 2.5 3 5.5 3s5.5-1.6 5.5-3V11M21.5 9v5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  hospital: (
    <>
      <path d="M4 21V6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5V21M2.5 21h19" />
      <path d="M12 8v5M9.5 10.5h5M10 21v-4h4v4" />
    </>
  ),
  badge: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <circle cx="9" cy="11" r="2" />
      <path d="M6 16c.5-1.4 1.6-2 3-2s2.5.6 3 2M14.5 10h3.5M14.5 13.5h2.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8 7.5 9.5 4.3-1.5 7.5-4.9 7.5-9.5V6z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
}

export function PictoIcon({ name, size = 24 }: { name: Picto; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

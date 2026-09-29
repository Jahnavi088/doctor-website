import type { ReactNode } from 'react'
import type { ServiceIcon } from '../../data/site'

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const paths: Record<ServiceIcon, ReactNode> = {
  knee: (
    <>
      <path d="M13 2v9c0 2-2 3-2.6 4.6-.7 2 .6 3.8 2.6 3.8 1 0 1.6-.6 2.3-.6s1.3.6 2.3.6c2 0 3.3-1.8 2.6-3.8C19.6 14 17.6 13 17.6 11V2" />
      <path d="M11 22.4c0 1.6 2 2.6 4.3 2.4 2.3.2 4.3-.8 4.3-2.4 0 3.4-1.8 4.4-1.8 7.6M12.8 25.2c0 1.8.6 3 .6 4.8" />
      <path d="M10.6 21h9.4" strokeDasharray="1.6 2" opacity={0.6} />
    </>
  ),
  hip: (
    <>
      <path d="M4 8c3 0 6 1.6 7.6 4.4 1.1 1.9 3.3 2.8 5.4 2.2" />
      <circle cx="18.6" cy="13" r="3.4" />
      <path d="M20.4 15.8 23.4 21c.8 1.4.4 2.4-.4 3.6L21 30" />
      <path d="M4 14c2.6.4 4.4 2 5.2 4.4" opacity={0.6} />
      <path d="M14 11.2a6.4 6.4 0 0 1 9.4-1" strokeDasharray="1.6 2" opacity={0.6} />
    </>
  ),
  robotic: (
    <>
      <path d="M5 28h10M10 28v-4" />
      <rect x="7" y="20" width="6" height="4" rx="1" />
      <path d="m10 20 5-8 7 3" />
      <circle cx="15" cy="12" r="1.8" />
      <path d="m22 15 3 5" />
      <path d="M25 20v3" />
      <path d="M21 26h8M25 24v4" strokeDasharray="1.6 2" opacity={0.7} />
    </>
  ),
  scope: (
    <>
      <circle cx="12" cy="17" r="8" />
      <path d="M12 9c-2 2.6-2 13.4 0 16" opacity={0.5} />
      <path d="m18 11 9-7" />
      <path d="m25.4 3 2.6 2.6" />
      <circle cx="15.6" cy="14" r="1.2" />
      <path d="m7 25-3 4" opacity={0.7} />
    </>
  ),
  fracture: (
    <>
      <path d="M11 3v9.4l2 1.8-2.6 2.2 2.4 2.2L11 20.4V29" />
      <path d="M19 3v9l-1.4 1.6 2.6 2.4-2.2 2.4L19 20v9" />
      <rect x="8.4" y="10" width="13.2" height="12" rx="2" opacity={0.7} />
      <circle cx="15" cy="12.6" r=".9" />
      <circle cx="15" cy="19.4" r=".9" />
    </>
  ),
  consult: (
    <>
      <path d="M8 4v7a6 6 0 0 0 12 0V4" />
      <path d="M6 4h4M18 4h4" />
      <path d="M14 17v3a6 6 0 0 0 12 0v-2" />
      <circle cx="26" cy="15.4" r="2.6" />
    </>
  ),
}

export function ServiceGlyph({ name, size = 32 }: { name: ServiceIcon; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false" {...stroke}>
      {paths[name]}
    </svg>
  )
}

export function Check({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" focusable="false" {...stroke}>
      <path d="m3 8.4 3.2 3.1L13 4.6" />
    </svg>
  )
}

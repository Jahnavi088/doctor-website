import { doctor } from '../../data/site'

/**
 * The supplied MK mark (monogram with knee joint), background removed.
 * The artwork itself is unchanged — only cropped away from the raster's name line,
 * which is set in live type beside it instead.
 */
export function Monogram({ height = 40, className }: { height?: number; className?: string }) {
  return (
    <img
      className={className}
      src="/images/mk-monogram.webp"
      width={Math.round(height * 1.207)}
      height={height}
      alt=""
      decoding="async"
    />
  )
}

export function Logo({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  return (
    <span className={`logo logo--${tone}`}>
      <Monogram height={38} className="logo__mark" />
      <span className="logo__text">
        <span className="logo__name">{doctor.name}</span>
        <span className="logo__role">Joint Replacement Surgeon</span>
      </span>
    </span>
  )
}

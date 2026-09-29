import type { ReactNode } from 'react'
import { Link } from './Link'
import { Arrow } from './ui/Icons'

/** "View full profile →" style link: a label with a round arrow button that fills on hover. */
export function MoreLink({
  href,
  children,
  tone = 'dark',
  solid = false,
  className = '',
}: {
  href: string
  children: ReactNode
  tone?: 'dark' | 'light'
  solid?: boolean
  className?: string
}) {
  return (
    <Link href={href} className={`more-link ${tone === 'light' ? 'more-link--light' : ''} ${solid ? 'more-link--solid' : ''} ${className}`}>
      <span>{children}</span>
      <span className="more-link__btn" aria-hidden="true">
        <Arrow size={16} />
      </span>
    </Link>
  )
}

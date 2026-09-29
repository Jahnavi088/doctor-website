import type { ReactNode } from 'react'
import { Link } from './Link'
import './PageHeader.css'

/**
 * Inner-page header in the home hero's bright style: breadcrumb, eyebrow, title, lede,
 * optional actions (children) and optional artwork on the right.
 */
export function PageHeader({
  id,
  crumb,
  eyebrow,
  title,
  lede,
  facts,
  art,
  backdrop,
  children,
  className = '',
}: {
  id: string
  crumb: string
  eyebrow: string
  title: ReactNode
  lede?: ReactNode
  facts?: { value: ReactNode; label: string }[]
  art?: ReactNode
  /** a wide illustration feathered into the right side, like the home hero */
  backdrop?: { src: string; srcSet?: string; position?: string; dark?: boolean }
  children?: ReactNode
  className?: string
}) {
  return (
    <header className={`phero ${art ? 'phero--art' : ''} ${backdrop ? 'phero--backdrop' : ''} ${className}`} aria-labelledby={id}>
      {backdrop && (
        <div className={`phero__backdrop ${backdrop.dark ? 'phero__backdrop--dark' : ''}`} aria-hidden="true">
          <img
            src={backdrop.src}
            srcSet={backdrop.srcSet}
            sizes="(max-width: 899px) 100vw, 55vw"
            alt=""
            style={backdrop.position ? { objectPosition: backdrop.position } : undefined}
            decoding="async"
          />
        </div>
      )}
      <div className="container phero__inner">
        <div className="phero__copy">
          <nav className="phero__crumbs phero__in" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li aria-current="page">{crumb}</li>
            </ol>
          </nav>
          <p className="phero__eyebrow phero__in" style={{ ['--i' as string]: 1 }}>
            {eyebrow}
          </p>
          <h1 id={id} className="phero__title phero__in" style={{ ['--i' as string]: 2 }}>
            {title}
          </h1>
          {lede && (
            <p className="phero__lede phero__in" style={{ ['--i' as string]: 3 }}>
              {lede}
            </p>
          )}
          {facts && (
            <ul className="phero__facts phero__in" style={{ ['--i' as string]: 4 }}>
              {facts.map((f) => (
                <li key={f.label}>
                  <strong>{f.value}</strong>
                  {f.label}
                </li>
              ))}
            </ul>
          )}
          {children && (
            <div className="phero__actions phero__in" style={{ ['--i' as string]: 4 }}>
              {children}
            </div>
          )}
        </div>
        {art && <div className="phero__art">{art}</div>}
      </div>
    </header>
  )
}

import type { ReactNode } from 'react'
import { bookHref, bookLinkProps, contact } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import { Arrow } from './ui/Icons'
import { Link } from './Link'
import './AppointmentCTA.css'

type Props = {
  title?: ReactNode
  body?: ReactNode
  bookLabel?: string
  secondary?: { href: string; label: string }
}

/** Home › 11. One clear action. Contact details follow in the Contact + Location section.
 *  Inner pages can pass their own wording and secondary link. */
export function AppointmentCTA({
  title = 'Ready to take the next step?',
  body,
  bookLabel = 'Book Appointment',
  secondary = { href: '/contact', label: 'Contact & directions' },
}: Props = {}) {
  const ref = useReveal<HTMLElement>()
  return (
    <section id="appointment" className="cta" aria-labelledby="cta-title" ref={ref}>
      <div className="container">
        <div className="cta__panel">
          <h2 id="cta-title" className="cta__title reveal">
            {title}
          </h2>
          <p className="cta__body reveal" style={{ ['--i' as string]: 1 }}>
            {body ?? (
              <>
                Book a consultation to talk through your knee or hip concerns and the treatment options available.
                {contact.timings && <> Consultations: {contact.timings}.</>}
              </>
            )}
          </p>
          <div className="cta__actions reveal" style={{ ['--i' as string]: 2 }}>
            <a href={bookHref} {...bookLinkProps} className="btn cta__btn">
              {bookLabel} <Arrow />
            </a>
            <Link href={secondary.href} className="cta__link">
              {secondary.label} <Arrow size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

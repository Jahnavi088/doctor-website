import { bookHref, bookLinkProps, contact } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import { Arrow } from './ui/Icons'
import { Link } from './Link'
import './AppointmentCTA.css'

/** Home › 11. One clear action. Contact details follow in the Contact + Location section. */
export function AppointmentCTA() {
  const ref = useReveal<HTMLElement>()
  return (
    <section id="appointment" className="cta" aria-labelledby="cta-title" ref={ref}>
      <div className="container">
        <div className="cta__panel">
          <h2 id="cta-title" className="cta__title reveal">
            Ready to take the next step?
          </h2>
          <p className="cta__body reveal" style={{ ['--i' as string]: 1 }}>
            Book a consultation to talk through your knee or hip concerns and the treatment options available.
            {contact.timings && <> Consultations: {contact.timings}.</>}
          </p>
          <div className="cta__actions reveal" style={{ ['--i' as string]: 2 }}>
            <a href={bookHref} {...bookLinkProps} className="btn cta__btn">
              Book Appointment <Arrow />
            </a>
            <Link href="/contact" className="cta__link">
              Contact &amp; directions <Arrow size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

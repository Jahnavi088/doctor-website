import { bookHref, bookLinkProps, contact, doctor } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import { Arrow } from './ui/Icons'
import './AppointmentCTA.css'

/**
 * Contact rows render the real value when it exists in `contact` (src/data/site.ts),
 * otherwise a clearly-marked placeholder — nothing is invented.
 */
const rows = [
  { label: 'Appointments', value: contact.phone, href: contact.phone && `tel:${contact.phone.replace(/\s+/g, '')}`, ph: 'Phone number to be added' },
  { label: 'Email', value: contact.email, href: contact.email && `mailto:${contact.email}`, ph: 'Email to be added' },
  { label: 'Online booking', value: contact.bookingUrl && contact.bookingLabel, href: contact.bookingUrl, ph: 'Booking link to be added' },
  { label: 'Timings', value: contact.timings, href: null, ph: 'To be confirmed' },
]

export function AppointmentCTA() {
  const ref = useReveal<HTMLElement>()
  const hasDirect = Boolean(contact.bookingUrl || contact.phone)
  return (
    <section id="appointment" className="cta" aria-labelledby="cta-title" ref={ref}>
      <div className="container">
        <div className="cta__panel">
          <div className="cta__copy">
            <p className="eyebrow reveal">Appointments</p>
            <h2 id="cta-title" className="h2 reveal" style={{ ['--i' as string]: 1, marginTop: 20 }}>
              Ready to Take
              <br />
              the Next Step?
            </h2>
            <p className="cta__body reveal" style={{ ['--i' as string]: 2 }}>
              Schedule a consultation with {doctor.name}.
            </p>
            <div className="cta__actions reveal" style={{ ['--i' as string]: 3 }}>
              <a href={hasDirect ? bookHref : '#contact-details'} {...(hasDirect ? bookLinkProps : {})} className="btn btn--light">
                Book an Appointment <Arrow />
              </a>
              <a href="#contact-details" className="btn cta__ghost">
                Contact the Clinic
              </a>
            </div>
          </div>

          <dl id="contact-details" className="cta__details reveal" style={{ ['--i' as string]: 2 }} tabIndex={-1}>
            {rows.map((r) => (
              <div key={r.label}>
                <dt>{r.label}</dt>
                <dd>
                  {r.value && r.href ? (
                    /^https?:/.test(r.href) ? (
                      <a href={r.href} target="_blank" rel="noopener noreferrer">
                        {r.value}
                        <span className="visually-hidden"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      <a href={r.href}>{r.value}</a>
                    )
                  ) : r.value ? (
                    r.value
                  ) : (
                    <span className="cta__ph" data-placeholder>
                      {r.ph}
                    </span>
                  )}
                </dd>
              </div>
            ))}
            <div>
              <dt>Location</dt>
              <dd>
                {doctor.hospital}, {doctor.city}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}

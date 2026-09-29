import { contact, doctor } from '../data/site'
import { useInView, useReveal } from '../hooks/useReveal'
import { ArrowUpRight } from './ui/Icons'
import './HospitalSection.css'

export function HospitalSection() {
  const ref = useReveal<HTMLElement>()
  const [mapRef, mapNear] = useInView<HTMLDivElement>('400px')
  const q = encodeURIComponent(contact.mapQuery)

  return (
    <section id="hospital" className="section hs hs--sky hospital" aria-labelledby="hospital-title" ref={ref}>
      <div className="container hospital__grid">
        <div className="hospital__info">
          <p className="hs-kicker reveal">Where to find us</p>
          <h2 id="hospital-title" className="hs-title reveal" style={{ ['--i' as string]: 1 }}>
            {doctor.hospital}, <span>{doctor.city}.</span>
          </h2>
          <p className="hospital__lede reveal" style={{ ['--i' as string]: 2 }}>
            Dr. Manoj practises at {doctor.hospital}, {doctor.city}.
          </p>

          <dl className="hospital__details reveal" style={{ ['--i' as string]: 3 }}>
            <div>
              <dt>Address</dt>
              <dd>
                <address>
                  {contact.address.map((l) => (
                    <span key={l}>{l}</span>
                  ))}
                </address>
              </dd>
            </div>
            <div>
              <dt>Consultation timings</dt>
              {contact.timings ? (
                <dd>
                  {contact.timings}
                </dd>
              ) : (
                <dd className="placeholder">To be confirmed with the hospital</dd>
              )}
            </div>
          </dl>

          <div className="hospital__links reveal" style={{ ['--i' as string]: 4 }}>
            <a className="hospital__link" href={`https://www.google.com/maps/search/?api=1&query=${q}`} target="_blank" rel="noopener noreferrer">
              Get directions <ArrowUpRight />
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
            <a className="hospital__link" href={contact.hospitalUrl} target="_blank" rel="noopener noreferrer">
              Hospital website <ArrowUpRight />
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </div>
        </div>

        <div className="hospital__map reveal" ref={mapRef} style={{ ['--i' as string]: 2 }}>
          {mapNear ? (
            <iframe
              title={`Map showing ${doctor.hospital}, ${doctor.city}`}
              src={`https://www.google.com/maps?q=${q}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="hospital__map-ph" aria-hidden="true" />
          )}
        </div>
      </div>
    </section>
  )
}

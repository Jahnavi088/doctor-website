import { bookHref, bookLinkProps, contact, disclaimer, doctor, nav, services } from '../data/site'
import { Link } from './Link'
import { Monogram } from './ui/Logo'
import { Arrow, ArrowUpRight } from './ui/Icons'
import './Footer.css'

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapQuery)}`

/** Deep-navy footer: identity + booking, pages, treatments, visit details, then a slim legal bar. */
export function Footer({ path }: { path: string }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Link href="/" className="footer__logo" aria-label={`${doctor.name}, home`}>
              <span className="footer__mark">
                <Monogram height={34} />
              </span>
              <span>
                <span className="footer__name">{doctor.name}</span>
                <span className="footer__role">Orthopaedic &amp; Joint Replacement Surgeon</span>
              </span>
            </Link>
            <p className="footer__about">
              Knee and hip care, joint replacement and arthroscopy at {doctor.hospital}, {doctor.city}.
            </p>
            <div className="footer__actions">
              <a href={bookHref} {...bookLinkProps} className="btn footer__book">
                Book Appointment <Arrow size={15} />
              </a>
              <Link href="/note" className="footer__note">
                Leave us a note <Arrow size={14} />
              </Link>
            </div>
          </div>

          <nav className="footer__col" aria-label="Pages">
            <h2 className="footer__h">Pages</h2>
            <ul>
              {nav.map((n) => (
                <li key={n.label}>
                  <Link href={n.path!} aria-current={n.path === path ? 'page' : undefined}>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer__col" aria-label="Treatments">
            <h2 className="footer__h">Treatments</h2>
            <ul>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services#${s.slug}`}>{s.title}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__col">
            <h2 className="footer__h">Visit</h2>
            <p className="footer__strong">{doctor.hospital}</p>
            <address className="footer__addr">
              {contact.address.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </address>
            {contact.timings && (
              <p className="footer__time">
                <span>Consultations</span>
                {contact.timings}
              </p>
            )}
            <a className="footer__map" href={mapsUrl} target="_blank" rel="noopener noreferrer">
              Get directions <ArrowUpRight size={13} />
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()} {doctor.name}. All rights reserved.
          </p>
          <p className="footer__disclaimer">{disclaimer}</p>
        </div>
      </div>
    </footer>
  )
}

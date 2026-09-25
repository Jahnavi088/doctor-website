import { bookHref, bookLinkProps, contact, disclaimer, doctor, footerNav } from '../data/site'
import { sectionHref } from '../router'
import { Link } from './Link'
import { Monogram } from './ui/Logo'
import { Arrow } from './ui/Icons'
import './Footer.css'

export function Footer({ path }: { path: string }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Monogram height={56} />
            <p className="footer__name">{doctor.name}</p>
            <p className="footer__meta">
              {doctor.qualifications}
              <br />
              {doctor.role}
              <br />
              {doctor.hospital}, {doctor.city}
            </p>
          </div>

          <nav className="footer__col" aria-label="Footer">
            <h2 className="footer__h">Navigation</h2>
            <ul>
              {footerNav.map((n) => (
                <li key={n.label}>
                  <Link href={n.path ?? sectionHref(n.id!, path)}>{n.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__col">
            <h2 className="footer__h">Contact</h2>
            <address>
              {doctor.hospital}
              <br />
              {contact.address.map((l) => (
                <span key={l}>
                  {l}
                  <br />
                </span>
              ))}
            </address>
            {contact.phone && (
              <p>
                <a href={`tel:${contact.phone.replace(/\s+/g, '')}`}>{contact.phone}</a>
              </p>
            )}
            {contact.email && (
              <p>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </p>
            )}
            <a href={bookHref} {...bookLinkProps} className="btn btn--sm footer__cta">
              Book Appointment <Arrow size={14} />
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__disclaimer">{disclaimer}</p>
          <p className="footer__copy">© {new Date().getFullYear()} {doctor.name}</p>
        </div>
      </div>
    </footer>
  )
}

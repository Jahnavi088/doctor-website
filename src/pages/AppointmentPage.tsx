import { contact, contactFaqs, doctor } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import { PageHeader } from '../components/PageHeader'
import { Head } from '../components/HomeSections'
import { ContactOptions } from '../components/ContactOptions'
import { NotePrompt } from '../components/NoteForm'
import { Faq } from '../components/Faq'
import { Arrow, ArrowUpRight } from '../components/ui/Icons'
import { useDocumentTitle } from './useDocumentTitle'
import '../components/HomeSections.css'
import './Appointment.css'

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapQuery)}`

const bring = [
  'Previous reports, X-rays or MRI scans',
  'A list of the medicines you take',
  'The questions you would like answered',
]

/** Header art: the doctor in the navy frame used on the home page, with a frosted hours tag. */
function Portrait() {
  const [days, time] = contact.timings?.split(', ') ?? []
  return (
    <figure className="appt-portrait">
      <img
        src="/images/dr-manoj-820.webp"
        srcSet="/images/dr-manoj-520.webp 520w, /images/dr-manoj-820.webp 820w"
        sizes="360px"
        width={820}
        height={1226}
        alt="Dr. Manoj Kumar Jagarlamudi in blue surgical scrubs"
        decoding="async"
      />
      {days && (
        <figcaption className="appt-portrait__tag">
          <span>Consultations</span>
          <strong>{days}</strong>
          {time}
        </figcaption>
      )}
    </figure>
  )
}

function Visit() {
  const ref = useReveal<HTMLElement>()
  return (
    <section className="section hs hs--sky appt-visit" aria-labelledby="visit-title" ref={ref}>
      <div className="container">
        <Head
          id="visit-title"
          kicker="Your visit"
          title={
            <>
              Before you <span>come in.</span>
            </>
          }
        />
        <div className="appt-visit__grid">
          <div className="appt-visit__block reveal">
            <h3>Consultation hours</h3>
            {contact.timings ? <p className="appt-visit__big">{contact.timings}</p> : <p className="appt-visit__big">To be confirmed</p>}
            <p className="appt-visit__note">Please confirm your slot when you book.</p>
          </div>
          <div className="appt-visit__block reveal" style={{ ['--i' as string]: 1 }}>
            <h3>Where</h3>
            <p className="appt-visit__big">{doctor.hospital}</p>
            <address>
              {contact.address.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </address>
            <a className="appt-visit__link" href={mapsUrl} target="_blank" rel="noopener noreferrer">
              Get directions <ArrowUpRight size={13} />
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </div>
          <div className="appt-visit__block reveal" style={{ ['--i' as string]: 2 }}>
            <h3>What to bring</h3>
            <ul>
              {bring.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export function AppointmentPage() {
  useDocumentTitle(`Book an appointment | ${doctor.name}`)
  const ref = useReveal<HTMLElement>()
  return (
    <div className="home-skin">
      <PageHeader
        id="appt-title"
        crumb="Book an appointment"
        eyebrow="Appointments"
        title={
          <>
            Book your
            <br />
            <em>consultation</em>
          </>
        }
        lede={`See ${doctor.name} at ${doctor.hospital}, ${doctor.city}. Book online in a minute, or use one of the other options below.`}
        art={<Portrait />}
        className="appt-head"
      >
        {contact.bookingUrl && (
          <a href={contact.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn phero__btn">
            {contact.bookingLabel} <ArrowUpRight size={15} />
            <span className="visually-hidden"> (opens in a new tab)</span>
          </a>
        )}
        <a href="#ways" className="phero__link">
          Other ways to book <Arrow size={14} />
        </a>
      </PageHeader>

      <section id="ways" className="section hs appt-ways" aria-labelledby="ways-title" ref={ref}>
        <div className="container">
          <Head
            id="ways-title"
            kicker="Ways to book"
            title={
              <>
                Choose what is <span>easiest for you.</span>
              </>
            }
          />
          <ContactOptions keys={['whatsapp', 'phone']} highlight="whatsapp" />
          <NotePrompt title="Not sure which appointment you need?" text="Send a short note and the clinic team will help." />
        </div>
      </section>

      <Visit />

      <Faq
        id="faq"
        items={[contactFaqs[0], contactFaqs[2], contactFaqs[3], contactFaqs[5]]}
        title={
          <>
            Booking
            <br />
            <span className="faq__accent">questions.</span>
          </>
        }
        lede="Practical answers about booking and your first visit."
      />
    </div>
  )
}

import { bookHref, bookLinkProps, contact, contactFaqs, doctor } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import { PageHeader } from '../components/PageHeader'
import { Head } from '../components/HomeSections'
import { ContactOptions } from '../components/ContactOptions'
import { NotePrompt } from '../components/NoteForm'
import { HospitalSection } from '../components/HospitalSection'
import { Faq } from '../components/Faq'
import { Arrow, ArrowUpRight } from '../components/ui/Icons'
import { useDocumentTitle } from './useDocumentTitle'
import '../components/HomeSections.css'
import './Contact.css'

/** Header: hours and place set straight on the page, the two things most visitors come here for. */
function HeaderHours() {
  const [days, time] = contact.timings?.split(', ') ?? []
  return (
    <div className="chours">
      <p className="chours__label">Consultation hours</p>
      {days ? (
        <>
          <p className="chours__days">{days}</p>
          {time && <p className="chours__time">{time}</p>}
        </>
      ) : (
        <p className="chours__days">To be confirmed</p>
      )}
      <div className="chours__place">
        <p className="chours__label">Where to find us</p>
        <p className="chours__addr">
          <strong>{doctor.hospital}</strong>
          Kanuru, {doctor.city} 520007
        </p>
        <a href="#hospital" className="phero__link">
          Map &amp; directions <Arrow size={14} />
        </a>
      </div>
    </div>
  )
}

function Ways() {
  const ref = useReveal<HTMLElement>()
  return (
    <section id="ways" className="section hs" aria-labelledby="ways-title" ref={ref}>
      <div className="container">
        <Head
          id="ways-title"
          kicker="Get in touch"
          title={
            <>
              How can we <span>help you?</span>
            </>
          }
        />
        <ContactOptions keys={['whatsapp', 'phone', 'email']} highlight="whatsapp" />
        <NotePrompt title="Have a question before you book?" text="Send a short note and the clinic team will get back to you." />
      </div>
    </section>
  )
}

export function ContactPage() {
  useDocumentTitle(`Contact | ${doctor.name}`)
  return (
    <div className="home-skin">
      <PageHeader
        id="contact-title"
        crumb="Contact"
        eyebrow="Contact & appointments"
        title={
          <>
            Book a visit or
            <br />
            <em>get in touch</em>
          </>
        }
        lede={`Consult ${doctor.name} at ${doctor.hospital}, ${doctor.city}. Book an appointment, find directions, or send a question before you book.`}
        art={<HeaderHours />}
      >
        <a href={bookHref} {...bookLinkProps} className="btn phero__btn">
          Book Appointment <ArrowUpRight size={15} />
        </a>
        <a href="#ways" className="phero__link">
          Other ways to reach us <Arrow size={14} />
        </a>
      </PageHeader>

      <Ways />
      <HospitalSection />
      <Faq
        id="faq"
        items={contactFaqs}
        title={
          <>
            Before your
            <br />
            <span className="faq__accent">appointment.</span>
          </>
        }
        lede="Practical answers about booking, timings and your first visit."
      />
    </div>
  )
}

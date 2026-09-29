import { bookHref, bookLinkProps, doctor, services, treatmentFaqs, type Service } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import { PageHeader } from '../components/PageHeader'
import { Faq } from '../components/Faq'
import { AppointmentCTA } from '../components/AppointmentCTA'
import { MoreLink } from '../components/MoreLink'
import { Link } from '../components/Link'
import { Arrow } from '../components/ui/Icons'
import { useDocumentTitle } from './useDocumentTitle'
import '../components/HomeSections.css'
import './Services.css'

/** Service photos: Pixabay Content License, see README › Assets. */
const photoAlt: Record<string, string> = {
  'knee-replacement': 'X-ray of a knee after replacement, showing the implant components',
  'hip-replacement': 'An older couple walking hand in hand along a city street',
  'robotic-joint-replacement': 'A surgical team at work in an operating theatre',
  arthroscopy: 'A surgical team performing a camera-guided keyhole procedure',
  'trauma-care': 'X-ray of an ankle fracture fixed with a plate and screws',
  'joint-pain-consultation': 'A clinician examining a patient’s knee',
}

/** One treatment: a large photo beside its summary, sides alternating down the page. */
function ServiceRow({ s, i }: { s: Service; i: number }) {
  const ref = useReveal<HTMLElement>()
  return (
    <article id={s.slug} className="svr" aria-labelledby={`${s.slug}-title`} ref={ref}>
      <figure className="svr__photo reveal">
        <img src={`/images/service-photos/${s.slug}.webp`} alt={photoAlt[s.slug] ?? ''} width={720} height={540} loading="lazy" decoding="async" />
      </figure>
      <div className="svr__body">
        <p className="svr__num reveal">
          {String(i + 1).padStart(2, '0')} <span>/ {String(services.length).padStart(2, '0')}</span>
        </p>
        <h2 id={`${s.slug}-title`} className="svr__title reveal" style={{ ['--i' as string]: 1 }}>
          {s.title}
        </h2>
        <p className="svr__lead reveal" style={{ ['--i' as string]: 2 }}>
          {s.text}
        </p>
        <div className="svr__facts reveal" style={{ ['--i' as string]: 3 }}>
          <div>
            <h3>What it may involve</h3>
            <ul>
              {s.involves.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Commonly considered for</h3>
            <ul>
              {s.consideredFor.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="svr__actions reveal" style={{ ['--i' as string]: 4 }}>
          <a href={bookHref} {...bookLinkProps} className="btn svr__btn">
            Book Appointment <Arrow size={15} />
          </a>
          <Link href="/note" className="svr__ask">
            Ask a question <Arrow size={14} />
          </Link>
        </div>
      </div>
    </article>
  )
}

export function ServicesPage() {
  useDocumentTitle(`Services | ${doctor.name}`)
  return (
    <div className="home-skin">
      <PageHeader
        id="services-title"
        crumb="Services"
        eyebrow="Services & treatments"
        title={
          <>
            Treatments that help
            <br />
            you <em>move again</em>
          </>
        }
        lede={`Joint replacement, robotic-assisted surgery, arthroscopy and trauma care, with every option explained before a decision is made.`}
        art={
          <figure className="phero-photo">
            <img
              src="/images/expertise-photos/robotic.webp"
              alt="A gloved hand positioning the lights above an operating table"
              width={800}
              height={534}
              fetchPriority="high"
              decoding="async"
            />
          </figure>
        }
      >
        <a href="#knee-replacement" className="btn phero__btn">
          See all treatments <Arrow />
        </a>
        <a href="#faq" className="phero__link">
          Common questions <Arrow size={14} />
        </a>
      </PageHeader>

      <div className="section svc-list">
        <div className="container">
          {services.map((s, i) => (
            <ServiceRow key={s.slug} s={s} i={i} />
          ))}
        </div>
      </div>

      <Faq
        items={treatmentFaqs}
        title={
          <>
            Questions about
            <br />
            <span className="faq__accent">treatment.</span>
          </>
        }
        lede="General answers to common questions. Your own plan is always discussed in person."
        aside={<MoreLink href="/note">Ask your own question</MoreLink>}
      />

      <AppointmentCTA />
    </div>
  )
}

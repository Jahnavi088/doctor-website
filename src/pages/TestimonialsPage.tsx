import { useMemo, useState } from 'react'
import { bookHref, bookLinkProps, doctor } from '../data/site'
import { featuredTestimonial, procedureLabel, procedures, testimonials, type Procedure, type Testimonial } from '../data/media'
import { useReveal } from '../hooks/useReveal'
import { PageHeader } from '../components/PageHeader'
import { PatientJourney } from '../components/PatientJourney'
import { AppointmentCTA } from '../components/AppointmentCTA'
import { Head } from '../components/HomeSections'
import { Arrow } from '../components/ui/Icons'
import { PictoIcon, type Picto } from '../components/ui/Pictos'
import { PlayIcon, QuoteMark, SampleTag, Segmented, useLightbox, type LightboxItem } from '../components/media/Media'
import { useDocumentTitle } from './useDocumentTitle'
import '../components/HomeSections.css'
import './Testimonials.css'

/* ------------------------------------------------------------------
   1. Hero art: an oversized quotation mark over a faint clinical grid, with one
   frosted note on how stories are published. No anatomy, no faces.
------------------------------------------------------------------- */
function HeroArt() {
  return (
    <div className="tx-art" aria-hidden="true">
      <span className="tx-art__grid" />
      <QuoteMark className="tx-art__mark" />
      <p className="tx-art__note">
        <span className="tx-art__rule" />
        Every story on this page is shared in the patient’s own words, with their consent.
      </p>
    </div>
  )
}

/** Small meta line: treatment · date, plus the labels that apply. */
function Meta({ t }: { t: Testimonial }) {
  return (
    <p className="tmeta">
      <span className="tmeta__proc">{procedureLabel(t.procedure)}</span>
      {t.date && <span className="tmeta__date">{t.date}</span>}
      {t.verified && (
        <span className="tmeta__verified">
          <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Verified patient
        </span>
      )}
      {t.placeholder && <SampleTag />}
    </p>
  )
}

/* ------------------------------------------------------------------
   2. Featured story: one large editorial quote.
------------------------------------------------------------------- */
function FeaturedStory({ t }: { t: Testimonial }) {
  const ref = useReveal<HTMLElement>()
  return (
    <section className="section hs tfeat" aria-labelledby="tfeat-title" ref={ref}>
      <div className="container tfeat__inner">
        <div className="tfeat__side reveal">
          <p className="hs-kicker">Featured story</p>
          <h2 id="tfeat-title" className="visually-hidden">
            Featured patient story
          </h2>
          <Meta t={t} />
        </div>
        <figure className="tfeat__figure reveal" style={{ ['--i' as string]: 1 }}>
          <QuoteMark className="tfeat__mark" />
          <blockquote className="tfeat__quote">{t.quote}</blockquote>
          <figcaption className="tfeat__by">
            <span className="tfeat__dash" aria-hidden="true" />
            <span>
              <strong>{t.name}</strong>
              <span>{procedureLabel(t.procedure)}</span>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------
   3 + 4. Patient stories: filter by treatment, two staggered columns.
------------------------------------------------------------------- */
type Filter = 'all' | Procedure

function Stories({ items }: { items: Testimonial[] }) {
  const ref = useReveal<HTMLElement>()
  const [filter, setFilter] = useState<Filter>('all')
  const shown = useMemo(() => (filter === 'all' ? items : items.filter((t) => t.procedure === filter)), [filter, items])
  const options = [
    { id: 'all' as Filter, label: 'All', count: items.length },
    ...procedures.map((p) => ({ id: p.id as Filter, label: p.label, count: items.filter((t) => t.procedure === p.id).length })),
  ]

  // consented photos and videos open in one viewer
  const withMedia = shown.filter((t) => t.photo || t.video)
  const lb = useLightbox(
    withMedia.map<LightboxItem>((t) =>
      t.video
        ? { kind: 'video', src: t.video.src, poster: t.video.poster, caption: t.name, meta: procedureLabel(t.procedure) }
        : { kind: 'photo', src: t.photo!.src, alt: t.photo!.alt, caption: t.name, meta: procedureLabel(t.procedure) },
    ),
  )

  return (
    <section id="stories" className="section hs hs--sky" aria-labelledby="stories-title" ref={ref}>
      <div className="container">
        <Head
          id="stories-title"
          kicker="Patient stories"
          title={
            <>
              In their <span>own words.</span>
            </>
          }
        />
        <div className="tstories__tools reveal" style={{ ['--i' as string]: 2 }}>
          <Segmented label="Show stories for" options={options} value={filter} onChange={setFilter} />
        </div>

        {shown.length > 0 ? (
          <ol className="tstories" key={filter}>
            {shown.map((t, i) => (
              <li key={t.quote} className="tstory media-in" style={{ ['--i' as string]: i }}>
                <article className="tstory__body" aria-label={`${procedureLabel(t.procedure)} story`}>
                  <header className="tstory__head">
                    <span className="tstory__num">{String(i + 1).padStart(2, '0')}</span>
                    <Meta t={t} />
                  </header>
                  <QuoteMark className="tstory__mark" />
                  <blockquote className="tstory__quote">{t.quote}</blockquote>
                  <footer className="tstory__by">
                    <strong>{t.name}</strong>
                    {(t.photo || t.video) && (
                      <button
                        type="button"
                        className="tstory__media"
                        onClick={() => lb.open(withMedia.indexOf(t))}
                        aria-label={t.video ? `Play ${t.name}’s video` : `View ${t.name}’s photo`}
                      >
                        <img src={t.video ? t.video.poster : t.photo!.src} alt="" loading="lazy" decoding="async" />
                        {t.video && (
                          <span className="tstory__play">
                            <PlayIcon size={12} />
                          </span>
                        )}
                      </button>
                    )}
                  </footer>
                </article>
              </li>
            ))}
          </ol>
        ) : (
          <p className="tstories__empty">No stories for this treatment yet.</p>
        )}
      </div>
      {lb.node}
    </section>
  )
}

/* ------------------------------------------------------------------
   6. Approach: three principles set as type, not cards.
------------------------------------------------------------------- */
const principles: { title: string; text: string; picto: Picto }[] = [
  { title: 'Clear Communication', text: 'Your condition, the options and the reasons behind each recommendation, explained in plain language.', picto: 'consult' },
  { title: 'Personalized Treatment', text: 'A plan shaped by your symptoms, examination, imaging and the activities you want to return to.', picto: 'treatment' },
  { title: 'Focused Recovery', text: 'Rehabilitation guidance and follow-up visits to support a steady return to everyday movement.', picto: 'recovery' },
]

function Approach() {
  const ref = useReveal<HTMLElement>()
  return (
    <section className="section hs hs--sky tcare" aria-labelledby="tcare-title" ref={ref}>
      <div className="container tcare__inner">
        <Head
          id="tcare-title"
          kicker="Our approach"
          title={
            <>
              Care that begins <span>with understanding.</span>
            </>
          }
          lede={`How ${doctor.shortName} works with every patient, from the first conversation to follow-up.`}
        />
        <ol className="tcare__list">
          {principles.map((p, i) => (
            <li key={p.title} className="tcare__item reveal" style={{ ['--i' as string]: i + 1 }}>
              <span className="tcare__icon" aria-hidden="true">
                <PictoIcon name={p.picto} size={22} />
              </span>
              <span className="tcare__num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="tcare__title">{p.title}</h3>
              <p className="tcare__text">{p.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* 5. From treatment to movement — the shared journey component, five steps. */
const journeySteps: { title: string; text: string; picto: Picto }[] = [
  { title: 'Consultation', text: 'Your symptoms, history and goals, discussed in person.', picto: 'consult' },
  { title: 'Treatment Plan', text: 'Surgical and non-surgical options explained and agreed together.', picto: 'calendar' },
  { title: 'Procedure', text: 'Treatment carried out as planned, with clear instructions before and after.', picto: 'hospital' },
  { title: 'Recovery', text: 'Rehabilitation guidance and follow-up visits at each stage.', picto: 'recovery' },
  { title: 'Return to Movement', text: 'A gradual return to the everyday activities that matter to you.', picto: 'sport' },
]

export function TestimonialsPage() {
  useDocumentTitle(`Patient experiences | ${doctor.name}`)
  const rest = testimonials.filter((t) => t !== featuredTestimonial)

  return (
    <div className="home-skin tx">
      <PageHeader
        id="testimonials-title"
        crumb="Patient experiences"
        eyebrow="Patient experiences"
        title={
          <>
            Stories of care, recovery
            <br />
            <em>&amp; renewed mobility</em>
          </>
        }
        lede="Read experiences shared by patients who received orthopaedic care with a focus on clear communication, personalized treatment and recovery."
        art={<HeroArt />}
      >
        <a href="#stories" className="btn phero__btn">
          Read patient stories <Arrow />
        </a>
        <a href={bookHref} {...bookLinkProps} className="phero__link">
          Book an Appointment <Arrow size={14} />
        </a>
      </PageHeader>

      {featuredTestimonial && <FeaturedStory t={featuredTestimonial} />}
      <Stories items={rest} />
      <PatientJourney
        steps={journeySteps}
        eyebrow="Patient journey"
        title={
          <>
            From treatment
            <br />
            to movement
          </>
        }
        lede="Five steps, each explained before it happens, so you always know what comes next."
      />
      <Approach />
      <AppointmentCTA
        title="Take the next step toward better mobility."
        body="Book a consultation to discuss your condition and available treatment options."
        bookLabel="Book an Appointment"
        secondary={{ href: '/expertise', label: 'View Expertise' }}
      />
    </div>
  )
}

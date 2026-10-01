import { useEffect, useState, type ReactNode } from 'react'
import { approach, contact, doctor, services } from '../data/site'
import { featuredTestimonial, procedureLabel, testimonials } from '../data/media'
import { useInView, useReducedMotion, useReveal } from '../hooks/useReveal'
import { QuoteMark, SampleTag, VideoTile, useLightbox, type LightboxItem } from './media/Media'
import { ConditionGroups } from './ConditionGroups'
import { Link } from './Link'
import { Arrow, ArrowUpRight } from './ui/Icons'
import './HomeSections.css'

/**
 * The home page is an overview: each section here is short and links on to the page
 * that holds the full detail (Profile, Expertise, Services, Testimonials, Contact).
 */

export function Head({ id, kicker, title, lede, link }: { id: string; kicker: string; title: ReactNode; lede?: string; link?: { href: string; label: string } }) {
  return (
    <header className="hs-head">
      <div>
        <p className="hs-kicker reveal">{kicker}</p>
        <h2 id={id} className="hs-title reveal" style={{ ['--i' as string]: 1 }}>
          {title}
        </h2>
        {lede && (
          <p className="hs-lede reveal" style={{ ['--i' as string]: 2 }}>
            {lede}
          </p>
        )}
      </div>
      {link && (
        <Link href={link.href} className="hs-more reveal" style={{ ['--i' as string]: 2 }}>
          {link.label} <Arrow size={14} />
        </Link>
      )}
    </header>
  )
}

/* ---------- 5. Conditions we treat ---------- */
export function Conditions() {
  const ref = useReveal<HTMLElement>()
  return (
    <section className="section hs hs--sky" aria-labelledby="conditions-title" ref={ref}>
      <div className="container">
        <Head
          id="conditions-title"
          kicker="Conditions we treat"
          title={
            <>
              What brings patients <span>to the clinic?</span>
            </>
          }
        />
        <ConditionGroups />
      </div>
    </section>
  )
}

/* ---------- 6. Services: a bento of five treatments, the first one large (all six are on /services) ---------- */
const homeServiceSlugs = ['knee-replacement', 'hip-replacement', 'robotic-joint-replacement', 'arthroscopy', 'trauma-care']
const homeServices = homeServiceSlugs.map((slug) => services.find((s) => s.slug === slug)!)

export function ServicesOverview() {
  const ref = useReveal<HTMLElement>()
  return (
    <section className="section hs" aria-labelledby="svc-title" ref={ref}>
      <div className="container">
        <Head
          id="svc-title"
          kicker="Services"
          title={
            <>
              Treatments and <span>services.</span>
            </>
          }
          link={{ href: '/services', label: `View all ${services.length} services` }}
        />
        <ol className="bento">
          {homeServices.map((s, i) => (
            <li key={s.slug} className={`bento__tile reveal ${i === 0 ? 'bento__tile--lead' : ''}`} style={{ ['--i' as string]: i }}>
              <Link href={`/services#${s.slug}`} className="bento__link">
                <img src={`/images/service-photos/${s.slug}.webp`} alt="" width={720} height={540} loading="lazy" decoding="async" />
                <span className="bento__body">
                  <span className="bento__title">{s.title}</span>
                  <span className="bento__text">{s.short}</span>
                </span>
                <span className="bento__go" aria-hidden="true">
                  <ArrowUpRight size={16} />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ---------- 7. Approach to care: steps on the left, a photo for the open step on the right ---------- */
const STEP_MS = 5000

const approachPhotos = [
  { src: '/images/expertise-areas/knee-care.webp', alt: 'A knee fitted with sensor pads during an examination' },
  { src: '/images/expertise-areas/joint-replacement.webp', alt: 'A knee X-ray used to plan treatment' },
  { src: '/images/expertise-areas/arthroscopy.webp', alt: 'An orthopaedic surgical team in theatre' },
  { src: '/images/experience-walking.webp', alt: 'A group of older adults walking outdoors with walking poles' },
]

/**
 * Image tabs: one step is open at a time (its detail points shown, its photo on the right).
 * Hover, click or focus opens a step; it also moves on by itself, paused while the
 * visitor is interacting and off entirely with reduced motion.
 */
function ApproachSteps() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [ref, inView] = useInView<HTMLDivElement>('0px')
  const reduced = useReducedMotion()
  const auto = inView && !paused && !reduced

  useEffect(() => {
    if (!auto) return
    const t = window.setTimeout(() => setActive((a) => (a + 1) % approach.length), STEP_MS)
    return () => window.clearTimeout(t)
  }, [auto, active])

  return (
    <div
      ref={ref}
      className="approach reveal"
      data-auto={auto}
      style={{ ['--step-ms' as string]: `${STEP_MS}ms`, ['--i' as string]: 2 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <ol className="approach__list">
        {approach.map((s, i) => {
          const open = i === active
          return (
            <li key={s.title} className="approach__step" data-open={open}>
              <button
                type="button"
                className="approach__head"
                aria-expanded={open}
                aria-controls={`approach-${i}`}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
              >
                <span className="approach__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="approach__title">{s.title}</span>
              </button>
              <div id={`approach-${i}`} className="approach__more" hidden={!open}>
                <p className="approach__text">{s.text}</p>
                <ul>
                  {s.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
              {open && <span key={active} className="approach__timer" aria-hidden="true" />}
            </li>
          )
        })}
      </ol>
      <figure className="approach__figure">
        {approachPhotos.map((ph, i) => (
          <img key={ph.src} src={ph.src} alt={i === active ? ph.alt : ''} data-on={i === active} loading="lazy" decoding="async" />
        ))}
        <figcaption key={active} className="approach__cap">
          <span>{String(active + 1).padStart(2, '0')}</span> {approach[active].title}
        </figcaption>
      </figure>
    </div>
  )
}

export function Approach() {
  const ref = useReveal<HTMLElement>()
  return (
    <section className="section hs hs--sky" aria-labelledby="approach-title" ref={ref}>
      <div className="container">
        <Head
          id="approach-title"
          kicker="Approach to care"
          title={
            <>
              Careful at every <span>stage.</span>
            </>
          }
          lede="Treatment follows the same clear sequence, so you always know what is being done and why."
        />
        <ApproachSteps />
      </div>
    </section>
  )
}

/* ---------- 10. Patient stories: the featured story large (or its video, once there is one), two more beside it ---------- */
export function StoriesPreview() {
  const ref = useReveal<HTMLElement>()
  const lead = featuredTestimonial
  const others = testimonials.filter((t) => t !== lead).slice(0, 2)
  const items: LightboxItem[] = lead?.video ? [{ kind: 'video', src: lead.video.src, poster: lead.video.poster, caption: lead.name, meta: procedureLabel(lead.procedure) }] : []
  const lb = useLightbox(items)
  if (!lead) return null

  return (
    <section className="section hs hs--sky" aria-labelledby="stories-title" ref={ref}>
      <div className="container">
        <Head
          id="stories-title"
          kicker="Patient stories"
          title={
            <>
              In our patients’ <span>own words.</span>
            </>
          }
          link={{ href: '/testimonials', label: 'All patient stories' }}
        />
        <div className="psv">
          <div className="psv__film reveal" style={{ ['--i' as string]: 1 }}>
            {lead.video ? (
              <VideoTile poster={lead.video.poster} duration={lead.video.duration} label={`Play video: ${lead.name}, ${procedureLabel(lead.procedure)}`} onPlay={() => lb.open(0)}>
                <span className="psv__proc">{procedureLabel(lead.procedure)}</span>
                <span className="psv__filmquote">“{lead.quote}”</span>
              </VideoTile>
            ) : (
              <figure className="psv__quote psv__quote--lead">
                <div className="psv__quotetop">
                  <QuoteMark />
                  {lead.placeholder && <SampleTag />}
                </div>
                <blockquote>{lead.quote}</blockquote>
                <figcaption>
                  <span>
                    <strong>{lead.name}</strong> · {procedureLabel(lead.procedure)}
                  </span>
                </figcaption>
              </figure>
            )}
          </div>
          <div className="psv__side">
            {others.map((w, i) => (
              <figure key={w.quote} className={`psv__quote ${i === 1 ? 'psv__quote--blue' : ''} reveal`} style={{ ['--i' as string]: i + 2 }}>
                <div className="psv__quotetop">
                  <QuoteMark />
                  {w.placeholder && <SampleTag tone={i === 1 ? 'dark' : 'light'} />}
                </div>
                <blockquote>{w.quote}</blockquote>
                <figcaption>
                  {w.photo && <img className="psv__avatar" src={w.photo.src} alt="" loading="lazy" decoding="async" />}
                  <span>
                    <strong>{w.name}</strong> · {procedureLabel(w.procedure)}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
      {lb.node}
    </section>
  )
}

/* ---------- 12. Contact + location ---------- */
const q = encodeURIComponent(contact.mapQuery)

export function ContactLocation() {
  const ref = useReveal<HTMLElement>()
  const [mapRef, mapNear] = useInView<HTMLDivElement>('400px')
  const rows = [
    { label: 'Hospital', value: `${doctor.hospital}, ${doctor.city}` },
    { label: 'Address', value: contact.address.join(' ') },
    { label: 'Timings', value: contact.timings },
    { label: 'Phone', value: contact.phone, href: contact.phone && `tel:${contact.phone.replace(/\s+/g, '')}`, ph: 'Phone number to be added' },
  ]
  return (
    <section id="location" className="section hs" aria-labelledby="loc-title" ref={ref}>
      <div className="container loc">
        <div className="loc__info">
          <Head
            id="loc-title"
            kicker="Contact & location"
            title={
              <>
                Find us at <span>{doctor.hospital}.</span>
              </>
            }
          />
          <dl className="loc__rows reveal" style={{ ['--i' as string]: 2 }}>
            {rows.map((r) => (
              <div key={r.label}>
                <dt>{r.label}</dt>
                <dd>
                  {r.value && r.href ? (
                    <a href={r.href}>{r.value}</a>
                  ) : r.value ? (
                    r.value
                  ) : (
                    <span className="loc__ph">{r.ph ?? 'To be confirmed'}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <div className="loc__links reveal" style={{ ['--i' as string]: 3 }}>
            <a className="hs-more" href={`https://www.google.com/maps/search/?api=1&query=${q}`} target="_blank" rel="noopener noreferrer">
              Get directions <ArrowUpRight size={14} />
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
            <Link className="hs-more" href="/contact">
              Contact page <Arrow size={14} />
            </Link>
          </div>
        </div>
        <div className="loc__map reveal" ref={mapRef} style={{ ['--i' as string]: 2 }}>
          {mapNear ? (
            <iframe
              title={`Map showing ${doctor.hospital}, ${doctor.city}`}
              src={`https://www.google.com/maps?q=${q}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="loc__map-ph" aria-hidden="true" />
          )}
        </div>
      </div>
    </section>
  )
}

import { useEffect, useState, type ReactNode } from 'react'
import { approach, contact, doctor, services } from '../data/site'
import { posts } from '../data/blog'
import { useInView, useReducedMotion, useReveal } from '../hooks/useReveal'
import { BlogCard } from './BlogCard'
import { ConditionGroups } from './ConditionGroups'
import { Link } from './Link'
import { Arrow, ArrowUpRight } from './ui/Icons'
import './HomeSections.css'

/**
 * The home page is an overview: each section here is short and links on to the page
 * that holds the full detail (Profile, Expertise, Services, Blog, Contact).
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
    <section className="section hs hs--airy" aria-labelledby="conditions-title" ref={ref}>
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

/* ---------- 6. Services: four main treatments in one row (all six are on /services) ---------- */
const homeServiceSlugs = ['knee-replacement', 'hip-replacement', 'arthroscopy', 'trauma-care']
const homeServices = homeServiceSlugs.map((slug) => services.find((s) => s.slug === slug)!)

export function ServicesOverview() {
  const ref = useReveal<HTMLElement>()
  return (
    <section className="section hs hs--sky" aria-labelledby="svc-title" ref={ref}>
      <div className="container">
        <Head
          id="svc-title"
          kicker="Services"
          title={
            <>
              Treatments and <span>services.</span>
            </>
          }
          lede="Every option is explained before a decision is made, and non-surgical care is always part of the conversation."
          link={{ href: '/services', label: `View all ${services.length} services` }}
        />
        <ol className="scol">
          {homeServices.map((s, i) => (
            <li key={s.slug} className="reveal" style={{ ['--i' as string]: i }}>
              <Link href={`/services#${s.slug}`} className="scol__item">
                <span className="scol__photo" aria-hidden="true">
                  <img src={`/images/service-photos/${s.slug}.webp`} alt="" width={720} height={540} loading="lazy" decoding="async" />
                </span>
                <span className="scol__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="scol__title">{s.title}</span>
                <span className="scol__text">{s.short}</span>
                <span className="scol__go">
                  Details <Arrow size={14} />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ---------- 7. Approach to care ---------- */
const STEP_MS = 5000

/**
 * Interactive stepper: one step is open at a time (wider, filled, with detail points).
 * Hover, click or focus opens a step; it also moves on by itself, paused while the
 * visitor is interacting and off entirely with reduced motion.
 */
function ApproachSteps() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [ref, inView] = useInView<HTMLOListElement>('0px')
  const reduced = useReducedMotion()
  const auto = inView && !paused && !reduced

  useEffect(() => {
    if (!auto) return
    const t = window.setTimeout(() => setActive((a) => (a + 1) % approach.length), STEP_MS)
    return () => window.clearTimeout(t)
  }, [auto, active])

  return (
    <ol
      ref={ref}
      className={`approach ${auto ? 'approach--auto' : ''}`}
      style={{ ['--step-ms' as string]: `${STEP_MS}ms` }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {approach.map((s, i) => {
        const open = i === active
        return (
          <li key={s.title} className="approach__step reveal" data-open={open} style={{ ['--i' as string]: i }}>
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
            <p className="approach__text">{s.text}</p>
            <div id={`approach-${i}`} className="approach__more" hidden={!open}>
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
  )
}

export function Approach() {
  const ref = useReveal<HTMLElement>()
  return (
    <section className="section hs" aria-labelledby="approach-title" ref={ref}>
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

/* ---------- 10. Blog ---------- */
export function BlogPreview() {
  const ref = useReveal<HTMLElement>()
  return (
    <section className="section hs" aria-labelledby="blogp-title" ref={ref}>
      <div className="container">
        <Head
          id="blogp-title"
          kicker="Patient education"
          title={
            <>
              From the <span>blog.</span>
            </>
          }
          link={{ href: '/blog', label: 'All articles' }}
        />
        <div className="blogp">
          {posts.slice(0, 3).map((p, i) => (
            <BlogCard key={p.slug} post={p} className="reveal" style={{ ['--i' as string]: i }} />
          ))}
        </div>
      </div>
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
    <section id="location" className="section hs hs--sky" aria-labelledby="loc-title" ref={ref}>
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

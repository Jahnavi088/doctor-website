import { bookHref, bookLinkProps, doctor, expertiseAreas, services, type ExpertiseArea } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import { PageHeader } from '../components/PageHeader'
import { AppointmentCTA } from '../components/AppointmentCTA'
import { Head } from '../components/HomeSections'
import { ConditionGroups } from '../components/ConditionGroups'
import { Link } from '../components/Link'
import { Arrow } from '../components/ui/Icons'
import { useDocumentTitle } from './useDocumentTitle'
import '../components/HomeSections.css'
import './Expertise.css'

/** Header: the four areas laid out as an open 2 × 2 grid, split by hairlines, doubling as in-page links. */
function AreaIndex() {
  return (
    <nav className="xp-quad" aria-label="Areas on this page">
      <ol>
        {expertiseAreas.map((a, i) => (
          <li key={a.slug}>
            <a href={`#${a.slug}`}>
              <span className="xp-quad__num">{String(i + 1).padStart(2, '0')}</span>
              <strong className="xp-quad__title">
                {a.title} <Arrow size={15} />
              </strong>
              <span className="xp-quad__text">{a.short}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

/** Area photos: Pixabay Content License, see README › Assets. */
const photoAlt: Record<string, string> = {
  'joint-replacement': 'X-ray of a knee joint worn by arthritis',
  arthroscopy: 'A surgical team performing a camera-guided keyhole procedure',
  'knee-care': 'A knee receiving physiotherapy treatment',
  'hip-care': 'A group of older adults out walking with trekking poles',
}

/** One area: large photo with a frosted label, then summary, focus list and related treatments. */
function Area({ a, i }: { a: ExpertiseArea; i: number }) {
  const ref = useReveal<HTMLElement>()
  const related = services.filter((s) => a.services.includes(s.slug))
  const num = String(i + 1).padStart(2, '0')
  return (
    <article id={a.slug} className="xpa" aria-labelledby={`${a.slug}-title`} ref={ref}>
      <figure className="xpa__photo reveal">
        <img src={`/images/expertise-areas/${a.slug}.webp`} alt={photoAlt[a.slug] ?? ''} width={900} height={600} loading="lazy" decoding="async" />
        <figcaption className="xpa__tag">
          <span>{num}</span>
          {a.title}
        </figcaption>
      </figure>
      <div className="xpa__body">
        <p className="xpa__num reveal">
          {num} <span>/ {String(expertiseAreas.length).padStart(2, '0')}</span>
        </p>
        <h2 id={`${a.slug}-title`} className="xpa__title reveal" style={{ ['--i' as string]: 1 }}>
          {a.title}
        </h2>
        <p className="xpa__short reveal" style={{ ['--i' as string]: 2 }}>
          {a.short}
        </p>
        <p className="xpa__text reveal" style={{ ['--i' as string]: 3 }}>
          {a.text}
        </p>
        <div className="xpa__focus reveal" style={{ ['--i' as string]: 4 }}>
          <h3>Areas of focus</h3>
          <ul>
            {a.focus.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
        {related.length > 0 && (
          <div className="xpa__related reveal" style={{ ['--i' as string]: 5 }}>
            <h3>Related treatments</h3>
            <ul>
              {related.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services#${s.slug}`}>
                    {s.title} <Arrow size={13} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  )
}

export function ExpertisePage() {
  useDocumentTitle(`Expertise | ${doctor.name}`)
  const ref = useReveal<HTMLElement>()
  return (
    <div className="home-skin">
      <PageHeader
        id="expertise-title"
        crumb="Expertise"
        eyebrow="Medical specialisations"
        title={
          <>
            Focused on the
            <br />
            <em>knee and hip</em>
          </>
        }
        lede="Joint replacement, arthroscopy, and knee and hip care: the areas Dr. Manoj specialises in, and the conditions they treat."
        art={<AreaIndex />}
        className="xp-head"
      >
        <a href={bookHref} {...bookLinkProps} className="btn phero__btn">
          Book Appointment <Arrow />
        </a>
        <a href="#conditions" className="phero__link">
          Conditions we treat <Arrow size={14} />
        </a>
      </PageHeader>

      <div className="section xpa-list">
        <div className="container">
          {expertiseAreas.map((a, i) => (
            <Area key={a.slug} a={a} i={i} />
          ))}
        </div>
      </div>

      <section id="conditions" className="section hs hs--sky hs--airy" aria-labelledby="conds-title" ref={ref}>
        <div className="container">
          <Head
            id="conds-title"
            kicker="Conditions we treat"
            title={
              <>
                What brings patients <span>to the clinic?</span>
              </>
            }
            lede="A guide to the problems most often seen in clinic. Your own diagnosis is always made at consultation."
            link={{ href: '/services', label: 'See all treatments' }}
          />
          <ConditionGroups links />
        </div>
      </section>

      <AppointmentCTA />
    </div>
  )
}

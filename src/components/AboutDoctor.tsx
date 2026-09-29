import { Fragment, useState } from 'react'
import { contact, doctor, education, homeIntro } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import { Monogram } from './ui/Logo'
import { Link } from './Link'
import { Arrow } from './ui/Icons'
import './AboutDoctor.css'

/** Renders "[text]" segments of the supplied biography as highlights. */
export function Highlighted({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\[[^\]]+\])/).map((part, i) =>
        part.startsWith('[') ? <mark key={i}>{part.slice(1, -1)}</mark> : <Fragment key={i}>{part}</Fragment>,
      )}
    </>
  )
}

type Tab = 'about' | 'training' | 'practice'
const tabs: { id: Tab; label: string }[] = [
  { id: 'about', label: 'About' },
  { id: 'training', label: 'Qualifications' },
  { id: 'practice', label: 'Practice' },
]

/** Home page introduction to the doctor in one card: photo + tabbed summary, leading on to the full profile page. */
export function AboutDoctor() {
  const ref = useReveal<HTMLElement>()
  const [tab, setTab] = useState<Tab>('about')
  return (
    <section id="about" className="section about" aria-labelledby="about-title" ref={ref}>
      <div className="container">
        <div className="about__card reveal">
          <figure className="about__photo">
            <div className="about__frame">
              <span className="about__ring" aria-hidden="true" />
              <img
                src="/images/dr-manoj-820.webp"
                srcSet="/images/dr-manoj-520.webp 520w, /images/dr-manoj-820.webp 820w"
                sizes="(min-width: 900px) 460px, 86vw"
                width={820}
                height={1226}
                loading="lazy"
                decoding="async"
                alt="Dr. Manoj Kumar Jagarlamudi, orthopaedic surgeon, in blue surgical scrubs"
              />
            </div>
            <figcaption className="about__tag">
              <Monogram height={28} className="about__tag-mark" />
              <span>
                <strong>{doctor.name}</strong>
                Orthopaedic &amp; Joint Replacement Surgeon
              </span>
            </figcaption>
          </figure>

          <div className="about__copy">
            <p className="about__kicker">Profile</p>
            <h2 id="about-title" className="about__title">
              Meet <span>{doctor.name}</span>
            </h2>
            <p className="about__role">{doctor.role} · Joint Replacement &amp; Arthroscopy</p>

            <div className="about__tabs" role="tablist" aria-label="About the doctor">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  id={`about-tab-${t.id}`}
                  aria-selected={tab === t.id}
                  aria-controls={`about-panel-${t.id}`}
                  className="about__tab"
                  onClick={() => setTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="about__panels">
              <div
                id="about-panel-about"
                role="tabpanel"
                aria-labelledby="about-tab-about"
                className="about__panel"
                hidden={tab !== 'about'}
              >
                <p className="about__bio-lead">
                  <Highlighted text={homeIntro} />
                </p>
                <p className="about__edu">MBBS · MS (Orthopaedics) · Fellowship in Arthroplasty</p>
              </div>
              <div
                id="about-panel-training"
                role="tabpanel"
                aria-labelledby="about-tab-training"
                className="about__panel"
                hidden={tab !== 'training'}
              >
                <ol className="about__list">
                  {education.map((e) => (
                    <li key={e.title}>
                      <span className="about__year">{e.year}</span>
                      <span>
                        <strong>{e.title}</strong>
                        {e.place}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
              <div
                id="about-panel-practice"
                role="tabpanel"
                aria-labelledby="about-tab-practice"
                className="about__panel"
                hidden={tab !== 'practice'}
              >
                <ol className="about__list">
                  <li>
                    <span className="about__year">Where</span>
                    <span>
                      <strong>{doctor.hospital}</strong>
                      {doctor.city}, Andhra Pradesh
                    </span>
                  </li>
                  {contact.timings && (
                    <li>
                      <span className="about__year">When</span>
                      <span>
                        <strong>Consultations</strong>
                        {contact.timings}
                      </span>
                    </li>
                  )}
                  <li>
                    <span className="about__year">Focus</span>
                    <span>
                      <strong>Knee &amp; hip</strong>
                      Joint replacement, arthroscopy and trauma care
                    </span>
                  </li>
                </ol>
              </div>
            </div>

            <div className="about__actions">
              <Link href="/profile" className="about__cta">
                View Full Profile <Arrow size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

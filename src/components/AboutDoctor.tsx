import { Fragment } from 'react'
import { doctor, homeIntro, surgicalMilestones } from '../data/site'
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

/** Home page introduction to the doctor in one card: photo + short summary, leading on to the full profile page. */
export function AboutDoctor() {
  const ref = useReveal<HTMLElement>()
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

            <p className="about__bio-lead">
              <Highlighted text={homeIntro} />
            </p>
            <div className="about__stats">
              {surgicalMilestones.map((m) => (
                <div key={m.label} className="about__stat">
                  <strong>{m.count}</strong>
                  <span>{m.short}</span>
                </div>
              ))}
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

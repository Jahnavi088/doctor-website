import { Fragment } from 'react'
import { biography, doctor, education } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import { Monogram } from './ui/Logo'
import './AboutDoctor.css'

/** Renders "[text]" segments of the supplied biography as highlights. */
function Highlighted({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\[[^\]]+\])/).map((part, i) =>
        part.startsWith('[') ? <mark key={i}>{part.slice(1, -1)}</mark> : <Fragment key={i}>{part}</Fragment>,
      )}
    </>
  )
}

const facts = [
  { k: 'Qualifications', v: doctor.qualifications },
  { k: 'Specialization', v: 'Orthopaedic Surgery' },
  { k: 'Hospital', v: `${doctor.hospital}, ${doctor.city}` },
  {
    k: 'Registration',
    v: `${doctor.registration.number} · ${doctor.registration.council}, ${doctor.registration.year}`,
  },
]

export function AboutDoctor() {
  const ref = useReveal<HTMLElement>()
  return (
    <section id="about" className="section about" aria-labelledby="about-title" ref={ref}>
      <div className="container about__grid">
        <figure className="about__figure reveal">
          <div className="about__frame">
            <img
              src="/images/dr-manoj-820.webp"
              srcSet="/images/dr-manoj-520.webp 520w, /images/dr-manoj-820.webp 820w"
              sizes="(min-width: 900px) 40vw, 90vw"
              width={820}
              height={1226}
              loading="lazy"
              decoding="async"
              alt="Portrait of Dr. Manoj Kumar Jagarlamudi"
            />
          </div>
          <figcaption>
            <Monogram height={22} />
            <span>
              {doctor.name}
              <br />
              {doctor.qualifications}
            </span>
          </figcaption>
        </figure>

        <div className="about__copy">
          <p className="eyebrow reveal">About Dr. Manoj</p>
          <h2 id="about-title" className="h2 reveal" style={{ ['--i' as string]: 1 }}>
            Precision in
            <br />
            Orthopaedic Care
          </h2>
          <div className="about__bio">
            {biography.map((p, i) => (
              <p key={i} className={`reveal ${i === 0 ? 'about__bio-lead' : ''}`} style={{ ['--i' as string]: i + 2 }}>
                <Highlighted text={p} />
              </p>
            ))}
          </div>
          <div className="about__edu reveal" style={{ ['--i' as string]: 5 }}>
            <h3 className="about__edu-title">Education &amp; training</h3>
            <ol>
              {education.map((e) => (
                <li key={e.title}>
                  <span className="about__edu-year">{e.year}</span>
                  <span>
                    <strong>{e.title}</strong>
                    <span>{e.place}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <dl className="about__facts reveal" style={{ ['--i' as string]: 6 }}>
            {facts.map((f) => (
              <div key={f.k}>
                <dt>{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

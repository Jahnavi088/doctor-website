import type { ReactNode } from 'react'
import { journey } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import './PatientJourney.css'

type Props = { steps?: { title: string; text: string }[]; title?: ReactNode; lede?: string; eyebrow?: string }

/** Patient journey. Defaults to the five-step Services-page version; the home page passes its own four steps. */
export function PatientJourney({
  steps = journey,
  eyebrow = 'Patient journey',
  title = (
    <>
      From First Visit
      <br />
      to Recovery
    </>
  ),
  lede = 'A clear, unhurried process — so you understand each step before it happens.',
}: Props = {}) {
  const ref = useReveal<HTMLElement>()
  return (
    <section className="section journey" aria-labelledby="journey-title" ref={ref}>
      <div className="container">
        <header className="section-head section-head--split">
          <div>
            <p className="eyebrow reveal">{eyebrow}</p>
            <h2 id="journey-title" className="h2 reveal" style={{ ['--i' as string]: 1, marginTop: 20 }}>
              {title}
            </h2>
          </div>
          <p className="lede reveal" style={{ ['--i' as string]: 2 }}>
            {lede}
          </p>
        </header>

        <ol className="journey__track reveal" style={{ ['--n' as string]: steps.length }}>
          {steps.map((s, i) => (
            <li key={s.title} className="journey__step" style={{ ['--i' as string]: i }}>
              <span className="journey__node" aria-hidden="true" />
              <span className="journey__num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="journey__title">{s.title}</h3>
              <p className="journey__text">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

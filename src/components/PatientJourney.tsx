import type { ReactNode } from 'react'
import { journey } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import { PictoIcon, type Picto } from './ui/Pictos'
import './PatientJourney.css'

type Step = { title: string; text: string; picto?: Picto }
type Props = { steps?: Step[]; title?: ReactNode; lede?: string; eyebrow?: string }

/**
 * Patient journey: a track of pictogram nodes joined by a line that draws in when the
 * section comes into view. Defaults to the five-step version; the home page passes its own four.
 */
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
            <h2 id="journey-title" className="h2 reveal" style={{ ['--i' as string]: 1, marginTop: 14 }}>
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
              <span className="journey__node" aria-hidden="true">
                {s.picto ? <PictoIcon name={s.picto} size={24} /> : String(i + 1).padStart(2, '0')}
              </span>
              <span className="journey__num">Step {i + 1}</span>
              <h3 className="journey__title">{s.title}</h3>
              <p className="journey__text">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

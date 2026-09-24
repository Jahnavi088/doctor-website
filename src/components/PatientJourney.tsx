import { journey } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import './PatientJourney.css'

export function PatientJourney() {
  const ref = useReveal<HTMLElement>()
  return (
    <section className="section journey" aria-labelledby="journey-title" ref={ref}>
      <div className="container">
        <header className="section-head section-head--split">
          <div>
            <p className="eyebrow reveal">Patient journey</p>
            <h2 id="journey-title" className="h2 reveal" style={{ ['--i' as string]: 1, marginTop: 20 }}>
              From First Visit
              <br />
              to Recovery
            </h2>
          </div>
          <p className="lede reveal" style={{ ['--i' as string]: 2 }}>
            A clear, unhurried process — so you understand each step before it happens.
          </p>
        </header>

        <ol className="journey__track reveal">
          {journey.map((s, i) => (
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

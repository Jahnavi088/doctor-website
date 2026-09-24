import { trustStats } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import './TrustStats.css'

export function TrustStats() {
  const ref = useReveal<HTMLElement>()
  return (
    <section className="trust" aria-label="At a glance" ref={ref}>
      <div className="container">
        <dl className="trust__row">
          {trustStats.map((s, i) => (
            <div key={s.label} className={`trust__item reveal ${i === 0 ? 'trust__item--lead' : ''}`} style={{ ['--i' as string]: i }}>
              <dt className="trust__label">{s.label}</dt>
              <dd className="trust__value">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

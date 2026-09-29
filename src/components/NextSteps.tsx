import { useReveal } from '../hooks/useReveal'
import { Link } from './Link'
import { Arrow } from './ui/Icons'
import './NextSteps.css'

export type Step = { href: string; eyebrow: string; title: string; text: string }

/** Closing block for inner pages: two large tiles pointing to the next useful pages. */
export function NextSteps({ steps }: { steps: [Step, Step] }) {
  const ref = useReveal<HTMLElement>()
  return (
    <section className="section next" aria-labelledby="next-title" ref={ref}>
      <div className="container">
        <p id="next-title" className="eyebrow reveal">
          Where next
        </p>
        <div className="next__grid">
          {steps.map((s, i) => (
            <Link key={s.href} href={s.href} className={`next__tile reveal ${i === 0 ? 'next__tile--dark' : ''}`} style={{ ['--i' as string]: i + 1 }}>
              <span className="next__eyebrow">{s.eyebrow}</span>
              <span className="next__title">{s.title}</span>
              <span className="next__text">{s.text}</span>
              <span className="next__go" aria-hidden="true">
                <Arrow size={18} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

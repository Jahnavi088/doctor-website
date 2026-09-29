import { useId, useState, type ReactNode } from 'react'
import type { Faq as FaqItem } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import './Faq.css'

/** Accordion FAQ with FAQPage structured data. The first answer starts open. */
export function Faq({
  items,
  title = 'Frequently asked questions',
  lede,
  aside,
  id = 'faq',
  tone = 'light',
}: {
  items: FaqItem[]
  title?: ReactNode
  lede?: ReactNode
  aside?: ReactNode
  id?: string
  tone?: 'light' | 'mist'
}) {
  const ref = useReveal<HTMLElement>()
  const [open, setOpen] = useState<number | null>(0)
  const uid = useId()
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }

  return (
    <section id={id} className={`section faq ${tone === 'mist' ? 'section--mist' : ''}`} aria-labelledby={`${uid}-title`} ref={ref}>
      <div className="container faq__grid">
        <div className="faq__head">
          <p className="eyebrow reveal">FAQ</p>
          <h2 id={`${uid}-title`} className="h2 reveal" style={{ ['--i' as string]: 1, marginTop: 20 }}>
            {title}
          </h2>
          {lede && (
            <p className="lede faq__lede reveal" style={{ ['--i' as string]: 2 }}>
              {lede}
            </p>
          )}
          {aside && (
            <div className="faq__aside reveal" style={{ ['--i' as string]: 3 }}>
              {aside}
            </div>
          )}
        </div>

        <ul className="faq__list reveal" style={{ ['--i' as string]: 1 }}>
          {items.map((f, i) => {
            const isOpen = open === i
            return (
              <li key={f.q} className={`faq__item ${isOpen ? 'is-open' : ''}`}>
                <h3 className="faq__q">
                  <button
                    type="button"
                    id={`${uid}-q${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`${uid}-a${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="faq__num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="faq__qtext">{f.q}</span>
                    <span className="faq__icon" aria-hidden="true" />
                  </button>
                </h3>
                <div id={`${uid}-a${i}`} role="region" aria-labelledby={`${uid}-q${i}`} className="faq__a" inert={!isOpen}>
                  <div>
                    <p>{f.a}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </section>
  )
}

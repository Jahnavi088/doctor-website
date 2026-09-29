import { gallery, testimonials } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import './PatientStories.css'

/**
 * Photo gallery + patient testimonials. Each part renders only once the clinic supplies
 * content (`gallery` / `testimonials` in src/data/site.ts); with both empty nothing is shown.
 */
export function PatientStories() {
  const ref = useReveal<HTMLElement>()
  if (!gallery.length && !testimonials.length) return null
  return (
    <section id="stories" className="section stories" aria-labelledby="stories-title" ref={ref}>
      <div className="container">
        <header className="section-head section-head--split">
          <div>
            <p className="eyebrow reveal">{testimonials.length ? 'Patient stories' : 'Gallery'}</p>
            <h2 id="stories-title" className="h2 reveal" style={{ ['--i' as string]: 1, marginTop: 20 }}>
              {testimonials.length ? (
                <>
                  In our patients’
                  <br />
                  own words
                </>
              ) : (
                <>
                  Inside the
                  <br />
                  practice
                </>
              )}
            </h2>
          </div>
        </header>

        {gallery.length > 0 && (
          <ul className="stories__gallery">
            {gallery.map((g, i) => (
              <li key={g.src} className="reveal" style={{ ['--i' as string]: i % 4 }}>
                <figure>
                  <img src={g.src} alt={g.alt} loading="lazy" decoding="async" />
                  {g.caption && <figcaption>{g.caption}</figcaption>}
                </figure>
              </li>
            ))}
          </ul>
        )}

        {testimonials.length > 0 && (
          <ul className="stories__quotes">
            {testimonials.map((t, i) => (
              <li key={t.name + i} className="reveal" style={{ ['--i' as string]: i % 3 }}>
                <figure>
                  <span className="stories__mark" aria-hidden="true">
                    “
                  </span>
                  <blockquote>{t.quote}</blockquote>
                  <figcaption>
                    <strong>{t.name}</strong>
                    {t.detail && <span>{t.detail}</span>}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

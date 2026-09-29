import { expertise, expertiseAreas, type Glyph } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import { Head } from './HomeSections'
import './Expertise.css'

/** Real photographs (Pixabay Content License, see README › Assets). */
const photo: Record<Glyph, { src: string; alt: string }> = {
  replacement: {
    src: '/images/expertise-photos/replacement.webp',
    alt: 'Surgeons in green scrubs operating beside a C-arm X-ray unit in an orthopaedic theatre',
  },
  arthroscopy: {
    src: '/images/expertise-photos/arthroscopy.webp',
    alt: 'Surgical team performing a minimally invasive procedure guided by camera monitors',
  },
  robotic: {
    src: '/images/expertise-photos/robotic.webp',
    alt: 'A gloved hand positioning the lights above an operating table',
  },
  trauma: {
    src: '/images/expertise-photos/trauma.webp',
    alt: 'X-ray of a foot fracture fixed with a plate and screws, shown on a clinic monitor',
  },
}

export function Expertise() {
  const ref = useReveal<HTMLElement>()
  return (
    <section id="expertise" className="section xp" aria-labelledby="expertise-title" ref={ref}>
      <div className="container">
        <Head
          id="expertise-title"
          kicker="Areas of expertise"
          title={
            <>
              Expertise that <span>restores movement.</span>
            </>
          }
          link={{ href: '/expertise', label: `View all ${expertiseAreas.length} areas of expertise` }}
        />

        <ol className="xp__grid">
          {expertise.map((e, i) => (
            <li key={e.title} className="xp__card reveal" style={{ ['--i' as string]: i }}>
              <div className="xp__photo">
                <img src={photo[e.glyph].src} alt={photo[e.glyph].alt} width={800} height={560} loading="lazy" decoding="async" />
              </div>
              <div className="xp__body">
                <span className="xp__num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="xp__title">{e.title}</h3>
                <p className="xp__text">{e.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

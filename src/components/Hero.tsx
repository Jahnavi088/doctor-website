import { useEffect, useRef } from 'react'
import { bookHref, bookLinkProps, doctor } from '../data/site'
import { useMediaQuery, useReducedMotion } from '../hooks/useReveal'
import { LazyKnee } from '../three/LazyKnee'
import { Arrow } from './ui/Icons'
import { Monogram } from './ui/Logo'
import './Hero.css'

export function Hero() {
  const compact = useMediaQuery('(max-width: 1023px)')
  const reduced = useReducedMotion()
  const portrait = useRef<HTMLDivElement>(null)

  // gentle parallax on the portrait
  useEffect(() => {
    if (reduced) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 800)
        portrait.current?.style.setProperty('--py', `${y * 0.08}px`)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [reduced])

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      {/* full-bleed radiograph-style knee behind everything */}
      <div className="hero__scene" aria-hidden="true">
        <LazyKnee variant="hero" compact={compact} className="hero__knee" />
      </div>
      <div className="hero__vignette" aria-hidden="true" />

      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="hero__eyebrow hero__in" style={{ ['--i' as string]: 0 }}>
            {doctor.role} · Joint Replacement · Arthroscopy
          </p>
          <h1 id="hero-title" className="hero__title">
            <span className="hero__line">
              <span className="hero__in" style={{ ['--i' as string]: 1 }}>
                {doctor.nameLines[0]}
              </span>
            </span>
            <span className="hero__line">
              <span className="hero__in hero__accent" style={{ ['--i' as string]: 2 }}>
                {doctor.nameLines[1]}
              </span>
            </span>
          </h1>
          <p className="hero__quals hero__in" style={{ ['--i' as string]: 3 }}>
            {doctor.qualifications}
          </p>
          <ul className="hero__focus hero__in" style={{ ['--i' as string]: 4 }} aria-label="Specializations">
            {doctor.focus.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <p className="hero__desc hero__in" style={{ ['--i' as string]: 5 }}>
            Specialized orthopaedic care focused on restoring mobility, precision and quality of life.
          </p>
          <div className="hero__ctas hero__in" style={{ ['--i' as string]: 6 }}>
            <a href={bookHref} {...bookLinkProps} className="btn btn--light">
              Book an Appointment <Arrow />
            </a>
            <a href="#expertise" className="btn hero__ghost">
              Explore Expertise
            </a>
          </div>
          <a href="#hospital" className="hero__affil hero__in" style={{ ['--i' as string]: 7 }}>
            <Monogram height={30} className="hero__affil-mark" />
            <span>
              <small>Practising at</small>
              <strong>
                {doctor.hospital}, {doctor.city}
              </strong>
            </span>
          </a>
        </div>

        <div className="hero__visual">
          <div className="hero__halo" aria-hidden="true" />
          <div className="hero__portrait" ref={portrait}>
            <img
              src="/images/dr-manoj-820.webp"
              srcSet="/images/dr-manoj-520.webp 520w, /images/dr-manoj-820.webp 820w, /images/dr-manoj-1100.webp 1100w"
              sizes="(min-width: 1024px) 520px, 86vw"
              width={820}
              height={1226}
              alt="Dr. Manoj Kumar Jagarlamudi, orthopaedic surgeon, in blue surgical scrubs with arms folded"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

import { useEffect, useState } from 'react'
import { doctor, education } from '../data/site'
import { useInView, useReducedMotion, useReveal } from '../hooks/useReveal'
import { Monogram } from './ui/Logo'
import { ArrowUpRight } from './ui/Icons'
import './Experience.css'

/** Counts from 0 to `to` once visible (instant with reduced motion). */
function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [ref, inView] = useInView<HTMLSpanElement>('0px')
  const reduced = useReducedMotion()
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setN(to)
      return
    }
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1800)
      setN(Math.round(to * (1 - Math.pow(1 - t, 3))))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduced, to])
  return (
    <span ref={ref} aria-label={`${to.toLocaleString('en-IN')}${suffix}`}>
      <span aria-hidden="true">
        {n.toLocaleString('en-IN')}
        {suffix}
      </span>
    </span>
  )
}

const fellowship = education[education.length - 1]

export function Experience() {
  const ref = useReveal<HTMLElement>()
  return (
    <section id="experience" className="section exp" aria-labelledby="experience-title" ref={ref}>
      <div className="container">
        <header className="section-head section-head--split">
          <div>
            <p className="eyebrow reveal">Experience</p>
            <h2 id="experience-title" className="h2 reveal" style={{ ['--i' as string]: 1, marginTop: 20 }}>
              Experience Built
              <br />
              Around Movement
            </h2>
          </div>
          <p className="lede reveal" style={{ ['--i' as string]: 2 }}>
            Dr. Manoj Kumar Jagarlamudi focuses on orthopaedic care involving joint replacement, arthroscopy and trauma,
            with an emphasis on precision and patient-focused treatment.
          </p>
        </header>

        <div className="exp__bento">
          <article className="exp__card exp__card--lead reveal">
            <div className="exp__lead-copy">
              <p className="exp__label">Successful surgeries</p>
              <p className="exp__big">
                <CountUp to={4000} suffix="+" />
              </p>
              <p className="exp__sub">Restoring mobility and improving patients’ quality of life.</p>
            </div>
            <img
              className="exp__lead-img"
              src="/images/expertise/replacement-still.webp"
              alt=""
              width={360}
              height={360}
              loading="lazy"
              decoding="async"
            />
          </article>

          <article className="exp__card reveal" style={{ ['--i' as string]: 1 }}>
            <p className="exp__label">Experience</p>
            <p className="exp__mid">
              <CountUp to={10} /> <span className="exp__unit">years</span>
            </p>
            <p className="exp__sub">Overall, including {doctor.experience.specialist}.</p>
          </article>

          <article className="exp__card reveal" style={{ ['--i' as string]: 2 }}>
            <p className="exp__label">Fellowship</p>
            <p className="exp__mid">{fellowship.year}</p>
            <p className="exp__sub">
              {fellowship.title}, {fellowship.place}.
            </p>
          </article>

          <a href="#hospital" className="exp__card exp__card--hospital reveal" style={{ ['--i' as string]: 3 }}>
            <Monogram height={44} className="exp__mark" />
            <span className="exp__hosp">
              <span className="exp__label">Practising at</span>
              <strong>{doctor.hospital}</strong>
              <span className="exp__sub">{doctor.city}, Andhra Pradesh</span>
            </span>
            <span className="exp__go" aria-hidden="true">
              <ArrowUpRight size={18} />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

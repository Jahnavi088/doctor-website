import { Fragment, useEffect, useState } from 'react'
import { bookHref, bookLinkProps, doctor, surgicalMilestones } from '../data/site'
import { useReducedMotion } from '../hooks/useReveal'
import { Arrow } from './ui/Icons'
import './Hero.css'

/**
 * Home hero — bright clinical ground (white → pale sky blue) with the introduction on
 * the left and a large X-ray-style knee illustration on the right, feathered into the
 * background. The doctor's name is the headline. Image: Pixabay (TungArt7), Pixabay Content
 * License — see README › Assets.
 */
const split = doctor.name.lastIndexOf(' ')
const firstWords = doctor.name.slice(0, split).split(' ')
const lastName = doctor.name.slice(split + 1)

/** Counts a figure like "3,000+" up from zero once, after `delay` ms. */
function CountUp({ value, delay }: { value: string; delay: number }) {
  const target = Number(value.replace(/[^\d]/g, ''))
  const suffix = value.replace(/[\d,]/g, '')
  const reduced = useReducedMotion()
  const [n, setN] = useState(0)
  useEffect(() => {
    if (reduced) return
    let raf = 0
    let start = 0
    const tick = (t: number) => {
      if (!start) start = t
      const p = Math.min((t - start) / 1400, 1)
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    const timer = setTimeout(() => (raf = requestAnimationFrame(tick)), delay)
    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(raf)
    }
  }, [target, delay, reduced])
  return (
    <>
      <span aria-hidden="true">
        {(reduced ? target : n).toLocaleString('en-US')}
        {suffix}
      </span>
      <span className="visually-hidden">{value}</span>
    </>
  )
}

export function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero__art" aria-hidden="true">
        <img
          src="/images/hero-knee.webp"
          srcSet="/images/hero-knee-720.webp 720w, /images/hero-knee.webp 1280w"
          sizes="(max-width: 899px) 100vw, 60vw"
          alt=""
          width={1280}
          height={717}
          fetchPriority="high"
          decoding="async"
        />
      </div>

      <div className="hero__inner">
        <p className="hero__kicker">Orthopaedic &amp; Joint Replacement Surgeon</p>
        <h1 id="hero-title" className="hero__name">
          <span className="hero__name-line">
            {firstWords.map((w, i) => (
              <Fragment key={w}>
                <span className="hero__word" style={{ ['--w' as string]: i }}>
                  {w}
                </span>{' '}
              </Fragment>
            ))}
          </span>
          <span className="hero__name-line hero__name-line--accent">
            <span className="hero__word" style={{ ['--w' as string]: firstWords.length }}>
              {lastName}
            </span>
          </span>
        </h1>
        <p className="hero__creds">
          <span>{doctor.qualifications.split(', ').join(' · ')}</span>
          <span className="hero__creds-sep" aria-hidden="true" />
          <span>
            {doctor.hospital}, {doctor.city}
          </span>
        </p>
        <p className="hero__text">Joint Replacement · Arthroscopy · Knee &amp; Hip Care</p>
        <ul className="hero__stats" aria-label="Surgical experience">
          {surgicalMilestones.map((m, i) => (
            <li key={m.label} style={{ ['--i' as string]: i }}>
              <strong>
                <CountUp value={m.count} delay={1000 + i * 140} />
              </strong>
              <span>{m.short}</span>
            </li>
          ))}
        </ul>
        <div className="hero__actions">
          <a href={bookHref} {...bookLinkProps} className="btn hero__btn">
            Book Appointment <Arrow />
          </a>
          <a href="#expertise" className="btn hero__btn">
            View Expertise <Arrow />
          </a>
        </div>
      </div>
    </section>
  )
}

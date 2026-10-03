import { bookHref, bookLinkProps, doctor, surgicalMilestones } from '../data/site'
import { Arrow } from './ui/Icons'
import './Hero.css'

/**
 * Home hero — bright clinical ground (white → pale sky blue) with the introduction on
 * the left and a large X-ray-style knee illustration on the right, feathered into the
 * background. Image: Pixabay (TungArt7), Pixabay Content License — see README › Assets.
 */
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
        <p className="hero__headline" aria-hidden="true">
          Helping you move
          <br />
          <span>with confidence.</span>
        </p>
        <div className="hero__who">
          <h1 id="hero-title" className="hero__name">
            <span className="visually-hidden">Helping you move with confidence: </span>
            {doctor.name}
          </h1>
          <p className="hero__creds">{doctor.qualifications.split(', ').join(' · ')}</p>
          <p className="hero__place">
            {doctor.hospital}, {doctor.city}
          </p>
        </div>
        <p className="hero__text">
          Specialized care in
          <br />
          <strong>
            <span>Joint Replacement ·</span> <span>Arthroscopy ·</span> <span>Knee &amp; Hip Care</span>
          </strong>
        </p>
        <div className="hero__stats">
          <ul className="hero__facts">
            <li>
              <strong>{doctor.surgeries.total}</strong> Surgeries Performed
            </li>
            <li>
              <strong>10+</strong> Years Experience
            </li>
          </ul>
          <div className="hero__milestones">
            {surgicalMilestones.map((m) => (
              <div key={m.label} className="hero__milestone">
                <strong>{m.count}</strong>
                <span>{m.short}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hero__actions">
          <a href={bookHref} {...bookLinkProps} className="btn hero__btn">
            Book Appointment <Arrow />
          </a>
          <a href="#expertise" className="hero__link">
            View Expertise <Arrow size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}

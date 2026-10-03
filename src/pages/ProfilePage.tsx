import { useEffect, useRef, useState } from 'react'
import { biography, bookHref, bookLinkProps, contact, doctor, education, surgicalMilestones } from '../data/site'
import { useReducedMotion, useReveal } from '../hooks/useReveal'
import { PageHeader } from '../components/PageHeader'
import { Head } from '../components/HomeSections'
import { Highlighted } from '../components/AboutDoctor'
import { AppointmentCTA } from '../components/AppointmentCTA'
import { Arrow } from '../components/ui/Icons'
import { PictoIcon, type Picto } from '../components/ui/Pictos'
import { useDocumentTitle } from './useDocumentTitle'
import '../components/HomeSections.css'
import './Profile.css'

const credentials: { k: string; v: string; icon: Picto }[] = [
  { k: 'Qualifications', v: doctor.qualifications, icon: 'cap' },
  { k: 'Specialisation', v: 'Orthopaedic Surgery · Joint Replacement', icon: 'knee' },
  { k: 'Surgical Volume', v: `${doctor.surgeries.total} Surgeries (3k Knee · 1.5k Hip · 4k Scope · 8k Trauma)`, icon: 'treatment' },
  { k: 'Experience', v: `${doctor.experience.overall} overall, ${doctor.experience.specialist}`, icon: 'clock' },
  { k: 'Hospital', v: `${doctor.hospital}, ${doctor.city}`, icon: 'hospital' },
  { k: 'Registration', v: doctor.registration.number, icon: 'badge' },
]

function Portrait() {
  return (
    <div className="prof-art">
      <img
        className="prof-art__img"
        src="/images/dr-manoj-820.webp"
        srcSet="/images/dr-manoj-520.webp 520w, /images/dr-manoj-820.webp 820w"
        sizes="420px"
        width={820}
        height={1226}
        alt="Dr. Manoj Kumar Jagarlamudi in blue surgical scrubs"
        decoding="async"
      />
    </div>
  )
}

/* ---------- biography: sticky heading beside the text and credentials ---------- */
function Biography() {
  const ref = useReveal<HTMLElement>()
  return (
    <section id="biography" className="section prof-bio" aria-labelledby="bio-title" ref={ref}>
      <div className="container prof-bio__grid">
        <div className="prof-bio__head">
          <p className="hs-kicker reveal">Biography</p>
          <h2 id="bio-title" className="hs-title reveal" style={{ ['--i' as string]: 1 }}>
            Precision in <span>orthopaedic care.</span>
          </h2>
        </div>

        <div className="prof-bio__body">
          {biography.map((p, i) => (
            <p key={i} className={`reveal ${i === 0 ? 'prof-bio__lead' : ''}`} style={{ ['--i' as string]: i + 1 }}>
              <Highlighted text={p} />
            </p>
          ))}

          <div className="prof-milestones reveal" style={{ ['--i' as string]: biography.length + 1 }}>
            <h3 className="prof-milestones__title">Documented Surgical Experience ({doctor.surgeries.total})</h3>
            <div className="prof-milestones__grid">
              {surgicalMilestones.map((m) => (
                <div key={m.label} className="prof-milestones__card">
                  <span className="prof-milestones__num">{m.count}</span>
                  <span className="prof-milestones__label">{m.label}</span>
                  <span className="prof-milestones__sub">{m.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <dl className="prof-cred">
          {credentials.map((c, i) => (
            <div key={c.k} className="reveal" style={{ ['--i' as string]: i }}>
              <span className="prof-cred__icon" aria-hidden="true">
                <PictoIcon name={c.icon} size={22} />
              </span>
              <dt>{c.k}</dt>
              <dd>{c.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

/* ---------- training: a timeline whose line fills as the visitor scrolls ---------- */
function Training() {
  const ref = useReveal<HTMLElement>()
  const listRef = useRef<HTMLOListElement>(null)
  const reduced = useReducedMotion()
  const steps = [
    ...education.map((e) => ({ year: e.year, title: e.title, place: e.place })),
    { year: 'Today', title: doctor.role, place: `${doctor.hospital}, ${doctor.city}` },
  ]
  const [progress, setProgress] = useState(reduced ? 1 : 0)

  useEffect(() => {
    if (reduced) {
      setProgress(1)
      return
    }
    const el = listRef.current
    if (!el) return
    let raf = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      // 0 when the list enters the lower part of the screen, 1 once it reaches the upper third
      const start = window.innerHeight * 0.85
      const end = window.innerHeight * 0.35
      const t = (start - r.top) / Math.max(1, start - end + r.height * 0.4)
      setProgress(Math.min(1, Math.max(0, t)))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [reduced])

  const reached = (i: number) => progress >= (i / (steps.length - 1)) * 0.98

  return (
    <section id="training" className="section hs hs--sky prof-train" aria-labelledby="train-title" ref={ref}>
      <div className="container">
        <Head
          id="train-title"
          kicker="Education & training"
          title={
            <>
              A path focused <span>on the joint.</span>
            </>
          }
          lede="Medical and surgical training at Dr. NTR University of Health Sciences, followed by a fellowship dedicated to joint replacement."
        />
        <ol className="prof-time" ref={listRef} style={{ ['--p' as string]: progress }}>
          {steps.map((s, i) => (
            <li key={s.title} className="prof-time__step" data-reached={reached(i)} data-now={s.year === 'Today'}>
              <span className="prof-time__node" aria-hidden="true" />
              <span className="prof-time__year">{s.year}</span>
              <h3 className="prof-time__title">{s.title}</h3>
              <p className="prof-time__place">{s.place}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function ProfilePage() {
  useDocumentTitle(`Profile | ${doctor.name}`)
  return (
    <div className="home-skin">
      <PageHeader
        id="profile-title"
        crumb="Profile"
        eyebrow="Joint Replacement Specialist"
        title={
          <>
            {doctor.nameLines[0]}
            <br />
            <em>{doctor.nameLines[1]}</em>
          </>
        }
        lede={
          <>
            {doctor.qualifications}. Practising at {doctor.hospital}, {doctor.city}
            {contact.timings ? `, ${contact.timings}.` : '.'}
          </>
        }
        facts={[
          { value: '3,000+', label: 'Knee Replacements' },
          { value: '1,500+', label: 'Hip Replacements' },
          { value: '4,000+', label: 'Arthroscopy' },
          { value: '8,000+', label: 'Trauma Surgeries' },
        ]}
        art={<Portrait />}
        className="prof-head"
      >
        <a href={bookHref} {...bookLinkProps} className="btn phero__btn">
          Book Appointment <Arrow />
        </a>
        <a href="#biography" className="phero__link">
          Read biography <Arrow size={14} />
        </a>
      </PageHeader>

      <Biography />
      <Training />
      <AppointmentCTA />
    </div>
  )
}

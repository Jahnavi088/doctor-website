import { useRef, type PointerEvent } from 'react'
import { expertise, type Glyph } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import './Expertise.css'

const FRAMES = 24

const renderAlt: Record<Glyph, string> = {
  replacement: '3D render of a knee with a joint-replacement implant: femoral component, tibial tray and insert',
  arthroscopy: '3D render of a knee joint with an arthroscope and probe entering the joint space',
  robotic: '3D render of a knee with planned bone-cut planes and alignment axis, as used in robotic-assisted surgery',
  trauma: '3D render of a fractured tibia fixed with a plate and screws',
}

/**
 * Turntable of a pre-rendered 3D scene (tools/sprites). Spins slowly on its own;
 * on hover the rotation follows the pointer.
 */
function Turntable({ type }: { type: Glyph }) {
  const strip = useRef<HTMLDivElement>(null)
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !strip.current) return
    const r = e.currentTarget.getBoundingClientRect()
    const f = Math.min(FRAMES - 1, Math.max(0, Math.floor(((e.clientX - r.left) / r.width) * FRAMES)))
    strip.current.style.setProperty('--frame', String(f))
    strip.current.dataset.scrub = 'true'
  }
  const onLeave = () => {
    if (strip.current) delete strip.current.dataset.scrub
  }
  return (
    <div className="xp__render" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="xp__strip" ref={strip}>
        <img
          src={`/images/expertise/${type}.webp`}
          alt={renderAlt[type]}
          width={360 * FRAMES}
          height={360}
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  )
}

export function Expertise() {
  const ref = useReveal<HTMLElement>()
  return (
    <section id="expertise" className="section xp" aria-labelledby="expertise-title" ref={ref}>
      <div className="container">
        <header className="section-head section-head--split">
          <div>
            <p className="eyebrow reveal">Areas of expertise</p>
            <h2 id="expertise-title" className="h2 reveal" style={{ ['--i' as string]: 1, marginTop: 20 }}>
              Expertise that
              <br />
              <span className="xp__accent">restores movement</span>
            </h2>
          </div>
          <p className="lede reveal" style={{ ['--i' as string]: 2 }}>
            Specialized orthopaedic care focused on movement, mobility and joint health.
          </p>
        </header>

        <ol className="xp__grid">
          {expertise.map((e, i) => (
            <li key={e.title} className="xp__card reveal" style={{ ['--i' as string]: i }}>
              <div className="xp__body">
                <span className="xp__num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="xp__title">{e.title}</h3>
                <p className="xp__text">{e.text}</p>
              </div>
              <Turntable type={e.glyph} />
            </li>
          ))}
        </ol>
    
      </div>
    </section>
  )
}

import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { kneePrinciples, type KneeMode } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import { LazyKnee } from '../three/LazyKnee'
import './KneeVisualization.css'

export function KneeVisualization() {
  const ref = useReveal<HTMLElement>()
  const [mode, setMode] = useState<KneeMode>('mobility')
  const userYaw = useRef(0)
  const drag = useRef<{ x: number; yaw: number } | null>(null)
  const current = kneePrinciples.find((p) => p.id === mode)!

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    drag.current = { x: e.clientX, yaw: userYaw.current }
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return
    userYaw.current = Math.max(-1.4, Math.min(1.4, drag.current.yaw + (e.clientX - drag.current.x) * 0.006))
  }
  const onUp = () => (drag.current = null)
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') userYaw.current = Math.max(-1.4, userYaw.current - 0.2)
    else if (e.key === 'ArrowRight') userYaw.current = Math.min(1.4, userYaw.current + 0.2)
    else return
    e.preventDefault()
  }

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = kneePrinciples.length
    let j = -1
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') j = (i + 1) % n
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') j = (i - 1 + n) % n
    if (j < 0) return
    e.preventDefault()
    setMode(kneePrinciples[j].id)
    document.getElementById(`knee-tab-${kneePrinciples[j].id}`)?.focus()
  }

  return (
    <section className="section kneeviz" aria-labelledby="kneeviz-title" ref={ref}>
      <div className="container">
        <header className="section-head section-head--split kneeviz__head">
          <div>
            <p className="eyebrow reveal">Understanding the knee</p>
            <h2 id="kneeviz-title" className="h2 reveal" style={{ ['--i' as string]: 1, marginTop: 20 }}>
              The Joint Behind
              <br />
              Every Movement
            </h2>
          </div>
          <p className="lede reveal" style={{ ['--i' as string]: 2 }}>
            A simple visual exploration of the knee and its role in everyday mobility.
          </p>
        </header>

        <div className="kneeviz__grid">
          <div className="kneeviz__figure">
            <div
              className="kneeviz__stage reveal"
              tabIndex={0}
              role="img"
              aria-label={`Illustrative 3D model of the knee joint, showing ${current.title.toLowerCase()}. Use the left and right arrow keys, or drag, to turn the model.`}
              onPointerDown={onDown}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerCancel={onUp}
              onKeyDown={onKey}
            >
              <div className="kneeviz__rings" aria-hidden="true" />
              <LazyKnee variant="explore" mode={mode} userYaw={userYaw} />
              <p className="kneeviz__hint" aria-hidden="true">
                Drag to turn
              </p>
            </div>
            <p className="kneeviz__caption">Illustrative model for general education — not to anatomical scale.</p>
          </div>

          <div className="kneeviz__principles">
            <div role="tablist" aria-label="Knee principles" aria-orientation="vertical">
              {kneePrinciples.map((p, i) => (
                <button
                  key={p.id}
                  id={`knee-tab-${p.id}`}
                  role="tab"
                  type="button"
                  aria-selected={mode === p.id}
                  aria-controls="knee-panel"
                  tabIndex={mode === p.id ? 0 : -1}
                  className="kneeviz__tab reveal"
                  style={{ ['--i' as string]: i + 1 }}
                  onClick={() => setMode(p.id)}
                  onKeyDown={(e) => onTabKey(e, i)}
                >
                  <span className="kneeviz__tab-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="kneeviz__tab-body">
                    <span className="kneeviz__tab-title">{p.title}</span>
                    <span className="kneeviz__tab-lead">{p.lead}</span>
                  </span>
                </button>
              ))}
            </div>
            <div id="knee-panel" role="tabpanel" aria-labelledby={`knee-tab-${mode}`} className="kneeviz__panel" aria-live="polite">
              <p key={mode}>{current.text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

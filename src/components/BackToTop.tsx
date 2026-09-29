import { useEffect, useRef, useState } from 'react'
import './BackToTop.css'

const R = 21
const C = 2 * Math.PI * R

/** Floating "back to top" button; its ring shows how far down the page you are. */
export function BackToTop() {
  const [show, setShow] = useState(false)
  const ring = useRef<SVGCircleElement>(null)

  useEffect(() => {
    let raf = 0
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0
      ring.current?.style.setProperty('stroke-dashoffset', String(C * (1 - p)))
      setShow(window.scrollY > window.innerHeight * 0.9)
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <button
      type="button"
      className={`totop ${show ? 'is-shown' : ''}`}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
        <circle cx="24" cy="24" r={R} className="totop__track" />
        <circle ref={ring} cx="24" cy="24" r={R} className="totop__ring" style={{ strokeDasharray: C, strokeDashoffset: C }} />
        <path d="M24 30V18M18.5 23.5 24 18l5.5 5.5" className="totop__arrow" />
      </svg>
    </button>
  )
}

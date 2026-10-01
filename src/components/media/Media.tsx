import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Arrow } from '../ui/Icons'
import './Media.css'

/** Marks placeholder content until real, consented patient content replaces it. */
export function SampleTag({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  return (
    <span className={`sample-tag sample-tag--${tone}`} title="Placeholder — to be replaced with the clinic’s own content">
      Placeholder
    </span>
  )
}

export function PlayIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true">
      <path d="M6 3.8v12.4a.8.8 0 0 0 1.2.7l10-6.2a.8.8 0 0 0 0-1.4l-10-6.2a.8.8 0 0 0-1.2.7Z" fill="currentColor" />
    </svg>
  )
}

/** Big opening quote mark, drawn so it matches the display face at any size. */
export function QuoteMark({ className = '' }: { className?: string }) {
  return (
    <svg className={`qmark ${className}`} viewBox="0 0 48 36" aria-hidden="true">
      <path
        d="M0 36V22.4C0 9.9 6.3 2.4 18.9 0l2 5.3C13.9 7.2 10.5 11 10.4 16.6H20V36H0Zm27.4 0V22.4C27.4 9.9 33.7 2.4 46.3 0l1.7 5.3c-7 1.9-10.4 5.7-10.5 11.3H47V36H27.4Z"
        fill="currentColor"
      />
    </svg>
  )
}

/* ------------------------------------------------------------------
   Segmented filter: the same sliding-thumb control as the home Conditions switch.
------------------------------------------------------------------- */
export function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: { id: T; label: string; count?: number }[]
  value: T
  onChange: (v: T) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [thumb, setThumb] = useState<{ x: number; w: number } | null>(null)

  // the thumb follows the selected button (buttons have different widths)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const place = () => {
      const btn = root.querySelector<HTMLElement>('[aria-pressed="true"]')
      if (btn) setThumb({ x: btn.offsetLeft, w: btn.offsetWidth })
    }
    place()
    const ro = new ResizeObserver(place)
    ro.observe(root)
    return () => ro.disconnect()
  }, [value])

  return (
    <div className="seg" role="group" aria-label={label} ref={ref}>
      <span className="seg__thumb" aria-hidden="true" style={thumb ? { transform: `translateX(${thumb.x}px)`, width: thumb.w } : { opacity: 0 }} />
      {options.map((o) => (
        <button key={o.id} type="button" aria-pressed={o.id === value} onClick={() => onChange(o.id)}>
          {o.label}
          {o.count !== undefined && <span className="seg__count">{o.count}</span>}
        </button>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------
   Video poster tile: the poster, a play button and (optionally) copy over a soft gradient.
------------------------------------------------------------------- */
export function VideoTile({
  poster,
  duration,
  label,
  onPlay,
  sample,
  className = '',
  children,
}: {
  poster: string
  duration?: string
  /** accessible name, e.g. "Play video: A day in the operating theatre" */
  label: string
  onPlay: () => void
  sample?: boolean
  className?: string
  children?: ReactNode
}) {
  return (
    <button type="button" className={`vtile ${children ? 'vtile--copy' : ''} ${className}`} onClick={onPlay} aria-label={label}>
      <img src={poster} alt="" loading="lazy" decoding="async" />
      <span className="vtile__shade" aria-hidden="true" />
      <span className="vtile__play" aria-hidden="true">
        <PlayIcon size={20} />
      </span>
      <span className="vtile__top" aria-hidden="true">
        {duration && <span className="vtile__dur">{duration}</span>}
        {sample && <SampleTag tone="dark" />}
      </span>
      {children && <span className="vtile__copy">{children}</span>}
    </button>
  )
}

/* ------------------------------------------------------------------
   Lightbox: photos and videos, keyboard (← → Esc), swipe, focus kept inside, page scroll locked.
------------------------------------------------------------------- */
export type LightboxItem =
  | { kind: 'photo'; src: string; alt: string; caption?: string; meta?: string; sample?: boolean }
  | { kind: 'video'; src: string; poster: string; caption?: string; meta?: string; sample?: boolean }

export function useLightbox(items: LightboxItem[]) {
  const [index, setIndex] = useState<number | null>(null)
  const open = useCallback((i: number) => setIndex(i), [])
  const node =
    index === null
      ? null
      : createPortal(<Lightbox items={items} index={Math.min(index, items.length - 1)} onIndex={setIndex} onClose={() => setIndex(null)} />, document.body)
  return { open, node }
}

function Lightbox({ items, index, onIndex, onClose }: { items: LightboxItem[]; index: number; onIndex: (i: number) => void; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const item = items[index]
  const many = items.length > 1
  const go = useCallback((d: number) => onIndex((index + d + items.length) % items.length), [index, items.length, onIndex])

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    ref.current?.querySelector<HTMLElement>('.lb__close')?.focus()
    return () => {
      document.body.style.overflow = prevOverflow
      prevFocus?.focus?.()
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight' && many) go(1)
      else if (e.key === 'ArrowLeft' && many) go(-1)
      else if (e.key === 'Tab' && ref.current) {
        const f = ref.current.querySelectorAll<HTMLElement>('button, video[controls]')
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, many, onClose])

  // swipe on touch screens
  const touch = useRef<number | null>(null)

  return (
    <div
      className="lb"
      role="dialog"
      aria-modal="true"
      aria-label={item.caption ?? 'Media viewer'}
      ref={ref}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current === null || !many) return
        const dx = e.changedTouches[0].clientX - touch.current
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
        touch.current = null
      }}
    >
      <div className="lb__bar">
        {many && (
          <span className="lb__count">
            {String(index + 1).padStart(2, '0')} <span>/ {String(items.length).padStart(2, '0')}</span>
          </span>
        )}
        <button type="button" className="lb__close" onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path d="M3 3l12 12M15 3 3 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <figure className="lb__stage" key={index}>
        {item.kind === 'photo' ? (
          <img src={item.src} alt={item.alt} decoding="async" />
        ) : (
          <video src={item.src} poster={item.poster} controls autoPlay playsInline preload="metadata" />
        )}
        {(item.caption || item.meta || item.sample) && (
          <figcaption className="lb__caption">
            {item.meta && <span className="lb__meta">{item.meta}</span>}
            {item.caption && <span>{item.caption}</span>}
            {item.sample && <SampleTag tone="dark" />}
          </figcaption>
        )}
      </figure>

      {many && (
        <>
          <button type="button" className="lb__nav lb__nav--prev" onClick={() => go(-1)} aria-label="Previous">
            <Arrow size={18} />
          </button>
          <button type="button" className="lb__nav lb__nav--next" onClick={() => go(1)} aria-label="Next">
            <Arrow size={18} />
          </button>
        </>
      )}
    </div>
  )
}

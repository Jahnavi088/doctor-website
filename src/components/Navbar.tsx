import { useEffect, useRef, useState } from 'react'
import { bookHref, bookLinkProps, nav, type NavItem } from '../data/site'
import { sectionHref } from '../router'
import { Link } from './Link'
import { Logo } from './ui/Logo'
import { Arrow } from './ui/Icons'
import './Navbar.css'

export function Navbar({ path }: { path: string }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const menuBtn = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const onHome = path === '/'
  const hrefOf = (n: NavItem) => (n.path ?? sectionHref(n.id!, path))
  const isCurrent = (n: NavItem) => (n.path ? path.startsWith(n.path) : onHome && active === n.id)

  // scroll-spy (home page only)
  useEffect(() => {
    if (!onHome) return
    // watch every section, so links un-highlight over sections that are not in the header (Experience, Hospital…)
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section'))
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [onHome])

  // mobile menu: lock scroll, close on Escape
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuBtn.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''}`}>
      <div className="container nav__inner">
        <Link href={sectionHref('home', path)} className="nav__brand" aria-label="Dr. Manoj Kumar Jagarlamudi — home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="nav__links" aria-label="Primary">
          <ul>
            {nav.map((n) => (
              <li key={n.label}>
                <Link href={hrefOf(n)} aria-current={isCurrent(n) ? 'true' : undefined}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__actions">
          <a href={bookHref} {...bookLinkProps} className="btn btn--sm nav__cta">
            <span className="nav__cta-long">Book Appointment</span>
            <span className="nav__cta-short" aria-hidden="true">Book</span>
            <Arrow size={14} />
          </a>
          <button
            ref={menuBtn}
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="nav__sheet" hidden={!open}>
        <nav aria-label="Mobile">
          <ol>
            {nav.map((n, i) => (
              <li key={n.label} style={{ ['--i' as string]: i }}>
                <Link href={hrefOf(n)} aria-current={isCurrent(n) ? 'true' : undefined} onClick={() => setOpen(false)}>
                  <span className="nav__sheet-num">{String(i + 1).padStart(2, '0')}</span>
                  {n.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        <a href={bookHref} {...bookLinkProps} className="btn nav__sheet-cta" onClick={() => setOpen(false)}>
          Book an Appointment <Arrow />
        </a>
      </div>
    </header>
  )
}

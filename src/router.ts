import { useEffect, useSyncExternalStore } from 'react'

/**
 * A very small History-API router: the site only has the home page, /blog and /blog/:slug.
 * The host must serve index.html for unknown paths (SPA fallback) — Vite dev/preview already do.
 * Internal links use <Link> (src/components/Link.tsx).
 */

const listeners = new Set<() => void>()
const subscribe = (fn: () => void) => {
  listeners.add(fn)
  window.addEventListener('popstate', fn)
  return () => {
    listeners.delete(fn)
    window.removeEventListener('popstate', fn)
  }
}
const getPath = () => window.location.pathname.replace(/\/+$/, '') || '/'

export function usePath() {
  return useSyncExternalStore(subscribe, getPath)
}

export function navigate(to: string) {
  const url = new URL(to, window.location.href)
  if (url.pathname === window.location.pathname && url.hash) {
    // same page: let the browser do its normal (smooth) anchor scroll
    window.location.hash = url.hash
    return
  }
  window.history.pushState(null, '', url.pathname + url.search + url.hash)
  listeners.forEach((fn) => fn())
}

/** After a page change, jump to the #section in the URL, or to the top. */
export function useScrollOnNavigate(path: string) {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    const root = document.documentElement
    const prev = root.style.scrollBehavior
    root.style.scrollBehavior = 'auto'
    const el = id ? document.getElementById(id) : null
    if (el) el.scrollIntoView()
    else window.scrollTo(0, 0)
    root.style.scrollBehavior = prev
  }, [path])
}

/** Link target for a home-page section: a plain hash on the home page, "/#id" elsewhere. */
export const sectionHref = (id: string, path: string) => (path === '/' ? `#${id}` : `/#${id}`)

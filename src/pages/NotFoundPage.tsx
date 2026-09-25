import { Arrow } from '../components/ui/Icons'
import { Link } from '../components/Link'
import { useDocumentTitle } from './useDocumentTitle'
import './Blog.css'

export function NotFoundPage() {
  useDocumentTitle('Page not found')
  return (
    <section className="bhead nf" aria-labelledby="nf-title">
      <div className="bhead__grid" aria-hidden="true" />
      <div className="container">
        <p className="bhead__eyebrow">404</p>
        <h1 id="nf-title" className="bhead__title">
          Page not found
        </h1>
        <p>The page you were looking for doesn’t exist or has moved.</p>
        <Link href="/" className="btn btn--light">
          Back to home <Arrow />
        </Link>
      </div>
    </section>
  )
}

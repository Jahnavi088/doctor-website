import { Arrow } from '../components/ui/Icons'
import { Link } from '../components/Link'
import { useDocumentTitle } from './useDocumentTitle'
import '../components/PageHeader.css'
import './NotFound.css'

export function NotFoundPage() {
  useDocumentTitle('Page not found')
  return (
    <section className="bhead nf" aria-labelledby="nf-title">
      <div className="container">
        <p className="bhead__eyebrow">404</p>
        <h1 id="nf-title" className="bhead__title">
          Page not found
        </h1>
        <p>The page you were looking for doesn’t exist or has moved.</p>
        <Link href="/" className="btn phero__btn">
          Back to home <Arrow />
        </Link>
      </div>
    </section>
  )
}

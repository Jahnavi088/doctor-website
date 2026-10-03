import { bookHref, bookLinkProps, doctor } from '../data/site'
import { NoteForm } from '../components/NoteForm'
import { Link } from '../components/Link'
import { Arrow } from '../components/ui/Icons'
import { useDocumentTitle } from './useDocumentTitle'
import '../components/HomeSections.css'

export function NotePage() {
  useDocumentTitle(`Leave us a note | ${doctor.name}`)
  return (
    <div className="home-skin">
      <NoteForm
        intro={
          <>
            <nav className="crumbs" aria-label="Breadcrumb">
              <ol>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li aria-current="page">Leave us a note</li>
              </ol>
            </nav>
            <h1 className="note__title">
              Have a question <span>before you book?</span>
            </h1>
            <p className="note__lede">
              Tell us briefly what you would like to discuss with {doctor.shortName}. The clinic team will get back to you. Please
              keep medical details short: a note is not a consultation.{' '}
              <a href={bookHref} {...bookLinkProps} className="note__book">
                Book an appointment instead <Arrow size={13} />
              </a>
            </p>
          </>
        }
      />
    </div>
  )
}

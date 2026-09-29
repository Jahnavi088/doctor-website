import { posts } from '../data/blog'
import { doctor } from '../data/site'
import { BlogCard } from '../components/BlogCard'
import { PageHeader } from '../components/PageHeader'
import { NotePrompt } from '../components/NoteForm'
import { useDocumentTitle } from './useDocumentTitle'
import './Blog.css'


export function BlogPage() {
  useDocumentTitle(`Blog | ${doctor.name}`)
  const [featured, ...rest] = posts

  return (
    <>
      <PageHeader
        id="blog-title"
        crumb="Blog"
        eyebrow="Blog · Patient education"
        title={
          <>
            Notes on joints,
            <br />
            <em>movement &amp; recovery</em>
          </>
        }
        lede={`Clear, general explanations of the conditions and procedures ${doctor.shortName} treats, to help you prepare for a consultation, not replace one.`}
        backdrop={{
          src: '/images/blog-legs.webp',
          srcSet: '/images/blog-legs-720.webp 720w, /images/blog-legs.webp 1280w',
          position: '60% 50%',
          dark: true,
        }}
      />

      <div className="section blist">
        <div className="container">
          {featured && <BlogCard key={featured.slug} post={featured} featured className="blist__featured" />}
          {rest.length > 0 && (
            <div className="blist__grid">
              {rest.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          )}

          <NotePrompt />
        </div>
      </div>

    </>
  )
}

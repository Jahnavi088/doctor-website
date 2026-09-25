import { posts, type Block, type Post } from '../data/blog'
import { bookHref, bookLinkProps, contact, disclaimer, doctor } from '../data/site'
import { BlogCard } from '../components/BlogCard'
import { Arrow } from '../components/ui/Icons'
import { Monogram } from '../components/ui/Logo'
import { Link } from '../components/Link'
import { useDocumentTitle } from './useDocumentTitle'
import './Blog.css'

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

function BlockView({ b }: { b: Block }) {
  if (b.type === 'h2') return <h2 id={slugify(b.text)}>{b.text}</h2>
  if (b.type === 'ul')
    return (
      <ul>
        {b.items.map((it) => (
          <li key={it}>{it}</li>
        ))}
      </ul>
    )
  return <p>{b.text}</p>
}

export function BlogPostPage({ post }: { post: Post }) {
  useDocumentTitle(`${post.title} | ${doctor.name}`)
  const headings = post.body.filter((b): b is Extract<Block, { type: 'h2' }> => b.type === 'h2')
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <>
      <header className="phead" aria-labelledby="post-title">
        <div className="bhead__grid" aria-hidden="true" />
        <div className="container phead__inner">
          <div className="phead__copy">
            <nav className="crumbs" aria-label="Breadcrumb">
              <ol>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
                <li aria-current="page">{post.category}</li>
              </ol>
            </nav>
            <h1 id="post-title" className="phead__title">
              {post.title}
            </h1>
            <p className="phead__meta">
              <span className="phead__cat">{post.category}</span>
              <span>{post.readMins} min read</span>
              {post.date && <span>{post.date}</span>}
            </p>
          </div>
          <div className="phead__art" aria-hidden="true">
            <img src={`/images/expertise/${post.cover}-still.webp`} alt="" width={360} height={360} />
          </div>
        </div>
      </header>

      <div className="section post">
        <div className="container post__grid">
          <article className="prose" aria-labelledby="post-title">
            <p className="prose__lead">{post.excerpt}</p>
            {post.body.map((b, i) => (
              <BlockView key={i} b={b} />
            ))}
            <aside className="prose__note">
              <strong>Please note</strong>
              <p>{disclaimer} Every person is different — discuss your own situation with your doctor.</p>
            </aside>
          </article>

          <aside className="post__side">
            {headings.length > 1 && (
              <nav className="toc" aria-label="In this article">
                <p className="toc__title">In this article</p>
                <ol>
                  {headings.map((h) => (
                    <li key={h.text}>
                      <a href={`#${slugify(h.text)}`}>{h.text}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            <div className="bookcard">
              <Monogram height={34} className="bookcard__mark" />
              <p className="bookcard__title">Have a question about your joints?</p>
              <p className="bookcard__text">
                Consult {doctor.name}, {doctor.qualifications}, at {doctor.hospital}, {doctor.city}.
              </p>
              {contact.timings && <p className="bookcard__time">{contact.timings}</p>}
              <a href={bookHref} {...bookLinkProps} className="btn btn--light btn--sm bookcard__btn">
                Book an Appointment <Arrow size={14} />
              </a>
            </div>
          </aside>
        </div>
      </div>

      {more.length > 0 && (
        <section className="section pmore" aria-labelledby="more-title">
          <div className="container">
            <div className="pmore__head">
              <h2 id="more-title" className="pmore__title">
                More articles
              </h2>
              <Link href="/blog" className="text-link">
                All articles <Arrow />
              </Link>
            </div>
            <div className="blist__grid">
              {more.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

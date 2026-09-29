import { useEffect, useState } from 'react'
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

/** Thin brand-blue bar under the navbar showing how far through the article the reader is. */
function ReadingProgress({ target }: { target: string }) {
  const [p, setP] = useState(0)
  useEffect(() => {
    const el = document.getElementById(target)
    if (!el) return
    let raf = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const total = r.height - window.innerHeight * 0.6
      setP(Math.min(1, Math.max(0, -r.top / Math.max(1, total))))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [target])
  return <div className="readbar" style={{ transform: `scaleX(${p})` }} aria-hidden="true" />
}

/** "In this article" list that highlights the section being read. */
function Contents({ headings }: { headings: string[] }) {
  const [active, setActive] = useState(slugify(headings[0]))
  useEffect(() => {
    const els = headings.map((h) => document.getElementById(slugify(h))).filter((e): e is HTMLElement => !!e)
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-20% 0px -70% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [headings])
  return (
    <nav className="toc" aria-label="In this article">
      <p className="toc__title">In this article</p>
      <ol>
        {headings.map((h) => (
          <li key={h}>
            <a href={`#${slugify(h)}`} aria-current={active === slugify(h) ? 'true' : undefined}>
              {h}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function BlogPostPage({ post }: { post: Post }) {
  useDocumentTitle(`${post.title} | ${doctor.name}`)
  const headings = post.body.filter((b): b is Extract<Block, { type: 'h2' }> => b.type === 'h2').map((h) => h.text)
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <>
      <ReadingProgress target="article-body" />

      <header className="phead" aria-labelledby="post-title">
        <div className="container phead__inner">
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
          <p className="phead__cat">{post.category}</p>
          <h1 id="post-title" className="phead__title">
            {post.title}
          </h1>
          <div className="phead__byline">
            <span className="phead__avatar" aria-hidden="true">
              <Monogram height={22} />
            </span>
            <span>
              <strong>{doctor.name}</strong>
              <span className="phead__meta">
                {doctor.role} · {post.readMins} min read{post.date && <> · {post.date}</>}
              </span>
            </span>
          </div>
        </div>
      </header>

      <div className="phead__figure">
        <div className="container">
          <img src={`/images/blog/${post.slug}.webp`} alt="" width={1200} height={800} fetchPriority="high" decoding="async" />
        </div>
      </div>

      <div className="section post">
        <div className="container post__grid">
          <article id="article-body" className="prose" aria-labelledby="post-title">
            <p className="prose__lead">{post.excerpt}</p>
            {post.body.map((b, i) => (
              <BlockView key={i} b={b} />
            ))}
            <aside className="prose__note">
              <strong>Please note</strong>
              <p>{disclaimer} Every person is different — discuss your own situation with your doctor.</p>
            </aside>

            <div className="author">
              <img
                className="author__photo"
                src="/images/dr-manoj-520.webp"
                alt=""
                width={520}
                height={777}
                loading="lazy"
                decoding="async"
              />
              <div>
                <p className="author__label">Written by</p>
                <p className="author__name">{doctor.name}</p>
                <p className="author__role">
                  {doctor.role} · {doctor.qualifications} · {doctor.hospital}, {doctor.city}
                </p>
                <Link href="/profile" className="author__link">
                  View full profile <Arrow size={14} />
                </Link>
              </div>
            </div>
          </article>

          <aside className="post__side">
            {headings.length > 1 && <Contents headings={headings} />}
            <div className="bookcard">
              <p className="bookcard__title">Have a question about your joints?</p>
              <p className="bookcard__text">
                Consult {doctor.shortName} at {doctor.hospital}, {doctor.city}.
              </p>
              {contact.timings && <p className="bookcard__time">{contact.timings}</p>}
              <a href={bookHref} {...bookLinkProps} className="btn bookcard__btn">
                Book Appointment <Arrow size={14} />
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
                More <span>articles.</span>
              </h2>
              <Link href="/blog" className="pmore__all">
                All articles <Arrow size={14} />
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

import { useState } from 'react'
import { categories, posts } from '../data/blog'
import { doctor } from '../data/site'
import { BlogCard } from '../components/BlogCard'
import { AppointmentCTA } from '../components/AppointmentCTA'
import { useDocumentTitle } from './useDocumentTitle'
import './Blog.css'

export function BlogPage() {
  useDocumentTitle(`Blog | ${doctor.name}`)
  const [cat, setCat] = useState<string | null>(null)
  const list = cat ? posts.filter((p) => p.category === cat) : posts
  const [featured, ...rest] = list

  return (
    <>
      <header className="bhead" aria-labelledby="blog-title">
        <div className="bhead__grid" aria-hidden="true" />
        <div className="container bhead__inner">
          <p className="bhead__eyebrow">Blog · Patient education</p>
          <h1 id="blog-title" className="bhead__title">
            Notes on joints,
            <br />
            <span className="bhead__accent">movement &amp; recovery</span>
          </h1>
          <p className="bhead__lede">
            Clear, general explanations of the conditions and procedures {doctor.shortName} treats — to help you prepare
            for a consultation, not replace one.
          </p>

          <div className="bchips" role="group" aria-label="Filter articles by topic">
            <button type="button" className="bchip" aria-pressed={cat === null} onClick={() => setCat(null)}>
              All <span>{posts.length}</span>
            </button>
            {categories.map((c) => (
              <button key={c} type="button" className="bchip" aria-pressed={cat === c} onClick={() => setCat(c)}>
                {c} <span>{posts.filter((p) => p.category === c).length}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="section blist">
        <div className="container">
          <p className="visually-hidden" aria-live="polite">
            {list.length} {list.length === 1 ? 'article' : 'articles'}
            {cat ? ` in ${cat}` : ''}
          </p>
          {featured && <BlogCard key={featured.slug} post={featured} featured className="blist__featured" />}
          {rest.length > 0 && (
            <div className="blist__grid">
              {rest.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          )}
        </div>
      </div>

      <AppointmentCTA />
    </>
  )
}

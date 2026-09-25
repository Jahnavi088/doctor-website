import { posts } from '../data/blog'
import { useReveal } from '../hooks/useReveal'
import { Link } from './Link'
import { BlogCard } from './BlogCard'
import { Arrow } from './ui/Icons'
import './BlogTeaser.css'

export function BlogTeaser() {
  const ref = useReveal<HTMLElement>()
  return (
    <section id="blog" className="section bteaser" aria-labelledby="bteaser-title" ref={ref}>
      <div className="container">
        <header className="section-head section-head--split">
          <div>
            <p className="eyebrow reveal">From the blog</p>
            <h2 id="bteaser-title" className="h2 reveal" style={{ ['--i' as string]: 1, marginTop: 20 }}>
              Understand your
              <br />
              joints better
            </h2>
          </div>
          <div className="bteaser__side reveal" style={{ ['--i' as string]: 2 }}>
            <p className="lede">Plain-language articles on joint replacement, arthroscopy and recovery.</p>
            <Link href="/blog" className="text-link">
              View all articles <Arrow />
            </Link>
          </div>
        </header>

        <div className="bteaser__grid">
          {posts.slice(0, 3).map((p, i) => (
            <BlogCard key={p.slug} post={p} className="reveal" style={{ ['--i' as string]: i }} />
          ))}
        </div>
      </div>
    </section>
  )
}

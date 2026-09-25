import type { CSSProperties } from 'react'
import type { Post } from '../data/blog'
import { Link } from './Link'
import { Arrow } from './ui/Icons'
import './BlogCard.css'

export function BlogCard({ post, featured = false, className = '', style }: { post: Post; featured?: boolean; className?: string; style?: CSSProperties }) {
  const Heading = featured ? 'h2' : 'h3'
  return (
    <article className={`bcard ${featured ? 'bcard--featured' : ''} ${className}`} style={style}>
      <Link href={`/blog/${post.slug}`} className="bcard__link">
        <div className="bcard__cover" aria-hidden="true">
          <img src={`/images/expertise/${post.cover}-still.webp`} alt="" width={360} height={360} loading="lazy" decoding="async" />
        </div>
        <div className="bcard__body">
          <p className="bcard__meta">
            <span className="bcard__cat">{post.category}</span>
            <span>{post.readMins} min read</span>
          </p>
          <Heading className="bcard__title">{post.title}</Heading>
          <p className="bcard__excerpt">{post.excerpt}</p>
          <span className="bcard__more">
            Read article <Arrow size={14} />
          </span>
        </div>
      </Link>
    </article>
  )
}

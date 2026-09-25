import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { findPost } from './data/blog'
import { HomePage } from './pages/HomePage'
import { BlogPage } from './pages/BlogPage'
import { BlogPostPage } from './pages/BlogPostPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { usePath, useScrollOnNavigate } from './router'

function Page({ path }: { path: string }) {
  if (path === '/') return <HomePage />
  if (path === '/blog') return <BlogPage />
  const post = path.startsWith('/blog/') ? findPost(path.slice(6)) : undefined
  if (post) return <BlogPostPage key={post.slug} post={post} />
  return <NotFoundPage />
}

export default function App() {
  const path = usePath()
  useScrollOnNavigate(path)
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar path={path} />
      <main id="main">
        <Page path={path} />
      </main>
      <Footer path={path} />
    </>
  )
}

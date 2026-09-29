import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { BackToTop } from './components/BackToTop'
import { findPost } from './data/blog'
import { HomePage } from './pages/HomePage'
import { BlogPage } from './pages/BlogPage'
import { ProfilePage } from './pages/ProfilePage'
import { ServicesPage } from './pages/ServicesPage'
import { ExpertisePage } from './pages/ExpertisePage'
import { ContactPage } from './pages/ContactPage'
import { NotePage } from './pages/NotePage'
import { AppointmentPage } from './pages/AppointmentPage'
import { BlogPostPage } from './pages/BlogPostPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { useInternalLinks, usePath, useScrollOnNavigate } from './router'

function Page({ path }: { path: string }) {
  if (path === '/') return <HomePage />
  if (path === '/profile') return <ProfilePage />
  if (path === '/expertise') return <ExpertisePage />
  if (path === '/services') return <ServicesPage />
  if (path === '/contact') return <ContactPage />
  if (path === '/note') return <NotePage />
  if (path === '/appointment') return <AppointmentPage />
  if (path === '/blog') return <BlogPage />
  const post = path.startsWith('/blog/') ? findPost(path.slice(6)) : undefined
  if (post) return <BlogPostPage key={post.slug} post={post} />
  return <NotFoundPage />
}

export default function App() {
  const path = usePath()
  useScrollOnNavigate(path)
  useInternalLinks()
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar path={path} />
      <main id="main" key={path} className="page">
        <Page path={path} />
      </main>
      <Footer path={path} />
      <BackToTop />
    </>
  )
}

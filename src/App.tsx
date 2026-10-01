import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { BackToTop } from './components/BackToTop'
import { HomePage } from './pages/HomePage'
import { TestimonialsPage } from './pages/TestimonialsPage'
import { ProfilePage } from './pages/ProfilePage'
import { ServicesPage } from './pages/ServicesPage'
import { ExpertisePage } from './pages/ExpertisePage'
import { ContactPage } from './pages/ContactPage'
import { NotePage } from './pages/NotePage'
import { AppointmentPage } from './pages/AppointmentPage'
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
  if (path === '/testimonials') return <TestimonialsPage />
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

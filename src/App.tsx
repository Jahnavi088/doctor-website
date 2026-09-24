import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { TrustStats } from './components/TrustStats'
import { AboutDoctor } from './components/AboutDoctor'
import { Expertise } from './components/Expertise'
import { KneeVisualization } from './components/KneeVisualization'
import { Experience } from './components/Experience'
import { PatientJourney } from './components/PatientJourney'
import { HospitalSection } from './components/HospitalSection'
import { AppointmentCTA } from './components/AppointmentCTA'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <TrustStats />
        <AboutDoctor />
        <Expertise />
        <Experience />
        <KneeVisualization />
        <PatientJourney />
        <HospitalSection />
        <AppointmentCTA />
      </main>
      <Footer />
    </>
  )
}

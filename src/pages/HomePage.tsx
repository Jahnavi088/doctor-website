import { Hero } from '../components/Hero'
import { TrustStats } from '../components/TrustStats'
import { AboutDoctor } from '../components/AboutDoctor'
import { Expertise } from '../components/Expertise'
import { KneeVisualization } from '../components/KneeVisualization'
import { Experience } from '../components/Experience'
import { PatientJourney } from '../components/PatientJourney'
import { HospitalSection } from '../components/HospitalSection'
import { BlogTeaser } from '../components/BlogTeaser'
import { AppointmentCTA } from '../components/AppointmentCTA'

export function HomePage() {
  return (
    <>
      <Hero />
      <TrustStats />
      <AboutDoctor />
      <Expertise />
      <Experience />
      <KneeVisualization />
      <PatientJourney />
      <HospitalSection />
      <BlogTeaser />
      <AppointmentCTA />
    </>
  )
}

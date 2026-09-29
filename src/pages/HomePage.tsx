import { Hero } from '../components/Hero'
import { AboutDoctor } from '../components/AboutDoctor'
import { PatientJourney } from '../components/PatientJourney'
import { AppointmentCTA } from '../components/AppointmentCTA'
import { Expertise } from '../components/Expertise'
import { Approach, BlogPreview, Conditions, ContactLocation, ServicesOverview } from '../components/HomeSections'
import { Faq } from '../components/Faq'
import { Link } from '../components/Link'
import { Arrow } from '../components/ui/Icons'
import { homeFaqs, journeyHome } from '../data/site'

/**
 * Home = overview. Each section is short and links on to the page with the detail:
 * Profile (doctor), Expertise (specialisations), Services (treatments), Blog, Contact.
 */
export function HomePage() {
  return (
    <div className="home">
      {/* 1 */}
      <Hero />
      {/* 3 */}
      <AboutDoctor />
      {/* 4 */}
      <Expertise />
      {/* 5 */}
      <Conditions />
      {/* 6 */}
      <ServicesOverview />
      {/* 7 */}
      <Approach />
      {/* 9 */}
      <PatientJourney
        steps={journeyHome}
        eyebrow="Patient journey"
        title={
          <>
            From booking
            <br />
            to recovery.
          </>
        }
        lede="The practical side of your care: how to book, what happens at your visit, and the follow-up afterwards."
      />
      {/* 10 */}
      <BlogPreview />
      {/* FAQ: the most common questions; full lists on Services and Contact */}
      <Faq
        id="faq"
        items={homeFaqs}
        title={
          <>
            Common questions,
            <br />
            <span className="faq__accent">answered.</span>
          </>
        }
        lede="Short, general answers. Your own plan is always discussed in person."
        aside={
          <div className="faq__more">
            <Link href="/services#faq" className="hs-more">
              Treatment questions <Arrow size={14} />
            </Link>
            <Link href="/contact#faq" className="hs-more">
              Booking &amp; visit questions <Arrow size={14} />
            </Link>
          </div>
        }
      />
      {/* 11 */}
      <AppointmentCTA />
      {/* 12 */}
      <ContactLocation />
    </div>
  )
}

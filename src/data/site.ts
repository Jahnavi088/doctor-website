import type { Picto } from '../components/ui/Pictos'
/**
 * Single source of truth for everything the site says about Dr. Manoj.
 *
 * Sources
 *  - "client":  supplied by Dr. Manoj Kumar Jagarlamudi (biography, 4,000+ surgeries, qualifications, logo, photo)
 *  - "profile": shown on his public Practo profile (checked 24 Sep 2026): experience, education,
 *               registration, timings and online booking
 *
 * Phone and email are intentionally `null` until confirmed by the clinic.
 * Nothing on the page invents contact details: when a value is null the UI
 * shows a clearly-marked placeholder instead.
 */

export type Source = 'client' | 'profile'

export const doctor = {
  name: 'Dr. Manoj Kumar Jagarlamudi',
  nameLines: ['Dr. Manoj Kumar', 'Jagarlamudi'],
  shortName: 'Dr. Manoj',
  qualifications: 'MBBS, MS (Ortho), FIJR',
  role: 'Orthopaedic Surgeon',
  focus: ['Joint Replacement', 'Arthroscopy', 'Trauma Care'],
  hospital: 'Srikara Hospitals',
  city: 'Vijayawada',
  /** Practo: "10 Years Experience Overall (5 years as specialist)" */
  experience: { overall: '10 Years', specialist: '5 years as a specialist' },
  registration: { number: 'APMC/FMR/96473', council: 'Andhra Pradesh Medical Council', year: '2016' },
}

/** From his Practo profile. */
export const education = [
  { year: '2016', title: 'MBBS', place: 'Dr. NTR University of Health Sciences' },
  { year: '2021', title: 'MS — Orthopaedics', place: 'Dr. NTR University of Health Sciences' },
  { year: '2023', title: 'Fellowship in Arthroplasty', place: 'Srikara Hospital' },
]

export const practoUrl = 'https://www.practo.com/vijayawada/doctor/dr-manoj-kumar-jagarlamudi-orthopedist'

export const contact = {
  /** Online booking — currently his Practo profile */
  bookingUrl: practoUrl as string | null,
  bookingLabel: 'Book on Practo',
  /** e.g. '+91 …' — appointment desk number, once confirmed */
  phone: null as string | null,
  /** e.g. 'appointments@…' */
  email: null as string | null,
  /** WhatsApp number for appointments, with country code, e.g. '+91 98765 43210' — to be supplied */
  whatsapp: null as string | null,
  hospitalUrl: 'https://srikarahospitals.com/',
  /** Practo lists "Mon - Sat, 09:00 - 05:00" — confirm with the hospital before launch. */
  timings: 'Monday – Saturday, 9:00 AM – 5:00 PM' as string | null,
  // Srikara Hospitals, Vijayawada — matches the hospital's Google Maps listing and Practo (S Number 90/1A,2A,
  // Kanuru Donka Road, Penamaluru Mandal) with the 520007 pin code from other listings.
  address: ['2A, R.S.No. 90/1A, Donka Road,', 'Kanuru, Penamaluru Mandal,', 'Vijayawada, Andhra Pradesh 520007'],
  mapQuery: 'Srikara Hospitals, Kanuru Donka Road, Kanuru, Vijayawada, Andhra Pradesh 520007',
  /**
   * "Leave us a note" form delivery. Any Formspree-compatible endpoint works
   * (e.g. 'https://formspree.io/f/xxxx' or 'https://api.web3forms.com/submit').
   * While null, the form falls back to `email` (opens the visitor's mail app); with neither set
   * it shows a clearly-marked "not connected yet" notice instead of pretending to send.
   */
  noteEndpoint: null as string | null,
  /** Only needed for Web3Forms: its public access key. */
  noteAccessKey: null as string | null,
}

/** Every "Book Appointment" button opens the appointment page, which lists the ways to book. */
export const bookHref = '/appointment'
export const bookLinkProps = {}

const digits = (s: string) => s.replace(/[^\d]/g, '')
export const phoneHref = contact.phone ? `tel:+${digits(contact.phone)}` : null
export const whatsappHref = contact.whatsapp
  ? `https://wa.me/${digits(contact.whatsapp)}?text=${encodeURIComponent(`Hello, I would like to book an appointment with Dr. Manoj Kumar Jagarlamudi.`)}`
  : null

/** A home-page section (`id`) or a separate page (`path`). */
export type NavItem = { label: string; id?: string; path?: string }

/** Header: every item is its own page. */
export const nav: NavItem[] = [
  { path: '/', label: 'Home' },
  { path: '/profile', label: 'Profile' },
  { path: '/expertise', label: 'Expertise' },
  { path: '/services', label: 'Services' },
  { path: '/blog', label: 'Blog' },
  { path: '/contact', label: 'Contact' },
]

/** Footer: the pages plus a few useful deep links. */
export const footerNav: NavItem[] = [
  ...nav,
  { path: '/services#faq', label: 'FAQs' },
  { path: '/note', label: 'Leave a note' },
]

/** Hero strip: one column per kind of fact (experience, credentials, specialty, hospital) */
export const trustStats: { label: string; value: string; detail?: string; source: Source }[] = [
  { label: 'Experience', value: '4,000+', detail: 'Surgeries · 10 years in practice', source: 'client' },
  { label: 'Qualification', value: 'MBBS, MS (Ortho)', detail: 'FIJR', source: 'client' },
  { label: 'Specialty', value: 'Joint Replacement', detail: 'Arthroscopy · Trauma Care', source: 'client' },
  { label: 'Hospital', value: 'Srikara Hospitals', detail: 'Vijayawada', source: 'client' },
]

export const sourceNotes: Record<Source, { mark: string; text: string }> = {
  client: { mark: '†', text: 'As provided by Dr. Manoj Kumar Jagarlamudi.' },
  profile: { mark: '*', text: 'As listed on his Practo profile.' },
}

/** The doctor-supplied biography, split into paragraphs. Wording unchanged. */
export const biography = [
  'Dr. Manoj Kumar Jagarlamudi is a highly skilled orthopaedic surgeon with expertise in [joint replacements] and [arthroscopy].',
  'With over [4,000 successful surgeries], he is known for precision and advanced techniques, restoring mobility and improving patients’ quality of life.',
  'His dedication, experience, and [compassionate approach] make him a trusted name in orthopaedics.',
]

/** Short introduction for the home-page Profile section (the full biography stays on /profile). */
export const profileIntro = [
  'Dr. Manoj Kumar Jagarlamudi is an orthopaedic surgeon specializing in [joint replacement] and [arthroscopy], with a focus on restoring mobility through precise, patient-focused care.',
  'His practice focuses on knee and hip replacement procedures with a personalized approach to each patient.',
]

/** Home page introduction: short on purpose; the full biography lives on /profile. */
export const homeIntro =
  'He specialises in [joint replacement] and [arthroscopy], with a practice focused on knee and hip replacement and a personalised plan for every patient.'

export type Glyph = 'replacement' | 'arthroscopy' | 'robotic' | 'trauma'

export const expertise: { title: string; text: string; glyph: Glyph }[] = [
  {
    title: 'Joint Replacement',
    text: 'Replacing a worn or damaged joint surface with an implant, most often considered for advanced arthritis of the knee or hip.',
    glyph: 'replacement',
  },
  {
    title: 'Arthroscopy',
    text: 'A minimally invasive approach that uses a small camera and fine instruments, through small incisions, to examine and treat problems inside a joint.',
    glyph: 'arthroscopy',
  },
  {
    title: 'Robotic Joint Replacement',
    text: 'Joint replacement in which robotic-arm assistance helps carry out a pre-planned bone preparation and implant positioning.',
    glyph: 'robotic',
  },
  {
    title: 'Trauma Care',
    text: 'Assessment and treatment of fractures and other bone and joint injuries, managed surgically or non-surgically as appropriate.',
    glyph: 'trauma',
  },
]

export type KneeMode = 'mobility' | 'stability' | 'function'

export const kneePrinciples: { id: KneeMode; title: string; lead: string; text: string }[] = [
  {
    id: 'mobility',
    title: 'Mobility',
    lead: 'Movement in everyday life.',
    text: 'The knee works mainly as a hinge, bending and straightening with a small amount of rotation — the movement behind walking, sitting down and climbing stairs.',
  },
  {
    id: 'stability',
    title: 'Stability',
    lead: 'Support during weight-bearing activity.',
    text: 'Ligaments on either side of the joint, together with the menisci — two C-shaped cartilage cushions — help keep the knee steady while it carries body weight.',
  },
  {
    id: 'function',
    title: 'Function',
    lead: 'The coordinated movement of the joint.',
    text: 'Bone, cartilage, ligaments and muscle work together. The kneecap glides in a groove at the end of the thigh bone, helping the thigh muscles straighten the leg.',
  },
]

export const journey = [
  { title: 'Consultation', text: 'A conversation about your symptoms, history and the activities you want to return to.' },
  { title: 'Clinical Assessment', text: 'Physical examination, with imaging or tests where needed, to understand the cause.' },
  { title: 'Treatment Planning', text: 'Non-surgical and surgical options are discussed openly, so the plan fits you.' },
  { title: 'Procedure / Treatment', text: 'Treatment is carried out as planned — whether conservative care or surgery.' },
  { title: 'Recovery', text: 'Follow-up and rehabilitation guidance to support a steady return to movement.' },
]

export const disclaimer =
  'Information on this website is for general informational purposes and does not replace professional medical advice, diagnosis or treatment.'

/* ------------------------------------------------------------------
   Services
   Derived from his four specialties (joint replacement, robotic joint replacement,
   arthroscopy, trauma care). Practo lists no separate services, so Dr. Manoj should
   confirm this list before launch. General descriptions only: no outcome claims.
------------------------------------------------------------------- */

export type ServiceIcon = 'knee' | 'hip' | 'robotic' | 'scope' | 'fracture' | 'consult'

export type Service = {
  slug: string
  title: string
  short: string
  text: string
  involves: string[]
  consideredFor: string[]
  icon: ServiceIcon
  /** pre-rendered 3D still in /public/images/expertise, when one fits */
  render?: Glyph
}

export const services: Service[] = [
  {
    slug: 'knee-replacement',
    title: 'Knee Replacement',
    short: 'Resurfacing a worn knee with implant components when arthritis keeps limiting daily life.',
    text: 'In a knee replacement, the damaged surfaces of the joint are replaced with implant components. It is a planned operation, so there is time to understand the options, prepare at home and plan the recovery before surgery.',
    involves: ['Examination and X-rays to understand the joint', 'Replacement of the worn joint surfaces with implant components', 'A structured rehabilitation plan and follow-up visits'],
    consideredFor: ['Advanced knee arthritis', 'Knee pain and stiffness that persist despite non-surgical care'],
    icon: 'knee',
    render: 'replacement',
  },
  {
    slug: 'hip-replacement',
    title: 'Hip Replacement',
    short: 'Replacing a damaged hip joint to ease pain and help restore everyday movement.',
    text: 'Hip replacement replaces the worn ball-and-socket surfaces of the hip with implant components. The decision is made together, after a careful assessment of symptoms, examination and imaging.',
    involves: ['Assessment of the hip with examination and imaging', 'Replacement of the ball and socket with implant components', 'Guided mobilisation and rehabilitation afterwards'],
    consideredFor: ['Advanced hip arthritis', 'Hip pain that limits walking, sleep or daily activity'],
    icon: 'hip',
  },
  {
    slug: 'robotic-joint-replacement',
    title: 'Robotic Joint Replacement',
    short: 'Joint replacement with robotic-arm assistance carrying out a pre-planned bone preparation.',
    text: 'The surgeon performs the operation. Imaging is used to plan implant size and position in advance, and the robotic arm helps carry out bone preparation within the boundaries of that plan.',
    involves: ['Imaging-based planning of implant size and position', 'Robotic-arm guided bone preparation, with the surgeon in control', 'The same careful rehabilitation as any joint replacement'],
    consideredFor: ['Patients planned for joint replacement, where suitable', 'Discussed case by case at consultation'],
    icon: 'robotic',
    render: 'robotic',
  },
  {
    slug: 'arthroscopy',
    title: 'Arthroscopy',
    short: 'Keyhole joint surgery: a small camera and fine instruments through small incisions.',
    text: 'Arthroscopy lets the surgeon examine and treat problems inside a joint through a few small incisions, watching the joint on a screen. What is done inside the joint shapes the recovery plan.',
    involves: ['A slim camera (arthroscope) inserted through a small incision', 'Fine instruments to treat the problem found', 'Exercises and physiotherapy tailored to the procedure'],
    consideredFor: ['Certain meniscus and ligament problems', 'Some cartilage and joint-lining conditions'],
    icon: 'scope',
    render: 'arthroscopy',
  },
  {
    slug: 'trauma-care',
    title: 'Fracture & Trauma Care',
    short: 'Assessment and treatment of fractures and bone and joint injuries.',
    text: 'Fractures are treated in different ways depending on the bone, the type of break and the person. Some heal with a cast, splint or brace; others need surgery to hold the bone in place while it heals.',
    involves: ['Assessment with examination and X-rays', 'Non-surgical care or surgical fixation, as appropriate', 'Follow-up to check healing, then guided return to movement'],
    consideredFor: ['Fractures and bone injuries', 'Joint injuries after falls, sport or accidents'],
    icon: 'fracture',
    render: 'trauma',
  },
  {
    slug: 'joint-pain-consultation',
    title: 'Joint Pain & Arthritis Care',
    short: 'Finding the cause of joint pain and talking through every option, surgical or not.',
    text: 'Not every joint problem needs surgery. A consultation starts with your symptoms, history and goals, followed by examination and imaging where needed, and an open conversation about non-surgical and surgical options.',
    involves: ['A detailed consultation and examination', 'Imaging or tests where needed', 'A clear plan, with non-surgical options discussed first where appropriate'],
    consideredFor: ['Ongoing knee, hip or joint pain', 'Stiffness or swelling that affects daily life', 'A second look at a treatment plan'],
    icon: 'consult',
  },
]

/* ------------------------------------------------------------------
   Why choose Dr. Jagarlamudi: every point is a supplied or Practo-listed fact.
------------------------------------------------------------------- */
/* ------------------------------------------------------------------
   FAQs: general, non-promissory answers.
------------------------------------------------------------------- */
export type Faq = { q: string; a: string }

export const treatmentFaqs: Faq[] = [
  {
    q: 'Does every joint problem need surgery?',
    a: 'No. A consultation starts with your symptoms, history and the activities you want to return to. Non-surgical and surgical options are discussed openly, and surgery is only recommended when it is the right step for you.',
  },
  {
    q: 'When is joint replacement usually considered?',
    a: 'Generally when pain and stiffness from advanced arthritis keep limiting daily life despite non-surgical care. The decision is based on your symptoms, examination and imaging, and is made together.',
  },
  {
    q: 'What does “robotic” joint replacement mean?',
    a: 'The surgeon performs the operation. The robotic arm is a tool that helps carry out bone preparation within a plan made in advance from imaging of your joint. Whether it suits you is discussed at consultation.',
  },
  {
    q: 'How is arthroscopy different from open surgery?',
    a: 'Arthroscopy works through a few small incisions with a slim camera and fine instruments, rather than one large opening. The recovery plan depends on what is done inside the joint.',
  },
  {
    q: 'How long does recovery take?',
    a: 'It depends on the procedure and on the person. You will receive a recovery and rehabilitation plan, with follow-up visits to check progress. Ask about anything that feels unexpected along the way.',
  },
]

export const contactFaqs: Faq[] = [
  {
    q: 'How do I book an appointment?',
    a: 'Any “Book Appointment” button on this site opens the appointment page, where you can book online through Practo. WhatsApp booking will be added soon.',
  },
  {
    q: 'Where does Dr. Manoj consult?',
    a: 'At Srikara Hospitals, Kanuru, Vijayawada. The full address, a map and directions are on this page.',
  },
  {
    q: 'What are the consultation timings?',
    a: 'Monday to Saturday, 9:00 AM to 5:00 PM. Please confirm your slot when you book.',
  },
  {
    q: 'What should I bring to my first consultation?',
    a: 'Any previous reports, X-rays or MRI scans, a list of the medicines you take, and the questions you would like answered.',
  },
  {
    q: 'Can I ask a question before booking?',
    a: 'Yes. Use the “Leave us a note” page. It is not monitored for emergencies and is not a substitute for a consultation.',
  },
  {
    q: 'What should I do in an emergency?',
    a: 'Go to the nearest hospital emergency department straight away. Do not use the website form or wait for an appointment.',
  },
]

/** Home: the five questions patients ask most, drawn from the two full lists. */
export const homeFaqs: Faq[] = [
  treatmentFaqs[0],
  treatmentFaqs[1],
  treatmentFaqs[4],
  contactFaqs[0],
  contactFaqs[3],
]

/* ------------------------------------------------------------------
   To be supplied by the clinic. Sections using these stay hidden while empty.
------------------------------------------------------------------- */

/** Patient testimonials: add only genuine, consented feedback. */
export const testimonials: { quote: string; name: string; detail?: string }[] = []

/** Photos for the Services page gallery, e.g. { src: '/images/gallery/ot.webp', alt: '…', caption: '…' } */
export const gallery: { src: string; alt: string; caption?: string }[] = []

/* ------------------------------------------------------------------
   Home page (landing) content. Informational wording only: no outcome claims.
------------------------------------------------------------------- */

/**
 * Areas of expertise — short text for the home overview, detail for /expertise.
 * General descriptions only; `services` lists the matching treatment slugs.
 */
export type ExpertiseArea = {
  slug: string
  title: string
  icon: ServiceIcon
  short: string
  text: string
  focus: string[]
  services: string[]
}

export const expertiseAreas: ExpertiseArea[] = [
  {
    slug: 'joint-replacement',
    title: 'Joint Replacement',
    icon: 'robotic',
    short: 'Knee and hip replacement, including robotic-arm assisted surgery where suitable.',
    text: 'Joint replacement resurfaces a worn or damaged joint with implant components. It is a planned operation, usually considered when advanced arthritis keeps limiting daily life despite non-surgical care, and it is followed by a structured recovery plan.',
    focus: ['Total knee replacement', 'Total hip replacement', 'Robotic-arm assisted joint replacement', 'Planning and rehabilitation around surgery'],
    services: ['knee-replacement', 'hip-replacement', 'robotic-joint-replacement'],
  },
  {
    slug: 'arthroscopy',
    title: 'Arthroscopy',
    icon: 'scope',
    short: 'Keyhole surgery to examine and treat problems inside a joint through small incisions.',
    text: 'Arthroscopy uses a slim camera and fine instruments through a few small incisions to look inside a joint and treat what is found. It is commonly used for certain ligament, meniscus and cartilage problems.',
    focus: ['Diagnostic arthroscopy', 'Certain meniscus and ligament problems', 'Some cartilage and joint-lining conditions'],
    services: ['arthroscopy'],
  },
  {
    slug: 'knee-care',
    title: 'Knee Care',
    icon: 'knee',
    short: 'Assessment and treatment of knee pain, arthritis and injury, surgical or not.',
    text: 'Knee problems range from arthritis and wear to ligament and meniscus injuries. Care starts with finding the cause, then weighing non-surgical options, arthroscopy or replacement according to the problem and the person.',
    focus: ['Knee pain and stiffness', 'Knee osteoarthritis', 'Ligament and meniscus injuries', 'Knee replacement'],
    services: ['joint-pain-consultation', 'arthroscopy', 'knee-replacement'],
  },
  {
    slug: 'hip-care',
    title: 'Hip Care',
    icon: 'hip',
    short: 'Care for hip pain and arthritis, from diagnosis to hip replacement.',
    text: 'Hip pain can come from the joint itself or from the structures around it. A careful assessment with examination and imaging guides the plan, from non-surgical care to hip replacement when the joint is badly worn.',
    focus: ['Hip pain and stiffness', 'Hip arthritis', 'Hip replacement'],
    services: ['joint-pain-consultation', 'hip-replacement'],
  },
]

/** Conditions commonly treated. General descriptions — Dr. Manoj should confirm the list before launch. */
/**
 * Conditions commonly treated, in two groups. General descriptions — Dr. Manoj should confirm the list
 * before launch. `area` links to an expertise area on /expertise; `service` (when no area fits) to /services.
 */
export type ConditionGroup = 'pain' | 'injury'

export const conditionGroups: { id: ConditionGroup; title: string; short: string; text: string; photo: { src: string; alt: string } }[] = [
  {
    id: 'pain',
    title: 'Pain, arthritis & joint problems',
    short: 'Pain & arthritis',
    text: 'Problems that build up over time and slowly limit movement.',
    photo: { src: '/images/service-photos/joint-pain-consultation.webp', alt: 'A clinician examining a patient’s painful knee' },
  },
  {
    id: 'injury',
    title: 'Injuries & movement problems',
    short: 'Injuries',
    text: 'Damage from a fall, an accident, sport or a sudden twist.',
    photo: { src: '/images/blog/after-a-fracture.webp', alt: 'A clinician examining a patient’s injured ankle' },
  },
]

export const conditions: { title: string; text: string; group: ConditionGroup; picto: Picto; area?: string; service?: string }[] = [
  { title: 'Knee pain', text: 'Pain or stiffness that affects walking and stairs.', group: 'pain', picto: 'knee', area: 'knee-care' },
  { title: 'Hip pain', text: 'Pain in the groin, hip or thigh.', group: 'pain', picto: 'hip', area: 'hip-care' },
  { title: 'Osteoarthritis', text: 'Wear of the cartilage in the knee or hip.', group: 'pain', picto: 'arthritis', area: 'joint-replacement' },
  { title: 'Joint stiffness', text: 'Loss of movement in everyday tasks.', group: 'pain', picto: 'stiffness', area: 'joint-replacement' },
  { title: 'Ligament injuries', text: 'ACL and other tears, often from sport.', group: 'injury', picto: 'ligament', area: 'arthroscopy' },
  { title: 'Meniscus tears', text: 'Damage to the knee’s cartilage cushions.', group: 'injury', picto: 'meniscus', area: 'arthroscopy' },
  { title: 'Sports injuries', text: 'Joint injuries from sport and exercise.', group: 'injury', picto: 'sport', area: 'arthroscopy' },
  { title: 'Fractures', text: 'Broken bones after a fall or accident.', group: 'injury', picto: 'fracture', service: 'trauma-care' },
]

/** Home › 7. Approach to care. */
export const approach = [
  {
    title: 'Evaluation',
    text: 'Your symptoms, history, examination and imaging, to find the cause.',
    points: ['A conversation about your pain and what it stops you doing', 'Examination of the joint', 'X-rays or scans where they are needed'],
  },
  {
    title: 'Planning',
    text: 'Non-surgical and surgical options explained, and a plan agreed together.',
    points: ['Non-surgical options are always discussed', 'Benefits, risks and recovery explained plainly', 'Time for your questions before deciding'],
  },
  {
    title: 'Treatment',
    text: 'Care carried out as planned, whether conservative treatment or surgery.',
    points: ['Conservative care or surgery, as agreed', 'Clear instructions for before and after', 'The plan reviewed if anything changes'],
  },
  {
    title: 'Recovery',
    text: 'Rehabilitation guidance and follow-up for a steady return to movement.',
    points: ['Rehabilitation and exercise guidance', 'Scheduled follow-up visits', 'A steady return to everyday activity'],
  },
]

/** Home › 9. Patient journey — the practical steps, from booking to recovery. */
export const journeyHome: { title: string; text: string; picto: Picto }[] = [
  { title: 'Book', text: 'Book online through Practo, choosing a time that suits you.', picto: 'calendar' },
  { title: 'Consultation', text: 'Meet Dr. Manoj at Srikara Hospitals and talk through your concerns.', picto: 'consult' },
  { title: 'Treatment', text: 'Begin the treatment agreed at your consultation.', picto: 'treatment' },
  { title: 'Recovery', text: 'Follow-up visits and guidance until you are moving well again.', picto: 'recovery' },
]

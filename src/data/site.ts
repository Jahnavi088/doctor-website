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
  hospitalUrl: 'https://srikarahospitals.com/',
  /** Practo lists "Mon - Sat, 09:00 - 05:00" — confirm with the hospital before launch. */
  timings: 'Monday – Saturday, 9:00 AM – 5:00 PM' as string | null,
  // Srikara Hospitals, Vijayawada — matches the hospital's Google Maps listing and Practo (S Number 90/1A,2A,
  // Kanuru Donka Road, Penamaluru Mandal) with the 520007 pin code from other listings.
  address: ['2A, R.S.No. 90/1A, Donka Road,', 'Kanuru, Penamaluru Mandal,', 'Vijayawada, Andhra Pradesh 520007'],
  mapQuery: 'Srikara Hospitals, Kanuru Donka Road, Kanuru, Vijayawada, Andhra Pradesh 520007',
}

export const bookHref = contact.bookingUrl ?? (contact.phone ? `tel:${contact.phone.replace(/\s+/g, '')}` : '#appointment')

/** Extra props for the "Book" links: external booking pages open in a new tab. */
export const bookLinkProps = /^https?:/.test(bookHref) ? { target: '_blank', rel: 'noopener noreferrer' } : {}

export const nav = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'experience', label: 'Experience' },
  { id: 'hospital', label: 'Hospital' },
  { id: 'appointment', label: 'Contact' },
]

export const trustStats: { value: string; label: string; source: Source }[] = [
  { value: '4,000+', label: 'Successful surgeries', source: 'client' },
  { value: '10 Years', label: 'Experience', source: 'profile' },
  { value: 'MBBS', label: 'Qualification', source: 'client' },
  { value: 'MS (Ortho)', label: 'Orthopaedic Surgery', source: 'client' },
  { value: 'Srikara Hospitals', label: 'Vijayawada', source: 'client' },
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

/**
 * Patient experiences for /testimonials and the home "Patient stories" section.
 *
 * NOTHING HERE IS A REAL PATIENT REVIEW YET. Every entry is a clearly marked placeholder (`placeholder: true`):
 * the page shows a "Placeholder" label on each one, and the wording says what will go there.
 *
 * To publish a real testimonial (only with the patient's written consent):
 *  1. Replace `quote` with the patient's own words, unedited apart from spelling.
 *  2. Set `name` to what the patient agreed to — full name, first name + initial, or a privacy-safe label
 *     such as 'Patient from Vijayawada'.
 *  3. Set `procedure`, and optionally `date` (e.g. 'March 2026').
 *  4. Set `verified: true` ONLY if the clinic has confirmed this person was treated by Dr. Manoj.
 *  5. Optionally add a consented `photo` (public/images/testimonials/<name>.webp) or `video`
 *     (public/videos/<name>.mp4, H.264, plus a poster image).
 *  6. Delete `placeholder: true`.
 * Mark one entry `featured: true` to show it as the large story near the top of the page.
 */

export type Procedure = 'knee' | 'hip' | 'arthroscopy' | 'trauma'

export const procedures: { id: Procedure; label: string }[] = [
  { id: 'knee', label: 'Knee Replacement' },
  { id: 'hip', label: 'Hip Replacement' },
  { id: 'arthroscopy', label: 'Arthroscopy' },
  { id: 'trauma', label: 'Trauma Care' },
]

export type Testimonial = {
  quote: string
  /** what the patient agreed to be called; a privacy-safe label is fine */
  name: string
  procedure: Procedure
  /** optional month/year of treatment, e.g. 'March 2026' */
  date?: string
  /** only when the clinic has confirmed the person was a patient */
  verified?: boolean
  /** the large story near the top of /testimonials */
  featured?: boolean
  /** consented patient photo */
  photo?: { src: string; alt: string }
  /** consented patient video */
  video?: { src: string; poster: string; duration: string }
  /** placeholder content, shown with a visible "Placeholder" label */
  placeholder?: boolean
}

export const testimonials: Testimonial[] = [
  {
    featured: true,
    quote:
      'This space is reserved for one patient’s own account of their care: how the first consultation felt, how the treatment plan was explained, and what getting back to everyday movement has meant to them. It will be published only in their words and with their written consent.',
    name: 'Patient name',
    procedure: 'knee',
    placeholder: true,
  },
  {
    quote: 'A knee replacement patient’s experience will appear here, in their own words: for example, how the options were explained before deciding on surgery.',
    name: 'Patient name',
    procedure: 'knee',
    placeholder: true,
  },
  {
    quote: 'A hip replacement patient’s experience will appear here, in their own words: for example, what the consultation and planning were like.',
    name: 'Patient name',
    procedure: 'hip',
    placeholder: true,
  },
  {
    quote: 'An arthroscopy patient’s experience will appear here, in their own words: for example, how the procedure and recovery plan were explained.',
    name: 'Patient name',
    procedure: 'arthroscopy',
    placeholder: true,
  },
  {
    quote: 'A trauma care patient’s experience will appear here, in their own words: for example, how their injury was assessed and followed up.',
    name: 'Patient name',
    procedure: 'trauma',
    placeholder: true,
  },
  {
    quote: 'A second knee patient’s experience will appear here, in their own words: for example, what the follow-up visits and rehabilitation guidance were like.',
    name: 'Patient name',
    procedure: 'knee',
    placeholder: true,
  },
  {
    quote: 'A second hip patient’s experience will appear here, in their own words: for example, the questions they had and how they were answered.',
    name: 'Patient name',
    procedure: 'hip',
    placeholder: true,
  },
]

export const procedureLabel = (id: Procedure) => procedures.find((p) => p.id === id)?.label ?? ''

/** The large story: the entry marked `featured`, else the first one. */
export const featuredTestimonial = testimonials.find((t) => t.featured) ?? testimonials[0]

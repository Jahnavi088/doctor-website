import { useState, type FormEvent, type ReactNode } from 'react'
import { bookHref, bookLinkProps, contact, doctor } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import { Link } from './Link'
import { Arrow } from './ui/Icons'
import { Check } from './ui/ServiceIcons'
import './NoteForm.css'

type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'error' | 'unconfigured'

const topics = ['Appointment', 'Knee', 'Hip', 'Arthroscopy', 'Fracture or injury', 'Something else']
const MAX = 1200

const nextSteps = [
  { title: 'Send your note', text: 'A few lines about what you would like to ask.' },
  { title: 'The clinic team reads it', text: `Your note goes to ${doctor.shortName}’s team at ${doctor.hospital}.` },
  { title: 'We get back to you', text: 'By phone or email, usually to help you book the right appointment.' },
]

/**
 * "Leave us a note" form. Delivery (see `contact` in src/data/site.ts):
 *  1. `noteEndpoint` set → POSTs the form (Formspree / Web3Forms compatible)
 *  2. else `email` set → opens the visitor's mail app with the note filled in
 *  3. else → says plainly that online notes are not connected yet. Nothing pretends to send.
 */
export function NoteForm({ intro }: { intro?: ReactNode }) {
  const ref = useReveal<HTMLElement>()
  const [status, setStatus] = useState<Status>('idle')
  const [topic, setTopic] = useState(topics[0])
  const [len, setLen] = useState(0)
  const connected = Boolean(contact.noteEndpoint || contact.email)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.reportValidity()) return
    const data = new FormData(form)
    if (data.get('website')) return // honeypot

    if (contact.noteEndpoint) {
      setStatus('sending')
      data.delete('website')
      data.append('subject', `Website note for ${doctor.name}: ${data.get('topic')}`)
      if (contact.noteAccessKey) data.append('access_key', contact.noteAccessKey)
      try {
        const res = await fetch(contact.noteEndpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
        if (!res.ok) throw new Error(String(res.status))
        form.reset()
        setLen(0)
        setStatus('sent')
      } catch {
        setStatus('error')
      }
      return
    }
    if (contact.email) {
      const body = [`Name: ${data.get('name')}`, `Phone: ${data.get('phone')}`, `Email: ${data.get('email') || '-'}`, '', String(data.get('message'))].join('\n')
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(`Website note: ${data.get('topic')}`)}&body=${encodeURIComponent(body)}`
      setStatus('mailto')
      return
    }
    setStatus('unconfigured')
  }

  return (
    <section id="note" className="section note" aria-labelledby="note-form-title" ref={ref}>
      {intro && <div className="container note__intro">{intro}</div>}
      <div className="container note__grid">
        <div className="note__card reveal">
          {status === 'sent' ? (
            <div className="note__done" role="status">
              <span className="note__done-icon">
                <Check size={28} />
              </span>
              <h2>Thank you, your note has been sent.</h2>
              <p>The clinic team will get back to you. If you would like to book straight away, you can do so online.</p>
              <div className="note__done-actions">
                <a href={bookHref} {...bookLinkProps} className="btn nform__submit">
                  Book Appointment <Arrow />
                </a>
                <button type="button" className="nform__again" onClick={() => setStatus('idle')}>
                  Send another note
                </button>
              </div>
            </div>
          ) : (
            <form className="nform" onSubmit={onSubmit}>
              <h2 id="note-form-title" className="nform__title">
                Your note
              </h2>
              <p className="nform__hint">
                Fields marked <em>*</em> are required.
              </p>

              <fieldset className="nform__topics">
                <legend>What is it about?</legend>
                <div className="nform__chips">
                  {topics.map((t) => (
                    <label key={t} className="nform__chip">
                      <input type="radio" name="topic" value={t} checked={topic === t} onChange={() => setTopic(t)} />
                      <span>{t}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="nform__row">
                <label className="nform__field">
                  <span>
                    Full name <em aria-hidden="true">*</em>
                  </span>
                  <input name="name" type="text" autoComplete="name" required maxLength={80} placeholder="Your name" />
                </label>
                <label className="nform__field">
                  <span>
                    Phone <em aria-hidden="true">*</em>
                  </span>
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    inputMode="tel"
                    pattern="[\d\s\+\(\)\-]{7,20}"
                    title="A phone number, digits only"
                    placeholder="+91"
                  />
                </label>
              </div>
              <label className="nform__field">
                <span>Email</span>
                <input name="email" type="email" autoComplete="email" maxLength={120} placeholder="Optional" />
              </label>
              <label className="nform__field">
                <span className="nform__msg-label">
                  <span>
                    Your question <em aria-hidden="true">*</em>
                  </span>
                  <span className="nform__count" aria-live="polite">
                    {len} / {MAX}
                  </span>
                </span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  maxLength={MAX}
                  placeholder="For example: I have had knee pain for a year. What should I bring to my first visit?"
                  onChange={(e) => setLen(e.currentTarget.value.length)}
                />
              </label>
              <label className="nform__hp" aria-hidden="true">
                Leave this empty
                <input name="website" type="text" tabIndex={-1} autoComplete="off" />
              </label>
              <label className="nform__consent">
                <input name="consent" type="checkbox" required />
                <span>I agree to be contacted about my note, and I understand this form is not for emergencies.</span>
              </label>

              <div className="nform__foot">
                <button type="submit" className="btn nform__submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Send note'} <Arrow />
                </button>
                <p className="nform__status" role="status" aria-live="polite">
                  {status === 'error' && 'Sorry, the note could not be sent. Please try again, or book online.'}
                  {status === 'mailto' && 'Your email app should open with the note ready to send.'}
                  {status === 'unconfigured' && (
                    <>
                      Online notes are not connected yet.{' '}
                      <a href={bookHref} {...bookLinkProps}>
                        Please book online
                      </a>{' '}
                      instead.
                    </>
                  )}
                </p>
              </div>
              {!connected && (
                <p className="nform__ph" data-placeholder>
                  Form delivery to be connected before launch
                </p>
              )}
            </form>
          )}
        </div>

        <aside className="note__side">
          <div className="note__block reveal" style={{ ['--i' as string]: 1 }}>
            <h2 className="note__h">What happens next</h2>
            <ol className="note__steps">
              {nextSteps.map((s, i) => (
                <li key={s.title}>
                  <span className="note__num">{i + 1}</span>
                  <span>
                    <strong>{s.title}</strong>
                    {s.text}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="note__block reveal" style={{ ['--i' as string]: 2 }}>
            <h2 className="note__h">Good things to ask</h2>
            <ul className="note__ticks">
              <li>Appointment days and timings</li>
              <li>Which treatment may suit your concern</li>
              <li>What to bring to your first visit</li>
            </ul>
          </div>

          <p className="note__warn reveal" style={{ ['--i' as string]: 3 }}>
            <strong>Emergency?</strong> Go to the nearest hospital emergency department. This form is not monitored for
            urgent care.
          </p>

          <p className="note__alt reveal" style={{ ['--i' as string]: 4 }}>
            Ready to book instead?{' '}
            <a href={bookHref} {...bookLinkProps}>
              Book an appointment <Arrow size={13} />
            </a>
          </p>
        </aside>
      </div>
    </section>
  )
}

/** Slim clickable prompt that leads to the note page. */
export function NotePrompt({
  title = 'Is there a joint question you would like explained?',
  text = 'Suggest a topic for a future article.',
}: {
  title?: string
  text?: string
}) {
  return (
    <Link href="/note" className="note-prompt">
      <span className="note-prompt__icon" aria-hidden="true">
        ?
      </span>
      <span className="note-prompt__copy">
        <span className="note-prompt__title">{title}</span>
        <span className="note-prompt__text">{text}</span>
      </span>
      <span className="note-prompt__go">
        Leave us a note <Arrow size={14} />
      </span>
    </Link>
  )
}

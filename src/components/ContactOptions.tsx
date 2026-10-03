import type { ReactNode } from 'react'
import { contact, phoneHref, whatsappHref } from '../data/site'
import { Arrow, ArrowUpRight } from './ui/Icons'
import './ContactOptions.css'

const line = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
const icons: Record<string, ReactNode> = {
  book: (
    <svg viewBox="0 0 24 24" {...line} aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4M8.5 14.5l2 2 4-4" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" {...line} aria-hidden="true">
      <path d="M4 20l1.2-4.1A8 8 0 1 1 8.3 19Z" />
      <path d="M9.2 8.6c.2-.4.5-.4.8-.4h.5c.2 0 .4.1.5.4l.6 1.4c.1.2 0 .4-.1.6l-.5.6a5.3 5.3 0 0 0 2.4 2.3l.6-.5c.2-.2.4-.2.6-.1l1.4.6c.3.1.4.3.4.5v.5c0 .3-.1.6-.4.8-1.4 1.1-5.9-1.1-6.8-4.9-.2-.9 0-1.6.2-2.1Z" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" {...line} aria-hidden="true">
      <path d="M5 4h3.5l1.8 4.4-2.2 1.4a11 11 0 0 0 6.1 6.1l1.4-2.2L20 15.5V19a1.6 1.6 0 0 1-1.7 1.6A16.5 16.5 0 0 1 3.4 5.7 1.6 1.6 0 0 1 5 4Z" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" {...line} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  ),
}

export type OptionKey = 'appointment' | 'whatsapp' | 'phone' | 'email'

type Option = {
  icon: keyof typeof icons
  label: string
  title: string
  text: string
  href: string | null
  action: string
  pending: string
  external?: boolean
}

const options: Record<OptionKey, Option> = {
  appointment: {
    icon: 'book',
    label: 'Appointments',
    title: 'Book a consultation',
    text: 'Book online, or see the other ways to make an appointment.',
    href: '/appointment',
    action: 'Book Appointment',
    pending: '',
  },
  whatsapp: {
    icon: 'whatsapp',
    label: 'Book an appointment',
    title: 'WhatsApp the appointment desk',
    text: 'Message the appointment desk to book your consultation.',
    href: whatsappHref,
    action: 'Book on WhatsApp',
    pending: 'WhatsApp number coming soon',
    external: true,
  },
  phone: {
    icon: 'phone',
    label: 'Need help first?',
    title: 'Call the appointment desk',
    text: 'Speak with the appointment desk during consultation hours.',
    href: phoneHref,
    action: contact.phone ? `Call ${contact.phone}` : 'Call now',
    pending: 'Phone number to be added',
  },
  email: {
    icon: 'mail',
    label: 'Email',
    title: 'Write an email',
    text: 'For questions that are not urgent.',
    href: contact.email ? `mailto:${contact.email}` : null,
    action: contact.email ?? 'Send an email',
    pending: 'Email address to be added',
  },
}

/** Contact/booking options as a row of cards; an option without its detail yet shows a clear "coming soon" state. */
export function ContactOptions({ keys, highlight }: { keys: OptionKey[]; highlight?: OptionKey }) {
  return (
    <ul className={`copts copts--${keys.length}`}>
      {keys.map((k, i) => {
        const o = options[k]
        const live = Boolean(o.href)
        const body = (
          <>
            <span className="copt__top">
              <span className="copt__icon">{icons[o.icon]}</span>
              <span className="copt__label">{live ? o.label : 'Coming soon'}</span>
            </span>
            <span className="copt__title">{o.title}</span>
            <span className="copt__text">{o.text}</span>
            <span className="copt__action">
              {live ? (
                <>
                  {o.action} {o.external ? <ArrowUpRight size={14} /> : <Arrow size={14} />}
                </>
              ) : (
                <span className="copt__pending">{o.pending}</span>
              )}
            </span>
          </>
        )
        return (
          <li key={k} className="reveal" style={{ ['--i' as string]: i }}>
            {live ? (
              <a
                className={`copt ${highlight === k ? 'copt--main' : ''}`}
                href={o.href!}
                {...(o.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {body}
                {o.external && <span className="visually-hidden"> (opens in a new tab)</span>}
              </a>
            ) : (
              <div className="copt copt--pending">{body}</div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

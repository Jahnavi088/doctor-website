import type { Glyph } from './site'

/**
 * Blog / patient-education articles.
 *
 * DRAFT COPY — general patient-education text written so the blog can be designed and launched.
 * It deliberately makes no claims about outcomes, success rates or Dr. Manoj's own results.
 * Have Dr. Manoj read and approve (or replace) every article before the site goes live, and add a
 * `date` to each once it is published.
 *
 * Body blocks: `p` paragraph, `h2` sub-heading (also listed in the "In this article" contents), `ul` list.
 */

export type Block = { type: 'p'; text: string } | { type: 'h2'; text: string } | { type: 'ul'; items: string[] }

export type Post = {
  slug: string
  title: string
  excerpt: string
  category: string
  /** Cover art: one of the pre-rendered 3D stills in /public/images/expertise */
  cover: Glyph
  readMins: number
  date?: string
  body: Block[]
}

export const posts: Post[] = [
  {
    slug: 'preparing-for-joint-replacement',
    title: 'Preparing for knee or hip replacement: questions worth asking',
    excerpt:
      'Joint replacement is a planned operation, which means there is time to understand it. These are the questions that help most patients feel ready.',
    category: 'Joint replacement',
    cover: 'replacement',
    readMins: 4,
    body: [
      {
        type: 'p',
        text: 'Joint replacement replaces the worn surfaces of a joint with implant components. It is usually a planned operation rather than an emergency, which means there is time to ask questions, understand the options and prepare. The conversation you have with your surgeon beforehand is one of the most useful parts of the whole process.',
      },
      { type: 'h2', text: 'Is surgery the right step now?' },
      {
        type: 'p',
        text: 'Replacement is generally considered when joint pain and stiffness keep limiting daily life despite non-surgical care. It is reasonable to ask what else could be tried first, what is likely to happen if you wait, and how your examination and imaging findings shape the recommendation.',
      },
      { type: 'h2', text: 'Questions to bring to your consultation' },
      {
        type: 'ul',
        items: [
          'What exactly will be replaced, and what kind of implant is planned?',
          'How long is the hospital stay likely to be in my case?',
          'What will the first few weeks at home look like?',
          'When can I expect to walk, climb stairs, drive and return to work?',
          'Which of my current medicines should I continue or pause before surgery?',
          'What are the risks, and what can I do to lower them?',
        ],
      },
      { type: 'h2', text: 'Getting ready at home' },
      {
        type: 'p',
        text: 'Small changes before the operation make the return home easier: clear walkways of loose rugs and cables, keep everyday items within reach, and arrange for someone to help for the first days. If you have a chair with armrests and a firm seat, it will usually be easier to get in and out of.',
      },
      { type: 'h2', text: 'Recovery is a process' },
      {
        type: 'p',
        text: 'Rehabilitation and exercises are a central part of recovery after joint replacement. Progress differs from person to person, so follow the plan your care team gives you and ask about anything that feels unexpected along the way.',
      },
    ],
  },
  {
    slug: 'knee-arthroscopy-explained',
    title: 'Knee arthroscopy explained: what keyhole joint surgery involves',
    excerpt:
      'Arthroscopy lets a surgeon look inside a joint through small incisions. Here is what the procedure is, what it can be used for, and what to ask before one.',
    category: 'Arthroscopy',
    cover: 'arthroscopy',
    readMins: 3,
    body: [
      {
        type: 'p',
        text: 'Arthroscopy is a minimally invasive way of examining and treating problems inside a joint. Instead of one large opening, the surgeon makes a few small incisions, inserts a slim camera called an arthroscope, and uses fine instruments while watching the joint on a screen.',
      },
      { type: 'h2', text: 'What it can be used for' },
      {
        type: 'p',
        text: 'In the knee, arthroscopy can be used to look at and treat certain problems with the menisci — the two C-shaped cartilage cushions — as well as some ligament, cartilage and joint-lining conditions. Whether it is suitable depends on the specific diagnosis, which is why a careful assessment comes first.',
      },
      { type: 'h2', text: 'Why small incisions matter' },
      {
        type: 'p',
        text: 'Working through small openings generally means less disturbance to the tissues around the joint than open surgery. That said, what is done inside the joint determines the recovery plan, so two arthroscopies can involve very different rehabilitation.',
      },
      { type: 'h2', text: 'Questions to ask' },
      {
        type: 'ul',
        items: [
          'What do you expect to find, and what might be done during the procedure?',
          'Is there a non-surgical option worth trying first?',
          'Will I need crutches or a brace afterwards, and for how long?',
          'What exercises will I need to do, and when do I start physiotherapy?',
        ],
      },
    ],
  },
  {
    slug: 'robotic-joint-replacement',
    title: 'Robotic-arm assisted joint replacement: what the robot does',
    excerpt:
      'The word “robotic” can sound like the machine operates on its own. It does not. Here is how robotic-arm assistance fits into a joint replacement.',
    category: 'Robotic surgery',
    cover: 'robotic',
    readMins: 3,
    body: [
      {
        type: 'p',
        text: 'In robotic-arm assisted joint replacement, the surgeon performs the operation. The robotic system is a tool that helps carry out a plan that has been prepared in advance for that particular joint.',
      },
      { type: 'h2', text: 'Planning comes first' },
      {
        type: 'p',
        text: 'Imaging of the joint is used to plan the size and position of the implant and where bone needs to be prepared. During surgery, the plan can be checked against the joint and adjusted by the surgeon.',
      },
      { type: 'h2', text: 'What the robotic arm does' },
      {
        type: 'p',
        text: 'The arm helps guide bone preparation within the boundaries of the plan, supporting the surgeon in placing the implant as intended. The surgeon remains in control throughout.',
      },
      { type: 'h2', text: 'Is it right for everyone?' },
      {
        type: 'p',
        text: 'Not every patient or every joint needs the same approach. Your surgeon can explain whether robotic-arm assistance is suitable in your case and how it would change your operation and recovery plan, if at all.',
      },
    ],
  },
  {
    slug: 'after-a-fracture',
    title: 'After a fracture: why follow-up and rehabilitation matter',
    excerpt:
      'Getting a fracture treated is the first step. What happens in the following weeks — check-ups, protecting the bone and regaining movement — matters too.',
    category: 'Trauma care',
    cover: 'trauma',
    readMins: 3,
    body: [
      {
        type: 'p',
        text: 'Fractures are treated in different ways depending on the bone, the type of break and the person. Some heal with a cast, splint or brace; others need surgery, for example to hold the bone in place with a plate, screws or a nail while it heals.',
      },
      { type: 'h2', text: 'Why follow-up visits matter' },
      {
        type: 'p',
        text: 'Follow-up appointments, often with repeat X-rays, let your doctor check that the bone is healing in a good position and decide when it is safe to put more load through it. Keep these appointments even when you feel better.',
      },
      { type: 'h2', text: 'When to seek help sooner' },
      {
        type: 'ul',
        items: [
          'Pain that is getting worse rather than better',
          'Increasing swelling, numbness, or a change in skin colour below a cast',
          'Redness, discharge or fever around a surgical wound',
          'A cast that feels too tight, cracks or gets wet',
        ],
      },
      { type: 'h2', text: 'Regaining movement' },
      {
        type: 'p',
        text: 'Once the bone allows it, guided exercises help restore movement and strength in the surrounding joints and muscles. Your care team will tell you what you can do and when — progress at the pace they recommend.',
      },
    ],
  },
]

export const findPost = (slug: string) => posts.find((p) => p.slug === slug)
export const categories = Array.from(new Set(posts.map((p) => p.category)))

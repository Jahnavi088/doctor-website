import { useState } from 'react'
import { conditionGroups, conditions, expertiseAreas, services, type ConditionGroup } from '../data/site'
import { Link } from './Link'
import { Arrow } from './ui/Icons'
import { PictoIcon } from './ui/Pictos'
import './ConditionGroups.css'

/**
 * Conditions: a photo for each group (crossfades when the group changes), a two-way switch,
 * and the group's conditions as rows with a pictogram — seen at a glance, read if wanted.
 * `links` adds a "see area / service" link to each row (used on /expertise).
 */
export function ConditionGroups({ links = false }: { links?: boolean }) {
  const [active, setActive] = useState<ConditionGroup>(conditionGroups[0].id)
  const group = conditionGroups.find((g) => g.id === active)!
  const items = conditions.filter((c) => c.group === active)

  return (
    <div className="cg reveal" style={{ ['--i' as string]: 2 }}>
      <figure className="cg__figure">
        {conditionGroups.map((g) => (
          <img
            key={g.id}
            src={g.photo.src}
            alt={g.photo.alt}
            width={1200}
            height={900}
            loading="lazy"
            decoding="async"
            data-on={g.id === active}
          />
        ))}
        <figcaption key={group.id} className="cg__caption">
          <strong>{group.title}</strong>
          {group.text}
        </figcaption>
      </figure>

      <div className="cg__side">
        <div className="cg__switch" role="tablist" aria-label="Condition groups" data-active={conditionGroups.findIndex((g) => g.id === active)}>
          {conditionGroups.map((g) => (
            <button
              key={g.id}
              type="button"
              role="tab"
              id={`cg-tab-${g.id}`}
              aria-selected={g.id === active}
              aria-controls="cg-panel"
              onClick={() => setActive(g.id)}
            >
              {g.short}
            </button>
          ))}
        </div>

        <ul id="cg-panel" key={active} className="cg__list" role="tabpanel" aria-labelledby={`cg-tab-${active}`}>
          {items.map((c, i) => {
            const area = links ? expertiseAreas.find((a) => a.slug === c.area) : undefined
            const service = links && !area ? services.find((s) => s.slug === c.service) : undefined
            return (
              <li key={c.title} className="cg__row" style={{ ['--i' as string]: i }}>
                <span className="cg__icon">
                  <PictoIcon name={c.picto} size={26} />
                </span>
                <span className="cg__copy">
                  <span className="cg__name">{c.title}</span>
                  <span className="cg__text">{c.text}</span>
                </span>
                {area && (
                  <a className="cg__link" href={`#${area.slug}`}>
                    {area.title} <Arrow size={12} />
                  </a>
                )}
                {service && (
                  <Link className="cg__link" href={`/services#${service.slug}`}>
                    {service.title} <Arrow size={12} />
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

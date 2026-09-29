import { conditionGroups, conditions, expertiseAreas, services } from '../data/site'
import { Link } from './Link'
import { Arrow } from './ui/Icons'
import './ConditionGroups.css'

/**
 * Conditions as an editorial two-column list (grouped, hairline rows) rather than a grid of cards.
 * `links` adds a "see area / service" link to each row (used on /expertise).
 */
export function ConditionGroups({ links = false }: { links?: boolean }) {
  return (
    <div className="cg-wrap">
      {conditionGroups.map((g, gi) => {
        const items = conditions.filter((c) => c.group === g.id)
        return (
          <div key={g.id} className="cg reveal" style={{ ['--i' as string]: gi }}>
            <header className="cg__head">
              <h3 className="cg__title">{g.title}</h3>
              <p className="cg__intro">{g.text}</p>
            </header>
            <ul className="cg__list">
              {items.map((c) => {
                const area = links ? expertiseAreas.find((a) => a.slug === c.area) : undefined
                const service = links && !area ? services.find((s) => s.slug === c.service) : undefined
                return (
                  <li key={c.title} className="cg__row">
                    <span className="cg__name">{c.title}</span>
                    <span className="cg__text">
                      {c.text}
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
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

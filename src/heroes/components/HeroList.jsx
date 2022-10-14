import { useMemo } from 'react'
import { HeroCard } from './HeroCard'
import { getHeroesByPublusher } from '../helpers'

export const HeroList = ({ publisher }) => {
  const heroes = useMemo(() => getHeroesByPublusher(publisher), [publisher])

  return (
    <div className="row row-cols-1 row-cols-md-3 g3">
      {heroes.map((hero) => (
        <HeroCard key={hero.id} {...hero} />
      ))}
    </div>
  )
}

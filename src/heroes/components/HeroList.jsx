import { getHeroesByPublusher } from '../helpers'

export const HeroList = ({ publisher }) => {
  const heroes = getHeroesByPublusher(publisher)

  return (
    <ul>
      {heroes.map((hero) => (
        <li key={hero.id}>{hero.superhero}</li>
      ))}
    </ul>
  )
}

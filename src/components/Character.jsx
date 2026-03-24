
function CharacterCard({ character }) {

  const nameCard = character.name.split(' ')

  return (
    <div className="text-center p-5">
      <h3 className="nameCard">{(nameCard.length !== 1) ? nameCard[0] + ' ' + nameCard[1] : character.name}</h3>
      <img className="img-fluid fix rounded-pill" src={character.image} alt={character.name} />
      <p>{character.origin.name}</p>
    </div>
  )
}
export default CharacterCard
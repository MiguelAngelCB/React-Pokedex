import "../styles/PokemonCard.css";

export function PokemonCard() {
  return (
    <div className="pokemon-card">
      <div id="divImg">
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
          alt="Pikachu"
        />
      </div>
      <h3>Pikachu</h3>
      <div id="cardBody">
        <div className="type">Electric</div>
        <div className="stats">
          <span>
            <strong>HP:</strong> 35
          </span>
          <span>
            <strong>Attack:</strong> 55
          </span>
          <span>
            <strong>Defense:</strong> 40
          </span>
          <span>
            <strong>Speed:</strong> 90
          </span>
        </div>
      </div>
    </div>
  );
}

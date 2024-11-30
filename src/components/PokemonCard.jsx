import { useState } from "react";
import PropTypes from "prop-types";
import { GenerationImages } from "../enum/GenerationImages"; // Importamos el objeto
import "../styles/PokemonCard.css"; // Asegúrate de importar los estilos aquí

export function PokemonCard({ pokemon }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const generationImage = GenerationImages[`${pokemon.generation}`];

  return (
    <div
      className={`pokemon-card-container ${isFlipped ? "flipped" : ""}`}
      onClick={handleCardClick}
    >
      {/* Cara frontal */}
      <div
        className="pokemon-card front"
        style={{
          "--card-color": pokemon.types[0].color
            ? `${pokemon.types[0].color}db`
            : "rgba(255, 215, 0, 0.8)", // Añadimos 80 (opacidad) al color o usamos un color predeterminado con transparencia
        }}
      >
        <div id="divImg">
          <img src={pokemon.image} alt={pokemon.name} />
        </div>
        <h3>
          #{pokemon.id} - {pokemon.name}
        </h3>
        <div id="cardBody">
          <div className="types">
            {pokemon.types.map((type, index) => (
              <span key={index} className="type">
                {type.name}
              </span>
            ))}
          </div>
          <div className="stats">
            <span>HP: {pokemon.stats.hp}</span>
            <span>Attack: {pokemon.stats.attack}</span>
            <span>Defense: {pokemon.stats.defense}</span>
            <span>Speed: {pokemon.stats.speed}</span>
            <span>Special Attack: {pokemon.stats.specialAttack}</span>
            <span>Special Defense: {pokemon.stats.specialDefense}</span>
          </div>
        </div>
      </div>

      {/* Cara trasera */}
      <div
        className="pokemon-card back"
        style={{
          "--card-color": pokemon.types[0].color
            ? `${pokemon.types[0].color}db`
            : "rgba(255, 215, 0, 0.8)", // Añadimos 80 (opacidad) al color o usamos un color predeterminado con transparencia
        }}
      >
        <div id="divImg">
          {/* Imagen shiny o normal */}
          <img
            src={pokemon.shinyImage || pokemon.image}
            alt={`Shiny de ${pokemon.name}`}
          />
        </div>
        <h3>
          #{pokemon.id} - {pokemon.name}
        </h3>
        <div id="cardBody">
          <div className="types">
            {pokemon.types.map((type, index) => (
              <span
                key={index}
                className="type"
                style={{ backgroundColor: type.color }}
              >
                {type.name}
              </span>
            ))}
          </div>
          {/* Información adicional en la parte trasera */}
          <div className="additional-info">
            <p>
              <strong>Generación:</strong>
              {/* Imagen de la generación */}
              <img
                src={generationImage}
                alt={`Generación ${pokemon.generation}`}
              />
            </p>
            <p>
              <strong>Peso:</strong> {pokemon.weight} kg
            </p>
            <p>
              <strong>Altura:</strong> {pokemon.height} m
            </p>
            {/* Habilidades */}
            <p>
              <strong>Habilidades:</strong>{" "}
              {pokemon.abilities.normal.length > 0
                ? pokemon.abilities.normal.join(", ")
                : "Ninguna"}
            </p>
            <p>
              <strong>Habilidades Ocultas:</strong>{" "}
              {pokemon.abilities.hidden.length > 0
                ? pokemon.abilities.hidden.join(", ")
                : "Ninguna"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

PokemonCard.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    shinyImage: PropTypes.string,
    generation: PropTypes.string.isRequired,
    weight: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    types: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
      })
    ).isRequired,
    stats: PropTypes.shape({
      hp: PropTypes.number.isRequired,
      attack: PropTypes.number.isRequired,
      defense: PropTypes.number.isRequired,
      speed: PropTypes.number.isRequired,
      specialAttack: PropTypes.number.isRequired,
      specialDefense: PropTypes.number.isRequired,
    }).isRequired,
    abilities: PropTypes.shape({
      normal: PropTypes.arrayOf(PropTypes.string),
      hidden: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
  }).isRequired,
};

export default PokemonCard;

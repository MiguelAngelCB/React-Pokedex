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
      {/* Front face */}
      <div
        className="pokemon-card front"
        style={{
          "--card-color": pokemon.types[0].color
            ? `${pokemon.types[0].color}e0`
            : "rgba(255, 215, 0, 0.8)", // Add 80 (opacity) to the color or use a default transparent color
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
              <span
                key={index}
                className="type"
                style={{ backgroundColor: type.color }}
              >
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

      {/* Back face */}
      <div
        className="pokemon-card back"
        style={{
          "--card-color": pokemon.types[0].color
            ? `${pokemon.types[0].color}e0`
            : "rgba(255, 215, 0, 0.8)", // Add 80 (opacity) to the color or use a default transparent color
        }}
      >
        <div id="divImg">
          {/* Shiny or normal image */}
          <img
            src={pokemon.shinyImage || pokemon.image}
            alt={`Shiny of ${pokemon.name}`}
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
          {/* Additional information on the back */}
          <div className="additional-info">
            <p>
              <strong>Generation:</strong>
              {/* Generation image */}
              <img
                src={generationImage}
                alt={`Generation ${pokemon.generation}`}
              />
            </p>
            <p>
              <strong>Weight:</strong> {pokemon.weight} kg
            </p>
            <p>
              <strong>Height:</strong> {pokemon.height} m
            </p>
            {/* Abilities */}
            <p>
              <strong>Abilities:</strong>{" "}
              {pokemon.abilities.normal.length > 0
                ? pokemon.abilities.normal.join(", ")
                : "None"}
            </p>
            <p>
              <strong>Hidden Abilities:</strong>{" "}
              {pokemon.abilities.hidden.length > 0
                ? pokemon.abilities.hidden.join(", ")
                : "None"}
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
    color: PropTypes.string.isRequired,
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

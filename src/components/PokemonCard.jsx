import { useState } from "react";
import PropTypes from "prop-types";
import { GenerationImages } from "../enum/GenerationImages";
import "../styles/PokemonCard.css";
import PokemonFallbackImage from "./PokemonFallbackImage"; // Ruta corregida

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
          "--card-color": pokemon.types[0]?.color
            ? `${pokemon.types[0].color}e0`
            : "rgba(255, 215, 0, 0.8)",
        }}
      >
        <div id="divImg">
          {/* Mostrar la imagen del Pokémon o el fallback */}
          {pokemon.image ? (
            <img src={pokemon.image} alt={pokemon.name} />
          ) : (
            <PokemonFallbackImage color={pokemon.types[0]?.color || "#777"} />
          )}
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
          "--card-color": pokemon.types[0]?.color
            ? `${pokemon.types[0].color}e0`
            : "rgba(255, 215, 0, 0.8)",
        }}
      >
        <div id="divImg">
          {/* Mostrar la imagen shiny o el fallback */}
          {pokemon.shinyImage ? (
            <img src={pokemon.shinyImage} alt={`Shiny of ${pokemon.name}`} />
          ) : (
            <PokemonFallbackImage color={pokemon.types[0]?.color || "#777"} />
          )}
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
          {/* Información adicional */}
          <div className="additional-info">
            <p>
              <strong>Generation:</strong>
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
            <p>Abilities: {pokemon.abilities.normal.join(", ")}</p>
            <p>Hidden Abilities: {pokemon.abilities.hidden.join(", ")}</p>
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
    image: PropTypes.string,
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

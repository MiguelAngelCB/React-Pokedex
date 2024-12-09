import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PokemonFallbackImage from "./PokemonFallbackImage"; // Ruta corregida
import { PokemonGenerations } from "../enum/PokemonGenerations";
import "../styles/PokemonCard.css";

export function PokemonCard({ pokemon, isFlipped }) {
  // El estado isFlipped ahora es controlado por el componente padre
  const [isCardFlipped, setIsCardFlipped] = useState(isFlipped);

  // Si el estado global cambia, actualizamos la carta
  useEffect(() => {
    setIsCardFlipped(isFlipped);
  }, [isFlipped]);

  const handleCardClick = () => {
    setIsCardFlipped(!isCardFlipped); // Solo cambia el estado local si la carta se hace clic
  };

  const generation = PokemonGenerations.find(
    (gen) => gen.id === pokemon.generation
  );
  const totalStats = () =>
    pokemon.stats.hp +
    pokemon.stats.attack +
    pokemon.stats.defense +
    pokemon.stats.speed +
    pokemon.stats.specialAttack +
    pokemon.stats.specialDefense;
  const generationImage = generation.image;

  return (
    <div
      className={`pokemon-card-container ${isCardFlipped ? "flipped" : ""}`}
      onClick={handleCardClick}
    >
      {/* Front face */}
      <div
        className="pokemon-card front"
        style={{
          "--card-color": pokemon.types[0]?.color
            ? `${pokemon.types[0].color}c4`
            : "rgba(255, 215, 0, 0.7)",
        }}
      >
        <h3>
          #{pokemon.id} - {pokemon.name}
        </h3>
        <div id="divImg">
          {/* Mostrar la imagen del Pokémon o el fallback */}
          {pokemon.image ? (
            <img src={pokemon.image} alt={pokemon.name} />
          ) : (
            <PokemonFallbackImage color={pokemon.types[0]?.color || "#777"} />
          )}
        </div>

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
            <span>Special Attack: {pokemon.stats.specialAttack}</span>
            <span>Special Defense: {pokemon.stats.specialDefense}</span>
            <span>Speed: {pokemon.stats.speed}</span>
            <span>Total: {totalStats()}</span>
          </div>
        </div>
      </div>

      {/* Back face */}
      <div
        className="pokemon-card back"
        style={{
          "--card-color": pokemon.types[0]?.color
            ? `${pokemon.types[0].color}c4`
            : "rgba(255, 215, 0, 0.7)",
        }}
      >
        <h3>
          #{pokemon.id} - {pokemon.name}
        </h3>
        <div id="divImg">
          {/* Mostrar la imagen shiny o el fallback */}
          {pokemon.shinyImage ? (
            <img src={pokemon.shinyImage} alt={`Shiny of ${pokemon.name}`} />
          ) : (
            <PokemonFallbackImage color={pokemon.types[0]?.color || "#777"} />
          )}
        </div>

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
  isFlipped: PropTypes.bool.isRequired, // Recibe la prop isFlipped
};

export default PokemonCard;

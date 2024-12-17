import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PokemonFaceCard from "./PokemonFaceCard"; // Ruta del nuevo componente
import { pokemonPropTypes } from "../propTypes/pokemonPropTypes";
import "../styles/PokemonCard.css";

export function PokemonCard({ pokemon, isFlipped }) {
  // El estado isFlipped ahora es controlado por el componente padre
  const [isCardFlipped, setIsCardFlipped] = useState(isFlipped);

  // Si el estado global cambia, actualizamos la carta
  useEffect(() => {
    setIsCardFlipped(isFlipped);
  }, [isFlipped]);

  return (
    <div className={`pokemon-card-container ${isCardFlipped ? "flipped" : ""}`}>
      {/* Front face */}
      <PokemonFaceCard pokemon={pokemon} isFront={true} />

      {/* Back face */}
      <PokemonFaceCard pokemon={pokemon} isFront={false} />
    </div>
  );
}

PokemonCard.propTypes = {
  pokemon: pokemonPropTypes.isRequired, // Usa las propTypes importadas
  isFlipped: PropTypes.bool.isRequired,
};

export default PokemonCard;

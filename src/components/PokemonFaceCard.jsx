import PropTypes from "prop-types";
import PokemonFallbackImage from "./PokemonFallbackImage"; // Ruta corregida
import { PokemonGenerations } from "../enum/PokemonGenerations";
import { pokemonPropTypes } from "../propTypes/pokemonPropTypes";
import sentenceCase from "../services/sentenceCase";
import "../styles/PokemonCardFace.css";
import PokemonTypeSVG from "./PokemonTypeSVG";
import { getTypeColor } from "../enum/PokemonTypesColors";

function PokemonFaceCard({ pokemon, isFront }) {
  const generation = PokemonGenerations.find(
    (gen) => gen.id === pokemon.generation
  );
  const generationImage = generation.image;
  const renderStats = (stats) => {
    const statEntries = Object.entries(stats);
    return (
      <div className="stats">
        {statEntries.map(([key, value], index) => (
          <span key={index}>
            {sentenceCase(key)}: {value}
          </span>
        ))}
        <span>
          Total: {Object.values(stats).reduce((acc, value) => acc + value, 0)}
        </span>
      </div>
    );
  };

  // Renderizamos las habilidades directamente
  const renderAbilities = (abilities) => {
    const abilityEntries = Object.entries(abilities);

    return (
      <div className="additional-info">
        <p>
          <strong>Generation:</strong>
          <img src={generationImage} alt={`Generation ${pokemon.generation}`} />
        </p>
        <p>
          <strong>Weight:</strong> {pokemon.weight} kg
        </p>
        <p>
          <strong>Height:</strong> {pokemon.height} m
        </p>
        {abilityEntries.map(([key, value], index) => (
          <p key={index}>
            {sentenceCase(key)}: {value.join(", ")}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div
      className={`pokemon-card ${isFront ? "front" : "back"}`}
      style={{
        "--card-color":
          pokemon.types.length > 1
            ? `linear-gradient(145deg, ${getTypeColor(
                pokemon,
                0
              )} 40%, ${getTypeColor(pokemon, 1)} 40%)`
            : `${getTypeColor(pokemon, 0)}`, // Si solo tiene un tipo

        "--box-shadow-color": `${getTypeColor(pokemon, 0)}f5`, // Siempre el primer color

        "--box-shadow-color2":
          pokemon.types.length > 1
            ? `${getTypeColor(pokemon, 1)}f5` // Si tiene dos tipos, usamos el segundo color
            : `${getTypeColor(pokemon, 0)}f5`, // Si tiene un solo tipo, no usamos un segundo color
      }}
    >
      <h3>
        #{pokemon.id} - {pokemon.name}
      </h3>
      <div id="divImg">
        {/* Mostrar la imagen del Pokémon o el fallback */}
        {isFront ? (
          pokemon.image ? (
            <img src={pokemon.image} alt={pokemon.name} />
          ) : (
            <PokemonFallbackImage color={getTypeColor(pokemon, 0) || "#777"} />
          )
        ) : pokemon.shinyImage ? (
          <img src={pokemon.shinyImage} alt={`Shiny of ${pokemon.name}`} />
        ) : (
          <PokemonFallbackImage color={getTypeColor(pokemon, 0) || "#777"} />
        )}
      </div>

      <div id="cardBody">
        <div className="types">
          {pokemon.types.map((type, index) => (
            <span
              key={index}
              className="type"
              style={{ backgroundColor: getTypeColor(pokemon, index) }}
            >
              {type.name}
              <PokemonTypeSVG type={sentenceCase(type.name)} />
            </span>
          ))}
        </div>
        {isFront
          ? renderStats(pokemon.stats)
          : renderAbilities(pokemon.abilities)}
      </div>
    </div>
  );
}

PokemonFaceCard.propTypes = {
  pokemon: pokemonPropTypes.isRequired, // Usa las propTypes importadas
  isFront: PropTypes.bool.isRequired,
};

export default PokemonFaceCard;

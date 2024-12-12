import PropTypes from "prop-types";
import PokemonFallbackImage from "./PokemonFallbackImage"; // Ruta corregida
import { PokemonGenerations } from "../enum/PokemonGenerations";
import { pokemonPropTypes } from "../propTypes/pokemonPropTypes";
import "../styles/PokemonCardFace.css";
import PokemonTypeSVG from "./PokemonTypeSVG";

function PokemonFaceCard({ pokemon, isFront }) {
  const generation = PokemonGenerations.find(
    (gen) => gen.id === pokemon.generation
  );
  const generationImage = generation.image;

  // Función para generar las estadísticas
  const renderStats = (stats) => {
    // Creamos un arreglo con las propiedades del objeto stats
    const statEntries = Object.entries(stats);

    // Generamos los spans con un bucle, usando la primera letra de cada clave en mayúscula
    return (
      <div className="stats">
        {statEntries.map(([key, value], index) => (
          <span key={index}>
            {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
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
            {key.charAt(0).toUpperCase() + key.slice(1)}: {value.join(", ")}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div
      className={`pokemon-card ${isFront ? "front" : "back"}`}
      style={{
        "--card-color": pokemon.types[0]?.color
          ? `${pokemon.types[0].color}eb`
          : "rgba(255, 215, 0, 0.7)",
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
            <PokemonFallbackImage color={pokemon.types[0]?.color || "#777"} />
          )
        ) : pokemon.shinyImage ? (
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
              <PokemonTypeSVG
                type="Bug"
                fillColorCircle="white"
                strokeColorCircle="none"
                strokeWidthCircle={3}
                fillColorPath={type.color}
                strokeColorPath="black"
                strokeWidthPath={4}
              />
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

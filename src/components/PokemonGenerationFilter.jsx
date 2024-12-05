import { PokemonGenerations } from "../enum/PokemonGenerations";
import "../styles/PokemonGenerationFilter.css";
import PropTypes from "prop-types"; // Importamos PropTypes

export function PokemonGenerationFilter({
  selectedGenerations,
  handleGenerationChange,
  handleShowAllGenerations,
}) {
  const generations = PokemonGenerations;

  return (
    <div className="generation-filter">
      <div className="generation-checkboxes">
        {/* Botón "Show All" con el mismo estilo que los elementos de generación */}
        <label
            style={{ cursor: "pointer" }}
          >
          <button
          onClick={handleShowAllGenerations}
          className="generation-item show-all-button"
        >All</button>
          </label>
        {/* Botones de generación (con checkboxes invisibles) */}
        {generations.map((generation) => (
          <label
            key={generation.id}
            className={`generation-item ${
              selectedGenerations.includes(generation.id) ? "selected" : ""
            }`}
            style={{ cursor: "pointer" }}
          >
            <input
              type="checkbox"
              value={generation.id}
              checked={selectedGenerations.includes(generation.id)}
              onChange={() => handleGenerationChange(generation.id)}
              style={{ display: "none" }} // Esto oculta el checkbox visualmente
            />
            <img
              src={generation.image}
              alt={generation.label}
              className="generation-image"
            />
          </label>
        ))}
      </div>
    </div>
  );
}

// Validación de las props
PokemonGenerationFilter.propTypes = {
  selectedGenerations: PropTypes.arrayOf(PropTypes.string).isRequired, // Espera un array de strings (IDs de generaciones)
  handleGenerationChange: PropTypes.func.isRequired, // Espera una función que maneja el cambio de generación
  handleShowAllGenerations: PropTypes.func.isRequired, // Espera una función para mostrar todas las generaciones
};

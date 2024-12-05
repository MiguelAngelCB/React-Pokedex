import "../styles/PokemonTypeFilter.css"; // Aseguramos que los estilos no se pierdan
import PropTypes from "prop-types"; // Importamos PropTypes
import { TypeColors } from "../enum/TypeColors"; // Importamos TypeColors

export function PokemonTypeFilter({ filteredTypes, handleFilter, handleShowAllTypes }) {
  // Obtenemos los tipos dinámicamente desde TypeColors
  const types = Object.keys(TypeColors); // Esto extrae las claves (tipos) de TypeColors

  return (
    <div id="filter-buttons">
      {/* Botón "All" */}
      <button
        key="All"
        className="all-types-button" // Cambié la clase a un nombre más específico
        style={{
          backgroundColor: "#808080", // Color gris para "All"
          color: "white",
        }}
        onClick={() => handleShowAllTypes()} // Se ejecuta la función para deseleccionar todos los tipos
      >
        All
      </button>

      {/* Botones de tipo de Pokémon */}
      {types.map((type) => {
        return (
          <button
            key={type}
            className={`${
              filteredTypes.map((t) => t.toLowerCase()).includes(type.toLowerCase()) 
              ? "active" 
              : ""} 
              ${type.toLowerCase()}`}
            style={{
              backgroundColor: TypeColors[type] || "#808080", // Usar el color del tipo
              color: "white", // El texto en blanco para los botones
            }}
            onClick={() => handleFilter(type.toLowerCase())} // Pasamos los tipos en minúsculas
            disabled={filteredTypes.length === 2 && !filteredTypes.map((t) => t.toLowerCase()).includes(type.toLowerCase())} // Deshabilitar si ya tenemos 2 tipos seleccionados
          >
            {type.charAt(0).toUpperCase() + type.slice(1)} {/* Capitaliza el primer carácter */}
          </button>
        );
      })}
    </div>
  );
}

// Validación de las props
PokemonTypeFilter.propTypes = {
  filteredTypes: PropTypes.arrayOf(PropTypes.string).isRequired, // Esperamos un array de strings (tipos seleccionados)
  handleFilter: PropTypes.func.isRequired, // Esperamos una función para manejar el filtro
  handleShowAllTypes: PropTypes.func.isRequired, // Esperamos una función para manejar mostrar todas las generaciones
};

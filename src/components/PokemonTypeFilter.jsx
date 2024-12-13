import { usePokemonContext } from "../context/PokemonContext"; // Importamos el custom hook
import "../styles/PokemonTypeFilter.css";
import { TypeColors } from "../enum/TypeColors"; // Importamos TypeColors
import PokemonTypeSVG from "./PokemonTypeSVG";
import sentenceCase from "../services/sentenceCase";

export function PokemonTypeFilter() {
  const { filteredTypes, setFilteredTypes } = usePokemonContext(); // Accedemos al contexto

  // Obtenemos los tipos dinámicamente desde TypeColors
  const types = Object.keys(TypeColors);

  // Función para manejar el filtro de tipos
  const handleFilter = (type) => {
    if (filteredTypes.includes(type)) {
      setFilteredTypes(filteredTypes.filter((t) => t !== type)); // Eliminar tipo del filtro
    } else if (filteredTypes.length < 2) {
      setFilteredTypes([...filteredTypes, type]); // Agregar tipo al filtro
    }
  };

  // Función para manejar el "Show All Types"
  const handleShowAllTypes = () => {
    setFilteredTypes([]); // Deseleccionar todos los tipos
  };

  return (
    <div id="filter-buttons">
      <button
        key="All"
        className="all-types-button"
        style={{
          backgroundColor: "#808080", // Color gris para "All"
          color: "white",
        }}
        onClick={handleShowAllTypes}
      >
        All
      </button>

      {types.map((type) => (
        <button
          key={type}
          className={`${
            filteredTypes
              .map((t) => t.toLowerCase())
              .includes(type.toLowerCase())
              ? "active"
              : ""
          } ${type.toLowerCase()}`}
          style={{
            backgroundColor: TypeColors[type] || "#808080", // Usar el color del tipo
            color: "white",
          }}
          onClick={() => handleFilter(type.toLowerCase())}
          disabled={
            filteredTypes.length === 2 &&
            !filteredTypes
              .map((t) => t.toLowerCase())
              .includes(type.toLowerCase())
          }
        >
          {sentenceCase(type)} {/* Capitaliza el primer carácter */}
          <PokemonTypeSVG type={sentenceCase(type)} />
        </button>
      ))}
    </div>
  );
}

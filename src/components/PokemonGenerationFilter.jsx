import { usePokemonContext } from "../context/PokemonContext"; // Importamos el custom hook
import "../styles/PokemonGenerationFilter.css";
import { PokemonGenerations } from "../enum/PokemonGenerations"; // Importamos las generaciones

export function PokemonGenerationFilter() {
  const { selectedGenerations, setSelectedGenerations } = usePokemonContext(); // Accedemos al contexto

  // Función para manejar el filtro de generaciones
  const handleGenerationChange = (generationId) => {
    if (selectedGenerations.includes(generationId)) {
      setSelectedGenerations(selectedGenerations.filter((g) => g !== generationId)); // Eliminar generación
    } else {
      setSelectedGenerations([...selectedGenerations, generationId]); // Agregar generación
    }
  };

  // Función para manejar el "Show All Generations"
  const handleShowAllGenerations = () => {
    setSelectedGenerations([]); // Deseleccionar todas las generaciones
  };

  return (
    <div className="generation-filter">
      <div className="generation-checkboxes">
        {/* Botón "Show All" */}
        <label style={{ cursor: "pointer" }}>
          <button
            onClick={handleShowAllGenerations}
            className="generation-item show-all-button"
          >
            All
          </button>
        </label>

        {/* Botones de generación (con checkboxes invisibles) */}
        {PokemonGenerations.map((generation) => (
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

import { usePokemonContext } from "../context/PokemonContext"; // Usamos el contexto centralizado
import "../styles/PokemonSearch.css"; // Aseguramos que los estilos no se pierdan

export function PokemonSearch() {
  const { searchTerm, setSearchTerm } = usePokemonContext(); // Accedemos al contexto

  // Función que maneja el cambio en el campo de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase()); // Actualizamos el término de búsqueda en el contexto
  };

  // Función para limpiar el campo de búsqueda
  const clearSearch = () => {
    setSearchTerm(""); // Limpiamos el término de búsqueda
  };

  return (
    <div className="search-container">
      <div className="input-container">
        <input
          type="text" // Cambiado a tipo texto para tener más control
          placeholder="Search by pokemon name or number"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        {/* Botón de limpiar */}
        {searchTerm && (
          <button onClick={clearSearch} className="clear-button">
            ✖
          </button>
        )}
      </div>
    </div>
  );
}

import "../styles/PokemonFilter.css"; // Aseguramos que los estilos no se pierdan

export function PokemonFilter({ filteredTypes, handleFilter }) {
  const types = [
    "All", "Fire", "Water", "Grass", "Electric", "Normal", 
    "Poison", "Psychic", "Fighting", "Bug", "Ghost", 
    "Dragon", "Dark", "Steel", "Fairy", "Flying",
    "Rock", "Ice", "Ground", 
  ];

  return (
    <div id="filter-buttons">
      {types.map((type) => (
        <button
          key={type}
          className={`${
            filteredTypes.map((t) => t.toLowerCase()).includes(type.toLowerCase()) || (filteredTypes.length === 0 && type === "All") 
            ? "active" 
            : ""} 
            ${type.toLowerCase()}`}
          onClick={() => handleFilter(type.toLowerCase())} // Pasamos los tipos en minúsculas
          disabled={filteredTypes.length === 2 && !filteredTypes.map((t) => t.toLowerCase()).includes(type.toLowerCase())} // Deshabilitar si ya tenemos 2 tipos seleccionados
        >
          {type}
        </button>
      ))}
    </div>
  );
}


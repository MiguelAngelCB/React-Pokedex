// PokemonFilter.jsx
import React from 'react';
import "../styles/PokemonFilter.css";

export function PokemonFilter({ filteredType, handleFilter }) {
  const types = [
    "All", "Fire", "Water", "Grass", "Electric", "Normal", 
    "Poison", "Psychic", "Fighting", "Bug", "Ghost", 
    "Dragon", "Dark", "Steel", "Fairy", "Flying"
  ];

  return (
    <div id="filter-buttons">
      {types.map((type) => (
        <button
          key={type}
          className={`${
            filteredType === type || (filteredType === "" && type === "All") 
            ? "active" 
            : ""} 
            ${type.toLowerCase()}`}
          onClick={() => handleFilter(type === "All" ? "" : type)} // Si es "All", limpiamos el filtro
        >
          {type}
        </button>
      ))}
    </div>
  );
}

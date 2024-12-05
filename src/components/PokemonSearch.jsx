// PokemonSearch.jsx
import { useState } from "react";
import "../styles/PokemonSearch.css"; // Importamos el archivo CSS

export function PokemonSearch({ handleSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    handleSearch(event.target.value); // Pasar el término de búsqueda al componente principal
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Buscar Pokémon por nombre"
        className="search-input"
      />
    </div>
  );
}

import { useState } from "react";
import "../styles/PokemonSearch.css"; // Importamos el archivo CSS
import PropTypes from "prop-types"; // Importamos PropTypes

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

// Validación de las props
PokemonSearch.propTypes = {
  handleSearch: PropTypes.func.isRequired, // Aseguramos que handleSearch sea una función requerida
};


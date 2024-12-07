import { useState } from "react";
import { usePokemonContext } from "../context/PokemonContext";
import { PokemonList } from "../components/PokemonList";
import { PokemonSearch } from "../components/PokemonSearch";
import { PokemonTypeFilter } from "../components/PokemonTypeFilter";
import { PokemonGenerationFilter } from "../components/PokemonGenerationFilter";
import "../styles/HomePage.css";

export function HomePage() {
  const { loading } = usePokemonContext(); // Obtiene el estado loading desde el contexto global
  const [filtersVisible, setFiltersVisible] = useState(false); // Estado para controlar la visibilidad de los filtros

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible); // Alterna la visibilidad de los filtros
  };

  return (
    <div id="page">
      {/* Header con el logo */}
      <div id="header">
        <div id="title">
          <img src="img/Logo.svg" alt="Logo" />
        </div>
      </div>

      {/* Botón de desplegable */}
      <button
        id="filters-toggle"
        onClick={toggleFilters}
        aria-expanded={filtersVisible}
      >
        <span>{filtersVisible ? "▲" : "▼"}</span> Filters
      </button>

      {/* Filtros (se muestra solo cuando filtersVisible es true) */}
      {filtersVisible && !loading && (
        <div id="filters">
          <PokemonSearch />
          <PokemonTypeFilter />
          <PokemonGenerationFilter />
        </div>
      )}

      {/* Lista de Pokémon */}
      <PokemonList />
    </div>
  );
}

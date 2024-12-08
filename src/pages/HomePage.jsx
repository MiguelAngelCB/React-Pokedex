import { useState, useEffect, useRef } from "react";
import { usePokemonContext } from "../context/PokemonContext";
import { PokemonList } from "../components/PokemonList";
import { PokemonSearch } from "../components/PokemonSearch";
import { PokemonTypeFilter } from "../components/PokemonTypeFilter";
import { PokemonGenerationFilter } from "../components/PokemonGenerationFilter";
import "../styles/HomePage.css";

export function HomePage() {
  const { loading } = usePokemonContext(); // Obtiene el estado loading desde el contexto global
  const [filtersVisible, setFiltersVisible] = useState(false); // Estado para controlar la visibilidad de los filtros
  const [headerVisible, setHeaderVisible] = useState(true); // Estado para controlar si el header es visible
  const headerRef = useRef(null); // Referencia al header

  // Alterna la visibilidad de los filtros
  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  // Usa IntersectionObserver para detectar cuando el header deja de ser visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeaderVisible(entry.isIntersecting); // Actualiza si el header está visible o no
      },
      { root: null, threshold: 0 } // Detecta cuando cualquier parte del header es visible
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div id="page">
      {/* Header con el logo */}
      <div id="header" ref={headerRef}>
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
        <div
          id="filters"
          className={
            headerVisible ? "filters-header-visible" : "filters-header-hidden"
          }
        >
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

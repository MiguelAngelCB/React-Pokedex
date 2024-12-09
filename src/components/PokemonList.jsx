import { useState, useEffect } from "react";
import { usePokemonContext } from "../context/PokemonContext";
import { PokemonCard } from "./PokemonCard";
import "../styles/PokemonList.css";
import { PokemonPagination } from "./PokemonPagination";

export function PokemonList() {
  const {
    pokemonList,
    loading,
    error,
    filteredTypes,
    selectedGenerations,
    searchTerm,
    setAllFlipped,
    allFlipped,
  } = usePokemonContext();

  const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
  const itemsPerPage = 100; // Número de Pokémon por página

  // Siempre que los filtros cambien, se reinicia a la primera página
  useEffect(() => {
    handlePageChange(1);
  }, [filteredTypes, selectedGenerations, searchTerm]);

  // Función para cambiar de página
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Desplaza al inicio de la página
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // Filtramos los Pokémon
  const filteredPokemons = (pokemonList || []).filter((pokemon) => {
    const matchesType =
      filteredTypes.length === 0 ||
      filteredTypes.every((type) =>
        pokemon.types.some((t) => t.name.toLowerCase() === type.toLowerCase())
      );

    const matchesGeneration =
      selectedGenerations.length === 0 ||
      selectedGenerations.includes(pokemon.generation);

    const matchesSearch = (
      pokemon.id +
      " " +
      pokemon.name.toLowerCase()
    ).includes(searchTerm);

    return matchesType && matchesGeneration && matchesSearch;
  });

  const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage); // Calculamos el total de páginas

  // Obtenemos los Pokémon visibles para la página actual
  const visiblePokemons = filteredPokemons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <button
        onClick={() => setAllFlipped(!allFlipped)}
        className="flip-all-btn"
      >
        <img src="img/Flip.svg" alt="Flip All" />
      </button>

      {/* Indicador de que no se encontraron Pokémon */}
      {filteredPokemons.length === 0 && (
        <div className="no-pokemon-indicator">
          <img src="img/Ash.png" alt="Ash" />
          <p>No Pokémon found. Try again later!</p>
        </div>
      )}

      <div id="pokemonList">
        {visiblePokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            isFlipped={allFlipped}
          />
        ))}
      </div>

      {/* Solo muestra la paginación si hay Pokémon visibles */}
      {filteredPokemons.length > 0 && (
        <PokemonPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}

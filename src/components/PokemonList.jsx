import { useState, useEffect } from "react";
import { usePokemonContext } from "../context/PokemonContext";
import { PokemonCard } from "./PokemonCard";
import { PokemonPagination } from "./PokemonPagination";
import "../styles/PokemonList.css";
import ErrorIndicator from "./ErrorIndicator";

export function PokemonList() {
  const {
    error,
    filteredTypes,
    selectedGenerations,
    searchTerm,
    allFlipped,
    filteredPokemons,
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

  const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage); // Calculamos el total de páginas

  // Obtenemos los Pokémon visibles para la página actual
  const visiblePokemons = filteredPokemons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      {error && (
        <ErrorIndicator>
          <img src="img/Error.png" alt="Error" />
          <p>Something went wrong. Vamo a calmarno!</p>
        </ErrorIndicator>
      )}
      {filteredPokemons.length === 0 && (
        <ErrorIndicator>
          <img src="img/Ash.png" alt="Ash" />
          <p>No Pokémon found. Try again later!</p>
        </ErrorIndicator>
      )}

      {filteredPokemons.length > 0 && (
        <>
          <div id="pokemonList">
            {visiblePokemons.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                isFlipped={allFlipped}
              />
            ))}
          </div>
          <PokemonPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </>
  );
}

import { usePokemonContext } from "../context/PokemonContext";
import { PokemonCard } from "./PokemonCard";
import "../styles/PokemonList.css";

export function PokemonList() {
  const { pokemonList, loading, error, filteredTypes, selectedGenerations, searchTerm,setAllFlipped,allFlipped } =
    usePokemonContext();

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

  const visiblePokemons = (pokemonList || []).filter((pokemon) => {
    const matchesType =
      filteredTypes.length === 0 ||
      filteredTypes.every((type) =>
        pokemon.types.some((t) => t.name.toLowerCase() === type.toLowerCase())
      );

    const matchesGeneration =
      selectedGenerations.length === 0 ||
      selectedGenerations.includes(pokemon.generation);

    const matchesSearch = (pokemon.id + " " + pokemon.name.toLowerCase()).includes(searchTerm);

    return matchesType && matchesGeneration && matchesSearch;
  });

  return (
    <div id="pokemonList">
      <button onClick={() => setAllFlipped(!allFlipped)} className="flip-all-btn">
        <img src="img/Flip.svg" alt="Flip All" />
      </button>
      <div id="pokemonList">
        {visiblePokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} isFlipped={allFlipped} />
        ))}
      </div>
    </div>
  );
}

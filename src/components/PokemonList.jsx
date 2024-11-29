// src/components/PokemonList.jsx

import { useFetch } from "../hooks/useFetch";
import { PokemonCard } from "./PokemonCard";
import { fetchAllPokemons } from "../services/api";

export function PokemonList() {
  const { data: pokemonList, loading, error } = useFetch(fetchAllPokemons);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {pokemonList.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </>
  );
}

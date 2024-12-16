import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PokedexContainer from "../components/PokedexContainer";
import { usePokemonContext } from "../context/PokemonContext";

export function PokemonIndividualPage() {
  const { id } = useParams(); // Obtén el ID de la URL
  const { pokemonList, loading, error, getPokemonById } = usePokemonContext(); // Usamos el contexto

  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    if (!loading && !error && pokemonList) {
      // Solo se ejecuta después de que pokemonList esté disponible
      const foundPokemon = getPokemonById(id);
      setPokemon(foundPokemon);
    }
  }, [loading, pokemonList, id]); // Dependencias actualizadas
  return (
    <div>
      <h1>Detalles del Pokémon</h1>
      <PokedexContainer pokemon={pokemon} />
    </div>
  );
}

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PokedexContainer from "../components/PokedexContainer";
import { usePokemonContext } from "../context/PokemonContext";
import { LoadingDots } from "../components/LoadingDots";

export function PokemonIndividualPage() {
  const { id } = useParams(); // Obtén el ID de la URL
  const { pokemonList, loading, error, getPokemonById } = usePokemonContext(); // Usamos el contexto

  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    if (pokemonList != null) {
      // Solo se ejecuta después de que pokemonList esté disponible
      const foundPokemon = getPokemonById(id);
      setPokemon(foundPokemon);
    }
  }, [loading, error, pokemonList, id]); // Dependencias actualizadas
  return (
    <>
      {loading && <LoadingDots />}
      {!loading && !error && pokemon != null && (
        <>
          <PokedexContainer pokemon={pokemon} />
        </>
      )}
    </>
  );
}

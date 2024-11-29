import { useFetch } from "../hooks/useFetch";
import { PokemonCard } from "./PokemonCard";
import { fetchAllPokemons } from "../services/api";
import "../styles/PokemonList.css"; // Importamos el archivo CSS para la animación

export function PokemonList() {
  const { data: pokemonList, loading, error } = useFetch(fetchAllPokemons);

  // Mostrar la animación de carga si estamos cargando o si no hay Pokémon aún
  if (loading || !pokemonList || pokemonList.length === 0) {
    return (
      <div className="loading-container">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    );
  }

  // Mostrar el mensaje de error si hubo algún problema al obtener los datos
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // Renderizar las cartas de Pokémon cuando ya están disponibles
  return (
    <>
      {pokemonList.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </>
  );
}

import React, { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { PokemonCard } from "./PokemonCard";
import { PokemonFilter } from "./PokemonFilter";
import { fetchAllPokemons } from "../services/api";
import "../styles/PokemonList.css";

export function PokemonList() {
  const { data: pokemonList, loading, error } = useFetch(fetchAllPokemons);
  const [filteredTypes, setFilteredTypes] = useState([]); // Estado para manejar hasta 2 tipos seleccionados

  // Función para manejar el filtro de tipos
  const handleFilter = (type) => {
    if (type === "All") {
      // Si "All" se selecciona, reiniciamos los filtros
      setFilteredTypes([]);
    } else {
      if (filteredTypes.includes(type)) {
        // Si el tipo ya está en los filtros, lo eliminamos
        setFilteredTypes(filteredTypes.filter((t) => t !== type));
      } else if (filteredTypes.length < 2) {
        // Si no hemos seleccionado 2 tipos, lo agregamos al filtro
        setFilteredTypes([...filteredTypes, type]);
      }
    }
  };

  // Filtrar los Pokémon según los tipos seleccionados
  const visiblePokemons = filteredTypes.length
    ? pokemonList.filter((pokemon) => {
        // Comprobamos si los tipos del Pokémon coinciden exactamente con los tipos seleccionados
        const pokemonTypes = pokemon.types.map((type) => type.name.toLowerCase());
        return filteredTypes.length === pokemonTypes.length &&
          filteredTypes.every((type) => pokemonTypes.includes(type.toLowerCase()));
      })
    : pokemonList;

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
      <PokemonFilter filteredTypes={filteredTypes} handleFilter={handleFilter} />
      <div id="pokemonList">
        {visiblePokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </>
  );
}

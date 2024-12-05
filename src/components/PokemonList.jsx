import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { PokemonCard } from "./PokemonCard";
import { PokemonFilter } from "./PokemonFilter";
import { PokemonSearch } from "./PokemonSearch"; // Importamos el componente de búsqueda
import { PokemonGenerationFilter } from "./PokemonGenerationFilter"; // Importamos el filtro de generaciones
import { fetchAllPokemons } from "../services/api";
import "../styles/PokemonList.css";

export function PokemonList() {
  const { data: pokemonList, loading, error } = useFetch(fetchAllPokemons);
  const [filteredTypes, setFilteredTypes] = useState([]); // Estado para manejar los tipos seleccionados
  const [selectedGenerations, setSelectedGenerations] = useState([]); // Estado para manejar las generaciones seleccionadas
  const [searchTerm, setSearchTerm] = useState(""); // Estado para manejar el término de búsqueda

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

  // Función para manejar el filtro de generaciones
  const handleGenerationFilter = (generation) => {
    if (selectedGenerations.includes(generation)) {
      // Si la generación ya está seleccionada, la eliminamos
      setSelectedGenerations(
        selectedGenerations.filter((g) => g !== generation)
      );
    } else {
      // Si no está seleccionada, la añadimos
      setSelectedGenerations([...selectedGenerations, generation]);
    }
  };

  // Función para manejar el cambio en el término de búsqueda
  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase()); // Convertimos el término a minúsculas para una comparación consistente
  };

  // Filtrar los Pokémon según los tipos seleccionados, las generaciones y el término de búsqueda
  const visiblePokemons = (pokemonList || []).filter((pokemon) => {
    // Filtrado por tipo
    const matchesType =
      filteredTypes.length === 0 ||
      filteredTypes.every((type) =>
        pokemon.types.some((t) => t.name.toLowerCase() === type.toLowerCase())
      );

    // Filtrado por generación
    const matchesGeneration =
      selectedGenerations.length === 0 ||
      selectedGenerations.includes(pokemon.generation);

    // Filtrado por búsqueda de nombre
    const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm);

    return matchesType && matchesGeneration && matchesSearch;
  });

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
      <PokemonSearch handleSearch={handleSearch} />{" "}
      {/* Componente de búsqueda */}
      <PokemonFilter
        filteredTypes={filteredTypes}
        handleFilter={handleFilter}
      />
      <PokemonGenerationFilter
        selectedGenerations={selectedGenerations}
        handleGenerationChange={handleGenerationFilter}
      />
      <div id="pokemonList">
        {visiblePokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </>
  );
}

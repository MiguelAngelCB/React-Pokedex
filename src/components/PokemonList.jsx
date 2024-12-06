import { useState, useEffect, useRef } from "react";
import { useFetch } from "../hooks/useFetch";
import { PokemonCard } from "./PokemonCard";
import { PokemonTypeFilter } from "./PokemonTypeFilter";
import { PokemonSearch } from "./PokemonSearch";
import { PokemonGenerationFilter } from "./PokemonGenerationFilter";
import { fetchPokemonsFromFile } from "../services/api";
import "../styles/PokemonList.css";

export function PokemonList() {
  const { data: pokemonList, loading, error } = useFetch(fetchPokemonsFromFile);
  const [filteredTypes, setFilteredTypes] = useState([]); // Estado para manejar los tipos seleccionados
  const [selectedGenerations, setSelectedGenerations] = useState([]); // Estado para manejar las generaciones seleccionadas
  const [searchTerm, setSearchTerm] = useState(""); // Estado para manejar el término de búsqueda
  const [allFlipped, setAllFlipped] = useState(false); // Estado para controlar si todas las cartas están giradas
  const [visiblePokemons, setVisiblePokemons] = useState([]); // Estado para los Pokémon visibles
  const observerRef = useRef(null); // Referencia para el IntersectionObserver

  // Cargar los primeros 20 Pokémon al iniciar
  useEffect(() => {
    if (pokemonList) {
      setVisiblePokemons(pokemonList.slice(0, 100));
    }
  }, [pokemonList]);

  // Lógica para lazy loading (cargar más Pokémon cuando el usuario llega al final de la lista)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisiblePokemons((prevPokemons) => [
          ...prevPokemons,
          ...pokemonList.slice(prevPokemons.length, prevPokemons.length + 100),
        ]);
      }
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [pokemonList]);

  // Función para manejar el filtro de tipos
  const handleFilter = (type) => {
    if (type === "All") {
      setFilteredTypes([]); // Si "All" se selecciona, reiniciamos los filtros
    } else {
      if (filteredTypes.includes(type)) {
        setFilteredTypes(filteredTypes.filter((t) => t !== type)); // Eliminar tipo del filtro
      } else if (filteredTypes.length < 2) {
        setFilteredTypes([...filteredTypes, type]); // Agregar tipo al filtro
      }
    }
  };

  // Función para manejar el filtro de generaciones
  const handleGenerationFilter = (generation) => {
    if (selectedGenerations.includes(generation)) {
      setSelectedGenerations(selectedGenerations.filter((g) => g !== generation)); // Eliminar generación
    } else {
      setSelectedGenerations([...selectedGenerations, generation]); // Agregar generación
    }
  };

  // Función para manejar el cambio en el término de búsqueda
  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  // Función para manejar el "Show All Types" (Deseleccionar todos los tipos)
  const handleShowAllTypes = () => {
    setFilteredTypes([]); // Deseleccionar todos los tipos
  };

  // Función para manejar el "Show All Generations" (Deseleccionar todas las generaciones)
  const handleShowAllGenerations = () => {
    setSelectedGenerations([]); // Deseleccionar todas las generaciones
  };

  // Función para girar todas las cartas
  const handleFlipAllCards = () => {
    setAllFlipped(!allFlipped); // Cambiar el estado global de si todas las cartas están giradas
  };

  // Filtrar los Pokémon según los tipos seleccionados, las generaciones y el término de búsqueda
  const filteredPokemons = visiblePokemons.filter((pokemon) => {
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

  if (loading || !pokemonList || pokemonList.length === 0) {
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

  return (
    <>
      <PokemonSearch handleSearch={handleSearch} />
      <PokemonTypeFilter 
        filteredTypes={filteredTypes} 
        handleFilter={handleFilter} 
        handleShowAllTypes={handleShowAllTypes} // Aseguramos que se pase aquí
      />
      <PokemonGenerationFilter
        selectedGenerations={selectedGenerations}
        handleGenerationChange={handleGenerationFilter}
        handleShowAllGenerations={handleShowAllGenerations} // Pasamos la función para deseleccionar todas las generaciones
      />
      <button onClick={handleFlipAllCards} className="flip-all-btn">
        <img src="img/Flip.svg" />
      </button>
      <div id="pokemonList">
        {filteredPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} isFlipped={allFlipped} />
        ))}
      </div>
      <div ref={observerRef} className="load-more-trigger"></div>
    </>
  );
}

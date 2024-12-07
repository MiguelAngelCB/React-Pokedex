import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { useFetch } from "../hooks/useFetch";
import { fetchPokemonsFromFile } from "../services/api";

export const PokemonContext = createContext();

export function PokemonProvider({ children }) {
  const { data: pokemonList, loading, error } = useFetch(fetchPokemonsFromFile);

  const [filteredTypes, setFilteredTypes] = useState([]);
  const [selectedGenerations, setSelectedGenerations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [allFlipped, setAllFlipped] = useState(false);

  const value = {
    pokemonList,
    loading,
    error,
    filteredTypes,
    setFilteredTypes,
    selectedGenerations,
    setSelectedGenerations,
    searchTerm,
    setSearchTerm,
    allFlipped,
    setAllFlipped,
  };

  return (
    <PokemonContext.Provider value={value}>
      {children}
    </PokemonContext.Provider>
  );
}

export const usePokemonContext = () => {
  return useContext(PokemonContext);
};

PokemonProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

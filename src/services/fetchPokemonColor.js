// src/services/fetchPokemonColor.js

import axios from "axios";

export const fetchPokemonColor = async (speciesUrl) => {
  try {
    const { data } = await axios.get(speciesUrl);
    return data.color.name; // Devuelve el color como string ('green', 'blue', etc.)
  } catch (error) {
    console.error("Error fetching Pokémon color:", error);
    return "gray"; // Valor predeterminado en caso de error
  }
};

import axios from "axios";

// Función para obtener la generación del Pokémon a partir de la URL de la especie
export const getPokemonGeneration = async (speciesUrl) => {
  try {
    const { data } = await axios.get(speciesUrl);
    const generationUrl = data.generation.url;
    const generationData = await axios.get(generationUrl);
    return generationData.data.name; // Retorna el nombre de la generación (por ejemplo, "generation-i")
  } catch (error) {
    console.error("Error fetching Pokémon generation:", error);
    return "Unknown"; // En caso de error, devolvemos "Unknown"
  }
};

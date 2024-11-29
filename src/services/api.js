import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2";

// Colores por tipo de Pokémon
const typeColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

// Obtener el color único del Pokémon desde la URL de su especie
const fetchPokemonColor = async (speciesUrl) => {
  try {
    const { data } = await axios.get(speciesUrl);
    return data.color.name; // Devuelve el color como string ('green', 'blue', etc.)
  } catch (error) {
    console.error("Error fetching Pokémon color:", error);
    return "gray"; // Valor predeterminado en caso de error
  }
};

// Obtener una lista de hasta 100 Pokémon
export const fetchAllPokemons = async () => {
  try {
    // Llamada a la API para obtener hasta 100 Pokémon
    const { data } = await axios.get(`${BASE_URL}/pokemon?offset=0&limit=300`);

    // Mapear los detalles de cada Pokémon
    const pokemonDetails = await Promise.all(
      data.results.map(async (pokemon) => {
        const { data: details } = await axios.get(pokemon.url);

        return {
          id: details.id,
          name: details.name,
          image: details.sprites.other["official-artwork"].front_default,
          color: await fetchPokemonColor(details.species.url),
          types: details.types.map((t) => ({
            name: t.type.name,
            color: typeColors[t.type.name.toLowerCase()] || "#777",
          })),
          stats: {
            hp: details.stats[0]?.base_stat,
            attack: details.stats[1]?.base_stat,
            defense: details.stats[2]?.base_stat,
            specialAttack: details.stats[3]?.base_stat,
            specialDefense: details.stats[4]?.base_stat,
            speed: details.stats[5]?.base_stat,
          },
        };
      })
    );

    return pokemonDetails; // Devuelve la lista de Pokémon con sus detalles
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    return [];
  }
};

import axios from "axios";
import { TypeColors } from "../enum/TypeColors"; // Importamos el enum TypeColors
// import { fetchPokemonColor } from "./fetchPokemonColor"; // Importamos la función fetchPokemonColor
import { getPokemonGeneration } from "./fetchPokemonGeneration"; // Importamos la función getPokemonGeneration

const BASE_URL = "https://pokeapi.co/api/v2";

export const fetchAllPokemons = async () => {
  const limit = 400; // Limitamos a 100 Pokémon para obtener más resultados
  const url = `${BASE_URL}/pokemon?offset=0&limit=${limit}`;

  try {
    const { data } = await axios.get(url);

    // Mapear todos los resultados y obtener detalles completos de cada Pokémon
    const pokemonDetails = await Promise.all(
      data.results.map(async (pokemon) => {
        const { data: details } = await axios.get(pokemon.url);

        // Obtener el color del pokemon
        // const color = await fetchPokemonColor(details.species.url);

        // Obtener la generación del Pokémon
        const generation = await getPokemonGeneration(details.species.url);

        // Obtener las habilidades del Pokémon (tanto normales como ocultas)
        const abilities = {
          normal: details.abilities
            .filter((ability) => !ability.is_hidden)
            .map((ability) => ability.ability.name),
          hidden: details.abilities
            .filter((ability) => ability.is_hidden)
            .map((ability) => ability.ability.name),
        };

        // Obtener el sprite normal de pixel art
        const normalImage =
          details.sprites.front_default || // Intenta obtener el sprite normal en pixel art
          details.sprites.other?.dream_world?.front_default || // En caso de que esté en dream_world
          details.sprites.other?.home?.front_default || // Si está en home
          null; // Si no se encuentra el sprite, devuelve null

        // Devolver los detalles del Pokémon, incluyendo color, habilidades, estadísticas, etc.
        return {
          id: details.id,
          name: details.name,
          image: normalImage, // Usamos la imagen normal en pixel art
          shinyImage: details.sprites.front_shiny, // Imagen shiny
          // color,
          types: details.types.map((t) => ({
            name: t.type.name,
            color: TypeColors[t.type.name] || "#777", // Usamos el enum TypeColors
          })),
          stats: {
            hp: details.stats[0]?.base_stat,
            attack: details.stats[1]?.base_stat,
            defense: details.stats[2]?.base_stat,
            specialAttack: details.stats[3]?.base_stat,
            specialDefense: details.stats[4]?.base_stat,
            speed: details.stats[5]?.base_stat,
          },
          generation, // Añadimos la generación
          abilities, // Añadimos las habilidades (normales y ocultas)
          weight: details.weight / 10, // Peso en kilogramos
          height: details.height / 10, // Altura en metros
        };
      })
    );

    return pokemonDetails;
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    return [];
  }
};

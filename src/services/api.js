import axios from "axios";
import { TypeColors } from "../enum/TypeColors"; // Importamos el enum TypeColors
import { fetchPokemonColor } from "./fetchPokemonColor"; // Importamos la función fetchPokemonColor
import { getPokemonGeneration } from "./fetchPokemonGeneration";

const BASE_URL = "https://pokeapi.co/api/v2";

export const fetchAllPokemons = async () => {
  const limit = 100; // Limitamos a 1300 Pokémon para obtener más resultados
  const url = `${BASE_URL}/pokemon?offset=0&limit=${limit}`;

  try {
    const { data } = await axios.get(url);

    const pokemonDetails = await Promise.all(
      data.results.map(async (pokemon) => {
        const { data: details } = await axios.get(pokemon.url);

        // Obtener el color de la especie
        const color = await fetchPokemonColor(details.species.url);

        // Obtener la generación del Pokémon
        const generation = await getPokemonGeneration(details.species.url);

        // Obtener las habilidades del Pokémon
        const abilities = details.abilities.map(
          (ability) => ability.ability.name
        );

        // Devolver los detalles del Pokémon, incluyendo los nuevos campos
        return {
          id: details.id,
          name: details.name,
          image: details.sprites.other["official-artwork"].front_default,
          shinyImage: details.sprites.front_shiny, // Imagen shiny
          color,
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
          abilities, // Añadimos las habilidades
        };
      })
    );

    return pokemonDetails;
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    return [];
  }
};

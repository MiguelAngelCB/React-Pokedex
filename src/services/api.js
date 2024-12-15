import axios from "axios";
import pLimit from "p-limit"; // Importamos p-limit para controlar la concurrencia
import { getPokemonGeneration } from "./fetchPokemonGeneration";
import pokemons from "../json/pokemons.json";

const BASE_URL = "https://pokeapi.co/api/v2";
const concurrencyLimit = pLimit(10); // Limitar a 10 solicitudes simultáneas

const formatName = (name) => {
  const words = name.split("-");
  return words.join(" ");
};

export const fetchAllPokemons = async () => {
  const limit = 1350; // Número de Pokémon a obtener
  const url = `${BASE_URL}/pokemon?offset=0&limit=${limit}`;

  try {
    const { data } = await axios.get(url);

    // Manejamos las solicitudes con p-limit para controlar la concurrencia
    const pokemonDetails = await Promise.all(
      data.results.map((pokemon) =>
        concurrencyLimit(async () => {
          const { data: details } = await axios.get(pokemon.url);
          const generation = await getPokemonGeneration(details.species.url);

          const abilities = {
            normal: details.abilities
              .filter((ability) => !ability.is_hidden)
              .map((ability) => ability.ability.name),
            hidden: details.abilities
              .filter((ability) => ability.is_hidden)
              .map((ability) => ability.ability.name),
          };

          const normalImage = details.sprites.front_default; // Puedes usar una URL predeterminada de imagen o un SVG fallback

          return {
            id: details.id,
            name: formatName(details.name),
            image: normalImage, // Aquí pasas una URL o la imagen de fallback
            shinyImage: details.sprites.front_shiny,
            types: details.types.map((t) => ({
              name: t.type.name,
            })),
            stats: {
              hp: details.stats[0]?.base_stat,
              attack: details.stats[1]?.base_stat,
              defense: details.stats[2]?.base_stat,
              specialAttack: details.stats[3]?.base_stat,
              specialDefense: details.stats[4]?.base_stat,
              speed: details.stats[5]?.base_stat,
            },
            generation,
            abilities,
            weight: details.weight / 10,
            height: details.height / 10,
          };
        })
      )
    );

    return pokemonDetails.filter((pokemon) => pokemon !== null);
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    return [];
  }
};

export const fetchPokemonsFromFile = () => {
  return pokemons;
};

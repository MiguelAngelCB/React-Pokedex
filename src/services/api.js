import axios from "axios"; // Para realizar solicitudes HTTP
import { TypeColors } from "../enum/TypeColors"; // Importamos el enum TypeColors
import { getPokemonGeneration } from "./fetchPokemonGeneration"; // Importamos la función getPokemonGeneration

const BASE_URL = "https://pokeapi.co/api/v2";

// Función para limitar el nombre a dos palabras
const formatName = (name) => {
  const words = name.split("-"); // Divide el nombre por guiones (como "miraidon-aquatic-mode")
  return words.slice(0, 2).join(" "); // Toma las primeras dos palabras y las une con un espacio
};

export const fetchAllPokemons = async () => {
  const limit = 300; // Limitamos a 1300 Pokémon para cubrir todo el rango.
  const url = `${BASE_URL}/pokemon?offset=0&limit=${limit}`;

  try {
    const { data } = await axios.get(url);

    // Mapear todos los resultados y obtener detalles completos de cada Pokémon
    const pokemonDetails = await Promise.all(
      data.results.map(async (pokemon) => {
        const { data: details } = await axios.get(pokemon.url);

        // Consultar el endpoint de species para obtener la variedad por defecto
        const { data: speciesDetails } = await axios.get(details.species.url);
        const isDefaultVariety = speciesDetails.varieties.find(
          (v) => v.is_default
        );

        // Verificar si este Pokémon corresponde a la variedad por defecto
        if (
          isDefaultVariety &&
          isDefaultVariety.pokemon.name !== details.name
        ) {
          return null; // Ignorar si no es la variante base
        }

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
          "../../public/pokeball.svg"; // Si no se encuentra el sprite, devuelve null

        // Devolver los detalles del Pokémon
        return {
          id: details.id,
          name: formatName(details.name), // Formateamos el nombre a máximo dos palabras
          image: normalImage, // Usamos la imagen normal en pixel art
          shinyImage: details.sprites.front_shiny, // Imagen shiny
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

    // Filtrar resultados nulos (Pokémon que no son base)
    return pokemonDetails.filter((pokemon) => pokemon !== null);
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    return [];
  }
};

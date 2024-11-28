import { PokemonCard } from "./PokemonCard";

const pokemons = [
  {
    id: 25,
    name: "Pikachu",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    type: "Electric",
    stats: {
      hp: 35,
      attack: 55,
      defense: 40,
      speed: 90,
      specialAttack: 90,
      specialDefense: 190,
    },
    color: "rgba(255, 215, 0, 0.8)", // Color amarillo dorado
  },
  {
    id: 1,
    name: "Bulbasaur",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
    type: "Grass/Poison",
    stats: {
      hp: 45,
      attack: 49,
      defense: 49,
      speed: 45,
      specialAttack: 65,
      specialDefense: 65,
    },
    color: "rgba(34, 139, 34, 0.8)", // Color verde
  },
  {
    id: 4,
    name: "Charmander",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
    type: "Fire",
    stats: {
      hp: 39,
      attack: 52,
      defense: 43,
      speed: 65,
      specialAttack: 60,
      specialDefense: 50,
    },
    color: "rgba(255, 69, 0, 0.8)", // Color naranja fuego
  },
  {
    id: 7,
    name: "Squirtle",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
    type: "Water",
    stats: {
      hp: 44,
      attack: 48,
      defense: 65,
      speed: 43,
      specialAttack: 50,
      specialDefense: 64,
    },
    color: "rgba(0, 191, 255, 0.8)", // Color azul
  },
  {
    id: 39,
    name: "Jigglypuff",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/39.png",
    type: "Normal/Fairy",
    stats: {
      hp: 115,
      attack: 45,
      defense: 20,
      speed: 20,
      specialAttack: 45,
      specialDefense: 25,
    },
    color: "rgba(255, 182, 193, 0.8)", // Color rosa
  },
  {
    id: 52,
    name: "Meowth",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/52.png",
    type: "Normal",
    stats: {
      hp: 40,
      attack: 45,
      defense: 35,
      speed: 90,
      specialAttack: 40,
      specialDefense: 50,
    },
    color: "rgba(255, 223, 186, 0.8)", // Color beige
  },
  {
    id: 54,
    name: "Psyduck",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png",
    type: "Water",
    stats: {
      hp: 50,
      attack: 52,
      defense: 48,
      speed: 55,
      specialAttack: 65,
      specialDefense: 50,
    },
    color: "rgba(255, 255, 85, 0.8)", // Color amarillo
  },
  {
    id: 133,
    name: "Eevee",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png",
    type: "Normal",
    stats: {
      hp: 55,
      attack: 55,
      defense: 50,
      speed: 55,
      specialAttack: 45,
      specialDefense: 50,
    },
    color: "rgba(139, 69, 19, 0.8)", // Color marrón
  },
  {
    id: 143,
    name: "Snorlax",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png",
    type: "Normal",
    stats: {
      hp: 160,
      attack: 110,
      defense: 65,
      speed: 30,
      specialAttack: 65,
      specialDefense: 110,
    },
    color: "rgba(0, 128, 0, 0.8)", // Color verde oscuro
  },
  {
    id: 94,
    name: "Gengar",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png",
    type: "Ghost/Poison",
    stats: {
      hp: 60,
      attack: 65,
      defense: 60,
      speed: 110,
      specialAttack: 130,
      specialDefense: 75,
    },
    color: "rgba(102, 51, 153, 0.8)", // Color morado
  },
  {
    id: 65,
    name: "Alakazam",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/65.png",
    type: "Psychic",
    stats: {
      hp: 55,
      attack: 50,
      defense: 45,
      speed: 120,
      specialAttack: 135,
      specialDefense: 85,
    },
    color: "rgba(255, 255, 0, 0.8)", // Color amarillo
  },
  {
    id: 66,
    name: "Machop",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/066.png",
    type: "Fighting",
    stats: {
      hp: 70,
      attack: 80,
      defense: 50,
      speed: 35,
      specialAttack: 35,
      specialDefense: 35,
    },
    color: "rgba(255, 0, 0, 0.8)", // Color rojo
  },
  {
    id: 95,
    name: "Onix",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/95.png",
    type: "Rock/Ground",
    stats: {
      hp: 35,
      attack: 45,
      defense: 160,
      speed: 70,
      specialAttack: 30,
      specialDefense: 45,
    },
    color: "rgba(169, 169, 169, 0.8)", // Color gris
  },
  {
    id: 108,
    name: "Lickitung",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/108.png",
    type: "Normal",
    stats: {
      hp: 90,
      attack: 55,
      defense: 75,
      speed: 30,
      specialAttack: 60,
      specialDefense: 75,
    },
    color: "rgba(255, 105, 180, 0.8)", // Color rosa
  },
  {
    id: 106,
    name: "Hitmonlee",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/106.png",
    type: "Fighting",
    stats: {
      hp: 50,
      attack: 120,
      defense: 53,
      speed: 87,
      specialAttack: 35,
      specialDefense: 35,
    },
    color: "rgba(255, 140, 0, 0.8)", // Color naranja
  },
  {
    id: 34,
    name: "Nidoking",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/34.png",
    type: "Poison/Ground",
    stats: {
      hp: 81,
      attack: 92,
      defense: 77,
      speed: 85,
      specialAttack: 75,
      specialDefense: 85,
    },
    color: "rgba(128, 0, 128, 0.8)", // Color púrpura
  },
  {
    id: 31,
    name: "Nidoqueen",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/31.png",
    type: "Poison/Ground",
    stats: {
      hp: 90,
      attack: 82,
      defense: 87,
      speed: 76,
      specialAttack: 75,
      specialDefense: 85,
    },
    color: "rgba(0, 128, 128, 0.8)", // Color verde azulado
  },
  {
    id: 92,
    name: "Gastly",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/92.png",
    type: "Ghost/Poison",
    stats: {
      hp: 30,
      attack: 35,
      defense: 30,
      speed: 80,
      specialAttack: 100,
      specialDefense: 35,
    },
    color: "rgba(102, 0, 204, 0.8)", // Color morado oscuro
  },
];

export function PokemonList() {
  return (
    <>
      {pokemons.map((pokemon, index) => (
        <PokemonCard key={index} pokemon={pokemon} />
      ))}
    </>
  );
}

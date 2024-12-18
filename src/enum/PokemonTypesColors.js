export const TypeColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#3c7dab",
  electric: "#ddbd10",
  grass: "#54a769",
  ice: "#69b1ae",
  fighting: "#af1e1e",
  poison: "#8f5899",
  ground: "#a8755d",
  flying: "#6e85b7",
  psychic: "#F95587",
  bug: "#82a437",
  rock: "#B6A136",
  ghost: "#7045a3",
  dragon: "#3e1f87",
  dark: "#383840",
  steel: "#8494a6",
  fairy: "#ff99ad",
};
export const getTypeColor = (pokemon, position) => {
  return TypeColors[pokemon.types[position].name.toLowerCase()];
};

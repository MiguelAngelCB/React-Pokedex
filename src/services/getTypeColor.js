import { TypeColors } from "../enum/TypeColors";

export const getTypeColor = (pokemon, position) => {
  return TypeColors[pokemon.types[position].name.toLowerCase()];
};

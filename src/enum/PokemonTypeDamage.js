const TypeDamage = {
  normal: {
    rock: 0.5,
    steel: 0.5,
    ghost: 0,
  },
  fighting: {
    normal: 2,
    rock: 2,
    steel: 2,
    ice: 2,
    dark: 2,
    flying: 0.5,
    poison: 0.5,
    bug: 0.5,
    psychic: 0.5,
    fairy: 0.5,
    ghost: 0,
  },
  flying: {
    fighting: 2,
    bug: 2,
    grass: 2,
    rock: 0.5,
    steel: 0.5,
    electric: 0.5,
  },
  poison: {
    grass: 2,
    fairy: 2,
    poison: 0.5,
    ground: 0.5,
    rock: 0.5,
    ghost: 0.5,
    steel: 0,
  },
  ground: {
    poison: 2,
    rock: 2,
    steel: 2,
    fire: 2,
    electric: 2,
    bug: 0.5,
    grass: 0.5,
    flying: 0,
  },
  rock: {
    flying: 2,
    bug: 2,
    fire: 2,
    ice: 2,
    fighting: 0.5,
    ground: 0.5,
    steel: 0.5,
  },
  bug: {
    grass: 2,
    psychic: 2,
    dark: 2,
    fighting: 0.5,
    flying: 0.5,
    poison: 0.5,
    ghost: 0.5,
    steel: 0.5,
    fire: 0.5,
    fairy: 0.5,
  },
  ghost: {
    ghost: 2,
    psychic: 2,
    dark: 0.5,
    normal: 0,
  },
  steel: {
    rock: 2,
    ice: 2,
    fairy: 2,
    steel: 0.5,
    fire: 0.5,
    water: 0.5,
    electric: 0.5,
  },
  fire: {
    bug: 2,
    steel: 2,
    grass: 2,
    ice: 2,
    rock: 0.5,
    fire: 0.5,
    water: 0.5,
    dragon: 0.5,
  },
  water: {
    ground: 2,
    rock: 2,
    fire: 2,
    water: 0.5,
    grass: 0.5,
    dragon: 0.5,
  },
  grass: {
    ground: 2,
    rock: 2,
    water: 2,
    flying: 0.5,
    poison: 0.5,
    bug: 0.5,
    steel: 0.5,
    fire: 0.5,
    grass: 0.5,
    dragon: 0.5,
  },
  electric: {
    flying: 2,
    water: 2,
    grass: 0.5,
    electric: 0.5,
    dragon: 0.5,
    ground: 0,
  },
  psychic: {
    fighting: 2,
    poison: 2,
    steel: 0.5,
    psychic: 0.5,
    dark: 0,
  },
  ice: {
    flying: 2,
    ground: 2,
    grass: 2,
    dragon: 2,
    steel: 0.5,
    fire: 0.5,
    water: 0.5,
    ice: 0.5,
  },
  dragon: {
    dragon: 2,
    steel: 0.5,
    fairy: 0,
  },
  dark: {
    ghost: 2,
    psychic: 2,
    fighting: 0.5,
    dark: 0.5,
    fairy: 0.5,
  },
  fairy: {
    fighting: 2,
    dragon: 2,
    dark: 2,
    poison: 0.5,
    steel: 0.5,
    fire: 0.5,
  },
};
export function calculateEffectiveness(type1, type2 = null) {
  let results = [];

  // If there is only one type, calculate its damage against all other types
  if (type2 === null) {
    for (let type in TypeDamage[type1]) {
      results.push({ type, effectiveness: TypeDamage[type1][type] });
    }
  } else {
    // If there are two types, calculate the combined effectiveness
    const effectivenessType1 = TypeDamage[type1][type2] || 1; // Default to 1 if no relation exists
    const effectivenessType2 = TypeDamage[type2][type1] || 1; // Default to 1 if no relation exists

    // Multiply the effectiveness of both types
    results.push({
      types: [type1, type2],
      effectiveness: effectivenessType1 * effectivenessType2,
    });
  }

  return results;
}

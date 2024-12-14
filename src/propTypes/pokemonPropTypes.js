import PropTypes from "prop-types";

// Definir las propTypes del Pokémon en un solo lugar
export const pokemonPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  shinyImage: PropTypes.string,
  generation: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  types: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  stats: PropTypes.shape({
    hp: PropTypes.number.isRequired,
    attack: PropTypes.number.isRequired,
    defense: PropTypes.number.isRequired,
    speed: PropTypes.number.isRequired,
    specialAttack: PropTypes.number.isRequired,
    specialDefense: PropTypes.number.isRequired,
  }).isRequired,
  abilities: PropTypes.shape({
    normal: PropTypes.arrayOf(PropTypes.string),
    hidden: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
});

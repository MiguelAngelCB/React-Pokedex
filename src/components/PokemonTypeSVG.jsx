import PropTypes from "prop-types";

const PokemonTypeSVG = ({ type }) => {
  return (
    <>
      {/* Renderizamos el componente SVG con los estilos */}
      <img className="pokemon-type-svg" src={`img/type/${type}.svg`} alt="" />
    </>
  );
};

PokemonTypeSVG.propTypes = {
  type: PropTypes.string.isRequired,
};

export default PokemonTypeSVG;

import PropTypes from "prop-types";

// Importación de los SVGs correspondientes a cada tipo
import BugSvg from "/public/img/type/Bug.jsx";

// Mapeo de tipos a componentes SVG
const pokemonSvgMap = {
  bug: BugSvg,
  // Puedes agregar más tipos si es necesario
};

const PokemonTypeSVG = ({
  type,
  fillColorCircle,
  strokeColorCircle,
  strokeWidthCircle,
  fillColorPath,
  strokeColorPath,
  strokeWidthPath,
}) => {
  const SvgComponent = pokemonSvgMap[type.toLowerCase()];

  if (!SvgComponent) {
    return <div>Tipo no encontrado</div>;
  }

  return (
    <>
      {/* Renderizamos el componente SVG con los estilos */}
      <SvgComponent
        fillColorCircle={fillColorCircle}
        strokeColorCircle={strokeColorCircle}
        strokeWidthCircle={strokeWidthCircle}
        fillColorPath={fillColorPath}
        strokeColorPath={strokeColorPath}
        strokeWidthPath={strokeWidthPath}
      />
    </>
  );
};

PokemonTypeSVG.propTypes = {
  type: PropTypes.string.isRequired,
  fillColorCircle: PropTypes.string,
  strokeColorCircle: PropTypes.string,
  strokeWidthCircle: PropTypes.number,
  fillColorPath: PropTypes.string,
  strokeColorPath: PropTypes.string,
  strokeWidthPath: PropTypes.number,
};

PokemonTypeSVG.defaultProps = {
  fillColorCircle: "none",
  strokeColorCircle: "none",
  strokeWidthCircle: 2,
  fillColorPath: "none",
  strokeColorPath: "none",
  strokeWidthPath: 2,
};

export default PokemonTypeSVG;

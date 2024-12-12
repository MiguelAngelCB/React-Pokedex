import PropTypes from "prop-types";

const FairySvg = ({
  fillColorCircle,
  strokeColorCircle,
  strokeWidthCircle,
  fillColorPath,
  strokeColorPath,
  strokeWidthPath,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 1030 500"
    xmlSpace="preserve"
  >
    <g id="fairy">
      <g>
        {/* Circle con los atributos */}
        <circle
          className="st1" // Establecemos la clase del path en el circle
          cx="960"
          cy="428"
          r="64"
          fill={fillColorCircle}
          stroke={strokeColorCircle}
          strokeWidth={strokeWidthCircle}
        />
        {/* Path con los atributos */}
        <path
          className="st0" // Establecemos la clase del circle en el path
          d="M1007,428l-24.97-13.66l3.47-11.83l-11.83,3.47L960,381l-13.66,24.97l-11.83-3.47l3.47,11.83L913,428l24.97,13.66l-3.47,11.83l11.83-3.47L960,475l13.66-24.97l11.83,3.47l-3.47-11.83L1007,428z M966.72,434.72L960,447l-6.72-12.28L941,428l12.28-6.72L960,409l6.72,12.28L979,428L966.72,434.72z"
          fill={fillColorPath}
          stroke={strokeColorPath}
          strokeWidth={strokeWidthPath}
        />
      </g>
    </g>
  </svg>
);

FairySvg.propTypes = {
  fillColorCircle: PropTypes.string,
  strokeColorCircle: PropTypes.string,
  strokeWidthCircle: PropTypes.number,
  fillColorPath: PropTypes.string,
  strokeColorPath: PropTypes.string,
  strokeWidthPath: PropTypes.number,
};

FairySvg.defaultProps = {
  fillColorCircle: "none",
  strokeColorCircle: "none",
  strokeWidthCircle: 2,
  fillColorPath: "none",
  strokeColorPath: "none",
  strokeWidthPath: 2,
};

export default FairySvg;

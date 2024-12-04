import PropTypes from "prop-types";

const PokemonFallbackImage = ({ color = "#777" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="150"
      height="150"
      viewBox="0 0 500 500"
    >
      <g id="pokemon-gym">
        <path
          id="main-outline"
          fill="#FFFFFF"
          stroke="#000000"
          strokeWidth="0.5"
          d="M 436.23,45.87 C 368.38,181.94 300.54,318.02 232.70,454.09 220.22,407.49 207.73,360.90 195.25,314.31 195.25,314.31 193.58,308.11 193.58,308.11 193.58,308.11 186.21,307.90 181.55,307.39 123.78,303.42 71.85,256.86 64.28,199.53 52.97,141.73 89.52,81.34 143.38,59.74 201.12,35.14 273.40,61.81 303.38,116.46 343.34,95.59 383.52,73.83 423.57,52.62 423.57,52.62 436.23,45.87 436.23,45.87 Z"
        />
        <g id="ball-outline">
          <path
            id="ball-outline-top"
            fill={color}
            stroke="none"
            d="M 286.17,115.42 C 286.17,115.42 226.76,147.01 226.76,147.01 217.65,136.88 204.68,131.08 191.06,131.05 164.45,131.05 142.89,152.62 142.89,179.22 142.91,183.13 143.40,187.03 144.36,190.82 144.36,190.82 84.91,222.44 84.91,222.44 79.30,208.72 76.40,194.04 76.38,179.22 76.38,115.88 127.72,64.54 191.06,64.54 229.26,64.60 264.92,83.67 286.17,115.42 Z"
          />
          <path
            id="ball-outline-bottom"
            fill={color}
            stroke="none"
            d="M 236.60,415.44 C 236.60,415.44 203.82,293.13 203.82,293.13 199.58,293.62 195.32,293.88 191.06,293.90 152.71,293.84 116.92,274.61 95.71,242.67 95.71,242.67 155.06,211.11 155.06,211.11 164.18,221.43 177.28,227.36 191.06,227.38 217.66,227.38 239.22,205.82 239.22,179.22 239.20,175.16 238.67,171.12 237.64,167.20 237.64,167.20 297.06,135.60 297.06,135.60 297.06,135.60 404.70,78.26 404.70,78.26 404.70,78.26 236.60,415.44 236.60,415.44 Z"
          />
          <path
            id="ball-outline-center"
            fill={color}
            stroke="none"
            d="M 191.06,144.82 C 210.06,144.82 225.46,160.22 225.46,179.22 225.46,198.22 210.06,213.62 191.06,213.62 172.05,213.62 156.65,198.22 156.65,179.22 156.65,160.22 172.05,144.82 191.06,144.82 191.06,144.82 191.06,144.82 191.06,144.82 Z"
          />
        </g>
      </g>
    </svg>
  );
};

PokemonFallbackImage.propTypes = {
  color: PropTypes.string, // El color de la Pokébola o del fondo
};

export default PokemonFallbackImage;
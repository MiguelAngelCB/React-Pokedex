import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { usePokemonContext } from "../context/PokemonContext";
import { CustomButton } from "./CustomButton";
import "../styles/MenuButtons.css";

export function MenuButtons({ children }) {
  const { filteredPokemons, setAllFlipped, allFlipped } = usePokemonContext(); // Asumo que tienes este hook bien implementado

  return (
    <div className="menu">
      {children}
      {filteredPokemons.length > 0 && (
        <>
          <CustomButton
            onClick={() => setAllFlipped(!allFlipped)}
            className={"align-right background-grey"}
          >
            <FontAwesomeIcon icon={faSyncAlt} size="2x" color="white" />
          </CustomButton>
        </>
      )}
    </div>
  );
}

MenuButtons.propTypes = {
  children: PropTypes.node, // children puede ser cualquier tipo de nodo de React
};

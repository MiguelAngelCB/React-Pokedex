import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react"; // Importa useState para manejar el estado local
import { usePokemonContext } from "../context/PokemonContext";
import { CustomButton } from "./CustomButton";
import "../styles/MenuButtons.css";
import { executeAfterDelay } from "../services/executeAfterDelay";

export function MenuButtons({ children }) {
  const { filteredPokemons, setAllFlipped, allFlipped } = usePokemonContext(); // Hook del contexto
  const [isAnimating, setIsAnimating] = useState(false); // Estado local para bloquear el botón

  const handleClick = () => {
    if (isAnimating) return; // Evita múltiples clics si la animación está en curso

    setIsAnimating(true); // Activa el estado de animación
    setAllFlipped(!allFlipped); // Cambia el estado `allFlipped` (giro de las cartas)

    executeAfterDelay(() => setIsAnimating(false), 1.5);
  };

  return (
    <div className="menu">
      {children}
      {filteredPokemons.length > 0 && (
        <>
          <CustomButton
            onClick={handleClick} // Llama a `handleClick` para controlar el bloqueo
            className={`align-right background-purple ${
              isAnimating ? "disabled" : ""
            }`} // Agrega una clase "disabled" opcional si está bloqueado
            disabled={isAnimating} // Deshabilita el botón durante la animación
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

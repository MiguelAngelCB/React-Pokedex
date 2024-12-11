import PropTypes from "prop-types";
import "../styles/CustomButton.css";

export function CustomButton({
  onClick,
  className = "", // Valor predeterminado para className
  children,
  ariaExpanded = undefined, // Valor predeterminado para ariaExpanded
}) {
  return (
    <button
      onClick={onClick}
      className={`${className} custombtn`} // Combinamos las clases proporcionadas
      aria-expanded={ariaExpanded} // Pasamos ariaExpanded como prop opcional
    >
      {children}
    </button>
  );
}

// Definimos los PropTypes
CustomButton.propTypes = {
  onClick: PropTypes.func.isRequired, // Se requiere una función para onClick
  className: PropTypes.string, // Clase CSS personalizada
  children: PropTypes.node, // Permite cualquier contenido dentro del botón (texto, íconos, HTML, etc.)
  ariaExpanded: PropTypes.bool, // aria-expanded es un atributo opcional
};

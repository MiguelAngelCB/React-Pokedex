import PropTypes from "prop-types"; // Importamos PropTypes
import "../styles/ErrorIndicator.css"; // Importamos el archivo CSS

const ErrorIndicator = ({ children }) => {
  return <div className="error-indicator">{children}</div>;
};

// Definimos los PropTypes para validar el tipo de las props
ErrorIndicator.propTypes = {
  children: PropTypes.node.isRequired, // children puede ser cualquier tipo de nodo de React (texto, elementos, etc.)
};

export default ErrorIndicator;

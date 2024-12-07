import PropTypes from "prop-types"; // Importamos PropTypes
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleLeft,
  faAngleRight,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Pagination.css"; // Crea un archivo CSS para este componente si es necesario

export function PokemonPagination({ currentPage, totalPages, onPageChange }) {
  // Calculamos las páginas visibles (2 anteriores, actual, y 2 siguientes)
  const getVisiblePageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 2); // No bajar de la página 1
    const endPage = Math.min(totalPages, currentPage + 2); // No pasar del total de páginas

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="pagination">
      <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>
        <FontAwesomeIcon icon={faAngleDoubleLeft} />
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>

      {/* Mostrar las 2 anteriores, actual y 2 siguientes */}
      {getVisiblePageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={page === currentPage ? "active" : ""}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        <FontAwesomeIcon icon={faAngleDoubleRight} />
      </button>
    </div>
  );
}

// Definir PropTypes para el componente
PokemonPagination.propTypes = {
  currentPage: PropTypes.number.isRequired, // La página actual debe ser un número
  totalPages: PropTypes.number.isRequired, // El total de páginas también debe ser un número
  onPageChange: PropTypes.func.isRequired, // onPageChange debe ser una función
};

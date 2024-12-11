import "../styles/LoadingDots.css"; // Asegúrate de tener los estilos en un archivo CSS

export function LoadingDots() {
  return (
    <div className="loading-dots-container">
      <div className="loading-dot"></div>
      <div className="loading-dot"></div>
      <div className="loading-dot"></div>
    </div>
  );
}

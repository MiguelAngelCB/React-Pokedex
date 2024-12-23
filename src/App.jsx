import "./styles/App.css";
import { PokemonHomePage } from "./pages/PokemonHomePage";
import { PokemonIndividualPage } from "./pages/PokemonIndividualPage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"; // Import Navigate
import { PokemonProvider } from "./context/PokemonContext";

function App() {
  return (
    <PokemonProvider>
      <Router>
        <Routes>
          {/* Ruta para la página de inicio */}
          <Route path="/" element={<PokemonHomePage />} />

          {/* Ruta para la página de Pokémon Individual con parámetro id */}
          <Route path="/individual/:id" element={<PokemonIndividualPage />} />

          {/* Redirigir todas las demás rutas a la página de inicio */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </PokemonProvider>
  );
}

export default App;

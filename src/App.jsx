import "./styles/App.css";
import { PokemonHomePage } from "./pages/PokemonHomePage";
import { PokemonIndividualPage } from "./pages/PokemonIndividualPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
        </Routes>
      </Router>
    </PokemonProvider>
  );
}

export default App;

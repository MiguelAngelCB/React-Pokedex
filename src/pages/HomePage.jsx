import { usePokemonContext } from "../context/PokemonContext";
import { PokemonList } from "../components/PokemonList";
import { PokemonSearch } from "../components/PokemonSearch";
import { PokemonTypeFilter } from "../components/PokemonTypeFilter";
import { PokemonGenerationFilter } from "../components/PokemonGenerationFilter";
import "../styles/HomePage.css";

export function HomePage() {
  const { loading } = usePokemonContext(); // Obtiene el estado `loading` desde el contexto global

  return (
    <div id="page">
      {/* Header con el logo y los filtros */}
      <div id="header">
        <div id="title">
          <img src="img/Logo.svg" alt="Logo" /> {/* Título de la app */}
        </div>
        
      </div>
      {/* Contenedor de la lista de Pokémon */}
      <div id="listContainer">
      {!loading && ( /* Muestra los filtros solo cuando los datos han cargado */
          <div id="filters">
            <PokemonSearch /> {/* Componente de búsqueda */}
            <PokemonTypeFilter /> {/* Filtro por tipo */}
            <PokemonGenerationFilter /> {/* Filtro por generación */}
          </div>
        )}
        <PokemonList /> {/* Lista de Pokémon */}
      </div>
    </div>
  );
}

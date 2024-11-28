import { PokemonList } from "../components/PokemonList";
import "../styles/HomePage.css";

export function HomePage() {
  return (
    <div id="page">
      <div id="title">
        <img src="../../public/Logo.svg" alt="" />
      </div>
      <div id="pokemonList">
        <PokemonList></PokemonList>
      </div>
    </div>
  );
}

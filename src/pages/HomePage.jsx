import { PokemonList } from "../components/PokemonList";
import "../styles/HomePage.css";

export function HomePage() {
  return (
    <div id="page">
      <div id="title">
      <img src="img/Logo.svg"/>
      </div>
      <div id="listContainer">
        <PokemonList></PokemonList>
      </div>
    </div>
  );
}

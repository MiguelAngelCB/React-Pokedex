import { PokemonCard } from "../components/PokemonCard";
import "../styles/HomePage.css";

export function HomePage() {
  return (
    <div id="page">
      <div id="title">
        <img src="../../public/Logo.svg" alt="" />
      </div>
      <div id="pokemonList">
        <PokemonCard></PokemonCard>
        <PokemonCard></PokemonCard>
        <PokemonCard></PokemonCard>
        <PokemonCard></PokemonCard>
        <PokemonCard></PokemonCard>
        <PokemonCard></PokemonCard>
        <PokemonCard></PokemonCard>
      </div>
    </div>
  );
}

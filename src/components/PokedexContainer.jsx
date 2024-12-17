import React, { useState, useEffect } from "react";
import "../styles/PokedexContainer.css";
import { calculateEffectiveness } from "../enum/PokemonTypeDamage";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

// Función para obtener la línea evolutiva de un Pokémon
const getEvolutionData = async (pokemonId) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
  const data = await response.json();
  return data.evolution_chain.url;
};

const getEvolutions = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data.chain;
};

const PokedexContainer = ({ pokemon }) => {
  const [evolution, setEvolution] = useState(null);
  const navigate = useNavigate(); // Instanciar navigate

  useEffect(() => {
    if (pokemon && pokemon.id) {
      // Obtener la URL de la cadena evolutiva
      getEvolutionData(pokemon.id).then((url) => {
        // Obtener la información de la cadena evolutiva
        getEvolutions(url).then((chain) => {
          setEvolution(chain);
        });
      });
    }
  }, [pokemon]);

  // Verificar si pokemon y sus tipos existen
  if (!pokemon || !pokemon.types) {
    return <div>Loading...</div>;
  }

  // Obtener los tipos del Pokémon
  const [type1, type2] = pokemon.types.map((type) => type.name);

  // Calcular la efectividad de los tipos
  const effectiveness = calculateEffectiveness(type1, type2);

  // Dividir los resultados en fortalezas y debilidades
  const strengths = [];
  const weaknesses = [];
  const neutral = [];

  for (let targetType in effectiveness) {
    const value = effectiveness[targetType];
    if (value > 1) {
      strengths.push(targetType);
    } else if (value < 1) {
      weaknesses.push(targetType);
    } else {
      neutral.push(targetType);
    }
  }

  const renderEvolutionChain = (chain) => {
    const evolutions = [];
    let current = chain;

    while (current) {
      evolutions.push(current.species.name);
      current = current.evolves_to.length > 0 ? current.evolves_to[0] : null;
    }

    if (evolutions.length === 1) {
      return <span>{evolutions[0]}</span>;
    }

    return evolutions.map((evolution, index) => (
      <span key={index}>
        {evolution}
        {index < evolutions.length - 1 ? " -> " : ""}
      </span>
    ));
  };

  return (
    <div className="pokedex-body"> {/* Nuevo contenedor raíz */}
      <div className="container">
        <div className="left-screen">
          <div className="left-screen__top">
            <button className="light-button" onClick={() => navigate(-1)}>
              <div className="light-container">
                <div className="light light--blue"></div>
              </div>
            </button>
            <div className="lights-container">
              <div className="light light--red"></div>
              <div className="light light--yellow"></div>
              <div className="light light--green"></div>
            </div>
          </div>
          <div className="left-screen__bottom">
            <div className="main-screen">
              <div className="main-screen__top-lights"></div>
              <div id="display" className="main-screen__display">
                <div className="pokemon-image">
                  <img src={pokemon.image} alt={pokemon.name} />
                </div>
                <div className="pokemon-name">{pokemon.name}</div>
                <div className="search-message">Searching...</div>
                <div className="not-found-message">
                  Pokemon <br />Not Found
                </div>
              </div>
              <div className="pokemon-location-container">
                <div className="pokemon-location">Location: Unknown</div>
              </div>
              <div className="main-screen__speaker-light"></div>
              <div className="main-screen__speaker">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
          <div className="left-screen__joint">
            <div className="joint"></div>
            <div className="joint"></div>
            <div className="joint"></div>
            <div className="joint"></div>
            <div className="joint__reflextion"></div>
          </div>
        </div>
        <div className="right-screen">
          <div className="right-screen__bottom">
            {/* Display de evolución */}
            <div id="display-evolution" className="main-screen__display">
              <div id="evolution-container">
                <h3>Evolution Line</h3>
                <div id="evolution-line">
                  {evolution ? renderEvolutionChain(evolution) : <p>Loading evolution...</p>}
                </div>
              </div>
            </div>

            {/* Display de fortalezas y debilidades */}
            <div id="display-strength-weakness" className="main-screen__display">
              <div id="weakness-container">
                <h3>Weak Against</h3>
                <div id="weakness-types" className="type-icons">
                  {weaknesses.length > 0 ? (
                    weaknesses.map((type, index) => <div key={index} className="type-icon">{type}</div>)
                  ) : (
                    <p>No weaknesses found</p>
                  )}
                </div>
              </div>
              <div id="strength-container">
                <h3>Strong Against</h3>
                <div id="strength-types" className="type-icons">
                  {strengths.length > 0 ? (
                    strengths.map((type, index) => <div key={index} className="type-icon">{type}</div>)
                  ) : (
                    <p>No strengths found</p>
                  )}
                </div>
              </div>
              <div id="neutral-container">
                <h3>Neutral Against</h3>
                <div id="neutral-types" className="type-icons">
                  {neutral.length > 0 ? (
                    neutral.map((type, index) => <div key={index} className="type-icon">{type}</div>)
                  ) : (
                    <p>No neutral types found</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokedexContainer;


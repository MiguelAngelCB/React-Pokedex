import { pokemonPropTypes } from "../propTypes/pokemonPropTypes";
import "../styles/PokedexContainer.css";

const PokedexContainer = ({ pokemon }) => {
  return (
    <div className="pokedex-body">
      {/* Nuevo contenedor raíz */}
      <div className="container">
        <div className="left-screen">
          <div className="left-screen__top">
            <button className="light-button">
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
              </div>
              <div className="pokemon-location-container">
                <div className="pokemon-location">Location: Unknown</div>
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
                <div id="evolution-line"></div>
              </div>
            </div>

            {/* Display de fortalezas y debilidades */}
            <div
              id="display-strength-weakness"
              className="main-screen__display"
            >
              <div id="weakness-container">
                <h3>Weak Against</h3>
                <div id="weakness-types" className="type-icons"></div>
              </div>
              <div id="strength-container">
                <h3>Strong Against</h3>
                <div id="strength-types" className="type-icons"></div>
              </div>
              <div id="neutral-container">
                <h3>Neutral Against</h3>
                <div id="neutral-types" className="type-icons"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
PokedexContainer.propTypes = {
  pokemon: pokemonPropTypes.isRequired,
};

export default PokedexContainer;

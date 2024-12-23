import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2";

const extractPokemonId = (url) => {
  const urlParts = url.split("/");
  return parseInt(urlParts[urlParts.length - 2], 10);
};

const getEvolutionDetails = (evolutionDetails) => {
  if (!evolutionDetails || evolutionDetails.length === 0) return null;

  const details = evolutionDetails[evolutionDetails.length - 1];
  if (details.min_level) return { type: "level", level: details.min_level };
  if (details.item) return { type: "item", item: details.item.name };
  if (details.trigger?.name === "trade") return { type: "trade" };
  if (details.happiness) return { type: "happiness", value: details.happiness };
  if (details.held_item)
    return { type: "held_item", item: details.held_item.name };
  if (details.known_move)
    return { type: "move", move: details.known_move.name };
  return null;
};

const processEvolutionNode = (node) => {
  if (!node || !node.species || !node.species.url) return null;

  const currentPokemon = {
    id: extractPokemonId(node.species.url),
    name: node.species.name,
    evolves_to: [],
  };

  if (node.evolves_to && node.evolves_to.length > 0) {
    node.evolves_to.forEach((evolution) => {
      if (!evolution || !evolution.species || !evolution.species.url) return;

      const evolutionDetails = getEvolutionDetails(evolution.evolution_details);
      const evolutionNode = {
        id: extractPokemonId(evolution.species.url),
        name: evolution.species.name,
        requirements: evolutionDetails,
        evolves_to: [],
      };

      const subEvolutions = processEvolutionNode(evolution);
      if (subEvolutions) {
        evolutionNode.evolves_to = subEvolutions.evolves_to;
      }

      currentPokemon.evolves_to.push(evolutionNode);
    });
  }

  return currentPokemon;
};

export const fetchAllEvolutionChains = async () => {
  try {
    const evolutionChains = [];
    let nextUrl = `${BASE_URL}/evolution-chain?offset=0&limit=20`;

    while (nextUrl) {
      const { data: chainData } = await axios.get(nextUrl);
      const chainUrls = chainData.results.map((chain) => chain.url);

      // Fetch each evolution chain
      const chains = await Promise.all(
        chainUrls.map(async (url) => {
          try {
            const { data } = await axios.get(url);
            return processEvolutionNode(data.chain);
          } catch (error) {
            console.error(`Error fetching evolution chain from ${url}:`, error);
            return null;
          }
        })
      );

      chains.forEach((chain) => {
        if (chain) {
          evolutionChains.push(chain);
        }
      });

      nextUrl = chainData.next;
    }

    // Save to JSON file
    return evolutionChains;
  } catch (error) {
    console.error("Error fetching evolution chains:", error);
    return [];
  }
};

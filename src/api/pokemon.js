const BASE_URL = "https://pokeapi.co/api/v2";

// Traduction des types en français
const typeTranslations = {
  normal: "Normal",
  fire: "Feu",
  water: "Eau",
  electric: "Électrik",
  grass: "Plante",
  ice: "Glace",
  fighting: "Combat",
  poison: "Poison",
  ground: "Sol",
  flying: "Vol",
  psychic: "Psy",
  bug: "Insecte",
  rock: "Roche",
  ghost: "Spectre",
  dragon: "Dragon",
  dark: "Ténèbres",
  steel: "Acier",
  fairy: "Fée",
};

// Récupérer une liste de Pokémon avec pagination
export async function getPokemonList(limit = 20, offset = 0) {
  try {
    const response = await fetch(
      `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
    );
    const data = await response.json();

    // Récupérer les détails de chaque Pokémon
    const pokemonDetails = await Promise.all(
      data.results.map((pokemon) => getPokemonDetails(pokemon.url))
    );

    return {
      results: pokemonDetails,
      count: data.count,
      next: data.next,
      previous: data.previous,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des Pokémon:", error);
    throw error;
  }
}

// Récupérer le nom français d'un Pokémon depuis pokemon-species
async function getFrenchName(pokemonId) {
  try {
    const response = await fetch(`${BASE_URL}/pokemon-species/${pokemonId}`);
    const species = await response.json();

    // Chercher le nom français dans la liste des noms
    const frenchName = species.names.find((n) => n.language.name === "fr");
    return frenchName ? frenchName.name : species.name;
  } catch (error) {
    console.error("Erreur lors de la récupération du nom français:", error);
    return null;
  }
}

// Traduction des noms de stats en français
const statTranslations = {
  hp: "PV",
  attack: "Attaque",
  defense: "Défense",
  "special-attack": "Attaque Spé.",
  "special-defense": "Défense Spé.",
  speed: "Vitesse",
};

// Récupérer les détails d'un Pokémon
export async function getPokemonDetails(urlOrId) {
  try {
    const url =
      typeof urlOrId === "string" ? urlOrId : `${BASE_URL}/pokemon/${urlOrId}`;
    const response = await fetch(url);
    const pokemon = await response.json();

    // Récupérer le nom français
    const frenchName = await getFrenchName(pokemon.id);

    return {
      id: pokemon.id,
      name: pokemon.name,
      nameFr: frenchName || pokemon.name,
      height: pokemon.height,
      weight: pokemon.weight,
      types: pokemon.types.map((t) => ({
        name: t.type.name,
        nameFr: typeTranslations[t.type.name] || t.type.name,
      })),
      stats: pokemon.stats.map((s) => ({
        name: s.stat.name,
        nameFr: statTranslations[s.stat.name] || s.stat.name,
        value: s.base_stat,
      })),
      abilities: pokemon.abilities.map((a) => ({
        name: a.ability.name,
        isHidden: a.is_hidden,
      })),
      sprite:
        pokemon.sprites.other["official-artwork"].front_default ||
        pokemon.sprites.front_default,
      sprites: pokemon.sprites,
      baseExperience: pokemon.base_experience,
    };
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails du Pokémon:",
      error
    );
    throw error;
  }
}

// Rechercher un Pokémon par nom ou ID
export async function searchPokemon(query) {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${query.toLowerCase()}`);
    if (!response.ok) throw new Error("Pokémon non trouvé");
    return await getPokemonDetails(
      `${BASE_URL}/pokemon/${query.toLowerCase()}`
    );
  } catch (error) {
    console.error("Erreur lors de la recherche:", error);
    throw error;
  }
}

// Récupérer tous les Pokémon d'un type spécifique
export async function getPokemonByType(type) {
  try {
    const response = await fetch(`${BASE_URL}/type/${type}`);
    const data = await response.json();

    // Limiter à 20 Pokémon pour ne pas surcharger
    const pokemonUrls = data.pokemon.slice(0, 20).map((p) => p.pokemon.url);
    const pokemonDetails = await Promise.all(
      pokemonUrls.map((url) => getPokemonDetails(url))
    );

    return pokemonDetails;
  } catch (error) {
    console.error("Erreur lors de la récupération par type:", error);
    throw error;
  }
}

// Récupérer la chaîne d'évolution d'un Pokémon
export async function getEvolutionChain(pokemonId) {
  try {
    // 1. Récupérer les infos d'espèce pour obtenir l'URL de la chaîne d'évolution
    const speciesResponse = await fetch(
      `${BASE_URL}/pokemon-species/${pokemonId}`
    );
    const speciesData = await speciesResponse.json();

    // 2. Récupérer la chaîne d'évolution
    const evolutionResponse = await fetch(speciesData.evolution_chain.url);
    const evolutionData = await evolutionResponse.json();

    // 3. Parser la chaîne d'évolution récursivement
    const evolutionChain = [];

    function parseEvolutionChain(chain) {
      // Extraire l'ID du Pokémon depuis l'URL
      const urlParts = chain.species.url.split("/");
      const speciesId = parseInt(urlParts[urlParts.length - 2]);

      evolutionChain.push({
        id: speciesId,
        name: chain.species.name,
      });

      // Parcourir les évolutions suivantes
      if (chain.evolves_to && chain.evolves_to.length > 0) {
        chain.evolves_to.forEach((evolution) => parseEvolutionChain(evolution));
      }
    }

    parseEvolutionChain(evolutionData.chain);

    // 4. Récupérer les détails de chaque Pokémon de la chaîne
    const evolutionDetails = await Promise.all(
      evolutionChain.map(async (evo) => {
        try {
          const details = await getPokemonDetails(evo.id);
          return details;
        } catch (error) {
          console.error(`Erreur pour le Pokémon ${evo.id}:`, error);
          return null;
        }
      })
    );

    return evolutionDetails.filter((pokemon) => pokemon !== null);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de la chaîne d'évolution:",
      error
    );
    return [];
  }
}

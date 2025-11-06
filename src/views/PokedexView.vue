<template>
  <div class="pokedex-view">
    <div class="pokedex-header">
      <h1>Pokédex</h1>
      <p class="subtitle">Découvrez tous les Pokémon</p>
    </div>

    <!-- Barre de recherche -->
    <div class="search-section">
      <div class="search-bar">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Rechercher un Pokémon par nom ou numéro..."
          class="search-input"
          @keyup.enter="handleSearch"
        />
        <button class="search-button" @click="handleSearch">
          <span>🔍</span>
        </button>
      </div>
      <p v-if="searchError" class="search-error">{{ searchError }}</p>
    </div>

    <!-- Filtres -->
    <div class="filters-section">
      <div class="filter-group">
        <label>Type:</label>
        <select
          v-model="selectedType"
          class="filter-select"
          @change="handleTypeFilter"
        >
          <option value="">Tous les types</option>
          <option value="normal">Normal</option>
          <option value="fire">Feu</option>
          <option value="water">Eau</option>
          <option value="electric">Électrik</option>
          <option value="grass">Plante</option>
          <option value="ice">Glace</option>
          <option value="fighting">Combat</option>
          <option value="poison">Poison</option>
          <option value="ground">Sol</option>
          <option value="flying">Vol</option>
          <option value="psychic">Psy</option>
          <option value="bug">Insecte</option>
          <option value="rock">Roche</option>
          <option value="ghost">Spectre</option>
          <option value="dragon">Dragon</option>
          <option value="dark">Ténèbres</option>
          <option value="steel">Acier</option>
          <option value="fairy">Fée</option>
        </select>
      </div>

      <div class="filter-group">
        <label>Génération:</label>
        <select
          v-model="selectedGeneration"
          class="filter-select"
          @change="handleGenerationFilter"
        >
          <option value="">Toutes</option>
          <option value="1">Génération 1 (1-151)</option>
          <option value="2">Génération 2 (152-251)</option>
          <option value="3">Génération 3 (252-386)</option>
          <option value="4">Génération 4 (387-493)</option>
          <option value="5">Génération 5 (494-649)</option>
          <option value="6">Génération 6 (650-721)</option>
          <option value="7">Génération 7 (722-809)</option>
          <option value="8">Génération 8 (810-905)</option>
        </select>
      </div>

      <div class="filter-group">
        <label>Trier par:</label>
        <select v-model="sortBy" class="filter-select" @change="sortPokemon">
          <option value="id">Numéro</option>
          <option value="name">Nom (A-Z)</option>
          <option value="height">Taille</option>
          <option value="weight">Poids</option>
        </select>
      </div>

      <button
        v-if="selectedType || selectedGeneration"
        class="reset-button"
        @click="resetFilters"
      >
        Réinitialiser les filtres
      </button>
    </div>

    <!-- Loader -->
    <div v-if="loading" class="loader">
      <div class="pokeball-loader"></div>
      <p>Chargement des Pokémon...</p>
    </div>

    <!-- Grille de Pokémon -->
    <div v-else class="pokemon-grid">
      <div
        v-for="pokemon in displayedPokemon"
        :key="pokemon.id"
        class="pokemon-card"
        @click="openModal(pokemon)"
      >
        <div class="pokemon-number">
          #{{ String(pokemon.id).padStart(3, "0") }}
        </div>
        <div class="pokemon-image">
          <img :src="pokemon.sprite" :alt="pokemon.nameFr" loading="lazy" />
        </div>
        <h3 class="pokemon-name">{{ pokemon.nameFr }}</h3>
        <div class="pokemon-types">
          <span
            v-for="type in pokemon.types"
            :key="type.name"
            :class="['type-badge', `type-${type.name}`]"
          >
            {{ type.nameFr }}
          </span>
        </div>
      </div>
    </div>

    <!-- Modal Pokémon -->
    <Teleport to="body">
      <div v-if="showModal" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <button class="modal-close" @click="closeModal">✕</button>

          <div v-if="selectedPokemon" class="modal-body">
            <!-- En-tête du modal -->
            <div class="modal-header">
              <div class="modal-pokemon-info">
                <h2 class="modal-pokemon-name">{{ selectedPokemon.nameFr }}</h2>
                <span class="modal-pokemon-number"
                  >#{{ String(selectedPokemon.id).padStart(3, "0") }}</span
                >
              </div>
              <div class="modal-pokemon-types">
                <span
                  v-for="type in selectedPokemon.types"
                  :key="type.name"
                  :class="['type-badge-large', `type-${type.name}`]"
                >
                  {{ type.nameFr }}
                </span>
              </div>
            </div>

            <!-- Image principale -->
            <div class="modal-image-section">
              <img
                :src="selectedPokemon.sprite"
                :alt="selectedPokemon.nameFr"
                class="modal-pokemon-image"
              />
            </div>

            <!-- Informations de base -->
            <div class="modal-info-grid">
              <div class="info-card">
                <div class="info-label">Taille</div>
                <div class="info-value">
                  {{ (selectedPokemon.height / 10).toFixed(1) }} m
                </div>
              </div>
              <div class="info-card">
                <div class="info-label">Poids</div>
                <div class="info-value">
                  {{ (selectedPokemon.weight / 10).toFixed(1) }} kg
                </div>
              </div>
              <div class="info-card">
                <div class="info-label">Expérience</div>
                <div class="info-value">
                  {{ selectedPokemon.baseExperience }}
                </div>
              </div>
            </div>

            <!-- Chaîne d'évolution -->
            <div v-if="evolutionChain.length > 0" class="evolution-section">
              <h3 class="section-title">Chaîne d'évolution</h3>
              <div class="evolution-chain">
                <div
                  v-for="(pokemon, index) in evolutionChain"
                  :key="pokemon.id"
                  class="evolution-item-wrapper"
                >
                  <div
                    :class="[
                      'evolution-item',
                      {
                        'evolution-current': pokemon.id === selectedPokemon.id,
                      },
                    ]"
                    @click="openModal(pokemon)"
                  >
                    <div class="evolution-image">
                      <img :src="pokemon.sprite" :alt="pokemon.nameFr" />
                    </div>
                    <div class="evolution-info">
                      <span class="evolution-number"
                        >#{{ String(pokemon.id).padStart(3, "0") }}</span
                      >
                      <span class="evolution-name">{{ pokemon.nameFr }}</span>
                    </div>
                  </div>
                  <div
                    v-if="index < evolutionChain.length - 1"
                    class="evolution-arrow"
                  >
                    →
                  </div>
                </div>
              </div>
            </div>

            <!-- Statistiques détaillées -->
            <div class="modal-stats-section">
              <h3 class="section-title">Statistiques</h3>
              <div class="stats-grid">
                <div
                  v-for="stat in selectedPokemon.stats"
                  :key="stat.name"
                  class="stat-item"
                >
                  <div class="stat-header">
                    <span class="stat-name">{{ stat.nameFr }}</span>
                    <span class="stat-value">{{ stat.value }}</span>
                  </div>
                  <div class="stat-bar-bg">
                    <div
                      class="stat-bar-fill"
                      :style="{
                        width: `${Math.min((stat.value / 255) * 100, 100)}%`,
                      }"
                    ></div>
                  </div>
                </div>
              </div>

              <!-- Total des stats -->
              <div class="stat-total">
                <span class="stat-total-label">Total</span>
                <span class="stat-total-value">
                  {{
                    selectedPokemon.stats.reduce(
                      (sum, stat) => sum + stat.value,
                      0
                    )
                  }}
                </span>
              </div>
            </div>

            <!-- Capacités -->
            <div class="modal-abilities-section">
              <h3 class="section-title">Capacités</h3>
              <div class="abilities-grid">
                <div
                  v-for="ability in selectedPokemon.abilities"
                  :key="ability.name"
                  :class="[
                    'ability-item',
                    { 'ability-hidden': ability.isHidden },
                  ]"
                >
                  <span class="ability-name">{{ ability.name }}</span>
                  <span v-if="ability.isHidden" class="ability-badge"
                    >Cachée</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Message si aucun résultat -->
    <div v-if="!loading && displayedPokemon.length === 0" class="no-results">
      <p>Aucun Pokémon trouvé</p>
    </div>

    <!-- Pagination -->
    <div
      v-if="!loading && displayedPokemon.length > 0 && !selectedType"
      class="pagination"
    >
      <button
        class="pagination-button"
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
      >
        ← Précédent
      </button>
      <div class="pagination-info">
        <span
          v-for="page in visiblePages"
          :key="page"
          :class="['page-number', { active: page === currentPage }]"
          @click="changePage(page)"
        >
          {{ page }}
        </span>
      </div>
      <button
        class="pagination-button"
        :disabled="currentPage >= totalPages"
        @click="changePage(currentPage + 1)"
      >
        Suivant →
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import {
  getPokemonList,
  searchPokemon,
  getPokemonByType,
  getEvolutionChain,
} from "../api/pokemon.js";

// États
const allPokemon = ref([]);
const displayedPokemon = ref([]);
const loading = ref(false);
const searchQuery = ref("");
const searchError = ref("");
const selectedType = ref("");
const selectedGeneration = ref("");
const sortBy = ref("id");
const currentPage = ref(1);
const itemsPerPage = 20;
const totalCount = ref(0);
const showModal = ref(false);
const selectedPokemon = ref(null);
const evolutionChain = ref([]);

// Générations de Pokémon
const generationRanges = {
  1: { start: 1, end: 151 },
  2: { start: 152, end: 251 },
  3: { start: 252, end: 386 },
  4: { start: 387, end: 493 },
  5: { start: 494, end: 649 },
  6: { start: 650, end: 721 },
  7: { start: 722, end: 809 },
  8: { start: 810, end: 905 },
};

// Calculer le nombre total de pages
const totalPages = computed(() => {
  return Math.ceil(totalCount.value / itemsPerPage);
});

// Pages visibles dans la pagination
const visiblePages = computed(() => {
  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages.value, start + maxVisible - 1);

  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});

// Charger les Pokémon
async function loadPokemon() {
  loading.value = true;
  searchError.value = "";

  try {
    const offset = (currentPage.value - 1) * itemsPerPage;
    const data = await getPokemonList(itemsPerPage, offset);
    displayedPokemon.value = data.results;
    totalCount.value = data.count;
  } catch (error) {
    console.error("Erreur:", error);
    searchError.value = "Erreur lors du chargement des Pokémon";
  } finally {
    loading.value = false;
  }
}

// Rechercher un Pokémon
async function handleSearch() {
  if (!searchQuery.value.trim()) {
    loadPokemon();
    return;
  }

  loading.value = true;
  searchError.value = "";

  try {
    const result = await searchPokemon(searchQuery.value.trim());
    displayedPokemon.value = [result];
  } catch (error) {
    searchError.value = "Pokémon non trouvé. Essayez un autre nom ou numéro.";
    displayedPokemon.value = [];
  } finally {
    loading.value = false;
  }
}

// Filtrer par type
async function handleTypeFilter() {
  if (!selectedType.value) {
    currentPage.value = 1;
    loadPokemon();
    return;
  }

  loading.value = true;
  searchError.value = "";

  try {
    const results = await getPokemonByType(selectedType.value);
    displayedPokemon.value = results;
  } catch (error) {
    searchError.value = "Erreur lors du filtrage par type";
    displayedPokemon.value = [];
  } finally {
    loading.value = false;
  }
}

// Filtrer par génération
async function handleGenerationFilter() {
  if (!selectedGeneration.value) {
    currentPage.value = 1;
    loadPokemon();
    return;
  }

  loading.value = true;
  searchError.value = "";

  try {
    const range = generationRanges[selectedGeneration.value];
    const limit = range.end - range.start + 1;
    const offset = range.start - 1;

    const data = await getPokemonList(limit, offset);
    displayedPokemon.value = data.results;
    totalCount.value = limit;
  } catch (error) {
    searchError.value = "Erreur lors du filtrage par génération";
    displayedPokemon.value = [];
  } finally {
    loading.value = false;
  }
}

// Trier les Pokémon
function sortPokemon() {
  const sorted = [...displayedPokemon.value];

  switch (sortBy.value) {
    case "name":
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "height":
      sorted.sort((a, b) => b.height - a.height);
      break;
    case "weight":
      sorted.sort((a, b) => b.weight - a.weight);
      break;
    case "id":
    default:
      sorted.sort((a, b) => a.id - b.id);
      break;
  }

  displayedPokemon.value = sorted;
}

// Réinitialiser les filtres
function resetFilters() {
  selectedType.value = "";
  selectedGeneration.value = "";
  sortBy.value = "id";
  currentPage.value = 1;
  loadPokemon();
}

// Changer de page
function changePage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    loadPokemon();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

// Ouvrir le modal
async function openModal(pokemon) {
  selectedPokemon.value = pokemon;
  showModal.value = true;
  document.body.style.overflow = "hidden";

  // Charger la chaîne d'évolution
  evolutionChain.value = [];
  try {
    const chain = await getEvolutionChain(pokemon.id);
    evolutionChain.value = chain;
  } catch (error) {
    console.error("Erreur lors du chargement de la chaîne d'évolution:", error);
  }
}

// Fermer le modal
function closeModal() {
  showModal.value = false;
  selectedPokemon.value = null;
  evolutionChain.value = [];
  document.body.style.overflow = "auto";
}

// Charger au montage
onMounted(() => {
  loadPokemon();
});
</script>

<style scoped>
.pokedex-view {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.pokedex-header {
  text-align: center;
  margin-bottom: 2rem;
}

.pokedex-header h1 {
  font-size: 3rem;
  color: #ffcb05;
  text-shadow: 3px 3px 0 #2a75bb, -1px -1px 0 #2a75bb, 1px -1px 0 #2a75bb,
    -1px 1px 0 #2a75bb;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.2rem;
  color: #666;
}

/* Barre de recherche */
.search-section {
  margin-bottom: 2rem;
}

.search-bar {
  display: flex;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 50px;
  overflow: hidden;
  border: 2px solid #ffcb05;
}

.search-input {
  flex: 1;
  padding: 1rem 1.5rem;
  border: none;
  font-size: 1rem;
  outline: none;
  border-radius: 50px 0 0 50px;
  background: white;
}

.search-button {
  padding: 1rem 2rem;
  background: #ffcb05;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background 0.3s;
  border-radius: 0 50px 50px 0;
}

.search-button:hover {
  background: #f5c000;
}

.search-error {
  color: #e74c3c;
  text-align: center;
  margin-top: 1rem;
  font-weight: 500;
}

/* Filtres */
.filters-section {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 10px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-group label {
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
}

.filter-select {
  padding: 0.5rem 1rem;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  min-width: 180px;
}

.filter-select:focus {
  outline: none;
  border-color: #ffcb05;
}

.reset-button {
  padding: 0.5rem 1.5rem;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
  align-self: flex-end;
}

.reset-button:hover {
  background: #c0392b;
}

/* Grille de Pokémon */
.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.pokemon-card {
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  text-align: center;
}

.pokemon-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

.pokemon-number {
  font-size: 0.9rem;
  color: #999;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.pokemon-image {
  width: 150px;
  height: 150px;
  margin: 0 auto 1rem;
}

.pokemon-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.pokemon-name {
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 0.8rem;
  text-transform: capitalize;
}

.pokemon-types {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.type-badge {
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  color: white;
  text-transform: capitalize;
}

/* Types de Pokémon */
.type-normal {
  background: #a8a878;
}
.type-fire {
  background: #f08030;
}
.type-water {
  background: #6890f0;
}
.type-electric {
  background: #f8d030;
  color: #333;
}
.type-grass {
  background: #78c850;
}
.type-ice {
  background: #98d8d8;
}
.type-fighting {
  background: #c03028;
}
.type-poison {
  background: #a040a0;
}
.type-ground {
  background: #e0c068;
}
.type-flying {
  background: #a890f0;
}
.type-psychic {
  background: #f85888;
}
.type-bug {
  background: #a8b820;
}
.type-rock {
  background: #b8a038;
}
.type-ghost {
  background: #705898;
}
.type-dragon {
  background: #7038f8;
}
.type-dark {
  background: #705848;
}
.type-steel {
  background: #b8b8d0;
}
.type-fairy {
  background: #ee99ac;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.pagination-button {
  padding: 0.8rem 1.5rem;
  background: #ffcb05;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.pagination-button:hover:not(:disabled) {
  background: #f5c000;
}

.pagination-button:disabled {
  background: #ddd;
  cursor: not-allowed;
}

.pagination-info {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.page-number {
  padding: 0.5rem 0.8rem;
  border: 2px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
}

.page-number:hover {
  border-color: #ffcb05;
  background: #fff9e6;
}

.page-number.active {
  background: #ffcb05;
  border-color: #ffcb05;
  font-weight: 600;
}

.page-dots {
  color: #999;
  font-weight: 600;
}

/* Loader */
.loader {
  text-align: center;
  padding: 4rem 2rem;
}

.pokeball-loader {
  width: 60px;
  height: 60px;
  margin: 0 auto 1rem;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #ffcb05;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loader p {
  font-size: 1.1rem;
  color: #666;
}

/* Message aucun résultat */
.no-results {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.no-results p {
  font-size: 1.3rem;
  color: #999;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  overflow-y: auto;
}

.modal-content {
  background: white;
  border-radius: 20px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.1);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
  z-index: 10;
}

.modal-close:hover {
  background: rgba(0, 0, 0, 0.2);
}

.modal-body {
  padding: 2rem;
}

.modal-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.modal-pokemon-info {
  margin-bottom: 1rem;
}

.modal-pokemon-name {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.modal-pokemon-number {
  font-size: 1.2rem;
  color: #999;
  font-weight: 600;
}

.modal-pokemon-types {
  display: flex;
  gap: 0.8rem;
  justify-content: center;
  flex-wrap: wrap;
}

.type-badge-large {
  padding: 0.5rem 1.2rem;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  text-transform: capitalize;
}

.modal-image-section {
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 15px;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-pokemon-image {
  width: 250px;
  height: 250px;
  object-fit: contain;
  display: block;
  margin: 0 auto;
}

.modal-info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.info-card {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
}

.info-label {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.info-value {
  font-size: 1.3rem;
  color: #333;
  font-weight: 700;
}

/* Section d'évolution */
.evolution-section {
  margin-bottom: 2rem;
}

.evolution-chain {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 15px;
}

.evolution-item-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.evolution-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  border: 3px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 100px;
}

.evolution-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  border-color: #ffcb05;
}

.evolution-item.evolution-current {
  border-color: #ffcb05;
  background: linear-gradient(135deg, #fff9e6 0%, #fffbf0 100%);
  box-shadow: 0 4px 12px rgba(255, 203, 5, 0.3);
  transform: scale(1.05);
}

.evolution-image {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.evolution-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.evolution-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  margin-top: 0.5rem;
}

.evolution-number {
  font-size: 0.75rem;
  color: #999;
  font-weight: 600;
}

.evolution-name {
  font-size: 0.9rem;
  color: #333;
  font-weight: 600;
  text-align: center;
}

.evolution-arrow {
  font-size: 2rem;
  color: #ffcb05;
  font-weight: bold;
  margin: 0 0.5rem;
}

.modal-stats-section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
  font-weight: 700;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid #ffcb05;
}

.stats-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stat-item {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 10px;
}

.stat-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.stat-name {
  font-weight: 600;
  color: #666;
  font-size: 0.95rem;
}

.stat-value {
  font-weight: 700;
  color: #333;
  font-size: 1.1rem;
}

.stat-bar-bg {
  background: #e0e0e0;
  height: 10px;
  border-radius: 10px;
  overflow: hidden;
}

.stat-bar-fill {
  background: linear-gradient(90deg, #ffcb05, #ff9505);
  height: 100%;
  border-radius: 10px;
  transition: width 0.5s ease;
}

.stat-total {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, #ffcb05, #ff9505);
  border-radius: 10px;
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
}

.modal-abilities-section {
  margin-bottom: 1rem;
}

.abilities-grid {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.ability-item {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ability-item.ability-hidden {
  background: linear-gradient(135deg, #e8f4f8, #d4e9f5);
  border: 2px solid #2a75bb;
}

.ability-name {
  font-weight: 600;
  color: #333;
  text-transform: capitalize;
}

.ability-badge {
  background: #2a75bb;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
}

/* Responsive */
@media (max-width: 768px) {
  .pokedex-view {
    padding: 1rem;
  }

  .pokedex-header h1 {
    font-size: 2rem;
  }

  .pokemon-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }

  .filters-section {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-select {
    min-width: auto;
  }

  .modal-content {
    max-height: 95vh;
  }

  .modal-body {
    padding: 1.5rem 1rem;
  }

  .modal-pokemon-name {
    font-size: 2rem;
  }

  .modal-pokemon-image {
    width: 200px;
    height: 200px;
  }

  .modal-info-grid {
    grid-template-columns: 1fr;
  }

  .evolution-chain {
    flex-direction: column;
    gap: 1rem;
  }

  .evolution-item-wrapper {
    flex-direction: column;
    width: 100%;
  }

  .evolution-arrow {
    transform: rotate(90deg);
    margin: 0;
  }

  .evolution-image {
    width: 70px;
    height: 70px;
  }
}
</style>

<template>
  <div class="compare-view">
    <div class="compare-header">
      <h1>Comparer des Pokémon</h1>
      <p class="subtitle">
        Comparez les statistiques de deux Pokémon côte à côte
      </p>
    </div>

    <div class="compare-container">
      <!-- Sélection Pokémon 1 -->
      <div class="pokemon-selector">
        <div class="selector-header">
          <h2>Pokémon 1</h2>
        </div>

        <div class="search-box">
          <input
            type="text"
            placeholder="Rechercher un Pokémon..."
            class="search-input"
          />
          <div class="suggestions-dropdown">
            <!-- Les suggestions apparaîtront ici -->
          </div>
        </div>

        <div class="pokemon-display">
          <div class="pokemon-card-large">
            <div class="pokemon-number">#025</div>
            <div class="pokemon-image-large">
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
                alt="Pikachu"
              />
            </div>
            <h3 class="pokemon-name-large">Pikachu</h3>
            <div class="pokemon-types">
              <span class="type-badge type-electric">Électrik</span>
            </div>

            <div class="pokemon-info">
              <div class="info-row">
                <span class="info-label">Taille:</span>
                <span class="info-value">0.4 m</span>
              </div>
              <div class="info-row">
                <span class="info-label">Poids:</span>
                <span class="info-value">6.0 kg</span>
              </div>
            </div>

            <div class="pokemon-stats">
              <h4>Statistiques</h4>
              <div class="stat-row">
                <span class="stat-name">PV</span>
                <div class="stat-bar-container">
                  <div class="stat-bar" style="width: 35%"></div>
                </div>
                <span class="stat-value">35</span>
              </div>
              <div class="stat-row">
                <span class="stat-name">Attaque</span>
                <div class="stat-bar-container">
                  <div class="stat-bar" style="width: 55%"></div>
                </div>
                <span class="stat-value">55</span>
              </div>
              <div class="stat-row">
                <span class="stat-name">Défense</span>
                <div class="stat-bar-container">
                  <div class="stat-bar" style="width: 40%"></div>
                </div>
                <span class="stat-value">40</span>
              </div>
              <div class="stat-row">
                <span class="stat-name">Att. Spé</span>
                <div class="stat-bar-container">
                  <div class="stat-bar" style="width: 50%"></div>
                </div>
                <span class="stat-value">50</span>
              </div>
              <div class="stat-row">
                <span class="stat-name">Déf. Spé</span>
                <div class="stat-bar-container">
                  <div class="stat-bar" style="width: 50%"></div>
                </div>
                <span class="stat-value">50</span>
              </div>
              <div class="stat-row">
                <span class="stat-name">Vitesse</span>
                <div class="stat-bar-container">
                  <div class="stat-bar" style="width: 90%"></div>
                </div>
                <span class="stat-value">90</span>
              </div>
              <div class="stat-row total">
                <span class="stat-name">Total</span>
                <div class="stat-bar-container"></div>
                <span class="stat-value">320</span>
              </div>
            </div>

            <div class="pokemon-abilities">
              <h4>Capacités</h4>
              <div class="abilities-list">
                <span class="ability-badge">Statik</span>
                <span class="ability-badge">Paratonnerre (caché)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Icône VS -->
      <div class="vs-divider">
        <div class="vs-circle">
          <span>VS</span>
        </div>
      </div>

      <!-- Sélection Pokémon 2 -->
      <div class="pokemon-selector">
        <div class="selector-header">
          <h2>Pokémon 2</h2>
        </div>

        <div class="search-box">
          <input
            type="text"
            placeholder="Rechercher un Pokémon..."
            class="search-input"
          />
          <div class="suggestions-dropdown">
            <!-- Les suggestions apparaîtront ici -->
          </div>
        </div>

        <div class="pokemon-display">
          <div class="pokemon-card-large">
            <div class="pokemon-number">#006</div>
            <div class="pokemon-image-large">
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png"
                alt="Dracaufeu"
              />
            </div>
            <h3 class="pokemon-name-large">Dracaufeu</h3>
            <div class="pokemon-types">
              <span class="type-badge type-fire">Feu</span>
              <span class="type-badge type-flying">Vol</span>
            </div>

            <div class="pokemon-info">
              <div class="info-row">
                <span class="info-label">Taille:</span>
                <span class="info-value">1.7 m</span>
              </div>
              <div class="info-row">
                <span class="info-label">Poids:</span>
                <span class="info-value">90.5 kg</span>
              </div>
            </div>

            <div class="pokemon-stats">
              <h4>Statistiques</h4>
              <div class="stat-row">
                <span class="stat-name">PV</span>
                <div class="stat-bar-container">
                  <div class="stat-bar" style="width: 78%"></div>
                </div>
                <span class="stat-value">78</span>
              </div>
              <div class="stat-row">
                <span class="stat-name">Attaque</span>
                <div class="stat-bar-container">
                  <div class="stat-bar" style="width: 84%"></div>
                </div>
                <span class="stat-value">84</span>
              </div>
              <div class="stat-row">
                <span class="stat-name">Défense</span>
                <div class="stat-bar-container">
                  <div class="stat-bar" style="width: 78%"></div>
                </div>
                <span class="stat-value">78</span>
              </div>
              <div class="stat-row">
                <span class="stat-name">Att. Spé</span>
                <div class="stat-bar-container">
                  <div class="stat-bar" style="width: 109%"></div>
                </div>
                <span class="stat-value">109</span>
              </div>
              <div class="stat-row">
                <span class="stat-name">Déf. Spé</span>
                <div class="stat-bar-container">
                  <div class="stat-bar" style="width: 85%"></div>
                </div>
                <span class="stat-value">85</span>
              </div>
              <div class="stat-row">
                <span class="stat-name">Vitesse</span>
                <div class="stat-bar-container">
                  <div class="stat-bar" style="width: 100%"></div>
                </div>
                <span class="stat-value">100</span>
              </div>
              <div class="stat-row total">
                <span class="stat-name">Total</span>
                <div class="stat-bar-container"></div>
                <span class="stat-value">534</span>
              </div>
            </div>

            <div class="pokemon-abilities">
              <h4>Capacités</h4>
              <div class="abilities-list">
                <span class="ability-badge">Brasier</span>
                <span class="ability-badge">Force Soleil (caché)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tableau comparatif -->
    <div class="comparison-table">
      <h3>Tableau comparatif détaillé</h3>
      <table>
        <thead>
          <tr>
            <th>Caractéristique</th>
            <th>Pikachu</th>
            <th>Dracaufeu</th>
            <th>Gagnant</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>PV</td>
            <td>35</td>
            <td class="winner">78</td>
            <td>🏆 Dracaufeu</td>
          </tr>
          <tr>
            <td>Attaque</td>
            <td>55</td>
            <td class="winner">84</td>
            <td>🏆 Dracaufeu</td>
          </tr>
          <tr>
            <td>Défense</td>
            <td>40</td>
            <td class="winner">78</td>
            <td>🏆 Dracaufeu</td>
          </tr>
          <tr>
            <td>Attaque Spéciale</td>
            <td>50</td>
            <td class="winner">109</td>
            <td>🏆 Dracaufeu</td>
          </tr>
          <tr>
            <td>Défense Spéciale</td>
            <td>50</td>
            <td class="winner">85</td>
            <td>🏆 Dracaufeu</td>
          </tr>
          <tr>
            <td>Vitesse</td>
            <td>90</td>
            <td class="winner">100</td>
            <td>🏆 Dracaufeu</td>
          </tr>
          <tr class="total-row">
            <td><strong>Total</strong></td>
            <td>320</td>
            <td class="winner">534</td>
            <td>🏆 Dracaufeu</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
// Les fonctionnalités techniques seront ajoutées plus tard
</script>

<style scoped>
.compare-view {
  max-width: 1600px;
  margin: 0 auto;
  padding: 2rem;
}

.compare-header {
  text-align: center;
  margin-bottom: 3rem;
}

.compare-header h1 {
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

.compare-container {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
  align-items: start;
}

.pokemon-selector {
  background: #f8f9fa;
  border-radius: 15px;
  padding: 2rem;
}

.selector-header h2 {
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
}

.search-box {
  position: relative;
  margin-bottom: 2rem;
}

.search-input {
  width: 100%;
  padding: 1rem;
  border: 2px solid #ddd;
  border-radius: 10px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #ffcb05;
}

.suggestions-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 2px solid #ddd;
  border-top: none;
  border-radius: 0 0 10px 10px;
  max-height: 300px;
  overflow-y: auto;
  display: none;
}

.pokemon-card-large {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.pokemon-number {
  font-size: 1rem;
  color: #999;
  font-weight: 600;
  margin-bottom: 1rem;
}

.pokemon-image-large {
  width: 200px;
  height: 200px;
  margin: 0 auto 1.5rem;
}

.pokemon-image-large img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.pokemon-name-large {
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
  text-transform: capitalize;
}

.pokemon-types {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.type-badge {
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
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

.pokemon-info {
  margin-bottom: 1.5rem;
  text-align: left;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.info-label {
  font-weight: 600;
  color: #666;
}

.info-value {
  color: #333;
}

.pokemon-stats {
  margin-bottom: 1.5rem;
  text-align: left;
}

.pokemon-stats h4 {
  margin-bottom: 1rem;
  color: #333;
  font-size: 1.1rem;
}

.stat-row {
  display: grid;
  grid-template-columns: 80px 1fr 50px;
  gap: 1rem;
  align-items: center;
  margin-bottom: 0.8rem;
}

.stat-row.total {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid #ddd;
  font-weight: 600;
}

.stat-name {
  font-size: 0.9rem;
  color: #666;
}

.stat-bar-container {
  background: #e0e0e0;
  border-radius: 10px;
  height: 12px;
  overflow: hidden;
}

.stat-bar {
  background: linear-gradient(90deg, #ffcb05, #ff9505);
  height: 100%;
  border-radius: 10px;
  transition: width 0.5s ease;
}

.stat-value {
  text-align: right;
  font-weight: 600;
  color: #333;
}

.pokemon-abilities {
  text-align: left;
}

.pokemon-abilities h4 {
  margin-bottom: 1rem;
  color: #333;
  font-size: 1.1rem;
}

.abilities-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.ability-badge {
  background: #e8f4f8;
  color: #2a75bb;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
}

/* VS Divider */
.vs-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 200px;
}

.vs-circle {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #ffcb05, #ff9505);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 800;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

/* Tableau comparatif */
.comparison-table {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.comparison-table h3 {
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.5rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: #f8f9fa;
}

th {
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #ddd;
}

td {
  padding: 1rem;
  border-bottom: 1px solid #eee;
  color: #666;
}

.winner {
  background: #fff9e6;
  font-weight: 600;
  color: #333;
}

.total-row {
  background: #f8f9fa;
  font-weight: 700;
}

/* Responsive */
@media (max-width: 1200px) {
  .compare-container {
    grid-template-columns: 1fr;
  }

  .vs-divider {
    padding-top: 0;
    padding: 2rem 0;
  }

  .vs-circle {
    transform: rotate(90deg);
  }
}

@media (max-width: 768px) {
  .compare-view {
    padding: 1rem;
  }

  .compare-header h1 {
    font-size: 2rem;
  }

  .pokemon-selector {
    padding: 1rem;
  }

  .pokemon-image-large {
    width: 150px;
    height: 150px;
  }

  table {
    font-size: 0.9rem;
  }

  th,
  td {
    padding: 0.5rem;
  }
}
</style>

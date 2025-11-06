<template>
  <div class="game-view">
    <div class="game-header">
      <h1>Mini-Jeu Pokémon</h1>
      <p class="subtitle">Testez vos réflexes et votre connaissance !</p>
    </div>

    <div class="content-placeholder">
      <div class="icon">🎮</div>
      <h2>Page Mini-Jeu</h2>
      <p>
        Un jeu amusant arrive bientôt pour tester vos compétences de dresseur !
      </p>
    </div>
  </div>
</template>

<script setup>
// Les fonctionnalités techniques seront ajoutées plus tard
</script>

<style scoped>
.game-view {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.game-header {
  text-align: center;
  margin-bottom: 3rem;
}

.game-header h1 {
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

.content-placeholder {
  background: white;
  border-radius: 15px;
  padding: 4rem 2rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.icon {
  font-size: 5rem;
  margin-bottom: 1rem;
}

.content-placeholder h2 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
}

.content-placeholder p {
  font-size: 1.1rem;
  color: #666;
}
</style>

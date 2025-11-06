<template>
  <div id="app">
    <header class="w-full p-4 bg-red-500 text-white">
      <!-- Écran du Pokédex -->
      <div class="max-w-4xl mx-auto mb-4">
        <div
          class="bg-gradient-to-b from-cyan-300 to-cyan-400 border-8 border-gray-800 rounded-lg p-4 shadow-2xl relative"
        >
          <!-- Reflets de l'écran -->
          <div
            class="absolute top-2 left-2 w-20 h-20 bg-white opacity-20 rounded-full blur-xl"
          ></div>
          <h1
            class="text-4xl font-bold text-gray-900 text-center relative z-10 tracking-wide"
          >
            Pokédex
          </h1>
          <!-- Petites lumières indicatrices -->
          <div class="flex justify-center gap-2 mt-3">
            <div class="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            <div
              class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
              style="animation-delay: 0.2s"
            ></div>
            <div
              class="w-2 h-2 bg-green-400 rounded-full animate-pulse"
              style="animation-delay: 0.4s"
            ></div>
          </div>
        </div>
      </div>

      <!-- Boutons du Pokédex -->
      <nav
        class="max-w-5xl mx-auto flex justify-center items-center gap-3 flex-wrap"
      >
        <router-link
          to="/"
          class="px-4 py-2 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 hover:from-gray-600 hover:via-gray-700 hover:to-gray-800 text-white font-bold rounded-lg border-2 border-gray-600 shadow-xl hover:shadow-2xl transform hover:scale-110 hover:-translate-y-0.5 transition-all duration-300 ease-out active:scale-95 relative overflow-hidden group"
        >
          <span class="relative z-10">Pokédex</span>
          <div
            class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700"
          ></div>
        </router-link>
        <router-link
          to="/compare"
          class="px-4 py-2 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 hover:from-gray-600 hover:via-gray-700 hover:to-gray-800 text-white font-bold rounded-lg border-2 border-gray-600 shadow-xl hover:shadow-2xl transform hover:scale-110 hover:-translate-y-0.5 transition-all duration-300 ease-out active:scale-95 relative overflow-hidden group"
        >
          <span class="relative z-10">Comparateur</span>
          <div
            class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700"
          ></div>
        </router-link>
        <router-link
          to="/quiz"
          class="px-4 py-2 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 hover:from-gray-600 hover:via-gray-700 hover:to-gray-800 text-white font-bold rounded-lg border-2 border-gray-600 shadow-xl hover:shadow-2xl transform hover:scale-110 hover:-translate-y-0.5 transition-all duration-300 ease-out active:scale-95 relative overflow-hidden group"
        >
          <span class="relative z-10">Quizz</span>
          <div
            class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700"
          ></div>
        </router-link>
        <router-link
          to="/evolution"
          class="px-4 py-2 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 hover:from-gray-600 hover:via-gray-700 hover:to-gray-800 text-white font-bold rounded-lg border-2 border-gray-600 shadow-xl hover:shadow-2xl transform hover:scale-110 hover:-translate-y-0.5 transition-all duration-300 ease-out active:scale-95 relative overflow-hidden group"
        >
          <span class="relative z-10">Évolutions</span>
          <div
            class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700"
          ></div>
        </router-link>
        <router-link
          to="/game"
          class="px-4 py-2 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 hover:from-gray-600 hover:via-gray-700 hover:to-gray-800 text-white font-bold rounded-lg border-2 border-gray-600 shadow-xl hover:shadow-2xl transform hover:scale-110 hover:-translate-y-0.5 transition-all duration-300 ease-out active:scale-95 relative overflow-hidden group"
        >
          <span class="relative z-10">Mini-Jeu</span>
          <div
            class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700"
          ></div>
        </router-link>
      </nav>
    </header>

    <router-view />
  </div>
</template>

<style>
.router-link-active {
  background: linear-gradient(135deg, #ffcb05, #ff9505) !important;
  border-color: #ffcb05 !important;
}
</style>

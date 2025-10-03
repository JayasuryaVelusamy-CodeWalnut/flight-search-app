<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <header class="bg-gradient-primary py-8 px-4 sm:px-6 lg:px-8 shadow-lg">
      <div class="max-w-7xl mx-auto text-center">
        <h1 class="text-4xl font-bold text-white mb-2">Flight Search</h1>
        <p class="text-lg text-white/90">Find your perfect flight with our easy-to-use search tool</p>
      </div>
    </header>
    
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <FlightSearch />
    </main>
  </div>
</template>

<script setup lang="ts">
import FlightSearch from './views/FlightSearch.vue'
</script>

<script setup>
import Header from './components/Header.vue'
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
    <Header />
    
    <!-- NAVIGATION -->
    <nav class="bg-gradient-to-r from-indigo-600 to-purple-700 shadow-xl">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-center items-center space-x-8 py-5">
          <router-link 
            to="/" 
            class="text-white font-semibold text-lg hover:text-yellow-300 transition duration-200 transform hover:scale-105"
          >
            Inicio
          </router-link>
          <router-link 
            to="/users" 
            class="text-white font-semibold text-lg hover:text-yellow-300 transition duration-200 transform hover:scale-105"
          >
            Usuarios
          </router-link>
          <router-link 
            to="/contact" 
            class="text-white font-semibold text-lg hover:text-yellow-300 transition duration-200 transform hover:scale-105"
          >
            Contacto
          </router-link>
        </div>
      </div>
    </nav>

    <!-- MAIN CONTENT -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <router-view />
    </main>
  </div>
</template>

<style scoped></style>

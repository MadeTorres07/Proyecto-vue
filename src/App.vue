<script setup>
import Header from './components/Header.vue'
</script>

<template>
<div>
    <Header />
    <nav>
      <router-link to="/">Inicio</router-link> |
      <router-link to="/users">Usuarios</router-link> |
      <router-link to="/contact">Contacto</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style scoped></style>

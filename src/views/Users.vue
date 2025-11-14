<template>
  <div class="text-center space-y-10">
    <div>
      <h1 class="text-3xl md:text-4xl font-bold text-gray-800">
        Panel de Usuarios
      </h1>
      <p class="mt-2 text-lg text-gray-600">
        Registra, edita o elimina usuarios fácilmente
      </p>
    </div>

    <div class="flex flex-col lg:flex-row gap-8 items-start justify-center">
      <UserForm :editing-user="editingUser" @user-saved="editingUser = null" />
      <div class="flex-1 w-full lg:max-w-3xl">
        <UserList @edit="editingUser = $event" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import UserForm from '../components/UserForm.vue'
import UserList from '../components/UserList.vue'

const editingUser = ref(null)
</script>

<style scoped>
.users-page { padding: 2rem; max-width: 1000px; margin: 0 auto; }
</style>
<template>
  <div class="users-page">
    <h1>Gestión de Usuarios</h1>
    <UserForm :editing-user="editingUser" @user-saved="editingUser = null" />
    <UserList @edit="editingUser = $event" />
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
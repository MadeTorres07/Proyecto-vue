<template>
  <div>
    <h2>Lista de Usuarios</h2>
    <table v-if="users.length">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Teléfono</th>
          <th>Fecha Registro</th>
          <th>Rol</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.email">
          <td>{{ user.nombre }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.telefono }}</td>
          <td>{{ user.fechaRegistro }}</td>
          <td>{{ user.rol }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>No hay usuarios registrados.</p>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/userStore'

const store = useUserStore()
const { users } = store
</script>

<style>
  table { width: 100%; border-collapse: collapse; }
  th, td { border: 1px solid #ddd; padding: 0.5rem; text-align: left; }
  th { background: #f0f0f0; }
</style>
<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label>Nombre:</label>
      <input v-model="form.nombre" type="text" />
    </div>
    <div>
      <label>Email:</label>
      <input v-model="form.email" type="email" />
    </div>
    <div>
      <label>Teléfono:</label>
      <input v-model="form.telefono" type="tel" />
    </div>
    <div>
      <label>Rol:</label>
      <select v-model="form.rol">
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
    </div>
    <div>
      <label>Contraseña:</label>
      <input v-model="form.contrasena" type="password" />
    </div>
    <ul v-if="errors.length" style="color: red;">
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
    <button type="submit">Registrar</button>
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useUserStore } from '../stores/userStore'

const store = useUserStore()
const form = reactive({
  nombre: '',
  email: '',
  telefono: '',
  rol: 'user',
  contrasena: ''
})
const errors = ref([])

const handleSubmit = () => {
  errors.value = []
  if (!form.nombre) errors.value.push('Nombre requerido')
  else if (!/^[a-zA-Z\s]+$/.test(form.nombre)) errors.value.push('Nombre sin números')
  if (!form.email) errors.value.push('Email requerido')
  else if (!/\S+@\S+\.\S+/.test(form.email)) errors.value.push('Email inválido')
  if (!form.telefono) errors.value.push('Teléfono requerido')
  else if (!/^\d+$/.test(form.telefono)) errors.value.push('Teléfono solo números')
  if (!form.contrasena) errors.value.push('Contraseña requerida')
  else if (form.contrasena.length < 6) errors.value.push('Contraseña min 6 caracteres')
  if (!form.rol) errors.value.push('Rol requerido')

  if (errors.value.length) return

  store.addUser({
    ...form,
    fechaRegistro: new Date().toLocaleString()
  })

  // Limpiar form
  form.nombre = ''
  form.email = ''
  form.telefono = ''
  form.rol = 'user'
  form.contrasena = ''
}
</script>

<style>
  form { max-width: 400px; margin: 0 auto; }
  div { margin-bottom: 1rem; }
  label { display: block; }
  input, select { width: 100%; padding: 0.5rem; }
  button { padding: 0.5rem; background: #007bff; color: white; border: none; }
</style>
<script setup>
import { reactive, ref, watch } from 'vue'
import { useUserStore } from '../stores/userStore'

const store = useUserStore()
const { addUser, updateUser, users } = store

// PROPS
const props = defineProps({
  editingUser: {
    type: Object,
    default: null
  }
})

// EMITS
const emit = defineEmits(['user-saved'])

const form = reactive({
  nombre: '',
  email: '',
  telefono: '',
  rol: 'user',
  contrasena: ''
})

const errors = ref([])
const isEditing = ref(false)

// MUEVE resetForm AQUÍ (ANTES DEL WATCH)
const resetForm = () => {
  form.nombre = ''
  form.email = ''
  form.telefono = ''
  form.rol = 'user'
  form.contrasena = ''
}

// AHORA SÍ: watch puede usar resetForm
watch(
  () => props.editingUser,
  (user) => {
    if (user) {
      form.nombre = user.nombre || ''
      form.email = user.email || ''
      form.telefono = user.telefono || ''
      form.rol = user.rol || 'user'
      form.contrasena = ''
      isEditing.value = true
    } else {
      resetForm()
      isEditing.value = false
    }
  },
  { immediate: true }
)

const handleSubmit = () => {
  errors.value = validate()

  if (errors.value.length) return

  const userData = {
    ...form,
    fechaRegistro: isEditing.value
      ? props.editingUser.fechaRegistro
      : new Date().toLocaleString()
  }

  if (isEditing.value) {
    updateUser(props.editingUser.email, userData)
  } else {
    addUser(userData)
  }

  emit('user-saved')
  resetForm()
  isEditing.value = false
}

const validate = () => {
  const errs = []

  // Básicos
  if (!form.nombre) errs.push('Nombre requerido')
  else if (!/^[a-zA-Z\s]+$/.test(form.nombre)) errs.push('Nombre sin números')

  if (!form.email) errs.push('Email requerido')
  else if (!/\S+@\S+\.\S+/.test(form.email)) errs.push('Email inválido')

  if (!form.telefono) {
  errs.push('Teléfono requerido')
} else if (!/^\d+$/.test(form.telefono)) {
  errs.push('Teléfono solo números')
} else if (form.telefono.length !== 10) {  
  errs.push('El teléfono debe tener exactamente 10 dígitos')
}

  if (!isEditing.value && !form.contrasena) errs.push('Contraseña requerida')
  else if (!isEditing.value && form.contrasena.length < 6) errs.push('Contraseña min 6 caracteres')

  // UNICIDAD
  const currentEmail = props.editingUser?.email
  const currentPhone = props.editingUser?.telefono

  if (users.some(u => u.email === form.email && u.email !== currentEmail)) {
    errs.push('Este email ya está registrado')
  }

  if (users.some(u => u.telefono === form.telefono && u.telefono !== currentPhone)) {
    errs.push('Este teléfono ya está registrado')
  }

  return errs
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="user-form">
    <h3>{{ isEditing ? 'Editar Usuario' : 'Registrar Usuario' }}</h3>

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

    <div v-if="!isEditing">
      <label>Contraseña:</label>
      <input v-model="form.contrasena" type="password" />
    </div>

    <ul v-if="errors.length" class="errors">
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>

    <div class="actions">
      <button type="submit">{{ isEditing ? 'Actualizar' : 'Registrar' }}</button>
      <button v-if="isEditing" type="button" @click="emit('user-saved'); resetForm(); isEditing = false">
        Cancelar
      </button>
    </div>
  </form>
</template>

<style scoped>
.user-form {
  max-width: 400px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

label { display: block; margin-bottom: 0.3rem; font-weight: 600; }
input, select { width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; margin-bottom: 1rem; }

.errors { color: red; list-style: none; padding: 0; margin-bottom: 1rem; }
.actions button { margin-right: 0.5rem; padding: 0.6rem 1rem; border: none; border-radius: 4px; }
.actions button:first-child { background: #007bff; color: white; }
.actions button:last-child { background: #6c757d; color: white; }
</style>
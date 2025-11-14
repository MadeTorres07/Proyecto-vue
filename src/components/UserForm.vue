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
  <form @submit.prevent="handleSubmit" class="bg-white p-6 md:p-8 rounded-2xl shadow-2xl border border-gray-100 w-full max-w-md">
    <h3 class="text-2xl font-bold text-center mb-6 text-indigo-700">
      {{ isEditing ? 'Editar Usuario' : 'Nuevo Usuario' }}
    </h3>

    <div class="space-y-5">
      <div>
        <label class="block text-sm font-bold text-gray-700 mb-1">Nombre</label>
        <input v-model="form.nombre" type="text" class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition" placeholder="Juan Pérez" />
      </div>

      <div>
        <label class="block text-sm font-bold text-gray-700 mb-1">Email</label>
        <input v-model="form.email" type="email" class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition" placeholder="juan@ejemplo.com" />
      </div>

      <div>
        <label class="block text-sm font-bold text-gray-700 mb-1">Teléfono (10 dígitos)</label>
        <input v-model="form.telefono" type="tel" maxlength="10" class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition" placeholder="3001234567" />
      </div>

      <div>
        <label class="block text-sm font-bold text-gray-700 mb-1">Rol</label>
        <select v-model="form.rol" class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition">
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </select>
      </div>

      <div v-if="!isEditing">
        <label class="block text-sm font-bold text-gray-700 mb-1">Contraseña</label>
        <input v-model="form.contrasena" type="password" class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition" />
      </div>
    </div>

    <!-- ERRORES -->
    <div v-if="errors.length" class="mt-5 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
      <ul class="text-sm text-red-700 font-medium space-y-1">
        <li v-for="error in errors" :key="error">• {{ error }}</li>
      </ul>
    </div>

    <!-- BOTONES -->
    <div class="mt-8 flex flex-col sm:flex-row gap-3">
      <button type="submit" class="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition shadow-lg">
        {{ isEditing ? 'Actualizar' : 'Registrar' }}
      </button>
      <button v-if="isEditing" @click="emit('user-saved'); resetForm(); isEditing = false" type="button" class="px-6 py-3.5 bg-gray-500 text-white rounded-xl font-bold hover:bg-gray-600 transition shadow-lg">
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
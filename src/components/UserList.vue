<template>
  <div class="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
    <div class="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-5 border-b-2 border-indigo-100">
      <h2 class="text-2xl font-bold text-indigo-800">Lista de Usuarios</h2>
    </div>

    <div v-if="users.length" class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gradient-to-r from-indigo-100 to-purple-100">
          <tr>
            <th class="px-6 py-4 text-left text-xs font-extrabold text-indigo-700 uppercase tracking-wider">Nombre</th>
            <th class="px-6 py-4 text-left text-xs font-extrabold text-indigo-700 uppercase tracking-wider">Email</th>
            <th class="px-6 py-4 text-left text-xs font-extrabold text-indigo-700 uppercase tracking-wider">Teléfono</th>
            <th class="px-6 py-4 text-left text-xs font-extrabold text-indigo-700 uppercase tracking-wider">Registro</th>
            <th class="px-6 py-4 text-left text-xs font-extrabold text-indigo-700 uppercase tracking-wider">Rol</th>
            <th class="px-6 py-4 text-left text-xs font-extrabold text-indigo-700 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="user in users" :key="user.email" class="hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{{ user.nombre }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ user.email }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ user.telefono }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.fechaRegistro }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="user.rol === 'admin' 
                ? 'px-3 py-1 text-xs font-bold text-green-800 bg-green-100 rounded-full' 
                : 'px-3 py-1 text-xs font-bold text-purple-800 bg-purple-100 rounded-full'"
              >
                {{ user.rol }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm space-x-3">
              <button @click="editUser(user)" class="text-amber-600 hover:text-amber-800 font-bold transform hover:scale-110 transition">Editar</button>
              <button @click="confirmDelete(user)" class="text-red-600 hover:text-red-800 font-bold transform hover:scale-110 transition">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="text-center py-16">
      <p class="text-xl text-gray-500 font-medium">No hay usuarios registrados</p>
      <p class="text-sm text-gray-400 mt-2">Registra el primero arriba</p>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/userStore'

const store = useUserStore()
const { users, deleteUser } = store

const emit = defineEmits(['edit'])

const editUser = (user) => {
  emit('edit', { ...user })
}

const confirmDelete = (user) => {
  const confirmMsg = `¿Estás seguro de eliminar a:\n\n${user.nombre} (${user.email})?\n\nEsta acción no se puede deshacer.`
  
  if (window.confirm(confirmMsg)) {
    deleteUser(user.email)
    // Opcional: mostrar toast o notificación (aquí solo confirmación)
  }
}
</script>

<style scoped>
.users-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.users-table th,
.users-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.users-table th {
  background: #f8f9fa;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85rem;
  color: #495057;
}

.users-table tr:hover {
  background: #f5f5f5;
}

.actions button {
  padding: 0.4rem 0.7rem;
  margin-right: 0.5rem;
  border: none;
  border-radius: 4px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-edit {
  background: #ffc107;
  color: #212529;
}

.btn-edit:hover {
  background: #e0a800;
}

.btn-delete {
  background: #dc3545;
  color: white;
}

.btn-delete:hover {
  background: #c82333;
}

.badge-admin {
  background: #d4edda;
  color: #155724;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
}

.badge-user {
  background: #d1ecf1;
  color: #0c5460;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
}

.no-users {
  color: #6c757d;
  font-style: italic;
  text-align: center;
  margin-top: 2rem;
}
</style>
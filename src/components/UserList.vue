<template>
  <div>
    <h2>Lista de Usuarios</h2>

    <table v-if="users.length" class="users-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Teléfono</th>
          <th>Fecha Registro</th>
          <th>Rol</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.email">
          <td>{{ user.nombre }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.telefono }}</td>
          <td>{{ user.fechaRegistro }}</td>
          <td>
            <span :class="user.rol === 'admin' ? 'badge-admin' : 'badge-user'">
              {{ user.rol }}
            </span>
          </td>
          <td class="actions">
            <button @click="editUser(user)" class="btn-edit" title="Editar">
              Editar
            </button>
            <button @click="confirmDelete(user)" class="btn-delete" title="Eliminar">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else class="no-users">No hay usuarios registrados.</p>
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
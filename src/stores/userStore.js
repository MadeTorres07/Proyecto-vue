import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const users = ref([])

  // Cargar desde localStorage al iniciar el store
  const stored = localStorage.getItem('users')
  if (stored) {
    users.value = JSON.parse(stored)
  }

  const addUser = (user) => {
    users.value.push(user)
    localStorage.setItem('users', JSON.stringify(users.value))
  }

  const updateUser = (email, updatedUser) => {
    const index = users.value.findIndex(u => u.email === email)
    if (index !== -1) {
      users.value[index] = { ...users.value[index], ...updatedUser }
      saveToStorage()
    }
  }

  const deleteUser = (email) => {
    users.value = users.value.filter(u => u.email !== email)
    saveToStorage()
  }

  const saveToStorage = () => {
    localStorage.setItem('users', JSON.stringify(users.value))
  }
  return { users, addUser, updateUser, deleteUser }
})
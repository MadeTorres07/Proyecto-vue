import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'

export const useUserStore = defineStore('user', () => {
  const users = ref([])

  onMounted(() => {
    const stored = localStorage.getItem('users')
    if (stored) users.value = JSON.parse(stored)
  })

  const addUser = (user) => {
    users.value.push(user)
    localStorage.setItem('users', JSON.stringify(users.value))
  }

  return { users, addUser }
})
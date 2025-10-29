import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Users from '../views/Users.vue'
import Contact from '../views/Contact.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/users', component: Users },
  { path: '/contact', component: Contact }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
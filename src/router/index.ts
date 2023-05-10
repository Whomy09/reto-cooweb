import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import MedicinesVue from '../views/Medicines.vue'
import Login from '../views/Auth/Login.vue'
import Register from '../views/Auth/Register.vue'
import firebase from 'firebase'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/medicamentos',
      name: 'medicines',
      component: MedicinesVue,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  if (requiresAuth && !firebase.auth().currentUser) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router

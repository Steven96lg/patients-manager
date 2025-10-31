import { createRouter, createWebHistory } from 'vue-router'
import PatientList from '../views/PatientList.vue'
import AddPatient from '../views/AddPatient.vue'
import PatientDetail from '../views/PatientDetail.vue'
import Login from '../views/Login.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'PatientList',
    component: PatientList,
    meta: { requiresAuth: true }
  },
  {
    path: '/add-patient',
    name: 'AddPatient',
    component: AddPatient,
    meta: { requiresAuth: true }
  },
  {
    path: '/patient/:id',
    name: 'PatientDetail',
    component: PatientDetail,
    props: true,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Helper function to check if user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem('auth_token')
}

// Navigation guard
router.beforeEach((to, from, next) => {
  // Check if route requires authentication
  if (to.meta.requiresAuth && !isAuthenticated()) {
    // Redirect to login if not authenticated
    next('/login')
  } else if (to.path === '/login' && isAuthenticated()) {
    // Redirect to home if already authenticated and trying to access login
    next('/')
  } else {
    // Allow navigation
    next()
  }
})

export default router
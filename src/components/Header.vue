<template>
  <header class="header">
    <div class="header-content">
      <div class="header-left">
        <h1 class="app-title">{{ authStore.user?.username || '' }}</h1>
      </div>
      
      <div class="header-right">
        <!-- Botón de inicio de sesión cuando no está autenticado -->
        <router-link 
          v-if="!isAuthenticated" 
          to="/login" 
          class="login-button"
        >
          Iniciar Sesión
        </router-link>

        <!-- Menú de usuario cuando está autenticado -->
        <div v-else class="user-menu" ref="userMenuRef">
          <button class="user-button" @click="toggleMenu">
            <svg class="user-icon" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            <span class="user-name">
              {{ authStore.user?.name || '' }} {{ authStore.user?.last_name || '' }}
            </span>
          </button>
          
          <div v-if="isMenuOpen" class="dropdown-menu">
            <a href="#" class="dropdown-item" @click="updateInfo">
              <svg class="dropdown-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
              </svg>
              Actualizar información
            </a>
            <a href="#" class="dropdown-item" @click="logout">
              <svg class="dropdown-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
              </svg>
              Cerrar sesión
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '../store/authStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const isMenuOpen = ref(false)
const userMenuRef = ref(null)

const isAuthenticated = computed(() => authStore.isAuthenticated)
const userName = computed(() => authStore.user?.name || 'Usuario')

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const updateInfo = () => {
  isMenuOpen.value = false
  alert('Función de actualizar información')
}

const logout = () => {
  isMenuOpen.value = false
  // Limpiar estado del store
  authStore.logout()
  // Manejar la navegación desde el componente para evitar import circular
  router.push('/login')
}

const closeMenuOnClickOutside = (event) => {
  if (userMenuRef.value && !userMenuRef.value.contains(event.target)) {
    isMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeMenuOnClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', closeMenuOnClickOutside)
})
</script>

<style scoped>
.header {
  background: white;
  border-bottom: 1px solid #e9ecef;
  padding: 0 20px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 0;
}

.app-title {
  font-size: 24px;
  font-weight: 700;
  color: #000;
  margin: 0;
}

.user-menu {
  position: relative;
}

.user-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.user-button:hover {
  background-color: #f8f9fa;
}

.user-icon {
  width: 24px;
  height: 24px;
  color: #6c757d;
}

.user-name {
  font-weight: 500;
  color: #495057;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  z-index: 1000;
  margin-top: 4px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  text-decoration: none;
  color: #495057;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.dropdown-item:hover {
  background-color: #f8f9fa;
}

.dropdown-item:first-child {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.dropdown-item:last-child {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.dropdown-icon {
  width: 16px;
  height: 16px;
  color: #6c757d;
}

.login-button {
  display: inline-block;
  padding: 8px 16px;
  background-color: #667eea;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.login-button:hover {
  background-color: #764ba2;
  transform: translateY(-1px);
}
</style>
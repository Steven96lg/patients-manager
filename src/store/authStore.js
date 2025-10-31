import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => {
    const token = localStorage.getItem('auth_token')
    const userStr = localStorage.getItem('user')
    return {
      token: token || null,
      user: userStr ? JSON.parse(userStr) : null
    }
  },
  
  getters: {
    isAuthenticated: (state) => !!state.token
  },
  
  actions: {
    async fetchUserInfo() {
      try {
        console.log('Obteniendo información del usuario...')
        const token = localStorage.getItem('auth_token') || this.token
        if (!token) throw new Error('No hay token de autenticación')
        const res = await fetch('http://localhost:8000/api/user_info', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        if (!res.ok) {
          const error = await res.json()
          throw new Error(error.detail || 'No se pudo obtener la información del usuario')
        }
        const user = await res.json()
        this.user = user
        localStorage.setItem('user', JSON.stringify(user))
        return user
      } catch (error) {
        console.error('Error obteniendo usuario:', error)
        throw error
      }
    },
    async login(username, token) {
      try {
        // Primero guardamos el token
        this.token = token
        localStorage.setItem('auth_token', token)
        
        // Inmediatamente después obtenemos la info del usuario
        await this.fetchUserInfo()
        return true
      } catch (error) {
        console.error('Error en login:', error)
        throw error
      }
    },
    
    logout() {
      // Limpiar estado y almacenamiento local. La navegación la debe manejar el componente
      this.token = null
      this.user = null
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
    }
  }
})



import { defineStore } from 'pinia'

export const usePatientStore = defineStore('patient', {
  state: () => ({
    // Inicialmente vacío; se poblará desde el endpoint /api/patients
    patients: []
  }),
  
  getters: {
    getPatientById: (state) => (id) => {
      return state.patients.find(patient => patient.id === parseInt(id))
    }
  },
  
  actions: {
    async createPatient(patient) {
      try {
        const headers = { 'Content-Type': 'application/json' }
        const token = localStorage.getItem('auth_token') || this.token
        if (token) headers['Authorization'] = `Bearer ${token}`

        const res = await fetch('http://localhost:8000/api/create_patient', {
          method: 'POST',
          headers,
          body: JSON.stringify(patient)
        })
        if (!res.ok) {
          const error = await res.json()
          throw new Error(error.detail || 'No se pudo crear el paciente')
        }
        const newPatient = await res.json()
        // Opcional: agregar el paciente al array local
        this.patients.push({
          id: newPatient.id,
          name: newPatient.name,
          lastName: newPatient.last_name || '',
          phone: newPatient.phone || '',
          age: newPatient.age || null
        })
        return newPatient
      } catch (error) {
        console.error('Error creando paciente:', error)
        throw error
      }
    },
    async fetchPatients() {
      try {
        const headers = { 'Content-Type': 'application/json' }
        const token = localStorage.getItem('auth_token') || this.token
        if (token) headers['Authorization'] = `Bearer ${token}`

        const res = await fetch('http://localhost:8000/api/patients', { headers })
        if (!res.ok) {
          console.error('Error fetching patients:', res.status)
          return
        }
        const data = await res.json()
        const list = Array.isArray(data) ? data : (data.data || [])
        this.patients = list.map(p => ({
          id: p.id,
          name: p.name,
          lastName: p.last_name || p.lastName || '',
          phone: p.phone || '',
          age: p.age || null,
          createdAt: p.created_at
        }))
      } catch (error) {
        console.error('Error loading patients:', error)
      }
    },
    addPatient(patient) {
      const newId = Math.max(...this.patients.map(p => p.id)) + 1
      this.patients.push({ ...patient, id: newId })
    },
    
    updatePatient(id, updatedPatient) {
      const index = this.patients.findIndex(p => p.id === id)
      if (index !== -1) {
        this.patients[index] = { ...this.patients[index], ...updatedPatient }
      }
    },
    
    deletePatient(id) {
      this.patients = this.patients.filter(p => p.id !== id)
    }
  }
})
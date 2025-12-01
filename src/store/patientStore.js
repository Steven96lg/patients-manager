import { defineStore } from 'pinia'

export const usePatientStore = defineStore('patient', {
  state: () => ({
    patients: [],
    totalPatients: 0,
    currentPage: 1
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
    async fetchPatients(limit = 10, searchTerm = '', page = 1) {
      try {
        const headers = { 'Content-Type': 'application/json' }
        const token = localStorage.getItem('auth_token') || this.token
        if (token) headers['Authorization'] = `Bearer ${token}`

        let url = 'http://localhost:8000/api/patients'
        const params = new URLSearchParams()
        if (limit) params.append('limit', limit)
        if (searchTerm) params.append('search', searchTerm)
        params.append('page', page)
        if (params.toString()) url += `?${params.toString()}`

        const res = await fetch(url, { headers })
        if (!res.ok) {
          console.error('Error fetching patients:', res.status)
          return
        }
        const data = await res.json()
        
        // Maneja tanto respuesta con estructura {data, total} como array directo
        let list = Array.isArray(data) ? data : (data.data || [])
        this.totalPatients = data.total || list.length
        this.currentPage = page
        
        this.patients = list.map(p => ({
          id: p.id,
          name: p.name,
          lastName: p.last_name || p.lastName || '',
          phone: p.phone || '',
          age: p.age || null,
          createdAt: p.consultations[0]?.date || null,
          height: p.consultations[0].height || null,
          weight: p.consultations[0].weight || null,
          treatment: p.consultations[0].treatment || null,
          notes: p.consultations[0].notes || null
        }))
      } catch (error) {
        console.error('Error loading patients:', error)
      }
    },
    addPatient(patient) {
      const newId = Math.max(...this.patients.map(p => p.id)) + 1
      this.patients.push({ ...patient, id: newId })
    },
    
    async updatePatient(id, consultation) {
      try {
        const headers = { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }

        const res = await fetch(`http://localhost:8000/api/patients/${id}`, {
          method: 'PATCH',
          headers,
          body: JSON.stringify(consultation)
        })

        if (!res.ok) {
          const error = await res.json()
          throw new Error(error.detail || 'No se pudo actualizar el paciente')
        }

        const updatedPatient = await res.json()
        const index = this.patients.findIndex(p => p.id === id)
        
        if (index !== -1) {
          this.patients[index] = {
            ...this.patients[index],
            height: consultation.height,
            weight: consultation.weight,
            treatment: consultation.treatment,
            notes: consultation.notes,
            createdAt: consultation.date
          }
        }

        return updatedPatient
      } catch (error) {
        console.error('Error actualizando paciente:', error)
        throw error
      }
    },
    
    async deletePatient(id) {
      try {
        const headers = { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }

        const res = await fetch(`http://localhost:8000/api/patients/${id}`, {
          method: 'DELETE',
          headers
        })

        if (!res.ok) {
          const error = await res.json()
          throw new Error(error.detail || 'No se pudo eliminar el paciente')
        }

        // Eliminar del estado local
        this.patients = this.patients.filter(p => p.id !== id)
        this.totalPatients -= 1

        return true
      } catch (error) {
        console.error('Error eliminando paciente:', error)
        throw error
      }
    }
  }
})
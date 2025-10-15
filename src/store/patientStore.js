import { defineStore } from 'pinia'

export const usePatientStore = defineStore('patient', {
  state: () => ({
    patients: [
      {
        id: 1,
        name: 'Juan',
        lastName: 'Pérez García',
        phone: '+52 555 123 4567',
        age: 35,
        birthDate: '15 de Mayo, 1989',
        height: '1.75 m',
        weight: '75 kg',
        treatment: 'Medicamento para presión arterial - Losartán 50mg, una vez al día por la mañana. Control mensual de presión arterial.',
        notes: ''
      },
      {
        id: 2,
        name: 'María',
        lastName: 'González López',
        phone: '+52 555 987 6543',
        age: 28,
        birthDate: '22 de Marzo, 1996',
        height: '1.65 m',
        weight: '60 kg',
        treatment: 'Consulta de rutina para control de peso y nutrición.',
        notes: 'Paciente muy comprometida con su salud.'
      }
    ]
  }),
  
  getters: {
    getPatientById: (state) => (id) => {
      return state.patients.find(patient => patient.id === parseInt(id))
    }
  },
  
  actions: {
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
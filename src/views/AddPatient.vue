<template>
  <div class="add-patient">
    <a href="#" class="back-link" @click.prevent="goBack">
      <svg class="back-icon" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
      </svg>
      Volver
    </a>

    <div class="form-header">
      <h1 class="form-title">Registrar Nuevo Paciente</h1>
      <p class="form-subtitle">Completa la información del paciente</p>
    </div>

    <form @submit.prevent="submitForm" class="patient-form">
      <!-- Información Personal -->
      <div class="form-section">
        <h3 class="section-title">
          <svg class="icon" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          Información Personal
        </h3>
        
        <div class="form-row">
          <div class="form-group">
            <label for="name">Nombre *</label>
            <input 
              type="text" 
              id="name" 
              v-model="form.name" 
              placeholder="Ej: Juan"
              required
            >
          </div>
          
          <div class="form-group">
            <label for="lastName">Apellido *</label>
            <input 
              type="text" 
              id="lastName" 
              v-model="form.lastName" 
              placeholder="Ej: Pérez García"
              required
            >
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="phone">Número de Teléfono *</label>
            <input 
              type="tel" 
              id="phone" 
              v-model="form.phone" 
              placeholder="Ej: +52 555 123 4567"
              required
            >
          </div>
          
          <div class="form-group">
            <label for="birthDate">Fecha de Nacimiento *</label>
            <input 
              type="date" 
              id="birthDate" 
              v-model="form.birthDate" 
              required
            >
          </div>
        </div>

        <div class="form-group">
          <label for="age">Edad *</label>
          <input 
            type="number" 
            id="age" 
            v-model="form.age" 
            placeholder="Ej: 35"
            min="0"
            max="150"
            required
          >
        </div>
      </div>

      <!-- Información Física -->
      <div class="form-section">
        <h3 class="section-title">
          <svg class="icon" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          Información Física
        </h3>
        
        <div class="form-row">
          <div class="form-group">
            <label for="height">Altura *</label>
            <input 
              type="text" 
              id="height" 
              v-model="form.height" 
              placeholder="Ej: 1.75 m"
              required
            >
          </div>
          
          <div class="form-group">
            <label for="weight">Peso *</label>
            <input 
              type="text" 
              id="weight" 
              v-model="form.weight" 
              placeholder="Ej: 75 kg"
              required
            >
          </div>
        </div>
      </div>

      <!-- Información Médica -->
      <div class="form-section">
        <h3 class="section-title">
          <svg class="icon" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3V8zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 14H9c-.55 0-1-.45-1-1V5c0-.55.45-1 1-1h10c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1z"/>
          </svg>
          Información Médica
        </h3>
        
        <div class="form-group">
          <label for="treatment">Tratamiento *</label>
          <textarea 
            id="treatment" 
            v-model="form.treatment" 
            placeholder="Describe el tratamiento que se le dio al paciente"
            rows="4"
            required
          ></textarea>
        </div>
      </div>

      <!-- Notas Adicionales -->
      <div class="form-section">
        <h3 class="section-title">
          <svg class="icon" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
          </svg>
          Notas Adicionales
        </h3>
        
        <div class="form-group">
          <textarea 
            id="notes" 
            v-model="form.notes" 
            placeholder="Información adicional relevante sobre el paciente"
            rows="3"
          ></textarea>
        </div>
      </div>

      <div class="form-actions">
        <button type="button" class="btn-secondary" @click="goBack">Cancelar</button>
        <button type="submit" class="btn-primary">Registrar Paciente</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePatientStore } from '../store/patientStore'

const router = useRouter()
const patientStore = usePatientStore()

const form = ref({
  name: '',
  lastName: '',
  phone: '',
  birthDate: '',
  age: '',
  height: '',
  weight: '',
  treatment: '',
  notes: ''
})

const goBack = () => {
  router.push('/')
}

const submitForm = () => {
  // Calculate age from birth date if not provided
  let age = form.value.age
  if (form.value.birthDate && !age) {
    const today = new Date()
    const birthDate = new Date(form.value.birthDate)
    age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
  }

  const patient = {
    name: form.value.name,
    lastName: form.value.lastName,
    phone: form.value.phone,
    birthDate: form.value.birthDate,
    age: parseInt(age),
    height: form.value.height,
    weight: form.value.weight,
    treatment: form.value.treatment,
    notes: form.value.notes
  }

  patientStore.addPatient(patient)
  router.push('/')
}
</script>

<style scoped>
.add-patient {
  max-width: 800px;
  margin: 0 auto;
}

.form-header {
  margin-bottom: 32px;
}

.form-title {
  font-size: 28px;
  font-weight: 700;
  color: #000;
  margin: 0 0 8px 0;
}

.form-subtitle {
  font-size: 16px;
  color: #6c757d;
  margin: 0;
}

.patient-form {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.form-section {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 24px;
}

.form-actions {
  display: flex;
  gap: 16px;
  justify-content: flex-end;
  padding-top: 24px;
}

.back-icon {
  width: 16px;
  height: 16px;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .form-actions {
    flex-direction: column-reverse;
  }
  
  .form-actions button {
    width: 100%;
  }
}
</style>
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
      </div>

      <!-- Información Física -->
      <div class="form-section">
        <h3 class="section-title">
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
        <button type="submit" class="save-patient"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="18" viewBox="0 0 24 24"><path fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16.25 21v-4.765a1.59 1.59 0 0 0-1.594-1.588H9.344a1.59 1.59 0 0 0-1.594 1.588V21m8.5-17.715v2.362a1.59 1.59 0 0 1-1.594 1.588H9.344A1.59 1.59 0 0 1 7.75 5.647V3m8.5.285A3.2 3.2 0 0 0 14.93 3H7.75m8.5.285c.344.156.661.374.934.645l2.382 2.375A3.17 3.17 0 0 1 20.5 8.55v9.272A3.18 3.18 0 0 1 17.313 21H6.688A3.18 3.18 0 0 1 3.5 17.823V6.176A3.18 3.18 0 0 1 6.688 3H7.75"/></svg> Registrar Paciente</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePatientStore } from '../store/patientStore'
import { useAuthStore } from '../store/authStore'

const router = useRouter()
const patientStore = usePatientStore()
const authStore = useAuthStore()

const form = ref({
  name: '',
  lastName: '',
  phone: '',
  birthDate: '',
  height: '',
  weight: '',
  treatment: '',
  notes: ''
})

const errorMessage = ref('')
const isLoading = ref(false)

const goBack = () => {
  router.push('/')
}

const submitForm = async () => {
  errorMessage.value = ''
  isLoading.value = true
  try {
    // Calcular edad si no está proporcionada
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

    // Obtener el user_id del usuario autenticado
    const user_id = authStore.user?.id || authStore.user?.user_id || 1 // fallback a 1 si no existe

    const patient = {
      name: form.value.name,
      last_name: form.value.lastName,
      phone: form.value.phone,
      age: parseInt(age),
      user_id,
      height: form.value.height,
      weight: form.value.weight,
      treatment: form.value.treatment,
      notes: form.value.notes
    }

    await patientStore.createPatient(patient)
    router.push('/')
  } catch (error) {
    errorMessage.value = error.message || 'Error al crear paciente'
  } finally {
    isLoading.value = false
  }
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
  color: #000;
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
  margin-bottom: 40px
}

.form-actions .save-patient {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #000;
  color: white;
  padding: 7px 20px 9px;
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
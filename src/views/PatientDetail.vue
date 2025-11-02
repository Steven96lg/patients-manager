<template>
  <div class="patient-detail" v-if="patient">
    <a href="#" class="back-link" @click.prevent="goBack">
      <svg class="back-icon" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
      </svg>
      Volver
    </a>

    <div class="patient-header">
      <h1 class="patient-name">{{ patient.name }} {{ patient.lastName }}</h1>
      <p class="patient-subtitle">Información completa del paciente</p>
    </div>

    <div class="info-cards">
      <!-- Información Personal -->
      <div class="info-card">
        <div class="card-header">
          <svg class="card-icon" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          <h3 class="card-title">Información Personal</h3>
        </div>
        <div class="card-content">
          <div class="info-grid">
            <div class="info-item">
              <label class="info-label">Nombre Completo</label>
              <p class="info-value">{{ patient.name }} {{ patient.lastName }}</p>
            </div>
            <div class="info-item">
              <label class="info-label">Teléfono</label>
              <p class="info-value phone-value">
                <svg class="info-icon whatsapp-icon" fill="#25D366" viewBox="0 0 24 24">
                  <path d="M8.886 7.17c.183.005.386.015.579.443c.128.285.343.81.519 1.238c.137.333.249.607.277.663c.064.128.104.275.02.448l-.028.058a1.4 1.4 0 0 1-.23.37l-.143.17c-.085.104-.17.206-.242.278c-.129.128-.262.266-.114.522s.668 1.098 1.435 1.777a6.6 6.6 0 0 0 1.903 1.2q.105.045.17.076c.257.128.41.108.558-.064c.149-.173.643-.749.817-1.005c.168-.256.34-.216.578-.128c.238.089 1.504.71 1.761.837l.143.07c.179.085.3.144.352.23c.064.109.064.62-.148 1.222c-.218.6-1.267 1.176-1.742 1.22l-.135.016c-.436.052-.988.12-2.956-.655c-2.426-.954-4.027-3.32-4.35-3.799l-.053-.076l-.006-.008c-.147-.197-1.048-1.402-1.048-2.646c0-1.19.587-1.81.854-2.092l.047-.05a.95.95 0 0 1 .687-.32c.173 0 .347 0 .495.005"/>
                  <path fill="#25D366" fill-rule="evenodd" d="M2.184 21.331a.4.4 0 0 0 .487.494l4.607-1.204a10 10 0 0 0 4.76 1.207h.004c5.486 0 9.958-4.446 9.958-9.912a9.83 9.83 0 0 0-2.914-7.011A9.92 9.92 0 0 0 12.042 2c-5.486 0-9.958 4.446-9.958 9.911c0 1.739.458 3.447 1.33 4.954zm2.677-4.068a1.5 1.5 0 0 0-.148-1.15a8.4 8.4 0 0 1-1.129-4.202c0-4.63 3.793-8.411 8.458-8.411c2.27 0 4.388.877 5.986 2.468a8.33 8.33 0 0 1 2.472 5.948c0 4.63-3.793 8.412-8.458 8.412h-.005a8.5 8.5 0 0 1-4.044-1.026a1.5 1.5 0 0 0-1.094-.132l-2.762.721z" clip-rule="evenodd"/>
                </svg>
                <a :href="`https://wa.me/52${patient.phone}`" target="_blank" class="phone-link">
                  {{ formatPhone(patient.phone) }}
                </a>
              </p>
            </div>
            <div class="info-item">
              <label class="info-label">Edad</label>
              <p class="info-value">{{ patient.age }} años</p>
            </div>
            <div class="info-item">
              <label class="info-label">Última Consulta</label>
              <p class="info-value">
                <svg class="info-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                </svg>
                {{ formatDate(patient.createdAt) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Información Física -->
      <div class="info-card">
        <div class="card-header">
          <svg class="card-icon" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <h3 class="card-title">Información Física</h3>
        </div>
        <div class="card-content">
          <div class="info-grid">
            <div class="info-item">
              <label class="info-label">Altura (cm) *</label>
              <input 
                type="text" 
                v-model="consultation.height"
                class="info-input"
                :placeholder="patient.height ? `Último registro: ${patient.height} cm` : 'Ingrese la altura en cm'"
                required
              >
            </div>
            <div class="info-item">
              <label class="info-label">Peso (kg) *</label>
              <input 
                type="text" 
                v-model="consultation.weight"
                class="info-input"
                step="0.1"
                :placeholder="patient.weight ? `Último registro: ${patient.weight} kg` : 'Ingrese el peso en kg'"
                required
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Tratamiento -->
      <div class="info-card">
        <div class="card-header">
          <svg class="card-icon" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3V8zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 14H9c-.55 0-1-.45-1-1V5c0-.55.45-1 1-1h10c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1z"/>
          </svg>
          <h3 class="card-title">Tratamiento</h3>
        </div>
        <div class="card-content">
          <textarea 
            v-model="consultation.treatment"
            class="info-textarea"
            rows="4"
            :placeholder="patient.treatment"
            required
          ></textarea>
        </div>
      </div>

      <!-- Notas Adicionales -->
      <div class="info-card">
        <div class="card-header">
          <svg class="card-icon" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
          </svg>
          <h3 class="card-title">Notas Adicionales</h3>
        </div>
        <div class="card-content">
          <textarea 
            v-model="consultation.notes"
            class="info-textarea"
            rows="3"
            :placeholder="patient.notes ?? patient.notes"
          ></textarea>
        </div>
      </div>

      <!-- Botón de guardar consulta -->
      <div class="consultation-actions">
        <button 
          @click="saveConsultation" 
          class="btn-primary save-consultation"
          :disabled="isSaving"
        >
          <svg class="btn-icon" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
          </svg>
          {{ isSaving ? 'Guardando...' : 'Registrar Nueva Consulta' }}
        </button>
      </div>
    </div>
  </div>
  
  <div v-else class="error-message">
    <p>Paciente no encontrado</p>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePatientStore } from '../store/patientStore'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const router = useRouter()
const patientStore = usePatientStore()

const patient = computed(() => {
  return patientStore.getPatientById(props.id)
})

const consultation = ref({
  date: new Date().toISOString().split('T')[0],
  height: '',
  weight: '',
  treatment: '',
  notes: ''
})

const isSaving = ref(false)

const saveConsultation = async () => {
  try {
    isSaving.value = true
    await patientStore.updatePatient(props.id, consultation.value)
    // Limpiar el formulario después de guardar
    consultation.value = {
      date: new Date().toISOString().split('T')[0],
      height: '',
      weight: '',
      treatment: '',
      notes: ''
    }
  } catch (error) {
    console.error('Error al guardar la consulta:', error)
    // Aquí podrías mostrar un mensaje de error al usuario
  } finally {
    isSaving.value = false
  }
}

const formatPhone = (phone) => {
  if (!phone) return '';
  // Remove any non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  // Format as XXX-XXX-XXXX
  return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
};

const formatDate = (date) => {
  if (!date) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('es-ES', options);
};

const goBack = () => {
  router.push('/')
}
</script>

<style scoped>
.patient-detail {
  max-width: 1000px;
  margin: 0 auto;
}

.patient-header {
  margin-bottom: 32px;
}

.patient-name {
  font-size: 32px;
  font-weight: 700;
  color: #000;
  margin: 0 0 8px 0;
}

.patient-subtitle {
  font-size: 16px;
  color: #6c757d;
  margin: 0;
}

.info-cards {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.info-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  background: #f8f9fa;
  padding: 20px 24px;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  align-items: center;
  gap: 12px;
}

.card-icon {
  width: 20px;
  height: 20px;
  color: #6c757d;
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  color: #495057;
  margin: 0;
}

.card-content {
  padding: 24px;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-label {
  font-weight: 600;
  color: #6c757d;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  font-size: 16px;
  color: #495057;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.info-icon {
  width: 16px;
  height: 16px;
  color: #6c757d;
}

.treatment-text,
.notes-text {
  font-size: 16px;
  color: #495057;
  line-height: 1.6;
  margin: 0;
}

.notes-text {
  font-style: italic;
  color: #6c757d;
}

.phone-value {
  display: flex;
  align-items: center;
  gap: 8px;
}

.phone-link {
  color: #0d6efd;
  text-decoration: none;
  font-family: monospace;
  letter-spacing: 1px;
}

.phone-link:hover {
  text-decoration: underline;
}

.whatsapp-icon {
  transition: transform 0.2s;
}

.whatsapp-icon:hover {
  transform: scale(1.1);
}

.error-message {
  text-align: center;
  padding: 48px 24px;
  color: #dc3545;
  font-size: 18px;
}

.back-icon {
  width: 16px;
  height: 16px;
}

.info-input {
  width: 100%;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  color: #1f2937;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.info-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.date-input {
  cursor: pointer;
}

.info-textarea {
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  font-size: 1rem;
  color: #1f2937;
  resize: vertical;
  min-height: 100px;
  border: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  font-family: Arial, Helvetica, sans-serif;
}

.info-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.consultation-actions {
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
}

.save-consultation {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #047857;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.save-consultation:hover:not(:disabled) {
  background-color: #065f46;
}

.save-consultation:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

.btn-icon {
  width: 20px;
  height: 20px;
}

@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .patient-name {
    font-size: 24px;
  }
  
  .card-header {
    padding: 16px 20px;
  }
  
  .card-content {
    padding: 20px;
  }
}
</style>
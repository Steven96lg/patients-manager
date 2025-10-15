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
              <p class="info-value">
                <svg class="info-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                {{ patient.phone }}
              </p>
            </div>
            <div class="info-item">
              <label class="info-label">Edad</label>
              <p class="info-value">{{ patient.age }} años</p>
            </div>
            <div class="info-item">
              <label class="info-label">Fecha de Nacimiento</label>
              <p class="info-value">
                <svg class="info-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                </svg>
                {{ patient.birthDate }}
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
              <label class="info-label">Altura</label>
              <p class="info-value">
                <svg class="info-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 14l5-5 5 5z"/>
                </svg>
                {{ patient.height }}
              </p>
            </div>
            <div class="info-item">
              <label class="info-label">Peso</label>
              <p class="info-value">
                <svg class="info-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z"/>
                </svg>
                {{ patient.weight }}
              </p>
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
          <p class="treatment-text">{{ patient.treatment }}</p>
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
          <p class="notes-text">{{ patient.notes || 'No hay notas adicionales registradas.' }}</p>
        </div>
      </div>
    </div>
  </div>
  
  <div v-else class="error-message">
    <p>Paciente no encontrado</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
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
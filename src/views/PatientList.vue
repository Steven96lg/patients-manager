<template>
  <div class="patient-list">
    <div class="page-header">
      <div class="header-text">
        <h1 class="page-title">Gestión de Pacientes</h1>
        <p class="page-subtitle">Administra y consulta la información de tus pacientes</p>
      </div>
      <button class="btn-primary add-patient-btn" @click="goToAddPatient">
        <svg class="btn-icon" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
        Agregar Paciente
      </button>
    </div>

    <div class="patient-search">
      <div class="search-wrapper">
        <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" @click="applyFilter" role="button">
          <g fill="none" fill-rule="evenodd">
            <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/>
            <path fill="currentColor" d="M10.5 4a6.5 6.5 0 1 0 0 13a6.5 6.5 0 0 0 0-13M2 10.5a8.5 8.5 0 1 1 15.176 5.262l3.652 3.652a1 1 0 0 1-1.414 1.414l-3.652-3.652A8.5 8.5 0 0 1 2 10.5M9.5 7a1 1 0 0 1 1-1a4.5 4.5 0 0 1 4.5 4.5a1 1 0 1 1-2 0A2.5 2.5 0 0 0 10.5 8a1 1 0 0 1-1-1"/>
          </g>
        </svg>
        <input
          class="search-input"
          type="text"
          v-model="searchTerm"
          placeholder="Buscar por nombre, apellidos o teléfono"
          aria-label="Buscar pacientes"
        />
        <button v-if="searchTerm" class="clear-search" @click="clearSearch" aria-label="Limpiar búsqueda">×</button>
      </div>
      
      <div class="patients-filter">
        <div class="filter-container">
          <label for="recordsSelect" class="filter-label">Total de pacientes por página:</label>
          <select id="recordsSelect" v-model="patientsLimit" class="filter-select" aria-label="Registros por página" @change="applyFilter">
            <option :value="10">10 registros</option>
            <option :value="20">20 registros</option>
            <option :value="30">30 registros</option>
            <option :value="40">40 registros</option>
            <option :value="50">50 registros</option>
          </select>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="table-container">
        <table class="patient-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Teléfono</th>
              <th>Edad</th>
              <th>Fecha de Visita</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="patient in filteredPatients" :key="patient.id">
              <td class="patient-name">{{ patient.name }}</td>
              <td class="patient-name">{{ patient.lastName }}</td>
              <td>
                <button class="whats-app-button" @click="openWhatsApp(patient.phone)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                    <path fill="#059669" d="M8.886 7.17c.183.005.386.015.579.443c.128.285.343.81.519 1.238c.137.333.249.607.277.663c.064.128.104.275.02.448l-.028.058a1.4 1.4 0 0 1-.23.37l-.143.17c-.085.104-.17.206-.242.278c-.129.128-.262.266-.114.522s.668 1.098 1.435 1.777a6.6 6.6 0 0 0 1.903 1.2q.105.045.17.076c.257.128.41.108.558-.064c.149-.173.643-.749.817-1.005c.168-.256.34-.216.578-.128c.238.089 1.504.71 1.761.837l.143.07c.179.085.3.144.352.23c.064.109.064.62-.148 1.222c-.218.6-1.267 1.176-1.742 1.22l-.135.016c-.436.052-.988.12-2.956-.655c-2.426-.954-4.027-3.32-4.35-3.799l-.053-.076l-.006-.008c-.147-.197-1.048-1.402-1.048-2.646c0-1.19.587-1.81.854-2.092l.047-.05a.95.95 0 0 1 .687-.32c.173 0 .347 0 .495.005"/>
                    <path fill="#059669" fill-rule="evenodd" d="M2.184 21.331a.4.4 0 0 0 .487.494l4.607-1.204a10 10 0 0 0 4.76 1.207h.004c5.486 0 9.958-4.446 9.958-9.912a9.83 9.83 0 0 0-2.914-7.011A9.92 9.92 0 0 0 12.042 2c-5.486 0-9.958 4.446-9.958 9.911c0 1.739.458 3.447 1.33 4.954zm2.677-4.068a1.5 1.5 0 0 0-.148-1.15a8.4 8.4 0 0 1-1.129-4.202c0-4.63 3.793-8.411 8.458-8.411c2.27 0 4.388.877 5.986 2.468a8.33 8.33 0 0 1 2.472 5.948c0 4.63-3.793 8.412-8.458 8.412h-.005a8.5 8.5 0 0 1-4.044-1.026a1.5 1.5 0 0 0-1.094-.132l-2.762.721z" clip-rule="evenodd"/>
                  </svg>
                </button>
              </td>
              <td>{{ patient.age }} años</td>
              <td>{{ formatDate(patient.createdAt) }}</td>
              <td>
                <div class="actions-group">
                  <button class="btn-secondary view-btn" @click="viewPatient(patient.id)">
                    <svg class="btn-icon" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    </svg>
                    Ver más
                  </button>
                  <button class="btn-danger delete-btn" @click="deletePatientHandler(patient.id)">
                    <svg class="btn-icon" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-9l-1 1H5v2h14V4z"/>
                    </svg>
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="patientStore.totalPatients > patientsLimit.value" class="pagination">
        <button 
          class="btn-pagination" 
          @click="goToPreviousPage" 
          :disabled="!hasPreviousPage"
          aria-label="Página anterior"
        >
          ← Anterior
        </button>
        <span class="pagination-info">Página {{ patientStore.currentPage }} de {{ totalPages }}</span>
        <button 
          class="btn-pagination" 
          @click="goToNextPage" 
          :disabled="!hasNextPage"
          aria-label="Página siguiente"
        >
          Siguiente →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePatientStore } from '../store/patientStore'

const router = useRouter()
const patientStore = usePatientStore()

const patients = computed(() => {
  return [...patientStore.patients].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
})

// Búsqueda
const searchTerm = ref('')
const patientsLimit = ref(10)
const currentPage = ref(1)

const filteredPatients = computed(() => {
  // Ordena por createdAt (fecha de consulta/registro) descendente
  const sorted = [...patientStore.patients].sort((a, b) => {
    const dateA = new Date(a.createdAt) || new Date(0)
    const dateB = new Date(b.createdAt) || new Date(0)
    return dateB - dateA
  })
  return sorted.slice(0, patientsLimit.value)
})

const totalPages = computed(() => {
  return Math.ceil(patientStore.totalPatients / patientsLimit.value)
})

const hasNextPage = computed(() => {
  return patientStore.currentPage < totalPages.value
})

const hasPreviousPage = computed(() => {
  return patientStore.currentPage > 1
})

const goToAddPatient = () => {
  router.push('/add-patient')
}

const viewPatient = (id) => {
  router.push(`/patient/${id}`)
}

const formatDate = (date) => {
  if (!date) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('es-ES', options);
};

const formatPhone = (phone) => {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
};

const openWhatsApp = (phone) => {
  if (!phone) return;
  const cleaned = phone.replace(/\D/g, '');
  const phoneNumber = cleaned.startsWith('52') ? cleaned : `52${cleaned}`;
  window.open(`https://wa.me/${phoneNumber}`, '_blank');
};

const clearSearch = async () => {
  searchTerm.value = ''
  await patientStore.fetchPatients(patientsLimit.value, '', currentPage.value)
}

const goToNextPage = async () => {
  if (hasNextPage.value) {
    currentPage.value += 1
    await patientStore.fetchPatients(patientsLimit.value, searchTerm.value, currentPage.value)
  }
}

const goToPreviousPage = async () => {
  if (hasPreviousPage.value) {
    currentPage.value -= 1
    await patientStore.fetchPatients(patientsLimit.value, searchTerm.value, currentPage.value)
  }
}

const deletePatientHandler = async (patientId) => {
  if (confirm('¿Estás seguro de que deseas eliminar este paciente? Esta acción no se puede deshacer.')) {
    try {
      await patientStore.deletePatient(patientId)
      // Recarga los datos después de eliminar
      await patientStore.fetchPatients(patientsLimit.value, searchTerm.value, currentPage.value)
    } catch (error) {
      alert('Error al eliminar el paciente: ' + error.message)
    }
  }
}

const applyFilter = async () => {
  currentPage.value = 1
  await patientStore.fetchPatients(patientsLimit.value, searchTerm.value, currentPage.value)
}

onMounted(async () => {
  await patientStore.fetchPatients(patientsLimit.value, searchTerm.value, currentPage.value)
})
</script>

<style scoped>
.patient-list {
  max-width: 100%;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}

.header-text {
  flex: 1;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  color: #000;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 16px;
  color: #6c757d;
  margin: 0;
}

.add-patient-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 20px 9px;
  font-size: 16px;
}

.btn-icon {
  width: 20px;
  height: 20px;
}

.patient-search{
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: flex-end;
}

.search-wrapper{
  position: relative;
  flex: 1;
  min-width: 280px;
  max-width: 520px;
}

.patients-filter{
  display: flex;
  gap: 8px;
  align-items: flex-end;
}

.filter-container{
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.filter-label{
  font-size: 13px;
  font-weight: 500;
  color: #6b7280;
  white-space: nowrap;
}

.search-icon{
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: #6b7280;
  transition: color 0.2s;
  cursor: pointer;
}

.search-icon:hover{
  color: #10b981;
}

.search-input{
  width: 100%;
  padding: 10px 40px 10px 44px;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0,0,0,0.02);
}

.search-input:focus{
  outline: none;
  border-color: #10b981;
  box-shadow: 0 0 0 4px rgba(16,185,129,0.08);
}

.filter-select{
  padding: 10px 12px;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0,0,0,0.02);
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.filter-select:focus{
  outline: none;
  border-color: #10b981;
  box-shadow: 0 0 0 4px rgba(16,185,129,0.08);
}

.clear-search{
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  color: #6b7280;
  padding: 4px;
  border-radius: 4px;
}

.clear-search:hover{
  background: #f3f4f6;
}

.table-container {
  overflow-x: auto;
}

.patient-table {
  width: 100%;
  border-collapse: collapse;
}

.patient-table th {
  text-align: left;
  padding: 16px 12px;
  font-weight: 600;
  color: #495057;
  border-bottom: 2px solid #e9ecef;
  background-color: #f8f9fa;
}

.patient-table td {
  padding: 16px 12px;
  border-bottom: 1px solid #e9ecef;
  color: #495057;
  max-width: 180px;
}

.patient-table td.actions-buttons {
  display: flex;
  gap: 8px;
}

.patient-table td.patient-name {
  font-weight: 600;
  color: #2d3748;
}

.patient-table td .whats-app-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  margin-right: 8px;
  transition: background-color 0.2s;
  vertical-align: middle;
}

.patient-table td .whats-app-button:hover {
  background-color: #ecfdf5;
}

.patient-table tr:hover {
  background-color: #f8f9fa;
}

.actions-group {
  display: flex;
  gap: 8px;
  align-items: center;
}

.view-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  font-size: 14px;
}

.delete-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  font-size: 14px;
  color: #fff;
  background-color: #ef4444;
  border: 1px solid #ef4444;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.delete-btn:hover {
  background-color: #dc2626;
  border-color: #dc2626;
}

.delete-btn:active {
  background-color: #b91c1c;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-top: 1px solid #e9ecef;
  background-color: #f8f9fa;
}

.pagination-info {
  font-size: 14px;
  color: #6c757d;
  font-weight: 500;
  min-width: 150px;
  text-align: center;
}

.btn-pagination {
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #10b981;
  background-color: #fff;
  border: 1px solid #10b981;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-pagination:hover:not(:disabled) {
  background-color: #10b981;
  color: #fff;
}

.btn-pagination:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  color: #d1d5db;
  border-color: #d1d5db;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
  
  .page-title {
    font-size: 24px;
  }
  
  .add-patient-btn {
    align-self: flex-start;
  }
  
  .patient-search{
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-wrapper{
    max-width: 100%;
  }
  
  .patients-filter{
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-container{
    width: 100%;
  }
  
  .filter-select{
    width: 100%;
  }
}
</style>
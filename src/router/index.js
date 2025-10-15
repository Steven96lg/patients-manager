import { createRouter, createWebHistory } from 'vue-router'
import PatientList from '../views/PatientList.vue'
import AddPatient from '../views/AddPatient.vue'
import PatientDetail from '../views/PatientDetail.vue'

const routes = [
  {
    path: '/',
    name: 'PatientList',
    component: PatientList
  },
  {
    path: '/add-patient',
    name: 'AddPatient',
    component: AddPatient
  },
  {
    path: '/patient/:id',
    name: 'PatientDetail',
    component: PatientDetail,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
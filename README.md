# Gestión de Pacientes - Vue 3

Sistema de gestión de pacientes desarrollado con Vue 3, Vue Router y Pinia.

## Características

- **Lista de Pacientes**: Visualización de pacientes en tabla con información básica
- **Agregar Paciente**: Formulario completo para registrar nuevos pacientes
- **Detalles del Paciente**: Vista detallada con toda la información del paciente
- **Menú de Usuario**: Dropdown con opciones de actualizar información y cerrar sesión
- **Diseño Responsivo**: Adaptable a diferentes tamaños de pantalla

## Tecnologías Utilizadas

- Vue 3 (Composition API)
- Vue Router 4
- Pinia (State Management)
- Vite (Build Tool)
- CSS3 (Estilos personalizados)

## Estructura del Proyecto

```
src/
├── components/
│   └── Header.vue          # Componente de cabecera con menú de usuario
├── views/
│   ├── PatientList.vue     # Lista principal de pacientes
│   ├── AddPatient.vue      # Formulario para agregar paciente
│   └── PatientDetail.vue   # Vista detallada del paciente
├── store/
│   └── patientStore.js     # Store de Pinia para gestión de datos
├── router/
│   └── index.js           # Configuración de rutas
├── App.vue                # Componente principal
└── main.js               # Punto de entrada de la aplicación
```

## Instalación y Uso

### Prerequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Instalación
```bash
npm install
```

### Desarrollo
```bash
npm run dev
```

### Build para Producción
```bash
npm run build
```

## Rutas de la Aplicación

- `/` - Lista de pacientes
- `/add-patient` - Agregar nuevo paciente
- `/patient/:id` - Detalles del paciente específico

## Funcionalidades

### Gestión de Pacientes
- Ver lista de pacientes con información básica
- Agregar nuevos pacientes con formulario completo
- Ver detalles completos de cada paciente
- Navegación intuitiva entre páginas

### Información del Paciente
- Datos personales (nombre, apellido, teléfono, edad, fecha de nacimiento)
- Información física (altura, peso)
- Tratamiento médico
- Notas adicionales

### Menú de Usuario
- Dropdown con opciones de usuario
- Actualizar información personal
- Cerrar sesión

## Datos de Ejemplo

La aplicación incluye datos de ejemplo de dos pacientes para demostrar la funcionalidad.

## Recomendaciones de IDE

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Configuración de Navegador Recomendada

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)
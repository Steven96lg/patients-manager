# Changelog

## [1.0.1] - 2025-11-08

feat(2025-11-08): primer release.
### Added
Se terminaron las siguientes funcionalidades
 - agregar usuarios
 - ver y actualizar información del usuario
 - eliminar usuario
 - listar usuarios en la tabla

- Se cubre la necesidad del usuario final

- la intención de esta liberación parcial es que el usuario final empiece a interactuar con el sistema, que lo vaya pribando para que vaya sugiriendo mejoras y encontrando algunos errores

### Next steps
- Agregar la funcionalidad para actualizar la información del usuario.
- Agregar funcionalidad para actualizar la información del paciente (esta diferente a agregar una nueva consulta).
- Agregar generación de PDF

## [1.0.1] - 2025-11-02

feat(02-11-2025): Se agrego el guardado de la nueva consulta

## [1.0.1] - 2025-10-31

fix(31-10-25): Corrección en la visualización de fechas de creación de pacientes

## [1.0.0] - 2025-10-14

feat(14-10-25): Primer prototipo del sistema de gestor de pacientes
### Added
- Implementación inicial del sistema de gestión de pacientes
- Vista de lista de pacientes con tabla responsive
- Botón de acceso rápido a WhatsApp para contacto con pacientes
- Sistema de navegación entre vistas (lista, detalle y agregar paciente)
- Integración con Pinia para manejo del estado de la aplicación
- Diseño responsive con soporte para dispositivos móviles
- Interfaz moderna con iconografía SVG integrada

### Added in 1.0.1
- Corregido el problema con la visualización de fechas de creación de pacientes
- Eliminado el fallback a fecha actual cuando no hay fecha de creación
- Mejorado el manejo de zonas horarias en la visualización de fechas
- Actualizado el formato de fechas para mostrar correctamente la fecha original del servidor

### Proximos pasos
- componetizar los elementos para mejor escalabilidad
- modificar el endpoint para que solo se actualice la tabla de consultations
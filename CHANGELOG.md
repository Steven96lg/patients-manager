# Changelog

## [1.0.1] - 2025-11-17

feat(03-12-2025): Primer version para despliegue.
- Se agrego el modal para mostrar cuando una consulta se guardo exitosamente o no pudo ser procesada.
- Se agrego el select para alternar entre las consultas que ha tenido el paciente a lo largo del tiempo.

feat(01-12-2025): Se agrego buscador y selector de registro para mostrar el total de clientes

feat(17-11-2025): Se genero un buscador de pacientes

feat(02-11-2025): Se agrego el guardado de la nueva consulta

fix(31-10-25): Corrección en la visualización de fechas de creación de pacientes

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

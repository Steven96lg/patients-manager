# Changelog

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
- se quito el campo edad del registro de pacientes, la edad se va a calcular en funcion de la fecha de nacimiento y la fecha actual
- revisar que al momento de iniciar sesión el menu se muestre
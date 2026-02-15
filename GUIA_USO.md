# Guía de Uso - Sistema de Gestión de Escuelas de Conducción

## 🎯 Inicio Rápido

1. **Instalar dependencias**
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```

3. **Abrir en el navegador**
   - URL: http://localhost:5173

## 🔑 Credenciales de Acceso

### Usuarios de Prueba
| Rol | Email | Contraseña | Descripción |
|-----|-------|------------|-------------|
| Super Admin | superadmin@gestion.com | admin123 | Gestiona todas las escuelas |
| Admin | admin@madrid.com | admin123 | Gestiona Autoescuela Madrid Centro |
| Instructor | instructor@madrid.com | instructor123 | Registra horas de trabajo |
| Secretaria | secretaria@madrid.com | secretaria123 | Gestiona pagos |
| Alumno | alumno@madrid.com | alumno123 | Registra pagos y hace exámenes |
| Supervisor | supervisor@madrid.com | supervisor123 | Aprueba horas de instructores |

## 📚 Flujo de Trabajo Completo

### 1️⃣ Como Super Administrador
1. Iniciar sesión con `superadmin@gestion.com`
2. Ver dashboard con estadísticas de todas las escuelas
3. Crear nueva escuela:
   - Nombre: ej. "Autoescuela Barcelona"
   - CIF, dirección, teléfono, email
   - Estado activo/inactivo
4. Editar o eliminar escuelas existentes
5. Ver total de usuarios por escuela

### 2️⃣ Como Administrador de Escuela
1. Iniciar sesión con `admin@madrid.com`
2. Ver dashboard de la escuela asignada
3. Gestionar usuarios:
   - **Crear instructor**: Asignar email, contraseña, datos personales
   - **Crear secretaria**: Para gestionar pagos
   - **Crear alumnos**: Los estudiantes de la escuela
   - **Crear supervisor**: Para aprobar horas de instructores
4. Ver estadísticas por rol (total instructores, alumnos, etc.)
5. Buscar y filtrar usuarios
6. Editar o desactivar usuarios

### 3️⃣ Como Instructor
1. Iniciar sesión con `instructor@madrid.com`
2. Ver dashboard con resumen de horas:
   - Horas del mes actual
   - Horas aprobadas
   - Horas pendientes de aprobación
   - Clases programadas para hoy
3. Registrar horas de trabajo:
   - Seleccionar fecha
   - Hora de inicio y fin
   - Descripción de actividades
4. Ver historial completo de registros
5. Estados: Pendiente (amarillo) o Aprobado (verde)

### 4️⃣ Como Supervisor
1. Iniciar sesión con `supervisor@madrid.com`
2. Ver registros de horas pendientes de aprobación
3. Revisar detalles:
   - Instructor que registró
   - Fecha y horario
   - Total de horas
   - Descripción
4. Aprobar registros con un clic
5. Ver historial de registros aprobados
6. Estadísticas generales

### 5️⃣ Como Secretaria
1. Iniciar sesión con `secretaria@madrid.com`
2. Ver pagos pendientes de aprobación
3. Revisar información:
   - Alumno que registró el pago
   - Concepto (matrícula, clase práctica, etc.)
   - Monto
   - Método de pago
4. Aprobar o rechazar pagos
5. Ver historial completo de pagos
6. Total recaudado

### 6️⃣ Como Alumno
1. Iniciar sesión con `alumno@madrid.com`
2. Ver dashboard con:
   - Total pagado
   - Pagos pendientes
   - Clases completadas
   - Exámenes realizados

#### Gestión de Pagos
1. Ir a la pestaña "Mis Pagos"
2. Registrar nuevo pago:
   - Concepto (matrícula, clase, etc.)
   - Monto en euros
   - Método (efectivo, tarjeta, transferencia)
3. Ver estado: Pendiente (amarillo), Pagado (verde), Cancelado (rojo)
4. Los pagos quedan pendientes hasta que secretaria los apruebe

#### Simulacro de Examen
1. Ir a la pestaña "Simulacro de Examen"
2. Clic en "Iniciar Simulacro"
3. Características del examen:
   - 20 preguntas de múltiple opción
   - 4 opciones por pregunta
   - Temporizador de 30 minutos
   - Navegación libre entre preguntas
4. Durante el examen:
   - Ver progreso (X/20 preguntas)
   - Temporizador en tiempo real
   - Indicadores de preguntas respondidas (verde) y sin responder (gris)
   - Clic en números para saltar entre preguntas
5. Finalizar examen:
   - Automáticamente al acabar el tiempo
   - Manualmente con botón "Finalizar"
6. Resultados:
   - Puntuación porcentual
   - Se necesita 90% para aprobar
   - Ver preguntas correctas (verde) e incorrectas (rojo)
   - Revisión detallada de todas las respuestas
   - Las respuestas correctas se marcan con ✓
   - Las incorrectas con ✗
7. Historial de exámenes anteriores con fechas y puntuaciones

## 🎨 Características de la Interfaz

### Navegación
- **Barra superior**: Logo, nombre de usuario, rol, botón de salir
- **Menú lateral**: Se oculta/muestra con botón de hamburguesa
- **Responsive**: Funciona en móvil, tablet y desktop

### Tablas Interactivas
- Búsqueda en tiempo real
- Filtros por rol, estado, etc.
- Ordenamiento por columnas
- Paginación automática
- Acciones rápidas (editar, eliminar)

### Formularios
- Validación en tiempo real
- Mensajes de error claros
- Campos obligatorios marcados
- Confirmación antes de eliminar

### Estadísticas
- Tarjetas con métricas clave
- Iconos identificativos
- Colores por categoría
- Actualización en tiempo real

## 🔧 Casos de Uso Detallados

### Escenario 1: Alta de nuevo alumno
1. Admin crea usuario con rol "Alumno"
2. Alumno inicia sesión
3. Alumno registra pago de matrícula
4. Secretaria aprueba el pago
5. Alumno puede hacer simulacro de examen

### Escenario 2: Gestión de horas de instructor
1. Instructor registra 8 horas de trabajo diarias
2. Supervisor revisa y aprueba las horas
3. Las horas aparecen como "Aprobadas" en el dashboard del instructor
4. El total de horas del mes se actualiza

### Escenario 3: Simulacro completo de examen
1. Alumno hace clic en "Iniciar Simulacro"
2. Responde las 20 preguntas
3. Sistema calcula automáticamente:
   - Preguntas correctas
   - Preguntas incorrectas
   - Porcentaje
   - Aprobado/Suspendido (90% mínimo)
4. Alumno puede revisar todas las respuestas
5. El resultado se guarda en el historial

### Escenario 4: Gestión multi-escuela
1. Super Admin crea varias escuelas
2. Asigna un administrador a cada escuela
3. Cada admin solo ve y gestiona sus usuarios
4. Super Admin ve estadísticas globales

## 💡 Consejos y Mejores Prácticas

### Para Administradores
- Crear usuarios de prueba para familiarizarse
- Desactivar usuarios en lugar de eliminar (mantiene historial)
- Revisar estadísticas regularmente

### Para Instructores
- Registrar horas diariamente
- Añadir descripciones claras
- Verificar aprobaciones del supervisor

### Para Secretarias
- Revisar pagos pendientes diariamente
- Verificar métodos de pago
- Mantener registro actualizado

### Para Alumnos
- Practicar con simulacros antes del examen real
- Revisar respuestas incorrectas
- Llevar control de pagos

### Para Supervisores
- Aprobar horas puntualmente
- Verificar coherencia en registros
- Comunicar dudas con instructores

## 🐛 Solución de Problemas

### No puedo iniciar sesión
- Verificar email y contraseña (distingue mayúsculas/minúsculas)
- Comprobar que el usuario esté activo
- Usar las credenciales de prueba proporcionadas

### No veo mis datos
- Verificar que el usuario esté asignado a una escuela
- Recargar la página (F5)
- Limpiar caché del navegador

### Los datos no se guardan
- Los datos se guardan en localStorage del navegador
- No usar modo incógnito
- Verificar que JavaScript esté habilitado

### Quiero empezar de cero
- Abrir DevTools (F12)
- Ir a Application > Local Storage
- Eliminar el item "gestion-escuelas-storage"
- Recargar la página

## 📱 Compatibilidad

### Navegadores Soportados
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Dispositivos
- ✅ Desktop (1920x1080 y superiores)
- ✅ Laptop (1366x768 y superiores)
- ✅ Tablet (768x1024)
- ✅ Mobile (375x667 y superiores)

## 🚀 Próximos Pasos

Una vez familiarizado con la aplicación, considera:
1. Integrar un backend real (Node.js, Python, etc.)
2. Conectar a base de datos (PostgreSQL, MongoDB)
3. Implementar autenticación JWT
4. Añadir sistema de notificaciones
5. Crear reportes PDF descargables
6. Integrar calendario de clases
7. Añadir chat entre usuarios

## 📞 Soporte

Para dudas o problemas:
1. Revisar esta guía completa
2. Consultar el README.md
3. Revisar el código fuente (bien comentado)
4. Probar con usuarios de ejemplo

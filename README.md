# Sistema de Gestión de Escuelas de Conducción

Aplicación web completa para la gestión de escuelas de conducción con múltiples roles de usuario y funcionalidades específicas.

## 🚀 Características Principales

### Roles de Usuario

1. **Super Administrador**
   - Crear y gestionar múltiples escuelas de conducción
   - Ver estadísticas globales
   - Administrar el estado de las escuelas

2. **Administrador de Escuela**
   - Gestionar usuarios de la escuela (instructores, secretarias, alumnos, supervisores)
   - Ver estadísticas de la escuela
   - Control completo de usuarios asignados

3. **Instructor**
   - Registrar horas de trabajo diarias
   - Ver historial de horas (aprobadas y pendientes)
   - Seguimiento de clases programadas

4. **Secretaria**
   - Aprobar o rechazar pagos de alumnos
   - Ver historial de pagos
   - Gestionar cobros y facturación

5. **Alumno**
   - Ver y registrar pagos
   - Realizar simulacros de examen teórico
   - Ver historial de exámenes y resultados
   - Seguimiento de clases completadas

6. **Supervisor**
   - Aprobar horas de trabajo de instructores
   - Revisar registros pendientes
   - Ver estadísticas de horas totales

### Funcionalidades Clave

- ✅ Sistema de autenticación multi-rol
- ✅ Gestión completa de escuelas (CRUD)
- ✅ Gestión de usuarios por escuela
- ✅ Registro y aprobación de horas de instructores
- ✅ Sistema de pagos con seguimiento de estados
- ✅ Simulacro de examen teórico completo con:
  - 20 preguntas de múltiple opción
  - Temporizador de 30 minutos
  - Corrección automática
  - Revisión detallada de respuestas
  - Histórico de intentos
- ✅ Dashboards específicos por rol
- ✅ Persistencia de datos en localStorage
- ✅ Interfaz moderna y responsive

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18** con TypeScript
- **Vite** como build tool
- **Tailwind CSS** para estilos
- **Zustand** para gestión de estado global
- **date-fns** para manejo de fechas
- **Lucide React** para iconos

### Backend (Nuevo)
- **Node.js** con Express
- **PostgreSQL** como base de datos
- **TypeScript** para tipado estático
- **JWT** para autenticación
- **bcryptjs** para hash de contraseñas

## 📦 Instalación

### Opción 1: Solo Frontend (localStorage)

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```

### Opción 2: Frontend + Backend (PostgreSQL)

#### Backend
```bash
# 1. Instalar PostgreSQL (ver server/README.md)

# 2. Crear base de datos
psql -U postgres -c "CREATE DATABASE gestion_escuelas;"

# 3. Configurar servidor
cd server
cp env.example .env
# Editar .env con tus credenciales

# 4. Instalar dependencias
npm install

# 5. Configurar base de datos
npm run db:setup

# 6. Iniciar servidor backend
npm run dev
```

#### Frontend
```bash
# En otra terminal, en la raíz del proyecto
npm install
npm run dev
```

Ver **INTEGRACION_DB.md** para instrucciones completas de integración.

## 🔐 Credenciales de Prueba

### Super Administrador
- Email: `superadmin@gestion.com`
- Contraseña: `admin123`

Una vez dentro como super admin, puedes:
1. Crear nuevas escuelas
2. Crear administradores para cada escuela
3. Los administradores pueden crear usuarios adicionales (instructores, secretarias, alumnos, supervisores)

## 📋 Flujo de Trabajo

### Configuración Inicial
1. Iniciar sesión como super admin
2. Crear una o más escuelas
3. Crear un usuario administrador para cada escuela
4. El administrador crea los demás usuarios (instructores, secretarias, alumnos)

### Uso Diario
- **Instructores**: Registran sus horas de trabajo diarias
- **Supervisores**: Revisan y aprueban las horas de los instructores
- **Alumnos**: Registran pagos y realizan simulacros de examen
- **Secretarias**: Aprueban los pagos registrados
- **Administradores**: Gestionan usuarios y supervisan la operación

## 🎨 Características de UI/UX

- Diseño moderno y profesional
- Totalmente responsive (mobile, tablet, desktop)
- Navegación intuitiva
- Feedback visual claro para todas las acciones
- Tablas interactivas con búsqueda y filtros
- Modales para formularios
- Estadísticas visuales con tarjetas informativas

## 📱 Simulacro de Examen

El módulo de examen incluye:
- 20 preguntas de 4 categorías (normas, señales, seguridad, mecánica)
- Navegación libre entre preguntas
- Indicadores visuales de progreso
- Temporizador regresivo
- Sistema de calificación automático (90% para aprobar)
- Revisión detallada con respuestas correctas e incorrectas
- Almacenamiento de resultados históricos

## 🔧 Estructura del Proyecto

```
gestion-escuelas/
├── src/                    # Frontend React
│   ├── components/
│   │   ├── dashboards/
│   │   │   ├── SuperAdminDashboard.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── InstructorDashboard.tsx
│   │   │   ├── AlumnoDashboard.tsx
│   │   │   ├── SecretariaDashboard.tsx
│   │   │   └── SupervisorDashboard.tsx
│   │   ├── ExamenSimulacro.tsx
│   │   ├── Layout.tsx
│   │   └── Login.tsx
│   ├── store/
│   │   └── index.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── server/                 # Backend Node.js
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts
│   │   ├── controllers/
│   │   │   ├── authController.ts
│   │   │   ├── escuelasController.ts
│   │   │   ├── usersController.ts
│   │   │   ├── registrosController.ts
│   │   │   ├── pagosController.ts
│   │   │   └── examenesController.ts
│   │   ├── middleware/
│   │   │   └── auth.ts
│   │   ├── routes/
│   │   │   ├── auth.ts
│   │   │   ├── escuelas.ts
│   │   │   ├── users.ts
│   │   │   ├── registros.ts
│   │   │   ├── pagos.ts
│   │   │   └── examenes.ts
│   │   ├── database/
│   │   │   └── setup.ts
│   │   └── index.ts
│   ├── env.example
│   ├── package.json
│   └── README.md
├── INTEGRACION_DB.md       # Guía de integración
├── GUIA_USO.md            # Guía de usuario
└── README.md
```

## 💾 Almacenamiento de Datos

### Opción 1: localStorage (Por defecto)
Los datos se almacenan en localStorage del navegador mediante Zustand persist:
- Usuarios y roles
- Escuelas
- Registros de horas
- Pagos
- Resultados de exámenes
- Clases

Para resetear la aplicación, limpiar localStorage en DevTools.

### Opción 2: PostgreSQL (Recomendado para producción)
Base de datos relacional completa con:
- Tablas normalizadas
- Relaciones con foreign keys
- Índices para optimización
- Transacciones ACID
- Respaldos y recuperación
- Escalabilidad

Ver **server/README.md** y **INTEGRACION_DB.md** para configuración.

## 🚀 Próximas Mejoras Sugeridas

- ✅ ~~Backend real con API REST~~ (Completado)
- ✅ ~~Base de datos (PostgreSQL)~~ (Completado)
- ✅ ~~Autenticación JWT~~ (Completado)
- Sistema de notificaciones en tiempo real
- Calendario de clases interactivo
- Reportes PDF exportables
- Chat entre usuarios
- Sistema de archivos adjuntos
- Integración con pasarela de pago
- App móvil nativa
- Dashboard con gráficos y estadísticas avanzadas
- Logs de auditoría
- Recuperación de contraseña por email

## 📄 Licencia

Este proyecto es de código abierto para fines educativos y de demostración.

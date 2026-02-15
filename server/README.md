# Backend Server - Sistema de Gestión de Escuelas de Conducción

Backend API RESTful con Node.js, Express, TypeScript y PostgreSQL.

## 📋 Requisitos Previos

- Node.js 18+ 
- PostgreSQL 14+
- npm o yarn

## 🚀 Instalación

### 1. Instalar PostgreSQL

**Windows:**
- Descargar desde https://www.postgresql.org/download/windows/
- Instalar con las opciones por defecto
- Configurar contraseña para usuario `postgres`

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**macOS:**
```bash
brew install postgresql
brew services start postgresql
```

### 2. Crear Base de Datos

```bash
# Conectar a PostgreSQL
psql -U postgres

# Crear base de datos
CREATE DATABASE gestion_escuelas;

# Salir
\q
```

### 3. Configurar Variables de Entorno

```bash
# Copiar archivo de ejemplo
cp env.example .env

# Editar .env con tus credenciales
```

Contenido de `.env`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=gestion_escuelas
DB_USER=postgres
DB_PASSWORD=tu_contraseña_postgres

PORT=3000
NODE_ENV=development

JWT_SECRET=cambia_esto_por_una_clave_segura_en_produccion
JWT_EXPIRES_IN=7d
```

### 4. Instalar Dependencias

```bash
npm install
```

### 5. Configurar Base de Datos

```bash
npm run db:setup
```

Este comando:
- Crea todas las tablas necesarias
- Añade índices para optimización
- Crea el usuario super admin por defecto

## 🎯 Comandos Disponibles

```bash
npm run dev        # Iniciar servidor en modo desarrollo con hot-reload
npm run build      # Compilar TypeScript a JavaScript
npm start          # Iniciar servidor en producción
npm run db:setup   # Configurar/resetear base de datos
```

## 📡 API Endpoints

### Autenticación

```
POST   /api/auth/login       # Login y obtener token JWT
GET    /api/auth/me          # Obtener usuario actual (requiere token)
```

### Escuelas (Super Admin)

```
GET    /api/escuelas         # Listar todas las escuelas
POST   /api/escuelas         # Crear nueva escuela
PUT    /api/escuelas/:id     # Actualizar escuela
DELETE /api/escuelas/:id     # Eliminar escuela
```

### Usuarios (Super Admin y Admin)

```
GET    /api/users            # Listar usuarios
POST   /api/users            # Crear nuevo usuario
PUT    /api/users/:id        # Actualizar usuario
DELETE /api/users/:id        # Eliminar usuario
```

### Registros de Horas

```
GET    /api/registros        # Listar registros de horas
POST   /api/registros        # Crear nuevo registro
PUT    /api/registros/:id/aprobar   # Aprobar registro
```

### Pagos

```
GET    /api/pagos            # Listar pagos
POST   /api/pagos            # Crear nuevo pago
PUT    /api/pagos/:id        # Actualizar estado de pago
```

### Exámenes

```
GET    /api/examenes         # Listar resultados de exámenes
POST   /api/examenes         # Guardar resultado de examen
```

## 🔐 Autenticación

La API usa JWT (JSON Web Tokens) para autenticación.

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "superadmin@gestion.com",
    "password": "admin123"
  }'
```

Respuesta:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "superadmin@gestion.com",
    "nombre": "Super",
    "apellido": "Administrador",
    "role": "super_admin"
  }
}
```

### Usar Token

Incluir el token en el header `Authorization`:

```bash
curl -X GET http://localhost:3000/api/escuelas \
  -H "Authorization: Bearer tu_token_jwt"
```

## 📊 Esquema de Base de Datos

### Tablas Principales

**escuelas**
- id (UUID)
- nombre
- direccion
- telefono
- email
- cif (único)
- fecha_creacion
- activo

**usuarios**
- id (UUID)
- email (único)
- password (hash bcrypt)
- nombre
- apellido
- role (enum)
- escuela_id (FK)
- telefono
- direccion
- fecha_registro
- activo

**registros_horas**
- id (UUID)
- instructor_id (FK)
- escuela_id (FK)
- fecha
- hora_inicio
- hora_fin
- total_horas
- descripcion
- aprobado

**pagos**
- id (UUID)
- alumno_id (FK)
- escuela_id (FK)
- monto
- concepto
- fecha
- metodo_pago
- estado
- comprobante

**resultados_examen**
- id (UUID)
- alumno_id (FK)
- escuela_id (FK)
- fecha
- preguntas (JSON)
- respuestas (JSON)
- puntuacion
- aprobado
- tiempo_total

**clases**
- id (UUID)
- alumno_id (FK)
- instructor_id (FK)
- escuela_id (FK)
- fecha
- hora_inicio
- hora_fin
- tipo
- estado
- notas

## 🔒 Seguridad

- Contraseñas hasheadas con bcrypt (10 rounds)
- JWT con expiración configurable
- CORS habilitado
- Validación de roles en rutas protegidas
- SQL injection protection con prepared statements

## 🐛 Solución de Problemas

### Error: "Connection refused" al conectar a PostgreSQL

1. Verificar que PostgreSQL está corriendo:
   ```bash
   # Windows
   Get-Service postgresql*
   
   # Linux/Mac
   sudo systemctl status postgresql
   ```

2. Verificar credenciales en `.env`

### Error: "Database does not exist"

```bash
# Crear base de datos manualmente
psql -U postgres -c "CREATE DATABASE gestion_escuelas;"
```

### Error: "Port 3000 already in use"

Cambiar el puerto en `.env`:
```env
PORT=3001
```

### Resetear Base de Datos

```bash
# Eliminar y recrear
psql -U postgres -c "DROP DATABASE gestion_escuelas;"
psql -U postgres -c "CREATE DATABASE gestion_escuelas;"
npm run db:setup
```

## 📝 Ejemplo de Uso Completo

### 1. Login

```javascript
const response = await fetch('http://localhost:3000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'superadmin@gestion.com',
    password: 'admin123'
  })
});

const { token, user } = await response.json();
```

### 2. Crear Escuela

```javascript
const response = await fetch('http://localhost:3000/api/escuelas', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    nombre: 'Autoescuela Barcelona',
    direccion: 'Calle Principal 123',
    telefono: '933123456',
    email: 'info@barcelona.com',
    cif: 'B87654321',
    activo: true
  })
});

const escuela = await response.json();
```

### 3. Crear Usuario

```javascript
const response = await fetch('http://localhost:3000/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    email: 'instructor@barcelona.com',
    password: 'password123',
    nombre: 'Juan',
    apellido: 'Pérez',
    role: 'instructor',
    escuelaId: escuela.id,
    telefono: '666777888',
    activo: true
  })
});
```

## 🚀 Despliegue en Producción

### Variables de Entorno Importantes

```env
NODE_ENV=production
JWT_SECRET=clave_muy_segura_y_larga_para_produccion
DB_PASSWORD=contraseña_segura_produccion
```

### Recomendaciones

1. Usar HTTPS en producción
2. Configurar rate limiting
3. Implementar logging (Winston, Morgan)
4. Usar variables de entorno seguras
5. Configurar backups de base de datos
6. Implementar monitoring (PM2, New Relic)

## 📄 Licencia

MIT

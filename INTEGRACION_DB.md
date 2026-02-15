# Integración Frontend-Backend con PostgreSQL

Este documento explica cómo conectar el frontend React con el backend PostgreSQL.

## 📋 Pasos de Configuración

### 1. Configurar Backend

```bash
# Navegar a la carpeta del servidor
cd server

# Copiar archivo de configuración
cp env.example .env

# Editar .env con tus credenciales de PostgreSQL
# Asegurarse de que PostgreSQL está instalado y corriendo

# Instalar dependencias
npm install

# Configurar base de datos (crea tablas y usuario admin)
npm run db:setup

# Iniciar servidor backend
npm run dev
```

El servidor estará corriendo en: `http://localhost:3000`

### 2. Actualizar Frontend para usar API

El frontend actual usa Zustand con localStorage. Para conectarlo al backend:

#### Opción A: Dual Mode (localStorage + API)

Puedes mantener ambos modos y cambiar entre ellos:

**src/config/api.ts**
```typescript
export const API_URL = 'http://localhost:3000/api';
export const USE_API = true; // false para usar localStorage

export const getAuthHeader = () => {
  const token = localStorage.getItem('auth_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};
```

#### Opción B: Migrar Completamente a API

Reemplazar el store de Zustand con llamadas a la API.

### 3. Instalar Dependencias del Frontend

```bash
# En la raíz del proyecto
npm install axios
```

### 4. Crear Cliente API

**src/services/api.ts**
```typescript
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

// Auth
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  getMe: () => api.get('/auth/me'),
};

// Escuelas
export const escuelasAPI = {
  getAll: () => api.get('/escuelas'),
  create: (data: any) => api.post('/escuelas', data),
  update: (id: string, data: any) => api.put(`/escuelas/${id}`, data),
  delete: (id: string) => api.delete(`/escuelas/${id}`),
};

// Usuarios
export const usersAPI = {
  getAll: () => api.get('/users'),
  create: (data: any) => api.post('/users', data),
  update: (id: string, data: any) => api.put(`/users/${id}`, data),
  delete: (id: string) => api.delete(`/users/${id}`),
};

// Registros de horas
export const registrosAPI = {
  getAll: () => api.get('/registros'),
  create: (data: any) => api.post('/registros', data),
  aprobar: (id: string) => api.put(`/registros/${id}/aprobar`),
};

// Pagos
export const pagosAPI = {
  getAll: () => api.get('/pagos'),
  create: (data: any) => api.post('/pagos', data),
  update: (id: string, data: any) => api.put(`/pagos/${id}`, data),
};

// Exámenes
export const examenesAPI = {
  getAll: () => api.get('/examenes'),
  create: (data: any) => api.post('/examenes', data),
};
```

### 5. Actualizar Login Component

**src/components/Login.tsx**
```typescript
import { authAPI } from '../services/api';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  
  try {
    const response = await authAPI.login(email, password);
    const { token, user } = response.data;
    
    // Guardar token
    localStorage.setItem('auth_token', token);
    
    // Guardar usuario en store
    useStore.getState().setCurrentUser(user);
    
  } catch (error: any) {
    setError(error.response?.data?.error || 'Error al iniciar sesión');
  }
};
```

## 🔄 Flujo Completo

### Autenticación

1. Usuario introduce email/contraseña
2. Frontend envía POST a `/api/auth/login`
3. Backend valida y devuelve JWT token
4. Frontend guarda token en localStorage
5. Frontend incluye token en todas las peticiones subsiguientes

### Ejemplo: Crear Escuela

```typescript
// En SuperAdminDashboard.tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const response = await escuelasAPI.create(formData);
    // Actualizar estado local
    setEscuelas([...escuelas, response.data]);
    setShowModal(false);
  } catch (error: any) {
    alert(error.response?.data?.error || 'Error al crear escuela');
  }
};
```

## 🔧 Configuración de CORS

Si tienes problemas de CORS, verifica que el backend tiene:

**server/src/index.ts**
```typescript
app.use(cors({
  origin: 'http://localhost:5173', // URL del frontend
  credentials: true
}));
```

## 🧪 Testing

### Test Manual del Backend

```bash
# 1. Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"superadmin@gestion.com","password":"admin123"}'

# Guardar el token recibido

# 2. Listar escuelas
curl -X GET http://localhost:3000/api/escuelas \
  -H "Authorization: Bearer TU_TOKEN_AQUI"

# 3. Crear escuela
curl -X POST http://localhost:3000/api/escuelas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -d '{
    "nombre": "Test Escuela",
    "direccion": "Calle Test 123",
    "telefono": "999888777",
    "email": "test@test.com",
    "cif": "B99999999",
    "activo": true
  }'
```

## 🚀 Inicio Rápido

### Terminal 1: Backend
```bash
cd server
npm run dev
```

### Terminal 2: Frontend
```bash
npm run dev
```

### Terminal 3: PostgreSQL (opcional, para consultas)
```bash
psql -U postgres -d gestion_escuelas
```

Comandos útiles SQL:
```sql
-- Ver todos los usuarios
SELECT * FROM usuarios;

-- Ver todas las escuelas
SELECT * FROM escuelas;

-- Ver registros de horas
SELECT * FROM registros_horas;

-- Contar usuarios por rol
SELECT role, COUNT(*) FROM usuarios GROUP BY role;
```

## 📊 Migración de Datos

Si quieres migrar datos del localStorage al PostgreSQL:

**scripts/migrate.ts**
```typescript
import pool from '../server/src/config/database';

async function migrate() {
  // Leer datos del localStorage (exportar desde navegador)
  const data = JSON.parse(localStorage.getItem('gestion-escuelas-storage') || '{}');
  
  // Insertar en PostgreSQL
  for (const escuela of data.state.escuelas) {
    await pool.query(
      'INSERT INTO escuelas (nombre, direccion, ...) VALUES ($1, $2, ...)',
      [escuela.nombre, escuela.direccion, ...]
    );
  }
  
  console.log('Migración completada');
}

migrate();
```

## 🔐 Seguridad

1. **No commitear .env**: Añadir `.env` al `.gitignore`
2. **JWT Secret**: Usar una clave segura en producción
3. **Contraseñas**: Nunca loggear contraseñas
4. **HTTPS**: Usar en producción
5. **Rate Limiting**: Implementar para prevenir ataques

## 📝 Checklist de Integración

- [ ] PostgreSQL instalado y corriendo
- [ ] Base de datos creada
- [ ] Variables de entorno configuradas
- [ ] Backend corriendo en puerto 3000
- [ ] Frontend corriendo en puerto 5173
- [ ] Login funciona y devuelve token
- [ ] Token se guarda en localStorage
- [ ] Peticiones incluyen token en Authorization header
- [ ] CORS configurado correctamente
- [ ] Datos se persisten en PostgreSQL

## 🐛 Debugging

### Ver logs del backend
```bash
cd server
npm run dev
```

Verás:
- ✓ Conectado a PostgreSQL
- Peticiones entrantes
- Errores de validación
- Queries SQL (si activas logging)

### Inspeccionar peticiones en el navegador

1. Abrir DevTools (F12)
2. Network tab
3. Filtrar por XHR/Fetch
4. Ver headers, body, response

### Common Issues

**Error: "connect ECONNREFUSED"**
- PostgreSQL no está corriendo
- Credenciales incorrectas en `.env`

**Error: "Token inválido"**
- Token expirado
- JWT_SECRET diferente entre generación y validación

**Error: CORS**
- Verificar origen en configuración CORS del backend
- Incluir credentials: true si usas cookies

## 🎉 Resultado Final

Una vez integrado:
- ✅ Datos persistentes en PostgreSQL
- ✅ Autenticación segura con JWT
- ✅ API RESTful completa
- ✅ Frontend conectado al backend
- ✅ Multi-usuario real
- ✅ Escalable y preparado para producción

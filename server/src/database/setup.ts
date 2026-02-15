import pool from '../config/database';

const setupDatabase = async () => {
  try {
    console.log('Configurando base de datos...');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS escuelas (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        nombre VARCHAR(255) NOT NULL,
        direccion TEXT NOT NULL,
        telefono VARCHAR(20) NOT NULL,
        email VARCHAR(255) NOT NULL,
        cif VARCHAR(20) NOT NULL UNIQUE,
        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        activo BOOLEAN DEFAULT true
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        nombre VARCHAR(100) NOT NULL,
        apellido VARCHAR(100) NOT NULL,
        role VARCHAR(20) NOT NULL CHECK (role IN ('super_admin', 'admin', 'instructor', 'secretaria', 'alumno', 'supervisor')),
        escuela_id UUID REFERENCES escuelas(id) ON DELETE CASCADE,
        telefono VARCHAR(20),
        direccion TEXT,
        fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        activo BOOLEAN DEFAULT true
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS registros_horas (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        instructor_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
        escuela_id UUID NOT NULL REFERENCES escuelas(id) ON DELETE CASCADE,
        fecha DATE NOT NULL,
        hora_inicio TIME NOT NULL,
        hora_fin TIME NOT NULL,
        total_horas DECIMAL(5,2) NOT NULL,
        descripcion TEXT,
        aprobado BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS pagos (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        alumno_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
        escuela_id UUID NOT NULL REFERENCES escuelas(id) ON DELETE CASCADE,
        monto DECIMAL(10,2) NOT NULL,
        concepto TEXT NOT NULL,
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        metodo_pago VARCHAR(20) CHECK (metodo_pago IN ('efectivo', 'tarjeta', 'transferencia')),
        estado VARCHAR(20) DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'pagado', 'cancelado')),
        comprobante TEXT
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS resultados_examen (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        alumno_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
        escuela_id UUID NOT NULL REFERENCES escuelas(id) ON DELETE CASCADE,
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        preguntas JSONB NOT NULL,
        respuestas JSONB NOT NULL,
        puntuacion INTEGER NOT NULL,
        aprobado BOOLEAN NOT NULL,
        tiempo_total INTEGER NOT NULL
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS clases (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        alumno_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
        instructor_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
        escuela_id UUID NOT NULL REFERENCES escuelas(id) ON DELETE CASCADE,
        fecha DATE NOT NULL,
        hora_inicio TIME NOT NULL,
        hora_fin TIME NOT NULL,
        tipo VARCHAR(20) CHECK (tipo IN ('teorica', 'practica')),
        estado VARCHAR(20) DEFAULT 'programada' CHECK (estado IN ('programada', 'completada', 'cancelada')),
        notas TEXT
      );
    `);

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_usuarios_escuela ON usuarios(escuela_id);
      CREATE INDEX IF NOT EXISTS idx_registros_instructor ON registros_horas(instructor_id);
      CREATE INDEX IF NOT EXISTS idx_pagos_alumno ON pagos(alumno_id);
      CREATE INDEX IF NOT EXISTS idx_resultados_alumno ON resultados_examen(alumno_id);
      CREATE INDEX IF NOT EXISTS idx_clases_alumno ON clases(alumno_id);
      CREATE INDEX IF NOT EXISTS idx_clases_instructor ON clases(instructor_id);
    `);

    console.log('✓ Tablas creadas exitosamente');

    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash('admin123', 10);

    await pool.query(`
      INSERT INTO usuarios (email, password, nombre, apellido, role, telefono, activo)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (email) DO NOTHING;
    `, ['superadmin@gestion.com', hashedPassword, 'Super', 'Administrador', 'super_admin', '600000000', true]);

    console.log('✓ Usuario super admin creado');
    console.log('\nBase de datos configurada correctamente!');
    console.log('Credenciales: superadmin@gestion.com / admin123\n');

  } catch (error) {
    console.error('Error configurando la base de datos:', error);
    throw error;
  } finally {
    await pool.end();
  }
};

if (require.main === module) {
  setupDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

export default setupDatabase;

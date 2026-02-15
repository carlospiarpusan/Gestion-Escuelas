import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import escuelasRoutes from './routes/escuelas';
import usersRoutes from './routes/users';
import registrosRoutes from './routes/registros';
import pagosRoutes from './routes/pagos';
import examenesRoutes from './routes/examenes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/escuelas', escuelasRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/registros', registrosRoutes);
app.use('/api/pagos', pagosRoutes);
app.use('/api/examenes', examenesRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📊 API disponible en http://localhost:${PORT}/api`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health\n`);
});

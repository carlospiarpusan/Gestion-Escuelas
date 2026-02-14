import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import DashboardLayout from './layouts/DashboardLayout';

import LandingPage from './pages/LandingPage';
import Login from './pages/Auth/Login';
import SchoolsPage from './pages/SuperAdmin/Schools';
import QuestionsPage from './pages/SuperAdmin/Questions';
import StudentExams from './pages/Student/Exams';
import StudentPayments from './pages/Student/Payments';
import InstructorHoursLink from './pages/Secretary/InstructorHours';
import RegisterStudent from './pages/Secretary/RegisterStudent';
import Tramitadores from './pages/Secretary/Tramitadores';
import MyHours from './pages/Instructor/MyHours';
import ExamResults from './pages/Analytics/ExamResults';

// Protected Route Wrapper
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Cargando...</div>; // Or a spinner
  if (!user) return <Navigate to="/login" replace />;

  // Authorization check
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

// Placeholder Pages
const DashboardHome = () => <h1>Bienvenido al Panel de Control</h1>;
const UsersPage = () => <h1>Gestión de Usuarios</h1>;
const SettingsPage = () => <h1>Configuración</h1>;

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<DashboardHome />} />

            {/* Super Admin Routes */}
            <Route path="schools" element={<ProtectedRoute allowedRoles={['superadmin']}><SchoolsPage /></ProtectedRoute>} />
            <Route path="questions" element={<ProtectedRoute allowedRoles={['superadmin']}><QuestionsPage /></ProtectedRoute>} />
            <Route path="users" element={<ProtectedRoute allowedRoles={['superadmin', 'admin']}><UsersPage /></ProtectedRoute>} />
            <Route path="analytics" element={<ProtectedRoute allowedRoles={['superadmin', 'admin']}><ExamResults /></ProtectedRoute>} />

            {/* Secretary Routes */}
            <Route path="instructor-logs" element={<ProtectedRoute allowedRoles={['secretary', 'admin', 'superadmin']}><InstructorHoursLink /></ProtectedRoute>} />
            <Route path="register-student" element={<ProtectedRoute allowedRoles={['secretary', 'admin', 'superadmin']}><RegisterStudent /></ProtectedRoute>} />
            <Route path="tramitadores" element={<ProtectedRoute allowedRoles={['secretary', 'admin', 'superadmin']}><Tramitadores /></ProtectedRoute>} />

            {/* Instructor Routes */}
            <Route path="my-hours" element={<ProtectedRoute allowedRoles={['instructor']}><MyHours /></ProtectedRoute>} />

            {/* Student Routes */}
            <Route path="exams" element={<ProtectedRoute allowedRoles={['student']}><StudentExams /></ProtectedRoute>} />
            <Route path="payments" element={<ProtectedRoute allowedRoles={['student']}><StudentPayments /></ProtectedRoute>} />

            <Route path="settings" element={<SettingsPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

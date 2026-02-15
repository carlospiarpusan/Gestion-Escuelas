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
import Students from './pages/Secretary/Students';
import Tramitadores from './pages/Secretary/Tramitadores';
import Finanzas from './pages/Secretary/Finanzas';
import MyHours from './pages/Instructor/MyHours';
import VehicleCheck from './pages/Instructor/VehicleCheck';
import ExamResults from './pages/Analytics/ExamResults';
import SchoolPerformance from './pages/Analytics/SchoolPerformance';
import Fleet from './pages/SchoolAdmin/Fleet';
import VehicleDetails from './pages/SchoolAdmin/VehicleDetails';
import DashboardHome from './pages/DashboardHome';
import UsersPage from './pages/SuperAdmin/Users';
import SettingsPage from './pages/Settings';

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

// Placeholder Pages removed as they are now separate files

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
            <Route path="school-performance" element={<ProtectedRoute allowedRoles={['superadmin', 'admin']}><SchoolPerformance /></ProtectedRoute>} />

            {/* Secretary Routes */}
            <Route path="students" element={<ProtectedRoute allowedRoles={['secretary', 'admin', 'superadmin']}><Students /></ProtectedRoute>} />
            <Route path="instructor-logs" element={<ProtectedRoute allowedRoles={['secretary', 'admin', 'superadmin']}><InstructorHoursLink /></ProtectedRoute>} />
            <Route path="register-student" element={<ProtectedRoute allowedRoles={['secretary', 'admin', 'superadmin']}><RegisterStudent /></ProtectedRoute>} />
            <Route path="tramitadores" element={<ProtectedRoute allowedRoles={['secretary', 'admin', 'superadmin']}><Tramitadores /></ProtectedRoute>} />
            <Route path="finanzas" element={<ProtectedRoute allowedRoles={['secretary', 'admin', 'superadmin']}><Finanzas /></ProtectedRoute>} />

            {/* Instructor Routes */}
            <Route path="my-hours" element={<ProtectedRoute allowedRoles={['instructor']}><MyHours /></ProtectedRoute>} />
            <Route path="vehicle-check" element={<ProtectedRoute allowedRoles={['instructor']}><VehicleCheck /></ProtectedRoute>} />

            {/* Student Routes */}
            <Route path="exams" element={<ProtectedRoute allowedRoles={['student']}><StudentExams /></ProtectedRoute>} />
            <Route path="payments" element={<ProtectedRoute allowedRoles={['student']}><StudentPayments /></ProtectedRoute>} />

            {/* Fleet Management (Accessible by SuperAdmin, Admin) */}
            <Route path="fleet" element={<ProtectedRoute allowedRoles={['superadmin', 'admin']}><Fleet /></ProtectedRoute>} />
            <Route path="fleet/:id" element={<ProtectedRoute allowedRoles={['superadmin', 'admin']}><VehicleDetails /></ProtectedRoute>} />

            <Route path="settings" element={<SettingsPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import Footer from './components/Footer';
import DashboardLayout from './layouts/DashboardLayout';

import SchoolsPage from './pages/SuperAdmin/Schools';
import QuestionsPage from './pages/SuperAdmin/Questions';
import StudentExams from './pages/Student/Exams';
import StudentPayments from './pages/Student/Payments';
import InstructorHoursLink from './pages/Secretary/InstructorHours';
import RegisterStudent from './pages/Secretary/RegisterStudent';
import Tramitadores from './pages/Secretary/Tramitadores';
import MyHours from './pages/Instructor/MyHours';
import ExamResults from './pages/Analytics/ExamResults';

// Placeholder Pages (Temporary until implemented)
const LandingPage = () => (
  <div className="app-container">
    <Navbar />
    <main>
      <Hero />
      <BentoGrid />
    </main>
    <Footer />
  </div>
);

const DashboardHome = () => <div><h3>Bienvenido al Panel de Control</h3><p>Selecciona una opción del menú.</p></div>;
const UsersPage = () => <div><h3>Gestión de Usuarios</h3><p>Administración global de usuarios.</p></div>;

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />

          {/* Super Admin Routes */}
          <Route path="schools" element={<SchoolsPage />} />
          <Route path="questions" element={<QuestionsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="analytics" element={<ExamResults />} />

          {/* Secretary Routes */}
          <Route path="instructor-logs" element={<InstructorHoursLink />} />
          <Route path="register-student" element={<RegisterStudent />} />
          <Route path="tramitadores" element={<Tramitadores />} />

          {/* Instructor Routes */}
          <Route path="my-hours" element={<MyHours />} />

          {/* Student Routes */}
          <Route path="payments" element={<StudentPayments />} />
          <Route path="exams" element={<StudentExams />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

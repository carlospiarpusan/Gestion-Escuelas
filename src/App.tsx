import { useEffect } from 'react';
import { useStore } from './store';
import Login from './components/Login';
import Layout from './components/Layout';
import SuperAdminDashboard from './components/dashboards/SuperAdminDashboard';
import AdminDashboard from './components/dashboards/AdminDashboard';
import InstructorDashboard from './components/dashboards/InstructorDashboard';
import AlumnoDashboard from './components/dashboards/AlumnoDashboard';
import SecretariaDashboard from './components/dashboards/SecretariaDashboard';
import SupervisorDashboard from './components/dashboards/SupervisorDashboard';
import ExamenSimulacro from './components/ExamenSimulacro';

function App() {
  const currentUser = useStore((state) => state.currentUser);
  const fetchInitialData = useStore((state) => state.fetchInitialData);
  const currentHash = window.location.hash;

  useEffect(() => {
    if (currentUser) {
      fetchInitialData();
    }
  }, [currentUser, fetchInitialData]);

  useEffect(() => {
    const handleHashChange = () => {
      window.dispatchEvent(new Event('hashchange'));
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (!currentUser) {
    return <Login />;
  }

  if (currentHash === '#/examen') {
    return <ExamenSimulacro />;
  }

  const renderDashboard = () => {
    switch (currentUser.role) {
      case 'super_admin':
        return <SuperAdminDashboard />;
      case 'admin':
        return <AdminDashboard />;
      case 'instructor':
        return <InstructorDashboard />;
      case 'alumno':
        return <AlumnoDashboard />;
      case 'secretaria':
        return <SecretariaDashboard />;
      case 'supervisor':
        return <SupervisorDashboard />;
      default:
        return <div>Rol no reconocido</div>;
    }
  };

  return (
    <Layout>
      {renderDashboard()}
    </Layout>
  );
}

export default App;

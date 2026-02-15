import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Home, Users, BookOpen, CreditCard, Shield, GraduationCap, LogOut, Settings, BarChart3, Clock, UserPlus, Car } from 'lucide-react';
import styles from './DashboardLayout.module.css';
import { useAuth } from '../context/AuthContext';

const SidebarItem = ({ to, icon: Icon, label }) => (
    <NavLink
        to={to}
        className={({ isActive }) => `${styles.sidebarItem} ${isActive ? styles.active : ''} `}
        end={to === '/dashboard'} // Only exact match for root dashboard
    >
        <Icon size={20} />
        <span>{label}</span>
    </NavLink>
);

const DashboardLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Guard clause in case user is null (should be handled by ProtectedRoute, but safe to keep)
    if (!user) return null;

    const role = user.role;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className={styles.layout}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <div className={styles.logo}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                        <span>SchoolOS</span>
                    </div>
                </div>

                <nav className={styles.sidebarNav}>
                    <SidebarItem to="/dashboard" icon={Home} label="Inicio" />

                    {role === 'superadmin' && (
                        <>
                            <SidebarItem to="/dashboard/schools" icon={BookOpen} label="Escuelas" />
                            <SidebarItem to="/dashboard/questions" icon={Shield} label="Banco Preguntas" />
                            <SidebarItem to="/dashboard/users" icon={Users} label="Usuarios Globales" />
                            <SidebarItem to="/dashboard/analytics" icon={BarChart3} label="Analíticas" />
                            <SidebarItem to="/dashboard/fleet" icon={Car} label="Flota Vehicular" />
                        </>
                    )}

                    {role === 'admin' && (
                        <>
                            <SidebarItem to="/dashboard/analytics" icon={BarChart3} label="Analíticas" />
                            <SidebarItem to="/dashboard/fleet" icon={Car} label="Flota Vehicular" />
                        </>
                    )}

                    {role === 'secretary' && (
                        <>
                            <SidebarItem to="/dashboard/register-student" icon={UserPlus} label="Registrar Alumno" />
                            <SidebarItem to="/dashboard/instructor-logs" icon={Clock} label="Horas Instructor" />
                            <SidebarItem to="/dashboard/tramitadores" icon={Users} label="Tramitadores" />
                        </>
                    )}

                    {role === 'instructor' && (
                        <>
                            <SidebarItem to="/dashboard/my-hours" icon={Clock} label="Mis Horas" />
                        </>
                    )}

                    {role === 'student' && (
                        <>
                            <SidebarItem to="/dashboard/exams" icon={GraduationCap} label="Exámenes Teóricos" />
                            <SidebarItem to="/dashboard/payments" icon={CreditCard} label="Mis Pagos" />
                        </>
                    )}

                    <div className={styles.divider}></div>
                    <SidebarItem to="/dashboard/settings" icon={Settings} label="Configuración" />
                </nav>

                <div className={styles.userProfile}>
                    <div className={styles.avatar}>
                        {user.name.charAt(0)}
                    </div>
                    <div className={styles.userInfo}>
                        <span className={styles.userName}>{user.name}</span>
                        <span className={styles.userRole}>{role}</span>
                    </div>
                    <button onClick={handleLogout} className={styles.logoutBtn} title="Cerrar Sesión">
                        <LogOut size={18} />
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={styles.mainContent}>
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;

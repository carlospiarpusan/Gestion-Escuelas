import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Home, Users, BookOpen, CreditCard, Shield, GraduationCap, LogOut, Settings, BarChart3, Clock } from 'lucide-react';
import styles from './DashboardLayout.module.css';

// Mock user role for now - in real app this comes from Auth Context
const MOCK_USER = {
    name: "Carlos User",
    role: "superadmin", // Change to 'student', 'instructor', etc. to test
    school: "Global Driving School"
};

const SidebarItem = ({ to, icon: Icon, label }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.active : ''}`
        }
    >
        <Icon size={20} />
        <span>{label}</span>
    </NavLink>
);

const DashboardLayout = () => {
    const navigate = useNavigate();
    const role = MOCK_USER.role;

    const handleLogout = () => {
        // Clear tokens, etc.
        navigate('/');
    };

    return (
        <div className={styles.layout}>
            <aside className={styles.sidebar}>
                <div className={styles.logoContainer}>
                    <div className={styles.logoText}>Gestion Escuela</div>
                    <div className={styles.schoolName}>{MOCK_USER.school}</div>
                </div>

                <nav className={styles.nav}>
                    <SidebarItem to="/dashboard" icon={Home} label="Inicio" />

                    {role === 'superadmin' && (
                        <>
                            <SidebarItem to="/dashboard/schools" icon={BookOpen} label="Escuelas" />
                            <SidebarItem to="/dashboard/questions" icon={Shield} label="Banco Preguntas" />
                            <SidebarItem to="/dashboard/users" icon={Users} label="Usuarios Globales" />
                            <SidebarItem to="/dashboard/analytics" icon={BarChart3} label="Analíticas" />
                        </>
                    )}

                    {role === 'secretary' && (
                        <SidebarItem to="/dashboard/instructor-logs" icon={Clock} label="Horas Instructor" />
                    )}

                    {role === 'instructor' && (
                        <SidebarItem to="/dashboard/my-hours" icon={Clock} label="Mis Horas" />
                    )}

                    {role === 'admin' && (
                        <>
                            <SidebarItem to="/dashboard/instructors" icon={Users} label="Instructores" />
                            <SidebarItem to="/dashboard/analytics" icon={BarChart3} label="Analíticas" />
                        </>
                    )}

                    {role === 'student' && (
                        <>
                            <SidebarItem to="/dashboard/payments" icon={CreditCard} label="Mis Abonos" />
                            <SidebarItem to="/dashboard/exams" icon={BookOpen} label="Exámenes Teóricos" />
                        </>
                    )}
                </nav>

                <div className={styles.userProfile}>
                    <div className={styles.avatar}>{MOCK_USER.name[0]}</div>
                    <div className={styles.userInfo}>
                        <div className={styles.userName}>{MOCK_USER.name}</div>
                        <div className={styles.userRole}>{role}</div>
                    </div>
                    <button onClick={handleLogout} className={styles.logoutBtn}>
                        <LogOut size={16} />
                    </button>
                </div>
            </aside>

            <main className={styles.mainContent}>
                <header className={styles.header}>
                    <h2>Panel de Control</h2>
                </header>
                <div className={styles.pageContent}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;

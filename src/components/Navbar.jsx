import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>SchoolOS</Link>
                </div>
                <div className={styles.links}>
                    <a href="#features">Características</a>
                    <a href="#pricing">Precios</a>
                </div>
                <div className={styles.actions}>
                    <Link to="/login" className={styles.loginBtn}>Iniciar Sesión</Link>
                    <Link to="/login" className={styles.ctaBtn}>Empezar Demo</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <div className={styles.logo}>Gestion Escuela</div>
                <ul className={styles.links}>
                    <li><a href="#features">Características</a></li>
                    <li><a href="#pricing">Precios</a></li>
                    <li><a href="#contact">Contacto</a></li>
                </ul>
                <div className={styles.actions}>
                    <button className={styles.loginBtn}>Iniciar Sesión</button>
                    <button className={styles.ctaBtn}>Empezar</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

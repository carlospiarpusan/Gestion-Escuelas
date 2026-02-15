import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';
import StatsStrip from './StatsStrip';

const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.content}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className={styles.badge}>Listo para los nuevos exámenes CALE 2025 🇨🇴</span>
                </motion.div>

                <motion.h1
                    className={styles.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                >
                    La plataforma definitiva para<br />
                    <span className={styles.gradientText}>Escuelas de Conducción.</span>
                </motion.h1>

                <motion.p
                    className={styles.subtitle}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    Centraliza la gestión de alumnos, instructores, pagos y exámenes teóricos.
                    Diseño premium, seguridad bancaria y experiencia de usuario inigualable.
                </motion.p>

                <motion.div
                    className={styles.buttons}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                >
                    <Link to="/login" className={styles.primaryBtn}>Agendar Demo</Link>
                    <a href="#features" className={styles.secondaryBtn}>Ver Características</a>
                </motion.div>

                <StatsStrip />
            </div>
        </section>
    );
};

export default Hero;

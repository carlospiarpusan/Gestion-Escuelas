import { motion } from 'framer-motion';
import styles from './Hero.module.css';

const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.content}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className={styles.badge}>Nuevo: Integración con Tramitadores 🚀</span>
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
                    <button className={styles.primaryBtn}>Agendar Demo</button>
                    <button className={styles.secondaryBtn}>Ver Características</button>
                </motion.div>

                <motion.div
                    className={styles.mockupContainer}
                    initial={{ opacity: 0, scale: 0.95, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                >
                    <div className={styles.mockup}>
                        <div className={styles.mockupHeader}>
                            <div className={styles.dot} style={{ background: '#FF5F56' }}></div>
                            <div className={styles.dot} style={{ background: '#FFBD2E' }}></div>
                            <div className={styles.dot} style={{ background: '#27C93F' }}></div>
                        </div>
                        <div className={styles.mockupScreen}>
                            <div className={styles.mockupSidebar}></div>
                            <div className={styles.mockupContentPreview}>
                                <div className={styles.skeletonHeader}></div>
                                <div className={styles.skeletonGrid}>
                                    <div className={styles.skeletonCard}></div>
                                    <div className={styles.skeletonCard}></div>
                                    <div className={styles.skeletonCard}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;

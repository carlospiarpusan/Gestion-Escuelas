import { motion } from 'framer-motion';
import styles from './Hero.module.css';

const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.content}>
                <motion.h1
                    className={styles.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    Gestiona tu autoescuela.<br />
                    <span className={styles.gradientText}>Sin complicaciones.</span>
                </motion.h1>

                <motion.p
                    className={styles.subtitle}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    Una plataforma unificada para estudiantes, instructores y administración.
                    Diseñada para ser simple y poderosa.
                </motion.p>

                <motion.div
                    className={styles.buttons}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                >
                    <button className={styles.primaryBtn}>Empezar gratis</button>
                    <button className={styles.secondaryBtn}>Ver demo</button>
                </motion.div>

                <motion.div
                    className={styles.mockupContainer}
                    initial={{ opacity: 0, scale: 0.95, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                >
                    <div className={styles.mockup}>
                        <div className={styles.mockupScreen}>
                            {/* Fallback visual for mockup */}
                            <div className={styles.mockupContent}>Dashboard Preview</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;

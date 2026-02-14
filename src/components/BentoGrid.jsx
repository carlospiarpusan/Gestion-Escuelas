import { motion } from 'framer-motion';
import { Users, Car, CreditCard, Calendar, BarChart3, ShieldCheck } from 'lucide-react';
import styles from './BentoGrid.module.css';

const BentoGrid = () => {
    return (
        <section className={styles.section} id="features">
            <div className={styles.container}>
                <motion.h2
                    className={styles.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Todo lo que necesitas. <br />
                    <span className={styles.subtitle}>En un solo lugar.</span>
                </motion.h2>

                <div className={styles.grid}>
                    {/* Feature 1 - Large */}
                    <motion.div
                        className={`${styles.card} ${styles.cardLarge}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className={styles.cardContent}>
                            <div className={styles.iconWrapper}><Users size={32} /></div>
                            <h3>Gestión de Alumnos</h3>
                            <p>Seguimiento detallado desde la inscripción hasta la licencia.</p>
                        </div>
                        <div className={styles.cardVisual}>
                            {/* Abstract visual representation */}
                            <div className={styles.visualList}>
                                <div className={styles.visualItem}></div>
                                <div className={styles.visualItem}></div>
                                <div className={styles.visualItem}></div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Feature 2 - Small */}
                    <motion.div
                        className={styles.card}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <div className={styles.cardContent}>
                            <div className={styles.iconWrapper}><Calendar size={32} /></div>
                            <h3>Calendario Inteligente</h3>
                            <p>Programación de clases optimizada.</p>
                        </div>
                    </motion.div>

                    {/* Feature 3 - Small */}
                    <motion.div
                        className={styles.card}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className={styles.cardContent}>
                            <div className={styles.iconWrapper}><CreditCard size={32} /></div>
                            <h3>Pagos Seguros</h3>
                            <p>Control financiero total.</p>
                        </div>
                    </motion.div>

                    {/* Feature 4 - Medium/Wide */}
                    <motion.div
                        className={`${styles.card} ${styles.cardWide}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <div className={styles.cardContent}>
                            <div className={styles.iconWrapper}><BarChart3 size={32} /></div>
                            <h3>Analíticas en Tiempo Real</h3>
                            <p>Visualiza el crecimiento de tu escuela con gráficas intuitivas.</p>
                        </div>
                        <div className={styles.cardVisualGraph}>
                            <div className={styles.bar1}></div>
                            <div className={styles.bar2}></div>
                            <div className={styles.bar3}></div>
                            <div className={styles.bar4}></div>
                        </div>
                    </motion.div>

                    {/* Feature 5 */}
                    <motion.div
                        className={styles.card}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div className={styles.cardContent}>
                            <div className={styles.iconWrapper}><Car size={32} /></div>
                            <h3>Flota de Vehículos</h3>
                            <p>Mantenimiento y disponibilidad.</p>
                        </div>
                    </motion.div>

                    {/* Feature 6 */}
                    <motion.div
                        className={styles.card}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <div className={styles.cardContent}>
                            <div className={styles.iconWrapper}><ShieldCheck size={32} /></div>
                            <h3>Seguridad Total</h3>
                            <p>Tus datos siempre protegidos.</p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default BentoGrid;

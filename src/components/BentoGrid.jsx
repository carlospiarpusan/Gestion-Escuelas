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
                    <span className={styles.subtitle}>En un solo ecosistema.</span>
                </motion.h2>

                <div className={styles.grid}>
                    {/* Feature 1 - Student & Tramitadores (Large) */}
                    <motion.div
                        className={`${styles.card} ${styles.cardLarge}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className={styles.cardContent}>
                            <div className={styles.iconWrapper}><Users size={32} /></div>
                            <h3>Gestión de Alumnos y Tramitadores</h3>
                            <p>Registro detallado por categoría de licencia. Asigna estudiantes a tramitadores externos y calcula comisiones automáticamente.</p>
                        </div>
                        <div className={styles.cardVisual}>
                            <div className={styles.visualList}>
                                <div className={styles.visualItem} style={{ width: '80%' }}></div>
                                <div className={styles.visualItem} style={{ width: '60%' }}></div>
                                <div className={styles.visualItem} style={{ width: '90%' }}></div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Feature 2 - Payments (Small) */}
                    <motion.div
                        className={styles.card}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <div className={styles.cardContent}>
                            <div className={styles.iconWrapper}><CreditCard size={32} /></div>
                            <h3>Pagos Multicanal</h3>
                            <p>Soporte para Efectivo, Nequi y Sistecrédito con control de abonos.</p>
                        </div>
                    </motion.div>

                    {/* Feature 3 - Exams (Small) */}
                    <motion.div
                        className={styles.card}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className={styles.cardContent}>
                            <div className={styles.iconWrapper}><ShieldCheck size={32} /></div>
                            <h3>Exámenes Tipo CALE</h3>
                            <p>Banco de preguntas actualizado a la normativa 2025 (A2, B1, C1).</p>
                        </div>
                    </motion.div>

                    {/* Feature 4 - Analytics (Wide) */}
                    <motion.div
                        className={`${styles.card} ${styles.cardWide}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <div className={styles.cardContent}>
                            <div className={styles.iconWrapper}><BarChart3 size={32} /></div>
                            <h3>Analíticas y Reportes</h3>
                            <p>Visualiza el rendimiento de tus sedes y tasas de aprobación en tiempo real.</p>
                        </div>
                        <div className={styles.cardVisualGraph}>
                            <div className={styles.bar1}></div>
                            <div className={styles.bar2}></div>
                            <div className={styles.bar3}></div>
                            <div className={styles.bar4}></div>
                        </div>
                    </motion.div>

                    {/* Feature 5 - Fleet (Small) */}
                    <motion.div
                        className={styles.card}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div className={styles.cardContent}>
                            <div className={styles.iconWrapper}><Car size={32} /></div>
                            <h3>Flota Vehicular</h3>
                            <p>Gestión de mantenimiento y asignación de vehículos (Próximamente).</p>
                        </div>
                    </motion.div>



                </div>
            </div>
        </section>
    );
};

export default BentoGrid;

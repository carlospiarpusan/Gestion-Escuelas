import { motion } from 'framer-motion';
import { Zap, Shield, TrendingUp, Clock } from 'lucide-react';
import styles from './Hero.module.css'; // Reusing styles for consistency or create a new one

const Benefits = () => {
    const benefits = [
        {
            icon: Clock,
            title: "Ahorra Tiempo",
            desc: "Automatiza el registro de alumnos y control de pagos. Reduce la carga administrativa en un 40%."
        },
        {
            icon: Shield,
            title: "Cero Errores",
            desc: "Cálculos automáticos de comisiones para tramitadores y validación estricta de requisitos por categoría."
        },
        {
            icon: TrendingUp,
            title: "Aprobación Garantizada",
            desc: "Nuestros simulacros replican la metodología exacta de los nuevos exámenes CALE obligatorios de la ANSV."
        },
        {
            icon: Zap,
            title: "Pagos Al Instante",
            desc: "Soporte nativo para Nequi, Sistecrédito y tarjetas. Registra abonos y mantén el flujo de caja ordenado."
        }
    ];

    return (
        <section style={{ padding: '80px 20px', background: '#fff' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#1d1d1f', marginBottom: '16px' }}>
                        Diseñada para crecer contigo
                    </h2>
                    <p style={{ fontSize: '18px', color: '#86868b', maxWidth: '600px', margin: '0 auto' }}>
                        SchoolOS elimina la fricción operativa para que puedas enfocarte en formar mejores conductores.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
                    {benefits.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            style={{ textAlign: 'center' }}
                        >
                            <div style={{
                                width: '64px', height: '64px', background: '#F5F5F7', borderRadius: '20px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px',
                                color: '#0071e3'
                            }}>
                                <item.icon size={32} />
                            </div>
                            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#1d1d1f' }}>{item.title}</h3>
                            <p style={{ fontSize: '16px', color: '#424245', lineHeight: '1.5' }}>{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Benefits;

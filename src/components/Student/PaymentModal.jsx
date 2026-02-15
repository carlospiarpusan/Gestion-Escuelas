import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, CheckCircle, Lock } from 'lucide-react';
import Button from '../UI/Button';

const PaymentModal = ({ isOpen, onClose, payment, onConfirmPayment }) => {
    const [step, setStep] = useState('review'); // review, processing, success
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) setStep('review');
    }, [isOpen]);

    const handlePay = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep('success');
            setTimeout(() => {
                onConfirmPayment(payment.id);
            }, 2000); // Wait a bit before closing/updating
        }, 1500); // Simulate network request
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0,0,0,0.4)',
                            backdropFilter: 'blur(5px)',
                            zIndex: 50
                        }}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '90%',
                            maxWidth: '450px',
                            background: 'white',
                            borderRadius: '24px',
                            padding: '32px',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                            zIndex: 51,
                            overflow: 'hidden'
                        }}
                    >
                        <button
                            onClick={onClose}
                            style={{
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#86868b'
                            }}
                        >
                            <X size={20} />
                        </button>

                        {step === 'review' && (
                            <>
                                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                                    <div style={{
                                        width: '64px', height: '64px', background: '#F5F5F7', borderRadius: '50%',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
                                        color: '#0071e3'
                                    }}>
                                        <CreditCard size={32} />
                                    </div>
                                    <h2 style={{ fontSize: '24px', fontWeight: 600, margin: '0 0 8px', color: '#1d1d1f' }}>Confirmar Pago</h2>
                                    <p style={{ color: '#86868b', fontSize: '15px', margin: 0 }}>Estás a punto de pagar</p>
                                </div>

                                <div style={{ background: '#F5F5F7', borderRadius: '16px', padding: '20px', marginBottom: '24px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '15px' }}>
                                        <span style={{ color: '#86868b' }}>Concepto</span>
                                        <span style={{ fontWeight: 500, color: '#1d1d1f' }}>{payment?.concept}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '15px' }}>
                                        <span style={{ color: '#86868b' }}>Fecha Vencimiento</span>
                                        <span style={{ fontWeight: 500, color: '#1d1d1f' }}>{payment?.date}</span>
                                    </div>
                                    <div style={{ height: '1px', background: '#e5e5e5', margin: '12px 0' }} />
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '17px', fontWeight: 600 }}>
                                        <span style={{ color: '#1d1d1f' }}>Total</span>
                                        <span style={{ color: '#0071e3' }}>${payment?.amount.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div style={{ marginBottom: '32px' }}>
                                    <p style={{ fontSize: '13px', color: '#86868b', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Lock size={12} /> Método de Pago (Simulado)
                                    </p>
                                    <div style={{
                                        border: '1px solid #d2d2d7', borderRadius: '12px', padding: '16px',
                                        display: 'flex', alignItems: 'center', gap: '16px'
                                    }}>
                                        <div style={{ width: '40px', height: '28px', background: '#1d1d1f', borderRadius: '4px' }}></div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: '15px', fontWeight: 500 }}>•••• •••• •••• 4242</div>
                                            <div style={{ fontSize: '13px', color: '#86868b' }}>Expira 12/28</div>
                                        </div>
                                        <CheckCircle size={20} color="#0071e3" fill="#E3F2FD" />
                                    </div>
                                </div>

                                <Button
                                    variant="primary"
                                    onClick={handlePay}
                                    style={{ width: '100%', justifyContent: 'center' }}
                                    disabled={loading}
                                >
                                    {loading ? 'Procesando...' : `Pagar $${payment?.amount.toFixed(2)}`}
                                </Button>
                            </>
                        )}

                        {step === 'success' && (
                            <div style={{ textAlign: 'center', padding: '20px 0' }}>
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                    style={{
                                        width: '80px', height: '80px', background: '#34C759', borderRadius: '50%',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px',
                                        color: 'white', boxShadow: '0 10px 30px rgba(52, 199, 89, 0.3)'
                                    }}
                                >
                                    <CheckCircle size={40} />
                                </motion.div>
                                <h2 style={{ fontSize: '24px', fontWeight: 600, margin: '0 0 12px', color: '#1d1d1f' }}>¡Pago Exitoso!</h2>
                                <p style={{ color: '#86868b', fontSize: '15px', margin: 0 }}>
                                    Tu pago ha sido procesado correctamente.<br />
                                    Hemos enviado el recibo a tu correo.
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default PaymentModal;

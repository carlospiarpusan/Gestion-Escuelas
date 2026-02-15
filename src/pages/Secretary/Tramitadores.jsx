import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, X, User, CheckCircle, AlertCircle, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';

const Tramitadores = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTramitador, setEditingTramitador] = useState(null);

    // Mock Data
    const [tramitadores, setTramitadores] = useState([
        { id: 1, name: 'Juan Pérez (Gestoria Rápida)', phone: '300 123 4567', active: true, students: 12 },
        { id: 2, name: 'Agencia Vial del Norte', phone: '601 555 0199', active: true, students: 45 },
        { id: 3, name: 'Carlos Independiente', phone: '315 987 6543', active: false, students: 0 },
    ]);

    const [formData, setFormData] = useState({ name: '', phone: '' });

    const filteredTramitadores = tramitadores.filter(t =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOpenModal = (tramitador = null) => {
        if (tramitador) {
            setEditingTramitador(tramitador);
            setFormData({ name: tramitador.name, phone: tramitador.phone });
        } else {
            setEditingTramitador(null);
            setFormData({ name: '', phone: '' });
        }
        setIsModalOpen(true);
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (editingTramitador) {
            setTramitadores(tramitadores.map(t =>
                t.id === editingTramitador.id ? { ...t, ...formData } : t
            ));
        } else {
            setTramitadores([{
                id: Date.now(),
                ...formData,
                active: true,
                students: 0
            }, ...tramitadores]);
        }
        setIsModalOpen(false);
    };

    const toggleStatus = (id) => {
        setTramitadores(tramitadores.map(t =>
            t.id === id ? { ...t, active: !t.active } : t
        ));
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#1d1d1f' }}>Tramitadores</h1>
                    <p style={{ color: '#86868b', fontSize: '16px' }}>Gestión de aliados y agencias externas.</p>
                </div>
                <Button onClick={() => handleOpenModal()}>
                    <Plus size={20} /> Nuevo Tramitador
                </Button>
            </div>

            {/* Search Bar */}
            <div style={{ background: 'white', padding: '16px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', marginBottom: '24px' }}>
                <Input
                    icon={Search}
                    placeholder="Buscar por nombre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ margin: 0 }}
                />
            </div>

            {/* List */}
            <div style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', fontSize: '13px', color: '#86868b', background: '#fafafa', borderBottom: '1px solid #f5f5f7' }}>
                            <th style={{ padding: '20px 32px', fontWeight: 600 }}>Nombre / Agencia</th>
                            <th style={{ padding: '20px 32px', fontWeight: 600 }}>Contacto</th>
                            <th style={{ padding: '20px 32px', fontWeight: 600 }}>Estudiantes Ref.</th>
                            <th style={{ padding: '20px 32px', fontWeight: 600 }}>Estado</th>
                            <th style={{ padding: '20px 32px', fontWeight: 600, textAlign: 'right' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence>
                            {filteredTramitadores.map(t => (
                                <motion.tr
                                    key={t.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    style={{ borderBottom: '1px solid #f5f5f7' }}
                                >
                                    <td style={{ padding: '20px 32px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{
                                                width: '40px', height: '40px', borderRadius: '12px',
                                                background: '#f5f5f7', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                color: '#86868b'
                                            }}>
                                                <User size={20} />
                                            </div>
                                            <span style={{ fontWeight: 600, color: '#1d1d1f' }}>{t.name}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '20px 32px', color: '#6e6e73' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Phone size={14} /> {t.phone}
                                        </div>
                                    </td>
                                    <td style={{ padding: '20px 32px' }}>
                                        <span style={{
                                            background: '#F5F5F7', padding: '4px 10px', borderRadius: '8px',
                                            fontSize: '13px', fontWeight: 600, color: '#1d1d1f'
                                        }}>
                                            {t.students}
                                        </span>
                                    </td>
                                    <td style={{ padding: '20px 32px' }}>
                                        <span style={{
                                            padding: '6px 12px', borderRadius: '980px', fontSize: '13px', fontWeight: 600,
                                            background: t.active ? '#E8F5E9' : '#FFEBEE',
                                            color: t.active ? '#2E7D32' : '#C62828',
                                            display: 'inline-flex', alignItems: 'center', gap: '6px'
                                        }}>
                                            {t.active ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                                            {t.active ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '20px 32px', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                                            <Button variant="ghost" onClick={() => handleOpenModal(t)} style={{ padding: '8px' }}>
                                                <Edit2 size={16} />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                onClick={() => toggleStatus(t.id)}
                                                style={{ padding: '8px', color: t.active ? '#FF3B30' : '#34C759' }}
                                                title={t.active ? "Desactivar" : "Activar"}
                                            >
                                                {t.active ? <Trash2 size={16} /> : <CheckCircle size={16} />}
                                            </Button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50
                    }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            style={{ background: 'white', padding: '32px', borderRadius: '24px', width: '90%', maxWidth: '450px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                <h2 style={{ fontSize: '20px', fontWeight: 700 }}>
                                    {editingTramitador ? 'Editar Tramitador' : 'Nuevo Tramitador'}
                                </h2>
                                <button onClick={() => setIsModalOpen(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#86868b' }}>
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <Input
                                    label="Nombre Completo / Agencia"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    placeholder="Ej. Gestoria Rápida"
                                />
                                <Input
                                    label="Teléfono de Contacto"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    required
                                    placeholder="Ej. 300 123 4567"
                                />

                                <div style={{ paddingTop: '10px', display: 'flex', gap: '12px' }}>
                                    <Button variant="secondary" onClick={() => setIsModalOpen(false)} style={{ flex: 1, justifyContent: 'center' }} type="button">
                                        Cancelar
                                    </Button>
                                    <Button type="submit" style={{ flex: 1, justifyContent: 'center' }}>
                                        Guardar
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Tramitadores;

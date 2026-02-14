import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Save, X, User } from 'lucide-react';

const Tramitadores = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    // Mock Data
    const [tramitadores, setTramitadores] = useState([
        { id: 1, name: 'Juan Tramitador', phone: '3001234567', active: true },
        { id: 2, name: 'Agencia Externa A', phone: '6012345678', active: true },
    ]);

    // Form State
    const [formData, setFormData] = useState({ name: '', phone: '' });

    const filteredTramitadores = tramitadores.filter(t =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOpenModal = (tramitador = null) => {
        if (tramitador) {
            setEditingId(tramitador.id);
            setFormData({ name: tramitador.name, phone: tramitador.phone });
        } else {
            setEditingId(null);
            setFormData({ name: '', phone: '' });
        }
        setIsModalOpen(true);
    };

    const handleSave = (e) => {
        e.preventDefault();
        const newTramitador = {
            id: editingId || Date.now(),
            name: formData.name,
            phone: formData.phone,
            active: true
        };

        if (editingId) {
            setTramitadores(tramitadores.map(t => t.id === editingId ? newTramitador : t));
        } else {
            setTramitadores([newTramitador, ...tramitadores]);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('¿Desactivar este tramitador?')) {
            setTramitadores(tramitadores.map(t => t.id === id ? { ...t, active: false } : t));
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 600 }}>Gestión de Tramitadores</h1>
                    <p style={{ color: '#666', fontSize: '14px' }}>Administra los tramitadores y agencias externas.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    style={{
                        background: '#0071e3', color: 'white', border: 'none', padding: '10px 20px',
                        borderRadius: '8px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
                    }}
                >
                    <Plus size={18} /> Nuevo Tramitador
                </button>
            </div>

            <div style={{ background: 'white', padding: '16px', borderRadius: '12px', border: '1px solid #e5e5e5', display: 'flex', gap: '16px', marginBottom: '24px' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                    <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
                    <input
                        type="text"
                        placeholder="Buscar tramitadores..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%', padding: '8px 8px 8px 36px', borderRadius: '6px',
                            border: '1px solid #ddd', fontSize: '14px'
                        }}
                    />
                </div>
            </div>

            <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e5e5e5', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', fontSize: '13px', color: '#666', background: '#fafafa' }}>
                            <th style={{ padding: '16px' }}>Nombre</th>
                            <th style={{ padding: '16px' }}>Teléfono</th>
                            <th style={{ padding: '16px' }}>Estado</th>
                            <th style={{ padding: '16px', textAlign: 'right' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTramitadores.map(t => (
                            <tr key={t.id} style={{ borderTop: '1px solid #eee' }}>
                                <td style={{ padding: '16px', fontWeight: 500 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ padding: '6px', background: '#E3F2FD', borderRadius: '50%', color: '#0071e3' }}><User size={14} /></div>
                                        {t.name}
                                    </div>
                                </td>
                                <td style={{ padding: '16px', color: '#666' }}>{t.phone || '-'}</td>
                                <td style={{ padding: '16px' }}>
                                    <span style={{
                                        padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600,
                                        background: t.active ? '#E8F5E9' : '#FFEBEE', color: t.active ? '#2E7D32' : '#C62828'
                                    }}>
                                        {t.active ? 'Activo' : 'Inactivo'}
                                    </span>
                                </td>
                                <td style={{ padding: '16px', textAlign: 'right' }}>
                                    <button onClick={() => handleOpenModal(t)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0071e3', marginRight: '12px' }}><Edit size={18} /></button>
                                    <button onClick={() => handleDelete(t.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#FF3B30' }}><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div style={{ background: 'white', width: '400px', padding: '32px', borderRadius: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                            <h2 style={{ fontSize: '20px', fontWeight: 600 }}>{editingId ? 'Editar' : 'Nuevo'} Tramitador</h2>
                            <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
                        </div>

                        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <input
                                placeholder="Nombre Completo"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                                required
                            />
                            <input
                                placeholder="Teléfono (Opcional)"
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                            />

                            <button type="submit" style={{ marginTop: '16px', background: '#0071e3', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
                                Guardar
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tramitadores;

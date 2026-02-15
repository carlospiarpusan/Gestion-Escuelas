import { useState } from 'react';
import { Plus, Search, MoreHorizontal, Shield, Edit2, Trash2, X, School, CheckCircle, AlertCircle, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';

const SchoolsPage = () => {
    const [schools, setSchools] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchSchools = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/schools');
            const data = await res.json();
            // Map DB fields to UI fields if needed
            const mapped = data.map(s => ({
                ...s,
                plan: s.plan_type || s.plan, // Handle DB vs Mock
                active: s.active,
                students: parseInt(s.students) || 0
            }));
            setSchools(mapped);
        } catch (err) {
            console.error('Error fetching schools:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useState(() => {
        fetchSchools();
    }, []);
    // UI State
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);
    const [isCreateAdminModalOpen, setIsCreateAdminModalOpen] = useState(false); // New Modal
    const [activeMenuId, setActiveMenuId] = useState(null);
    const [selectedSchool, setSelectedSchool] = useState(null);
    const [newlyCreatedSchool, setNewlyCreatedSchool] = useState(null); // Store for admin creation

    // Form State
    const [formData, setFormData] = useState({
        name: '', plan: 'Standard', active: true, address: '', phone: '', nit: '', email: ''
    });

    // Admin Form State
    const [adminFormData, setAdminFormData] = useState({
        full_name: '', email: '', password: ''
    });

    const filteredSchools = schools.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOpenNewModal = () => {
        setFormData({ name: '', plan: 'Standard', active: true, address: '', phone: '', nit: '', email: '' });
        setIsNewModalOpen(true);
    };

    const handleOpenEditModal = (school) => {
        setSelectedSchool(school);
        setFormData({ ...school });
        setIsEditModalOpen(true);
        setActiveMenuId(null);
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/schools', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                const createdSchool = await res.json();
                fetchSchools();
                setIsNewModalOpen(false);

                // Open Admin Creation Modal
                setNewlyCreatedSchool(createdSchool);
                setAdminFormData({ full_name: 'Admin ' + createdSchool.name, email: createdSchool.contact_email || '', password: '' });
                setIsCreateAdminModalOpen(true);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleCreateAdmin = async (e) => {
        e.preventDefault();
        if (!newlyCreatedSchool) return;

        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    school_id: newlyCreatedSchool.id,
                    role: 'admin',
                    ...adminFormData
                })
            });

            if (res.ok) {
                alert('Escuela y Administrador creados exitosamente.');
                setIsCreateAdminModalOpen(false);
                setNewlyCreatedSchool(null);
            } else {
                const err = await res.json();
                alert('Error creando admin: ' + err.error);
            }
        } catch (err) {
            console.error(err);
            alert('Error creating admin');
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/schools', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, id: selectedSchool.id })
            });
            if (res.ok) {
                fetchSchools();
                setIsEditModalOpen(false);
                setSelectedSchool(null);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async () => {
        try {
            const res = await fetch(`/api/schools?id=${selectedSchool.id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                fetchSchools();
                setIsDeleteModalOpen(false);
                setSelectedSchool(null);
                setActiveMenuId(null);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '40px' }} onClick={() => setActiveMenuId(null)}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#1d1d1f', marginBottom: '8px' }}>Gestión de Escuelas</h1>
                    <p style={{ color: '#86868b', fontSize: '17px' }}>Control centralizado de las instituciones registradas.</p>
                </div>
                <Button onClick={handleOpenNewModal}>
                    <Plus size={18} /> Nueva Escuela
                </Button>
            </div>

            {/* Filters Bar */}
            <div style={{
                background: 'white', padding: '20px', borderRadius: '24px', marginBottom: '24px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)', display: 'flex', gap: '16px', alignItems: 'center'
            }}>
                <div style={{ flex: 1, position: 'relative' }}>
                    <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#86868b' }} />
                    <input
                        type="text"
                        placeholder="Buscar escuela por nombre..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        onClick={e => e.stopPropagation()}
                        style={{
                            width: '100%', padding: '12px 16px 12px 48px', borderRadius: '14px',
                            border: '1px solid #e5e5e5', background: '#f5f5f7', fontSize: '15px'
                        }}
                    />
                </div>
            </div>

            {/* Table Area */}
            <div style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', background: '#fafafa', fontSize: '12px', color: '#86868b' }}>
                            <th style={{ padding: '16px 24px', fontWeight: 600 }}>ESCUELA</th>
                            <th style={{ padding: '16px 24px', fontWeight: 600 }}>PLAN</th>
                            <th style={{ padding: '16px 24px', fontWeight: 600 }}>ESTUDIANTES</th>
                            <th style={{ padding: '16px 24px', fontWeight: 600 }}>ESTADO</th>
                            <th style={{ padding: '16px 24px', fontWeight: 600, textAlign: 'right' }}>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence mode='popLayout'>
                            {filteredSchools.map(school => (
                                <motion.tr
                                    layout
                                    key={school.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    style={{ borderBottom: '1px solid #f5f5f7' }}
                                >
                                    <td style={{ padding: '16px 24px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#f5f5f7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#86868b' }}>
                                                <Building2 size={18} />
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '14px', fontWeight: 600, color: '#1d1d1f' }}>{school.name}</div>
                                                <div style={{ fontSize: '12px', color: '#86868b' }}>{school.address}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <span style={{
                                            padding: '4px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: 600,
                                            background: school.plan === 'Premium' ? '#E3F2FD' : '#F5F5F7',
                                            color: school.plan === 'Premium' ? '#0071e3' : '#1d1d1f'
                                        }}>
                                            {school.plan}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: 500 }}>{school.students}</td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: school.active ? '#34C759' : '#86868b' }}>
                                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'currentColor' }} />
                                            <span style={{ fontSize: '13px', fontWeight: 500 }}>{school.active ? 'Activo' : 'Inactivo'}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px 24px', textAlign: 'right', position: 'relative' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleOpenEditModal(school); }}
                                                style={{ padding: '8px', borderRadius: '8px', border: 'none', background: 'transparent', color: '#0071e3', cursor: 'pointer' }}
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setSelectedSchool(school); setIsDeleteModalOpen(true); }}
                                                style={{ padding: '8px', borderRadius: '8px', border: 'none', background: 'transparent', color: '#ff3b30', cursor: 'pointer' }}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setActiveMenuId(activeMenuId === school.id ? null : school.id); }}
                                                style={{ padding: '8px', borderRadius: '8px', border: 'none', background: 'transparent', color: '#86868b', cursor: 'pointer' }}
                                            >
                                                <MoreHorizontal size={16} />
                                            </button>

                                            <AnimatePresence>
                                                {activeMenuId === school.id && (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                                        style={{
                                                            position: 'absolute', top: '100%', right: '24px', width: '180px',
                                                            background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(20px)',
                                                            borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                                                            border: '1px solid rgba(0,0,0,0.05)', padding: '8px', zIndex: 100,
                                                            textAlign: 'left'
                                                        }}
                                                        onClick={e => e.stopPropagation()}
                                                    >
                                                        {[
                                                            { label: 'Ver Usuarios', icon: Shield, color: '#1d1d1f' },
                                                            { label: 'Configurar Plan', icon: CheckCircle, color: '#0071e3' },
                                                            { label: 'Detalles Sede', icon: School, color: '#86868b' }
                                                        ].map((item, idx) => (
                                                            <button
                                                                key={idx}
                                                                onClick={() => { alert(item.label); setActiveMenuId(null); }}
                                                                style={{
                                                                    width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                                                                    padding: '10px 12px', borderRadius: '10px', border: 'none',
                                                                    background: 'transparent', fontSize: '13px', fontWeight: 500,
                                                                    color: item.color, cursor: 'pointer', transition: 'background 0.2s'
                                                                }}
                                                            >
                                                                <item.icon size={14} />
                                                                {item.label}
                                                            </button>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>

            {/* New/Edit Modal */}
            <AnimatePresence>
                {(isNewModalOpen || isEditModalOpen) && (
                    <div
                        style={{
                            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                            background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                        }}
                        onClick={() => { setIsNewModalOpen(false); setIsEditModalOpen(false); }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            style={{ background: 'white', width: '500px', padding: '32px', borderRadius: '24px' }}
                            onClick={e => e.stopPropagation()}
                        >
                            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px' }}>
                                {isNewModalOpen ? 'Nueva Escuela' : 'Editar Escuela'}
                            </h3>
                            <form onSubmit={isNewModalOpen ? handleCreate : handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <Input
                                    label="Nombre de la Escuela"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <label style={{ fontSize: '13px', fontWeight: 500, color: '#86868b' }}>Plan</label>
                                        <select
                                            value={formData.plan}
                                            onChange={e => setFormData({ ...formData, plan: e.target.value })}
                                            style={{ padding: '12px', borderRadius: '12px', border: '1px solid #e5e5e5', background: '#f5f5f7' }}
                                        >
                                            <option value="Basic">Basic</option>
                                            <option value="Standard">Standard</option>
                                            <option value="Premium">Premium</option>
                                        </select>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <label style={{ fontSize: '13px', fontWeight: 500, color: '#86868b' }}>Estado</label>
                                        <select
                                            value={formData.active}
                                            onChange={e => setFormData({ ...formData, active: e.target.value === 'true' })}
                                            style={{ padding: '12px', borderRadius: '12px', border: '1px solid #e5e5e5', background: '#f5f5f7' }}
                                        >
                                            <option value="true">Activo</option>
                                            <option value="false">Inactivo</option>
                                        </select>
                                    </div>
                                </div>
                                <Input
                                    label="NIT / Identificación Tributaria"
                                    value={formData.nit}
                                    onChange={e => setFormData({ ...formData, nit: e.target.value })}
                                    required
                                />
                                <Input
                                    label="Correo Electrónico (Contacto)"
                                    type="email"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                                <Input
                                    label="Dirección"
                                    value={formData.address}
                                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                                />
                                <Input
                                    label="Teléfono"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                />

                                <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                                    <Button variant="secondary" type="button" style={{ flex: 1 }} onClick={() => { setIsNewModalOpen(false); setIsEditModalOpen(false); }}>Cancelar</Button>
                                    <Button type="submit" style={{ flex: 1 }}>{isNewModalOpen ? 'Crear' : 'Guardar Cambios'}</Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Delete Modal */}
            <AnimatePresence>
                {isDeleteModalOpen && (
                    <div
                        style={{
                            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                            background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                        }}
                        onClick={() => setIsDeleteModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            style={{ background: 'white', width: '400px', padding: '32px', borderRadius: '24px', textAlign: 'center' }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#FFF5F5', color: '#ff3b30', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                                <Trash2 size={24} />
                            </div>
                            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>¿Eliminar Escuela?</h3>
                            <p style={{ color: '#86868b', fontSize: '15px', marginBottom: '32px' }}>
                                Esta acción eliminará permanentemente la sede <strong>{selectedSchool?.name}</strong> y sus datos asociados.
                            </p>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <Button variant="secondary" style={{ flex: 1 }} onClick={() => setIsDeleteModalOpen(false)}>Cancelar</Button>
                                <Button style={{ flex: 1, background: '#ff3b30' }} onClick={handleDelete}>Confirmar</Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Create Admin Modal */}
            <AnimatePresence>
                {isCreateAdminModalOpen && (
                    <div
                        style={{
                            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                            background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            style={{ background: 'white', width: '500px', padding: '32px', borderRadius: '24px' }}
                        >
                            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                                <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#E3F2FD', color: '#0071e3', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                                    <Shield size={28} />
                                </div>
                                <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>Asignar Administrador</h3>
                                <p style={{ color: '#86868b', fontSize: '15px' }}>
                                    Crea el usuario administrador para <strong>{newlyCreatedSchool?.name}</strong>.
                                </p>
                            </div>

                            <form onSubmit={handleCreateAdmin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <Input
                                    label="Nombre Completo"
                                    value={adminFormData.full_name}
                                    onChange={e => setAdminFormData({ ...adminFormData, full_name: e.target.value })}
                                    required
                                />
                                <Input
                                    label="Correo Electrónico (Login)"
                                    type="email"
                                    value={adminFormData.email}
                                    onChange={e => setAdminFormData({ ...adminFormData, email: e.target.value })}
                                    required
                                />
                                <Input
                                    label="Contraseña"
                                    type="password"
                                    value={adminFormData.password}
                                    onChange={e => setAdminFormData({ ...adminFormData, password: e.target.value })}
                                    required
                                />
                                <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                                    <Button variant="secondary" type="button" style={{ flex: 1 }} onClick={() => setIsCreateAdminModalOpen(false)}>Omitir</Button>
                                    <Button type="submit" style={{ flex: 1 }}>Crear Usuario</Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SchoolsPage;

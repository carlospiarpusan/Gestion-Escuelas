import { useState } from 'react';
import { Plus, Search, MoreVertical, Shield } from 'lucide-react';

const MOCK_SCHOOLS = [
    { id: 1, name: 'Autoescuela Central', plan: 'Premium', students: 120, active: true },
    { id: 2, name: 'Ruta Segura', plan: 'Standard', students: 45, active: true },
    { id: 3, name: 'Conducción Pro', plan: 'Basic', students: 12, active: false },
];

const SchoolsPage = () => {
    const [schools, setSchools] = useState(MOCK_SCHOOLS);
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 600 }}>Escuelas</h1>
                    <p style={{ color: '#666', fontSize: '14px' }}>Gestiona las autoescuelas registradas en la plataforma.</p>
                </div>
                <button style={{
                    backgroundColor: '#0071e3', color: 'white', border: 'none',
                    padding: '8px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px',
                    cursor: 'pointer', fontSize: '14px', fontWeight: 500
                }}>
                    <Plus size={16} /> Nueva Escuela
                </button>
            </div>

            <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e5e5', overflow: 'hidden' }}>
                <div style={{ padding: '16px', borderBottom: '1px solid #eee', display: 'flex', gap: '12px' }}>
                    <div style={{ position: 'relative', width: '300px' }}>
                        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
                        <input
                            type="text"
                            placeholder="Buscar escuela..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%', padding: '8px 12px 8px 36px', borderRadius: '6px',
                                border: '1px solid #ddd', fontSize: '14px'
                            }}
                        />
                    </div>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#f9f9f9', textAlign: 'left', fontSize: '13px', color: '#666' }}>
                            <th style={{ padding: '12px 16px', fontWeight: 500 }}>Nombre</th>
                            <th style={{ padding: '12px 16px', fontWeight: 500 }}>Plan</th>
                            <th style={{ padding: '12px 16px', fontWeight: 500 }}>Estudiantes</th>
                            <th style={{ padding: '12px 16px', fontWeight: 500 }}>Estado</th>
                            <th style={{ padding: '12px 16px', fontWeight: 500 }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schools.map(school => (
                            <tr key={school.id} style={{ borderTop: '1px solid #eee' }}>
                                <td style={{ padding: '12px 16px', fontSize: '14px', fontWeight: 500 }}>{school.name}</td>
                                <td style={{ padding: '12px 16px', fontSize: '14px' }}>
                                    <span style={{
                                        padding: '2px 8px', borderRadius: '12px', fontSize: '11px',
                                        background: school.plan === 'Premium' ? '#E1F5FE' : '#F5F5F7',
                                        color: school.plan === 'Premium' ? '#0277BD' : '#666'
                                    }}>
                                        {school.plan}
                                    </span>
                                </td>
                                <td style={{ padding: '12px 16px', fontSize: '14px' }}>{school.students}</td>
                                <td style={{ padding: '12px 16px', fontSize: '14px' }}>
                                    <span style={{
                                        display: 'inline-flex', alignItems: 'center', gap: '4px',
                                        color: school.active ? '#2E7D32' : '#C62828', fontSize: '13px'
                                    }}>
                                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }}></span>
                                        {school.active ? 'Activo' : 'Inactivo'}
                                    </span>
                                </td>
                                <td style={{ padding: '12px 16px' }}>
                                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}>
                                        <MoreVertical size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SchoolsPage;

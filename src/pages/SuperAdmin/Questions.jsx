import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Save, X } from 'lucide-react';
import { MOCK_QUESTIONS, CATEGORIES } from '../../data/mockQuestions';

const QuestionsPage = () => {
    const [filterCategory, setFilterCategory] = useState('A2');
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    // Mock Data (In real app, fetch from DB)
    const [questions, setQuestions] = useState(MOCK_QUESTIONS);

    // Form State
    const [formData, setFormData] = useState({
        category: 'A2', question: '', optionA: '', optionB: '', optionC: '', optionD: '', correct: 'A'
    });

    const filteredQuestions = questions.filter(q =>
        q.category === filterCategory &&
        q.question.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOpenModal = (q = null) => {
        if (q) {
            setEditingId(q.id);
            setFormData({
                category: q.category,
                question: q.question,
                optionA: q.options.A,
                optionB: q.options.B,
                optionC: q.options.C,
                optionD: q.options.D,
                correct: q.correct
            });
        } else {
            setEditingId(null);
            setFormData({ category: filterCategory, question: '', optionA: '', optionB: '', optionC: '', optionD: '', correct: 'A' });
        }
        setIsModalOpen(true);
    };

    const handleSave = (e) => {
        e.preventDefault();
        const newQuestion = {
            id: editingId || Date.now().toString(),
            category: formData.category,
            question: formData.question,
            options: {
                A: formData.optionA,
                B: formData.optionB,
                C: formData.optionC,
                D: formData.optionD
            },
            correct: formData.correct
        };

        if (editingId) {
            setQuestions(questions.map(q => q.id === editingId ? newQuestion : q));
        } else {
            setQuestions([newQuestion, ...questions]);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('¿Eliminar esta pregunta?')) {
            setQuestions(questions.filter(q => q.id !== id));
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 600 }}>Banco de Preguntas</h1>
                    <p style={{ color: '#666', fontSize: '14px' }}>Gestión centralizada de preguntas de examen.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    style={{
                        background: '#0071e3', color: 'white', border: 'none', padding: '10px 20px',
                        borderRadius: '8px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
                    }}
                >
                    <Plus size={18} /> Nueva Pregunta
                </button>
            </div>

            <div style={{ background: 'white', padding: '16px', borderRadius: '12px', border: '1px solid #e5e5e5', display: 'flex', gap: '16px', marginBottom: '24px' }}>
                <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ddd' }}
                >
                    {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
                <div style={{ flex: 1, position: 'relative' }}>
                    <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
                    <input
                        type="text"
                        placeholder="Buscar preguntas..."
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
                            <th style={{ padding: '16px', width: '60%' }}>Pregunta</th>
                            <th style={{ padding: '16px' }}>Respuesta Correcta</th>
                            <th style={{ padding: '16px', textAlign: 'right' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredQuestions.map(q => (
                            <tr key={q.id} style={{ borderTop: '1px solid #eee' }}>
                                <td style={{ padding: '16px' }}>
                                    <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>{q.question}</div>
                                    <div style={{ fontSize: '12px', color: '#666' }}>
                                        A: {q.options.A} | B: {q.options.B} | ...
                                    </div>
                                </td>
                                <td style={{ padding: '16px' }}>
                                    <span style={{
                                        background: '#E8F5E9', color: '#2E7D32', padding: '4px 8px', borderRadius: '4px',
                                        fontSize: '12px', fontWeight: 600
                                    }}>
                                        Opción {q.correct}
                                    </span>
                                </td>
                                <td style={{ padding: '16px', textAlign: 'right' }}>
                                    <button onClick={() => handleOpenModal(q)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0071e3', marginRight: '12px' }}><Edit size={18} /></button>
                                    <button onClick={() => handleDelete(q.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#FF3B30' }}><Trash2 size={18} /></button>
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
                    <div style={{ background: 'white', width: '600px', padding: '32px', borderRadius: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                            <h2 style={{ fontSize: '20px', fontWeight: 600 }}>{editingId ? 'Editar' : 'Nueva'} Pregunta</h2>
                            <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
                        </div>

                        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <select
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                            >
                                {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                            </select>

                            <textarea
                                placeholder="Texto de la pregunta..."
                                value={formData.question}
                                onChange={e => setFormData({ ...formData, question: e.target.value })}
                                style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd', minHeight: '80px' }}
                                required
                            />

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <input placeholder="Opción A" value={formData.optionA} onChange={e => setFormData({ ...formData, optionA: e.target.value })} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} required />
                                <input placeholder="Opción B" value={formData.optionB} onChange={e => setFormData({ ...formData, optionB: e.target.value })} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} required />
                                <input placeholder="Opción C" value={formData.optionC} onChange={e => setFormData({ ...formData, optionC: e.target.value })} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} required />
                                <input placeholder="Opción D" value={formData.optionD} onChange={e => setFormData({ ...formData, optionD: e.target.value })} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} required />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Respuesta Correcta</label>
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    {['A', 'B', 'C', 'D'].map(opt => (
                                        <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                                            <input
                                                type="radio"
                                                name="correct"
                                                value={opt}
                                                checked={formData.correct === opt}
                                                onChange={e => setFormData({ ...formData, correct: e.target.value })}
                                            />
                                            Opción {opt}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <button type="submit" style={{ marginTop: '16px', background: '#0071e3', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
                                Guardar Pregunta
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuestionsPage;

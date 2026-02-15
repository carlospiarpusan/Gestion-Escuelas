import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Save, X, BookOpen, AlertCircle, HelpCircle, CheckCircle, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { MOCK_QUESTIONS, CATEGORIES } from '../../data/mockQuestions';

const QuestionsPage = () => {
    const [filterCategory, setFilterCategory] = useState('A2');
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Database Data
    const [questions, setQuestions] = useState([]);

    // Fetch questions from API
    const fetchQuestions = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/questions');

            if (!res.ok) {
                const text = await res.text();
                throw new Error(`API Error ${res.status}: ${text.substring(0, 100)}`);
            }

            const data = await res.json();

            if (Array.isArray(data)) {
                // Map the DB names to the frontend component names
                const mappedQuestions = data.map(q => ({
                    id: q.id,
                    category: q.category,
                    question: q.question_text || '',
                    options: {
                        A: q.option_a || '',
                        B: q.option_b || '',
                        C: q.option_c || '',
                        D: q.option_d || ''
                    },
                    correct: q.correct_option || 'A',
                    is_active: q.is_active
                }));
                setQuestions(mappedQuestions);
            } else {
                console.error('API returned non-array:', data);
                if (data.error) throw new Error(data.error);
            }
        } catch (err) {
            console.error('Error fetching questions:', err);
            // Fallback to mock if API fails
            setQuestions(MOCK_QUESTIONS);
            // Optional: show alert to user
            // alert(`Error cargando preguntas: ${err.message}. Se mostrarán datos de prueba.`);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    // Form State
    const [formData, setFormData] = useState({
        category: 'A2', question: '', optionA: '', optionB: '', optionC: '', optionD: '', correct: 'A'
    });

    const filteredQuestions = questions.filter(q =>
        q.category === filterCategory &&
        (q.question || '').toLowerCase().includes(searchTerm.toLowerCase())
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

    const handleSave = async (e) => {
        e.preventDefault();
        const questionData = {
            category: formData.category,
            question_text: formData.question,
            option_a: formData.optionA,
            option_b: formData.optionB,
            option_c: formData.optionC,
            option_d: formData.optionD,
            correct_option: formData.correct
        };

        try {
            const res = await fetch('/api/questions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(questionData)
            });

            if (res.ok) {
                fetchQuestions(); // Refresh list from DB
                setIsModalOpen(false);
            }
        } catch (err) {
            console.error('Error saving question:', err);
            // Local fallback for dev visibility
            const mockNew = {
                id: Date.now().toString(),
                ...questionData,
                question: questionData.question_text,
                options: { A: questionData.option_a, B: questionData.option_b, C: questionData.option_c, D: questionData.option_d },
                correct: questionData.correct_option
            };
            setQuestions([mockNew, ...questions]);
            setIsModalOpen(false);
        }
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setIsLoading(true);
        const reader = new FileReader();

        reader.onload = async (e) => {
            try {
                const content = e.target.result;
                let dataToImport = [];

                if (file.name.endsWith('.json')) {
                    dataToImport = JSON.parse(content);
                } else if (file.name.endsWith('.csv')) {
                    const lines = content.split('\n');
                    const headers = lines[0].split(',').map(h => h.trim());

                    dataToImport = lines.slice(1).filter(l => l.trim()).map(line => {
                        const values = line.split(',').map(v => v.trim());
                        const obj = {};
                        headers.forEach((header, i) => {
                            obj[header] = values[i];
                        });
                        return obj;
                    });
                }

                const res = await fetch('/api/questions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dataToImport)
                });

                if (res.ok) {
                    alert('¡Importación exitosa!');
                    fetchQuestions();
                } else {
                    const err = await res.json();
                    throw new Error(err.error || 'Error al importar');
                }

            } catch (err) {
                console.error('Import Error:', err);
                alert(`Error al importar: ${err.message}`);
            } finally {
                setIsLoading(false);
                event.target.value = '';
            }
        };

        reader.readAsText(file);
    };

    const handleDelete = (id) => {
        if (window.confirm('¿Eliminar esta pregunta?')) {
            setQuestions(questions.filter(q => q.id !== id));
        }
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '40px' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#1d1d1f', marginBottom: '8px' }}>Banco de Preguntas</h1>
                    <p style={{ color: '#86868b', fontSize: '17px' }}>Gestión centralizada de contenidos para exámenes teóricos.</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <input
                        type="file"
                        id="import-file"
                        accept=".csv,.json"
                        style={{ display: 'none' }}
                        onChange={handleFileUpload}
                    />
                    <Button variant="secondary" onClick={() => document.getElementById('import-file').click()}>
                        <Upload size={18} /> Importar Banco
                    </Button>
                    <Button onClick={() => handleOpenModal()}>
                        <Plus size={18} /> Nueva Pregunta
                    </Button>
                </div>
            </div>

            {/* Filters Bar */}
            <div style={{
                background: 'white', padding: '20px', borderRadius: '24px', marginBottom: '24px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)', display: 'flex', gap: '16px', alignItems: 'center'
            }}>
                <div style={{ width: '200px' }}>
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        style={{
                            width: '100%', padding: '12px', borderRadius: '12px',
                            border: '1px solid #e5e5e5', background: '#f5f5f7',
                            fontSize: '14px', fontWeight: 600
                        }}
                    >
                        {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                    </select>
                </div>
                <div style={{ flex: 1, position: 'relative' }}>
                    <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#86868b' }} />
                    <input
                        type="text"
                        placeholder="Buscar preguntas por contenido..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
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
                            <th style={{ padding: '16px 24px', fontWeight: 600, width: '60%' }}>PREGUNTA</th>
                            <th style={{ padding: '16px 24px', fontWeight: 600 }}>RESPUESTA CORRECTA</th>
                            <th style={{ padding: '16px 24px', fontWeight: 600, textAlign: 'right' }}>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence mode='popLayout'>
                            {filteredQuestions.map(q => (
                                <motion.tr
                                    layout
                                    key={q.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    style={{ borderBottom: '1px solid #f5f5f7' }}
                                >
                                    <td style={{ padding: '16px 24px' }}>
                                        <div style={{ display: 'flex', gap: '12px' }}>
                                            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f5f5f7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#86868b', flexShrink: 0 }}>
                                                <HelpCircle size={16} />
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '14px', fontWeight: 600, color: '#1d1d1f', marginBottom: '4px' }}>{q.question}</div>
                                                <div style={{ fontSize: '12px', color: '#86868b' }}>
                                                    A: {q.options.A.substring(0, 30)}... | B: {q.options.B.substring(0, 30)}...
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34C759' }}>
                                            <CheckCircle size={14} />
                                            <span style={{ fontSize: '13px', fontWeight: 600 }}>Opción {q.correct}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                                            <button
                                                onClick={() => handleOpenModal(q)}
                                                style={{ padding: '8px', borderRadius: '8px', border: 'none', background: 'transparent', color: '#0071e3', cursor: 'pointer' }}
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(q.id)}
                                                style={{ padding: '8px', borderRadius: '8px', border: 'none', background: 'transparent', color: '#ff3b30', cursor: 'pointer' }}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
                {filteredQuestions.length === 0 && (
                    <div style={{ padding: '60px', textAlign: 'center', color: '#86868b' }}>
                        <AlertCircle size={40} style={{ margin: '0 auto 16px', opacity: 0.2 }} />
                        <p>No se encontraron preguntas en esta categoría.</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div
                        style={{
                            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                            background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                        }}
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            style={{ background: 'white', width: '600px', padding: '32px', borderRadius: '24px' }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                <h3 style={{ fontSize: '20px', fontWeight: 600 }}>{editingId ? 'Editar' : 'Nueva'} Pregunta</h3>
                                <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#86868b' }}>
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ fontSize: '13px', fontWeight: 500, color: '#86868b' }}>Categoría de Examen</label>
                                    <select
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                        style={{ padding: '12px', borderRadius: '12px', border: '1px solid #e5e5e5', background: '#f5f5f7' }}
                                    >
                                        {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                                    </select>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ fontSize: '13px', fontWeight: 500, color: '#86868b' }}>Enunciado</label>
                                    <textarea
                                        placeholder="Escribe la pregunta aquí..."
                                        value={formData.question}
                                        onChange={e => setFormData({ ...formData, question: e.target.value })}
                                        style={{
                                            padding: '12px', borderRadius: '12px', border: '1px solid #e5e5e5',
                                            background: '#f5f5f7', minHeight: '100px', fontSize: '14px',
                                            fontFamily: 'inherit', resize: 'none'
                                        }}
                                        required
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                    <Input label="Opción A" value={formData.optionA} onChange={e => setFormData({ ...formData, optionA: e.target.value })} required />
                                    <Input label="Opción B" value={formData.optionB} onChange={e => setFormData({ ...formData, optionB: e.target.value })} required />
                                    <Input label="Opción C" value={formData.optionC} onChange={e => setFormData({ ...formData, optionC: e.target.value })} required />
                                    <Input label="Opción D" value={formData.optionD} onChange={e => setFormData({ ...formData, optionD: e.target.value })} required />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '12px', fontSize: '13px', fontWeight: 500, color: '#86868b' }}>Respuesta Correcta</label>
                                    <div style={{ display: 'flex', gap: '12px' }}>
                                        {['A', 'B', 'C', 'D'].map(opt => (
                                            <button
                                                key={opt}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, correct: opt })}
                                                style={{
                                                    flex: 1, padding: '10px', borderRadius: '10px', border: '1px solid #e5e5e5',
                                                    background: formData.correct === opt ? '#1d1d1f' : '#f5f5f7',
                                                    color: formData.correct === opt ? 'white' : '#1d1d1f',
                                                    fontSize: '13px', fontWeight: 600, cursor: 'pointer'
                                                }}
                                            >
                                                Opc {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                                    <Button variant="secondary" type="button" style={{ flex: 1 }} onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                                    <Button type="submit" style={{ flex: 1 }}>Guardar Cambios</Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default QuestionsPage;

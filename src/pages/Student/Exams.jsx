import { useState } from 'react';
import { motion } from 'framer-motion';

const CATEGORIES = [
    { id: 'A2', label: 'Moto (A2)', icon: '🏍️' },
    { id: 'B1', label: 'Auto (B1)', icon: '🚗' },
    { id: 'C1', label: 'Camión (C1)', icon: '🚛' },
    { id: 'C2', label: 'Bus (C2)', icon: '🚌' },
    { id: 'SV', label: 'Seguridad Vial', icon: '🛑' },
];

const MODES = [
    { id: 15, label: 'Rápido (15 preguntas)' },
    { id: 40, label: 'Completo (40 preguntas)' },
];

// Mock Question Generator
const generateQuestions = (category, count) => {
    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        question: `[${category}] Pregunta ${i + 1}: ¿Cuál es la norma específica para este caso?`,
        options: ['Opción A - Correcta', 'Opción B - Incorrecta', 'Opción C - Incorrecta', 'Opción D - Incorrecta'],
        correct: 0
    }));
};

const StudentExams = () => {
    const [step, setStep] = useState('selection'); // selection, exam, result
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedMode, setSelectedMode] = useState(null);

    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(0);

    const handleStart = () => {
        if (!selectedCategory || !selectedMode) return;
        const q = generateQuestions(selectedCategory, selectedMode);
        setQuestions(q);
        setStep('exam');
    };

    const handleAnswer = (optionIndex) => {
        setAnswers({ ...answers, [currentQuestion]: optionIndex });
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            calculateScore();
            setStep('result');
        }
    };

    const calculateScore = () => {
        let correctCount = 0;
        questions.forEach((q, index) => {
            if (answers[index] === q.correct) correctCount++;
        });
        setScore(correctCount);
    };

    const resetExam = () => {
        setStep('selection');
        setSelectedCategory(null);
        setSelectedMode(null);
        setQuestions([]);
        setCurrentQuestion(0);
        setAnswers({});
        setScore(0);
    };

    if (step === 'result') {
        const passed = (score / questions.length) >= 0.8; // 80% to pass
        return (
            <div style={{ maxWidth: '600px', margin: '40px auto', textAlign: 'center' }}>
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
                >
                    <h2 style={{ fontSize: '32px', marginBottom: '16px' }}>
                        {passed ? '¡Aprobado! 🎉' : 'No Aprobado 😔'}
                    </h2>
                    <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>
                        Has respondido correctamente <strong>{score}</strong> de {questions.length} preguntas ({Math.round(score / questions.length * 100)}%).
                    </p>
                    <div style={{ height: '8px', background: '#f0f0f0', borderRadius: '4px', overflow: 'hidden', marginBottom: '30px' }}>
                        <div style={{
                            width: `${(score / questions.length) * 100}%`,
                            height: '100%',
                            background: passed ? '#34C759' : '#FF3B30',
                            transition: 'width 1s ease'
                        }}></div>
                    </div>
                    <button
                        onClick={resetExam}
                        style={{
                            background: '#0071e3', color: 'white', border: 'none', padding: '12px 24px',
                            borderRadius: '980px', fontSize: '16px', fontWeight: 500, cursor: 'pointer'
                        }}
                    >
                        Volver al Menú
                    </button>
                </motion.div>
            </div>
        );
    }

    if (step === 'selection') {
        return (
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 600, marginBottom: '24px' }}>Exámenes de Práctica</h1>

                <div style={{ marginBottom: '32px' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>1. Selecciona Categoría</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
                        {CATEGORIES.map(cat => (
                            <div
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                style={{
                                    padding: '20px', borderRadius: '12px', border: '2px solid', cursor: 'pointer',
                                    textAlign: 'center', transition: 'all 0.2s',
                                    borderColor: selectedCategory === cat.id ? '#0071e3' : '#e5e5e5',
                                    background: selectedCategory === cat.id ? '#E3F2FD' : 'white',
                                    color: selectedCategory === cat.id ? '#0071e3' : '#1d1d1f'
                                }}
                            >
                                <div style={{ fontSize: '32px', marginBottom: '8px' }}>{cat.icon}</div>
                                <div style={{ fontWeight: 500 }}>{cat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ marginBottom: '32px' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>2. Modo de Examen</h3>
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                        {MODES.map(mode => (
                            <div
                                key={mode.id}
                                onClick={() => setSelectedMode(mode.id)}
                                style={{
                                    padding: '16px 24px', borderRadius: '12px', border: '2px solid', cursor: 'pointer',
                                    borderColor: selectedMode === mode.id ? '#0071e3' : '#e5e5e5',
                                    background: selectedMode === mode.id ? '#E3F2FD' : 'white',
                                    color: selectedMode === mode.id ? '#0071e3' : '#1d1d1f',
                                    fontWeight: 500
                                }}
                            >
                                {mode.label}
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    disabled={!selectedCategory || !selectedMode}
                    onClick={handleStart}
                    style={{
                        width: '100%', padding: '16px', borderRadius: '12px', border: 'none',
                        background: (!selectedCategory || !selectedMode) ? '#ccc' : '#1d1d1f',
                        color: 'white', fontSize: '16px', fontWeight: 600, cursor: (!selectedCategory || !selectedMode) ? 'not-allowed' : 'pointer'
                    }}
                >
                    Comenzar Examen
                </button>
            </div>
        );
    }

    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
        <div style={{ maxWidth: '750px', margin: '0 auto' }}>
            <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: '#888', fontWeight: 500 }}>Pregunta {currentQuestion + 1} de {questions.length}</span>
                <span style={{ fontSize: '14px', fontWeight: 500, padding: '4px 12px', background: '#f5f5f7', borderRadius: '12px' }}>
                    {CATEGORIES.find(c => c.id === selectedCategory)?.label}
                </span>
            </div>

            <div style={{ width: '100%', height: '6px', background: '#eee', borderRadius: '3px', marginBottom: '40px' }}>
                <div style={{ width: `${progress}%`, height: '100%', background: '#0071e3', borderRadius: '3px', transition: 'width 0.3s' }}></div>
            </div>

            <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
            >
                <h2 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '32px', lineHeight: 1.4 }}>{question.question}</h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {question.options.map((opt, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleAnswer(idx)}
                            style={{
                                textAlign: 'left', padding: '20px', borderRadius: '12px', border: '1px solid',
                                borderColor: answers[currentQuestion] === idx ? '#0071e3' : '#e5e5e5',
                                background: answers[currentQuestion] === idx ? '#F5FAFF' : 'white',
                                color: answers[currentQuestion] === idx ? '#0071e3' : '#1d1d1f',
                                fontSize: '16px', cursor: 'pointer', transition: 'all 0.2s',
                                position: 'relative', overflow: 'hidden'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{
                                    width: '24px', height: '24px', borderRadius: '50%', border: '2px solid', flexShrink: 0,
                                    borderColor: answers[currentQuestion] === idx ? '#0071e3' : '#ccc',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    {answers[currentQuestion] === idx && <div style={{ width: '12px', height: '12px', background: '#0071e3', borderRadius: '50%' }}></div>}
                                </div>
                                <span>{opt}</span>
                            </div>
                        </button>
                    ))}
                </div>

                <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                        disabled={answers[currentQuestion] === undefined}
                        onClick={handleNext}
                        style={{
                            background: '#0071e3', color: 'white', border: 'none', padding: '12px 32px',
                            borderRadius: '980px', fontSize: '16px', fontWeight: 500, cursor: 'pointer',
                            opacity: answers[currentQuestion] === undefined ? 0.5 : 1
                        }}
                    >
                        {currentQuestion === questions.length - 1 ? 'Finalizar' : 'Siguiente'}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default StudentExams;

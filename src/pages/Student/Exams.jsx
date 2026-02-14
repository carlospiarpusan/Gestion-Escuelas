import { useState } from 'react';
import { motion } from 'framer-motion';

const MOCK_EXAM = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    question: `Pregunta de prueba ${i + 1}: ¿Cuál es la velocidad máxima en zona urbana?`,
    options: ['30 km/h', '50 km/h', '60 km/h', '80 km/h'],
    correct: 1 // Index
}));

const StudentExams = () => {
    const [started, setStarted] = useState(false);
    const [finished, setFinished] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(0);

    const handleStart = () => setStarted(true);

    const handleAnswer = (optionIndex) => {
        setAnswers({ ...answers, [currentQuestion]: optionIndex });
    };

    const handleNext = () => {
        if (currentQuestion < MOCK_EXAM.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            calculateScore();
            setFinished(true);
        }
    };

    const calculateScore = () => {
        let correctCount = 0;
        MOCK_EXAM.forEach((q, index) => {
            if (answers[index] === q.correct) correctCount++;
        });
        setScore(correctCount);
    };

    if (finished) {
        return (
            <div style={{ maxWidth: '600px', margin: '40px auto', textAlign: 'center' }}>
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
                >
                    <h2 style={{ fontSize: '32px', marginBottom: '16px' }}>
                        {score >= 15 ? '¡Aprobado! 🎉' : 'Inténtalo de nuevo 😔'}
                    </h2>
                    <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>
                        Has respondido correctamente <strong>{score}</strong> de {MOCK_EXAM.length} preguntas.
                    </p>
                    <div style={{ height: '8px', background: '#f0f0f0', borderRadius: '4px', overflow: 'hidden', marginBottom: '30px' }}>
                        <div style={{
                            width: `${(score / MOCK_EXAM.length) * 100}%`,
                            height: '100%',
                            background: score >= 15 ? '#34C759' : '#FF3B30',
                            transition: 'width 1s ease'
                        }}></div>
                    </div>
                    <button
                        onClick={() => { setFinished(false); setStarted(false); setCurrentQuestion(0); setAnswers({}); }}
                        style={{
                            background: '#0071e3', color: 'white', border: 'none', padding: '12px 24px',
                            borderRadius: '980px', fontSize: '16px', fontWeight: 500, cursor: 'pointer'
                        }}
                    >
                        Volver a intentar
                    </button>
                </motion.div>
            </div>
        );
    }

    if (!started) {
        return (
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 600, marginBottom: '24px' }}>Exámenes de Práctica</h1>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                    <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e5e5e5' }}>
                        <div style={{ width: '40px', height: '40px', background: '#E3F2FD', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0071e3', marginBottom: '16px' }}>
                            🚗
                        </div>
                        <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Examen General B</h3>
                        <p style={{ color: '#666', fontSize: '14px', marginBottom: '24px' }}>20 preguntas • 30 minutos</p>
                        <button
                            onClick={handleStart}
                            style={{
                                width: '100%', background: '#1d1d1f', color: 'white', border: 'none',
                                padding: '10px', borderRadius: '8px', cursor: 'pointer'
                            }}
                        >
                            Comenzar
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const question = MOCK_EXAM[currentQuestion];
    const progress = ((currentQuestion + 1) / MOCK_EXAM.length) * 100;

    return (
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: '#888', fontWeight: 500 }}>Pregunta {currentQuestion + 1} de {MOCK_EXAM.length}</span>
                <span style={{ fontSize: '14px', color: '#0071e3', fontWeight: 500 }}>Tiempo restante: 29:12</span>
            </div>

            <div style={{ width: '100%', height: '4px', background: '#eee', borderRadius: '2px', marginBottom: '40px' }}>
                <div style={{ width: `${progress}%`, height: '100%', background: '#0071e3', borderRadius: '2px', transition: 'width 0.3s' }}></div>
            </div>

            <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
            >
                <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '32px', lineHeight: 1.3 }}>{question.question}</h2>

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
                                fontSize: '16px', cursor: 'pointer', transition: 'all 0.2s'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                    width: '20px', height: '20px', borderRadius: '50%', border: '2px solid',
                                    borderColor: answers[currentQuestion] === idx ? '#0071e3' : '#ccc',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    {answers[currentQuestion] === idx && <div style={{ width: '10px', height: '10px', background: '#0071e3', borderRadius: '50%' }}></div>}
                                </div>
                                {opt}
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
                        {currentQuestion === MOCK_EXAM.length - 1 ? 'Finalizar' : 'Siguiente'}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default StudentExams;

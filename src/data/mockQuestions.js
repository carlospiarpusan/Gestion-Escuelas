import { A2_QUESTIONS } from './questions/A2';
import { B1_QUESTIONS } from './questions/B1';
import { C1_QUESTIONS } from './questions/C1';
import { C2_QUESTIONS } from './questions/C2';
import { SEGURIDAD_VIAL_QUESTIONS } from './questions/SeguridadVial';

export const MOCK_QUESTIONS = [
    ...SEGURIDAD_VIAL_QUESTIONS,
    ...A2_QUESTIONS,
    ...B1_QUESTIONS,
    ...C1_QUESTIONS,
    ...C2_QUESTIONS
];

export const CATEGORIES = [
    { id: 'A2', label: 'Moto (A2)', icon: '🏍️' },
    { id: 'B1', label: 'Auto (B1)', icon: '🚗' },
    { id: 'C1', label: 'Camión (C1)', icon: '🚛' },
    { id: 'C2', label: 'Bus (C2)', icon: '🚌' },
    { id: 'SEGURIDAD_VIAL', label: 'Seguridad Vial', icon: '🛑' },
];

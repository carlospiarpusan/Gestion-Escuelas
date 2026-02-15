export const MOCK_QUESTIONS = [
    // --- SEGURIDAD VIAL (Common for all) ---
    { id: 'sv1', category: 'SEGURIDAD_VIAL', question: '¿Cuál es la principal causa de accidentes?', options: { A: 'Fallas mecánicas', B: 'Estado de la vía', C: 'Exceso de velocidad', D: 'Clima adverso' }, correct: 'C' },
    { id: 'sv2', category: 'SEGURIDAD_VIAL', question: '¿Qué hacer ante un herido en un accidente?', options: { A: 'Moverlo inmediatamente', B: 'Huir del lugar', C: 'Proteger la zona y llamar al 123', D: 'Darle agua' }, correct: 'C' },
    { id: 'sv3', category: 'SEGURIDAD_VIAL', question: 'El uso del cinturón de seguridad es obligatorio para:', options: { A: 'Solo el conductor', B: 'Solo el copiloto', C: 'Los pasajeros de atrás', D: 'Todos los ocupantes del vehículo' }, correct: 'D' },
    { id: 'sv4', category: 'SEGURIDAD_VIAL', question: 'Una señal amarilla con forma de rombo significa:', options: { A: 'Reglamentaria', B: 'Preventiva', C: 'Informativa', D: 'Transitoria' }, correct: 'B' },
    { id: 'sv5', category: 'SEGURIDAD_VIAL', question: 'La distancia de seguridad a 60km/h debe ser de al menos:', options: { A: '10 metros', B: '20 metros', C: '30 metros', D: '5 metros' }, correct: 'B' },
    { id: 'sv6', category: 'SEGURIDAD_VIAL', question: '¿Cuál es la actitud más peligrosa de un conductor en la vía?', options: { A: 'La impaciencia y la agresividad', B: 'Conducir despacio', C: 'Escuchar música', D: 'Hablar con el pasajero' }, correct: 'A' },
    { id: 'sv7', category: 'SEGURIDAD_VIAL', question: 'Si otro conductor le cierra el paso agresivamente, ¿qué debe hacer?', options: { A: 'Pitar y acelerar', B: 'Mantener la calma y ceder el paso', C: 'Bajarse a discutir', D: 'Seguirlo para reclamarle' }, correct: 'B' },
    { id: 'sv8', category: 'SEGURIDAD_VIAL', question: 'El "Manejo Defensivo" se basa principalmente en:', options: { A: 'Tener un vehículo blindado', B: 'Anticipar errores de otros para evitar accidentes', C: 'Conducir por el carril izquierdo', D: 'Frenar en cada esquina' }, correct: 'B' },
    { id: 'sv9', category: 'SEGURIDAD_VIAL', question: '¿Cómo afecta el consumo de pequeñas cantidades de alcohol a la conducción?', options: { A: 'No afecta', B: 'Retarda reflejos y reduce campo visual', C: 'Mejora la atención', D: 'Quita el sueño' }, correct: 'B' },
    { id: 'sv10', category: 'SEGURIDAD_VIAL', question: '¿Qué es el microsueño?', options: { A: 'Dormir 5 minutos en la berma', B: 'Pérdida de conciencia por segundos', C: 'Una técnica de relajación', D: 'Un fallo del motor' }, correct: 'B' },
    { id: 'sv11', category: 'SEGURIDAD_VIAL', question: 'Si siente fatiga en un viaje largo, lo correcto es:', options: { A: 'Subir volumen del radio', B: 'Tomar energizantes', C: 'Detenerse y descansar', D: 'Acelerar' }, correct: 'C' },
    { id: 'sv12', category: 'SEGURIDAD_VIAL', question: 'En un paso peatonal, ¿quién tiene la prelación?', options: { A: 'El vehículo', B: 'El peatón siempre', C: 'El que llegue primero', D: 'La moto' }, correct: 'B' },
    { id: 'sv13', category: 'SEGURIDAD_VIAL', question: 'Distancia lateral mínima al adelantar un ciclista:', options: { A: '50 cm', B: '1.5 metros', C: '3 metros', D: '10 cm' }, correct: 'B' },
    { id: 'sv14', category: 'SEGURIDAD_VIAL', question: 'El apoyacabezas sirve para:', options: { A: 'Descansar', B: 'Prevenir latigazo cervical', C: 'Estética', D: 'Limpieza' }, correct: 'B' },
    { id: 'sv15', category: 'SEGURIDAD_VIAL', question: 'El "Aquaplaning" se evita:', options: { A: 'Frenando a fondo', B: 'Moviendo el volante', C: 'Reduciendo velocidad y buenas llantas', D: 'Acelerando' }, correct: 'C' },

    // --- A2 (Motos) ---
    { id: 'a2_1', category: 'A2', question: '¿Está permitido adelantar por la derecha?', options: { A: 'Sí, siempre', B: 'No, nunca', C: 'Solo si el otro va muy lento', D: 'En trancones' }, correct: 'B' },
    { id: 'a2_2', category: 'A2', question: 'El casco debe llevarse:', options: { A: 'Desabrochado', B: 'Solo en carretera', C: 'Abrochado y ajustado siempre', D: 'En el codo' }, correct: 'C' },
    { id: 'a2_3', category: 'A2', question: '¿Puede una moto transitar por la cicloruta?', options: { A: 'Sí, si hay trancón', B: 'Solo de noche', C: 'No, está prohibido', D: 'A veces' }, correct: 'C' },
    { id: 'a2_4', category: 'A2', question: 'En moto, el freno delantero es:', options: { A: 'Peligroso', B: 'El que más detiene (70%)', C: 'Auxiliar', D: 'Decorativo' }, correct: 'B' },
    { id: 'a2_5', category: 'A2', question: 'La prenda reflectiva es obligatoria:', options: { A: 'Nunca', B: 'De 6pm a 6am', C: 'Solo en lluvia', D: 'Siempre' }, correct: 'B' },

    // --- B1 (Autos Particulares) ---
    { id: 'b1_1', category: 'B1', question: '¿Cuál es la velocidad máxima en carretera nacional?', options: { A: '80 km/h', B: '120 km/h', C: '90 km/h (o según señalización)', D: '60 km/h' }, correct: 'C' },
    { id: 'b1_2', category: 'B1', question: 'El SOAT cubre:', options: { A: 'Daños materiales', B: 'Robo del auto', C: 'Lesiones corporales a personas', D: 'Fallas mecánicas' }, correct: 'C' },
    { id: 'b1_3', category: 'B1', question: '¿Cuándo se debe hacer la revisión tecnomecánica (primera vez particular)?', options: { A: 'Al año', B: 'A los 2 años', C: 'A los 5 años matrícula', D: 'A los 6 años matrícula (según ley vigente)', correct: 'D' } }, // Note: Logic simplified for exam

    // --- C1 (Servicio Público) ---
    { id: 'c1_1', category: 'C1', question: '¿Qué licencia se necesita para taxi?', options: { A: 'A2', B: 'B1', C: 'C1', D: 'C2' }, correct: 'C' },
    { id: 'c1_2', category: 'C1', question: 'El equipo de carretera debe incluir:', options: { A: 'Solo llanta', B: 'Gato, cruceta, extintor, botiquín, etc.', C: 'Solo señales', D: 'Nada' }, correct: 'B' },

    // --- C2 (Camiones/Buses) ---
    { id: 'c2_1', category: 'C2', question: '¿Cuál es la restricción de carga en puentes?', options: { A: 'No hay', B: 'La señalizada en toneladas', C: '10 toneladas siempre', D: 'Solo de noche' }, correct: 'B' },
    { id: 'c2_2', category: 'C2', question: 'El carril derecho en subidas fuertes es para:', options: { A: 'Adelantar', B: 'Vehículos lentos/pesados', C: 'Motos', D: 'Parquear' }, correct: 'B' },
];

export const CATEGORIES = [
    { id: 'A2', label: 'Moto (A2)', icon: '🏍️' },
    { id: 'B1', label: 'Auto (B1)', icon: '🚗' },
    { id: 'C1', label: 'Camión (C1)', icon: '🚛' },
    { id: 'C2', label: 'Bus (C2)', icon: '🚌' },
    { id: 'SEGURIDAD_VIAL', label: 'Seguridad Vial', icon: '🛑' },
];

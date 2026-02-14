-- DATA SEEDING FOR CALE EXAM (COLOMBIA)
-- FOCUS: BLOCK II - ROAD SAFETY & BEHAVIOR (Actitud, Valoración del Riesgo)

-- Clear previous if needed (optional, handle with care in prod)
-- DELETE FROM questions WHERE category = 'SEGURIDAD_VIAL';

INSERT INTO questions (category, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES
-- 1. Actitud y Comportamiento
('SEGURIDAD_VIAL', '¿Cuál es la actitud más peligrosa de un conductor en la vía?', 'La impaciencia y la agresividad', 'Conducir despacio', 'Escuchar música', 'Hablar con el pasajero', 'A'),
('SEGURIDAD_VIAL', 'Si otro conductor le cierra el paso agresivamente, ¿qué debe hacer?', 'Pitar y acelerar para no dejarse', 'Mantener la calma y ceder el paso para evitar conflictos', 'Bajarse a discutir', 'Seguirlo para reclamarle', 'B'),
('SEGURIDAD_VIAL', 'El "Manejo Defensivo" se basa principalmente en:', 'Tener un vehículo blindado', 'Anticipar los errores de los demás y actuar para evitar accidentes', 'Conducir siempre por el carril izquierdo', 'Frenar bruscamente en cada esquina', 'B'),

-- 2. Factores de Riesgo (Alcohol y Fatiga)
('SEGURIDAD_VIAL', '¿Cómo afecta el consumo de pequeñas cantidades de alcohol a la conducción?', 'No afecta si es poco', 'Retarda los reflejos y reduce el campo visual (Efecto Túnel)', 'Mejora la atención', 'Quita el sueño', 'B'),
('SEGURIDAD_VIAL', '¿Qué es el microsueño?', 'Dormir 5 minutos en la berma', 'Pérdida de conciencia por segundos que puede causar accidentes fatales', 'Una técnica de relajación', 'Un fallo del motor', 'B'),
('SEGURIDAD_VIAL', 'Si va a conducir un trayecto largo y siente fatiga, lo correcto es:', 'Subir el volumen del radio', 'Tomar bebidas energizantes en exceso', 'Detenerse en un lugar seguro y descansar', 'Acelerar para llegar rápido', 'C'),

-- 3. Protección de Vulnerables
('SEGURIDAD_VIAL', 'En una cebra o paso peatonal, ¿quién tiene la prelación absoluta?', 'El vehículo si está en verde', 'El peatón siempre', 'El que llegue primero', 'La moto', 'B'),
('SEGURIDAD_VIAL', 'Al adelantar a un ciclista, la distancia lateral mínima de seguridad es:', '50 cm', '1.5 metros', '3 metros', 'Lo más cerca posible sin tocarlo', 'B'),
('SEGURIDAD_VIAL', '¿Qué es la "Visión Periférica" y por qué es importante?', 'Ver solo al frente', 'Capacidad de detectar movimientos a los lados sin girar la cabeza, vital para ver peatones o motos', 'Ver por el retrovisor', 'Ver el tablero', 'B'),

-- 4. Seguridad Pasiva y Activa
('SEGURIDAD_VIAL', 'El apoyacabezas del asiento sirve principalmente para:', 'Descansar el cuello', 'Prevenir el "Latigazo Cervical" en colisiones traseras', 'Estética del carro', 'Que no se ensucie la silla', 'B'),
('SEGURIDAD_VIAL', '¿Cuál es la función principal del Cinturón de Seguridad?', 'Evitar multas', 'Evitar que los ocupantes salgan expulsados o golpeen el interior del vehículo', 'Sostener al conductor en las curvas', 'Adorno', 'B'),
('SEGURIDAD_VIAL', 'En lluvia, el fenómeno de "Aquaplaning" o Hidroplaneo se evita:', 'Frenando a fondo', 'Moviendo el volante rápido', 'Reduciendo la velocidad y teniendo llantas con buen labrado', 'Acelerando', 'C'),

-- 5. Normas de Comportamiento General
('SEGURIDAD_VIAL', '¿Qué indica el principio de "Solidaridad" en el tránsito?', 'Prestar dinero para peajes', 'Ayudar a quien lo necesite y proteger la vida de los demás usuarios', 'No dejar pasar a nadie', 'Pitar para avisar', 'B'),
('SEGURIDAD_VIAL', 'El uso del celular mientras conduce es peligroso porque:', 'Gasta batería', 'Es una distracción visual, manual y cognitiva que multiplica el riesgo de choque', 'Se le puede caer', 'Interfiere con la radio', 'B'),
('SEGURIDAD_VIAL', '¿Cuál es el límite de velocidad en zonas escolares y residenciales en Colombia?', '60 km/h', '80 km/h', '30 km/h', '50 km/h', 'C');

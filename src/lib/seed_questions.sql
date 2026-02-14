-- SEED DATA FOR QUESTIONS
-- Run this in your Neon SQL Editor

-- SEGURIDAD VIAL (15 Fixed Questions - High Quality)
INSERT INTO questions (category, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES
('SEGURIDAD_VIAL', '¿Cuál es la principal causa de accidentes de tránsito en Colombia?', 'Fallas mecánicas', 'Mal estado de la vía', 'Exceso de velocidad e imprudencia', 'Clima adverso', 'C'),
('SEGURIDAD_VIAL', '¿Qué debe hacer si presencia un accidente de tránsito con heridos?', 'Mover a los heridos inmediatamente', 'Huir del lugar', 'Proteger la zona y llamar al 123', 'Dar agua a los heridos', 'C'),
('SEGURIDAD_VIAL', 'El uso del cinturón de seguridad es obligatorio para:', 'Solo el conductor', 'Conductor y copiloto', 'Solo pasajeros de atrás', 'Todos los ocupantes del vehículo', 'D'),
('SEGURIDAD_VIAL', '¿Qué significa una señal de tránsito en forma de rombo amarillo?', 'Reglamentaria', 'Preventiva', 'Informativa', 'Transitoria', 'B'),
('SEGURIDAD_VIAL', '¿Cuál es la distancia mínima de seguridad ente vehículos a 60 km/h?', '10 metros', '20 metros', '30 metros', '5 metros', 'B'),
('SEGURIDAD_VIAL', '¿Qué indica una doble línea amarilla continua en el centro de la vía?', 'Se puede adelantar con precaución', 'Es un carril exclusivo de motos', 'No se puede adelantar en ningún sentido', 'Se puede parquear', 'C'),
('SEGURIDAD_VIAL', '¿Cuál es el límite máximo de alcohol permitido para conducir?', 'Una cerveza', 'Grado 1', 'Cero (0) grados', 'Depende del peso', 'C'),
('SEGURIDAD_VIAL', '¿Qué documento debe llevar siempre un conductor?', 'Solo la cédula', 'Licencia de conducción, SOAT y Tecnomecánica vigentes', 'Pasaporte', 'Factura de compra del carro', 'B'),
('SEGURIDAD_VIAL', '¿Quién tiene prelación en una intersección sin semáforos?', 'El vehículo más grande', 'El que va más rápido', 'El peatón', 'La moto', 'C'),
('SEGURIDAD_VIAL', '¿Para qué sirven las luces direccionales?', 'Para decorar el vehículo', 'Para indicar maniobras de giro o cambio de carril', 'Para pedir vía', 'Para saludar', 'B'),
('SEGURIDAD_VIAL', '¿Qué debe hacer si un peatón cruza indebidamente?', 'Pitar fuertemente', 'Acelerar para asustarlo', 'Reducir la velocidad y ceder el paso', 'Ignorarlo', 'C'),
('SEGURIDAD_VIAL', '¿Cuál es la velocidad máxima en zonas residenciales?', '60 km/h', '80 km/h', '30 km/h', '50 km/h', 'C'),
('SEGURIDAD_VIAL', '¿Qué significa la luz amarilla del semáforo?', 'Acelerar antes de que cambie a rojo', 'Prepararse para detenerse', 'Vía libre', 'Gire a la derecha', 'B'),
('SEGURIDAD_VIAL', '¿En qué casos es obligatorio el uso del casco en moto?', 'Solo en carretera', 'Siempre, conductor y acompañante', 'Solo de noche', 'Solo si llueve', 'B'),
('SEGURIDAD_VIAL', '¿Qué es la revisión técnico-mecánica?', 'Un impuesto opcional', 'Un chequeo obligatorio de las condiciones del vehículo', 'Un seguro contra accidentes', 'Un trámite para vender el carro', 'B');

-- CATEGORÍA A2 (MOTOS) - BATCH 1 (40 Questions)
INSERT INTO questions (category, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES
('A2', '¿Es permitido adelantar por la derecha en moto?', 'Sí, si hay espacio', 'No, nunca', 'Sí, en trancones', 'Solo en carretera', 'B'),
('A2', '¿Qué elemento de protección es obligatorio y debe estar certificado?', 'Guantes', 'Rodilleras', 'Casco', 'Chaqueta', 'C'),
('A2', '¿Puede una moto transitar por la cicloruta?', 'Sí, si va despacio', 'Solo si hay mucho tráfico', 'No, está prohibido', 'Solo para cortar camino', 'C'),
('A2', '¿Cuál es la profundidad mínima del labrado de las llantas en una moto?', '0.5 mm', '1 mm', '2 mm', 'No importa si están lisas', 'C'),
('A2', '¿Deben las motos llevar las luces encendidas durante el día?', 'No, solo de noche', 'Sí, es obligatorio', 'Solo en carretera', 'Es opcional', 'B'),
('A2', '¿Cuántas personas pueden viajar en una moto estándar?', 'Las que quepan', 'Tres personas', 'Dos personas (Conductor y acompañante)', 'Solo el conductor', 'C'),
('A2', '¿Qué espejo es obligatorio en la moto?', 'Solo el izquierdo', 'Solo el derecho', 'Ambos espejos', 'Ninguno', 'C'),
('A2', '¿Qué debe hacer antes de frenar bruscamente?', 'Mirar los espejos', 'Cerrar los ojos', 'Pitar', 'Levantar los pies', 'A'),
('A2', '¿Cuál es la mejor forma de frenar en piso mojado?', 'Usar solo el freno delantero', 'Usar solo el freno trasero', 'Usar ambos frenos suavemente', 'Frenar a fondo', 'C'),
('A2', '¿Qué indica una señal de pare (STOP)?', 'Disminuir velocidad y seguir', 'Detenerse completamente', 'Ceder el paso sin parar', 'Acelerar', 'B'),
('A2', '¿Puede un menor de 10 años ir de parrillero en moto?', 'Sí, con casco', 'No, está prohibido transportar menores de 10 años', 'Sí, si va abrazado', 'Depende de la ciudad', 'B'),
('A2', '¿Qué es el "punto ciego"?', 'Una zona de la vía sin luz', 'Un área que no se ve en los espejos', 'Un daño en el ojo', 'Una señal de tránsito', 'B'),
('A2', '¿Cómo se debe tomar una curva en moto?', 'Acelerando a fondo', 'Frenando dentro de la curva', 'Reduciendo velocidad antes de entrar y acelerando suavemente al salir', 'Con el embrague presionado', 'C'),
('A2', '¿Qué distancia debe guardar con el vehículo de adelante?', 'La suficiente para reaccionar y frenar (regla de los 3 segundos)', '1 metro', 'Pegado para que no se metan otros', '10 metros fijos', 'A'),
('A2', '¿Qué hacer si se explota una llanta delantera?', 'Frenar bruscamente', 'Soltar el acelerador y mantener el manubrio firme', 'Saltar de la moto', 'Girar rápido', 'B'),
('A2', '¿Es permitido zigzaguear entre vehículos en movimiento?', 'Sí, para avanzar rápido', 'No, es peligroso y prohibido', 'Solo si son carros grandes', 'Sí, si tengo afán', 'B'),
('A2', '¿Qué sanción tiene conducir sin SOAT?', 'Multa e inmovilización de la moto', 'Solo una charla', 'Solo multa', 'Nada', 'A'),
('A2', '¿Cuándo se debe cambiar el aceite de la moto?', 'Cuando se acabe', 'Según el manual del fabricante (aprox. cada 2000-3000 km)', 'Cada año', 'Nunca', 'B'),
('A2', '¿Qué función cumple el chaleco reflectivo?', 'Abrigar', 'Hacer visible al motociclista', 'Es moda', 'Proteger de caídas', 'B'),
('A2', '¿Se puede llevar carga que sobresalga de la moto?', 'Sí, si se amarra bien', 'No, debe respetar las dimensiones del vehículo', 'Sí, hasta 1 metro', 'Solo cajas', 'B'),
('A2', '¿Qué hacer ante un semáforo en rojo intermitente?', 'Pasar rápido', 'Detenerse y ceder el paso (como un Pare)', 'Esperar a que cambie a verde', 'Ignorarlo', 'B'),
('A2', '¿Por dónde se debe adelantar a otro vehículo?', 'Por la izquierda', 'Por la derecha', 'Por la berma', 'Por donde haya espacio', 'A'),
('A2', '¿Qué significa la señal SR-30 (Prohibido girar a la derecha)?', 'Que no se puede voltear a la derecha', 'Que no se puede voltear a la izquierda', 'Que es vía cerrada', 'Que hay un derrumbe', 'A'),
('A2', '¿En qué caso puede invadir el carril de Transmilenio/Bus?', 'Si hay trancón', 'Nunca, es prohibido', 'Si voy tarde', 'Si llueve', 'B'),
('A2', '¿Qué debe revisar antes de iniciar la marcha?', 'Frenos, luces, llantas, aceite, gasolina', 'Solo que prenda', 'El radio', 'La pintura', 'A'),
('A2', '¿Cuál es la posición correcta de las manos en el manubrio?', 'Una mano en el acelerador y otra abajo', 'Ambas manos sujetando el manubrio firmemente', 'Cruzadas', 'Con los dedos en el freno siempre', 'B'),
('A2', '¿Qué efecto tiene el alcohol en la conducción?', 'Mejora los reflejos', 'Disminuye la capacidad de reacción y la visión', 'Quita el sueño', 'Ninguno', 'B'),
('A2', '¿Qué es el aquaplaning?', 'Lavar la moto', 'Pérdida de tracción en superficie mojada', 'Un deporte', 'Frenar en seco', 'B'),
('A2', '¿Si siente sueño conduciendo, qué debe hacer?', 'Tomar café y seguir', 'Acelerar para llegar rápido', 'Detenerse y descansar', 'Abrir el visor', 'C'),
('A2', '¿Qué indica una señal azul cuadrada?', 'Restricción', 'Peligro', 'Servicio o Información', 'Obra en la vía', 'C'),
('A2', '¿Cuál es la velocidad máxima en carretera nacional (si no hay señal)?', '120 km/h', '90 km/h', '50 km/h', 'Sin límite', 'B'),
('A2', '¿Quién es responsable de las infracciones de tránsito?', 'El conductor', 'La moto', 'El policía', 'El dueño de la vía', 'A'),
('A2', '¿Para qué sirve el pito o bocina?', 'Para apurar al de adelante', 'Para prevenir accidentes', 'Para saludar amigos', 'Para expresar rabia', 'B'),
('A2', '¿Se puede parquear sobre un andén?', 'Sí, si es ancho', 'No, es espacio exclusivo de peatones', 'Solo 5 minutos', 'Sí, de noche', 'B'),
('A2', '¿Qué debe hacer si ve una ambulancia con sirena encendida?', 'Acelerar antes que ella', 'Orillarse y ceder el paso', 'Seguirla para abrir camino', 'Ignorarla', 'B'),
('A2', '¿Es obligatorio el seguro de responsabilidad civil?', 'No, es opcional', 'Sí, para transporte público', 'No, solo el SOAT', 'Depende del modelo', 'A'),
('A2', '¿Qué significa una señal naranja?', 'Zona escolar', 'Zona de obras en la vía', 'Hospital', 'Turismo', 'B'),
('A2', '¿Cómo debe llevar el casco el acompañante?', 'En la mano', 'Abrochado y ajustado', 'Sin abrochar', 'En el codo', 'B'),
('A2', '¿Si llueve y se le empaña el visor, qué hace?', 'Quitárselo', 'Abrirlo un poco o usar sistema antiempañante', 'Cerrar los ojos', 'Manejar sin casco', 'B'),
('A2', '¿Qué distancia lateral debe guardar al adelantar una bicicleta?', '50 cm', '1.5 metros', 'Tocarla', '3 metros', 'B');

-- NOTE: Only 40 A2 questions + 15 SV included in this batch to prevent overload.
-- More can be added by the Superadmin using the new interface or running more SQL scripts.

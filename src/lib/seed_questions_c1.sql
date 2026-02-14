-- DATA SEEDING FOR CATEGORY C1 (SERVICIO PÚBLICO)
-- TOPICS: Normas Específicas, Seguridad Pasajeros, Mecánica Diesel/Carga

INSERT INTO questions (category, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES

('C1', '¿Qué documento adicional debe portar un conductor de servicio público?', 'Tarjeta de Operación', 'Pasaporte', 'Registro Civil', 'Carnet de salud', 'A'),
('C1', '¿Cuál es la vigencia de la licencia C1 para menores de 60 años?', '10 años', '3 años', '1 año', 'Indefinida', 'B'),
('C1', 'El equipo de prevención y seguridad (equipo de carretera) en servicio público debe incluir:', 'Extintor de mayor capacidad (según vehículo), botiquín, tacos, herramienta', 'Solo llanta de repuesto', 'Solo gato', 'Nada', 'A'),
('C1', '¿Dónde está prohibido recoger o dejar pasajeros?', 'En los paraderos', 'En la mitad de la calle o zonas no autorizadas', 'En la terminal', 'En la bahía', 'B'),
('C1', '¿Qué es el "Plan Estratégico de Seguridad Vial" (PESV)?', 'Un mapa', 'Instrumento de planificación obligatorio para empresas de transporte para reducir accidentes', 'Un seguro', 'Una norma de tránsito', 'B'),
('C1', '¿Cuál es la velocidad máxima para vehículos de servicio público en carretera?', '120 km/h', '80 km/h (o lo que indice la señal, siendo menor)', '100 km/h', 'Sin límite', 'B'),
('C1', '¿Qué es la "Capacidad Transportadora"?', 'El peso del carro', 'El número máximo de pasajeros o carga autorizado para la empresa', 'La gasolina que le cabe', 'Los puestos', 'B'),
('C1', '¿Puede un vehículo de servicio público negar la prestación del servicio?', 'Sí, si quiere', 'No, salvo causas justificadas por ley (borracho, carga peligrosa)', 'Sí, si llueve', 'Sí, si es muy lejos', 'B'),

-- SEGURIDAD Y PASAJEROS
('C1', 'En caso de accidente con pasajeros, la prioridad es:', 'Salvar el carro', 'Llamar al dueño', 'Proteger y evacuar a los pasajeros, luego llamar autoridades', 'Cobrar el pasaje', 'C'),
('C1', '¿Es permitido llevar pasajeros de pie en un microbús de servicio especial?', 'Sí, si es corto el viaje', 'No, nunca', 'Sí, en hora pico', 'Depende del conductor', 'B'),
('C1', 'El trato al usuario debe ser:', 'Rudo', 'Amable, respetuoso y seguro', 'Indiferente', 'Rápido', 'B'),
('C1', 'Si un pasajero fuma dentro del vehículo, el conductor debe:', 'Fumar con él', 'Pedirle que apague el cigarrillo o se baje (Ley Antitabaco)', 'Ignorarlo', 'Abrir la ventana', 'B'),

-- MECÁNICA (Enfoque Carga/Pesados)
('C1', '¿Qué son los frenos de aire?', 'Frenos que usan aire comprimido para accionar las zapatas (común en pesados)', 'Frenos que enfrían con aire', 'No existen', 'Frenos suaves', 'A'),
('C1', '¿Qué pasa si se descarga el sistema de aire en un camión?', 'Frena mejor', 'Se bloquean los frenos de seguridad y el vehículo no se mueve', 'Anda más rápido', 'Nada', 'B'),
('C1', '¿Para qué sirve el freno de ahogo o motor?', 'Para apagar el carro', 'Para ayudar a detener el vehículo usando la compresión del motor, ahorrando frenos de servicio', 'Para pitar', 'Para acelerar', 'B'),
('C1', 'La revisión de los extintores debe hacerse:', 'Cada año', 'Anualmente (recarga) y revisión visual frecuente', 'Nunca', 'Cuando se use', 'B'),

-- COMPORTAMIENTO
('C1', 'Al conducir un vehículo grande, ¿qué debe tener en cuenta al girar?', 'Que necesita más espacio de giro (Radio de giro amplio)', 'Girar cerradísimo', 'Que gira igual a un auto', 'Nada', 'A'),
('C1', '¿Qué es el "efecto tijera" en un vehículo articulado?', 'Cortar camino', 'Cuando el remolque se pliega sobre la cabina por frenada brusca', 'Una maniobra de parqueo', 'Un tipo de luces', 'B'),
('C1', 'La distancia de seguimiento en vehículos pesados debe ser:', 'Igual a un auto', 'Mayor, debido a que necesitan más distancia para frenar por el peso', 'Menor', 'Pegado al de adelante', 'B'),
('C1', '¿Qué debe revisar en las llantas traseras duales (pachas)?', 'Que no haya piedras entre ellas y tengan la misma presión', 'Que se vean bonitas', 'Nada', 'Que estén lisas', 'A'),

-- NORMAS ESPECÍFICAS
('C1', '¿Qué es la Planilla de Viaje Ocasional?', 'Un permiso para salir del radio de acción autorizado (ej. Taxis viajando fuera de ciudad)', 'Una factura', 'Un mapa', 'Un seguro', 'A'),
('C1', '¿Quién es responsable de que los pasajeros usen cinturón (si aplica)?', 'Nadie', 'El conductor debe exigir su uso', 'El pasajero solo', 'La policía', 'B'),
('C1', '¿Qué indica la placa blanca en Colombia?', 'Vehículo Particular', 'Vehículo de Servicio Público', 'Vehículo Diplomático', 'Vehículo Clásico', 'B'),
('C1', '¿Puede un Taxi prestar servicio de colectivo?', 'Sí', 'No, está prohibido (servicio individual vs colectivo)', 'A veces', 'En la noche sí', 'B'),

-- SEÑALES
('C1', 'La señal de "Altura Máxima Permitida" es vital para:', 'Motos', 'Vehículos de carga y buses para no chocar con puentes', 'Peatones', 'Bicicletas', 'B'),
('C1', 'La señal de "Peso Máximo Permitido" restringe:', 'La velocidad', 'El peso bruto vehicular para proteger puentes/vías', 'El número de pasajeros', 'El horario', 'B'),
('C1', '¿Qué significa la señal "Desvío para camiones"?', 'Que los camiones deben tomar esa ruta obligatoriamente', 'Sugerencia', 'Prohibido camiones', 'Zona de carga', 'A'),
('C1', 'En un descenso peligroso, la señal recomienda:', 'Bajar en cambio (caja) y no abusar de frenos', 'Bajar en neutro', 'Acelerar', 'Apagar motor', 'A'),

-- ADICIONALES
('C1', '¿Qué es el SOAT?', 'Seguro Obligatorio de Accidentes de Tránsito', 'Seguro de robo', 'Seguro de vida', 'Impuesto', 'A'),
('C1', '¿Qué cubre el SOAT?', 'Daños al vehículo (latas)', 'Atención médica a víctimas (conductores, pasajeros, peatones)', 'Robo del carro', 'Multas', 'B'),
('C1', 'Si transporta carga, esta debe ir:', 'Suelta', 'Debidamente empacada, rotulada y asegurada', 'Como caiga', 'En el techo sin amarrar', 'B'),
('C1', '¿Qué es el "Manifiesto de Carga"?', 'Documento que ampara el transporte de mercancías ante autoridades', 'Una carta', 'La licencia', 'El pase', 'A'),
('C1', 'El exceso de horas de conducción genera:', 'Más dinero', 'Fatiga y alto riesgo de micro-sueños', 'Mejor experiencia', 'Nada', 'B'),
('C1', '¿Qué hacer si un pasajero sufre un infarto?', 'Bajarlo del bus', 'Prestar primeros auxilios y dirigirse al hospital más cercano o llamar ambulancia', 'Seguir la ruta', 'Cobrarle', 'B'),
('C1', '¿Es permitido tanquear con pasajeros a bordo (servicio público)?', 'Sí', 'No, deben descender del vehículo (seguridad)', 'Sí, si es rápido', 'Depende de la bomba', 'B'),
('C1', '¿Qué indica un rombo naranja con un número en un camión cisterna?', 'El precio', 'Identificación de Materiales Peligrosos (Código UN)', 'El teléfono', 'La placa', 'B'),
('C1', '¿Qué debe hacer antes de reversar un vehículo grande?', 'Pitar', 'Verificar visualmente o con ayuda que no haya nadie atrás (punto ciego gigante)', 'Acelerar', 'Nada', 'B'),
('C1', 'La licencia de conducción vigente es válida en:', 'Solo mi ciudad', 'Todo el territorio nacional', 'Todo el mundo', 'Solo en el barrio', 'B'),
('C1', '¿Por qué carril deben transitar los vehículos pesados/lentos?', 'Izquierdo', 'Derecho', 'Central', 'Cualquiera', 'B'),
('C1', '¿Qué sanción tiene prestar servicio público en vehículo particular (Uber/Indriver ilegal)?', 'Multa e inmovilización por transporte informal', 'Nada', 'Solo multa', 'Aviso', 'A');

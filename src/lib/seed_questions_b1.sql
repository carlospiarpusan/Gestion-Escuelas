-- DATA SEEDING FOR CATEGORY B1 (AUTOMÓVILES)
-- MIXED TOPICS: Normas, Señales, Mecánica, Seguridad

INSERT INTO questions (category, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES

-- NORMAS DE TRÁNSITO (20%)
('B1', '¿Qué documentos debe portar obligatoriamente un conductor de vehículo particular?', 'Cédula y Licencia', 'Licencia, SOAT, Tecnomecánica y Tarjeta de Propiedad', 'Solo el SOAT', 'Pase y Cédula', 'B'),
('B1', '¿Con qué frecuencia se debe renovar la Licencia de Conducción para particulares menores de 60 años?', 'Cada año', 'Cada 10 años', 'Cada 5 años', 'Nunca vence', 'B'),
('B1', '¿Cuál es la sanción por conducir en estado de embriaguez?', 'Multa, inmovilización y suspensión/cancelación de la licencia', 'Solo multa', 'Solo inmovilización', 'Curso pedagógico', 'A'),
('B1', '¿Es permitido adelantar en curva?', 'Sí, con cuidado', 'No, nunca', 'Sí, si no viene nadie', 'Solo de día', 'B'),
('B1', '¿Qué vehículos tienen prioridad en la vía?', 'Taxis', 'Particulares de alta gama', 'Vehículos de emergencia (Ambulancias, Bomberos) con señales activas', 'Motos', 'C'),
('B1', 'La berma es un espacio destinado para:', 'Adelantar', 'Parquear a dormir', 'Caso de emergencia o estacionamiento momentáneo', 'Circular si hay trancón', 'C'),
('B1', '¿En qué sentido de la vía se debe parquear?', 'En cualquiera', 'En el sentido contrario', 'En el mismo sentido de circulación', 'Atravesado', 'C'),
('B1', '¿Qué prohibición tiene la doble línea amarilla continua?', 'Prohibido adelantar en ambos sentidos', 'Prohibido pitar', 'Prohibido frenar', 'Prohibido girar', 'A'),

-- SEÑALIZACIÓN (30%)
('B1', 'Las señales de color ROJO y forma circular son:', 'Preventivas', 'Informativas', 'Reglamentarias', 'Turísticas', 'C'),
('B1', 'Las señales de color AMARILLO y forma de rombo son:', 'Reglamentarias', 'Informativas', 'Preventivas', 'De obra', 'C'),
('B1', 'Una señal cuadrada azul con una letra "H" blanca indica:', 'Hotel', 'Hospital', 'Hidrante', 'Helipuerto', 'B'),
('B1', '¿Qué significa la señal SR-01 (Pare)?', 'Detenerse totalmente', 'Bajar velocidad', 'Seguir derecho', 'Girar', 'A'),
('B1', '¿Qué indica una flecha blanca en el pavimento apuntando a la izquierda?', 'Que el carril es solo para girar a la izquierda', 'Que es contravía', 'Que mire a la izquierda', 'Decoración', 'A'),
('B1', 'La señal SP-46 "Ciclistas en la vía" advierte:', 'Que es prohibido para ciclistas', 'La presencia de ciclistas en la vía', 'Venta de bicicletas', 'Cicloruta exclusiva', 'B'),
('B1', '¿Qué significa un semáforo con luz ROJA intermitente?', 'Peligro', 'Equivale a un Pare', 'Siga con precaución', 'Semáforo dañado', 'B'),
('B1', 'La señal triangular con borde rojo "Ceda el Paso" obliga a:', 'Detenerse siempre', 'Disminuir velocidad y detenerse si es necesario para ceder prelación', 'Acelerar', 'Pitar', 'B'),
('B1', '¿Qué significan las líneas transversales blancas en una intersección?', 'Línea de pare (detenerse antes de ella)', 'Decoración', 'Zona peatonal', 'Final de la vía', 'A'),
('B1', 'Las señales naranjas indican:', 'Zona escolar', 'Zona turística', 'Zonas de obras o trabajos en la vía', 'Hospitales', 'C'),
('B1', '¿Qué indica la señal de "Prohibido Parquear"?', 'No se puede detener ni un segundo', 'No se puede estacionar/abandonar el vehículo, pero sí detenerse momentáneamente', 'Se puede parquear pagando', 'Nada', 'B'),
('B1', 'La señal informativa "Puesto de Primeros Auxilios" es de color:', 'Rojo', 'Azul', 'Verde', 'Amarillo', 'B'),

-- MECÁNICA BÁSICA (20%)
('B1', '¿Qué líquido NO se debe revisar con el motor caliente?', 'Líquido de frenos', 'Agua del limpiabrisas', 'Refrigerante del radiador (Peligro de quemadura)', 'Aceite de dirección', 'C'),
('B1', '¿Para qué sirve la varilla de medición del aceite?', 'Para ver el color', 'Para medir el nivel y calidad del aceite del motor', 'Para revolver el aceite', 'Para limpiar', 'B'),
('B1', 'Si se enciende el testigo de "Batería" en el tablero con el carro andando, indica:', 'Batería llena', 'Fallo en el sistema de carga (Alternador)', 'Que debe apagar las luces', 'Nada grave', 'B'),
('B1', '¿Qué función cumple el sistema de frenos ABS?', 'Frenar más fuerte', 'Evitar que las ruedas se bloqueen al frenar a fondo, manteniendo la dirección', 'Frenar solo', 'Ahorrar pastillas', 'B'),
('B1', '¿Cada cuánto se recomienda alinear y balancear las llantas?', 'Cada 10.000 km o si siente vibraciones', 'Nunca', 'Cada mes', 'Cuando se pinchen', 'A'),
('B1', '¿Qué indica un humo azul saliendo del escape?', 'Motor quemando aceite', 'Motor frío', 'Mala gasolina', 'Agua en el motor', 'A'),
('B1', 'La presión de aire de las llantas se debe calibrar:', 'Con las llantas calientes', 'Con las llantas frías', 'Da igual', 'Cuando estén desinfladas', 'B'),
('B1', '¿Qué fluido es vital para la dirección hidráulica?', 'Aceite de motor', 'Líquido de frenos', 'Aceite hidráulico o de dirección', 'Agua', 'C'),

-- SEGURIDAD VIAL Y COMPORTAMIENTO (30%)
('B1', '¿Qué es la distancia de reacción?', 'Lo que recorre el vehículo mientras el conductor percibe el peligro y pisa el freno', 'La distancia de frenado', '3 metros', 'El largo del carro', 'A'),
('B1', 'Al conducir con lluvia intensa, ¿qué luces debe encender?', 'Luces altas', 'Luces medias y/o estacionarias si se detiene', 'Ninguna', 'Solo las de adentro', 'B'),
('B1', 'El punto ciego en un automóvil se minimiza:', 'Quitando los espejos', 'Ajustando correctamente los espejos y girando levemente la cabeza antes de cambiar de carril', 'Acelerando', 'Cerrando los ojos', 'B'),
('B1', '¿Cuál es la forma más segura de tomar una curva en carretera?', 'Frenar dentro de la curva', 'Entrar despacio, acelerar suavemente durante y salir acelerando', 'Entrar rápido', 'En neutro', 'B'),
('B1', 'Si se estalla una llanta trasera, usted debe:', 'Frenar a fondo', 'Sostener el volante firme y dejar que el vehículo se detenga suavemente', 'Girar bruscamente', 'Acelerar', 'B'),
('B1', 'Bajar una pendiente pronunciada en "Neutro" es peligroso porque:', 'Se apaga el carro', 'Se pierde el control del motor (freno de motor) y se calientan los frenos', 'Gasta más gasolina', 'Se daña la caja', 'B'),
('B1', '¿Qué debe hacer si el carro de atrás viene muy pegado?', 'Frenar para asustarlo', 'Aumentar la distancia con el carro de adelante para tener más espacio de frenado', 'Insultarlo', 'Acelerar', 'B'),
('B1', 'El uso del cinturón de seguridad en los asientos traseros es:', 'Opcional', 'Obligatorio en todos los vehículos modelo 2004 en adelante', 'Solo para niños', 'Prohibido', 'B'),
('B1', 'Los niños menores de 10 años deben viajar:', 'En el asiento delantero cargados', 'En el asiento trasero (y con silla especial si son pequeños)', 'En las piernas del conductor', 'En el baúl', 'B'),
('B1', '¿Qué es manejar "A la defensiva"?', 'Manejar lento', 'Manejar con miedo', 'Conducir previendo situaciones de peligro y errores ajenos', 'No dejar pasar a nadie', 'C'),
('B1', 'Al encandilarse con las luces de un carro en sentido contrario, debe:', 'Ponerle las altas también', 'Mirar hacia la línea blanca del borde derecho de la vía', 'Cerrar los ojos', 'Frenar en seco', 'B'),
('B1', '¿Cuál es el principal efecto de la velocidad en un accidente?', 'A mayor velocidad, mayor gravedad de las lesiones (energía cinética)', 'No influye', 'Menos daño', 'Mejor control', 'A');

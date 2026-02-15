import { useState, useEffect } from 'react';
import { useStore } from '../store';
import { Clock, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import type { PreguntaExamen } from '../types';

const preguntasBase: PreguntaExamen[] = [
  {
    id: '1',
    pregunta: '¿Cuál es la distancia mínima de seguridad en ciudad?',
    opciones: ['3 segundos', '2 segundos', '1 segundo', '4 segundos'],
    respuestaCorrecta: 0,
    categoria: 'normas',
  },
  {
    id: '2',
    pregunta: '¿A qué velocidad máxima se puede circular en una vía urbana?',
    opciones: ['40 km/h', '50 km/h', '60 km/h', '70 km/h'],
    respuestaCorrecta: 1,
    categoria: 'normas',
  },
  {
    id: '3',
    pregunta: '¿Qué indica una señal triangular con borde rojo?',
    opciones: ['Prohibición', 'Peligro', 'Obligación', 'Información'],
    respuestaCorrecta: 1,
    categoria: 'señales',
  },
  {
    id: '4',
    pregunta: '¿Cuál es la tasa máxima de alcohol permitida para conductores noveles?',
    opciones: ['0.0 g/l', '0.15 g/l', '0.25 g/l', '0.5 g/l'],
    respuestaCorrecta: 1,
    categoria: 'normas',
  },
  {
    id: '5',
    pregunta: '¿Qué debe hacer al ver un semáforo en ámbar?',
    opciones: ['Acelerar', 'Detenerse salvo que no sea seguro', 'Continuar', 'Tocar el claxon'],
    respuestaCorrecta: 1,
    categoria: 'normas',
  },
  {
    id: '6',
    pregunta: '¿Cuándo es obligatorio el uso de luces de cruce?',
    opciones: [
      'Solo de noche',
      'Siempre que circule',
      'Solo en túneles',
      'De noche y en condiciones de baja visibilidad',
    ],
    respuestaCorrecta: 3,
    categoria: 'seguridad',
  },
  {
    id: '7',
    pregunta: '¿Qué significa una línea continua en la calzada?',
    opciones: [
      'Se puede adelantar',
      'Prohibido cruzarla',
      'Carril especial',
      'Zona de estacionamiento',
    ],
    respuestaCorrecta: 1,
    categoria: 'señales',
  },
  {
    id: '8',
    pregunta: '¿Cada cuánto tiempo debe revisarse la presión de los neumáticos?',
    opciones: ['Cada mes', 'Cada 6 meses', 'Cada año', 'Cada 2 años'],
    respuestaCorrecta: 0,
    categoria: 'mecánica',
  },
  {
    id: '9',
    pregunta: '¿Qué indica una señal circular con fondo azul?',
    opciones: ['Prohibición', 'Peligro', 'Obligación', 'Información'],
    respuestaCorrecta: 2,
    categoria: 'señales',
  },
  {
    id: '10',
    pregunta: '¿Cuál es la velocidad máxima en autopista?',
    opciones: ['100 km/h', '110 km/h', '120 km/h', '130 km/h'],
    respuestaCorrecta: 2,
    categoria: 'normas',
  },
  {
    id: '11',
    pregunta: '¿A qué distancia debe colocarse el triángulo de emergencia?',
    opciones: ['25 metros', '50 metros', '75 metros', '100 metros'],
    respuestaCorrecta: 1,
    categoria: 'seguridad',
  },
  {
    id: '12',
    pregunta: '¿Qué indica una señal octogonal?',
    opciones: ['Ceda el paso', 'Stop', 'Prohibido', 'Peligro'],
    respuestaCorrecta: 1,
    categoria: 'señales',
  },
  {
    id: '13',
    pregunta: '¿Cuál es la profundidad mínima del dibujo de los neumáticos?',
    opciones: ['1.0 mm', '1.6 mm', '2.0 mm', '2.6 mm'],
    respuestaCorrecta: 1,
    categoria: 'mecánica',
  },
  {
    id: '14',
    pregunta: '¿Qué debe hacer antes de cambiar de carril?',
    opciones: [
      'Acelerar',
      'Señalizar y comprobar ángulos muertos',
      'Solo mirar el retrovisor',
      'Tocar el claxon',
    ],
    respuestaCorrecta: 1,
    categoria: 'seguridad',
  },
  {
    id: '15',
    pregunta: '¿Cuántos puntos tiene el carnet de conducir inicialmente?',
    opciones: ['8 puntos', '10 puntos', '12 puntos', '15 puntos'],
    respuestaCorrecta: 0,
    categoria: 'normas',
  },
  {
    id: '16',
    pregunta: '¿Está permitido usar el teléfono móvil mientras se conduce?',
    opciones: [
      'Sí, siempre',
      'Solo con manos libres',
      'Solo para emergencias',
      'Nunca',
    ],
    respuestaCorrecta: 1,
    categoria: 'seguridad',
  },
  {
    id: '17',
    pregunta: '¿Qué indica una línea discontinua en la calzada?',
    opciones: [
      'Prohibido adelantar',
      'Se puede cruzar con precaución',
      'Carril especial',
      'Zona peligrosa',
    ],
    respuestaCorrecta: 1,
    categoria: 'señales',
  },
  {
    id: '18',
    pregunta: '¿Con qué frecuencia debe pasar la ITV un coche nuevo?',
    opciones: ['Cada año', 'A los 4 años', 'A los 2 años', 'A los 5 años'],
    respuestaCorrecta: 1,
    categoria: 'mecánica',
  },
  {
    id: '19',
    pregunta: '¿Cuál es la velocidad máxima en carretera convencional?',
    opciones: ['80 km/h', '90 km/h', '100 km/h', '110 km/h'],
    respuestaCorrecta: 1,
    categoria: 'normas',
  },
  {
    id: '20',
    pregunta: '¿Qué debe hacer al aproximarse a un paso de peatones?',
    opciones: [
      'Acelerar',
      'Reducir velocidad y ceder el paso',
      'Tocar el claxon',
      'Mantener la velocidad',
    ],
    respuestaCorrecta: 1,
    categoria: 'seguridad',
  },
];

export default function ExamenSimulacro() {
  const [preguntas] = useState<PreguntaExamen[]>(preguntasBase);
  const [respuestas, setRespuestas] = useState<number[]>(Array(20).fill(-1));
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [tiempoRestante, setTiempoRestante] = useState(30 * 60);
  const [examenFinalizado, setExamenFinalizado] = useState(false);
  const [mostrarResultados, setMostrarResultados] = useState(false);

  const currentUser = useStore((state) => state.currentUser);
  const addResultadoExamen = useStore((state) => state.addResultadoExamen);

  useEffect(() => {
    if (examenFinalizado) return;

    const timer = setInterval(() => {
      setTiempoRestante((prev) => {
        if (prev <= 1) {
          finalizarExamen();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examenFinalizado]);

  const seleccionarRespuesta = (indice: number) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[preguntaActual] = indice;
    setRespuestas(nuevasRespuestas);
  };

  const siguientePregunta = () => {
    if (preguntaActual < preguntas.length - 1) {
      setPreguntaActual(preguntaActual + 1);
    }
  };

  const anteriorPregunta = () => {
    if (preguntaActual > 0) {
      setPreguntaActual(preguntaActual - 1);
    }
  };

  const finalizarExamen = () => {
    setExamenFinalizado(true);
    
    const correctas = respuestas.filter(
      (resp, idx) => resp === preguntas[idx].respuestaCorrecta
    ).length;
    const puntuacion = Math.round((correctas / preguntas.length) * 100);
    const aprobado = puntuacion >= 90;
    const tiempoTotal = 30 * 60 - tiempoRestante;

    addResultadoExamen({
      alumnoId: currentUser!.id,
      escuelaId: currentUser!.escuelaId!,
      preguntas,
      respuestas,
      puntuacion,
      aprobado,
      tiempoTotal,
    });

    setMostrarResultados(true);
  };

  const calcularResultados = () => {
    const correctas = respuestas.filter(
      (resp, idx) => resp === preguntas[idx].respuestaCorrecta
    ).length;
    const incorrectas = respuestas.filter(
      (resp, idx) => resp !== -1 && resp !== preguntas[idx].respuestaCorrecta
    ).length;
    const sinResponder = respuestas.filter((resp) => resp === -1).length;
    const puntuacion = Math.round((correctas / preguntas.length) * 100);
    const aprobado = puntuacion >= 90;

    return { correctas, incorrectas, sinResponder, puntuacion, aprobado };
  };

  const formatearTiempo = (segundos: number) => {
    const mins = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resultados = calcularResultados();

  if (mostrarResultados) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <button
            onClick={() => (window.location.hash = '#/')}
            className="btn btn-secondary flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Dashboard
          </button>

          <div className="card">
            <div className="text-center mb-6">
              <div
                className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
                  resultados.aprobado ? 'bg-green-100' : 'bg-red-100'
                }`}
              >
                {resultados.aprobado ? (
                  <CheckCircle className="w-12 h-12 text-green-600" />
                ) : (
                  <XCircle className="w-12 h-12 text-red-600" />
                )}
              </div>
              <h2 className="text-3xl font-bold mb-2">
                {resultados.aprobado ? '¡APROBADO!' : 'NO APROBADO'}
              </h2>
              <p className="text-5xl font-bold text-gray-900 mb-2">{resultados.puntuacion}%</p>
              <p className="text-gray-600">
                Se requiere un mínimo de 90% para aprobar (18 preguntas correctas)
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">{resultados.correctas}</p>
                <p className="text-sm text-gray-600">Correctas</p>
              </div>

              <div className="text-center p-4 bg-red-50 rounded-lg">
                <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-red-600">{resultados.incorrectas}</p>
                <p className="text-sm text-gray-600">Incorrectas</p>
              </div>

              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Clock className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-600">{resultados.sinResponder}</p>
                <p className="text-sm text-gray-600">Sin responder</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Revisión de respuestas</h3>
              {preguntas.map((pregunta, idx) => {
                const miRespuesta = respuestas[idx];
                const esCorrecta = miRespuesta === pregunta.respuestaCorrecta;
                const respondida = miRespuesta !== -1;

                return (
                  <div
                    key={pregunta.id}
                    className={`p-4 rounded-lg border-2 ${
                      !respondida
                        ? 'border-gray-300 bg-gray-50'
                        : esCorrecta
                        ? 'border-green-300 bg-green-50'
                        : 'border-red-300 bg-red-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        {!respondida ? (
                          <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-white text-sm font-bold">
                            {idx + 1}
                          </div>
                        ) : esCorrecta ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : (
                          <XCircle className="w-6 h-6 text-red-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 mb-2">{pregunta.pregunta}</p>
                        <div className="space-y-1">
                          {pregunta.opciones.map((opcion, opIdx) => (
                            <div
                              key={opIdx}
                              className={`text-sm px-3 py-1 rounded ${
                                opIdx === pregunta.respuestaCorrecta
                                  ? 'bg-green-100 text-green-800 font-medium'
                                  : opIdx === miRespuesta && !esCorrecta
                                  ? 'bg-red-100 text-red-800'
                                  : 'text-gray-600'
                              }`}
                            >
                              {opIdx === pregunta.respuestaCorrecta && '✓ '}
                              {opIdx === miRespuesta && opIdx !== pregunta.respuestaCorrecta && '✗ '}
                              {opcion}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex gap-4">
              <button
                onClick={() => window.location.reload()}
                className="btn btn-primary flex-1"
              >
                Realizar otro examen
              </button>
              <button
                onClick={() => (window.location.hash = '#/')}
                className="btn btn-secondary flex-1"
              >
                Volver al Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const pregunta = preguntas[preguntaActual];
  const respuestasContestadas = respuestas.filter((r) => r !== -1).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              if (confirm('¿Seguro que quieres salir? Se perderá el progreso del examen.')) {
                window.location.hash = '#/';
              }
            }}
            className="btn btn-secondary flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Salir
          </button>

          <div className="flex items-center gap-4">
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                tiempoRestante < 300 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
              }`}
            >
              <Clock className="w-5 h-5" />
              <span className="font-mono text-lg font-bold">{formatearTiempo(tiempoRestante)}</span>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-600">Progreso</p>
              <p className="font-bold text-gray-900">
                {respuestasContestadas}/{preguntas.length}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                Pregunta {preguntaActual + 1} de {preguntas.length}
              </span>
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                {pregunta.categoria}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${((preguntaActual + 1) / preguntas.length) * 100}%` }}
              />
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-6">{pregunta.pregunta}</h3>

          <div className="space-y-3 mb-6">
            {pregunta.opciones.map((opcion, idx) => (
              <button
                key={idx}
                onClick={() => seleccionarRespuesta(idx)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  respuestas[preguntaActual] === idx
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      respuestas[preguntaActual] === idx
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {respuestas[preguntaActual] === idx && (
                      <CheckCircle className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <span className="text-gray-900">{opcion}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <button
              onClick={anteriorPregunta}
              disabled={preguntaActual === 0}
              className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>

            <div className="flex gap-2">
              {preguntas.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setPreguntaActual(idx)}
                  className={`w-8 h-8 rounded-full text-sm font-medium ${
                    idx === preguntaActual
                      ? 'bg-blue-600 text-white'
                      : respuestas[idx] !== -1
                      ? 'bg-green-200 text-green-800'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            {preguntaActual === preguntas.length - 1 ? (
              <button onClick={finalizarExamen} className="btn btn-primary">
                Finalizar Examen
              </button>
            ) : (
              <button onClick={siguientePregunta} className="btn btn-primary">
                Siguiente
              </button>
            )}
          </div>
        </div>

        {respuestasContestadas < preguntas.length && (
          <div className="card bg-yellow-50 border border-yellow-200">
            <p className="text-sm text-yellow-800">
              <strong>Nota:</strong> Tienes {preguntas.length - respuestasContestadas} pregunta(s)
              sin responder. Puedes navegar entre ellas usando los números de arriba.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

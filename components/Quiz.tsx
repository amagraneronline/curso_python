
import React, { useState } from 'react';
import { Question } from '../types';

interface QuizProps {
  questions: Question[];
  unlockCode: string;
  onCompleted: (score: number) => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, unlockCode, onCompleted }) => {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctIndex) correct++;
    });
    const finalScore = Math.round((correct / questions.length) * 100);
    setScore(finalScore);
    setShowResults(true);
    
    if (finalScore >= 80) {
      onCompleted(finalScore);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <i className="fa-solid fa-graduation-cap text-blue-600"></i>
        Prueba de Comprensión
      </h3>

      {!showResults ? (
        <div className="space-y-8">
          {questions.map((q, idx) => (
            <div key={q.id} className="space-y-4">
              <p className="font-medium text-slate-800">
                <span className="text-blue-600 mr-2">{idx + 1}.</span>
                {q.text}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {q.options.map((opt, optIdx) => (
                  <button
                    key={optIdx}
                    onClick={() => setAnswers(prev => ({ ...prev, [q.id]: optIdx }))}
                    className={`text-left p-4 rounded-xl border transition-all text-sm ${
                      answers[q.id] === optIdx
                        ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-100'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={handleSubmit}
            disabled={Object.keys(answers).length < questions.length}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-200"
          >
            Finalizar Evaluación
          </button>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-4 ${
            score >= 80 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
          }`}>
            <i className={`fa-solid ${score >= 80 ? 'fa-check' : 'fa-xmark'}`}></i>
          </div>
          <h4 className="text-2xl font-bold text-slate-900 mb-2">
            Puntuación: {score}%
          </h4>
          
          {score >= 80 ? (
            <div className="space-y-4">
              <p className="text-slate-600">¡Excelente! Has comprendido los conceptos. Aquí tienes tu código de desbloqueo:</p>
              <div className="bg-slate-100 p-4 rounded-xl font-mono text-xl font-bold tracking-widest text-blue-700 border-2 border-dashed border-blue-200">
                {unlockCode}
              </div>
              <p className="text-xs text-slate-400 italic">Copia este código para la siguiente sección.</p>
            </div>
          ) : (
            <div>
              <p className="text-slate-600 mb-4">Necesitas al menos un 80% para desbloquear la siguiente sección.</p>
              <button
                onClick={() => { setShowResults(false); setAnswers({}); }}
                className="bg-slate-800 text-white px-6 py-2 rounded-lg font-bold hover:bg-slate-700 transition-all"
              >
                Reintentar
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;


import React, { useState } from 'react';
import { analyzePythonCode } from '../services/geminiService';

interface CodeEditorProps {
  initialCode: string;
  challenge: string;
  onSuccess: () => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialCode, challenge, onSuccess }) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRun = async () => {
    setIsProcessing(true);
    setFeedback('');
    setOutput('');
    
    const result = await analyzePythonCode(code, challenge);
    
    setOutput(result.output);
    setFeedback(result.feedback);
    setSuccess(result.isSuccess);
    setIsProcessing(false);

    if (result.isSuccess) {
      setTimeout(() => {
        onSuccess();
      }, 1500);
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl overflow-hidden border border-slate-200 bg-slate-900">
      <div className="bg-slate-800 px-4 py-2 flex justify-between items-center">
        <span className="text-slate-400 text-xs font-mono">python_playground.py</span>
        <button
          onClick={handleRun}
          disabled={isProcessing}
          className="bg-green-600 hover:bg-green-500 disabled:bg-slate-700 text-white px-4 py-1.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2"
        >
          {isProcessing ? (
            <i className="fa-solid fa-spinner animate-spin"></i>
          ) : (
            <i className="fa-solid fa-play"></i>
          )}
          Ejecutar
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative border-r border-slate-800">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-64 p-4 bg-slate-900 text-green-400 font-mono text-sm focus:outline-none resize-none"
            placeholder="# Escribe tu código aquí..."
            spellCheck={false}
          />
        </div>
        
        <div className="flex flex-col h-64 bg-black p-4 font-mono text-sm overflow-y-auto">
          <h4 className="text-slate-500 mb-2 uppercase text-[10px] tracking-wider">Salida de Terminal:</h4>
          {output ? (
            <pre className="text-slate-100 whitespace-pre-wrap">{output}</pre>
          ) : (
            <span className="text-slate-700 italic">Pulsa ejecutar para ver resultados...</span>
          )}
        </div>
      </div>

      {feedback && (
        <div className={`p-4 border-t ${success ? 'bg-green-900/20 border-green-800/50' : 'bg-slate-800/50 border-slate-700'}`}>
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${success ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'}`}>
              <i className={`fa-solid ${success ? 'fa-check' : 'fa-info-circle'}`}></i>
            </div>
            <div>
              <p className={`text-sm font-bold ${success ? 'text-green-400' : 'text-blue-300'}`}>
                Feedback del Tutor de IA:
              </p>
              <p className="text-sm text-slate-300 mt-1">{feedback}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;

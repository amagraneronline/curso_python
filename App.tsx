
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Auth from './components/Auth';
import { PYTHON_SECTIONS } from './constants';
import { User, UserProgress, CompletionRecord } from './types';
import CodeEditor from './components/CodeEditor';
import Quiz from './components/Quiz';
import TeacherDashboard from './components/TeacherDashboard';

const PROGRESS_PREFIX = 'pymaster_progress_';
const SESSION_KEY = 'pymaster_session';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(SESSION_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'theory' | 'code' | 'quiz'>('theory');
  const [unlockCodeInput, setUnlockCodeInput] = useState('');
  const [error, setError] = useState('');

  // Per-user progress state
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(currentUser));
      
      const storageKey = `${PROGRESS_PREFIX}${currentUser.id}`;
      const savedProgress = localStorage.getItem(storageKey);
      
      if (savedProgress) {
        const parsed = JSON.parse(savedProgress);
        setProgress(parsed);
        
        // Find current section index based on progress
        const lastCompletedId = parsed.currentSectionId;
        const index = PYTHON_SECTIONS.findIndex(s => s.id === lastCompletedId);
        setCurrentSectionIndex(index !== -1 ? index : 0);
      } else {
        const initialProgress: UserProgress = {
          userId: currentUser.id,
          userName: currentUser.name,
          completedSections: [],
          currentSectionId: PYTHON_SECTIONS[0].id
        };
        setProgress(initialProgress);
        localStorage.setItem(storageKey, JSON.stringify(initialProgress));
      }
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser && progress) {
      localStorage.setItem(`${PROGRESS_PREFIX}${currentUser.id}`, JSON.stringify(progress));
    }
  }, [progress, currentUser]);

  const handleAuthComplete = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setProgress(null);
    setCurrentSectionIndex(0);
    setActiveTab('theory');
    localStorage.removeItem(SESSION_KEY);
  };

  const currentSection = PYTHON_SECTIONS[currentSectionIndex];

  const handleQuizComplete = (score: number) => {
    if (!currentUser || !progress) return;

    setProgress(prev => {
      if (!prev) return null;
      const existing = prev.completedSections.find(c => c.sectionId === currentSection.id);
      if (existing && existing.score >= score) return prev;
      
      const newRecord: CompletionRecord = { 
        sectionId: currentSection.id, 
        timestamp: new Date().toISOString(), 
        score: score 
      };
      
      return {
        ...prev,
        completedSections: existing 
          ? prev.completedSections.map(c => c.sectionId === currentSection.id ? newRecord : c)
          : [...prev.completedSections, newRecord]
      };
    });
  };

  const handleSectionUnlock = () => {
    if (!progress) return;

    if (unlockCodeInput.trim().toUpperCase() === currentSection.unlockCode) {
      const nextIndex = currentSectionIndex + 1;
      
      if (nextIndex < PYTHON_SECTIONS.length) {
        const nextSectionId = PYTHON_SECTIONS[nextIndex].id;
        setProgress(prev => prev ? { ...prev, currentSectionId: nextSectionId } : null);
        setCurrentSectionIndex(nextIndex);
        setActiveTab('theory');
        setUnlockCodeInput('');
        setError('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert("¡Increíble! Has completado todo el itinerario de fundamentos de Python.");
      }
    } else {
      setError('El código ingresado no coincide con el obtenido en la evaluación.');
      setTimeout(() => setError(''), 3000);
    }
  };

  if (!currentUser) {
    return <Auth onAuthComplete={handleAuthComplete} />;
  }

  const renderStudentView = () => {
    if (!progress) return null;
    
    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pb-20">
        <aside className="lg:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm sticky top-24">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Módulos del Curso</h3>
            <div className="space-y-3">
              {PYTHON_SECTIONS.map((s, idx) => {
                const isCompleted = progress.completedSections.some(c => c.sectionId === s.id);
                const isCurrent = idx === currentSectionIndex;
                const isLocked = idx > currentSectionIndex && !progress.completedSections.some((_, i) => i === idx - 1);

                return (
                  <button
                    key={s.id}
                    disabled={isLocked}
                    onClick={() => {
                      setCurrentSectionIndex(idx);
                      setActiveTab('theory');
                    }}
                    className={`w-full flex items-center gap-3 p-3.5 rounded-2xl text-left transition-all group ${
                      isCurrent 
                        ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 scale-[1.02]' 
                        : isLocked 
                          ? 'opacity-30 cursor-not-allowed grayscale' 
                          : 'hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-[10px] font-black transition-colors ${
                      isCurrent ? 'bg-white text-blue-600' : isCompleted ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                    }`}>
                      {isCompleted ? <i className="fa-solid fa-check"></i> : idx + 1}
                    </div>
                    <span className="font-bold text-xs truncate uppercase tracking-wider">{s.title.split('. ')[1]}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 pt-8 border-t border-slate-100">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Tu Progreso</p>
                <div className="flex items-end justify-between mb-2">
                  <span className="text-2xl font-black text-slate-900 leading-none">
                    {Math.round((progress.completedSections.length / PYTHON_SECTIONS.length) * 100)}%
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">{progress.completedSections.length} de {PYTHON_SECTIONS.length}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-blue-600 h-full rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${(progress.completedSections.length / PYTHON_SECTIONS.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div className="lg:col-span-3 space-y-8">
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
            <div className="p-10 border-b border-slate-100 bg-slate-50/30">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-100">
                  Módulo {currentSectionIndex + 1}
                </span>
                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                  <i className="fa-regular fa-clock"></i>
                  <span>15 min</span>
                </div>
              </div>
              <h2 className="text-4xl font-black text-slate-900 leading-tight tracking-tight">
                {currentSection.title.split('. ')[1]}
              </h2>
              <p className="text-xl text-slate-500 mt-3 font-medium leading-relaxed">
                {currentSection.description}
              </p>
            </div>

            <div className="flex px-10 bg-white border-b border-slate-100">
              {[
                { id: 'theory', icon: 'fa-book-open', label: 'Teoría' },
                { id: 'code', icon: 'fa-code', label: 'Práctica' },
                { id: 'quiz', icon: 'fa-vial', label: 'Evaluación' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-5 text-xs font-black uppercase tracking-widest transition-all border-b-4 ${
                    activeTab === tab.id 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-transparent text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <i className={`fa-solid ${tab.icon}`}></i>
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-10 flex-1">
              {activeTab === 'theory' && (
                <div className="space-y-8 animate-fade-in">
                  <div className="prose prose-slate max-w-none">
                    <p className="text-lg leading-[1.8] text-slate-600 font-medium">{currentSection.theory}</p>
                  </div>
                  <div className="bg-slate-900 rounded-[2rem] p-8 relative overflow-hidden group shadow-2xl">
                    <div className="absolute top-6 right-8 text-slate-700 group-hover:text-blue-500/50 transition-colors pointer-events-none">
                      <i className="fa-brands fa-python text-6xl"></i>
                    </div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6">Ejemplo Interactivo</p>
                    <pre className="text-blue-400 font-mono text-base leading-relaxed overflow-x-auto pb-4 custom-scrollbar">
                      {currentSection.codeExample}
                    </pre>
                  </div>
                </div>
              )}

              {activeTab === 'code' && (
                <div className="space-y-8 animate-fade-in">
                  <div className="bg-blue-600 p-8 rounded-[2rem] text-white shadow-xl shadow-blue-100 relative overflow-hidden">
                    <div className="relative z-10">
                      <h4 className="font-black text-xl flex items-center gap-3 mb-2">
                        <i className="fa-solid fa-wand-magic-sparkles"></i>
                        Misión Práctica
                      </h4>
                      <p className="text-blue-100 text-lg leading-relaxed">{currentSection.challenge}</p>
                    </div>
                    <i className="fa-solid fa-code absolute -bottom-10 -right-10 text-[10rem] opacity-10 rotate-12"></i>
                  </div>
                  <CodeEditor 
                    initialCode={currentSection.codeExample} 
                    challenge={currentSection.challenge}
                    onSuccess={() => {
                      setActiveTab('quiz');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                </div>
              )}

              {activeTab === 'quiz' && (
                <div className="animate-fade-in">
                  <Quiz 
                    questions={currentSection.questions} 
                    unlockCode={currentSection.unlockCode}
                    onCompleted={handleQuizComplete}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="bg-slate-900 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1">
                <h3 className="text-3xl font-black text-white tracking-tight">Próximo Desafío</h3>
                <p className="text-slate-400 mt-2 text-lg">Introduce el código secreto de la evaluación para continuar.</p>
              </div>
              <div className="w-full md:w-auto flex flex-col gap-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={unlockCodeInput}
                    onChange={(e) => setUnlockCodeInput(e.target.value.toUpperCase())}
                    placeholder="CÓDIGO SECRETO"
                    className="flex-1 md:w-64 px-6 py-4 bg-slate-800 border-2 border-slate-700 rounded-2xl font-mono text-white text-lg focus:ring-4 focus:ring-blue-600/20 focus:border-blue-500 focus:outline-none uppercase transition-all tracking-widest placeholder:text-slate-600"
                  />
                  <button
                    onClick={handleSectionUnlock}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg shadow-blue-900/50 hover:scale-[1.05] active:scale-[0.98]"
                  >
                    Siguiente
                  </button>
                </div>
                {error && <p className="text-red-400 font-bold text-center text-xs animate-shake uppercase tracking-widest">{error}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout 
      viewMode={currentUser.role} 
      userName={currentUser.name} 
      onLogout={handleLogout}
    >
      {currentUser.role === 'student' ? renderStudentView() : (
        <TeacherDashboard progress={progress || {userId: '', userName: '', completedSections: [], currentSectionId: ''}} sections={PYTHON_SECTIONS} />
      )}
    </Layout>
  );
};

export default App;


import React from 'react';
import { ViewMode } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  viewMode: ViewMode;
  userName: string;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, viewMode, userName, onLogout }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="glass sticky top-0 z-50 border-b border-slate-200 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <i className="fa-brands fa-python text-white text-2xl"></i>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            PyMaster
          </h1>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 border-l border-slate-200 pl-6">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold">{userName}</p>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                {viewMode === 'student' ? 'Estudiante' : 'Profesor'}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold border-2 border-indigo-200">
              {userName.charAt(0)}
            </div>
            <button 
              onClick={onLogout}
              className="w-10 h-10 rounded-xl hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors flex items-center justify-center border border-transparent hover:border-red-100"
              title="Cerrar sesión"
            >
              <i className="fa-solid fa-right-from-bracket"></i>
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8">
        {children}
      </main>

      <footer className="border-t border-slate-200 py-8 text-center text-slate-400 text-sm">
        &copy; 2024 PyMaster Educational Platform - Impulsado por Gemini AI
      </footer>
    </div>
  );
};

export default Layout;

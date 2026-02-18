
import React, { useState } from 'react';
import { User, Role } from '../types';

interface AuthProps {
  onAuthComplete: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthComplete }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<Role>('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const users: User[] = JSON.parse(localStorage.getItem('pymaster_users') || '[]');

    if (isLogin) {
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        onAuthComplete(user);
      } else {
        setError('Credenciales incorrectas. Por favor, revisa tu email y contraseña.');
      }
    } else {
      if (users.some(u => u.email === email)) {
        setError('Este email ya está registrado.');
        return;
      }

      const newUser: User = {
        id: crypto.randomUUID(),
        name,
        email,
        password,
        role,
      };

      users.push(newUser);
      localStorage.setItem('pymaster_users', JSON.stringify(users));
      onAuthComplete(newUser);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#f8fafc]">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-400/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-10 relative z-10 animate-fade-in">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-xl shadow-blue-200 mb-6 rotate-3 hover:rotate-0 transition-transform cursor-pointer">
            <i className="fa-brands fa-python text-white text-3xl"></i>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">PyMaster</h1>
          <p className="text-slate-500 mt-2 font-medium">
            {isLogin ? '¡Bienvenido de nuevo!' : 'Comienza tu viaje en Python hoy.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nombre Completo</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-600/10 focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-400"
                  placeholder="Tu nombre"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">¿Quién eres?</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('student')}
                    className={`px-4 py-3 rounded-xl border font-bold text-xs uppercase tracking-widest transition-all ${
                      role === 'student' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    Estudiante
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('teacher')}
                    className={`px-4 py-3 rounded-xl border font-bold text-xs uppercase tracking-widest transition-all ${
                      role === 'teacher' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    Profesor
                  </button>
                </div>
              </div>
            </>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-600/10 focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-400"
              placeholder="hola@ejemplo.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contraseña</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-600/10 focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-400"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-500 text-xs font-bold text-center animate-shake">{error}</p>}

          <button
            type="submit"
            className="w-full bg-slate-900 hover:bg-black text-white py-4 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all shadow-xl shadow-slate-200 active:scale-95"
          >
            {isLogin ? 'Entrar' : 'Crear Cuenta'}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-100 text-center">
          <p className="text-slate-500 text-sm font-medium">
            {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-blue-600 font-bold hover:underline"
            >
              {isLogin ? 'Regístrate' : 'Inicia sesión'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;

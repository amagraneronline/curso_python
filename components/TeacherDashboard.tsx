
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, AreaChart, Area } from 'recharts';
import { UserProgress, Section } from '../types';

interface TeacherDashboardProps {
  progress: UserProgress; // Current student progress
  sections: Section[];
}

// Mock data for other students to make it look like a real classroom
const MOCK_STUDENTS = [
  { id: 'st1', name: 'Ana García', completed: 5, lastActive: 'Hace 2h', avgScore: 95 },
  { id: 'st2', name: 'Lucas Martí', completed: 3, lastActive: 'Hace 1d', avgScore: 82 },
  { id: 'st3', name: 'Sofía Ruiz', completed: 5, lastActive: 'Hace 5m', avgScore: 98 },
  { id: 'st4', name: 'Mateo Sanz', completed: 1, lastActive: 'Hace 3d', avgScore: 75 },
];

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ progress, sections }) => {
  const student = progress;
  
  const progressData = sections.map(s => {
    const completion = student.completedSections.find(c => c.sectionId === s.id);
    return {
      name: s.title.split('.')[1].trim(),
      score: completion ? completion.score : 0,
      completed: !!completion
    };
  });

  const activityData = [
    { day: 'Lun', users: 12 },
    { day: 'Mar', users: 18 },
    { day: 'Mie', users: 15 },
    { day: 'Jue', users: 22 },
    { day: 'Vie', users: 30 },
    { day: 'Sab', users: 8 },
    { day: 'Dom', users: 5 },
  ];

  const totalCompleted = student.completedSections.length;
  const completionRate = Math.round((totalCompleted / sections.length) * 100);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm overflow-hidden relative">
        <div className="relative z-10">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <span className="bg-blue-600 text-white w-10 h-10 rounded-xl flex items-center justify-center text-xl">
              <i className="fa-solid fa-gauge-high"></i>
            </span>
            Panel del Profesor
          </h2>
          <p className="text-slate-500 mt-2 font-medium">Gestión del alumnado y seguimiento de objetivos.</p>
        </div>
        <div className="flex gap-4 relative z-10">
          <div className="bg-blue-50 border border-blue-100 px-6 py-4 rounded-2xl text-center min-w-[120px]">
            <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mb-1">Tu Alumno</p>
            <p className="text-2xl font-black text-blue-900">{completionRate}%</p>
          </div>
          <div className="bg-indigo-50 border border-indigo-100 px-6 py-4 rounded-2xl text-center min-w-[120px]">
            <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest mb-1">Media Clase</p>
            <p className="text-2xl font-black text-indigo-900">84%</p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 opacity-50"></div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress of the Current Student */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <i className="fa-solid fa-graduation-cap text-blue-600"></i>
              Progreso Detallado: {student.userName}
            </h3>
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-600"></span>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Calificación</span>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 600}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} domain={[0, 100]} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px'}}
                />
                <Bar dataKey="score" radius={[10, 10, 0, 0]} barSize={45}>
                  {progressData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.completed ? '#2563eb' : '#f1f5f9'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Global Classroom Activity */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <i className="fa-solid fa-chart-line text-indigo-600"></i>
            Actividad de la Clase
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="users" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-slate-400 mt-4 text-center italic">Sesiones activas por día de la semana</p>
        </div>
      </div>

      {/* Classroom Student List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
          <div>
            <h3 className="text-lg font-bold">Listado de Alumnado</h3>
            <p className="text-xs text-slate-500 mt-1">Estado actual de todos los estudiantes inscritos.</p>
          </div>
          <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-sm">
            <i className="fa-solid fa-file-export"></i>
            Exportar CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase tracking-widest font-black">
                <th className="px-8 py-5">Estudiante</th>
                <th className="px-8 py-5">Progreso</th>
                <th className="px-8 py-5">Nota Media</th>
                <th className="px-8 py-5">Última Conexión</th>
                <th className="px-8 py-5">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {/* Current Student First */}
              <tr className="bg-blue-50/30">
                <td className="px-8 py-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                    {student.userName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{student.userName}</p>
                    <p className="text-[10px] text-blue-600 font-bold">TÚ</p>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className="w-full max-w-[120px]">
                    <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
                      <span>{student.completedSections.length}/{sections.length}</span>
                      <span>{completionRate}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-blue-600 h-full rounded-full" style={{width: `${completionRate}%`}}></div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-black">
                    {student.completedSections.length > 0 ? '98%' : 'N/A'}
                  </span>
                </td>
                <td className="px-8 py-5 text-slate-500 text-sm font-medium">Ahora mismo</td>
                <td className="px-8 py-5">
                  <button className="text-slate-400 hover:text-blue-600 transition-colors">
                    <i className="fa-solid fa-eye"></i>
                  </button>
                </td>
              </tr>
              {/* Mock students */}
              {MOCK_STUDENTS.map(st => (
                <tr key={st.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-sm border border-slate-200">
                      {st.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{st.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium">Estudiante ID: {st.id}</p>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="w-full max-w-[120px]">
                      <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
                        <span>{st.completed}/{sections.length}</span>
                        <span>{Math.round((st.completed / sections.length) * 100)}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-slate-400 h-full rounded-full" style={{width: `${(st.completed / sections.length) * 100}%`}}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-black">
                      {st.avgScore}%
                    </span>
                  </td>
                  <td className="px-8 py-5 text-slate-500 text-sm font-medium">{st.lastActive}</td>
                  <td className="px-8 py-5">
                    <button className="text-slate-300 hover:text-blue-600 transition-colors">
                      <i className="fa-solid fa-eye"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;

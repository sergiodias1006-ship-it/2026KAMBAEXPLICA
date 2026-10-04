import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Calculator, 
  Atom, 
  FlaskConical, 
  Scale, 
  Briefcase, 
  TrendingUp, 
  Code, 
  BarChart2, 
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { POPULAR_SUBJECTS } from '../data/mockData';

const iconMap: Record<string, React.ReactNode> = {
  Calculator: <Calculator className="w-5 h-5 text-[#FFC72C]" />,
  Atom: <Atom className="w-5 h-5 text-[#E02636]" />,
  FlaskConical: <FlaskConical className="w-5 h-5 text-emerald-400" />,
  Scale: <Scale className="w-5 h-5 text-amber-400" />,
  Briefcase: <Briefcase className="w-5 h-5 text-blue-400" />,
  TrendingUp: <TrendingUp className="w-5 h-5 text-purple-400" />,
  Code: <Code className="w-5 h-5 text-cyan-400" />,
  BarChart2: <BarChart2 className="w-5 h-5 text-pink-400" />,
  BookOpen: <BookOpen className="w-5 h-5 text-teal-400" />
};

export const SubjectGrid: React.FC = () => {
  const { setFilters, setActiveView } = useApp();

  const handleSelectSubject = (subjectName: string) => {
    // Map broad subject names
    const keyword = subjectName.split(' ')[0];
    setFilters(prev => ({
      ...prev,
      subject: keyword
    }));
    setActiveView('tutors');
  };

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/5">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#FFC72C] mb-2 tracking-wider uppercase">
            <span>Explora por Área de Conhecimento</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Matemática, Física, Direito, Contabilidade, Química, Economia... e muito mais
          </h2>
          <p className="mt-2 text-sm text-slate-400 max-w-2xl">
            Explicadores experientes nas cadeiras com maiores taxas de reprovação nas universidades e escolas de referência em Angola.
          </p>
        </div>

        <button
          onClick={() => {
            setFilters(prev => ({ ...prev, subject: '' }));
            setActiveView('tutors');
          }}
          className="text-xs font-medium text-[#FFC72C] hover:text-amber-300 flex items-center gap-1.5 transition-colors self-start md:self-end"
        >
          <span>Ver todas as 25+ disciplinas</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {POPULAR_SUBJECTS.map((sub) => (
          <div
            key={sub.id}
            onClick={() => handleSelectSubject(sub.name)}
            className="group cursor-pointer p-5 rounded-xl bg-[#161B22] border border-white/10 hover:border-[#FFC72C]/40 hover:bg-[#1C222B] transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 group-hover:scale-110 transition-transform">
                {iconMap[sub.iconName] || <BookOpen className="w-5 h-5 text-white" />}
              </div>
              <span className="text-xs text-slate-400 tabular-nums">
                {sub.tutorCount} explicadores
              </span>
            </div>

            <h3 className="mt-4 text-base font-semibold text-white group-hover:text-[#FFC72C] transition-colors">
              {sub.name}
            </h3>

            <p className="mt-1.5 text-xs text-slate-400 line-clamp-2 leading-relaxed">
              {sub.description}
            </p>

            <div className="mt-3.5 pt-3 border-t border-white/5 flex flex-wrap gap-1 text-[11px] text-slate-400">
              {sub.examples.slice(0, 2).map((ex, idx) => (
                <span key={idx} className="text-slate-400">
                  {ex} {idx === 0 ? '·' : ''}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  MapPin, 
  GraduationCap, 
  SlidersHorizontal, 
  ShieldCheck, 
  CreditCard, 
  ArrowRight,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { ANGOLAN_PROVINCES, LUANDA_MUNICIPALITIES } from '../data/mockData';
import { Student3DHeroContainer } from './Student3DHeroContainer';

export const Hero: React.FC = () => {
  const { 
    filters, 
    setFilters, 
    setActiveView, 
    setIsAuthModalOpen, 
    setAuthModalTab 
  } = useApp();

  const [localSearch, setLocalSearch] = useState(filters.searchQuery);
  const [localSubject, setLocalSubject] = useState(filters.subject);
  const [localLevel, setLocalLevel] = useState(filters.level);
  const [localProvince, setLocalProvince] = useState(filters.province);
  const [localMaxPrice, setLocalMaxPrice] = useState(filters.maxPrice);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({
      ...prev,
      searchQuery: localSearch,
      subject: localSubject,
      level: localLevel,
      province: localProvince,
      maxPrice: localMaxPrice
    }));
    setActiveView('tutors');
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-white/5">
      {/* Background Angolan dynamic lines and glowing gradients */}
      <div className="absolute inset-0 angola-pattern-grid opacity-70 pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#E02636]/15 via-[#FFC72C]/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 -right-24 w-80 h-80 bg-[#FFC72C]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Cultural Pride kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300">
              <span className="w-2 h-2 rounded-full bg-[#E02636] animate-pulse" />
              <span className="text-[#FFC72C] tracking-wide">EDUCAÇÃO DE QUALIDADE EM ANGOLA</span>
              <span aria-hidden="true">·</span>
              <span>Do Secundário à Pós-Graduação</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] text-balance">
              Conectando estudantes aos <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-[#FFC72C]">melhores explicadores</span> de Angola
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Supera as cadeiras difíceis, prepara os teus exames de acesso na <strong className="text-white font-medium">UAN, ISPTEC e UCAN</strong> ou domina o ensino secundário com professores rigorosamente verificados. Pagamento simples e seguro via <strong className="text-[#FFC72C] font-medium">Multicaixa Express</strong>.
            </p>

            {/* Main Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setActiveView('tutors')}
                className="px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-[#E02636] to-[#b81827] hover:from-[#c81e2d] hover:to-[#a01321] rounded-xl shadow-lg shadow-[#E02636]/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2.5"
              >
                <Search className="w-4 h-4" />
                <span>Encontrar Explicador</span>
              </button>

              <button
                onClick={() => {
                  setAuthModalTab('tutor');
                  setIsAuthModalOpen(true);
                }}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:border-amber-400/40 rounded-xl transition-all flex items-center gap-2"
              >
                <GraduationCap className="w-4 h-4 text-[#FFC72C]" />
                <span>Tornar-se Explicador</span>
              </button>
            </div>

            {/* Proof and Trust Signals */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#FFC72C] shrink-0" />
                <span>Explicadores Verificados com BI</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#E02636] shrink-0" />
                <span>Multicaixa Express em Kwanzas</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>97% de Taxa de Aprovação</span>
              </div>
            </div>
          </div>

          {/* Right Column: Framer Motion 3D Interactive Rotating Student Container */}
          <div className="lg:col-span-5 relative">
            <Student3DHeroContainer />
          </div>

        </div>

        {/* Integrated Multi-Filter Search Bar */}
        <div className="mt-10 lg:mt-14 p-4 sm:p-5 rounded-2xl bg-[#161B22] border border-white/10 shadow-2xl">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {/* 1. Disciplina */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#FFC72C]" />
                Disciplina / Cadeira
              </label>
              <input
                type="text"
                placeholder="Ex: Análise Matemática, Direito..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-black/40 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#FFC72C]"
              />
            </div>

            {/* 2. Categoria / Disciplina select */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Área de Estudo</label>
              <select
                value={localSubject}
                onChange={(e) => setLocalSubject(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#FFC72C]"
              >
                <option value="">Todas as Disciplinas</option>
                <option value="Matemática">Matemática e Cálculo</option>
                <option value="Física">Física Geral</option>
                <option value="Química">Química Geral e Orgânica</option>
                <option value="Direito">Direito e Legislação</option>
                <option value="Contabilidade">Contabilidade & PGC</option>
                <option value="Economia">Economia & Gestão</option>
                <option value="Programação">Programação & Computação</option>
                <option value="Estatística">Estatística & SPSS</option>
              </select>
            </div>

            {/* 3. Nível Académico */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Nível de Ensino</label>
              <select
                value={localLevel}
                onChange={(e) => setLocalLevel(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#FFC72C]"
              >
                <option value="">Todos os Níveis</option>
                <option value="Secundário">Ensino Secundário</option>
                <option value="Pré-Universitário">Exames de Acesso (UAN/ISPTEC)</option>
                <option value="Licenciatura">Ensino Universitário (Licenciatura)</option>
                <option value="Mestrado">Mestrado e Doutoramento</option>
              </select>
            </div>

            {/* 4. Localização */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#E02636]" />
                Localização
              </label>
              <select
                value={localProvince}
                onChange={(e) => setLocalProvince(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#FFC72C]"
              >
                <option value="">Todas as Províncias</option>
                {ANGOLAN_PROVINCES.map((prov) => (
                  <option key={prov} value={prov}>{prov}</option>
                ))}
              </select>
            </div>

            {/* 5. Botão de Busca */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 px-4 text-sm font-bold text-black bg-[#FFC72C] hover:bg-[#e6b325] rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md shadow-[#FFC72C]/20"
              >
                <Search className="w-4 h-4" />
                <span>Pesquisar</span>
              </button>
            </div>
          </form>

          {/* Quick tags for trending Angolan subjects */}
          <div className="mt-3.5 pt-3 border-t border-white/5 flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="font-medium text-slate-300">Populares:</span>
            {[
              { label: 'Cálculo I (UAN/ISPTEC)', val: 'Matemática' },
              { label: 'Exame de Acesso Medicina', val: 'Química' },
              { label: 'Direito Civil (UCAN)', val: 'Direito' },
              { label: 'PGC Angolano & Fiscalidade', val: 'Contabilidade' },
              { label: 'Algoritmos & Python (ISUTIC)', val: 'Programação' }
            ].map((tag) => (
              <button
                key={tag.label}
                type="button"
                onClick={() => {
                  setLocalSubject(tag.val);
                  setFilters(prev => ({ ...prev, subject: tag.val }));
                  setActiveView('tutors');
                }}
                className="hover:text-[#FFC72C] text-slate-400 transition-colors"
              >
                {tag.label} <span className="text-white/20">·</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

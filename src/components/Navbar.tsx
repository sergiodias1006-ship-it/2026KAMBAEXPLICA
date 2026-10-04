import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  GraduationCap, 
  User, 
  MessageSquare, 
  Calendar, 
  ShieldCheck, 
  ChevronDown,
  Sparkles,
  LogOut,
  RefreshCw,
  HelpCircle,
  Smartphone
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    setCurrentUser, 
    activeView, 
    setActiveView, 
    setIsAuthModalOpen, 
    setAuthModalTab,
    setIsSupportModalOpen,
    switchDemoRole,
    resetDatabase,
    isSmartphoneMode,
    setIsSmartphoneMode
  } = useApp();

  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0D0F12]/90 backdrop-blur-md">
      {/* Top subtle Angolan Flag color sheen line */}
      <div className="h-[2px] w-full angola-line-sheen" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element brand wordmark */}
        <button 
          onClick={() => setActiveView('home')} 
          className="flex items-center gap-2.5 text-left group focus-visible:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#E02636] to-[#FFC72C] flex items-center justify-center shadow-lg shadow-[#E02636]/20">
            <span className="font-display font-black text-black text-base">K</span>
          </div>
          <span className="font-display font-bold text-xl sm:text-2xl tracking-tight text-white group-hover:text-amber-300 transition-colors">
            KAMBA<span className="text-[#FFC72C]">EXPLICA</span>
          </span>
        </button>

        {/* Zone 2: 4-5 Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button 
            onClick={() => setActiveView('home')} 
            className={`transition-colors hover:text-white ${activeView === 'home' ? 'text-[#FFC72C] font-semibold' : ''}`}
          >
            Início
          </button>
          <button 
            onClick={() => setActiveView('tutors')} 
            className={`transition-colors hover:text-white ${activeView === 'tutors' ? 'text-[#FFC72C] font-semibold' : ''}`}
          >
            Encontrar Explicador
          </button>
          <button 
            onClick={() => setActiveView('subjects')} 
            className={`transition-colors hover:text-white ${activeView === 'subjects' ? 'text-[#FFC72C] font-semibold' : ''}`}
          >
            Disciplinas
          </button>
          <button 
            onClick={() => {
              setActiveView('home');
              const el = document.getElementById('como-funciona');
              el?.scrollIntoView({ behavior: 'smooth' });
            }} 
            className="hover:text-white transition-colors"
          >
            Como Funciona
          </button>
          <button 
            onClick={() => setIsSupportModalOpen(true)}
            className="flex items-center gap-1.5 hover:text-white transition-colors text-slate-400"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#FFC72C]" />
            <span>Ajuda & Suporte</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 Primary actions & Profile / Role switcher */}
        <div className="flex items-center gap-2.5">
          {/* 3D Smartphone Mode Toggle Button */}
          <button
            onClick={() => setIsSmartphoneMode(!isSmartphoneMode)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all flex items-center gap-1.5 shadow-sm ${
              isSmartphoneMode
                ? 'bg-[#FFC72C] text-black border-[#FFC72C]'
                : 'bg-white/5 hover:bg-white/10 text-amber-300 border-amber-400/30 hover:border-amber-400/60'
            }`}
            title="Alternar Modo Smartphone 3D (Simulador móvel interativo)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Modo Smartphone 3D</span>
          </button>

          {/* Quick Persona Switcher for demo & evaluators */}
          <div className="hidden lg:flex items-center bg-white/5 border border-white/10 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => switchDemoRole('student')}
              className={`px-2.5 py-1 rounded-md transition-all ${currentUser?.role === 'student' ? 'bg-[#E02636] text-white font-medium shadow-sm' : 'text-slate-400 hover:text-white'}`}
              title="Alternar para perfil de estudante"
            >
              Estudante
            </button>
            <button
              onClick={() => switchDemoRole('tutor')}
              className={`px-2.5 py-1 rounded-md transition-all ${currentUser?.role === 'tutor' ? 'bg-[#FFC72C] text-black font-semibold shadow-sm' : 'text-slate-400 hover:text-white'}`}
              title="Alternar para perfil de explicador"
            >
              Explicador
            </button>
          </div>

          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors focus-visible:outline-none"
              >
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name} 
                  referrerPolicy="no-referrer"
                  className="w-7 h-7 rounded-full object-cover border border-amber-400/30" 
                />
                <span className="hidden sm:inline text-xs font-medium text-slate-200 truncate max-w-[120px]">
                  {currentUser.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {menuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 bg-[#161B22] border border-white/10 rounded-xl shadow-2xl py-2 z-50 text-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-white/5">
                    <p className="font-semibold text-white truncate">{currentUser.name}</p>
                    <p className="text-xs text-slate-400 capitalize">
                      {currentUser.role === 'student' ? 'Estudante' : 'Explicador Verificado'}
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveView('dashboard')}
                    className="w-full text-left px-4 py-2.5 hover:bg-white/5 flex items-center gap-2.5 text-slate-200 hover:text-white"
                  >
                    <Calendar className="w-4 h-4 text-[#FFC72C]" />
                    <span>Meu Painel ({currentUser.role === 'student' ? 'Aulas & Pagamentos' : 'Agenda & Receita'})</span>
                  </button>

                  <button
                    onClick={() => switchDemoRole(currentUser.role === 'student' ? 'tutor' : 'student')}
                    className="w-full text-left px-4 py-2.5 hover:bg-white/5 flex items-center gap-2.5 text-slate-300 hover:text-white"
                  >
                    <RefreshCw className="w-4 h-4 text-slate-400" />
                    <span>Mudar para {currentUser.role === 'student' ? 'Explicador' : 'Estudante'}</span>
                  </button>

                  <button
                    onClick={resetDatabase}
                    className="w-full text-left px-4 py-2 hover:bg-white/5 flex items-center gap-2.5 text-xs text-slate-400 hover:text-slate-200"
                    title="Restaura os dados originais angolanos"
                  >
                    <span>Repor Dados Iniciais</span>
                  </button>

                  <div className="border-t border-white/5 my-1" />

                  <button
                    onClick={() => {
                      setCurrentUser(null);
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-red-500/10 text-red-400 flex items-center gap-2 text-xs"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Terminar Sessão</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setAuthModalTab('login');
                  setIsAuthModalOpen(true);
                }}
                className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors"
              >
                Entrar
              </button>
              <button
                onClick={() => {
                  setAuthModalTab('student');
                  setIsAuthModalOpen(true);
                }}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#E02636] hover:bg-[#c81e2d] rounded-lg transition-colors shadow-md shadow-[#E02636]/20 whitespace-nowrap"
              >
                Criar Conta
              </button>
            </div>
          )}

          {/* Quick CTA to Become a Tutor */}
          {(!currentUser || currentUser.role === 'student') && (
            <button
              onClick={() => {
                setAuthModalTab('tutor');
                setIsAuthModalOpen(true);
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-black bg-[#FFC72C] hover:bg-[#e6b325] rounded-lg transition-colors shadow-sm whitespace-nowrap"
            >
              <GraduationCap className="w-4 h-4 text-black" />
              <span>Tornar-se Explicador</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

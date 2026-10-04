import React, { useState } from 'react';
import { 
  Search, 
  CreditCard, 
  GraduationCap, 
  Calendar, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HowItWorks: React.FC = () => {
  const { setActiveView, setIsAuthModalOpen, setAuthModalTab } = useApp();
  const [tab, setTab] = useState<'student' | 'tutor'>('student');

  return (
    <section id="como-funciona" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/5">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#FFC72C] uppercase tracking-wider mb-2">
          <span>Processo Simples & Transparente</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-display">
          Como Funciona o KAMBAEXPLICA
        </h2>
        <p className="mt-3 text-sm text-slate-400">
          Criado sob medida para a realidade dos estudantes e professores em Angola.
        </p>

        {/* Tab switch */}
        <div className="inline-flex p-1 bg-[#161B22] border border-white/10 rounded-xl mt-6">
          <button
            onClick={() => setTab('student')}
            className={`px-5 py-2 text-xs font-semibold rounded-lg transition-all ${tab === 'student' ? 'bg-[#E02636] text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            Para Estudantes
          </button>
          <button
            onClick={() => setTab('tutor')}
            className={`px-5 py-2 text-xs font-semibold rounded-lg transition-all ${tab === 'tutor' ? 'bg-[#FFC72C] text-black shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            Para Explicadores
          </button>
        </div>
      </div>

      {tab === 'student' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#161B22] border border-white/10 space-y-4 hover:border-[#FFC72C]/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FFC72C]">
              <Search className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono text-slate-400">01. Encontre o Explicador Ideal</span>
              <h3 className="text-lg font-bold text-white mt-1">Filtre por Cadeira e Província</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Pesquise por Análise Matemática, Física, Direito, Contabilidade ou qualquer matéria. Veja avaliações reais de outros estudantes e selo de verificação.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#161B22] border border-white/10 space-y-4 hover:border-[#FFC72C]/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#E02636]">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono text-slate-400">02. Agende o Horário</span>
              <h3 className="text-lg font-bold text-white mt-1">Online ou Presencial</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Escolha o dia e hora que melhor se adequam à sua rotina. Pode escolher aula virtual com link direto ou presencial numa biblioteca/campus de Luanda.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#161B22] border border-white/10 space-y-4 hover:border-[#FFC72C]/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono text-slate-400">03. Pague com Multicaixa Express</span>
              <h3 className="text-lg font-bold text-white mt-1">Segurança Total em Kwanzas</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Insira o seu número e confirme o PIN na app do seu telemóvel. O dinheiro fica protegido até a aula ser realizada com satisfação garantida.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#161B22] border border-white/10 space-y-4 hover:border-[#FFC72C]/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FFC72C]">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono text-slate-400">01. Crie o Seu Perfil</span>
              <h3 className="text-lg font-bold text-white mt-1">Validação de Habilitações</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Indique a sua formação universitária (UAN, ISPTEC, UCAN, etc.), anos de experiência e envie o seu documento para obter o Selo de Explicador Verificado.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#161B22] border border-white/10 space-y-4 hover:border-[#FFC72C]/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#E02636]">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono text-slate-400">02. Defina os Seus Preços</span>
              <h3 className="text-lg font-bold text-white mt-1">Autonomia e Flexibilidade</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Defina o seu preço por hora (a partir de 2.000 Kz) e os seus dias livres na semana. Aceite ou recuse pedidos de acordo com a sua disponibilidade.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#161B22] border border-white/10 space-y-4 hover:border-[#FFC72C]/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono text-slate-400">03. Receba Diretamente</span>
              <h3 className="text-lg font-bold text-white mt-1">Gere Renda Recorrente</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Receba os pagamentos diretamente na sua conta bancária angolana (BAI, BFA, BIC) sem atrasos ou calotes. Construa uma reputação de topo.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-12 text-center">
        {tab === 'student' ? (
          <button
            onClick={() => setActiveView('tutors')}
            className="px-6 py-3 text-xs font-bold text-black bg-[#FFC72C] hover:bg-[#e6b325] rounded-xl transition-all shadow-md inline-flex items-center gap-2"
          >
            <span>Procurar Explicador Agora</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => {
              setAuthModalTab('tutor');
              setIsAuthModalOpen(true);
            }}
            className="px-6 py-3 text-xs font-bold text-white bg-[#E02636] hover:bg-[#c81e2d] rounded-xl transition-all shadow-md inline-flex items-center gap-2"
          >
            <span>Começar a Ensinar no KAMBAEXPLICA</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </section>
  );
};

import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, MapPin, Mail, Phone, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView, setIsSupportModalOpen, setAuthModalTab, setIsAuthModalOpen } = useApp();

  return (
    <footer className="bg-[#0B0D10] border-t border-white/10 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#E02636] to-[#FFC72C] flex items-center justify-center">
                <span className="font-display font-black text-black text-sm">K</span>
              </div>
              <span className="font-display font-bold text-xl text-white tracking-tight">
                KAMBA<span className="text-[#FFC72C]">EXPLICA</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              A plataforma digital angolana que liga estudantes do ensino secundário e universitário aos explicadores mais bem avaliados do país.
            </p>

            <div className="pt-2 space-y-1.5 text-slate-400 text-[11px]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#E02636]" />
                <span>Edifício Vernon, Talatona, Luanda — Angola</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#25D366]" />
                <span>+244 923 000 000 / Suporte Multicaixa Express</span>
              </div>
            </div>
          </div>

          {/* Col 2: Para Estudantes */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-white uppercase tracking-wider text-xs">Para Estudantes</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveView('tutors')} className="hover:text-white transition-colors">
                  Encontrar Explicadores
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('subjects')} className="hover:text-white transition-colors">
                  Disciplinas Populares
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveView('home'); document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition-colors">
                  Como Funciona o Agendamento
                </button>
              </li>
              <li>
                <button onClick={() => setIsSupportModalOpen(true)} className="hover:text-white transition-colors">
                  Garantia de Aprovação
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Para Explicadores */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-white uppercase tracking-wider text-xs">Para Professores</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => { setAuthModalTab('tutor'); setIsAuthModalOpen(true); }}
                  className="hover:text-white transition-colors"
                >
                  Registo de Explicador
                </button>
              </li>
              <li>
                <button onClick={() => setIsSupportModalOpen(true)} className="hover:text-white transition-colors">
                  Validação de Selo com BI
                </button>
              </li>
              <li>
                <button onClick={() => setIsSupportModalOpen(true)} className="hover:text-white transition-colors">
                  Tabela de Honorários Kz
                </button>
              </li>
              <li>
                <button onClick={() => setIsSupportModalOpen(true)} className="hover:text-white transition-colors">
                  Políticas de Cancelamento
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Confiança & Segurança */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-white uppercase tracking-wider text-xs">Pagamentos & Legal</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-1.5 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E02636]" />
                <span>Multicaixa Express (MCX)</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFC72C]" />
                <span>Transferência Bancária BAI / BFA</span>
              </li>
              <li>
                <button onClick={() => setIsSupportModalOpen(true)} className="hover:text-white transition-colors">
                  Termos e Condições
                </button>
              </li>
              <li>
                <button onClick={() => setIsSupportModalOpen(true)} className="hover:text-white transition-colors">
                  Privacidade de Dados
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} KAMBAEXPLICA. Todos os direitos reservados. Feito com orgulho em Angola.</p>
          <div className="flex items-center gap-3">
            <span>Luanda</span>
            <span>·</span>
            <span>Benguela</span>
            <span>·</span>
            <span>Huíla</span>
            <span>·</span>
            <span>Huambo</span>
            <span>·</span>
            <span>Cabinda</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

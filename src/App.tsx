/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SubjectGrid } from './components/SubjectGrid';
import { TutorGrid } from './components/TutorGrid';
import { HowItWorks } from './components/HowItWorks';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { TutorProfileModal } from './components/TutorProfileModal';
import { BookingModal } from './components/BookingModal';
import { ChatDrawer } from './components/ChatDrawer';
import { AuthModal } from './components/AuthModal';
import { ReviewModal } from './components/ReviewModal';
import { SupportModal } from './components/SupportModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Smartphone3DModal } from './components/Smartphone3DModal';
import { Sparkles, ArrowRight, ShieldCheck, CreditCard, GraduationCap, Smartphone } from 'lucide-react';

const MainContent: React.FC = () => {
  const { 
    activeView, 
    setActiveView, 
    setIsAuthModalOpen, 
    setAuthModalTab,
    setIsSmartphoneMode 
  } = useApp();

  return (
    <div className="min-h-screen bg-[#0D0F12] text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1">
        {activeView === 'home' && (
          <>
            <Hero />
            <SubjectGrid />
            <TutorGrid 
              limit={3} 
              title="Explicadores em Destaque" 
              subtitle="Professores com as mais altas avaliações e histórico comprovado de aprovações" 
              showFilters={false} 
            />
            <HowItWorks />
            <TestimonialsSection />

            {/* Investor / Startup Ready CTA Section */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#E02636]/90 via-[#B01B27] to-[#161B22] p-8 sm:p-12 border border-white/10 shadow-2xl">
                <div className="relative z-10 max-w-2xl space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 text-amber-300 text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Inovação no Ensino Angolano</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight leading-tight">
                    Pronto para transformar as tuas notas e conquistar o teu futuro?
                  </h2>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                    Junta-te a centenas de estudantes do secundário e universidades como UAN, ISPTEC e UCAN que já estudam com os melhores explicadores de Angola.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => setActiveView('tutors')}
                      className="px-6 py-3 text-xs font-bold text-black bg-[#FFC72C] hover:bg-[#e6b325] rounded-xl transition-all shadow-lg shadow-[#FFC72C]/20"
                    >
                      Encontrar Meu Explicador
                    </button>
                    <button
                      onClick={() => {
                        setAuthModalTab('tutor');
                        setIsAuthModalOpen(true);
                      }}
                      className="px-6 py-3 text-xs font-semibold text-white bg-black/40 hover:bg-black/60 border border-white/20 rounded-xl transition-all"
                    >
                      Quero Ensinar e Ganhar Renda
                    </button>
                  </div>
                </div>

                {/* Decorative background flare */}
                <div className="absolute right-0 top-0 w-96 h-96 bg-[#FFC72C]/10 rounded-full blur-3xl pointer-events-none" />
              </div>
            </section>
          </>
        )}

        {activeView === 'tutors' && (
          <div className="py-6">
            <TutorGrid 
              title="Todos os Explicadores Credenciados" 
              subtitle="Filtre por cadeira, província, modalidade e faixa de preço em Kwanzas" 
              showFilters={true} 
            />
          </div>
        )}

        {activeView === 'subjects' && (
          <div className="py-6">
            <SubjectGrid />
            <TutorGrid 
              title="Explicadores Disponíveis para Todas as Matérias" 
              subtitle="Encontre apoio especializado para qualquer disciplina curricular" 
              showFilters={true} 
            />
          </div>
        )}

        {activeView === 'dashboard' && (
          <div className="py-4">
            {/* DashboardView rendered dynamically via lazy import / direct component */}
            <DashboardViewContainer />
          </div>
        )}
      </main>

      <Footer />

      {/* Floating 3D Smartphone Mode Launcher (Bottom Left) */}
      <div className="fixed bottom-5 left-5 z-40">
        <button
          onClick={() => setIsSmartphoneMode(true)}
          className="px-4 py-2.5 rounded-full bg-[#161B22]/95 hover:bg-[#1C222B] text-white border border-[#FFC72C]/40 hover:border-[#FFC72C] shadow-2xl backdrop-blur-md flex items-center gap-2 text-xs font-bold transition-all transform hover:scale-105 group"
          title="Abrir Simulador 3D Smartphone"
        >
          <div className="w-5 h-5 rounded-md bg-[#FFC72C] flex items-center justify-center text-black">
            <Smartphone className="w-3.5 h-3.5 text-black group-hover:rotate-12 transition-transform" />
          </div>
          <span className="hidden sm:inline">Modo Smartphone 3D</span>
          <span className="sm:hidden">3D Phone</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        </button>
      </div>

      {/* Global Modals & Interactive Drawers */}
      <TutorProfileModal />
      <BookingModal />
      <ChatDrawer />
      <AuthModal />
      <ReviewModal />
      <SupportModal />
      <FloatingWhatsApp />

      {/* 3D Smartphone Simulator Modal */}
      <Smartphone3DModal>
        <div className="space-y-6 p-3">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#E02636]/80 to-[#161B22] border border-white/10 text-white space-y-2">
            <div className="flex items-center gap-2 text-[10px] text-amber-300 font-bold uppercase">
              <Sparkles className="w-3 h-3" />
              <span>KAMBAEXPLICA Mobile</span>
            </div>
            <h3 className="text-base font-bold font-display leading-tight">
              Os melhores explicadores de Angola no seu bolso
            </h3>
            <p className="text-[11px] text-slate-200">
              Pagamento via Multicaixa Express e agendamento instantâneo.
            </p>
          </div>

          <SubjectGrid />
          <TutorGrid 
            limit={3} 
            title="Destaques Mobile" 
            subtitle="Explicadores recomendados para aulas online ou presenciais" 
            showFilters={false} 
          />
          <HowItWorks />
        </div>
      </Smartphone3DModal>
    </div>
  );
};

// Container for Dashboard view to import cleanly
import { DashboardView } from './components/DashboardView';
const DashboardViewContainer: React.FC = () => {
  return <DashboardView />;
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

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
import { Sparkles, ArrowRight, ShieldCheck, CreditCard, GraduationCap } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeView, setActiveView, setIsAuthModalOpen, setAuthModalTab } = useApp();

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

      {/* Global Modals & Interactive Drawers */}
      <TutorProfileModal />
      <BookingModal />
      <ChatDrawer />
      <AuthModal />
      <ReviewModal />
      <SupportModal />
      <FloatingWhatsApp />
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

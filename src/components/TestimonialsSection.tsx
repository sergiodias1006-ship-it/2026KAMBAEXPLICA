import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { INITIAL_REVIEWS } from '../data/mockData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Side: Photo feature of study session */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <img
              src="/src/assets/images/study_group_session_1791076356700.jpg"
              alt="Sessão de explicação personalizada entre explicador e estudante em Luanda"
              referrerPolicy="no-referrer"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#161B22]/90 border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Histórias de Sucesso Comprovadas</span>
              </div>
              <p className="text-xs text-slate-300">
                Mais de 850 estudantes do ensino médio e superior aprovados em Luanda, Benguela e Huíla no último ano letivo.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Real Testimonials */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#FFC72C] uppercase tracking-wider mb-2">
              <span>Impacto Real na Educação</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
              O que dizem os estudantes angolanos
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Depoimentos reais de quem superou reprovações e garantiu vaga nas melhores faculdades de Angola.
            </p>
          </div>

          <div className="space-y-4">
            {INITIAL_REVIEWS.slice(0, 3).map((review) => (
              <div
                key={review.id}
                className="p-5 rounded-2xl bg-[#161B22] border border-white/10 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-white">{review.studentName}</span>
                    <span aria-hidden="true" className="text-white/20">·</span>
                    <span className="text-xs text-slate-400">{review.studentInstitution}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{review.comment}"
                </p>

                <div className="text-[11px] text-[#FFC72C] font-medium pt-1 border-t border-white/5 flex items-center justify-between">
                  <span>Cadeira: {review.subject}</span>
                  <span className="text-slate-500 font-normal">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

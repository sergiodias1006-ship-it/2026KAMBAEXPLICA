import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Star, 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  Clock, 
  Phone, 
  MessageSquare, 
  Award, 
  CheckCircle, 
  CheckCircle2, 
  BookOpen, 
  GraduationCap,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const TutorProfileModal: React.FC = () => {
  const { 
    activeTutorForProfile, 
    setActiveTutorForProfile, 
    setActiveTutorForBooking, 
    setActiveChatTutor,
    reviews,
    setTutorToReview,
    setIsReviewModalOpen
  } = useApp();

  const [selectedDay, setSelectedDay] = useState<string>('Segunda');

  if (!activeTutorForProfile) return null;
  const tutor = activeTutorForProfile;

  const tutorReviews = reviews.filter(r => r.tutorId === tutor.id);

  const handleWhatsApp = () => {
    const cleanPhone = tutor.whatsapp.replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(
      `Olá Professor ${tutor.name}, encontrei o seu perfil no KAMBAEXPLICA e gostaria de informações sobre explicações de ${tutor.subjects[0]}.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
  };

  const handleStartChat = () => {
    setActiveTutorForProfile(null);
    setActiveChatTutor(tutor);
  };

  const handleStartBooking = (day?: string, time?: string) => {
    setActiveTutorForProfile(null);
    setActiveTutorForBooking(tutor);
  };

  const availableDays = Object.keys(tutor.availability);
  const currentDayTimes = tutor.availability[selectedDay] || (availableDays.length > 0 ? tutor.availability[availableDays[0]] : []);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-4xl bg-[#161B22] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Top banner */}
        <div className="h-28 bg-gradient-to-r from-[#E02636]/30 via-black to-[#FFC72C]/20 border-b border-white/10 relative p-4 flex justify-between items-start">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Perfil de Explicador Credenciado</span>
          </div>
          <button
            onClick={() => setActiveTutorForProfile(null)}
            className="p-1.5 rounded-lg bg-black/50 text-slate-400 hover:text-white hover:bg-black/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Content */}
        <div className="p-6 sm:p-8 -mt-14 space-y-8">
          
          {/* Header Row: Photo + Main Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <div className="relative">
                <img
                  src={tutor.avatar}
                  alt={tutor.name}
                  referrerPolicy="no-referrer"
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-[#161B22] shadow-xl"
                />
                {tutor.verified && (
                  <div 
                    title="Explicador Verificado KAMBAEXPLICA (BI e Habilitações validadas)" 
                    className="absolute -bottom-2 -right-2 p-1 bg-[#161B22] rounded-full"
                  >
                    <ShieldCheck className="w-6 h-6 text-[#FFC72C] fill-[#FFC72C]/20" />
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                    {tutor.name}
                  </h2>
                  {tutor.verified && (
                    <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-[#FFC72C] bg-[#FFC72C]/10 border border-[#FFC72C]/30 px-2 py-0.5 rounded-md">
                      Verificado
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-300 font-medium">
                  {tutor.title}
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                  <span>{tutor.institution}</span>
                  <span aria-hidden="true" className="text-white/20">·</span>
                  <MapPin className="w-3.5 h-3.5 text-[#E02636]" />
                  <span>{tutor.municipality}, {tutor.province}</span>
                </div>
              </div>
            </div>

            {/* Quick Pricing & Booking CTA */}
            <div className="w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
              <div>
                <span className="text-[11px] text-slate-400 block text-left sm:text-right">Preço por aula (60 min)</span>
                <span className="text-2xl font-bold text-white font-display tabular-nums">
                  {tutor.pricePerHour.toLocaleString('pt-AO')} <span className="text-sm text-[#FFC72C]">Kz</span>
                </span>
              </div>
              <button
                onClick={() => handleStartBooking()}
                className="px-5 py-2.5 text-xs font-bold text-black bg-[#FFC72C] hover:bg-[#e6b325] rounded-xl transition-all shadow-md shadow-[#FFC72C]/20"
              >
                Agendar Aula
              </button>
            </div>
          </div>

          {/* Key Metrics / Anti-slop clean text layout */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-black/40 border border-white/5 text-center">
            <div>
              <span className="text-xs text-slate-400 block">Classificação</span>
              <div className="flex items-center justify-center gap-1 mt-0.5">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-base font-bold text-white tabular-nums">{tutor.rating.toFixed(1)}</span>
                <span className="text-xs text-slate-400">({tutor.reviewCount})</span>
              </div>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Taxa de Sucesso</span>
              <span className="text-base font-bold text-emerald-400 tabular-nums mt-0.5 block">
                {tutor.successRate}% aprovados
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Experiência</span>
              <span className="text-base font-bold text-white tabular-nums mt-0.5 block">
                {tutor.experienceYears} Anos
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Aulas Dadas</span>
              <span className="text-base font-bold text-white tabular-nums mt-0.5 block">
                +{tutor.hiredCount}
              </span>
            </div>
          </div>

          {/* Contact Action Bar (WhatsApp + Internal Chat) */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleWhatsApp}
              className="flex-1 py-3 px-4 text-xs font-bold text-white bg-[#25D366] hover:bg-[#20ba5a] rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20"
            >
              <Phone className="w-4 h-4 fill-white" />
              <span>Contactar via WhatsApp</span>
            </button>
            <button
              onClick={handleStartChat}
              className="flex-1 py-3 px-4 text-xs font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-[#FFC72C]" />
              <span>Iniciar Chat Interno</span>
            </button>
          </div>

          {/* Bio / Apresentação */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Apresentação Profissional
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {tutor.bio}
            </p>
          </div>

          {/* Disciplinas e Níveis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Disciplinas que Leciona
              </h3>
              <div className="flex flex-wrap gap-2">
                {tutor.subjects.map((sub, i) => (
                  <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-slate-200">
                    {sub}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Níveis Académicos Atendidos
              </h3>
              <div className="flex flex-wrap gap-2">
                {tutor.educationLevelsTaught.map((lvl, i) => (
                  <span key={i} className="px-3 py-1 bg-[#FFC72C]/10 border border-[#FFC72C]/20 rounded-lg text-xs text-[#FFC72C]">
                    {lvl}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Agenda de Disponibilidade Semanal */}
          <div className="space-y-3 p-5 rounded-xl bg-black/40 border border-white/5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#FFC72C]" />
                Agenda de Disponibilidade
              </h3>
              <span className="text-xs text-slate-400">Selecione um horário para marcar</span>
            </div>

            {/* Day selector tabs */}
            <div className="flex flex-wrap gap-2">
              {availableDays.map(day => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${selectedDay === day ? 'bg-[#FFC72C] text-black font-semibold' : 'bg-white/5 text-slate-300 hover:text-white'}`}
                >
                  {day}
                </button>
              ))}
            </div>

            {/* Time slots */}
            <div className="pt-2">
              <p className="text-xs text-slate-400 mb-2">Horários disponíveis para {selectedDay}:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {currentDayTimes.map((time, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleStartBooking(selectedDay, time)}
                    className="p-2.5 text-xs rounded-lg bg-white/5 hover:bg-[#FFC72C]/20 hover:border-[#FFC72C]/40 border border-white/10 text-white flex items-center justify-center gap-1.5 transition-colors group"
                  >
                    <Clock className="w-3.5 h-3.5 text-[#FFC72C] group-hover:scale-110 transition-transform" />
                    <span className="tabular-nums">{time}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Pacotes de Aulas com Desconto */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Pacotes de Explicação Recomendados
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {tutor.packages.map(pkg => (
                <div 
                  key={pkg.id} 
                  className={`p-4 rounded-xl border flex flex-col justify-between ${pkg.popular ? 'bg-gradient-to-b from-[#1C222B] to-[#161B22] border-[#FFC72C]/50' : 'bg-black/30 border-white/10'}`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white">{pkg.name}</span>
                      {pkg.discountPercent > 0 && (
                        <span className="text-[10px] text-emerald-400 font-bold">-{pkg.discountPercent}%</span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-slate-400">
                      {pkg.lessons} {pkg.lessons === 1 ? 'aula individual' : 'aulas de acompanhamento'}
                    </p>
                    <div className="mt-3">
                      <span className="text-lg font-bold text-white tabular-nums">
                        {pkg.priceKz.toLocaleString('pt-AO')} <span className="text-xs text-[#FFC72C]">Kz</span>
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleStartBooking()}
                    className="mt-4 w-full py-2 text-xs font-semibold rounded-lg bg-white/10 hover:bg-[#FFC72C] hover:text-black text-white transition-colors"
                  >
                    Contratar Pack
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Certificados e Validações */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#FFC72C]" />
              Habilitações & Certificados Verificados
            </h3>
            <div className="space-y-2">
              {tutor.certificates.map(cert => (
                <div key={cert.id} className="p-3 rounded-lg bg-black/30 border border-white/5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <p className="font-medium text-white">{cert.title}</p>
                      <p className="text-slate-400">{cert.issuer} · {cert.year}</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-medium">Validado</span>
                </div>
              ))}
            </div>
          </div>

          {/* Histórico de Avaliações */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Testemunhos & Avaliações ({tutorReviews.length})
                </h3>
                <p className="text-xs text-slate-400">Opiniões de alunos que concluíram explicações com este professor</p>
              </div>

              <button
                onClick={() => {
                  setTutorToReview(tutor);
                  setIsReviewModalOpen(true);
                }}
                className="px-3 py-1.5 text-xs font-medium text-[#FFC72C] hover:text-amber-300 border border-[#FFC72C]/30 rounded-lg transition-colors"
              >
                Escrever Avaliação
              </button>
            </div>

            <div className="space-y-3">
              {tutorReviews.length > 0 ? (
                tutorReviews.map(rev => (
                  <div key={rev.id} className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-xs text-white">{rev.studentName}</span>
                        <span className="text-[11px] text-slate-400 block">{rev.studentInstitution}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed italic">
                      "{rev.comment}"
                    </p>
                    <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1">
                      <span>Cadeira: {rev.subject}</span>
                      <span>{rev.date}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 italic">Nenhuma avaliação escrita ainda. Seja o primeiro a avaliar!</p>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Calendar, 
  CreditCard, 
  Heart, 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Star, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Video, 
  CheckCircle, 
  XCircle, 
  ExternalLink,
  ChevronRight,
  Download,
  Phone
} from 'lucide-react';
import { TutorCard } from './TutorCard';

export const DashboardView: React.FC = () => {
  const { 
    currentUser, 
    lessons, 
    payments, 
    favorites, 
    tutors, 
    updateLessonStatus, 
    setActiveChatTutor,
    setActiveTutorForProfile,
    setTutorToReview,
    setIsReviewModalOpen,
    switchDemoRole
  } = useApp();

  const [activeTab, setActiveTab] = useState<'aulas' | 'pagamentos' | 'favoritos' | 'agenda'>('aulas');

  const isTutor = currentUser?.role === 'tutor';

  // Filter lessons
  const userLessons = isTutor 
    ? lessons.filter(l => l.tutorId === currentUser?.tutorDetails?.id || l.tutorName === currentUser?.name)
    : lessons.filter(l => l.studentId === currentUser?.id || l.studentName === currentUser?.name);

  // Filter payments
  const userPayments = isTutor
    ? payments.filter(p => p.tutorId === currentUser?.tutorDetails?.id || p.tutorName === currentUser?.name)
    : payments.filter(p => p.studentId === currentUser?.id || p.studentId === 'demo-student');

  // Favorite tutors
  const favoriteTutors = tutors.filter(t => favorites.includes(t.id));

  // Tutor metrics
  const totalRevenueKz = userPayments.reduce((acc, p) => acc + p.amountKz, 0);
  const totalStudents = new Set(userLessons.map(l => l.studentId)).size || 12;

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header Profile Bar */}
      <div className="p-6 rounded-2xl bg-[#161B22] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
            alt={currentUser?.name || 'Utilizador'}
            referrerPolicy="no-referrer"
            className="w-16 h-16 rounded-2xl object-cover border border-white/15"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-white font-display">
                {currentUser?.name}
              </h1>
              <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold ${isTutor ? 'bg-[#FFC72C]/10 text-[#FFC72C] border border-[#FFC72C]/30' : 'bg-[#E02636]/10 text-[#E02636] border border-[#E02636]/30'}`}>
                {isTutor ? 'Painel do Explicador' : 'Painel do Estudante'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {isTutor 
                ? (currentUser?.tutorDetails?.title || 'Docente Verificado') 
                : `${currentUser?.studentDetails?.course || 'Estudante'} · ${currentUser?.studentDetails?.institution || 'Ensino Superior em Angola'}`
              }
            </p>
          </div>
        </div>

        {/* Quick Role Toggle Button */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 hidden sm:inline">Visualizar como:</span>
          <button
            onClick={() => switchDemoRole(isTutor ? 'student' : 'tutor')}
            className="px-3.5 py-2 text-xs font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors"
          >
            Mudar para {isTutor ? 'Estudante' : 'Explicador'}
          </button>
        </div>
      </div>

      {/* Tutor Metric Cards (Only shown if role is tutor) */}
      {isTutor && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-[#161B22] border border-white/10 space-y-1">
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              Receita Total
            </span>
            <p className="text-2xl font-bold text-white font-display tabular-nums">
              {totalRevenueKz.toLocaleString('pt-AO')} <span className="text-xs text-[#FFC72C]">Kz</span>
            </p>
            <span className="text-[11px] text-emerald-400 font-medium">100% recebido via Multicaixa</span>
          </div>

          <div className="p-4 rounded-xl bg-[#161B22] border border-white/10 space-y-1">
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#FFC72C]" />
              Alunos Ativos
            </span>
            <p className="text-2xl font-bold text-white font-display tabular-nums">
              {totalStudents} Estudantes
            </p>
            <span className="text-[11px] text-slate-400">Luanda e Províncias</span>
          </div>

          <div className="p-4 rounded-xl bg-[#161B22] border border-white/10 space-y-1">
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-amber-400" />
              Avaliação Média
            </span>
            <p className="text-2xl font-bold text-white font-display tabular-nums">
              {currentUser?.tutorDetails?.rating.toFixed(2) || '4.95'} ★
            </p>
            <span className="text-[11px] text-slate-400">48 avaliações confirmadas</span>
          </div>

          <div className="p-4 rounded-xl bg-[#161B22] border border-white/10 space-y-1">
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Taxa de Aprovação
            </span>
            <p className="text-2xl font-bold text-emerald-400 font-display tabular-nums">
              {currentUser?.tutorDetails?.successRate || 98}%
            </p>
            <span className="text-[11px] text-slate-400">Alunos que passaram no semestre</span>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('aulas')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${activeTab === 'aulas' ? 'bg-[#FFC72C] text-black' : 'text-slate-400 hover:text-white'}`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Aulas Marcadas ({userLessons.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('pagamentos')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${activeTab === 'pagamentos' ? 'bg-[#FFC72C] text-black' : 'text-slate-400 hover:text-white'}`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>Pagamentos & Recibos ({userPayments.length})</span>
        </button>

        {!isTutor && (
          <button
            onClick={() => setActiveTab('favoritos')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${activeTab === 'favoritos' ? 'bg-[#FFC72C] text-black' : 'text-slate-400 hover:text-white'}`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Explicadores Guardados ({favoriteTutors.length})</span>
          </button>
        )}
      </div>

      {/* Tab 1: Lessons */}
      {activeTab === 'aulas' && (
        <div className="space-y-4">
          {userLessons.length > 0 ? (
            userLessons.map(lesson => {
              const matchedTutor = tutors.find(t => t.id === lesson.tutorId || t.name === lesson.tutorName);
              return (
                <div 
                  key={lesson.id}
                  className="p-5 rounded-xl bg-[#161B22] border border-white/10 hover:border-white/20 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={lesson.tutorAvatar}
                      alt={lesson.tutorName}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-xl object-cover border border-white/10 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-white">{lesson.subject}</h4>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-semibold capitalize ${lesson.status === 'concluida' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'}`}>
                          {lesson.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-0.5">
                        {isTutor ? `Aluno: ${lesson.studentName}` : `Explicador: ${lesson.tutorName}`}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-2">
                        <span className="flex items-center gap-1 text-slate-300">
                          <Calendar className="w-3.5 h-3.5 text-[#FFC72C]" />
                          {lesson.date}
                        </span>
                        <span className="flex items-center gap-1 text-slate-300">
                          <Clock className="w-3.5 h-3.5 text-[#FFC72C]" />
                          {lesson.time}
                        </span>
                        <span className="flex items-center gap-1 text-slate-300 capitalize">
                          {lesson.modality === 'online' ? (
                            <>
                              <Video className="w-3.5 h-3.5 text-cyan-400" />
                              Online
                            </>
                          ) : (
                            <>
                              <MapPin className="w-3.5 h-3.5 text-[#E02636]" />
                              {lesson.locationDetails || 'Presencial'}
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions on lesson */}
                  <div className="flex flex-wrap items-center gap-2 self-end md:self-center">
                    {lesson.modality === 'online' && lesson.status === 'agendada' && (
                      <a
                        href={lesson.meetingLink || 'https://meet.google.com'}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center gap-1.5"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Entrar na Aula</span>
                      </a>
                    )}

                    {matchedTutor && (
                      <button
                        onClick={() => setActiveChatTutor(matchedTutor)}
                        className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-1"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-[#FFC72C]" />
                        <span>Chat</span>
                      </button>
                    )}

                    {!isTutor && lesson.status === 'concluida' && matchedTutor && (
                      <button
                        onClick={() => {
                          setTutorToReview(matchedTutor);
                          setIsReviewModalOpen(true);
                        }}
                        className="px-3 py-1.5 text-xs font-semibold text-amber-300 hover:text-amber-200 border border-amber-400/30 rounded-lg transition-colors flex items-center gap-1"
                      >
                        <Star className="w-3.5 h-3.5" />
                        <span>Avaliar Explicador</span>
                      </button>
                    )}

                    {isTutor && lesson.status === 'agendada' && (
                      <button
                        onClick={() => updateLessonStatus(lesson.id, 'concluida')}
                        className="px-3 py-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg transition-colors"
                      >
                        Marcar Concluída
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 p-6 rounded-xl bg-[#161B22] border border-white/10">
              <Calendar className="w-10 h-10 text-slate-500 mx-auto mb-2" />
              <h3 className="text-sm font-semibold text-white">Nenhuma aula marcada no momento</h3>
              <p className="text-xs text-slate-400 mt-1">
                Explore os nossos explicadores e agende a sua primeira aula com facilidade.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Payments & Receipts */}
      {activeTab === 'pagamentos' && (
        <div className="space-y-4">
          {userPayments.length > 0 ? (
            <div className="overflow-hidden rounded-xl border border-white/10 bg-[#161B22]">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-black/50 text-slate-400 border-b border-white/10 font-semibold">
                    <tr>
                      <th className="p-3.5">Referência / Recibo</th>
                      <th className="p-3.5">Explicador / Descrição</th>
                      <th className="p-3.5">Método de Pagamento</th>
                      <th className="p-3.5">Data</th>
                      <th className="p-3.5 text-right">Valor</th>
                      <th className="p-3.5 text-center">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    {userPayments.map(pay => (
                      <tr key={pay.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-3.5 font-mono text-white font-medium">
                          {pay.referenceNumber || pay.id}
                        </td>
                        <td className="p-3.5 font-semibold text-white">
                          {pay.tutorName}
                          <span className="block text-[11px] text-slate-400 font-normal">
                            {pay.planType === 'pacote_mensal' ? 'Pacote Mensal' : 'Aula Individual'}
                          </span>
                        </td>
                        <td className="p-3.5 capitalize">
                          {pay.method === 'multicaixa_express' ? 'Multicaixa Express (MCX)' : 'Transferência Bancária (BAI)'}
                        </td>
                        <td className="p-3.5 text-slate-400">
                          {pay.date}
                        </td>
                        <td className="p-3.5 text-right font-bold text-white tabular-nums">
                          {pay.amountKz.toLocaleString('pt-AO')} Kz
                        </td>
                        <td className="p-3.5 text-center">
                          <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <CheckCircle className="w-3 h-3" />
                            Confirmado
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 p-6 rounded-xl bg-[#161B22] border border-white/10">
              <CreditCard className="w-10 h-10 text-slate-500 mx-auto mb-2" />
              <h3 className="text-sm font-semibold text-white">Sem transações registradas</h3>
              <p className="text-xs text-slate-400 mt-1">Os seus comprovativos de Multicaixa Express aparecerão aqui.</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Favorites (Students) */}
      {activeTab === 'favoritos' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteTutors.length > 0 ? (
            favoriteTutors.map(tutor => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 p-6 rounded-xl bg-[#161B22] border border-white/10">
              <Heart className="w-10 h-10 text-slate-500 mx-auto mb-2" />
              <h3 className="text-sm font-semibold text-white">Ainda não guardou nenhum explicador</h3>
              <p className="text-xs text-slate-400 mt-1">Clique no coração de qualquer explicador para salvá-lo aqui.</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

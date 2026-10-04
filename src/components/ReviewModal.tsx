import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Star, Send } from 'lucide-react';

export const ReviewModal: React.FC = () => {
  const { 
    isReviewModalOpen, 
    setIsReviewModalOpen, 
    tutorToReview, 
    addReview 
  } = useApp();

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [subject, setSubject] = useState(tutorToReview ? tutorToReview.subjects[0] : 'Matemática');

  if (!isReviewModalOpen || !tutorToReview) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    addReview({
      tutorId: tutorToReview.id,
      rating,
      comment: comment.trim(),
      subject: subject || tutorToReview.subjects[0]
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-[#161B22] border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <h3 className="text-base font-bold text-white font-display">Avaliar Explicador</h3>
            <p className="text-xs text-slate-400">Ajude outros estudantes angolanos a escolher com confiança</p>
          </div>
          <button
            onClick={() => setIsReviewModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/5">
          <img
            src={tutorToReview.avatar}
            alt={tutorToReview.name}
            referrerPolicy="no-referrer"
            className="w-12 h-12 rounded-xl object-cover"
          />
          <div>
            <h4 className="text-sm font-semibold text-white">{tutorToReview.name}</h4>
            <p className="text-xs text-slate-400">{tutorToReview.title}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Star selector */}
          <div className="space-y-1 text-center py-2">
            <span className="text-xs text-slate-300 font-medium block">Como classifica a sua experiência?</span>
            <div className="flex items-center justify-center gap-2 pt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 hover:scale-125 transition-transform"
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= (hoverRating || rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-600'
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="text-xs font-bold text-amber-400 mt-1 block">
              {rating === 5 && 'Excelente! Super recomendo'}
              {rating === 4 && 'Muito Bom, ajudou bastante'}
              {rating === 3 && 'Bom, atendeu às expectativas'}
              {rating <= 2 && 'Pode melhorar'}
            </span>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Cadeira / Disciplina Explicada</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#FFC72C]"
            >
              {tutorToReview.subjects.map((s, idx) => (
                <option key={idx} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">O seu Testemunho e Comentário</label>
            <textarea
              required
              rows={4}
              placeholder="Descreva a metodologia do professor, a pontualidade e o impacto nas suas notas ou exames de acesso..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#FFC72C]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 text-xs font-bold text-black bg-[#FFC72C] hover:bg-[#e6b325] rounded-xl transition-all shadow-md shadow-[#FFC72C]/20 flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Publicar Avaliação</span>
          </button>
        </form>
      </div>
    </div>
  );
};

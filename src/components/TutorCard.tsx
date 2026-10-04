import React from 'react';
import { TutorProfile } from '../types';
import { useApp } from '../context/AppContext';
import { ThreeDCard } from './ThreeDCard';
import { 
  Star, 
  ShieldCheck, 
  MapPin, 
  MessageSquare, 
  Heart, 
  CheckCircle2, 
  Clock, 
  Phone
} from 'lucide-react';

interface TutorCardProps {
  tutor: TutorProfile;
}

export const TutorCard: React.FC<TutorCardProps> = ({ tutor }) => {
  const { 
    favorites, 
    toggleFavorite, 
    setActiveTutorForProfile, 
    setActiveTutorForBooking, 
    setActiveChatTutor 
  } = useApp();

  const isFavorited = favorites.includes(tutor.id);

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const cleanPhone = tutor.whatsapp.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(
      `Olá ${tutor.name}, vi o seu perfil no KAMBAEXPLICA e gostaria de agendar uma explicação de ${tutor.subjects[0]}.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  const handleChatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveChatTutor(tutor);
  };

  const handleBookClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveTutorForBooking(tutor);
  };

  return (
    <ThreeDCard depth={10} glowColor="rgba(255, 199, 44, 0.12)">
      <div 
        onClick={() => setActiveTutorForProfile(tutor)}
        className="group cursor-pointer rounded-2xl bg-[#161B22] border border-white/10 hover:border-[#FFC72C]/40 hover:bg-[#1C222B] transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-lg h-full"
      >
      <div className="p-5">
        {/* Header: Photo + Info + Favorite */}
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <img 
              src={tutor.avatar} 
              alt={tutor.name}
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-xl object-cover border border-white/10 group-hover:border-[#FFC72C]/50 transition-colors"
            />
            {tutor.verified && (
              <span 
                title="Explicador Verificado KAMBAEXPLICA (BI e Habilitações confirmadas)" 
                className="absolute -bottom-1 -right-1 p-0.5 bg-[#161B22] rounded-full"
              >
                <ShieldCheck className="w-4 h-4 text-[#FFC72C] fill-[#FFC72C]/20" />
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <h3 className="font-display font-semibold text-base text-white truncate group-hover:text-[#FFC72C] transition-colors">
                {tutor.name}
              </h3>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(tutor.id);
                }}
                className="p-1 text-slate-400 hover:text-[#E02636] transition-colors"
                title={isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#E02636] text-[#E02636]' : ''}`} />
              </button>
            </div>

            <p className="text-xs text-slate-400 truncate mt-0.5">
              {tutor.title}
            </p>

            {/* Unboxed Metadata with clean typographic separators */}
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-2">
              <span className="flex items-center gap-1 font-semibold text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="tabular-nums">{tutor.rating.toFixed(1)}</span>
              </span>
              <span aria-hidden="true" className="text-white/20">·</span>
              <span className="tabular-nums">{tutor.reviewCount} avaliações</span>
              <span aria-hidden="true" className="text-white/20">·</span>
              <span className="text-emerald-400 font-medium tabular-nums">{tutor.successRate}% aprovação</span>
            </div>
          </div>
        </div>

        {/* Bio preview */}
        <p className="mt-3.5 text-xs text-slate-300 line-clamp-2 leading-relaxed">
          {tutor.bio}
        </p>

        {/* Disciplinas unboxed list */}
        <div className="mt-3 pt-3 border-t border-white/5 flex flex-wrap gap-1.5 text-xs">
          {tutor.subjects.slice(0, 3).map((sub, i) => (
            <span key={i} className="text-slate-300">
              {sub} {i < Math.min(tutor.subjects.length, 3) - 1 ? '·' : ''}
            </span>
          ))}
          {tutor.subjects.length > 3 && (
            <span className="text-[#FFC72C] text-xs">+{tutor.subjects.length - 3} mais</span>
          )}
        </div>

        {/* Location & Modality */}
        <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1 truncate max-w-[180px]">
            <MapPin className="w-3 h-3 text-[#E02636] shrink-0" />
            <span className="truncate">{tutor.municipality}, {tutor.province}</span>
          </div>
          <span className="capitalize text-slate-400">
            {tutor.modalities === 'ambos' ? 'Presencial & Online' : tutor.modalities}
          </span>
        </div>
      </div>

      {/* Footer / Price & Interactive Actions */}
      <div className="px-5 py-3.5 bg-black/30 border-t border-white/5 flex items-center justify-between gap-2">
        <div>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Preço por hora</span>
          <span className="font-display font-bold text-base text-white tabular-nums">
            {tutor.pricePerHour.toLocaleString('pt-AO')} <span className="text-xs text-[#FFC72C] font-normal">Kz</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleWhatsAppClick}
            className="p-2 text-emerald-400 hover:text-white hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg transition-colors"
            title="Contactar via WhatsApp"
          >
            <Phone className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleChatClick}
            className="p-2 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
            title="Iniciar Chat Interno"
          >
            <MessageSquare className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleBookClick}
            className="px-3 py-2 text-xs font-bold text-black bg-[#FFC72C] hover:bg-[#e6b325] rounded-lg transition-colors whitespace-nowrap shadow-sm"
          >
            Marcar Aula
          </button>
        </div>
      </div>
    </div>
    </ThreeDCard>
  );
};

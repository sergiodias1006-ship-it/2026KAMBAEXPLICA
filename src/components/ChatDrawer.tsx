import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Send, 
  Phone, 
  Paperclip, 
  CheckCheck, 
  ShieldCheck, 
  MessageSquare,
  Sparkles
} from 'lucide-react';

export const ChatDrawer: React.FC = () => {
  const { 
    activeChatTutor, 
    setActiveChatTutor, 
    currentUser, 
    messages, 
    sendMessage 
  } = useApp();

  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const tutor = activeChatTutor;

  // Filter messages for current conversation
  const conversationMessages = messages.filter(
    m => tutor && (m.conversationId === tutor.id || m.senderId === tutor.id || m.receiverId === tutor.id)
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationMessages]);

  if (!tutor) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(tutor.id, inputText);
    setInputText('');
  };

  const handleOpenWhatsApp = () => {
    const cleanPhone = tutor.whatsapp.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(
      `Olá ${tutor.name}, estou a conversar consigo pelo KAMBAEXPLICA e gostaria de agilizar os detalhes aqui pelo WhatsApp.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] bg-[#161B22] border-l border-white/10 shadow-2xl flex flex-col justify-between">
      {/* Top Header */}
      <div className="p-4 border-b border-white/10 bg-black/40 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative shrink-0">
            <img
              src={tutor.avatar}
              alt={tutor.name}
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-xl object-cover border border-white/10"
            />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute -bottom-0.5 -right-0.5 border-2 border-[#161B22]" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-bold text-white truncate">{tutor.name}</h3>
              {tutor.verified && <ShieldCheck className="w-3.5 h-3.5 text-[#FFC72C] shrink-0" />}
            </div>
            <p className="text-[11px] text-slate-400 truncate">
              {tutor.subjects[0]} · Responde em minutos
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleOpenWhatsApp}
            className="p-2 text-emerald-400 hover:text-white hover:bg-emerald-500/20 rounded-lg transition-colors"
            title="Continuar no WhatsApp"
          >
            <Phone className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveChatTutor(null)}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Message Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#0D0F12]/60">
        <div className="text-center my-2">
          <span className="text-[10px] text-slate-500 bg-white/5 px-2.5 py-1 rounded-full">
            Conversa segura e encriptada · KAMBAEXPLICA
          </span>
        </div>

        {conversationMessages.map((msg) => {
          const isMe = msg.senderId === currentUser?.id || msg.senderName === currentUser?.name;
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                  isMe
                    ? 'bg-[#E02636] text-white rounded-br-none shadow-md'
                    : 'bg-[#1C222B] text-slate-200 border border-white/5 rounded-bl-none'
                }`}
              >
                <p>{msg.text}</p>
              </div>
              <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-500">
                <span>{msg.timestamp}</span>
                {isMe && <CheckCheck className="w-3 h-3 text-emerald-400" />}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Box */}
      <form onSubmit={handleSend} className="p-3 border-t border-white/10 bg-black/40 space-y-2">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder={`Escreva uma mensagem para ${tutor.name.split(' ')[0]}...`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-3 py-2 text-xs bg-black/60 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#FFC72C]"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2.5 bg-[#FFC72C] disabled:opacity-40 text-black hover:bg-[#e6b325] rounded-xl transition-colors shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
          <span>Pode também tirar dúvidas via WhatsApp</span>
          <button
            type="button"
            onClick={handleOpenWhatsApp}
            className="text-emerald-400 hover:underline flex items-center gap-1 font-medium"
          >
            <Phone className="w-3 h-3" />
            <span>Abrir WhatsApp</span>
          </button>
        </div>
      </form>
    </div>
  );
};

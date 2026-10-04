import React, { useState } from 'react';
import { Phone, X, MessageSquare, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [msgText, setMsgText] = useState('');
  const { currentUser } = useApp();

  const handleSendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const finalMsg = encodeURIComponent(
      msgText || `Olá Suporte KAMBAEXPLICA! O meu nome é ${currentUser?.name || 'Visitante'} e gostaria de obter apoio.`
    );
    window.open(`https://wa.me/244923000000?text=${finalMsg}`, '_blank');
    setIsOpen(false);
    setMsgText('');
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {isOpen && (
        <div className="mb-3 w-80 rounded-2xl bg-[#161B22] border border-white/10 shadow-2xl p-4 text-xs space-y-3 animate-in fade-in slide-in-from-bottom-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#25D366] flex items-center justify-center text-white">
                <Phone className="w-4 h-4 fill-white" />
              </div>
              <div>
                <p className="font-bold text-white">Apoio KAMBAEXPLICA</p>
                <p className="text-[10px] text-emerald-400">● Online em Luanda</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-slate-300 text-[11px] leading-relaxed">
            Olá! Precisa de ajuda para encontrar um explicador ou tem dúvidas sobre pagamentos Multicaixa Express? Converse connosco no WhatsApp.
          </p>

          <form onSubmit={handleSendToWhatsApp} className="space-y-2">
            <input
              type="text"
              placeholder="Escreva a sua dúvida aqui..."
              value={msgText}
              onChange={(e) => setMsgText(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-black/60 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#25D366]"
            />
            <button
              type="submit"
              className="w-full py-2 px-3 text-xs font-bold text-white bg-[#25D366] hover:bg-[#20ba5a] rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Abrir no WhatsApp Oficial</span>
            </button>
          </form>
        </div>
      )}

      {/* Main floating trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-xl shadow-[#25D366]/30 flex items-center justify-center transition-all transform hover:scale-110 focus:outline-none"
        title="Falar no WhatsApp"
      >
        <Phone className="w-6 h-6 fill-white" />
      </button>
    </div>
  );
};

import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Phone, 
  Mail, 
  ShieldCheck, 
  HelpCircle, 
  CreditCard, 
  MapPin, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';

export const SupportModal: React.FC = () => {
  const { isSupportModalOpen, setIsSupportModalOpen } = useApp();

  const [openFaq, setOpenFaq] = React.useState<number | null>(0);

  if (!isSupportModalOpen) return null;

  const faqs = [
    {
      q: 'Como funciona o pagamento via Multicaixa Express?',
      a: 'Ao selecionar o Multicaixa Express no KAMBAEXPLICA, insira o seu número de telemóvel associado. Receberá imediatamente uma notificação no seu telemóvel para aprovar o montante em Kwanzas através do seu PIN secreto. Os fundos ficam em custódia segura até à realização da aula.'
    },
    {
      q: 'Onde decorrem as explicações presenciais?',
      a: 'Recomendamos locais académicos neutros e seguros: bibliotecas universitárias (UAN Camama, ISPTEC, UCAN), Mediatecas de Luanda (Talatona, Cazenga) ou salas de estudo climatizadas. O ponto exato de encontro é coordenado diretamente no chat da plataforma.'
    },
    {
      q: 'Como são verificados os explicadores (Selo de Confiança)?',
      a: 'A nossa equipa valida o Bilhete de Identidade (BI), certificados de habilitações literárias e faz uma entrevista pedagógica preliminar antes de atribuir o selo de verificação a qualquer explicador.'
    },
    {
      q: 'E se o explicador ou o aluno faltar à aula?',
      a: 'Se o explicador faltar sem aviso prévio de 24 horas, o valor total é reembolsado imediatamente para a sua conta ou convertido em créditos para remarcação imediata sem qualquer custo.'
    }
  ];

  const handleSupportWhatsApp = () => {
    const text = encodeURIComponent('Olá Equipa KAMBAEXPLICA! Preciso de assistência na plataforma.');
    window.open(`https://wa.me/244923000000?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-xl bg-[#161B22] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 bg-black/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#FFC72C]" />
            <h3 className="text-base font-bold text-white font-display">Apoio ao Estudante & Explicador</h3>
          </div>
          <button
            onClick={() => setIsSupportModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Quick Channels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleSupportWhatsApp}
              className="p-4 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-colors text-left flex items-start gap-3"
            >
              <div className="p-2 bg-[#25D366] text-white rounded-lg">
                <Phone className="w-4 h-4 fill-white" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">WhatsApp de Suporte</span>
                <span className="text-[11px] text-slate-400">+244 923 000 000</span>
                <span className="text-[10px] text-emerald-400 font-medium block mt-1">Atendimento imediato</span>
              </div>
            </button>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-left flex items-start gap-3">
              <div className="p-2 bg-[#E02636] text-white rounded-lg">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Email Institucional</span>
                <span className="text-[11px] text-slate-400">suporte@kambaexplica.ao</span>
                <span className="text-[10px] text-slate-400 block mt-1">Resposta em até 24h</span>
              </div>
            </div>
          </div>

          {/* Trust and Safety Banner */}
          <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-start gap-3 text-xs">
            <ShieldCheck className="w-5 h-5 text-[#FFC72C] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-white">Garantia Pedagógica KAMBAEXPLICA</h4>
              <p className="text-slate-400 mt-0.5 leading-relaxed">
                Todas as explicações contratadas pela plataforma contam com proteção de pagamento via EMIS Angola e mediação pedagógica em caso de imprevistos.
              </p>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Perguntas Frequentes</h4>
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-white/5 rounded-xl bg-black/30 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full p-3.5 text-left text-xs font-semibold text-white flex items-center justify-between hover:bg-white/5 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-3.5 pb-3.5 text-xs text-slate-400 leading-relaxed border-t border-white/5 pt-2">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Legal and terms disclaimer */}
          <div className="pt-2 border-t border-white/5 text-[11px] text-slate-500">
            KAMBAEXPLICA é uma startup angolana registada em conformidade com as diretrizes do Ministério das Telecomunicações, Tecnologias de Informação e Comunicação Social (MINTTICS) e Ministério do Ensino Superior.
          </div>
        </div>
      </div>
    </div>
  );
};

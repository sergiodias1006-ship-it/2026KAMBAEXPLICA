import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  Smartphone, 
  Building2, 
  ArrowRight,
  AlertCircle,
  FileText
} from 'lucide-react';
import { TutorProfile } from '../types';

export const BookingModal: React.FC = () => {
  const { 
    activeTutorForBooking, 
    setActiveTutorForBooking, 
    currentUser, 
    bookLesson,
    setActiveView 
  } = useApp();

  const tutor = activeTutorForBooking;

  const [step, setStep] = useState<'details' | 'payment' | 'processing' | 'success'>('details');
  const [selectedSubject, setSelectedSubject] = useState(tutor ? tutor.subjects[0] : '');
  const [selectedDate, setSelectedDate] = useState('2026-10-06');
  const [selectedTime, setSelectedTime] = useState('14:00');
  const [modality, setModality] = useState<'online' | 'presencial'>('online');
  const [locationDetails, setLocationDetails] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<'single' | string>('single');
  const [notes, setNotes] = useState('');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'multicaixa_express' | 'transferencia_bancaria'>('multicaixa_express');
  const [mcxPhone, setMcxPhone] = useState(currentUser?.phone || '+244 923 111 222');
  const [receiptData, setReceiptData] = useState<any>(null);

  if (!tutor) return null;

  // Calculate pricing based on selection
  const singlePrice = tutor.pricePerHour;
  const currentPackageObj = tutor.packages.find(p => p.id === selectedPackage);
  const totalPrice = currentPackageObj ? currentPackageObj.priceKz : singlePrice;

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleConfirmPayment = async () => {
    setStep('processing');

    // Simulate Multicaixa Express push notification verification (2.5 seconds)
    setTimeout(async () => {
      const res = await bookLesson({
        tutor: tutor,
        subject: selectedSubject || tutor.subjects[0],
        date: selectedDate,
        time: selectedTime,
        modality: modality,
        locationDetails: modality === 'presencial' ? (locationDetails || `${tutor.municipality}, ${tutor.province}`) : undefined,
        paymentMethod: paymentMethod,
        multicaixaPhone: paymentMethod === 'multicaixa_express' ? mcxPhone : undefined,
        notes: notes,
        packageId: selectedPackage === 'single' ? undefined : selectedPackage,
        priceKz: totalPrice
      });

      setReceiptData(res);
      setStep('success');
    }, 2500);
  };

  const handleClose = () => {
    setActiveTutorForBooking(null);
    setStep('details');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-2xl bg-[#161B22] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFC72C]" />
            <h2 className="text-base font-bold text-white font-display">
              {step === 'details' && '1. Agendar Aula de Explicação'}
              {step === 'payment' && '2. Pagamento Multicaixa Express / Transferência'}
              {step === 'processing' && 'A Processar Transação Multicaixa...'}
              {step === 'success' && 'Aula Agendada com Sucesso!'}
            </h2>
          </div>
          {step !== 'processing' && (
            <button
              onClick={handleClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Step 1: Details */}
        {step === 'details' && (
          <form onSubmit={handleProceedToPayment} className="p-6 space-y-5">
            {/* Tutor Header summary */}
            <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center gap-3">
              <img
                src={tutor.avatar}
                alt={tutor.name}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-xl object-cover border border-white/10"
              />
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-semibold text-white truncate">{tutor.name}</h4>
                <p className="text-xs text-slate-400 truncate">{tutor.title}</p>
                <p className="text-xs text-[#FFC72C] font-medium">{tutor.municipality}, {tutor.province}</p>
              </div>
            </div>

            {/* Select Subject */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Disciplina / Matéria</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#FFC72C]"
                required
              >
                {tutor.subjects.map((sub, i) => (
                  <option key={i} value={sub}>{sub}</option>
                ))}
              </select>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#FFC72C]" />
                  Data da Aula
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min="2026-10-04"
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#FFC72C]"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#FFC72C]" />
                  Horário
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#FFC72C]"
                  required
                >
                  <option value="09:00">09:00 - 10:00</option>
                  <option value="11:00">11:00 - 12:00</option>
                  <option value="14:00">14:00 - 15:00</option>
                  <option value="16:00">16:00 - 17:00</option>
                  <option value="18:00">18:00 - 19:00</option>
                </select>
              </div>
            </div>

            {/* Modality */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Modalidade de Ensino</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setModality('online')}
                  className={`p-3 text-xs font-medium rounded-xl border text-left flex items-center justify-between transition-colors ${modality === 'online' ? 'bg-[#FFC72C]/10 border-[#FFC72C] text-white' : 'bg-black/30 border-white/10 text-slate-400'}`}
                >
                  <div>
                    <span className="font-semibold block text-white">Online (Google Meet / Sala Digital)</span>
                    <span className="text-[11px] text-slate-400">Link gerado automaticamente</span>
                  </div>
                  {modality === 'online' && <CheckCircle2 className="w-4 h-4 text-[#FFC72C]" />}
                </button>

                <button
                  type="button"
                  onClick={() => setModality('presencial')}
                  className={`p-3 text-xs font-medium rounded-xl border text-left flex items-center justify-between transition-colors ${modality === 'presencial' ? 'bg-[#FFC72C]/10 border-[#FFC72C] text-white' : 'bg-black/30 border-white/10 text-slate-400'}`}
                >
                  <div>
                    <span className="font-semibold block text-white">Presencial</span>
                    <span className="text-[11px] text-slate-400">Na biblioteca, campus ou domicílio</span>
                  </div>
                  {modality === 'presencial' && <CheckCircle2 className="w-4 h-4 text-[#FFC72C]" />}
                </button>
              </div>
            </div>

            {/* Presential location details if selected */}
            {modality === 'presencial' && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#E02636]" />
                  Local de Encontro Sugerido em {tutor.province}
                </label>
                <input
                  type="text"
                  placeholder="Ex: Biblioteca da Faculdade de Engenharia UAN / Mediateca de Luanda"
                  value={locationDetails}
                  onChange={(e) => setLocationDetails(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#FFC72C]"
                />
              </div>
            )}

            {/* Packages / Single Lesson Option */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Escolha o Plano de Aulas</label>
              <div className="space-y-2">
                <label className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer ${selectedPackage === 'single' ? 'bg-[#FFC72C]/10 border-[#FFC72C]' : 'bg-black/30 border-white/10'}`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="pkg"
                      checked={selectedPackage === 'single'}
                      onChange={() => setSelectedPackage('single')}
                      className="accent-[#FFC72C]"
                    />
                    <div>
                      <p className="text-xs font-semibold text-white">Aula Individual (60 minutos)</p>
                      <p className="text-[11px] text-slate-400">Ideal para tirar dúvidas pontuais antes de testes</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-white tabular-nums">
                    {singlePrice.toLocaleString('pt-AO')} Kz
                  </span>
                </label>

                {tutor.packages.filter(p => p.lessons > 1).map(pkg => (
                  <label key={pkg.id} className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer ${selectedPackage === pkg.id ? 'bg-[#FFC72C]/10 border-[#FFC72C]' : 'bg-black/30 border-white/10'}`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="pkg"
                        checked={selectedPackage === pkg.id}
                        onChange={() => setSelectedPackage(pkg.id)}
                        className="accent-[#FFC72C]"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-semibold text-white">{pkg.name}</p>
                          <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                            -{pkg.discountPercent}%
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400">{pkg.lessons} aulas com acompanhamento contínuo</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-white tabular-nums">
                      {pkg.priceKz.toLocaleString('pt-AO')} Kz
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Notas para o Explicador (Opcional)</label>
              <textarea
                placeholder="Ex: Gostaria de rever resolução de equações diferenciais e exercícios da ficha 3..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 text-xs bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#FFC72C]"
              />
            </div>

            {/* Footer Summary & Proceed */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400 block">Total a Pagar</span>
                <span className="text-xl font-bold text-white font-display tabular-nums">
                  {totalPrice.toLocaleString('pt-AO')} <span className="text-xs text-[#FFC72C]">Kz</span>
                </span>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-bold text-black bg-[#FFC72C] hover:bg-[#e6b325] rounded-xl transition-all flex items-center gap-2 shadow-md shadow-[#FFC72C]/20"
              >
                <span>Avançar para Pagamento</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Payment Gateway Selection */}
        {step === 'payment' && (
          <div className="p-6 space-y-6">
            {/* Order Recap */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400">Explicação de {selectedSubject}</span>
                <p className="text-sm font-bold text-white">{tutor.name}</p>
                <p className="text-xs text-slate-400">{selectedDate} às {selectedTime} ({modality})</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">Total</span>
                <p className="text-xl font-bold text-[#FFC72C] tabular-nums">
                  {totalPrice.toLocaleString('pt-AO')} Kz
                </p>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-300">Selecione o Meio de Pagamento em Angola</label>
              
              {/* Multicaixa Express */}
              <div 
                onClick={() => setPaymentMethod('multicaixa_express')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'multicaixa_express' ? 'bg-[#E02636]/10 border-[#E02636]' : 'bg-black/30 border-white/10'}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#E02636] flex items-center justify-center text-white font-bold">
                      <Smartphone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white flex items-center gap-2">
                        Multicaixa Express (MCX)
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-medium">Recomendado</span>
                      </p>
                      <p className="text-xs text-slate-400">Autorização instantânea através do telemóvel</p>
                    </div>
                  </div>
                  {paymentMethod === 'multicaixa_express' && <CheckCircle2 className="w-5 h-5 text-[#E02636]" />}
                </div>

                {paymentMethod === 'multicaixa_express' && (
                  <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
                    <label className="text-xs font-medium text-slate-300 block">
                      Número de Telemóvel Associado ao Multicaixa Express
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="px-3 py-2 bg-black/60 border border-white/10 rounded-lg text-xs font-medium text-slate-300">
                        🇦🇴 +244
                      </div>
                      <input
                        type="text"
                        placeholder="923 111 222"
                        value={mcxPhone}
                        onChange={(e) => setMcxPhone(e.target.value)}
                        className="flex-1 px-3 py-2 text-sm bg-black/60 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E02636]"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Receberá uma solicitação na app Multicaixa Express no seu telemóvel para inserir o seu PIN.
                    </p>
                  </div>
                )}
              </div>

              {/* Transferência Bancária / Referência Multicaixa */}
              <div 
                onClick={() => setPaymentMethod('transferencia_bancaria')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'transferencia_bancaria' ? 'bg-[#FFC72C]/10 border-[#FFC72C]' : 'bg-black/30 border-white/10'}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-[#FFC72C]">
                      <Building2 className="w-5 h-5 text-[#FFC72C]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Transferência Bancária / Pagamento por Referência</p>
                      <p className="text-xs text-slate-400">BAI, BFA, BIC, Millennium Atlântico, Standard Bank</p>
                    </div>
                  </div>
                  {paymentMethod === 'transferencia_bancaria' && <CheckCircle2 className="w-5 h-5 text-[#FFC72C]" />}
                </div>

                {paymentMethod === 'transferencia_bancaria' && (
                  <div className="mt-4 pt-3 border-t border-white/10 space-y-2 text-xs">
                    <div className="p-3 rounded-lg bg-black/60 border border-white/5 space-y-1.5 font-mono text-[11px]">
                      <p><span className="text-slate-400 font-sans">Entidade EMIS:</span> <strong className="text-white">00104 (KAMBAEXPLICA)</strong></p>
                      <p><span className="text-slate-400 font-sans">Referência:</span> <strong className="text-white">928 104 319</strong></p>
                      <p><span className="text-slate-400 font-sans">IBAN BAI:</span> <strong className="text-white">AO06.0040.0000.1829.1029.1018.4</strong></p>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      O sistema audita a referência automaticamente após a confirmação.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white"
              >
                Voltar
              </button>

              <button
                type="button"
                onClick={handleConfirmPayment}
                className="px-6 py-2.5 text-xs font-bold text-white bg-[#E02636] hover:bg-[#c81e2d] rounded-xl transition-all shadow-md shadow-[#E02636]/20 flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Pagar {totalPrice.toLocaleString('pt-AO')} Kz com {paymentMethod === 'multicaixa_express' ? 'Multicaixa Express' : 'Referência'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Realistic Multicaixa Express Processing Simulation */}
        {step === 'processing' && (
          <div className="p-10 text-center space-y-4">
            <div className="relative mx-auto w-16 h-16 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-[#E02636]/20 border-t-[#E02636] animate-spin" />
              <Smartphone className="w-6 h-6 text-[#E02636]" />
            </div>

            <h3 className="text-lg font-bold text-white">Aguardando autorização no seu telemóvel...</h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Enviámos uma notificação push para o número <strong className="text-white">{mcxPhone}</strong>. Abra a sua aplicação Multicaixa Express ou confirme a notificação na tela para validar a transação de <strong className="text-[#FFC72C]">{totalPrice.toLocaleString('pt-AO')} Kz</strong>.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>A sincronizar com a rede EMIS Angola</span>
            </div>
          </div>
        )}

        {/* Step 4: Success with Angolan receipt summary */}
        {step === 'success' && (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white font-display">Pagamento Confirmado com Sucesso!</h3>
              <p className="text-xs text-slate-300">
                A sua aula de <strong className="text-white">{selectedSubject}</strong> com o professor <strong className="text-white">{tutor.name}</strong> está oficialmente confirmada.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-left space-y-2 text-xs max-w-md mx-auto">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-400">Recibo / ID da Transação:</span>
                <span className="font-mono text-white font-semibold">{receiptData?.payment?.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Valor Pago:</span>
                <span className="font-bold text-[#FFC72C]">{totalPrice.toLocaleString('pt-AO')} Kz</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Meio de Pagamento:</span>
                <span className="text-slate-200 capitalize">{paymentMethod.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Data e Hora da Aula:</span>
                <span className="text-white">{selectedDate} às {selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Modalidade:</span>
                <span className="text-white capitalize">{modality}</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  handleClose();
                  setActiveView('dashboard');
                }}
                className="px-5 py-2.5 text-xs font-bold text-black bg-[#FFC72C] hover:bg-[#e6b325] rounded-xl transition-colors"
              >
                Ver no Meu Painel
              </button>
              <button
                onClick={handleClose}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/15 rounded-xl transition-colors"
              >
                Continuar a Explorar
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

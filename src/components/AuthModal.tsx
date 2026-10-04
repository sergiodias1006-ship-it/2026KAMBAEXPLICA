import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  GraduationCap, 
  User, 
  ShieldCheck, 
  Upload, 
  CheckCircle, 
  Lock, 
  Mail, 
  Phone, 
  MapPin, 
  BookOpen, 
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { ANGOLAN_PROVINCES, LUANDA_MUNICIPALITIES, ANGOLAN_INSTITUTIONS } from '../data/mockData';
import { EducationLevel, AcademicDegree, Modality } from '../types';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authModalTab, 
    setAuthModalTab, 
    registerStudent, 
    registerTutor,
    setCurrentUser,
    tutors
  } = useApp();

  // Student Form State
  const [studentForm, setStudentForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    educationLevel: 'Licenciatura' as EducationLevel,
    institution: 'Universidade Agostinho Neto (UAN)',
    course: '',
    province: 'Luanda',
    municipality: 'Talatona'
  });

  // Tutor Form State
  const [tutorForm, setTutorForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    avatar: '/src/assets/images/tutor_portrait_female_1791076334961.jpg',
    idDocumentNumber: '',
    academicDegree: 'Licenciatura' as AcademicDegree,
    institution: 'Universidade Agostinho Neto (UAN)',
    specialization: '',
    subjects: 'Matemática e Cálculo',
    experienceYears: 3,
    pricePerHour: 3500,
    modalities: 'ambos' as Modality,
    province: 'Luanda',
    municipality: 'Talatona',
    bio: '',
    certificateFile: null as string | null
  });

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentForm.name || !studentForm.email || !studentForm.phone) {
      setErrorMsg('Por favor preencha todos os campos obrigatórios.');
      return;
    }
    registerStudent(studentForm);
  };

  const handleTutorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tutorForm.name || !tutorForm.email || !tutorForm.phone || !tutorForm.idDocumentNumber) {
      setErrorMsg('Por favor preencha os dados de identificação.');
      return;
    }
    if (tutorForm.pricePerHour < 2000) {
      setErrorMsg('O preço mínimo regulamentado no KAMBAEXPLICA é de 2.000 Kz por aula.');
      return;
    }
    registerTutor(tutorForm);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    const foundTutor = tutors.find(t => t.name.toLowerCase().includes(loginEmail.toLowerCase()) || loginEmail.includes('tutor'));
    if (foundTutor) {
      setCurrentUser({
        id: foundTutor.userId,
        role: 'tutor',
        name: foundTutor.name,
        email: loginEmail || 'explicador@kambaexplica.ao',
        phone: foundTutor.phone,
        avatar: foundTutor.avatar,
        province: foundTutor.province,
        municipality: foundTutor.municipality,
        tutorDetails: foundTutor
      });
    } else {
      // Default to student demo
      setCurrentUser({
        id: 'student-logged',
        role: 'student',
        name: loginEmail.split('@')[0] || 'Estudante Angolano',
        email: loginEmail || 'estudante@aluno.ao',
        phone: '+244 923 111 222',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        province: 'Luanda',
        municipality: 'Talatona',
        studentDetails: {
          educationLevel: 'Licenciatura',
          institution: 'Universidade Agostinho Neto (UAN)',
          course: 'Engenharia'
        }
      });
    }
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-xl bg-[#161B22] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-6">
        
        {/* Header Tabs */}
        <div className="bg-black/50 border-b border-white/10 p-4 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              onClick={() => { setAuthModalTab('student'); setErrorMsg(''); }}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${authModalTab === 'student' ? 'bg-[#E02636] text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
            >
              Sou Estudante
            </button>
            <button
              onClick={() => { setAuthModalTab('tutor'); setErrorMsg(''); }}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${authModalTab === 'tutor' ? 'bg-[#FFC72C] text-black font-bold shadow-sm' : 'text-slate-400 hover:text-white'}`}
            >
              Sou Explicador
            </button>
            <button
              onClick={() => { setAuthModalTab('login'); setErrorMsg(''); }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${authModalTab === 'login' ? 'bg-white/15 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Entrar
            </button>
          </div>

          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="mx-6 mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* 3.1 Estudante Form */}
        {authModalTab === 'student' && (
          <form onSubmit={handleStudentSubmit} className="p-6 space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white font-display">Cadastro de Estudante</h3>
              <p className="text-xs text-slate-400">
                Aceda aos explicadores mais bem qualificados para o seu ano curricular.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300">Nome Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Mauro Kiala dos Santos"
                  value={studentForm.name}
                  onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                  className="w-full mt-1 px-3 py-2 text-xs bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E02636]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300">Email Académico / Pessoal</label>
                  <input
                    type="email"
                    required
                    placeholder="mauro@aluno.uan.ao"
                    value={studentForm.email}
                    onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                    className="w-full mt-1 px-3 py-2 text-xs bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E02636]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">Telefone (com WhatsApp)</label>
                  <input
                    type="text"
                    required
                    placeholder="+244 923 000 000"
                    value={studentForm.phone}
                    onChange={(e) => setStudentForm({ ...studentForm, phone: e.target.value })}
                    className="w-full mt-1 px-3 py-2 text-xs bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E02636]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Palavra-passe</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={studentForm.password}
                  onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })}
                  className="w-full mt-1 px-3 py-2 text-xs bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E02636]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300">Nível de Ensino</label>
                  <select
                    value={studentForm.educationLevel}
                    onChange={(e) => setStudentForm({ ...studentForm, educationLevel: e.target.value as EducationLevel })}
                    className="w-full mt-1 px-3 py-2 text-xs bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E02636]"
                  >
                    <option value="Ensino Secundário">Ensino Secundário (10ª - 13ª)</option>
                    <option value="Pré-Universitário / Exames de Acesso">Exames de Acesso (UAN/ISPTEC)</option>
                    <option value="Licenciatura">Licenciatura Universitária</option>
                    <option value="Mestrado">Mestrado</option>
                    <option value="Doutoramento">Doutoramento</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">Instituição de Ensino</label>
                  <input
                    type="text"
                    placeholder="Ex: UAN, ISPTEC, IMIL, Metodista..."
                    value={studentForm.institution}
                    onChange={(e) => setStudentForm({ ...studentForm, institution: e.target.value })}
                    className="w-full mt-1 px-3 py-2 text-xs bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E02636]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Curso / Especialidade</label>
                <input
                  type="text"
                  placeholder="Ex: Engenharia Informática, Direito, Gestão..."
                  value={studentForm.course}
                  onChange={(e) => setStudentForm({ ...studentForm, course: e.target.value })}
                  className="w-full mt-1 px-3 py-2 text-xs bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E02636]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 text-xs font-bold text-white bg-[#E02636] hover:bg-[#c81e2d] rounded-xl transition-all shadow-md shadow-[#E02636]/25 mt-4"
            >
              Criar Conta de Estudante
            </button>
          </form>
        )}

        {/* 3.2 Explicador Form */}
        {authModalTab === 'tutor' && (
          <form onSubmit={handleTutorSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-[#FFC72C] font-semibold mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Credenciamento de Explicadores</span>
              </div>
              <h3 className="text-lg font-bold text-white font-display">Cadastro de Explicador</h3>
              <p className="text-xs text-slate-400">
                Monetize o seu conhecimento e ajude a elevar o nível da educação em Angola.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300">Nome Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Prof. Domingos André Kiala"
                  value={tutorForm.name}
                  onChange={(e) => setTutorForm({ ...tutorForm, name: e.target.value })}
                  className="w-full mt-1 px-3 py-2 text-xs bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#FFC72C]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300">Email Profissional</label>
                  <input
                    type="email"
                    required
                    placeholder="explicador@kambaexplica.ao"
                    value={tutorForm.email}
                    onChange={(e) => setTutorForm({ ...tutorForm, email: e.target.value })}
                    className="w-full mt-1 px-3 py-2 text-xs bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#FFC72C]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">Telefone com WhatsApp</label>
                  <input
                    type="text"
                    required
                    placeholder="+244 923 000 000"
                    value={tutorForm.phone}
                    onChange={(e) => setTutorForm({ ...tutorForm, phone: e.target.value })}
                    className="w-full mt-1 px-3 py-2 text-xs bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#FFC72C]"
                  />
                </div>
              </div>

              {/* Documento de Identificação (BI / Passaporte com validação de formato) */}
              <div>
                <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span>Bilhete de Identidade Angolano (Validação de Selo)</span>
                  <span className="text-[10px] text-amber-400">Ex: 004829104LA042</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="004829104LA042"
                  value={tutorForm.idDocumentNumber}
                  onChange={(e) => setTutorForm({ ...tutorForm, idDocumentNumber: e.target.value })}
                  className="w-full mt-1 px-3 py-2 text-xs font-mono bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#FFC72C]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300">Nível Académico</label>
                  <select
                    value={tutorForm.academicDegree}
                    onChange={(e) => setTutorForm({ ...tutorForm, academicDegree: e.target.value as AcademicDegree })}
                    className="w-full mt-1 px-3 py-2 text-xs bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#FFC72C]"
                  >
                    <option value="Licenciatura">Licenciatura</option>
                    <option value="Mestrado">Mestrado</option>
                    <option value="Doutoramento">Doutoramento</option>
                    <option value="Docente Universitário">Docente Universitário</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">Instituição de Formação</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Faculdade de Engenharia UAN / ISPTEC"
                    value={tutorForm.institution}
                    onChange={(e) => setTutorForm({ ...tutorForm, institution: e.target.value })}
                    className="w-full mt-1 px-3 py-2 text-xs bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#FFC72C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300">Área de Especialização</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Análise Matemática, Direito Civil..."
                    value={tutorForm.specialization}
                    onChange={(e) => setTutorForm({ ...tutorForm, specialization: e.target.value })}
                    className="w-full mt-1 px-3 py-2 text-xs bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#FFC72C]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">Disciplinas que Leciona</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Cálculo I, Física Geral..."
                    value={tutorForm.subjects}
                    onChange={(e) => setTutorForm({ ...tutorForm, subjects: e.target.value })}
                    className="w-full mt-1 px-3 py-2 text-xs bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#FFC72C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300">Experiência (Anos)</label>
                  <input
                    type="number"
                    min="1"
                    max="40"
                    value={tutorForm.experienceYears}
                    onChange={(e) => setTutorForm({ ...tutorForm, experienceYears: Number(e.target.value) })}
                    className="w-full mt-1 px-3 py-2 text-xs bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#FFC72C]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">Preço / Aula (Mín. 2000 Kz)</label>
                  <input
                    type="number"
                    min="2000"
                    step="500"
                    value={tutorForm.pricePerHour}
                    onChange={(e) => setTutorForm({ ...tutorForm, pricePerHour: Number(e.target.value) })}
                    className="w-full mt-1 px-3 py-2 text-xs bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#FFC72C]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">Modalidade</label>
                  <select
                    value={tutorForm.modalities}
                    onChange={(e) => setTutorForm({ ...tutorForm, modalities: e.target.value as Modality })}
                    className="w-full mt-1 px-3 py-2 text-xs bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#FFC72C]"
                  >
                    <option value="ambos">Online & Presencial</option>
                    <option value="online">Apenas Online</option>
                    <option value="presencial">Apenas Presencial</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300">Província</label>
                  <select
                    value={tutorForm.province}
                    onChange={(e) => setTutorForm({ ...tutorForm, province: e.target.value })}
                    className="w-full mt-1 px-3 py-2 text-xs bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#FFC72C]"
                  >
                    {ANGOLAN_PROVINCES.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">Município</label>
                  <input
                    type="text"
                    placeholder="Ex: Talatona, Maianga, Kilamba..."
                    value={tutorForm.municipality}
                    onChange={(e) => setTutorForm({ ...tutorForm, municipality: e.target.value })}
                    className="w-full mt-1 px-3 py-2 text-xs bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#FFC72C]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Descrição Profissional / Metodologia</label>
                <textarea
                  rows={2}
                  placeholder="Partilhe a sua abordagem pedagógica, anos de docência e foco nas provas..."
                  value={tutorForm.bio}
                  onChange={(e) => setTutorForm({ ...tutorForm, bio: e.target.value })}
                  className="w-full mt-1 px-3 py-2 text-xs bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#FFC72C]"
                />
              </div>

              {/* Upload Certificados */}
              <div className="p-3 border border-dashed border-white/15 rounded-xl bg-black/30 text-center">
                <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                <p className="text-xs text-slate-300 font-medium">Anexar Certificados ou Comprovativo Académico (Opcional)</p>
                <p className="text-[10px] text-slate-500">PDF, JPG ou PNG até 10MB para obter o Selo Verificado</p>
                <button
                  type="button"
                  onClick={() => alert('Ficheiro de habilitações carregado para análise!')}
                  className="mt-2 px-3 py-1 bg-white/5 hover:bg-white/10 text-slate-300 text-[11px] rounded-md transition-colors"
                >
                  Selecionar Ficheiro
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 text-xs font-bold text-black bg-[#FFC72C] hover:bg-[#e6b325] rounded-xl transition-all shadow-md shadow-[#FFC72C]/25 mt-4"
            >
              Concluir Registo de Explicador
            </button>
          </form>
        )}

        {/* Iniciar Sessão (Login) */}
        {authModalTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="p-6 space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white font-display">Aceder à Sua Conta</h3>
              <p className="text-xs text-slate-400">
                Entre para gerir as suas explicações, mensagens e pagamentos.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300">Email ou Número de Telefone</label>
                <input
                  type="text"
                  required
                  placeholder="exemplo@email.ao ou +244 9..."
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#FFC72C]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Palavra-passe</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#FFC72C]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 text-xs font-bold text-black bg-[#FFC72C] hover:bg-[#e6b325] rounded-xl transition-all shadow-md shadow-[#FFC72C]/25 mt-4"
            >
              Iniciar Sessão
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

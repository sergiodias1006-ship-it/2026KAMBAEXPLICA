import { TutorProfile, SubjectCategory, Review, Lesson, PaymentTransaction, ChatMessage, User } from '../types';

export const ANGOLAN_PROVINCES = [
  'Luanda',
  'Benguela',
  'Huíla',
  'Huambo',
  'Cabinda',
  'Cuanza Sul',
  'Cuanza Norte',
  'Uíge',
  'Malanje',
  'Namibe',
  'Zaire',
  'Lunda Norte',
  'Lunda Sul',
  'Moxico',
  'Bié',
  'Cuando Cubango',
  'Bengo',
  'Cunene'
];

export const LUANDA_MUNICIPALITIES = [
  'Talatona',
  'Maianga',
  'Kilamba Kiaxi',
  'Belas',
  'Cazenga',
  'Viana',
  'Luanda (Ingombota / Mutamba)',
  'Cacuaco',
  'Rangel'
];

export const ANGOLAN_INSTITUTIONS = [
  'Universidade Agostinho Neto (UAN)',
  'ISPTEC (Tecnologias e Ciências)',
  'Universidade Católica de Angola (UCAN)',
  'Universidade Metodista de Angola (UMA)',
  'ISUTIC (Tecnologias de Informação)',
  'IMIL - Instituto Médio Industrial de Luanda (Makarenko)',
  'IPIL - Instituto Politécnico Industrial de Luanda',
  'Universidade Óscar Ribas',
  'Universidade Mandume ya Ndemufayo (Huíla)',
  'Universidade Katyavala Bwila (Benguela)',
  'PUNIV Luanda',
  'Universidade Gregório Semedo',
  'Universidade Jean Piaget de Angola'
];

export const POPULAR_SUBJECTS: SubjectCategory[] = [
  {
    id: 'matematica',
    name: 'Matemática e Cálculo',
    description: 'Álgebra, Geometria, Análise Matemática I, II e III, Cálculo Diferencial e Integral',
    iconName: 'Calculator',
    popular: true,
    tutorCount: 42,
    examples: ['Cálculo I e II', 'Álgebra Linear', 'Geometria Analítica', 'Matemática do Ensino Médio']
  },
  {
    id: 'fisica',
    name: 'Física Geral e Aplicada',
    description: 'Mecânica Clássica, Termodinâmica, Eletromagnetismo e Física para Engenharias',
    iconName: 'Atom',
    popular: true,
    tutorCount: 28,
    examples: ['Física I & II', 'Eletrostática', 'Circuitos Elétricos', 'Óptica Ondulatória']
  },
  {
    id: 'quimica',
    name: 'Química Geral e Orgânica',
    description: 'Química Geral, Inorgânica, Orgânica, Bioquímica e Preparação para Medicina',
    iconName: 'FlaskConical',
    popular: true,
    tutorCount: 24,
    examples: ['Química Orgânica', 'Estequiometria', 'Termoquímica', 'Exames de Medicina UAN']
  },
  {
    id: 'direito',
    name: 'Direito e Legislação',
    description: 'Direito Constitucional Angolano, Civil, Penal, Administrativo e Comercial',
    iconName: 'Scale',
    popular: true,
    tutorCount: 31,
    examples: ['Direito Constitucional', 'Direito Civil', 'Teoria Geral do Direito', 'Processo Penal']
  },
  {
    id: 'contabilidade',
    name: 'Contabilidade e Finanças',
    description: 'Contabilidade Financeira, Analítica, Fiscalidade Angolana e Gestão Orçamental',
    iconName: 'Briefcase',
    popular: true,
    tutorCount: 35,
    examples: ['PGC Angolano', 'Fiscalidade & IVA', 'Contabilidade de Gestão', 'Auditoria']
  },
  {
    id: 'economia',
    name: 'Economia e Gestão',
    description: 'Microeconomia, Macroeconomia, Econometria, Gestão Estratégica e Mercados Financeiros',
    iconName: 'TrendingUp',
    popular: true,
    tutorCount: 22,
    examples: ['Microeconomia', 'Macroeconomia Angolana', 'Econometria', 'Finanças Empresariais']
  },
  {
    id: 'programacao',
    name: 'Programação e Computação',
    description: 'Algoritmos, Python, JavaScript, Estruturas de Dados, C++, Redes e Bases de Dados',
    iconName: 'Code',
    popular: true,
    tutorCount: 39,
    examples: ['Algoritmos e Estrutura de Dados', 'Python para Dados', 'Desenvolvimento Web', 'SQL']
  },
  {
    id: 'estatistica',
    name: 'Estatística e Probabilidades',
    description: 'Bioestatística, Inferência Estatística, SPSS, Análise de Dados e Métodos Quantitativos',
    iconName: 'BarChart2',
    popular: true,
    tutorCount: 19,
    examples: ['Probabilidade & Estatística', 'Estatística Aplicada', 'Bioestatística', 'SPSS']
  },
  {
    id: 'linguas',
    name: 'Línguas e Comunicação',
    description: 'Inglês Académico, Francês, Redação Científica em Língua Portuguesa e Metodologia',
    iconName: 'BookOpen',
    popular: false,
    tutorCount: 26,
    examples: ['Inglês para IELTS/TOEFL', 'Redação de Monografia', 'Francês para Negócios']
  }
];

export const INITIAL_TUTORS: TutorProfile[] = [
  {
    id: 'tutor-1',
    userId: 'user-tutor-1',
    name: 'Eng. Domingos Kiala',
    title: 'Mestre em Engenharia Eletrotécnica & Docente Universitário',
    avatar: '/src/assets/images/tutor_portrait_male_1791076346477.jpg',
    bio: 'Mais de 7 anos preparando estudantes para as cadeiras mais exigentes de Ciências Exatas em Luanda. Especialista em Análise Matemática, Física e preparação rigorosa para os exames de acesso da Faculdade de Engenharia da UAN e ISPTEC. Metodologia prática focada em resolução de exercícios de provas anteriores.',
    academicDegree: 'Mestrado',
    institution: 'Universidade Agostinho Neto (UAN)',
    specialization: 'Matemática Superior e Eletrotecnia',
    subjects: ['Matemática e Cálculo', 'Física Geral e Aplicada', 'Álgebra Linear', 'Cálculo I & II'],
    educationLevelsTaught: [
      'Ensino Secundário',
      'Pré-Universitário / Exames de Acesso',
      'Licenciatura'
    ],
    experienceYears: 7,
    pricePerHour: 4500,
    modalities: 'ambos',
    province: 'Luanda',
    municipality: 'Talatona',
    rating: 4.95,
    reviewCount: 48,
    successRate: 98,
    hiredCount: 164,
    verified: true,
    idDocumentType: 'Bilhete de Identidade (BI)',
    idDocumentNumber: '004829104LA042',
    phone: '+244 923 884 102',
    whatsapp: '244923884102',
    availability: {
      'Segunda': ['09:00', '11:00', '14:00', '16:00'],
      'Quarta': ['10:00', '14:00', '16:00', '18:00'],
      'Sexta': ['09:00', '11:00', '15:00'],
      'Sábado': ['08:30', '10:30', '14:00']
    },
    packages: [
      { id: 'p1', name: 'Aula Individual', lessons: 1, discountPercent: 0, priceKz: 4500 },
      { id: 'p2', name: 'Pack Reforço Mensal (4 Aulas)', lessons: 4, discountPercent: 10, priceKz: 16200, popular: true },
      { id: 'p3', name: 'Pack Intensivo Exames (8 Aulas)', lessons: 8, discountPercent: 15, priceKz: 30600 }
    ],
    certificates: [
      { id: 'c1', title: 'Mestrado em Engenharia e Automação', issuer: 'Faculdade de Engenharia - UAN', year: 2022, verified: true },
      { id: 'c2', title: 'Certificado de Excelência Pedagógica', issuer: 'ISPTEC', year: 2024, verified: true }
    ]
  },
  {
    id: 'tutor-2',
    userId: 'user-tutor-2',
    name: 'Dra. Elsa Capemba',
    title: 'Doutoranda em Direito Civil & Advogada Inscrita na OAA',
    avatar: '/src/assets/images/tutor_portrait_female_1791076334961.jpg',
    bio: 'Formada pela Faculdade de Direito da UCAN com distinção. Acompanho estudantes de Direito do 1º ao 5º ano, bem como candidatos a exames de acesso e preparação de teses/monografias de fim de curso. Abordagem doutrinária sólida e acompanhamento personalizado de casos práticos angolanos.',
    academicDegree: 'Doutoramento',
    institution: 'Universidade Católica de Angola (UCAN)',
    specialization: 'Direito Civil e Direito das Obrigações',
    subjects: ['Direito e Legislação', 'Direito Constitucional', 'Direito Civil', 'Redação Científica'],
    educationLevelsTaught: [
      'Licenciatura',
      'Mestrado',
      'Pré-Universitário / Exames de Acesso'
    ],
    experienceYears: 6,
    pricePerHour: 5500,
    modalities: 'ambos',
    province: 'Luanda',
    municipality: 'Maianga',
    rating: 4.98,
    reviewCount: 39,
    successRate: 96,
    hiredCount: 112,
    verified: true,
    idDocumentType: 'Bilhete de Identidade (BI)',
    idDocumentNumber: '003910842LA031',
    phone: '+244 912 405 921',
    whatsapp: '244912405921',
    availability: {
      'Terça': ['10:00', '14:00', '16:00'],
      'Quinta': ['10:00', '14:00', '16:00'],
      'Sábado': ['09:00', '11:00', '15:00']
    },
    packages: [
      { id: 'p2-1', name: 'Consulta / Aula Individual', lessons: 1, discountPercent: 0, priceKz: 5500 },
      { id: 'p2-2', name: 'Pack Semestral (4 Aulas)', lessons: 4, discountPercent: 10, priceKz: 19800, popular: true },
      { id: 'p2-3', name: 'Acompanhamento Monografia (8 Aulas)', lessons: 8, discountPercent: 20, priceKz: 35200 }
    ],
    certificates: [
      { id: 'c3', title: 'Licenciatura em Direito com Distinção', issuer: 'UCAN', year: 2020, verified: true },
      { id: 'c4', title: 'Cédula Profissional Ordem dos Advogados de Angola', issuer: 'OAA', year: 2022, verified: true }
    ]
  },
  {
    id: 'tutor-3',
    userId: 'user-tutor-3',
    name: 'Prof. António Mateus',
    title: 'Especialista em Contabilidade Analítica & Auditor Certificado (OCPCA)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: 'Com mais de 9 anos de prática em empresas petrolíferas e consultoria em Luanda. Auxílio estudantes do IMIL, PUNIV e universidades nas disciplinas de PGC Angolano, Fiscalidade, Cálculo Financeiro e Análise das Demonstrações Financeiras. Explicações claras e voltadas para o mercado de trabalho.',
    academicDegree: 'Mestrado',
    institution: 'Universidade Metodista de Angola (UMA)',
    specialization: 'Fiscalidade Angolana e PGC',
    subjects: ['Contabilidade e Finanças', 'Economia e Gestão', 'Estatística e Probabilidades'],
    educationLevelsTaught: [
      'Ensino Secundário',
      'Licenciatura',
      'Formação Profissional'
    ],
    experienceYears: 9,
    pricePerHour: 3800,
    modalities: 'online',
    province: 'Luanda',
    municipality: 'Kilamba Kiaxi',
    rating: 4.89,
    reviewCount: 52,
    successRate: 94,
    hiredCount: 180,
    verified: true,
    idDocumentType: 'Bilhete de Identidade (BI)',
    idDocumentNumber: '001948201LA019',
    phone: '+244 940 312 870',
    whatsapp: '244940312870',
    availability: {
      'Segunda': ['18:00', '20:00'],
      'Quarta': ['18:00', '20:00'],
      'Sábado': ['09:00', '11:00', '14:00', '16:00'],
      'Domingo': ['10:00', '14:00']
    },
    packages: [
      { id: 'p3-1', name: 'Aula Individual PGC', lessons: 1, discountPercent: 0, priceKz: 3800 },
      { id: 'p3-2', name: 'Módulo Fiscalidade & PGC (4 Aulas)', lessons: 4, discountPercent: 8, priceKz: 14000, popular: true },
      { id: 'p3-3', name: 'Preparação para Exame de Ordem (8 Aulas)', lessons: 8, discountPercent: 15, priceKz: 25800 }
    ],
    certificates: [
      { id: 'c5', title: 'Mestrado em Finanças Empresariais', issuer: 'Universidade Metodista', year: 2019, verified: true },
      { id: 'c6', title: 'Membro Efetivo da Ordem dos Contabilistas', issuer: 'OCPCA', year: 2021, verified: true }
    ]
  },
  {
    id: 'tutor-4',
    userId: 'user-tutor-4',
    name: 'Eng. Yola Sebastião',
    title: 'Engenheira de Software & Instrutora de Algoritmos no ISUTIC',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    bio: 'Desenvolvedora Full-Stack e professora apaixonada por tecnologia. Dou aulas práticas de Algoritmos, Programação Orientada a Objetos, Estruturas de Dados, JavaScript/TypeScript e Python. Ajudo desde quem está no 10º ano do IMIL até universitários em apuros com projetos práticos.',
    academicDegree: 'Licenciatura',
    institution: 'ISUTIC',
    specialization: 'Engenharia Informática & Inteligência Artificial',
    subjects: ['Programação e Computação', 'Matemática e Cálculo', 'Estatística e Probabilidades'],
    educationLevelsTaught: [
      'Ensino Secundário',
      'Licenciatura',
      'Formação Profissional'
    ],
    experienceYears: 5,
    pricePerHour: 4000,
    modalities: 'ambos',
    province: 'Luanda',
    municipality: 'Belas',
    rating: 4.92,
    reviewCount: 34,
    successRate: 97,
    hiredCount: 95,
    verified: true,
    idDocumentType: 'Bilhete de Identidade (BI)',
    idDocumentNumber: '007129482LA091',
    phone: '+244 938 119 504',
    whatsapp: '244938119504',
    availability: {
      'Segunda': ['14:00', '16:00', '18:00'],
      'Terça': ['14:00', '16:00'],
      'Quinta': ['14:00', '16:00', '18:00'],
      'Sábado': ['10:00', '14:00']
    },
    packages: [
      { id: 'p4-1', name: 'Aula Individual de Código', lessons: 1, discountPercent: 0, priceKz: 4000 },
      { id: 'p4-2', name: 'Pack Algoritmos & Projetos (4 Aulas)', lessons: 4, discountPercent: 10, priceKz: 14400, popular: true },
      { id: 'p4-3', name: 'Mentoria Completa de Código (8 Aulas)', lessons: 8, discountPercent: 18, priceKz: 26200 }
    ],
    certificates: [
      { id: 'c7', title: 'Licenciatura em Telecomunicações e TI', issuer: 'ISUTIC', year: 2021, verified: true }
    ]
  },
  {
    id: 'tutor-5',
    userId: 'user-tutor-5',
    name: 'Dr. Manuel Chivinda',
    title: 'Médico Residente & Explicador de Química Orgânica e Biologia',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'Mais de 120 alunos colocados na Faculdade de Medicina da UAN e Ciências da Saúde nos últimos 4 anos. Foco cirúrgico em Química Geral, Estequiometria, Química Orgânica e Bioquímica Celular para o ensino médio e universitário.',
    academicDegree: 'Licenciatura',
    institution: 'Faculdade de Medicina - UAN',
    specialization: 'Química Biomédica e Bioquímica',
    subjects: ['Química Geral e Orgânica', 'Física Geral e Aplicada'],
    educationLevelsTaught: [
      'Ensino Secundário',
      'Pré-Universitário / Exames de Acesso',
      'Licenciatura'
    ],
    experienceYears: 6,
    pricePerHour: 4800,
    modalities: 'ambos',
    province: 'Huíla',
    municipality: 'Lubango',
    rating: 4.96,
    reviewCount: 61,
    successRate: 99,
    hiredCount: 210,
    verified: true,
    idDocumentType: 'Bilhete de Identidade (BI)',
    idDocumentNumber: '002981042HL012',
    phone: '+244 924 771 992',
    whatsapp: '244924771992',
    availability: {
      'Segunda': ['15:00', '17:00'],
      'Quarta': ['15:00', '17:00'],
      'Sexta': ['15:00', '17:00', '19:00'],
      'Sábado': ['08:00', '10:00', '14:00']
    },
    packages: [
      { id: 'p5-1', name: 'Aula Individual Química', lessons: 1, discountPercent: 0, priceKz: 4800 },
      { id: 'p5-2', name: 'Pack Acesso Medicina (4 Aulas)', lessons: 4, discountPercent: 10, priceKz: 17280, popular: true },
      { id: 'p5-3', name: 'Sprint Intensivo Pré-Exames (8 Aulas)', lessons: 8, discountPercent: 20, priceKz: 30720 }
    ],
    certificates: [
      { id: 'c8', title: 'Licenciatura em Medicina', issuer: 'Universidade Agostinho Neto', year: 2022, verified: true }
    ]
  },
  {
    id: 'tutor-6',
    userId: 'user-tutor-6',
    name: 'Prof.ª Aldina Quaresma',
    title: 'Mestre em Economia do Desenvolvimento & Docente na UKB',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    bio: 'Ajudo estudantes em Benguela e todo o país a desmistificar Microeconomia, Macroeconomia e Econometria. Paciente, focada em exemplos reais da economia angolana e gráficos intuitivos.',
    academicDegree: 'Mestrado',
    institution: 'Universidade Katyavala Bwila (Benguela)',
    specialization: 'Economia e Políticas Públicas',
    subjects: ['Economia e Gestão', 'Estatística e Probabilidades', 'Contabilidade e Finanças'],
    educationLevelsTaught: [
      'Licenciatura',
      'Mestrado'
    ],
    experienceYears: 8,
    pricePerHour: 4200,
    modalities: 'online',
    province: 'Benguela',
    municipality: 'Lobito',
    rating: 4.88,
    reviewCount: 29,
    successRate: 95,
    hiredCount: 78,
    verified: true,
    idDocumentType: 'Bilhete de Identidade (BI)',
    idDocumentNumber: '005510294BG048',
    phone: '+244 931 802 615',
    whatsapp: '244931802615',
    availability: {
      'Terça': ['09:00', '11:00', '15:00'],
      'Quinta': ['09:00', '11:00', '15:00'],
      'Sábado': ['09:00', '11:00']
    },
    packages: [
      { id: 'p6-1', name: 'Aula Individual', lessons: 1, discountPercent: 0, priceKz: 4200 },
      { id: 'p6-2', name: 'Pack Semestral de Economia (4 Aulas)', lessons: 4, discountPercent: 10, priceKz: 15120, popular: true }
    ],
    certificates: [
      { id: 'c9', title: 'Mestrado em Economia Internacional', issuer: 'Universidade Katyavala Bwila', year: 2021, verified: true }
    ]
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    tutorId: 'tutor-1',
    studentId: 'stud-101',
    studentName: 'Mauro dos Santos',
    studentInstitution: 'Faculdade de Engenharia - UAN',
    rating: 5,
    comment: 'Estava a chumbar Análise Matemática II duas vezes seguidas na UAN. Com as 8 aulas do Eng. Domingos Kiala consegui dispensar com 15 valores! O melhor explicador de Luanda sem dúvidas.',
    date: '18 Fev 2026',
    subject: 'Análise Matemática II'
  },
  {
    id: 'rev-2',
    tutorId: 'tutor-1',
    studentId: 'stud-102',
    studentName: 'Nádia Panzo',
    studentInstitution: 'Candidata ISPTEC',
    rating: 5,
    comment: 'Fiz a preparação para o exame de acesso de Engenharia Química no ISPTEC e passei em 4º lugar da lista geral. A pontualidade e os resumos de Física foram decisivos.',
    date: '02 Mar 2026',
    subject: 'Física Geral e Exames de Acesso'
  },
  {
    id: 'rev-3',
    tutorId: 'tutor-2',
    studentId: 'stud-103',
    studentName: 'Cláudio Van-Dúnem',
    studentInstitution: 'Faculdade de Direito - UCAN',
    rating: 5,
    comment: 'A Dra. Elsa tem um domínio impecável do Código Civil Angolano. As resoluções de hipóteses jurídicas dela salvaram o meu ano letivo em Direito das Obrigações.',
    date: '24 Jan 2026',
    subject: 'Direito das Obrigações'
  },
  {
    id: 'rev-4',
    tutorId: 'tutor-4',
    studentId: 'stud-104',
    studentName: 'Afonso Bengue',
    studentInstitution: 'IMIL (Makarenko)',
    rating: 5,
    comment: 'Sou aluno do curso técnico de Informática no Makarenko. A Eng. Yola ensina lógica e Python de uma maneira tão simples e divertida que até os meus colegas pediram o contacto dela!',
    date: '10 Fev 2026',
    subject: 'Algoritmos e Estrutura de Dados'
  },
  {
    id: 'rev-5',
    tutorId: 'tutor-5',
    studentId: 'stud-105',
    studentName: 'Francisca Luvualu',
    studentInstitution: 'Medicina UAN',
    rating: 5,
    comment: 'O Dr. Manuel é um génio em Química Orgânica! Os esquemas de reações e as dicas para os testes da UAN são de ouro. Super recomendo a quem quer entrar na Medicina.',
    date: '08 Mar 2026',
    subject: 'Química Orgânica'
  }
];

export const INITIAL_LESSONS: Lesson[] = [
  {
    id: 'lesson-1',
    studentId: 'demo-student',
    studentName: 'Carlos Muanza',
    studentPhone: '+244 923 111 222',
    tutorId: 'tutor-1',
    tutorName: 'Eng. Domingos Kiala',
    tutorAvatar: '/src/assets/images/tutor_portrait_male_1791076346477.jpg',
    subject: 'Cálculo Diferencial e Integral',
    date: '2026-10-06',
    time: '14:00',
    modality: 'presencial',
    locationDetails: 'Biblioteca Central da UAN, Campus Universitário de Camama, Luanda',
    status: 'agendada',
    priceKz: 4500,
    paymentStatus: 'pago',
    notes: 'Revisão intensiva de Limites, Derivadas e Regra da Cadeia'
  },
  {
    id: 'lesson-2',
    studentId: 'demo-student',
    studentName: 'Carlos Muanza',
    studentPhone: '+244 923 111 222',
    tutorId: 'tutor-4',
    tutorName: 'Eng. Yola Sebastião',
    tutorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    subject: 'Estruturas de Dados em Python',
    date: '2026-10-08',
    time: '16:00',
    modality: 'online',
    meetingLink: 'https://kambaexplica.ao/sala/python-ao-204',
    status: 'agendada',
    priceKz: 4000,
    paymentStatus: 'pago',
    notes: 'Implementação de Árvores Binárias e Grafos'
  },
  {
    id: 'lesson-3',
    studentId: 'demo-student',
    studentName: 'Carlos Muanza',
    studentPhone: '+244 923 111 222',
    tutorId: 'tutor-1',
    tutorName: 'Eng. Domingos Kiala',
    tutorAvatar: '/src/assets/images/tutor_portrait_male_1791076346477.jpg',
    subject: 'Álgebra Linear & Matrizes',
    date: '2026-09-28',
    time: '10:00',
    modality: 'online',
    meetingLink: 'https://kambaexplica.ao/sala/calc-uan-101',
    status: 'concluida',
    priceKz: 4500,
    paymentStatus: 'pago'
  }
];

export const INITIAL_PAYMENTS: PaymentTransaction[] = [
  {
    id: 'pay-mcx-98124',
    lessonId: 'lesson-1',
    studentId: 'demo-student',
    tutorId: 'tutor-1',
    tutorName: 'Eng. Domingos Kiala',
    amountKz: 4500,
    method: 'multicaixa_express',
    multicaixaPhone: '+244 923 111 222',
    referenceNumber: 'MCX-20261003-8821',
    status: 'concluido',
    date: '03 Out 2026, 14:22',
    planType: 'aula_avulsa'
  },
  {
    id: 'pay-mcx-77192',
    lessonId: 'lesson-2',
    studentId: 'demo-student',
    tutorId: 'tutor-4',
    tutorName: 'Eng. Yola Sebastião',
    amountKz: 4000,
    method: 'multicaixa_express',
    multicaixaPhone: '+244 923 111 222',
    referenceNumber: 'MCX-20261002-1104',
    status: 'concluido',
    date: '02 Out 2026, 17:05',
    planType: 'aula_avulsa'
  },
  {
    id: 'pay-trf-66103',
    lessonId: 'lesson-3',
    studentId: 'demo-student',
    tutorId: 'tutor-1',
    tutorName: 'Eng. Domingos Kiala',
    amountKz: 4500,
    method: 'transferencia_bancaria',
    entityNumber: '00104 (EMIS Multicaixa)',
    referenceNumber: '928 104 319',
    ibanNumber: 'AO06.0040.0000.1829.1029.1018.4',
    status: 'concluido',
    date: '27 Set 2026, 09:15',
    planType: 'aula_avulsa'
  }
];

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    conversationId: 'tutor-1',
    senderId: 'tutor-1',
    senderName: 'Eng. Domingos Kiala',
    receiverId: 'demo-student',
    text: 'Olá Carlos! Vi a tua marcação para a aula de Cálculo na terça-feira. Já tens as fichas de exercícios da UAN preparadas?',
    timestamp: 'Ontem às 18:30',
    read: true
  },
  {
    id: 'm2',
    conversationId: 'tutor-1',
    senderId: 'demo-student',
    senderName: 'Carlos Muanza',
    receiverId: 'tutor-1',
    text: 'Boa noite Professor! Sim, tenho a prova do ano passado e as dúvidas na resolução de integrais por substituição trigonométrica.',
    timestamp: 'Ontem às 18:45',
    read: true
  },
  {
    id: 'm3',
    conversationId: 'tutor-1',
    senderId: 'tutor-1',
    senderName: 'Eng. Domingos Kiala',
    receiverId: 'demo-student',
    text: 'Excelente! Vamos focar nisso na Biblioteca de Camama às 14:00. Até breve!',
    timestamp: 'Ontem às 19:00',
    read: true
  }
];

export const DEMO_STUDENT_USER: User = {
  id: 'demo-student',
  role: 'student',
  name: 'Carlos Muanza',
  email: 'carlos.muanza@aluno.uan.ao',
  phone: '+244 923 111 222',
  avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
  province: 'Luanda',
  municipality: 'Talatona',
  studentDetails: {
    educationLevel: 'Licenciatura',
    institution: 'Universidade Agostinho Neto (UAN)',
    course: 'Engenharia de Petróleos'
  }
};

export const DEMO_TUTOR_USER: User = {
  id: 'user-tutor-1',
  role: 'tutor',
  name: 'Eng. Domingos Kiala',
  email: 'domingos.kiala@kambaexplica.ao',
  phone: '+244 923 884 102',
  avatar: '/src/assets/images/tutor_portrait_male_1791076346477.jpg',
  province: 'Luanda',
  municipality: 'Talatona',
  tutorDetails: INITIAL_TUTORS[0]
};

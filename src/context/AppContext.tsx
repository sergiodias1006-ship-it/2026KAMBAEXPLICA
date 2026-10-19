import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  TutorProfile, 
  SubjectCategory, 
  Review, 
  Lesson, 
  PaymentTransaction, 
  ChatMessage, 
  FilterOptions,
  LessonStatus
} from '../types';
import { 
  INITIAL_TUTORS, 
  POPULAR_SUBJECTS, 
  INITIAL_REVIEWS, 
  INITIAL_LESSONS, 
  INITIAL_PAYMENTS, 
  INITIAL_MESSAGES,
  DEMO_STUDENT_USER,
  DEMO_TUTOR_USER
} from '../data/mockData';
import { isSupabaseConfigured, supabaseService } from '../lib/supabase';

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  isSupabaseConnected: boolean;
  tutors: TutorProfile[];
  subjects: SubjectCategory[];
  reviews: Review[];
  lessons: Lesson[];
  payments: PaymentTransaction[];
  messages: ChatMessage[];
  favorites: string[];
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  resetFilters: () => void;
  
  // UI Modal and Drawer states
  activeTutorForProfile: TutorProfile | null;
  setActiveTutorForProfile: (tutor: TutorProfile | null) => void;
  activeTutorForBooking: TutorProfile | null;
  setActiveTutorForBooking: (tutor: TutorProfile | null) => void;
  activeChatTutor: TutorProfile | null;
  setActiveChatTutor: (tutor: TutorProfile | null) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalTab: 'login' | 'student' | 'tutor';
  setAuthModalTab: (tab: 'login' | 'student' | 'tutor') => void;
  isSupportModalOpen: boolean;
  setIsSupportModalOpen: (open: boolean) => void;
  isReviewModalOpen: boolean;
  setIsReviewModalOpen: (open: boolean) => void;
  tutorToReview: TutorProfile | null;
  setTutorToReview: (tutor: TutorProfile | null) => void;
  activeView: 'home' | 'tutors' | 'dashboard' | 'subjects';
  setActiveView: (view: 'home' | 'tutors' | 'dashboard' | 'subjects') => void;
  isSmartphoneMode: boolean;
  setIsSmartphoneMode: (mode: boolean) => void;
  reloadDisciplinas: () => Promise<void>;

  // Actions
  toggleFavorite: (tutorId: string) => void;
  registerStudent: (data: any) => void;
  registerTutor: (data: any) => void;
  bookLesson: (lessonData: {
    tutor: TutorProfile;
    subject: string;
    date: string;
    time: string;
    modality: 'online' | 'presencial';
    locationDetails?: string;
    paymentMethod: 'multicaixa_express' | 'transferencia_bancaria';
    multicaixaPhone?: string;
    notes?: string;
    packageId?: string;
    priceKz: number;
  }) => Promise<{ lesson: Lesson; payment: PaymentTransaction }>;
  updateLessonStatus: (lessonId: string, status: LessonStatus) => void;
  sendMessage: (receiverId: string, text: string) => void;
  addReview: (reviewData: {
    tutorId: string;
    rating: number;
    comment: string;
    subject: string;
  }) => void;
  switchDemoRole: (role: 'student' | 'tutor') => void;
  resetDatabase: () => void;
}

const defaultFilters: FilterOptions = {
  searchQuery: '',
  subject: '',
  level: '',
  province: '',
  minPrice: 2000,
  maxPrice: 20000,
  modality: 'todos',
  minRating: 0,
  sortBy: 'recommended'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Local storage keys
  const STORAGE_KEY = 'kambaexplica_v1_';

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}user`);
    return saved ? JSON.parse(saved) : DEMO_STUDENT_USER;
  });

  const [tutors, setTutors] = useState<TutorProfile[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}tutors`);
    return saved ? JSON.parse(saved) : INITIAL_TUTORS;
  });

  const [subjects, setSubjects] = useState<SubjectCategory[]>(POPULAR_SUBJECTS);

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}reviews`);
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [lessons, setLessons] = useState<Lesson[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}lessons`);
    return saved ? JSON.parse(saved) : INITIAL_LESSONS;
  });

  const [payments, setPayments] = useState<PaymentTransaction[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}payments`);
    return saved ? JSON.parse(saved) : INITIAL_PAYMENTS;
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}messages`);
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}favorites`);
    return saved ? JSON.parse(saved) : ['tutor-1'];
  });

  const [filters, setFilters] = useState<FilterOptions>(defaultFilters);

  // UI state
  const [activeTutorForProfile, setActiveTutorForProfile] = useState<TutorProfile | null>(null);
  const [activeTutorForBooking, setActiveTutorForBooking] = useState<TutorProfile | null>(null);
  const [activeChatTutor, setActiveChatTutor] = useState<TutorProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'student' | 'tutor'>('student');
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [tutorToReview, setTutorToReview] = useState<TutorProfile | null>(null);
  const [activeView, setActiveView] = useState<'home' | 'tutors' | 'dashboard' | 'subjects'>('home');
  const [isSmartphoneMode, setIsSmartphoneMode] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`${STORAGE_KEY}user`, JSON.stringify(currentUser));
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}tutors`, JSON.stringify(tutors));
  }, [tutors]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}reviews`, JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}lessons`, JSON.stringify(lessons));
  }, [lessons]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}payments`, JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}messages`, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}favorites`, JSON.stringify(favorites));
  }, [favorites]);

  // Sincronização inicial com Supabase se as chaves estiverem configuradas
  useEffect(() => {
    if (isSupabaseConfigured) {
      supabaseService.getTutors().then(data => {
        if (data && data.length > 0) {
          const mappedTutors: TutorProfile[] = data.map((d: any) => ({
            id: d.id,
            userId: d.user_id || `user-${d.id}`,
            name: d.name,
            title: d.title,
            avatar: d.avatar_url || '/src/assets/images/tutor_portrait_male_1791076346477.jpg',
            bio: d.bio || '',
            academicDegree: d.academic_degree || 'Licenciatura',
            institution: d.institution || 'Universidade em Angola',
            specialization: d.specialization || '',
            subjects: d.subjects || ['Matemática e Cálculo'],
            educationLevelsTaught: d.education_levels_taught || ['Ensino Secundário', 'Licenciatura'],
            experienceYears: d.experience_years || 2,
            pricePerHour: Number(d.price_per_hour) || 3000,
            modalities: d.modalities || 'ambos',
            province: d.province || 'Luanda',
            municipality: d.municipality || 'Talatona',
            rating: Number(d.rating) || 5.0,
            reviewCount: Number(d.review_count) || 0,
            successRate: Number(d.success_rate) || 95,
            hiredCount: Number(d.hired_count) || 0,
            verified: Boolean(d.verified),
            idDocumentType: 'Bilhete de Identidade (BI)',
            idDocumentNumber: d.id_document_number || '',
            phone: d.phone || '+244 923 000 000',
            whatsapp: d.whatsapp || (d.phone ? d.phone.replace(/[^0-9]/g, '') : ''),
            availability: d.availability || { 'Segunda': ['09:00', '14:00'], 'Quarta': ['10:00', '15:00'] },
            packages: [
              { id: `p-${d.id}-1`, name: 'Aula Individual', lessons: 1, discountPercent: 0, priceKz: Number(d.price_per_hour) || 3000 },
              { id: `p-${d.id}-2`, name: 'Pack Mensal (4 Aulas)', lessons: 4, discountPercent: 10, priceKz: (Number(d.price_per_hour) || 3000) * 4 * 0.9, popular: true }
            ],
            certificates: []
          }));
          setTutors(mappedTutors);
        }
      }).catch(err => console.warn('Supabase fetch:', err));

      // Carregar disciplinas do Supabase para o ecrã principal
      supabaseService.getDisciplinas().then(disciplinas => {
        if (disciplinas && disciplinas.length > 0) {
          const supabaseNames = new Set(disciplinas.map(d => d.name.toLowerCase()));
          const remaining = POPULAR_SUBJECTS.filter(d => !supabaseNames.has(d.name.toLowerCase()));
          setSubjects([...disciplinas, ...remaining]);
        }
      }).catch(err => console.warn('Supabase getDisciplinas fetch notice:', err));
    }
  }, []);

  const reloadDisciplinas = async () => {
    try {
      const liveDisciplinas = await supabaseService.getDisciplinas();
      if (liveDisciplinas && liveDisciplinas.length > 0) {
        const supabaseNames = new Set(liveDisciplinas.map(d => d.name.toLowerCase()));
        const remaining = POPULAR_SUBJECTS.filter(d => !supabaseNames.has(d.name.toLowerCase()));
        setSubjects([...liveDisciplinas, ...remaining]);
      }
    } catch (err) {
      console.warn('Erro ao recarregar disciplinas do Supabase:', err);
    }
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const toggleFavorite = (tutorId: string) => {
    setFavorites(prev => 
      prev.includes(tutorId) 
        ? prev.filter(id => id !== tutorId) 
        : [...prev, tutorId]
    );
  };

  const registerStudent = (data: any) => {
    const newUser: User = {
      id: `student-${Date.now()}`,
      role: 'student',
      name: data.name,
      email: data.email,
      phone: data.phone,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      province: data.province || 'Luanda',
      municipality: data.municipality || 'Talatona',
      studentDetails: {
        educationLevel: data.educationLevel,
        institution: data.institution,
        course: data.course
      }
    };
    setCurrentUser(newUser);
    setIsAuthModalOpen(false);
  };

  const registerTutor = (data: any) => {
    const newTutorProfile: TutorProfile = {
      id: `tutor-${Date.now()}`,
      userId: `user-tutor-${Date.now()}`,
      name: data.name,
      title: `${data.academicDegree} em ${data.specialization}`,
      avatar: data.avatar || '/src/assets/images/tutor_portrait_male_1791076346477.jpg',
      bio: data.bio || 'Explicador dedicado ao sucesso académico dos estudantes angolanos.',
      academicDegree: data.academicDegree,
      institution: data.institution,
      specialization: data.specialization,
      subjects: Array.isArray(data.subjects) ? data.subjects : [data.subjects],
      educationLevelsTaught: ['Ensino Secundário', 'Licenciatura'],
      experienceYears: Number(data.experienceYears) || 2,
      pricePerHour: Math.max(2000, Number(data.pricePerHour) || 2500),
      modalities: data.modalities || 'ambos',
      province: data.province || 'Luanda',
      municipality: data.municipality || 'Talatona',
      rating: 5.0,
      reviewCount: 0,
      successRate: 100,
      hiredCount: 0,
      verified: true, // Auto-verified in prototype
      idDocumentType: 'Bilhete de Identidade (BI)',
      idDocumentNumber: data.idDocumentNumber || '001928374LA021',
      phone: data.phone,
      whatsapp: data.phone.replace(/[^0-9]/g, ''),
      availability: {
        'Segunda': ['09:00', '14:00', '16:00'],
        'Quarta': ['10:00', '15:00'],
        'Sábado': ['09:00', '11:00']
      },
      packages: [
        { id: `p-${Date.now()}-1`, name: 'Aula Individual', lessons: 1, discountPercent: 0, priceKz: Number(data.pricePerHour) || 2500 },
        { id: `p-${Date.now()}-2`, name: 'Pack Mensal (4 Aulas)', lessons: 4, discountPercent: 10, priceKz: (Number(data.pricePerHour) || 2500) * 4 * 0.9, popular: true }
      ],
      certificates: [
        { id: `cert-${Date.now()}`, title: `Certificado Académico - ${data.institution}`, issuer: data.institution, year: 2024, verified: true }
      ]
    };

    const newUser: User = {
      id: newTutorProfile.userId,
      role: 'tutor',
      name: data.name,
      email: data.email,
      phone: data.phone,
      avatar: newTutorProfile.avatar,
      province: data.province || 'Luanda',
      municipality: data.municipality || 'Talatona',
      tutorDetails: newTutorProfile
    };

    setTutors(prev => [newTutorProfile, ...prev]);
    setCurrentUser(newUser);
    setIsAuthModalOpen(false);

    // Enviar para Supabase se configurado
    if (isSupabaseConfigured) {
      supabaseService.createTutor({
        name: newTutorProfile.name,
        title: newTutorProfile.title,
        avatar_url: newTutorProfile.avatar,
        bio: newTutorProfile.bio,
        academic_degree: newTutorProfile.academicDegree,
        institution: newTutorProfile.institution,
        specialization: newTutorProfile.specialization,
        subjects: newTutorProfile.subjects,
        price_per_hour: newTutorProfile.pricePerHour,
        modalities: newTutorProfile.modalities,
        province: newTutorProfile.province,
        municipality: newTutorProfile.municipality,
        whatsapp: newTutorProfile.whatsapp,
        phone: newTutorProfile.phone,
        id_document_number: newTutorProfile.idDocumentNumber
      }).catch(err => console.warn('Supabase tutor insert notice:', err));
    }
  };

  const bookLesson = async (lessonData: {
    tutor: TutorProfile;
    subject: string;
    date: string;
    time: string;
    modality: 'online' | 'presencial';
    locationDetails?: string;
    paymentMethod: 'multicaixa_express' | 'transferencia_bancaria';
    multicaixaPhone?: string;
    notes?: string;
    packageId?: string;
    priceKz: number;
  }) => {
    // Generate unique lesson & payment
    const lessonId = `lesson-${Date.now()}`;
    const paymentId = `pay-${lessonData.paymentMethod === 'multicaixa_express' ? 'mcx' : 'trf'}-${Date.now().toString().slice(-5)}`;
    
    const newLesson: Lesson = {
      id: lessonId,
      studentId: currentUser?.id || 'guest-student',
      studentName: currentUser?.name || 'Estudante Visitante',
      studentPhone: currentUser?.phone || lessonData.multicaixaPhone || '+244 923 000 000',
      tutorId: lessonData.tutor.id,
      tutorName: lessonData.tutor.name,
      tutorAvatar: lessonData.tutor.avatar,
      subject: lessonData.subject,
      date: lessonData.date,
      time: lessonData.time,
      modality: lessonData.modality,
      locationDetails: lessonData.modality === 'presencial' 
        ? (lessonData.locationDetails || `${lessonData.tutor.municipality}, ${lessonData.tutor.province}`) 
        : undefined,
      meetingLink: lessonData.modality === 'online' 
        ? `https://kambaexplica.ao/sala/${lessonId}` 
        : undefined,
      status: 'agendada',
      priceKz: lessonData.priceKz,
      paymentStatus: 'pago',
      notes: lessonData.notes
    };

    const newPayment: PaymentTransaction = {
      id: paymentId,
      lessonId: lessonId,
      studentId: currentUser?.id || 'guest-student',
      tutorId: lessonData.tutor.id,
      tutorName: lessonData.tutor.name,
      amountKz: lessonData.priceKz,
      method: lessonData.paymentMethod,
      multicaixaPhone: lessonData.multicaixaPhone,
      referenceNumber: `REF-${Math.floor(100000000 + Math.random() * 900000000)}`,
      entityNumber: lessonData.paymentMethod === 'transferencia_bancaria' ? '00104 (EMIS)' : undefined,
      ibanNumber: lessonData.paymentMethod === 'transferencia_bancaria' ? 'AO06.0040.0000.1829.1029.1018.4' : undefined,
      status: 'concluido',
      date: new Date().toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      planType: lessonData.packageId ? 'pacote_mensal' : 'aula_avulsa'
    };

    // Update tutors hiredCount
    setTutors(prev => prev.map(t => t.id === lessonData.tutor.id ? { ...t, hiredCount: t.hiredCount + 1 } : t));
    setLessons(prev => [newLesson, ...prev]);
    setPayments(prev => [newPayment, ...prev]);

    // Send automatic greeting in internal chat
    const autoMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId: lessonData.tutor.id,
      senderId: lessonData.tutor.id,
      senderName: lessonData.tutor.name,
      receiverId: currentUser?.id || 'guest-student',
      text: `Olá ${currentUser?.name || 'colega'}! Agradeço pela confirmação da aula de ${lessonData.subject} marcada para ${lessonData.date} às ${lessonData.time}. Prepare as suas dúvidas que vamos tirar todas!`,
      timestamp: 'Agora',
      read: true
    };
    setMessages(prev => [...prev, autoMsg]);

    // Enviar para Supabase se configurado
    if (isSupabaseConfigured) {
      supabaseService.createLesson({
        student_name: newLesson.studentName,
        student_phone: newLesson.studentPhone,
        tutor_name: newLesson.tutorName,
        subject: newLesson.subject,
        date: newLesson.date,
        time: newLesson.time,
        modality: newLesson.modality,
        location_details: newLesson.locationDetails,
        status: newLesson.status,
        price_kz: newLesson.priceKz,
        payment_status: newLesson.paymentStatus,
        notes: newLesson.notes
      }).catch(err => console.warn('Supabase lesson insert notice:', err));

      supabaseService.createPayment({
        tutor_name: newPayment.tutorName,
        amount_kz: newPayment.amountKz,
        method: newPayment.method,
        multicaixa_phone: newPayment.multicaixaPhone,
        reference_number: newPayment.referenceNumber,
        status: newPayment.status,
        plan_type: newPayment.planType
      }).catch(err => console.warn('Supabase payment insert notice:', err));
    }

    return { lesson: newLesson, payment: newPayment };
  };

  const updateLessonStatus = (lessonId: string, status: LessonStatus) => {
    setLessons(prev => prev.map(l => l.id === lessonId ? { ...l, status } : l));
  };

  const sendMessage = (receiverId: string, text: string) => {
    if (!text.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId: receiverId,
      senderId: currentUser?.id || 'demo-student',
      senderName: currentUser?.name || 'Estudante',
      receiverId: receiverId,
      text: text.trim(),
      timestamp: 'Agora',
      read: true
    };

    setMessages(prev => [...prev, newMsg]);

    if (isSupabaseConfigured) {
      supabaseService.sendMessage({
        conversation_id: receiverId,
        sender_id: newMsg.senderId,
        sender_name: newMsg.senderName,
        receiver_id: receiverId,
        text: newMsg.text
      }).catch(err => console.warn('Supabase message insert notice:', err));
    }

    // Simulated reply after 1.5 seconds if talking to tutor
    const targetTutor = tutors.find(t => t.id === receiverId || t.userId === receiverId);
    if (targetTutor && currentUser?.role !== 'tutor') {
      setTimeout(() => {
        const reply: ChatMessage = {
          id: `reply-${Date.now()}`,
          conversationId: targetTutor.id,
          senderId: targetTutor.id,
          senderName: targetTutor.name,
          receiverId: currentUser?.id || 'demo-student',
          text: `Olá Carlos! Recebi a tua mensagem. Estou disponível para tirar as tuas dúvidas. Podemos também alinhar detalhes via WhatsApp (${targetTutor.phone}).`,
          timestamp: 'Agora',
          read: true
        };
        setMessages(prev => [...prev, reply]);
      }, 1500);
    }
  };

  const addReview = (reviewData: {
    tutorId: string;
    rating: number;
    comment: string;
    subject: string;
  }) => {
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      tutorId: reviewData.tutorId,
      studentId: currentUser?.id || 'demo-student',
      studentName: currentUser?.name || 'Estudante Anónimo',
      studentInstitution: currentUser?.studentDetails?.institution || 'Universidade em Angola',
      rating: reviewData.rating,
      comment: reviewData.comment,
      date: new Date().toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' }),
      subject: reviewData.subject
    };

    setReviews(prev => [newRev, ...prev]);

    if (isSupabaseConfigured) {
      supabaseService.createReview({
        student_name: newRev.studentName,
        student_institution: newRev.studentInstitution,
        rating: newRev.rating,
        comment: newRev.comment,
        subject: newRev.subject
      }).catch(err => console.warn('Supabase review insert notice:', err));
    }

    // Recalculate tutor rating
    setTutors(prev => prev.map(t => {
      if (t.id === reviewData.tutorId) {
        const currentTotal = t.rating * t.reviewCount;
        const newCount = t.reviewCount + 1;
        const newRating = Number(((currentTotal + reviewData.rating) / newCount).toFixed(2));
        return {
          ...t,
          rating: newRating,
          reviewCount: newCount
        };
      }
      return t;
    }));

    setIsReviewModalOpen(false);
  };

  const switchDemoRole = (role: 'student' | 'tutor') => {
    if (role === 'student') {
      setCurrentUser(DEMO_STUDENT_USER);
    } else {
      setCurrentUser(DEMO_TUTOR_USER);
    }
  };

  const resetDatabase = () => {
    localStorage.clear();
    setCurrentUser(DEMO_STUDENT_USER);
    setTutors(INITIAL_TUTORS);
    setReviews(INITIAL_REVIEWS);
    setLessons(INITIAL_LESSONS);
    setPayments(INITIAL_PAYMENTS);
    setMessages(INITIAL_MESSAGES);
    setFavorites(['tutor-1']);
    setFilters(defaultFilters);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isSupabaseConnected: isSupabaseConfigured,
        tutors,
        subjects,
        reviews,
        lessons,
        payments,
        messages,
        favorites,
        filters,
        setFilters,
        resetFilters,
        activeTutorForProfile,
        setActiveTutorForProfile,
        activeTutorForBooking,
        setActiveTutorForBooking,
        activeChatTutor,
        setActiveChatTutor,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        isSupportModalOpen,
        setIsSupportModalOpen,
        isReviewModalOpen,
        setIsReviewModalOpen,
        tutorToReview,
        setTutorToReview,
        activeView,
        setActiveView,
        isSmartphoneMode,
        setIsSmartphoneMode,
        reloadDisciplinas,
        toggleFavorite,
        registerStudent,
        registerTutor,
        bookLesson,
        updateLessonStatus,
        sendMessage,
        addReview,
        switchDemoRole,
        resetDatabase
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

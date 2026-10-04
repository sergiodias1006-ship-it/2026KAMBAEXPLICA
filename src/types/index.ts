export type UserRole = 'student' | 'tutor' | 'guest';

export type EducationLevel = 
  | 'Ensino Secundário' 
  | 'Pré-Universitário / Exames de Acesso' 
  | 'Licenciatura' 
  | 'Mestrado' 
  | 'Doutoramento' 
  | 'Formação Profissional';

export type AcademicDegree = 
  | 'Licenciatura' 
  | 'Mestrado' 
  | 'Doutoramento' 
  | 'Docente Universitário' 
  | 'Especialista Sénior';

export type Modality = 'online' | 'presencial' | 'ambos';

export interface User {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  phone: string; // WhatsApp formatted (+244...)
  avatar: string;
  province: string;
  municipality: string;
  studentDetails?: {
    educationLevel: EducationLevel;
    institution: string; // e.g. UAN, ISPTEC, UCAN, IMIL
    course: string;
  };
  tutorDetails?: TutorProfile;
}

export interface PackageOffer {
  id: string;
  name: string;
  lessons: number;
  discountPercent: number;
  priceKz: number;
  popular?: boolean;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: number;
  verified: boolean;
}

export interface Review {
  id: string;
  tutorId: string;
  studentId: string;
  studentName: string;
  studentAvatar?: string;
  studentInstitution: string;
  rating: number; // 1 to 5
  comment: string;
  date: string;
  subject: string;
}

export interface TutorProfile {
  id: string;
  userId: string;
  name: string;
  title: string;
  avatar: string;
  coverImage?: string;
  bio: string;
  academicDegree: AcademicDegree;
  institution: string;
  specialization: string;
  subjects: string[];
  educationLevelsTaught: EducationLevel[];
  experienceYears: number;
  pricePerHour: number; // Minimum 2000 Kz
  modalities: Modality;
  province: string;
  municipality: string;
  rating: number; // Average
  reviewCount: number;
  successRate: number; // % of students approved
  hiredCount: number;
  verified: boolean; // Selo de Confiança KAMBAEXPLICA
  idDocumentType: 'Bilhete de Identidade (BI)' | 'Passaporte';
  idDocumentNumber: string;
  phone: string;
  whatsapp: string;
  availability: {
    [day: string]: string[]; // 'Segunda': ['09:00', '11:00', '15:00', '17:00']
  };
  packages: PackageOffer[];
  certificates: Certificate[];
}

export interface SubjectCategory {
  id: string;
  name: string;
  description: string;
  iconName: string;
  popular: boolean;
  tutorCount: number;
  examples: string[];
}

export type LessonStatus = 'agendada' | 'concluida' | 'cancelada' | 'pendente_aprovacao';

export interface Lesson {
  id: string;
  studentId: string;
  studentName: string;
  studentPhone: string;
  tutorId: string;
  tutorName: string;
  tutorAvatar: string;
  subject: string;
  date: string;
  time: string;
  modality: 'online' | 'presencial';
  locationDetails?: string;
  status: LessonStatus;
  meetingLink?: string;
  priceKz: number;
  paymentStatus: 'pago' | 'pendente' | 'reembolsado';
  notes?: string;
}

export type PaymentMethod = 'multicaixa_express' | 'transferencia_bancaria';
export type PaymentStatus = 'concluido' | 'processando' | 'falhado';

export interface PaymentTransaction {
  id: string;
  lessonId?: string;
  studentId: string;
  tutorId: string;
  tutorName: string;
  amountKz: number;
  method: PaymentMethod;
  multicaixaPhone?: string;
  referenceNumber: string;
  entityNumber?: string;
  ibanNumber?: string;
  status: PaymentStatus;
  date: string;
  planType: 'aula_avulsa' | 'pacote_mensal';
  packageTitle?: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export interface FilterOptions {
  searchQuery: string;
  subject: string;
  level: string;
  province: string;
  minPrice: number;
  maxPrice: number;
  modality: 'todos' | 'online' | 'presencial' | 'ambos';
  minRating: number;
  sortBy: 'recommended' | 'rating' | 'price_asc' | 'price_desc' | 'success_rate';
}

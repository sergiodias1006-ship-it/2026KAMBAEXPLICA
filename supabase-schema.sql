-- ====================================================================
-- ESQUEMA COMPLETO DE BASE DE DADOS DO KAMBAEXPLICA (SUPABASE / POSTGRESQL)
-- Execute este script no SQL Editor do seu Dashboard Supabase
-- ====================================================================

-- 1. TABELA DE UTILIZADORES (users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'tutor', 'admin')),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(50) NOT NULL,
  avatar_url TEXT,
  province VARCHAR(100) DEFAULT 'Luanda',
  municipality VARCHAR(100) DEFAULT 'Talatona',
  education_level VARCHAR(100),
  institution VARCHAR(255),
  course VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABELA DE EXPLICADORES (explicadores)
CREATE TABLE IF NOT EXISTS public.explicadores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  academic_degree VARCHAR(100) NOT NULL,
  institution VARCHAR(255) NOT NULL,
  specialization VARCHAR(255) NOT NULL,
  subjects TEXT[] NOT NULL DEFAULT '{}',
  education_levels_taught TEXT[] NOT NULL DEFAULT '{}',
  experience_years INT DEFAULT 1,
  price_per_hour NUMERIC(10, 2) NOT NULL CHECK (price_per_hour >= 2000),
  modalities VARCHAR(20) DEFAULT 'ambos' CHECK (modalities IN ('online', 'presencial', 'ambos')),
  province VARCHAR(100) DEFAULT 'Luanda',
  municipality VARCHAR(100) DEFAULT 'Talatona',
  rating NUMERIC(3, 2) DEFAULT 5.0,
  review_count INT DEFAULT 0,
  success_rate INT DEFAULT 95,
  hired_count INT DEFAULT 0,
  verified BOOLEAN DEFAULT TRUE,
  id_document_number VARCHAR(100),
  whatsapp VARCHAR(50),
  availability JSONB DEFAULT '{"Segunda": ["09:00", "14:00"], "Quarta": ["10:00", "15:00"]}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABELA DE DISCIPLINAS (disciplinas)
CREATE TABLE IF NOT EXISTS public.disciplinas (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  icon_name VARCHAR(100),
  popular BOOLEAN DEFAULT FALSE,
  tutor_count INT DEFAULT 0,
  examples TEXT[] DEFAULT '{}'
);

-- 4. TABELA DE AULAS (aulas)
CREATE TABLE IF NOT EXISTS public.aulas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  student_name VARCHAR(255) NOT NULL,
  student_phone VARCHAR(50),
  tutor_id UUID REFERENCES public.explicadores(id) ON DELETE CASCADE,
  tutor_name VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  time VARCHAR(20) NOT NULL,
  modality VARCHAR(20) NOT NULL CHECK (modality IN ('online', 'presencial')),
  location_details TEXT,
  status VARCHAR(30) DEFAULT 'agendada' CHECK (status IN ('agendada', 'concluida', 'cancelada', 'pendente_aprovacao')),
  meeting_link TEXT,
  price_kz NUMERIC(10, 2) NOT NULL,
  payment_status VARCHAR(20) DEFAULT 'pago' CHECK (payment_status IN ('pago', 'pendente', 'reembolsado')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TABELA DE PAGAMENTOS (pagamentos)
CREATE TABLE IF NOT EXISTS public.pagamentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID REFERENCES public.aulas(id) ON DELETE SET NULL,
  student_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  tutor_id UUID REFERENCES public.explicadores(id) ON DELETE SET NULL,
  tutor_name VARCHAR(255) NOT NULL,
  amount_kz NUMERIC(10, 2) NOT NULL,
  method VARCHAR(50) NOT NULL CHECK (method IN ('multicaixa_express', 'transferencia_bancaria')),
  multicaixa_phone VARCHAR(50),
  reference_number VARCHAR(100) NOT NULL,
  entity_number VARCHAR(50),
  iban_number VARCHAR(100),
  status VARCHAR(20) DEFAULT 'concluido' CHECK (status IN ('concluido', 'processando', 'falhado')),
  plan_type VARCHAR(30) DEFAULT 'aula_avulsa',
  date_recorded TIMESTAMPTZ DEFAULT NOW()
);

-- 6. TABELA DE MENSAGENS (mensagens)
CREATE TABLE IF NOT EXISTS public.mensagens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id VARCHAR(255) NOT NULL,
  sender_id VARCHAR(255) NOT NULL,
  sender_name VARCHAR(255) NOT NULL,
  receiver_id VARCHAR(255) NOT NULL,
  text TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. TABELA DE AVALIAÇÕES (avaliacoes)
CREATE TABLE IF NOT EXISTS public.avaliacoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tutor_id UUID REFERENCES public.explicadores(id) ON DELETE CASCADE,
  student_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  student_name VARCHAR(255) NOT NULL,
  student_institution VARCHAR(255),
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  subject VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- POLÍTICAS DE SEGURANÇA (ROW LEVEL SECURITY - RLS)
-- ====================================================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.explicadores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disciplinas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aulas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pagamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mensagens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.avaliacoes ENABLE ROW LEVEL SECURITY;

-- Leitura pública para busca de explicadores, disciplinas e avaliações
CREATE POLICY "Permitir leitura pública de explicadores" ON public.explicadores FOR SELECT USING (true);
CREATE POLICY "Permitir leitura pública de disciplinas" ON public.disciplinas FOR SELECT USING (true);
CREATE POLICY "Permitir leitura pública de avaliações" ON public.avaliacoes FOR SELECT USING (true);

-- Permitir criação e gestão de aulas, pagamentos e mensagens
CREATE POLICY "Permitir inserção de aulas" ON public.aulas FOR ALL USING (true);
CREATE POLICY "Permitir inserção de pagamentos" ON public.pagamentos FOR ALL USING (true);
CREATE POLICY "Permitir inserção de mensagens" ON public.mensagens FOR ALL USING (true);
CREATE POLICY "Permitir inserção de utilizadores" ON public.users FOR ALL USING (true);

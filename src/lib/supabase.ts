import { createClient } from '@supabase/supabase-js';
import { SubjectCategory } from '../types';

// Credenciais do projeto Supabase fornecidas
const defaultUrl = 'https://rocmobtfbbswrlmimwtq.supabase.co';
const defaultAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvY21vYnRmYmJzd3JsbWltd3RxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIzNjM4ODksImV4cCI6MjEwNzkzOTg4OX0.rLx4vAsuhyChQO_ZicLHWysYyVJR2_O8991hJ4sY-SM';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || defaultUrl;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || defaultAnonKey;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Utilitários para sincronização direta com Supabase
 */
export const supabaseService = {
  // 1. Obter lista de disciplinas da base de dados Supabase para o ecrã principal
  async getDisciplinas(): Promise<SubjectCategory[] | null> {
    try {
      if (!supabase) return null;
      const { data, error } = await supabase
        .from('disciplinas')
        .select('*');

      if (error) {
        console.warn('Aviso ao consultar tabela "disciplinas" no Supabase:', error.message);
        return null;
      }

      if (!data || data.length === 0) {
        return null;
      }

      // Mapeamento normalizado compatível com colunas em português (nome/categoria) e inglês (name/category)
      return data.map((item: any) => {
        const name = item.nome || item.name || 'Disciplina';
        const category = item.categoria || item.category || 'Geral';
        const description = item.descricao || item.description || `Aulas de apoio e explicações de ${name} (${category})`;
        const id = String(item.id || name.toLowerCase().replace(/\s+/g, '-'));

        let iconName = item.icone || item.icon_name || item.iconName;
        if (!iconName) {
          const lower = name.toLowerCase();
          if (lower.includes('matemática') || lower.includes('cálculo') || lower.includes('álgebra')) iconName = 'Calculator';
          else if (lower.includes('física') || lower.includes('mecânica')) iconName = 'Atom';
          else if (lower.includes('química')) iconName = 'FlaskConical';
          else if (lower.includes('direito') || lower.includes('jurídico')) iconName = 'Scale';
          else if (lower.includes('contabilidade') || lower.includes('gestão')) iconName = 'Briefcase';
          else if (lower.includes('economia') || lower.includes('finanças')) iconName = 'TrendingUp';
          else if (lower.includes('programação') || lower.includes('informática')) iconName = 'Code';
          else if (lower.includes('estatística')) iconName = 'BarChart2';
          else iconName = 'BookOpen';
        }

        return {
          id,
          name,
          category,
          description,
          iconName,
          popular: Boolean(item.popular ?? true),
          tutorCount: Number(item.tutor_count || item.tutorCount || 15),
          examples: Array.isArray(item.exemplos)
            ? item.exemplos
            : Array.isArray(item.examples)
            ? item.examples
            : [category, 'Ensino Secundário', 'Universidade']
        };
      });
    } catch (err) {
      console.warn('Erro ao comunicar com o cliente Supabase:', err);
      return null;
    }
  },

  // 2. Obter explicadores da base de dados
  async getTutors() {
    try {
      if (!supabase) return null;
      const { data, error } = await supabase
        .from('explicadores')
        .select('*')
        .order('rating', { ascending: false });
      if (error) {
        console.warn('Aviso ao obter explicadores do Supabase:', error.message);
        return null;
      }
      return data;
    } catch (err) {
      console.warn('Erro ao obter explicadores:', err);
      return null;
    }
  },

  // 3. Registar novo explicador
  async createTutor(tutorData: any) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('explicadores')
      .insert([tutorData])
      .select();
    if (error) throw error;
    return data?.[0];
  },

  // 4. Registar agendamento de aula
  async createLesson(lessonData: any) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('aulas')
      .insert([lessonData])
      .select();
    if (error) throw error;
    return data?.[0];
  },

  // 5. Registar transação de pagamento (Multicaixa Express / Transferência)
  async createPayment(paymentData: any) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('pagamentos')
      .insert([paymentData])
      .select();
    if (error) throw error;
    return data?.[0];
  },

  // 6. Enviar mensagem de chat
  async sendMessage(messageData: any) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('mensagens')
      .insert([messageData])
      .select();
    if (error) throw error;
    return data?.[0];
  },

  // 7. Submeter avaliação de explicador
  async createReview(reviewData: any) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('avaliacoes')
      .insert([reviewData])
      .select();
    if (error) throw error;
    return data?.[0];
  }
};

/**
 * Função exportada individual para listar as disciplinas da base de dados Supabase
 */
export async function getDisciplinas(): Promise<SubjectCategory[] | null> {
  return supabaseService.getDisciplinas();
}

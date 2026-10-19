import { createClient } from '@supabase/supabase-js';
import { SubjectCategory } from '../types';

// Credenciais do projeto Supabase fornecidas
const defaultUrl = 'https://supabase.co';
const defaultAnonKey = 'COLE_AQUI_A_SUA_CHAVE_ANON_PUBLIC';

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

      // Mapeamento normalizado para a interface SubjectCategory
      return data.map((item: any) => ({
        id: String(item.id || item.name.toLowerCase().replace(/\s+/g, '-')),
        name: item.name,
        category: item.category || 'Geral',
        description: item.description || `Aulas de apoio e explicações de ${item.name}`,
        iconName: item.icon_name || item.iconName || 'BookOpen',
        popular: Boolean(item.popular ?? true),
        tutorCount: Number(item.tutor_count || item.tutorCount || 10),
        examples: Array.isArray(item.examples) ? item.examples : (item.examples ? [item.examples] : ['Ensino Secundário', 'Universidade'])
      }));
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

import { createClient } from '@supabase/supabase-js';

// No Vite, usamos import.meta.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Faltam as variáveis de ambiente do Supabase!');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
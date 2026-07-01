import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://scykjqlxmntepotaogyy.supabase.co';
const publicAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjeWtqcWx4bW50ZXBvdGFvZ3l5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk0MDYyODEsImV4cCI6MjA5NDk4MjI4MX0.6Q1Ud5awuqCj60ycaWWn_kwGBy68MB4vvzr1za2AtOs';

export const supabase = createClient(supabaseUrl, publicAnonKey);

export const signUp = async (email: string, password: string, name: string, farmName: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { name, farmName } } });
  if (error) throw error;
  return data;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
};

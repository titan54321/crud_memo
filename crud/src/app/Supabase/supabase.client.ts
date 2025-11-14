import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://usqvfzvixyhbpevwkkjn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzcXZmenZpeHloYnBldndra2puIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwMzE0MTAsImV4cCI6MjA3ODYwNzQxMH0.Fa8bNgQnMpo1h5eWGCMb8aSFLaSwdUxfhSVJsWyN6E8';

// ❗ Cliente solo en el navegador (SSR seguro)
export const supabase: SupabaseClient = typeof window !== 'undefined'
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        autoRefreshToken: false,  // Evita el error del lock
        persistSession: true,
        detectSessionInUrl: true
      }
    })
  : ({} as SupabaseClient); // En SSR regresamos un objeto vacío
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://usqvfzvixyhbpevwkkjn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzcXZmenZpeHloYnBldndra2puIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwMzE0MTAsImV4cCI6MjA3ODYwNzQxMH0.Fa8bNgQnMpo1h5eWGCMb8aSFLaSwdUxfhSVJsWyN6E8';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

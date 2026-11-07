import { createClient } from '@supabase/supabase-js';

// Safe environment accessor that works across both Vite and Node.js
const getEnvVar = (key, fallback) => {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
      return import.meta.env[key];
    }
  } catch {}

  try {
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
      return process.env[key];
    }
  } catch {}

  return fallback;
};

export const supabaseUrl = getEnvVar('VITE_SUPABASE_URL', 'https://godpedfkkxfcdmsexmle.supabase.co');
export const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY', 'sb_publishable_i6C2zQ3uqZ4D1W9RlxUmcg_gdYYN07S');

export const isSupabaseConfigured = () => {
  return Boolean(
    supabaseUrl && 
    supabaseAnonKey && 
    !supabaseUrl.includes('your-project-id') &&
    !supabaseAnonKey.includes('your-anon-key')
  );
};

export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    })
  : null;

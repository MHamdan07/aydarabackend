import { createClient } from '@supabase/supabase-js';
import { ENV } from './env.js';

let supabaseClient = null;
let isConnected = false;

const supabaseKey = ENV.SUPABASE_SERVICE_ROLE_KEY || ENV.SUPABASE_ANON_KEY;

if (ENV.SUPABASE_URL && supabaseKey) {
  try {
    supabaseClient = createClient(ENV.SUPABASE_URL, supabaseKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: false
      }
    });
    isConnected = true;
    console.log('[AYDARA Backend] Connected to Supabase Cloud Database.');
  } catch (err) {
    console.warn(`[AYDARA Backend] Supabase initialization warning: ${err.message}`);
  }
}

export const supabase = supabaseClient;
export const isSupabaseConfigured = () => Boolean(isConnected && supabaseClient);

/**
 * Fetch latest database state from Supabase tables
 */
export async function fetchStoreFromSupabase() {
  if (!isSupabaseConfigured()) return null;

  try {
    const [
      { data: categories, error: catErr },
      { data: products, error: prodErr },
      { data: orders, error: ordErr },
      { data: settingsRows, error: setErr },
      { data: users, error: usrErr }
    ] = await Promise.all([
      supabaseClient.from('categories').select('*').order('order_index', { ascending: true }),
      supabaseClient.from('products').select('*'),
      supabaseClient.from('orders').select('*').order('created_at', { ascending: false }),
      supabaseClient.from('settings').select('*').limit(1),
      supabaseClient.from('users').select('*')
    ]);

    if (catErr || prodErr || ordErr || setErr) {
      console.warn('[Supabase Sync Notice]: Some tables returned notices, using fallback merge.');
    }

    return {
      categories: categories || null,
      products: products || null,
      orders: orders || null,
      settings: settingsRows?.[0]?.data || null,
      users: users || null
    };
  } catch (err) {
    console.warn('[Supabase Fetch Error]:', err.message);
    return null;
  }
}

/**
 * Sync a single record to Supabase table
 */
export async function syncRecordToSupabase(table, data) {
  if (!isSupabaseConfigured() || !data) return false;

  try {
    const { error } = await supabaseClient
      .from(table)
      .upsert(data, { onConflict: 'id' });

    if (error) {
      console.warn(`[Supabase sync ${table} notice]:`, error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn(`[Supabase sync ${table} error]:`, err.message);
    return false;
  }
}

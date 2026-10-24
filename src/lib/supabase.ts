import { createClient } from '@supabase/supabase-js';
import { CartItem } from '../types';

export const SUPABASE_PROJECT_ID = 'wmvgltoyjvqkqxscevbp';

/**
 * Resolves the Supabase URL safely, correcting common misconfigurations
 * such as project refs without https, domain without protocol, or accidentally
 * providing an API key in the URL field.
 */
function resolveSupabaseUrl(): string {
  const envVal = (import.meta.env.VITE_SUPABASE_URL || '').trim();

  // If already a valid http/https URL that is not an API key
  if (
    /^https?:\/\//i.test(envVal) &&
    !envVal.startsWith('http://sb_') &&
    !envVal.startsWith('https://sb_')
  ) {
    return envVal;
  }

  // If user passed domain without protocol
  if (envVal.includes('.supabase.co') && !envVal.startsWith('sb_')) {
    return `https://${envVal.replace(/^\/+/, '')}`;
  }

  // If user passed project ref
  if (/^[a-z0-9]{15,30}$/i.test(envVal) && !envVal.startsWith('sb_')) {
    return `https://${envVal}.supabase.co`;
  }

  // Default correct Supabase project URL
  return `https://${SUPABASE_PROJECT_ID}.supabase.co`;
}

/**
 * Resolves the Supabase publishable/anon key safely
 */
function resolveSupabaseAnonKey(): string {
  const envKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();
  const envUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();

  // If the user accidentally pasted the publishable key into VITE_SUPABASE_URL
  if (envUrl && (envUrl.startsWith('sb_publishable_') || envUrl.startsWith('eyJ'))) {
    return envUrl;
  }

  if (
    envKey &&
    (envKey.startsWith('sb_publishable_') ||
      envKey.startsWith('eyJ') ||
      envKey.startsWith('sb_'))
  ) {
    return envKey;
  }

  return 'sb_publishable_3xi74m6NkePEhkwrqVudjw_z3nWpc3M';
}

export const SUPABASE_URL = resolveSupabaseUrl();
export const SUPABASE_ANON_KEY = resolveSupabaseAnonKey();

// Initialize Supabase client safely with fallback
function initSupabaseClient() {
  try {
    return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
    return createClient(
      `https://${SUPABASE_PROJECT_ID}.supabase.co`,
      'sb_publishable_3xi74m6NkePEhkwrqVudjw_z3nWpc3M'
    );
  }
}

export const supabase = initSupabaseClient();

export interface OrderInput {
  orderNumber: string;
  name: string;
  phone: string;
  email?: string;
  userId?: string;
  address: string;
  pincode?: string;
  paymentMethod: 'UPI' | 'COD' | string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discountAmount?: number;
  discountCode?: string | null;
  total: number;
  date?: string;
}

export interface SupabaseSaveResult {
  success: boolean;
  orderNumber: string;
  id?: string | number;
  error?: string;
  isTableMissing?: boolean;
}

/**
 * Saves order details to Supabase backend 'orders' table.
 * Includes resilience for variations in table schema (camelCase vs snake_case, column omission).
 */
export async function saveOrderToSupabase(order: OrderInput): Promise<SupabaseSaveResult> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return {
      success: false,
      orderNumber: order.orderNumber,
      error: 'Supabase credentials not configured'
    };
  }

  // 1. Prepare full payload matching common Supabase schema conventions
  const fullPayload = {
    order_number: order.orderNumber,
    customer_name: order.name,
    name: order.name,
    phone: order.phone,
    email: order.email || '',
    user_id: order.userId || 'guest',
    address: order.address,
    pincode: order.pincode || '',
    payment_method: order.paymentMethod,
    items: order.items,
    subtotal: order.subtotal,
    delivery_fee: order.deliveryFee,
    discount_amount: order.discountAmount || 0,
    discount_code: order.discountCode || null,
    total: order.total,
    status: 'Pending',
    created_at: new Date().toISOString()
  };

  try {
    // Attempt standard insert into 'orders'
    const { data, error } = await supabase
      .from('orders')
      .insert([fullPayload])
      .select();

    if (!error) {
      return {
        success: true,
        orderNumber: order.orderNumber,
        id: data && data[0] ? (data[0].id || data[0].order_number) : undefined
      };
    }

    console.warn('Initial Supabase insert returned error:', error.message, error);

    // If error indicates an unknown column (PGRST204), try trimmed payload
    if (error.code === 'PGRST204' || error.message?.includes('column')) {
      const simplifiedPayload = {
        order_number: order.orderNumber,
        customer_name: order.name,
        phone: order.phone,
        email: order.email || '',
        address: order.address,
        payment_method: order.paymentMethod,
        items: order.items,
        total: order.total,
        status: 'Pending'
      };

      const retry1 = await supabase
        .from('orders')
        .insert([simplifiedPayload])
        .select();

      if (!retry1.error) {
        return {
          success: true,
          orderNumber: order.orderNumber,
          id: retry1.data && retry1.data[0] ? (retry1.data[0].id || retry1.data[0].order_number) : undefined
        };
      }

      // Try with 'name' instead of 'customer_name'
      const retry2 = await supabase
        .from('orders')
        .insert([{
          order_number: order.orderNumber,
          name: order.name,
          phone: order.phone,
          email: order.email || '',
          address: order.address,
          payment_method: order.paymentMethod,
          items: order.items,
          total: order.total
        }])
        .select();

      if (!retry2.error) {
        return {
          success: true,
          orderNumber: order.orderNumber,
          id: retry2.data && retry2.data[0] ? (retry2.data[0].id || retry2.data[0].order_number) : undefined
        };
      }
    }

    const isMissing = error.code === 'PGRST205' || error.message?.toLowerCase().includes('not find the table');

    return {
      success: false,
      orderNumber: order.orderNumber,
      error: error.message,
      isTableMissing: isMissing
    };
  } catch (err: any) {
    console.error('Failed to save order to Supabase:', err);
    return {
      success: false,
      orderNumber: order.orderNumber,
      error: err?.message || 'Network error connecting to Supabase'
    };
  }
}

/**
 * Fetch orders from Supabase 'orders' table
 */
export async function fetchOrdersFromSupabase() {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return { success: false, error: error.message, data: [] };
    }
    return { success: true, data: data || [] };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Error fetching orders', data: [] };
  }
}

/**
 * Test connectivity to Supabase backend
 */
export async function testSupabaseConnection(): Promise<{ connected: boolean; message: string; tableExists: boolean }> {
  try {
    const { error } = await supabase.from('orders').select('count', { count: 'exact', head: true });
    if (!error) {
      return { connected: true, message: 'Connected to Supabase. "orders" table is active.', tableExists: true };
    }
    if (error.code === 'PGRST205') {
      return {
        connected: true,
        message: 'Connected to Supabase project, but "orders" table is not created yet.',
        tableExists: false
      };
    }
    return { connected: false, message: error.message, tableExists: false };
  } catch (err: any) {
    return { connected: false, message: err?.message || 'Failed to reach Supabase', tableExists: false };
  }
}

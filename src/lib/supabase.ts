import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper functions for common operations
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
};

export const getCurrentUserProfile = async () => {
  const user = await getCurrentUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) throw error;
  return data;
};

export const getCompanies = async () => {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

// Auth helpers
export const signUp = async (email: string, password: string, fullName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) throw error;
  return data;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// Data fetching helpers
export const getDeals = async (filters: { search?: string; owner?: string } = {}) => {
  let query = supabase
    .from('deals')
    .select(`
      *,
      company:companies(*),
      primary_contact:contacts(*),
      stage:pipeline_stages(*),
      assigned_user:users(*),
      deal_tags(
        tag:tags(*)
      )
    `);

  if (filters.search) {
    query = query.ilike('title', `%${filters.search}%`);
  }

  if (filters.owner) {
    const user = await getCurrentUser();
    if (filters.owner === 'my' && user) {
      query = query.eq('assigned_to', user.id);
    }
    // 'team' and 'all' filters would require more complex logic
    // depending on the team structure, which is not defined yet.
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getPipelineStages = async () => {
  const { data, error } = await supabase
    .from('pipeline_stages')
    .select('*')
    .eq('is_active', true)
    .order('stage_order');

  if (error) throw error;
  return data;
};

export const getContacts = async () => {
  const { data, error } = await supabase
    .from('contacts')
    .select(`
      *,
      company:companies(*),
      contact_tags(
        tag:tags(*)
      )
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getActivities = async () => {
  const { data, error } = await supabase
    .from('activities')
    .select(`
      *,
      deal:deals(*),
      contact:contacts(*),
      assigned_user:users(*)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getLeads = async () => {
  const { data, error } = await supabase
    .from('leads')
    .select(`
      *,
      assigned_user:users!leads_assigned_to_fkey(*)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

// Deal operations
export const createDeal = async (deal: {
  title: string;
  description?: string;
  value: number;
  probability?: number;
  expected_close_date?: string;
  stage_id: string;
  company_id?: string;
  primary_contact_id?: string;
  priority?: 'low' | 'medium' | 'high';
  source?: string;
}) => {
  const user = await getCurrentUserProfile();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('deals')
    .insert({
      ...deal,
      assigned_to: user.id,
      organization_id: user.organization_id,
      created_by: user.id,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateDeal = async (id: string, updates: Partial<{
  title: string;
  description: string;
  value: number;
  probability: number;
  expected_close_date: string;
  stage_id: string;
  company_id: string;
  primary_contact_id: string;
  priority: 'low' | 'medium' | 'high';
  is_won: boolean;
  is_lost: boolean;
  lost_reason: string;
}>) => {
  const { data, error } = await supabase
    .from('deals')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const moveDeal = async (dealId: string, newStageId: string) => {
  return updateDeal(dealId, { stage_id: newStageId });
};
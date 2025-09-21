export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string
          avatar_url: string | null
          organization_id: string | null
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          avatar_url?: string | null
          organization_id?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          avatar_url?: string | null
          organization_id?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
      }
      companies: {
        Row: {
          id: string
          name: string
          website: string | null
          industry: string | null
          size: string | null
          phone: string | null
          address: string | null
          city: string | null
          state: string | null
          country: string | null
          postal_code: string | null
          notes: string | null
          organization_id: string
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          website?: string | null
          industry?: string | null
          size?: string | null
          phone?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          country?: string | null
          postal_code?: string | null
          notes?: string | null
          organization_id: string
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          website?: string | null
          industry?: string | null
          size?: string | null
          phone?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          country?: string | null
          postal_code?: string | null
          notes?: string | null
          organization_id?: string
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      contacts: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string | null
          phone: string | null
          position: string | null
          company_id: string | null
          contact_type: 'primary' | 'secondary' | 'decision_maker' | 'influencer'
          avatar_url: string | null
          linkedin_url: string | null
          notes: string | null
          organization_id: string
          created_by: string | null
          created_at: string
          updated_at: string
          last_contacted_at: string | null
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          email?: string | null
          phone?: string | null
          position?: string | null
          company_id?: string | null
          contact_type?: 'primary' | 'secondary' | 'decision_maker' | 'influencer'
          avatar_url?: string | null
          linkedin_url?: string | null
          notes?: string | null
          organization_id: string
          created_by?: string | null
          created_at?: string
          updated_at?: string
          last_contacted_at?: string | null
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string | null
          phone?: string | null
          position?: string | null
          company_id?: string | null
          contact_type?: 'primary' | 'secondary' | 'decision_maker' | 'influencer'
          avatar_url?: string | null
          linkedin_url?: string | null
          notes?: string | null
          organization_id?: string
          created_by?: string | null
          created_at?: string
          updated_at?: string
          last_contacted_at?: string | null
        }
      }
      deals: {
        Row: {
          id: string
          title: string
          description: string | null
          value: number
          probability: number
          expected_close_date: string | null
          actual_close_date: string | null
          stage_id: string
          company_id: string | null
          primary_contact_id: string | null
          assigned_to: string
          priority: 'low' | 'medium' | 'high'
          source: string | null
          is_won: boolean
          is_lost: boolean
          lost_reason: string | null
          organization_id: string
          created_by: string | null
          created_at: string
          updated_at: string
          last_activity_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          value?: number
          probability?: number
          expected_close_date?: string | null
          actual_close_date?: string | null
          stage_id: string
          company_id?: string | null
          primary_contact_id?: string | null
          assigned_to: string
          priority?: 'low' | 'medium' | 'high'
          source?: string | null
          is_won?: boolean
          is_lost?: boolean
          lost_reason?: string | null
          organization_id: string
          created_by?: string | null
          created_at?: string
          updated_at?: string
          last_activity_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          value?: number
          probability?: number
          expected_close_date?: string | null
          actual_close_date?: string | null
          stage_id?: string
          company_id?: string | null
          primary_contact_id?: string | null
          assigned_to?: string
          priority?: 'low' | 'medium' | 'high'
          source?: string | null
          is_won?: boolean
          is_lost?: boolean
          lost_reason?: string | null
          organization_id?: string
          created_by?: string | null
          created_at?: string
          updated_at?: string
          last_activity_at?: string
        }
      }
      pipeline_stages: {
        Row: {
          id: string
          name: string
          color: string
          stage_order: number
          is_active: boolean
          organization_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          color?: string
          stage_order: number
          is_active?: boolean
          organization_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          color?: string
          stage_order?: number
          is_active?: boolean
          organization_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      activities: {
        Row: {
          id: string
          type: 'call' | 'email' | 'meeting' | 'task' | 'note'
          title: string
          description: string | null
          due_date: string | null
          completed_at: string | null
          is_completed: boolean
          deal_id: string | null
          lead_id: string | null
          contact_id: string | null
          company_id: string | null
          assigned_to: string
          organization_id: string
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          type: 'call' | 'email' | 'meeting' | 'task' | 'note'
          title: string
          description?: string | null
          due_date?: string | null
          completed_at?: string | null
          is_completed?: boolean
          deal_id?: string | null
          lead_id?: string | null
          contact_id?: string | null
          company_id?: string | null
          assigned_to: string
          organization_id: string
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          type?: 'call' | 'email' | 'meeting' | 'task' | 'note'
          title?: string
          description?: string | null
          due_date?: string | null
          completed_at?: string | null
          is_completed?: boolean
          deal_id?: string | null
          lead_id?: string | null
          contact_id?: string | null
          company_id?: string | null
          assigned_to?: string
          organization_id?: string
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      leads: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string | null
          phone: string | null
          company_name: string | null
          position: string | null
          source: string | null
          status: 'new' | 'contacted' | 'qualified' | 'unqualified' | 'converted'
          score: number
          notes: string | null
          assigned_to: string | null
          converted_to_deal_id: string | null
          organization_id: string
          created_by: string | null
          created_at: string
          updated_at: string
          last_contacted_at: string | null
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          email?: string | null
          phone?: string | null
          company_name?: string | null
          position?: string | null
          source?: string | null
          status?: 'new' | 'contacted' | 'qualified' | 'unqualified' | 'converted'
          score?: number
          notes?: string | null
          assigned_to?: string | null
          converted_to_deal_id?: string | null
          organization_id: string
          created_by?: string | null
          created_at?: string
          updated_at?: string
          last_contacted_at?: string | null
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string | null
          phone?: string | null
          company_name?: string | null
          position?: string | null
          source?: string | null
          status?: 'new' | 'contacted' | 'qualified' | 'unqualified' | 'converted'
          score?: number
          notes?: string | null
          assigned_to?: string | null
          converted_to_deal_id?: string | null
          organization_id?: string
          created_by?: string | null
          created_at?: string
          updated_at?: string
          last_contacted_at?: string | null
        }
      }
      tags: {
        Row: {
          id: string
          name: string
          color: string
          organization_id: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          color?: string
          organization_id: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          color?: string
          organization_id?: string
          created_at?: string
        }
      }
      deal_tags: {
        Row: {
          deal_id: string
          tag_id: string
        }
        Insert: {
          deal_id: string
          tag_id: string
        }
        Update: {
          deal_id?: string
          tag_id?: string
        }
      }
      contact_tags: {
        Row: {
          contact_id: string
          tag_id: string
        }
        Insert: {
          contact_id: string
          tag_id: string
        }
        Update: {
          contact_id?: string
          tag_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      activity_type: 'call' | 'email' | 'meeting' | 'task' | 'note'
      lead_status: 'new' | 'contacted' | 'qualified' | 'unqualified' | 'converted'
      deal_priority: 'low' | 'medium' | 'high'
      contact_type: 'primary' | 'secondary' | 'decision_maker' | 'influencer'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
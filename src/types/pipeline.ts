import { Tables } from '@/integrations/supabase/types';

export interface PipelineStage extends Tables<'pipeline_stages'> {
  deals: any[]; // Use any for now to avoid complex type matching issues
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  source: string;
  status: "new" | "contacted" | "qualified" | "unqualified";
  score: number;
  assignedTo: string;
  createdAt: string;
  lastContact: string;
  notes: string;
}

export interface Activity {
  id: string;
  type: "call" | "email" | "meeting" | "task" | "note";
  title: string;
  description: string;
  dealId?: string;
  leadId?: string;
  contactId?: string;
  assignedTo: string;
  dueDate?: string;
  completed: boolean;
  createdAt: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  avatar?: string;
  tags: string[];
  deals: string[];
  lastContact: string;
  createdAt: string;
}
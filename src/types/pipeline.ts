export interface Deal {
  id: string;
  title: string;
  company: string;
  contact: string;
  value: number;
  stage: string;
  probability: number;
  expectedCloseDate: string;
  lastActivity: string;
  tags: string[];
  priority: "low" | "medium" | "high";
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
}

export interface PipelineStage {
  id: string;
  name: string;
  color: string;
  deals: Deal[];
  order: number;
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
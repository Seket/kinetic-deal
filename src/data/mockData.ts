import { PipelineStage, Lead, Activity, Contact } from "@/types/pipeline";

// Mock data is kept for reference but not used with actual Supabase integration
export const mockLeads: Lead[] = [
  {
    id: "1",
    name: "Alex Thompson",
    email: "alex@newcompany.com",
    phone: "+1-555-0123",
    company: "NewCompany Ltd",
    source: "Website",
    status: "new",
    score: 85,
    assignedTo: "Sarah Johnson",
    createdAt: "2024-10-17",
    lastContact: "2024-10-17",
    notes: "Interested in enterprise solution"
  },
  {
    id: "2",
    name: "Maria Rodriguez",
    email: "maria@innovate.com",
    phone: "+1-555-0124",
    company: "Innovate Solutions",
    source: "LinkedIn",
    status: "qualified",
    score: 92,
    assignedTo: "Mike Wilson",
    createdAt: "2024-10-15",
    lastContact: "2024-10-16",
    notes: "Budget confirmed, looking to implement Q1"
  }
];

export const mockActivities: Activity[] = [
  {
    id: "1",
    type: "call",
    title: "Follow-up call with TechCorp",
    description: "Discuss technical requirements and implementation timeline",
    dealId: "1",
    assignedTo: "Sarah Johnson",
    dueDate: "2024-10-18",
    completed: false,
    createdAt: "2024-10-17"
  },
  {
    id: "2",
    type: "meeting",
    title: "Product demo for Global Solutions",
    description: "Present cloud infrastructure capabilities",
    dealId: "3",
    assignedTo: "Sarah Johnson",
    dueDate: "2024-10-19",
    completed: false,
    createdAt: "2024-10-16"
  }
];

export const mockContacts: Contact[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@techcorp.com",
    phone: "+1-555-0100",
    company: "TechCorp Inc.",
    position: "CTO",
    tags: ["decision-maker", "technical"],
    deals: ["1"],
    lastContact: "2024-10-15",
    createdAt: "2024-09-01"
  },
  {
    id: "2",
    name: "Emily Davis",
    email: "emily@startupxyz.com",
    phone: "+1-555-0101",
    company: "StartupXYZ",
    position: "Marketing Director",
    tags: ["marketing", "budget-holder"],
    deals: ["2"],
    lastContact: "2024-10-14",
    createdAt: "2024-09-15"
  }
];
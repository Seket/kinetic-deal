import { Deal, PipelineStage, Lead, Activity, Contact } from "@/types/pipeline";

export const mockDeals: Deal[] = [
  {
    id: "1",
    title: "Enterprise Software License",
    company: "TechCorp Inc.",
    contact: "John Smith",
    value: 75000,
    stage: "prospecting",
    probability: 25,
    expectedCloseDate: "2024-11-15",
    lastActivity: "2024-10-15",
    tags: ["enterprise", "software"],
    priority: "high",
    assignedTo: "Sarah Johnson",
    createdAt: "2024-09-01",
    updatedAt: "2024-10-15"
  },
  {
    id: "2",
    title: "Digital Marketing Package",
    company: "StartupXYZ",
    contact: "Emily Davis",
    value: 15000,
    stage: "qualification",
    probability: 50,
    expectedCloseDate: "2024-10-30",
    lastActivity: "2024-10-14",
    tags: ["marketing", "digital"],
    priority: "medium",
    assignedTo: "Mike Wilson",
    createdAt: "2024-09-15",
    updatedAt: "2024-10-14"
  },
  {
    id: "3",
    title: "Cloud Infrastructure",
    company: "Global Solutions",
    contact: "Robert Brown",
    value: 120000,
    stage: "demo",
    probability: 70,
    expectedCloseDate: "2024-11-30",
    lastActivity: "2024-10-16",
    tags: ["cloud", "infrastructure"],
    priority: "high",
    assignedTo: "Sarah Johnson",
    createdAt: "2024-08-20",
    updatedAt: "2024-10-16"
  },
  {
    id: "4",
    title: "CRM Implementation",
    company: "MidSize Corp",
    contact: "Lisa Anderson",
    value: 45000,
    stage: "proposal",
    probability: 80,
    expectedCloseDate: "2024-10-25",
    lastActivity: "2024-10-13",
    tags: ["crm", "implementation"],
    priority: "medium",
    assignedTo: "David Chen",
    createdAt: "2024-09-05",
    updatedAt: "2024-10-13"
  },
  {
    id: "5",
    title: "Security Audit Service",
    company: "FinanceFirst",
    contact: "Michael Garcia",
    value: 28000,
    stage: "negotiation",
    probability: 90,
    expectedCloseDate: "2024-10-20",
    lastActivity: "2024-10-17",
    tags: ["security", "audit"],
    priority: "high",
    assignedTo: "Sarah Johnson",
    createdAt: "2024-08-15",
    updatedAt: "2024-10-17"
  },
  {
    id: "6",
    title: "Training Program",
    company: "EduTech Solutions",
    contact: "Amanda Wilson",
    value: 8500,
    stage: "won",
    probability: 100,
    expectedCloseDate: "2024-10-10",
    lastActivity: "2024-10-10",
    tags: ["training", "education"],
    priority: "low",
    assignedTo: "Mike Wilson",
    createdAt: "2024-09-20",
    updatedAt: "2024-10-10"
  }
];

export const pipelineStages: PipelineStage[] = [
  {
    id: "prospecting",
    name: "Prospecting",
    color: "hsl(220, 13%, 69%)",
    deals: mockDeals.filter(deal => deal.stage === "prospecting"),
    order: 1
  },
  {
    id: "qualification",
    name: "Qualification",
    color: "hsl(217, 91%, 60%)",
    deals: mockDeals.filter(deal => deal.stage === "qualification"),
    order: 2
  },
  {
    id: "demo",
    name: "Demo",
    color: "hsl(38, 92%, 50%)",
    deals: mockDeals.filter(deal => deal.stage === "demo"),
    order: 3
  },
  {
    id: "proposal",
    name: "Proposal",
    color: "hsl(268, 83%, 58%)",
    deals: mockDeals.filter(deal => deal.stage === "proposal"),
    order: 4
  },
  {
    id: "negotiation",
    name: "Negotiation",
    color: "hsl(25, 95%, 53%)",
    deals: mockDeals.filter(deal => deal.stage === "negotiation"),
    order: 5
  },
  {
    id: "won",
    name: "Won",
    color: "hsl(142, 71%, 45%)",
    deals: mockDeals.filter(deal => deal.stage === "won"),
    order: 6
  },
  {
    id: "lost",
    name: "Lost",
    color: "hsl(0, 84%, 60%)",
    deals: mockDeals.filter(deal => deal.stage === "lost"),
    order: 7
  }
];

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
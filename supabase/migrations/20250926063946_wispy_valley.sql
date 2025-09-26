/*
  # Seed Sample Data for SalesPro CRM

  This migration populates the database with realistic sample data including:
  1. Sample organizations and users
  2. Companies and contacts
  3. Pipeline stages and deals
  4. Activities and leads
  5. Tags for categorization

  Note: This is sample data for development/demo purposes
*/

-- Insert sample organization (this would normally be created during user signup)
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, role)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440001', 'sarah@salespro.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '{"provider": "email", "providers": ["email"]}', '{"full_name": "Sarah Johnson"}', false, 'authenticated'),
  ('550e8400-e29b-41d4-a716-446655440002', 'mike@salespro.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '{"provider": "email", "providers": ["email"]}', '{"full_name": "Mike Wilson"}', false, 'authenticated'),
  ('550e8400-e29b-41d4-a716-446655440003', 'david@salespro.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '{"provider": "email", "providers": ["email"]}', '{"full_name": "David Chen"}', false, 'authenticated')
ON CONFLICT (id) DO NOTHING;

-- Create sample organization
DO $$
DECLARE
    org_id uuid := '550e8400-e29b-41d4-a716-446655440000';
BEGIN
    -- Insert users with organization
    INSERT INTO users (id, email, full_name, organization_id, role, avatar_url) VALUES
    ('550e8400-e29b-41d4-a716-446655440001', 'sarah@salespro.com', 'Sarah Johnson', org_id, 'admin', 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'),
    ('550e8400-e29b-41d4-a716-446655440002', 'mike@salespro.com', 'Mike Wilson', org_id, 'user', 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'),
    ('550e8400-e29b-41d4-a716-446655440003', 'david@salespro.com', 'David Chen', org_id, 'user', 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150')
    ON CONFLICT (id) DO NOTHING;

    -- Insert pipeline stages
    INSERT INTO pipeline_stages (name, color, stage_order, organization_id) VALUES
    ('Lead', '#6B7280', 1, org_id),
    ('Qualified', '#3B82F6', 2, org_id),
    ('Proposal', '#F59E0B', 3, org_id),
    ('Negotiation', '#EF4444', 4, org_id),
    ('Closed Won', '#10B981', 5, org_id),
    ('Closed Lost', '#6B7280', 6, org_id);

    -- Insert sample companies
    INSERT INTO companies (name, website, industry, size, phone, address, city, state, country, postal_code, notes, organization_id, created_by) VALUES
    ('TechCorp Inc.', 'https://techcorp.com', 'Technology', '500-1000', '+1-555-0100', '123 Tech Street', 'San Francisco', 'CA', 'USA', '94105', 'Major technology company, potential for large deals', org_id, '550e8400-e29b-41d4-a716-446655440001'),
    ('StartupXYZ', 'https://startupxyz.com', 'Software', '10-50', '+1-555-0101', '456 Innovation Ave', 'Austin', 'TX', 'USA', '73301', 'Fast-growing startup, very interested in our solutions', org_id, '550e8400-e29b-41d4-a716-446655440001'),
    ('Global Solutions Ltd', 'https://globalsolutions.com', 'Consulting', '1000+', '+1-555-0102', '789 Business Blvd', 'New York', 'NY', 'USA', '10001', 'Enterprise client with multiple departments', org_id, '550e8400-e29b-41d4-a716-446655440002'),
    ('Manufacturing Co', 'https://manufacturingco.com', 'Manufacturing', '200-500', '+1-555-0103', '321 Factory Road', 'Detroit', 'MI', 'USA', '48201', 'Traditional manufacturing company looking to modernize', org_id, '550e8400-e29b-41d4-a716-446655440002'),
    ('HealthTech Solutions', 'https://healthtech.com', 'Healthcare', '100-200', '+1-555-0104', '654 Medical Center Dr', 'Boston', 'MA', 'USA', '02101', 'Healthcare technology company, compliance-focused', org_id, '550e8400-e29b-41d4-a716-446655440003');

    -- Insert sample contacts
    INSERT INTO contacts (first_name, last_name, email, phone, position, company_id, contact_type, linkedin_url, notes, organization_id, created_by) VALUES
    ('John', 'Smith', 'john@techcorp.com', '+1-555-0200', 'CTO', (SELECT id FROM companies WHERE name = 'TechCorp Inc.' LIMIT 1), 'decision_maker', 'https://linkedin.com/in/johnsmith', 'Very technical, focuses on implementation details', org_id, '550e8400-e29b-41d4-a716-446655440001'),
    ('Emily', 'Davis', 'emily@startupxyz.com', '+1-555-0201', 'Marketing Director', (SELECT id FROM companies WHERE name = 'StartupXYZ' LIMIT 1), 'influencer', 'https://linkedin.com/in/emilydavis', 'Budget holder for marketing tools', org_id, '550e8400-e29b-41d4-a716-446655440001'),
    ('Robert', 'Johnson', 'robert@globalsolutions.com', '+1-555-0202', 'VP of Operations', (SELECT id FROM companies WHERE name = 'Global Solutions Ltd' LIMIT 1), 'primary', 'https://linkedin.com/in/robertjohnson', 'Main point of contact, very responsive', org_id, '550e8400-e29b-41d4-a716-446655440002'),
    ('Lisa', 'Williams', 'lisa@manufacturingco.com', '+1-555-0203', 'IT Director', (SELECT id FROM companies WHERE name = 'Manufacturing Co' LIMIT 1), 'decision_maker', 'https://linkedin.com/in/lisawilliams', 'Leading digital transformation initiative', org_id, '550e8400-e29b-41d4-a716-446655440002'),
    ('Michael', 'Brown', 'michael@healthtech.com', '+1-555-0204', 'Chief Medical Officer', (SELECT id FROM companies WHERE name = 'HealthTech Solutions' LIMIT 1), 'decision_maker', 'https://linkedin.com/in/michaelbrown', 'Focuses on patient outcomes and compliance', org_id, '550e8400-e29b-41d4-a716-446655440003'),
    ('Jennifer', 'Wilson', 'jennifer@techcorp.com', '+1-555-0205', 'Product Manager', (SELECT id FROM companies WHERE name = 'TechCorp Inc.' LIMIT 1), 'secondary', 'https://linkedin.com/in/jenniferwilson', 'Works closely with John on product decisions', org_id, '550e8400-e29b-41d4-a716-446655440001');

    -- Insert sample tags
    INSERT INTO tags (name, color, organization_id) VALUES
    ('Enterprise', '#3B82F6', org_id),
    ('Hot Lead', '#EF4444', org_id),
    ('Technical', '#8B5CF6', org_id),
    ('Budget Approved', '#10B981', org_id),
    ('Compliance Required', '#F59E0B', org_id),
    ('Referral', '#EC4899', org_id),
    ('Renewal', '#06B6D4', org_id);

    -- Insert sample deals
    INSERT INTO deals (title, description, value, probability, expected_close_date, stage_id, company_id, primary_contact_id, assigned_to, priority, source, organization_id, created_by) VALUES
    ('TechCorp Enterprise License', 'Annual enterprise license for 500 users including premium support and training', 125000, 75, '2024-12-15', (SELECT id FROM pipeline_stages WHERE name = 'Proposal' AND organization_id = org_id LIMIT 1), (SELECT id FROM companies WHERE name = 'TechCorp Inc.' LIMIT 1), (SELECT id FROM contacts WHERE email = 'john@techcorp.com' LIMIT 1), '550e8400-e29b-41d4-a716-446655440001', 'high', 'Website', org_id, '550e8400-e29b-41d4-a716-446655440001'),
    ('StartupXYZ Growth Package', 'Growth package for expanding startup with integration services', 45000, 85, '2024-11-30', (SELECT id FROM pipeline_stages WHERE name = 'Negotiation' AND organization_id = org_id LIMIT 1), (SELECT id FROM companies WHERE name = 'StartupXYZ' LIMIT 1), (SELECT id FROM contacts WHERE email = 'emily@startupxyz.com' LIMIT 1), '550e8400-e29b-41d4-a716-446655440001', 'high', 'Referral', org_id, '550e8400-e29b-41d4-a716-446655440001'),
    ('Global Solutions Consulting', 'Multi-department implementation with custom consulting', 250000, 60, '2025-02-28', (SELECT id FROM pipeline_stages WHERE name = 'Qualified' AND organization_id = org_id LIMIT 1), (SELECT id FROM companies WHERE name = 'Global Solutions Ltd' LIMIT 1), (SELECT id FROM contacts WHERE email = 'robert@globalsolutions.com' LIMIT 1), '550e8400-e29b-41d4-a716-446655440002', 'high', 'Cold Outreach', org_id, '550e8400-e29b-41d4-a716-446655440002'),
    ('Manufacturing Digital Transform', 'Complete digital transformation package for manufacturing processes', 180000, 40, '2025-03-15', (SELECT id FROM pipeline_stages WHERE name = 'Lead' AND organization_id = org_id LIMIT 1), (SELECT id FROM companies WHERE name = 'Manufacturing Co' LIMIT 1), (SELECT id FROM contacts WHERE email = 'lisa@manufacturingco.com' LIMIT 1), '550e8400-e29b-41d4-a716-446655440002', 'medium', 'Trade Show', org_id, '550e8400-e29b-41d4-a716-446655440002'),
    ('HealthTech Compliance Suite', 'HIPAA-compliant solution with advanced security features', 95000, 70, '2024-12-31', (SELECT id FROM pipeline_stages WHERE name = 'Proposal' AND organization_id = org_id LIMIT 1), (SELECT id FROM companies WHERE name = 'HealthTech Solutions' LIMIT 1), (SELECT id FROM contacts WHERE email = 'michael@healthtech.com' LIMIT 1), '550e8400-e29b-41d4-a716-446655440003', 'medium', 'LinkedIn', org_id, '550e8400-e29b-41d4-a716-446655440003'),
    ('TechCorp Additional Licenses', 'Expansion to additional 200 users', 50000, 90, '2024-11-15', (SELECT id FROM pipeline_stages WHERE name = 'Closed Won' AND organization_id = org_id LIMIT 1), (SELECT id FROM companies WHERE name = 'TechCorp Inc.' LIMIT 1), (SELECT id FROM contacts WHERE email = 'jennifer@techcorp.com' LIMIT 1), '550e8400-e29b-41d4-a716-446655440001', 'low', 'Existing Customer', org_id, '550e8400-e29b-41d4-a716-446655440001');

    -- Insert deal tags relationships
    INSERT INTO deal_tags (deal_id, tag_id) VALUES
    ((SELECT id FROM deals WHERE title = 'TechCorp Enterprise License' LIMIT 1), (SELECT id FROM tags WHERE name = 'Enterprise' LIMIT 1)),
    ((SELECT id FROM deals WHERE title = 'TechCorp Enterprise License' LIMIT 1), (SELECT id FROM tags WHERE name = 'Technical' LIMIT 1)),
    ((SELECT id FROM deals WHERE title = 'StartupXYZ Growth Package' LIMIT 1), (SELECT id FROM tags WHERE name = 'Hot Lead' LIMIT 1)),
    ((SELECT id FROM deals WHERE title = 'StartupXYZ Growth Package' LIMIT 1), (SELECT id FROM tags WHERE name = 'Referral' LIMIT 1)),
    ((SELECT id FROM deals WHERE title = 'Global Solutions Consulting' LIMIT 1), (SELECT id FROM tags WHERE name = 'Enterprise' LIMIT 1)),
    ((SELECT id FROM deals WHERE title = 'HealthTech Compliance Suite' LIMIT 1), (SELECT id FROM tags WHERE name = 'Compliance Required' LIMIT 1)),
    ((SELECT id FROM deals WHERE title = 'TechCorp Additional Licenses' LIMIT 1), (SELECT id FROM tags WHERE name = 'Renewal' LIMIT 1)),
    ((SELECT id FROM deals WHERE title = 'TechCorp Additional Licenses' LIMIT 1), (SELECT id FROM tags WHERE name = 'Budget Approved' LIMIT 1));

    -- Insert contact tags relationships
    INSERT INTO contact_tags (contact_id, tag_id) VALUES
    ((SELECT id FROM contacts WHERE email = 'john@techcorp.com' LIMIT 1), (SELECT id FROM tags WHERE name = 'Technical' LIMIT 1)),
    ((SELECT id FROM contacts WHERE email = 'emily@startupxyz.com' LIMIT 1), (SELECT id FROM tags WHERE name = 'Hot Lead' LIMIT 1)),
    ((SELECT id FROM contacts WHERE email = 'robert@globalsolutions.com' LIMIT 1), (SELECT id FROM tags WHERE name = 'Enterprise' LIMIT 1)),
    ((SELECT id FROM contacts WHERE email = 'lisa@manufacturingco.com' LIMIT 1), (SELECT id FROM tags WHERE name = 'Technical' LIMIT 1)),
    ((SELECT id FROM contacts WHERE email = 'michael@healthtech.com' LIMIT 1), (SELECT id FROM tags WHERE name = 'Compliance Required' LIMIT 1));

    -- Insert sample activities
    INSERT INTO activities (type, title, description, due_date, deal_id, contact_id, assigned_to, organization_id, created_by) VALUES
    ('call', 'Follow-up call with TechCorp', 'Discuss technical requirements and implementation timeline', '2024-10-25 14:00:00', (SELECT id FROM deals WHERE title = 'TechCorp Enterprise License' LIMIT 1), (SELECT id FROM contacts WHERE email = 'john@techcorp.com' LIMIT 1), '550e8400-e29b-41d4-a716-446655440001', org_id, '550e8400-e29b-41d4-a716-446655440001'),
    ('meeting', 'Product demo for StartupXYZ', 'Present growth package features and pricing', '2024-10-26 10:00:00', (SELECT id FROM deals WHERE title = 'StartupXYZ Growth Package' LIMIT 1), (SELECT id FROM contacts WHERE email = 'emily@startupxyz.com' LIMIT 1), '550e8400-e29b-41d4-a716-446655440001', org_id, '550e8400-e29b-41d4-a716-446655440001'),
    ('email', 'Send proposal to Global Solutions', 'Send detailed proposal with pricing and timeline', '2024-10-24 09:00:00', (SELECT id FROM deals WHERE title = 'Global Solutions Consulting' LIMIT 1), (SELECT id FROM contacts WHERE email = 'robert@globalsolutions.com' LIMIT 1), '550e8400-e29b-41d4-a716-446655440002', org_id, '550e8400-e29b-41d4-a716-446655440002'),
    ('task', 'Prepare compliance documentation', 'Gather HIPAA compliance materials for HealthTech', '2024-10-27 16:00:00', (SELECT id FROM deals WHERE title = 'HealthTech Compliance Suite' LIMIT 1), (SELECT id FROM contacts WHERE email = 'michael@healthtech.com' LIMIT 1), '550e8400-e29b-41d4-a716-446655440003', org_id, '550e8400-e29b-41d4-a716-446655440003'),
    ('note', 'Meeting notes from Manufacturing Co', 'Discussed current pain points and budget constraints. Need to follow up with ROI analysis.', NULL, (SELECT id FROM deals WHERE title = 'Manufacturing Digital Transform' LIMIT 1), (SELECT id FROM contacts WHERE email = 'lisa@manufacturingco.com' LIMIT 1), '550e8400-e29b-41d4-a716-446655440002', org_id, '550e8400-e29b-41d4-a716-446655440002'),
    ('call', 'Contract negotiation call', 'Finalize terms and conditions for enterprise license', '2024-10-28 15:00:00', (SELECT id FROM deals WHERE title = 'StartupXYZ Growth Package' LIMIT 1), (SELECT id FROM contacts WHERE email = 'emily@startupxyz.com' LIMIT 1), '550e8400-e29b-41d4-a716-446655440001', org_id, '550e8400-e29b-41d4-a716-446655440001');

    -- Mark some activities as completed
    UPDATE activities SET 
        is_completed = true, 
        completed_at = now() - interval '2 days'
    WHERE title IN ('Meeting notes from Manufacturing Co', 'Send proposal to Global Solutions');

    -- Insert sample leads
    INSERT INTO leads (first_name, last_name, email, phone, company_name, position, source, status, score, notes, assigned_to, organization_id, created_by) VALUES
    ('Alex', 'Thompson', 'alex@newcompany.com', '+1-555-0300', 'NewCompany Ltd', 'CEO', 'Website', 'new', 85, 'Interested in enterprise solution, requested demo', '550e8400-e29b-41d4-a716-446655440001', org_id, '550e8400-e29b-41d4-a716-446655440001'),
    ('Maria', 'Rodriguez', 'maria@innovate.com', '+1-555-0301', 'Innovate Solutions', 'CTO', 'LinkedIn', 'qualified', 92, 'Budget confirmed, looking to implement Q1 2025', '550e8400-e29b-41d4-a716-446655440002', org_id, '550e8400-e29b-41d4-a716-446655440002'),
    ('James', 'Anderson', 'james@futuretech.com', '+1-555-0302', 'FutureTech Inc', 'VP Engineering', 'Referral', 'contacted', 78, 'Referred by existing customer, interested in technical details', '550e8400-e29b-41d4-a716-446655440003', org_id, '550e8400-e29b-41d4-a716-446655440003'),
    ('Sarah', 'Miller', 'sarah@growthco.com', '+1-555-0303', 'GrowthCo', 'Marketing Manager', 'Trade Show', 'new', 65, 'Met at recent trade show, expressed interest in marketing automation', '550e8400-e29b-41d4-a716-446655440001', org_id, '550e8400-e29b-41d4-a716-446655440001'),
    ('David', 'Lee', 'david@scalestartup.com', '+1-555-0304', 'ScaleStartup', 'Founder', 'Cold Outreach', 'qualified', 88, 'Fast-growing startup, needs scalable solution', '550e8400-e29b-41d4-a716-446655440002', org_id, '550e8400-e29b-41d4-a716-446655440002');

END $$;
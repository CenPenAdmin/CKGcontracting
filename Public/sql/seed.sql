-- Sample data for Custer & Kinney General Contracting LLC
USE custer_kinney_db;

-- Insert sample projects
INSERT INTO projects (title, description, image, category, location, completion_date, featured) VALUES
('Modern Kitchen Renovation', 'Complete kitchen remodel featuring custom cabinetry, granite countertops, and stainless steel appliances in a beautiful Charleston home.', 'images/projects/kitchen-renovation-1.jpg', 'renovation', 'Charleston, WV', '2024-08-15', TRUE),

('Custom Deck Addition', 'Spacious composite deck with built-in seating and pergola, perfect for West Virginia outdoor entertaining.', 'images/projects/deck-addition-1.jpg', 'deck', 'Morgantown, WV', '2024-07-22', TRUE),

('Bathroom Remodel', 'Luxury bathroom renovation with walk-in shower, double vanity, and heated floors.', 'images/projects/bathroom-remodel-1.jpg', 'renovation', 'Bridgeport, WV', '2024-06-30', TRUE),

('New Home Construction', 'Custom 3-bedroom home built from the ground up with energy-efficient features and mountain views.', 'images/projects/new-home-1.jpg', 'new-construction', 'Lewisburg, WV', '2024-05-10', FALSE),

('Roof Replacement', 'Complete roof replacement using architectural shingles with enhanced weather protection.', 'images/projects/roof-replacement-1.jpg', 'roofing', 'Martinsburg, WV', '2024-09-05', FALSE),

('Siding Installation', 'Full house siding replacement with insulated vinyl siding in classic colonial style.', 'images/projects/siding-installation-1.jpg', 'siding', 'Hurricane, WV', '2024-04-18', FALSE),

('Commercial Office Renovation', 'Office space renovation including flooring, lighting, and layout optimization for local business.', 'images/projects/office-renovation-1.jpg', 'commercial', 'Charleston, WV', '2024-03-25', FALSE),

('Home Addition', '500 sq ft family room addition with vaulted ceilings and large windows.', 'images/projects/home-addition-1.jpg', 'new-construction', 'Fairmont, WV', '2024-02-14', FALSE),

('Exterior Painting', 'Complete exterior house painting with premium weather-resistant paint and trim work.', 'images/projects/exterior-painting-1.jpg', 'painting', 'Shepherdstown, WV', '2024-01-20', FALSE),

('Basement Finishing', 'Basement conversion into family entertainment space with wet bar and half bathroom.', 'images/projects/basement-finishing-1.jpg', 'renovation', 'Cross Lanes, WV', '2023-12-08', FALSE);

-- Insert sample services
INSERT INTO services (name, description, icon, category, price_range, duration_estimate, sort_order) VALUES
('Kitchen Remodeling', 'Complete kitchen renovations including cabinets, countertops, appliances, and flooring.', 'fas fa-utensils', 'renovation', '$15,000 - $50,000', '3-6 weeks', 1),

('Bathroom Renovation', 'Full bathroom remodels from simple updates to luxury spa-like retreats.', 'fas fa-bath', 'renovation', '$8,000 - $25,000', '2-4 weeks', 2),

('New Home Construction', 'Custom home building from foundation to finish with energy-efficient materials.', 'fas fa-home', 'construction', '$200,000 - $500,000', '6-12 months', 3),

('Roofing Services', 'Roof installation, repair, and replacement using quality materials and expert craftsmanship.', 'fas fa-hammer', 'roofing', '$8,000 - $20,000', '1-2 weeks', 4),

('Siding Installation', 'Vinyl, wood, and fiber cement siding installation and repair services.', 'fas fa-layer-group', 'siding', '$10,000 - $25,000', '1-3 weeks', 5),

('Deck & Patio Construction', 'Custom decks, patios, and outdoor living spaces using composite and natural materials.', 'fas fa-couch', 'outdoor', '$5,000 - $15,000', '1-2 weeks', 6),

('Interior/Exterior Painting', 'Professional painting services for both interior and exterior surfaces.', 'fas fa-paint-roller', 'painting', '$3,000 - $12,000', '3-7 days', 7),

('General Repairs', 'All types of home repairs and maintenance services for residential and commercial properties.', 'fas fa-tools', 'repair', '$200 - $5,000', '1-3 days', 8);

-- Insert sample testimonials
INSERT INTO testimonials (client_name, client_location, project_type, rating, testimonial, featured, approved) VALUES
('Sarah Johnson', 'Charleston, WV', 'Kitchen Renovation', 5, 'Custer & Kinney transformed our outdated kitchen into a beautiful, functional space. Their attention to detail and professionalism exceeded our expectations. Highly recommended!', TRUE, TRUE),

('Mike Rodriguez', 'Morgantown, WV', 'Deck Addition', 5, 'The team built us an amazing deck that has become the centerpiece of our backyard. Quality workmanship and completed on time and within budget.', TRUE, TRUE),

('Jennifer Williams', 'Bridgeport, WV', 'Bathroom Remodel', 5, 'Our bathroom renovation was handled with such care and expertise. The result is a spa-like retreat that we love. Thank you, Custer & Kinney!', FALSE, TRUE),

('David Thompson', 'Lewisburg, WV', 'New Home Construction', 5, 'Building our dream home with Custer & Kinney was an incredible experience. They guided us through every step and delivered exactly what we envisioned.', TRUE, TRUE),

('Lisa Brown', 'Martinsburg, WV', 'Roof Replacement', 5, 'After storm damage, Custer & Kinney quickly responded and replaced our roof with high-quality materials. Professional service from start to finish.', FALSE, TRUE);

-- Insert sample settings
INSERT INTO settings (setting_key, setting_value, setting_type, description) VALUES
('company_phone', '(304) 555-0123', 'text', 'Main company phone number'),
('company_email', 'info@custerkinney.com', 'text', 'Main company email address'),
('emergency_phone', '(304) 555-0124', 'text', 'Emergency services phone number'),
('business_hours', 'Monday - Friday: 7:00 AM - 6:00 PM\nSaturday: 8:00 AM - 4:00 PM\nSunday: Closed', 'text', 'Business operating hours'),
('service_areas', 'Charleston, Morgantown, Martinsburg, Bridgeport, Lewisburg, Hurricane, Fairmont, Shepherdstown', 'text', 'Primary service areas'),
('facebook_url', 'https://facebook.com/custerkinney', 'text', 'Facebook page URL'),
('instagram_url', 'https://instagram.com/custerkinney', 'text', 'Instagram page URL'),
('linkedin_url', 'https://linkedin.com/company/custerkinney', 'text', 'LinkedIn page URL'),
('license_number', 'WV-12345', 'text', 'West Virginia contractor license number'),
('years_experience', '20', 'number', 'Years in business'),
('founded_year', '2003', 'number', 'Year company was founded'),
('enable_simulator', 'true', 'boolean', 'Enable/disable the renovation simulator feature'),
('max_upload_size', '10', 'number', 'Maximum file upload size in MB'),
('gallery_images_per_page', '12', 'number', 'Number of gallery images to show per page');

-- Insert sample admin user (password is 'admin123' - should be changed in production)
INSERT INTO admin_users (username, email, password_hash, role) VALUES
('admin', 'admin@custerkinney.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Create indexes for better performance
CREATE INDEX idx_projects_featured_category ON projects (featured, category);
CREATE INDEX idx_contacts_status_created ON contacts (status, created_at);
CREATE INDEX idx_testimonials_featured_approved ON testimonials (featured, approved);

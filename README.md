# Custer & Kinney General Contracting LLC - Website

A professional website for Custer & Kinney General Contracting LLC, featuring a home renovation simulator, project gallery, and contact management system.

## Features

### 🏠 **Home Renovation Simulator**
- Upload photos of your home
- Apply different paint/siding colors with adjustable intensity
- Add deck overlays to visualize additions
- Save and share your designs
- Mobile-friendly interface

### 📸 **Project Gallery**
- Dynamic project loading from database
- Category filtering (Residential, Commercial, Renovation, etc.)
- Modal lightbox for detailed project views
- Responsive grid layout

### 📞 **Contact Management**
- Professional contact form with validation
- Database storage of inquiries
- Service-specific request handling
- Success/error messaging

### 🎨 **Professional Design**
- West Virginia-themed color scheme
- Mobile-first responsive design
- Accessibility features
- Professional contractor branding

## Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: PHP 7.4+
- **Database**: MySQL 5.7+
- **Hosting**: Spaceship hosting compatible
- **Icons**: Font Awesome 6.0
- **Responsive**: Mobile-first design

## Project Structure

```
Public/
├── index.html              # Homepage
├── about.html              # About us page
├── projects.html           # Project gallery
├── simulator.html          # Home renovation simulator
├── contact.html            # Contact form
├── css/
│   └── style.css          # Main stylesheet
├── js/
│   ├── main.js            # Main JavaScript functionality
│   └── simulator.js       # Simulator-specific functions
├── php/
│   ├── db.php             # Database connection
│   ├── contact.php        # Contact form handler
│   ├── fetch_projects.php # Project data API
│   └── upload.php         # Simulator upload handler
├── images/
│   ├── projects/          # Project gallery images
│   └── deck-overlay.png   # Deck overlay for simulator
├── uploads/
│   └── simulations/       # User-generated simulations
└── sql/
    ├── schema.sql         # Database schema
    └── seed.sql           # Sample data
```

## Installation & Deployment

### 1. **Upload Files**
Upload all files in the `Public/` directory to your web server's document root (usually `public_html/` or `www/`).

### 2. **Database Setup**
1. Create a MySQL database (e.g., `custer_kinney_db`)
2. Import the database schema:
   ```sql
   mysql -u username -p database_name < sql/schema.sql
   ```
3. Import sample data:
   ```sql
   mysql -u username -p database_name < sql/seed.sql
   ```

### 3. **Configure Database Connection**
Edit `php/db.php` with your database credentials:
```php
$servername = "localhost";           // Your database server
$username = "your_db_username";     // Your database username
$password = "your_db_password";     // Your database password
$dbname = "custer_kinney_db";       // Your database name
```

### 4. **Set Permissions**
Ensure the following directories are writable:
```bash
chmod 755 uploads/
chmod 755 uploads/simulations/
chmod 755 images/
chmod 755 images/projects/
```

### 5. **Add Images**
Place your project images in the `images/projects/` directory and update the database with correct image paths.

## Configuration

### **Company Information**
Update company details in:
- Footer sections in all HTML files
- Database settings table
- Contact information throughout the site

### **Service Areas**
Modify service areas in:
- `contact.html` (Areas We Serve section)
- Database settings

### **Social Media Links**
Update social media URLs in:
- Footer sections
- Database settings table

## Database Tables

### **contacts**
Stores contact form submissions
- `id`, `name`, `email`, `phone`, `message`, `service`, `created_at`, `status`

### **projects**
Project portfolio data
- `id`, `title`, `description`, `image`, `category`, `location`, `completion_date`, `featured`

### **simulations**
User-generated home simulations
- `id`, `simulation_image`, `color_filter`, `color_intensity`, `has_deck`, `user_email`, `session_id`

### **testimonials**
Customer reviews and testimonials
- `id`, `client_name`, `client_location`, `project_type`, `rating`, `testimonial`, `featured`, `approved`

### **services**
Available services catalog
- `id`, `name`, `description`, `icon`, `category`, `price_range`, `duration_estimate`

## Customization

### **Colors and Branding**
Main brand colors are defined in CSS variables in `css/style.css`:
```css
:root {
    --primary-color: #2C5530;    /* Forest Green */
    --secondary-color: #4A90E2;  /* Professional Blue */
    --accent-color: #FFB900;     /* Construction Yellow */
}
```

### **Adding New Projects**
1. Upload images to `images/projects/`
2. Insert project data into the `projects` table
3. Projects will automatically appear in the gallery

### **Simulator Enhancements**
- Add new color options in `simulator.js`
- Create additional overlay images
- Modify the color filter mapping

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 16+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized images (WebP support)
- Lazy loading for gallery images
- Efficient database queries with indexes
- Responsive image sizing
- Minimal JavaScript dependencies

## Security Features

- SQL injection prevention (prepared statements)
- File upload validation
- XSS protection
- CSRF token support (can be added)
- Input sanitization

## SEO Features

- Semantic HTML structure
- Meta descriptions and titles
- Schema.org markup ready
- Image alt attributes
- Clean URL structure

## Accessibility

- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Focus indicators

## Support

For technical support or customization requests:
- Email: info@custerkinney.com
- Phone: (304) 555-0123

## License

© 2025 Custer & Kinney General Contracting LLC. All rights reserved.

---

## Development Notes

### **Testing the Simulator**
1. Upload a test image
2. Try different color filters
3. Toggle deck overlay
4. Save simulation
5. Check uploads directory for saved files

### **Testing Contact Form**
1. Fill out the contact form
2. Check database for new entries
3. Verify email validation
4. Test success/error messages

### **Testing Project Gallery**
1. Add sample projects to database
2. Test category filtering
3. Verify modal functionality
4. Check responsive behavior

### **Database Maintenance**
- Regular backups recommended
- Monitor upload directory size
- Clean old simulations periodically
- Index optimization for large datasets

This website provides a solid foundation for Custer & Kinney General Contracting LLC's online presence with room for future enhancements and customizations.

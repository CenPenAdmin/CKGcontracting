-- Database schema for Custer & Kinney General Contracting LLC
-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS custer_kinney_db;
USE custer_kinney_db;

-- Contacts table for storing form submissions
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(30),
    message TEXT NOT NULL,
    service VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('new', 'contacted', 'quoted', 'completed') DEFAULT 'new',
    INDEX idx_created_at (created_at),
    INDEX idx_status (status),
    INDEX idx_email (email)
);

-- Projects table for portfolio/gallery
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    image VARCHAR(255) NOT NULL,
    category ENUM('residential', 'commercial', 'renovation', 'new-construction', 'roofing', 'siding', 'painting', 'deck', 'general') DEFAULT 'residential',
    location VARCHAR(100),
    completion_date DATE,
    project_cost DECIMAL(10,2),
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_featured (featured),
    INDEX idx_completion_date (completion_date)
);

-- Simulations table for storing user simulations
CREATE TABLE IF NOT EXISTS simulations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    original_image VARCHAR(255),
    simulation_image VARCHAR(255),
    color_filter VARCHAR(50),
    color_intensity INT DEFAULT 30,
    has_deck BOOLEAN DEFAULT FALSE,
    user_email VARCHAR(100),
    session_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_session_id (session_id),
    INDEX idx_created_at (created_at)
);

-- Testimonials table for customer reviews
CREATE TABLE IF NOT EXISTS testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_name VARCHAR(100) NOT NULL,
    client_location VARCHAR(100),
    project_type VARCHAR(100),
    rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    testimonial TEXT NOT NULL,
    image VARCHAR(255),
    featured BOOLEAN DEFAULT FALSE,
    approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_featured (featured),
    INDEX idx_approved (approved),
    INDEX idx_rating (rating)
);

-- Services table for managing service offerings
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    category VARCHAR(50),
    price_range VARCHAR(50),
    duration_estimate VARCHAR(50),
    active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_active (active),
    INDEX idx_category (category),
    INDEX idx_sort_order (sort_order)
);

-- Admin users table for content management
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'editor') DEFAULT 'editor',
    active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_active (active)
);

-- Settings table for site configuration
CREATE TABLE IF NOT EXISTS settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type ENUM('text', 'number', 'boolean', 'json') DEFAULT 'text',
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_setting_key (setting_key)
);

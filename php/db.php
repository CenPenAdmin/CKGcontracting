<?php
// Database connection for Custer & Kinney General Contracting LLC
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "custer_kinney_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set charset to utf8
$conn->set_charset("utf8");
?>

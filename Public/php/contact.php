<?php
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $message = trim($_POST['message'] ?? '');
    $service = trim($_POST['service'] ?? '');
    
    // Basic validation
    if (empty($name) || empty($email) || empty($message)) {
        header("Location: ../contact.html?error=missing_fields");
        exit();
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header("Location: ../contact.html?error=invalid_email");
        exit();
    }
    
    try {
        $stmt = $conn->prepare("INSERT INTO contacts (name, email, phone, message, service, created_at) VALUES (?, ?, ?, ?, ?, NOW())");
        $stmt->bind_param("sssss", $name, $email, $phone, $message, $service);
        
        if ($stmt->execute()) {
            header("Location: ../contact.html?success=1");
        } else {
            header("Location: ../contact.html?error=database");
        }
        
        $stmt->close();
    } catch (Exception $e) {
        header("Location: ../contact.html?error=database");
    }
} else {
    header("Location: ../contact.html");
}

$conn->close();
?>

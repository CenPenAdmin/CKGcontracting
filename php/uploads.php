<?php
require_once 'db.php';

header('Content-Type: application/json');

// Check if file was uploaded
if (!isset($_FILES['simulation']) || $_FILES['simulation']['error'] !== UPLOAD_ERR_OK) {
    echo json_encode(['success' => false, 'error' => 'No file uploaded or upload error']);
    exit();
}

// Validate file type
$allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
$fileType = $_FILES['simulation']['type'];

if (!in_array($fileType, $allowedTypes)) {
    echo json_encode(['success' => false, 'error' => 'Invalid file type. Please upload an image.']);
    exit();
}

// Validate file size (max 10MB)
$maxSize = 10 * 1024 * 1024; // 10MB
if ($_FILES['simulation']['size'] > $maxSize) {
    echo json_encode(['success' => false, 'error' => 'File too large. Maximum size is 10MB.']);
    exit();
}

// Create upload directory if it doesn't exist
$uploadDir = '../uploads/simulations/';
if (!file_exists($uploadDir)) {
    if (!mkdir($uploadDir, 0755, true)) {
        echo json_encode(['success' => false, 'error' => 'Failed to create upload directory']);
        exit();
    }
}

// Generate unique filename
$extension = pathinfo($_FILES['simulation']['name'], PATHINFO_EXTENSION);
$filename = 'simulation_' . uniqid() . '_' . time() . '.' . $extension;
$filepath = $uploadDir . $filename;

// Move uploaded file
if (!move_uploaded_file($_FILES['simulation']['tmp_name'], $filepath)) {
    echo json_encode(['success' => false, 'error' => 'Failed to save uploaded file']);
    exit();
}

// Get simulation parameters
$colorFilter = $_POST['color'] ?? 'none';
$colorIntensity = intval($_POST['intensity'] ?? 30);
$hasDeck = ($_POST['deck'] ?? 'false') === 'true';
$userEmail = $_POST['email'] ?? null;
$sessionId = session_id() ?: uniqid();

// Save simulation data to database
try {
    $stmt = $conn->prepare("INSERT INTO simulations (simulation_image, color_filter, color_intensity, has_deck, user_email, session_id, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())");
    $relativeFilepath = 'uploads/simulations/' . $filename;
    $stmt->bind_param("ssiiss", $relativeFilepath, $colorFilter, $colorIntensity, $hasDeck, $userEmail, $sessionId);
    
    if ($stmt->execute()) {
        $simulationId = $conn->insert_id;
        
        echo json_encode([
            'success' => true,
            'simulation_id' => $simulationId,
            'filename' => $filename,
            'message' => 'Simulation saved successfully!'
        ]);
    } else {
        // Delete uploaded file if database save fails
        unlink($filepath);
        echo json_encode(['success' => false, 'error' => 'Failed to save simulation data']);
    }
    
    $stmt->close();
} catch (Exception $e) {
    // Delete uploaded file if database save fails
    if (file_exists($filepath)) {
        unlink($filepath);
    }
    
    echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
}

$conn->close();
?>

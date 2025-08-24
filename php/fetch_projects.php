<?php
require_once 'db.php';

header('Content-Type: application/json');

try {
    $sql = "SELECT id, title, image, description, category FROM projects ORDER BY id DESC";
    $result = $conn->query($sql);
    
    $projects = [];
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $projects[] = $row;
        }
    }
    
    echo json_encode($projects);
} catch (Exception $e) {
    echo json_encode(['error' => 'Failed to fetch projects']);
}

$conn->close();
?>

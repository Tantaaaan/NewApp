<?php
// Allow requests from your app's domain
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Read JSON input
    $input = json_decode(file_get_contents('php://input'), true);

    if (isset($input['password'])) {
        $password = $input['password'];

        // Hash the password securely using bcrypt
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        // Return the hashed password
        echo json_encode(['hashedPassword' => $hashedPassword]);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Password not provided']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Invalid request method']);
}

<?php
// Allow requests from your app's domain
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Read JSON input
    $input = json_decode(file_get_contents('php://input'), true);

    if (isset($input['password']) && isset($input['hashedPassword'])) {
        $password = $input['password'];
        $hashedPassword = $input['hashedPassword'];

        // Verify the password
        if (password_verify($password, $hashedPassword)) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid password']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Password or hashed password not provided']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Invalid request method']);
}

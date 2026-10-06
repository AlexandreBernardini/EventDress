<?php
require __DIR__ . '/../lib/bootstrap.php';
require_method('POST');

$in = json_in();
$email = strtolower(trim((string)($in['email'] ?? '')));
$name = trim((string)($in['name'] ?? ''));
$password = (string)($in['password'] ?? '');

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_out(422, ['error' => 'Adresse email invalide']);
}
if (strlen($password) < 8) {
    json_out(422, ['error' => 'Le mot de passe doit faire au moins 8 caractères']);
}

try {
    $stmt = db()->prepare('INSERT INTO users (email, name, password_hash) VALUES (?, ?, ?)');
    $stmt->execute([$email, $name, password_hash($password, PASSWORD_DEFAULT)]);
} catch (PDOException $e) {
    json_out(409, ['error' => 'Un compte existe déjà avec cet email']);
}

login_user((int)db()->lastInsertId());
json_out(201, ['user' => current_user()]);

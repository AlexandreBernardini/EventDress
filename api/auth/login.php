<?php
require __DIR__ . '/../lib/bootstrap.php';
require_method('POST');

$in = json_in();
$email = strtolower(trim((string)($in['email'] ?? '')));
$password = (string)($in['password'] ?? '');

$stmt = db()->prepare('SELECT id, password_hash FROM users WHERE email = ?');
$stmt->execute([$email]);
$row = $stmt->fetch();

if (!$row || $row['password_hash'] === null || !password_verify($password, $row['password_hash'])) {
    json_out(401, ['error' => 'Email ou mot de passe incorrect']);
}

login_user((int)$row['id']);
json_out(200, ['user' => current_user()]);

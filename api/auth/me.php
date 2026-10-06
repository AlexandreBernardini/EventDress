<?php
require __DIR__ . '/../lib/bootstrap.php';
require_method('GET');

$user = current_user();
if (!$user) {
    json_out(401, ['error' => 'Non connecté']);
}
json_out(200, ['user' => $user]);

<?php
require __DIR__ . '/../lib/bootstrap.php';
require_method('GET');

global $config;
$state = bin2hex(random_bytes(16));
$_SESSION['google_state'] = $state;

$params = http_build_query([
    'client_id' => $config['google']['client_id'],
    'redirect_uri' => $config['google']['redirect_uri'],
    'response_type' => 'code',
    'scope' => 'openid email profile',
    'state' => $state,
    'prompt' => 'select_account',
]);

header('Location: https://accounts.google.com/o/oauth2/v2/auth?' . $params);
exit;

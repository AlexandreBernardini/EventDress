<?php
require __DIR__ . '/../lib/bootstrap.php';
require_method('GET');

global $config;
const SITE_URL = 'https://eventdress.fr';

function fail(string $reason): never
{
    header('Location: ' . SITE_URL . '/compte?erreur=' . urlencode($reason));
    exit;
}

$expectedState = $_SESSION['google_state'] ?? null;
unset($_SESSION['google_state']);

if (!isset($_GET['state'], $_GET['code']) || !$expectedState || !hash_equals($expectedState, (string)$_GET['state'])) {
    fail('connexion_annulee');
}

$tokenResponse = http_post_form('https://oauth2.googleapis.com/token', [
    'code' => (string)$_GET['code'],
    'client_id' => $config['google']['client_id'],
    'client_secret' => $config['google']['client_secret'],
    'redirect_uri' => $config['google']['redirect_uri'],
    'grant_type' => 'authorization_code',
]);
if (empty($tokenResponse['access_token'])) {
    fail('google_indisponible');
}

$ch = curl_init('https://openidconnect.googleapis.com/v1/userinfo');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => ['Authorization: Bearer ' . $tokenResponse['access_token']],
    CURLOPT_TIMEOUT => 10,
]);
$info = json_decode((string)curl_exec($ch), true);
curl_close($ch);

if (empty($info['sub']) || empty($info['email']) || empty($info['email_verified'])) {
    fail('email_non_verifie');
}

$email = strtolower($info['email']);
$stmt = db()->prepare('SELECT id, google_sub FROM users WHERE google_sub = ? OR email = ? LIMIT 1');
$stmt->execute([$info['sub'], $email]);
$existing = $stmt->fetch();

if ($existing) {
    if ($existing['google_sub'] === null) {
        db()->prepare('UPDATE users SET google_sub = ? WHERE id = ?')->execute([$info['sub'], $existing['id']]);
    }
    $userId = (int)$existing['id'];
} else {
    db()->prepare('INSERT INTO users (email, name, google_sub) VALUES (?, ?, ?)')
        ->execute([$email, (string)($info['name'] ?? ''), $info['sub']]);
    $userId = (int)db()->lastInsertId();
}

login_user($userId);
header('Location: ' . SITE_URL . '/compte');
exit;

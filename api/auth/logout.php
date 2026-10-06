<?php
require __DIR__ . '/../lib/bootstrap.php';
require_method('POST');

$_SESSION = [];
session_destroy();
json_out(200, ['ok' => true]);

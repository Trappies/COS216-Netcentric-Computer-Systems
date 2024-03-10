<?php
session_start();
unset($_SESSION['user_id']);
setcookie('api_key', '', time() - 3600, '/');
header('Location: login.php');
exit();
?>
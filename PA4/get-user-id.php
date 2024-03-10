<?php
session_start();
if (!isset($_SESSION['user_id'])) {
  http_response_code(401);
  exit("Not authorized");
}
$user_id = $_SESSION['user_id'];
echo $user_id;
?>
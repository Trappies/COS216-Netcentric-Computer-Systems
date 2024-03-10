<?php
include('config.php');

session_start();

if (!isset($_SESSION['user_id'])) {
  http_response_code(401);
  exit("Not authorized");
}

$user_id = $_SESSION['user_id'];

$request_body = file_get_contents('php://input');
$data = json_decode($request_body, true);
if (json_last_error() !== JSON_ERROR_NONE || !isset($data['theme'])) {
  http_response_code(400);
  exit("Invalid request body");
}
$new_theme = $data['theme'];

$query = "UPDATE users SET theme = '$new_theme' WHERE id = $user_id";
$result = mysqli_query($connection, $query);
if (!$result) {
  http_response_code(500);
  exit("Failed to update theme in database");
}

mysqli_close($connection);

if (!empty($new_theme)) {
  echo "<script>localStorage.setItem('footer-color-$user_id', '$new_theme');</script>";
}

http_response_code(200);
echo "Theme updated successfully";
?>
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
if (json_last_error() !== JSON_ERROR_NONE || !isset($data['rating']) || !isset($data['id_trim'])) {
  http_response_code(400);
  exit("Invalid request body");
}
$new_rating = $data['rating'];
$new_IdTrim = $data['id_trim'];

$query = "SELECT * FROM ratings WHERE user_id = $user_id AND id_trim = '$new_IdTrim'";
$result = mysqli_query($connection, $query);
if (!$result) {
  http_response_code(500);
  exit("Failed to check if user has rated this product card");
}

if (mysqli_num_rows($result) == 0) {
  $insert_query = "INSERT INTO ratings (rating, id_trim, user_id) VALUES ('$new_rating', '$new_IdTrim', $user_id)";
  $insert_result = mysqli_query($connection, $insert_query);
  if (!$insert_result) {
    http_response_code(500);
    exit("Failed to insert rating into database");
  }
} else {
  $update_query = "UPDATE ratings SET rating = '$new_rating' WHERE user_id = $user_id AND id_trim = '$new_IdTrim'";
  $update_result = mysqli_query($connection, $update_query);
  if (!$update_result) {
    http_response_code(500);
    exit("Failed to update rating in database");
  }
}

mysqli_close($connection);

http_response_code(200);
echo "Rating updated successfully";
?>
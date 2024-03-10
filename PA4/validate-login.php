<?php
session_start();
include('config.php');

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (isset($data['email']) && isset($data['password'])) {
  $email = $data['email'];
  $password = $data['password'];

  $query = "SELECT * FROM users WHERE email = '$email'";
  $result = mysqli_query($connection, $query);

  if ($result && mysqli_num_rows($result) == 1) {
    $user = mysqli_fetch_assoc($result);
    $salt = $user['salt'];
    $hashed_password_in_db = $user['password'];
    if (password_verify($password, $hashed_password_in_db)) {
      $_SESSION['user_id'] = $user['id'];
      $_SESSION['email'] = $user['email'];
      setcookie('api_key', $user['API_key'], time() + (86400 * 30), '/');
      $response = array(
        'success' => true,
        'message' => 'Login successful',
        'data' => array(
          'api_key' => $user['API_key']
        )
      );
      echo json_encode($response);
    } else {
      $response = array(
        'success' => false,
        'message' => 'Incorrect password',
        'data' => null
      );
      echo json_encode($response);
    }
  } else {
    $response = array(
      'success' => false,
      'message' => 'User not found',
      'data' => null
    );
    echo json_encode($response);
  }
} else {
  $response = array(
    'success' => false,
    'message' => 'Invalid request parameters',
    'data' => null
  );
  echo json_encode($response);
}

mysqli_close($connection);
?>


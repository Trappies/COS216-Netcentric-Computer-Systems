<?php
$db_host = 'wheatley.cs.up.ac.za';
$db_username = 'u22502883';
$db_password = 'W3KHQWNRIUOQ67INPJ6NGIJIZGFV7UXG';
$db_name = 'u22502883';

$connection = mysqli_connect($db_host, $db_username, $db_password, $db_name);

if (mysqli_connect_errno()) {
	die('Database connection failed: ' . mysqli_connect_error());
}

$name = $_POST['name'];
$surname = $_POST['surname'];
$email = $_POST['email'];
$password = $_POST['password'];

$email_query = "SELECT * FROM users WHERE email = '$email'";
$email_result = mysqli_query($connection, $email_query);
if (mysqli_num_rows($email_result) > 0) {
	echo "Email already in use";
} else {
	$password_hash = password_hash($password, PASSWORD_DEFAULT);
	$salt = bin2hex(random_bytes(10));
	$password_hash_with_salt = hash('sha256', $password_hash . $salt);
	$api_key = bin2hex(random_bytes(10));
	$insert_query = "INSERT INTO users (id, name, surname, email, password, Api_key) VALUES (NULL, '$name', '$surname', '$email', '$password_hash_with_salt', '$api_key')";
	if (mysqli_query($connection, $insert_query)) {
		echo "User registered successfully<br>";
		echo "Your API key is: " . $api_key;
	} else {
		echo "Error: " . mysqli_error($connection);
	}
}

mysqli_close($connection);
?>
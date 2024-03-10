<?php
include('config.php');

$name = $_POST['name'];
$surname = $_POST['surname'];
$email = $_POST['email'];
$password = $_POST['password'];

$email_query = "SELECT * FROM users WHERE email = '$email'";
$email_result = mysqli_query($connection, $email_query);
if (mysqli_num_rows($email_result) > 0) {
	echo "Email already in use";
} else {
	$salt = bin2hex(random_bytes(10));
	$password_hash = password_hash($password, PASSWORD_DEFAULT);
	$api_key = bin2hex(random_bytes(10));
	$insert_query = "INSERT INTO users (id, name, surname, email, password, Api_key, salt) VALUES (NULL, '$name', '$surname', '$email', '$password_hash', '$api_key', '$salt')";
	if (mysqli_query($connection, $insert_query)) {
		echo "User registered successfully<br>";
		echo "Your API key is: " . $api_key;
        header('Location: login.php');
	} else {
		echo "Error: " . mysqli_error($connection);
	}
}

mysqli_close($connection);
?>
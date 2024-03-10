<?php
$db_host = 'wheatley.cs.up.ac.za';
$db_username = 'u22502883';
$db_password = 'W3KHQWNRIUOQ67INPJ6NGIJIZGFV7UXG';
$db_name = 'u22502883';
$connection = mysqli_connect($db_host, $db_username, $db_password, $db_name);

if (mysqli_connect_errno()) {
	die('Database connection failed: ' . mysqli_connect_error());
}
?>
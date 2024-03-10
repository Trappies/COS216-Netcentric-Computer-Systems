<?php
    include("header.php");
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Login</title>
	<style>
		body {
			background-color: #f1f1f1;
			font-family: Arial, sans-serif;
		}
		form {
			background-color: #fff;
			border-radius: 5px;
			box-shadow: 0 2px 5px rgba(0,0,0,0.3);
			padding: 20px;
			max-width: 400px;
			margin: 50px auto;
		}
		h2 {
			text-align: center;
			margin-top: 0;
		}
		label {
			display: block;
			margin-bottom: 10px;
		}
		input[type="text"], input[type="password"] {
			padding: 10px;
			border-radius: 3px;
			border: 1px solid #ccc;
			width: 100%;
			margin-bottom: 20px;
			box-sizing: border-box;
			font-size: 16px;
		}
		input[type="submit"] {
			background-color: #4CAF50;
			color: #fff;
			padding: 10px 20px;
			border: none;
			border-radius: 3px;
			cursor: pointer;
			font-size: 16px;
		}
		input[type="submit"]:hover {
			background-color: #3e8e41;
		}
		.error-message {
			color: red;
			margin-bottom: 10px;
		}
		.logout-link {
			float: right;
			margin-top: -30px;
			margin-right: 10px;
		}
	</style>
</head>
<body>
	<?php
		if(isset($_SESSION['id'])) {
			echo '<a href="logout.php" class="logout-link">Logout</a>';
		}
	?>
	<form method="post" action="validate-login.php">
		<h2>Login</h2>
		<?php
			if (isset($_GET['error'])) {
				echo '<p class="error-message">Invalid username or password</p>';
			}
		?>
		<label for="email">Email:</label>
		<input type="text" id="email" name="email" required>
		<label for="password">Password:</label>
		<input type="password" id="password" name="password" required>
		<input type="submit" value="Login">
	</form>
</body>
</html>

<?php
include('footer.php');
?>
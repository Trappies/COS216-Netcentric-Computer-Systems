<?php
include('header.php');
?>

<!DOCTYPE html>
<html>
<head>
	<title>Sign Up</title>
    <style>
		form {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 50px;
			font-size: 20px;
			font-family: Arial, sans-serif;
		}
        
    label {
		margin-right: 10px;
        margin-bottom: 10px;
        color: aliceblue;
	}

	input[type="text"], input[type="email"], input[type="password"] {
		width: 250px;
		padding: 10px;
		margin-bottom: 20px;
		border-radius: 5px;
		border: 1px solid #ccc;
		font-size: 16px;
		font-family: Arial, sans-serif;
		box-shadow: inset 0 1px 3px #ddd;
	}

	input[type="submit"] {
		width: 250px;
		padding: 10px;
		background-color: #4CAF50;
		color: white;
		border: none;
		border-radius: 5px;
		font-size: 20px;
		font-family: Arial, sans-serif;
		cursor: pointer;
		box-shadow: 0 1px 3px #bbb;
	}

	input[type="submit"]:hover {
		background-color: #3e8e41;
	}

	h1 {
		text-align: center;
		font-size: 40px;
		font-family: Arial, sans-serif;
		margin-top: 50px;
	}
</style>
</head>
<body>
	<h1>Sign Up</h1>
	<form action="signup-validation.php" method="POST" onsubmit="return validateForm()">
		<label for="name">Name:</label>
		<input type="text" id="name" name="name" required><br><br>
		<label for="surname">Surname:</label>
		<input type="text" id="surname" name="surname" required><br><br>
		<label for="email">Email:</label>
		<input type="email" id="email" name="email" required><br><br>
		<label for="password">Password:</label>
		<input type="password" id="password" name="password" required><br><br>
		<input type="submit" value="Submit">
	</form>

	<script>
		function validateForm() {
			var name = document.forms[0]["name"].value;
			var surname = document.forms[0]["surname"].value;
			var email = document.forms[0]["email"].value;
			var password = document.forms[0]["password"].value;

			// Check if all fields are filled out
			if (name == "" || surname == "" || email == "" || password == "") {
				alert("Please fill out all fields");
				return false;
			}

			// Check if email is valid using regex
			var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(email)) {
				alert("Please enter a valid email address");
				return false;
			}

			// Check if password is valid using regex
			var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.*[a-zA-Z]).{8,}$/;
			if (!passwordRegex.test(password)) {
				alert("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit and one symbol");
				return false;
			}

			return true;
		}
	</script>
</body>
</html>

<?php
include('footer.php');
?>
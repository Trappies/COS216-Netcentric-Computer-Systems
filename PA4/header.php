
<?php
session_start();
?>

<div class="navbar">
    <link rel="stylesheet" href="css/brandStyles.css">
    <img src="img/LogoAA.png" class="logo">
    <ul>
        <li><a href="Cars.php">Home</a></li>
        <li><a href="Cars.php">Cars</a></li>
        <li><a href="Brands.php">Brands</a></li>
        <li><a href="FindCar.php">Find Me a Car</a></li>
        <li><a href="Compare.php">Compare</a></li>

        <?php
        if (isset($_SESSION['user_id'])) {
            echo '<li><a href="#" style="font-weight:bold; color:#FF731A;" id="welcome-message">Welcome, ' . $_SESSION['email'] . '</a></li>';
            echo '<li><a href="logout.php">Logout</a></li>';
        } else {
            echo '<li><a href="login.php">Login</a></li>';
            echo '<li><a href="signup.php">Register</a></li>';
        }
        ?>
    </ul>
</div>
?>

<?php
session_start();
?>

<div class="navbar">
    <link rel="stylesheet" href="css/brandStyles.css">
    <img src="img/LogoAA.png" class="logo">
    <ul>
        <li><a href="index.php">Home</a></li>
        <li><a href="cars.php">Cars</a></li>
        <li><a href="brands.php">Brands</a></li>
        <li><a href="findcar.php">Find Me a Car</a></li>
        <li><a href="compare.php">Compare</a></li>

        <?php
        if (isset($_SESSION['user_id'])) {
            // If the user is logged in, display their name and a logout button
            echo '<li><a href="#">Welcome, ' . $_SESSION['username'] . '</a></li>';
            echo '<li><a href="logout.php">Logout</a></li>';
        } else {
            // If the user is not logged in, display login and register links
            echo '<li><a href="login.php">Login</a></li>';
            echo '<li><a href="register.php">Register</a></li>';
        }
        ?>
    </ul>
</div>
<?php
if(isset($_SESSION['user_id'])) {
   $currentUserID = $_SESSION['user_id'];
} else {
   $currentUserID = null;
}
?>

<head>
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/spectrum-colorpicker2/dist/spectrum.min.css">
    <script src="https://cdn.jsdelivr.net/npm/spectrum-colorpicker2/dist/spectrum.min.js"></script>
</head>

<main>
<div class="push"></div>
</main>

<footer id="myFooter">
  <p>&copy; <?php echo date('Y'); ?> Auto Avenue. All Rights Reserved
    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
      <img src="img/youtube.png" alt="YouTube"></a>
    </p>

<?php if (isset($_SESSION['user_id'])) { ?>
      <div class="color-picker-container">
        <div class="color-picker">
          <label for="color-picker-input">Theme:</label>
          <input type="color" id="color-picker-input" value="#333">
        </div>
      </div>
   <?php } ?>
</footer>

<style>
body {
  overflow-x: hidden;
}
footer {
  position: fixed;
  bottom: 0;
  z-index: 99;
  left: 0;
  width: 100%;
  text-align: center;
  background-color: #333;
  color: #fff;
  padding-top: 10px;
  padding-bottom: 10px;
  height: 50px;
}
footer p {
  display: inline-block;
  margin: 0;
}
footer img {
  vertical-align: middle;
  margin-left: 10px;
}
.color-picker-container {
  display: inline-block;
  margin-left: 20px;
}
.color-picker {
  display: flex;
  align-items: center;
}
.color-picker label {
  font-weight: bold;
  margin-right: 10px;
}
main {
    min-height: 20vh;
    margin-bottom: -50px;
}
.push {
    height: 0px;
}
</style>

<script src="js/footer.js"></script>
?>




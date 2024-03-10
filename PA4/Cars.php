<?php
include('header.php');
include('auth.php');
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Cars</title>
        <link rel="stylesheet" href="css/carStyles.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <style>
            #save-filter {
                margin-left: 10px;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <form action="" class="searchbar" id="search-form">
                <input type="text" placeholder="Search" name="q" autocomplete="off">
                <button type="button" id="search"><img src="img/search.png"></button>
            </form>
            <div id="loading"></div>
            
            <div id="search-results"></div>
        </div>
            
        <table id="carproducts" class="product-container">
        </table>

        <div class="sort" id="sortDropdown">
            <select class="s">
                  <option value="option1" selected>Sort by</option>
                  <option value="option2">Name ASC</option>
                  <option value="option3">Name DESC</option>
                  <option value="option4">Year ASC</option>
                  <option value="option5">Year DESC</option>
            </select>
        </div>

<div class="filter-container">
  <div class="filter" id="filterDropdown" style="float: left;">
    <select class="f">
      <option value="option1" selected>Filter</option>
      <option value="option2">Automatic</option>
      <option value="option3">Manual</option>
      <option value="option4">Gasoline</option>
      <option value="option5">Diesel</option>
      <option value="option6">Hybrid</option>
      
    </select>
</div>
  <button id="save-filter">Save Filters</button>
</div>

        
        <script src="js/cars.js"></script>
        <script src="js/footer.js"></script>
        <?php include('footer.php'); ?>
    </body>
</html>
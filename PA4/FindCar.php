<?php
include('header.php');
include('auth.php');
?>

<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="css/findStyles.css">
    </head>
    
    <body>
        <body>
        <title>Find Me A Car</title>
            <div class="container">
                <h1>Find Your Car</h1>
                    <form>
                        <label>* Body-Type:
                            <select name="body">
                                <option value="">--Please choose an option--</option>
                                
                            </select>
                        </label>
                        
                        <label>* Transmission:
                            <select name="trans">
                                <option value="">--Please choose an option--</option>
                                
                            </select>
                        </label>
                        
                        <label>* Engine-Type:
                            <select name="fuel">
                                <option value="">--Please choose an option--</option>
                                
                            </select>
                        </label>
                        
                        <label>* Brand:
                            <select name="make">
                                <option value="">--Please choose an option--</option>
                            </select>
                        </label>
                        
                        <label>Model:
                            <select name="model">
                                <option value="">--Please choose an option--</option>
                            </select>
                        </label>
                        
                        <label>Wheel-Drive:
                            <select name="wheels">
                                <option value="">--Please choose an option--</option>
                                
                            </select>
                        </label>
                            <button type="button" id="findButton">Find Car</button>
	               </form>
            </div>
        </body>
        
    <table class="product-container">
    </table>
        <script src="js/find.js"></script>
    </body>
</html>
<?php
include('header.php');
include('auth.php');
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Compare</title>
        <link rel="stylesheet" href="css/compareStyle.css">
    </head>
    
    <body>
        <body>
            <div class="container">
            <h1>Compare Cars</h1>
            <p>Select two cars to compare:</p>
                <table class="product-container">
                    <img id="car1-image" src  width="250">
                    <img id="car2-image" src width="250">
                <tr>
                    <td>
                        <select name="car1">
                                <option value="">--Car 1--</option>         
                        </select>
                    </td>
                    <td>
                        <select name="car2">
                                <option value="">--Car 2--</option>         
                        </select>
                    </td>
                </tr>
                </table>
                <table>
                <tr>
                    <th>Property:</th>
                    <th></th>
                    <th></th>
                </tr>
                <tr>
                    <td>Body-Type:</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Transmission:</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Top Speed:</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Engine-Type:</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Wheel-Drive:</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Release-Year:</td>
                    <td></td>
                    <td></td>
                </tr>
            </table>
                
            </div>
        </body>
        <script src="js/compare.js"></script>
    </body>
</html>
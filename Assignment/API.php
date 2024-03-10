<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");
class API {

    private $servername = "wheatley.cs.up.ac.za";
    private $username = "u22502883";
    private $password = "W3KHQWNRIUOQ67INPJ6NGIJIZGFV7UXG";
    private $dbname = "u22502883_BrandRace";

    public function getRandomBrands() {
        $conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "SELECT * FROM car_logos ORDER BY RAND() LIMIT 1";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $brands = [];
            while ($row = $result->fetch_assoc()) {
                $brand = [
                    "name" => $row["brand_name"],
                    "logo" => base64_encode($row["image_data"])
                ];
                $brands[] = $brand;
            }
            $conn->close();
            return $brands;
        } else {
            $conn->close();
            return [];
        }
    }
}

$api = new API();
$brands = $api->getRandomBrands();

header('Content-Type: application/json');
echo json_encode($brands);
?>

<?php
//class API {
//
//    private $servername = "wheatley.cs.up.ac.za";
//    private $username = "u22502883";
//    private $password = "W3KHQWNRIUOQ67INPJ6NGIJIZGFV7UXG";
//    private $dbname = "u22502883_BrandRace";
//
//    public function getRandomBrand() {
//        $conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
//
//        if ($conn->connect_error) {
//            die("Connection failed: " . $conn->connect_error);
//        }
//
//        $sql = "SELECT * FROM car_logos ORDER BY RAND() LIMIT 1";
//        $result = $conn->query($sql);
//
//        if ($result->num_rows > 0) {
//            $row = $result->fetch_assoc();
//            $image_data = $row["image_data"];
//            $image_info = @getimagesizefromstring($image_data);
//
//            if ($image_info === false) {
//                http_response_code(500);
//                echo "Invalid image data.";
//            } else {
//                // Send image data and brand name as JSON object
//                header("Content-type: application/json");
//                echo json_encode(array(
//                    "image_data" => base64_encode($image_data),
//                    "brand_name" => $row["brand_name"]
//                ));
//            }
//        } else {
//            http_response_code(404);
//            echo "No logos found.";
//        }
//
//        $conn->close();
//    }
//}
//
//$api = new API();
//$api->getRandomBrand();
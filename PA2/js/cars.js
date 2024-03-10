// I have chosen to use asynchronous AJAX calls because synchronous AJAX calls can cause the browser to freeze or become unresponsive if 
// the response takes a long time to arrive. Asynchronous calls allow the browser to continue executing other code while waiting for the 
// response, making for a smoother and more responsive user experience.

let data = {
    "studentnum":"u12345678",
    "type":"GetAllCars",
    "limit":2000,
    "apikey":"a9198b68355f78830054c31a39916b7f",
    "search":{
        "make":"",
    },
    "fuzzy": true,
    "sort":"max_speed_km_per_h",
    "order": "DESC",
    "return":[
        "id_trim","make","model","max_speed_km_per_h","body_type", "engine_type", "transmission", "drive_wheels", "year_from"
    ]
};

const loader = document.querySelector("#loading");

function displayLoading() {
    loader.classList.add("display");
    setTimeout(() => {
        loader.classList.remove("display");
    }, 1000);
}

function hideLoading() {
    loader.classList.remove("display");
}

let req = new XMLHttpRequest();
req.open("POST", "https://wheatley.cs.up.ac.za/api/", true);
req.setRequestHeader("Content-type", "application/json");

let productContainer = document.querySelector(".product-container");
let carData = [];

displayLoading();
req.onreadystatechange = function () {
  if (req.readyState === req.DONE) {
//      hideLoading();
    if (req.status === 200) {
      let response = JSON.parse(req.responseText);
        
      if (response.data.length === 0) {
        productContainer.innerHTML = '<div class="center-text"><h2 class="no-results">No results found</h2></div>';
      } else {
        let uniqueMakes = [];
        for (let i = 0; i < response.data.length; i++) {
          if (uniqueMakes.indexOf(response.data[i].make) === -1) {
            uniqueMakes.push(response.data[i].make);
            carData.push(response.data[i]);
          }
        }

        carData = carData.slice(0, 20);

        productContainer.innerHTML = "";
        let numRows = Math.ceil(carData.length / 5);
        let currentIndex = 0;
        for (let i = 0; i < numRows; i++) {
          let row = document.createElement("tr");

          for (let j = 0; j < 5; j++) {
            if (currentIndex >= carData.length) {
              break;
            }

            let carMake = carData[currentIndex].make;
            let carModel = carData[currentIndex].model;
            let carImage = document.createElement("img");
            let productCard = document.createElement("td");
            productCard.classList.add("product-card");

            let reqImage = new XMLHttpRequest();
            let imageUrl = `https://wheatley.cs.up.ac.za/api/getimage?brand=${carMake}&model=${carModel}`;
            reqImage.open("GET", imageUrl, true);
            reqImage.responseType = "text";
            reqImage.onload = function () {
              if (reqImage.readyState === reqImage.DONE) {
                if (reqImage.status === 200) {
                  let imageLink = reqImage.response;
                  carImage.src = imageLink;
                } else {
                  console.log("Error: " + reqImage.status);
                }
              }
            };

            reqImage.send();

            let carHeading = document.createElement("h2");
            carHeading.innerHTML = `${carMake} ${carModel}`;

            let carBodyType = document.createElement("p");
            carBodyType.innerHTML = `Body Type: ${carData[currentIndex].body_type}`;

            let carMaxSpeed = document.createElement("p");
            carMaxSpeed.innerHTML = `Max Speed: ${carData[currentIndex].max_speed_km_per_h} km/h`;

            let carEngineType = document.createElement("p");
            carEngineType.innerHTML = `Engine Type: ${carData[currentIndex].engine_type}`;

            let carTransmission = document.createElement("p");
            carTransmission.innerHTML = `Transmission: ${carData[currentIndex].transmission}`;

            let carDriveWheels = document.createElement("p");
            carDriveWheels.innerHTML = `Drive Wheels: ${carData[currentIndex].drive_wheels}`;

            let carYearFrom = document.createElement("p");
            carYearFrom.innerHTML = `Year From: ${carData[currentIndex].year_from}`;
              

            productCard.appendChild(carImage);
            productCard.appendChild(carHeading);
            productCard.appendChild(carBodyType);
            productCard.appendChild(carMaxSpeed);
            productCard.appendChild(carEngineType);
            productCard.appendChild(carTransmission);
            productCard.appendChild(carDriveWheels);
            productCard.appendChild(carYearFrom);

            row.appendChild(productCard);
            currentIndex++;
            
          }
          productContainer.appendChild(row);
        }
      }
      }
    } else {
      console.log("Error: " + req.status);
    }
};
req.send(JSON.stringify(data));

let searchInput = document.querySelector("input[name='q']");

searchInput.addEventListener("input", function () {
    displayLoading();
  // get the current search term
  let searchTerm = searchInput.value;

  // modify the data object to include search term
  data.search.make = searchTerm;
  data.fuzzy = false;

  // send API request with updated data object
  let req = new XMLHttpRequest();
  req.open("POST", "https://wheatley.cs.up.ac.za/api/", true);
  req.setRequestHeader("Content-type", "application/json");

  // rest of the code from the original API call
  // ...
let productContainer = document.querySelector(".product-container");
let carData = [];

req.onreadystatechange = function () {
  if (req.readyState === req.DONE) {
    if (req.status === 200) {
      let response = JSON.parse(req.responseText);
        
      if (response.data.length === 0) {
        productContainer.innerHTML = '<div class="center-text"><h2 class="no-results">No results found</h2></div>';
      } else {
        let uniqueMakes = [];
        for (let i = 0; i < response.data.length; i++) {
            carData.push(response.data[i]);
        }

        carData = carData.slice(0, 20);

        productContainer.innerHTML = "";
        let numRows = Math.ceil(carData.length / 5);
        let currentIndex = 0;
        for (let i = 0; i < numRows; i++) {
          let row = document.createElement("tr");

          for (let j = 0; j < 5; j++) {
            if (currentIndex >= carData.length) {
              break;
            }

            let carMake = carData[currentIndex].make;
            let carModel = carData[currentIndex].model;
            let carImage = document.createElement("img");
            let productCard = document.createElement("td");
            productCard.classList.add("product-card");

            let reqImage = new XMLHttpRequest();
            let imageUrl = `https://wheatley.cs.up.ac.za/api/getimage?brand=${carMake}&model=${carModel}`;
            reqImage.open("GET", imageUrl, true);
            reqImage.responseType = "text";
            reqImage.onload = function () {
              if (reqImage.readyState === reqImage.DONE) {
                if (reqImage.status === 200) {
                  let imageLink = reqImage.response;
                  carImage.src = imageLink;
                } else {
                  console.log("Error: " + reqImage.status);
                }
              }
            };

            reqImage.send();

            let carHeading = document.createElement("h2");
            carHeading.innerHTML = `${carMake} ${carModel}`;

            let carBodyType = document.createElement("p");
            carBodyType.innerHTML = `Body Type: ${carData[currentIndex].body_type}`;

            let carMaxSpeed = document.createElement("p");
            carMaxSpeed.innerHTML = `Max Speed: ${carData[currentIndex].max_speed_km_per_h} km/h`;

            let carEngineType = document.createElement("p");
            carEngineType.innerHTML = `Engine Type: ${carData[currentIndex].engine_type}`;

            let carTransmission = document.createElement("p");
            carTransmission.innerHTML = `Transmission: ${carData[currentIndex].transmission}`;

            let carDriveWheels = document.createElement("p");
            carDriveWheels.innerHTML = `Drive Wheels: ${carData[currentIndex].drive_wheels}`;

            let carYearFrom = document.createElement("p");
            carYearFrom.innerHTML = `Year From: ${carData[currentIndex].year_from}`;
              

            productCard.appendChild(carImage);
            productCard.appendChild(carHeading);
            productCard.appendChild(carBodyType);
            productCard.appendChild(carMaxSpeed);
            productCard.appendChild(carEngineType);
            productCard.appendChild(carTransmission);
            productCard.appendChild(carDriveWheels);
            productCard.appendChild(carYearFrom);

            row.appendChild(productCard);
            currentIndex++;
            
          }
          productContainer.appendChild(row);
        }
      }
      }
    } else {
      console.log("Error: " + req.status);
    }
};
req.send(JSON.stringify(data));
});

//let sortSelect = document.querySelector('.s');
//
//sortSelect.addEventListener('change', function() {
//  let selectedOption = sortSelect.value;
//
//  if (selectedOption === 'option2') {
//    data.sort = 'make';
//    data.order = 'ASC';
//  } else if (selectedOption === 'option3') {
//    data.sort = 'make';
//    data.order = 'DESC';
//  } else if (selectedOption === 'option4') {
//    data.sort = 'year_from';
//    data.order = 'ASC';
//  } else if (selectedOption === 'option5') {
//    data.sort = 'year_from';
//    data.order = 'DESC';
//  } else {
//    data.sort = 'max_speed_km_per_h';
//    data.order = 'DESC';
//  }
  
//  let req1 = new XMLHttpRequest();
//  req1.open('POST', 'https://wheatley.cs.up.ac.za/api/');
//  req1.setRequestHeader('Content-Type', 'application/json');
//
//  req1.onreadystatechange = function() {
//    if (req1.readyState === req.DONE) {
//    if (req1.status === 200) {
//      let response1 = JSON.parse(req1.responseText);
//      let productContainer = document.querySelector(".product-container");
//      let carData = [];
//      if (response1.data.length === 0) {
//        productContainer.innerHTML = '<div class="center-text"><h2 class="no-results">No results found</h2></div>';
//      } else {
//        let uniqueMakes = [];
//        for (let i = 0; i < response1.data.length; i++) {
//          if (uniqueMakes.indexOf(response1.data[i].make) === -1) {
//            uniqueMakes.push(response1.data[i].make);
//            carData.push(response1.data[i]);
//          }
//        }
//
//        carData = carData.slice(0, 20);
//
//        productContainer.innerHTML = "";
//        let numRows = Math.ceil(carData.length / 5);
//        let currentIndex = 0;
//        for (let i = 0; i < numRows; i++) {
//          let row = document.createElement("tr");
//
//          for (let j = 0; j < 5; j++) {
//            if (currentIndex >= carData.length) {
//              break;
//            }
//
//            let carMake = carData[currentIndex].make;
//            let carModel = carData[currentIndex].model;
//            let carImage = document.createElement("img");
//            let productCard = document.createElement("td");
//            productCard.classList.add("product-card");
//
//            let reqImage = new XMLHttpRequest();
//            let imageUrl = `https://wheatley.cs.up.ac.za/api/getimage?brand=${carMake}&model=${carModel}`;
//            reqImage.open("GET", imageUrl, true);
//            reqImage.responseType = "text";
//            reqImage.onload = function () {
//              if (reqImage.readyState === reqImage.DONE) {
//                if (reqImage.status === 200) {
//                  let imageLink = reqImage.response;
//                  carImage.src = imageLink;
//                } else {
//                  console.log("Error: " + reqImage.status);
//                }
//              }
//            };
//
//            reqImage.send();
//
//            let carHeading = document.createElement("h2");
//            carHeading.innerHTML = `${carMake} ${carModel}`;
//
//            let carBodyType = document.createElement("p");
//            carBodyType.innerHTML = `Body Type: ${carData[currentIndex].body_type}`;
//
//            let carMaxSpeed = document.createElement("p");
//            carMaxSpeed.innerHTML = `Max Speed: ${carData[currentIndex].max_speed_km_per_h} km/h`;
//
//            let carEngineType = document.createElement("p");
//            carEngineType.innerHTML = `Engine Type: ${carData[currentIndex].engine_type}`;
//
//            let carTransmission = document.createElement("p");
//            carTransmission.innerHTML = `Transmission: ${carData[currentIndex].transmission}`;
//
//            let carDriveWheels = document.createElement("p");
//            carDriveWheels.innerHTML = `Drive Wheels: ${carData[currentIndex].drive_wheels}`;
//
//            let carYearFrom = document.createElement("p");
//            carYearFrom.innerHTML = `Year From: ${carData[currentIndex].year_from}`;
//
//            productCard.appendChild(carImage);
//            productCard.appendChild(carHeading);
//            productCard.appendChild(carBodyType);
//            productCard.appendChild(carMaxSpeed);
//            productCard.appendChild(carEngineType);
//            productCard.appendChild(carTransmission);
//            productCard.appendChild(carDriveWheels);
//            productCard.appendChild(carYearFrom);
//
//            row.appendChild(productCard);
//            currentIndex++;
//            
//          }
//          productContainer.appendChild(row);
//        }
//      }
//      }
//    } else {
//      console.log("Error: " + req.status);
//    }
//  };
//
//  
//  req1.send(JSON.stringify(data));
//});

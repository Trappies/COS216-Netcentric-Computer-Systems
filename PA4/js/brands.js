// I have chosen to use asynchronous AJAX calls because synchronous AJAX calls can cause the browser to freeze or become unresponsive if 
// the response takes a long time to arrive. Asynchronous calls allow the browser to continue executing other code while waiting for the 
// response, making for a smoother and more responsive user experience.

let data = {
  "studentnum": "u12345678",
  "type": "GetAllMakes",
  "apikey": "a9198b68355f78830054c31a39916b7f",
  "limit": 400
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
    // hideLoading();
    if (req.status === 200) {
      let response = JSON.parse(req.responseText);
        
      if (response.data.length === 0) {
        productContainer.innerHTML = '<div class="center-text"><h2 class="no-results">No results found</h2></div>';
      } else {
        let uniqueMakes = {};
        for (let i = 0; i < response.data.length; i++) {
          let carMake = response.data[i];
          let firstLetter = carMake.charAt(0).toUpperCase();
          if (!(firstLetter in uniqueMakes)) {
            uniqueMakes[firstLetter] = carMake;
          }
        }

        let carMakes = Object.values(uniqueMakes);

        productContainer.innerHTML = "";
        let numRows = Math.ceil(20 / 5);
        let currentIndex = 0;
        for (let i = 0; i < numRows; i++) {
          let row = document.createElement("tr");

          for (let j = 0; j < 5; j++) {
            if (currentIndex >= carMakes.length) {
              break;
            }

            let carMake = carMakes[currentIndex];
            let carImage = document.createElement("img");
            let productCard = document.createElement("td");
            productCard.classList.add("product-card");

            let reqImage = new XMLHttpRequest();
            let imageUrl = `https://wheatley.cs.up.ac.za/api/getimage?brand=${carMake}`;
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
            carHeading.innerHTML = carMake;

            productCard.appendChild(carImage);
            productCard.appendChild(carHeading);

            row.appendChild(productCard);
            currentIndex++;
          }
          productContainer.appendChild(row);
        }
      }
    } else {
      console.log("Error: " + req.status);
    }
  }
};

req.send(JSON.stringify(data));





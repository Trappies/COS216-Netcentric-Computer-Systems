// I have chosen to use asynchronous AJAX calls because synchronous AJAX calls can cause the browser to freeze or become unresponsive if 
// the response takes a long time to arrive. Asynchronous calls allow the browser to continue executing other code while waiting for the 
// response, making for a smoother and more responsive user experience.

let data = {
    "studentnum":"u22502883",
    "type":"GetAllCars",
    "limit":2000,
    "apikey":"",
    "search":{
        "make":"",
    },
    "fuzzy": true,
    "sort":"max_speed_km_per_h",
    "order": "DESC",
    "return":[
        "id_trim","make","model","max_speed_km_per_h","body_type", "engine_type", "transmission", "drive_wheels", "year_from", "image"
    ]
};

let apiKey = getCookieValue('api_key');

// set the api_key value to the data object
if (apiKey) {
  data.apikey = apiKey;
}

function getCookieValue(cookieName) {
  let name = cookieName + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let cookieArray = decodedCookie.split(';');
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) == ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) == 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
}

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
req.open("POST", "https://wheatley.cs.up.ac.za/u22502883/COS216/api.php", true);

let username = "u22502883";
let password = "Mopane123#";
let auth = btoa(username + ":" + password);
req.setRequestHeader("Authorization", "Basic " + auth);

req.setRequestHeader("Content-type", "application/json");

let productContainer = document.querySelector(".product-container");
let carData = [];


displayLoading();
req.onreadystatechange = function () {
  if (req.readyState === req.DONE) {
      hideLoading();
    if (req.status === 200) {
      let response = JSON.parse(req.responseText);
        console.log(req.responseText);
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
              
            carImage.src = `${carData[currentIndex].image}`;

            let carHeading = document.createElement("h2");
            carHeading.innerHTML = `${carMake} ${carModel}`;
              
            let carIdTrim = document.createElement("p");
            carIdTrim.dataset.id_trim = carData[currentIndex].id_trim;
            localStorage.setItem("id_trim-" + currentIndex, carData[currentIndex].id_trim);

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
            carYearFrom.innerHTML = `Release Year: ${carData[currentIndex].year_from}`;

           let ratingContainer = document.createElement("div");
ratingContainer.classList.add("rating-container");

let ratingLabel = document.createElement("label");
ratingLabel.classList.add("rating-label");
ratingLabel.textContent = "Rate this car: ";

let ratingStars = document.createElement("div");
ratingStars.classList.add("rating-stars");
for (let i = 0; i < 5; i++) {
  let star = document.createElement("span");
  star.classList.add("star");
  star.dataset.value = i + 0.5;
  ratingStars.appendChild(star);
}

let ratingInput = document.createElement("input");
ratingInput.classList.add("rating-input");
ratingInput.type = "hidden";
ratingInput.name = "rating";
              


ratingContainer.appendChild(ratingLabel);
ratingContainer.appendChild(ratingStars);
ratingContainer.appendChild(ratingInput);

productCard.appendChild(carImage);
productCard.appendChild(carHeading);
productCard.appendChild(carIdTrim);
productCard.appendChild(carBodyType);
productCard.appendChild(carMaxSpeed);
productCard.appendChild(carEngineType);
productCard.appendChild(carTransmission);
productCard.appendChild(carDriveWheels);
productCard.appendChild(carYearFrom);
productCard.appendChild(ratingContainer);

row.appendChild(productCard);

ratingContainer.style.display = "flex";
ratingContainer.style.flexDirection = "column";
ratingContainer.style.alignItems = "center";
ratingContainer.style.marginTop = "1.5rem";

ratingLabel.style.fontSize = "1.0rem";
ratingLabel.style.marginBottom = "0.5rem";
ratingLabel.style.fontWeight = "bold";

ratingStars.style.display = "flex";
ratingStars.style.justifyContent = "center";

let stars = ratingStars.querySelectorAll(".star");
for (let star of stars) {
  star.style.fontSize = "2.0rem";
  star.style.color = "#ccc";
  star.style.cursor = "pointer";
  star.style.margin = "0 0.5rem";
}
              
let selectedRatingValue = 0;
for (let star of stars) {
  star.addEventListener("click", function(event) {
    let selectedStar = event.target;
    selectedRatingValue = parseFloat(selectedStar.dataset.value);
    ratingInput.value = selectedRatingValue;
    ratingLabel.textContent = selectedRatingValue;

    for (let star of stars) {
      let starValue = parseFloat(star.dataset.value);
      if (starValue <= selectedRatingValue) {
        star.classList.add("active");
      } else {
        star.classList.remove("active");
      }
    }
  });
}

let activeStars = ratingStars.querySelectorAll(".active");
for (let activeStar of activeStars) {
  activeStar.style.color = "#f77f00";
}
              
function applyTheme(color) {
    $('.product-card').css('background-color', color);
    var brightness = tinycolor(color).toHsl().l;
    if (brightness < 0.3) {
      $('.product-card').css('color', '#fff');
    } else {
      $('.product-card').css('color', '#333');
    }
  }
              
var currentUserID;
var productCards = document.querySelectorAll(".product-card");
let curr = 0;
var Id_TRIM;

productCards.forEach(function(card) {
  card.addEventListener("mouseover", function() {
    var cardIndex = Array.from(productCards).indexOf(card);
    var id_trim_key = "id_trim-" + cardIndex;
    Id_TRIM = localStorage.getItem(id_trim_key);
    if (!Id_TRIM) {
      Id_TRIM = card.querySelector("[data-id_trim]").dataset.id_trim;
      localStorage.setItem(id_trim_key, Id_TRIM);
    }
    console.log(Id_TRIM);
  });
});

$.ajax({
      url: "get-user-id.php",
      type: "GET",
      success: function(response) {
        currentUserID = response;
      var savedColor = localStorage.getItem("footer-color-" + currentUserID);

      if (savedColor) {
        applyTheme(savedColor);
        $('#color-picker-input').spectrum("set", savedColor);
      }

        ratingStars.addEventListener("click", function() {
          $.ajax({
            url: "update-rating.php",
            type: "POST",
            data: JSON.stringify({rating: parseFloat(ratingInput.value), id_trim: Id_TRIM, user_id: currentUserID}),
            contentType: "application/json",
            success: function(response) {
              console.log("Rating updated successfully");
              console.log(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
              console.log("Error updating rating: " + errorThrown);
            }
          });
        });
      }
    });
            
            
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
  let searchTerm = searchInput.value;
  data.search.make = searchTerm;
  data.fuzzy = false;
  let req = new XMLHttpRequest();
  req.open("POST", "https://wheatley.cs.up.ac.za/u22502883/COS216/api.php", true);
  let username = "u22502883";
  let password = "Mopane123#";
  let auth = btoa(username + ":" + password);
  req.setRequestHeader("Authorization", "Basic " + auth);
  req.setRequestHeader("Content-type", "application/json");
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
              
            carImage.src = `${carData[currentIndex].image}`;

            let carHeading = document.createElement("h2");
            carHeading.innerHTML = `${carMake} ${carModel}`;
              
            let carIdTrim = document.createElement("p");
            carIdTrim.dataset.id_trim = carData[currentIndex].id_trim;
            localStorage.setItem("id_trim-" + currentIndex, carData[currentIndex].id_trim);

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
            carYearFrom.innerHTML = `Release Year: ${carData[currentIndex].year_from}`;
              
                      let ratingContainer = document.createElement("div");
ratingContainer.classList.add("rating-container");

let ratingLabel = document.createElement("label");
ratingLabel.classList.add("rating-label");
ratingLabel.textContent = "Rate this car: ";

let ratingStars = document.createElement("div");
ratingStars.classList.add("rating-stars");
for (let i = 0; i < 5; i++) {
  let star = document.createElement("span");
  star.classList.add("star");
  star.dataset.value = i + 0.5;
  ratingStars.appendChild(star);
}

let ratingInput = document.createElement("input");
ratingInput.classList.add("rating-input");
ratingInput.type = "hidden";
ratingInput.name = "rating";
              


ratingContainer.appendChild(ratingLabel);
ratingContainer.appendChild(ratingStars);
ratingContainer.appendChild(ratingInput);

productCard.appendChild(carImage);
productCard.appendChild(carHeading);
productCard.appendChild(carIdTrim);
productCard.appendChild(carBodyType);
productCard.appendChild(carMaxSpeed);
productCard.appendChild(carEngineType);
productCard.appendChild(carTransmission);
productCard.appendChild(carDriveWheels);
productCard.appendChild(carYearFrom);
productCard.appendChild(ratingContainer);

row.appendChild(productCard);

ratingContainer.style.display = "flex";
ratingContainer.style.flexDirection = "column";
ratingContainer.style.alignItems = "center";
ratingContainer.style.marginTop = "1.5rem";

ratingLabel.style.fontSize = "1.0rem";
ratingLabel.style.marginBottom = "0.5rem";
ratingLabel.style.fontWeight = "bold";
ratingStars.style.display = "flex";
ratingStars.style.justifyContent = "center";

let stars = ratingStars.querySelectorAll(".star");
for (let star of stars) {
  star.style.fontSize = "2.0rem";
  star.style.color = "#ccc";
  star.style.cursor = "pointer";
  star.style.margin = "0 0.5rem";
}
              
let selectedRatingValue = 0;
for (let star of stars) {
  star.addEventListener("click", function(event) {
    let selectedStar = event.target;
    selectedRatingValue = parseFloat(selectedStar.dataset.value);
    ratingInput.value = selectedRatingValue;
    ratingLabel.textContent = selectedRatingValue;

    for (let star of stars) {
      let starValue = parseFloat(star.dataset.value);
      if (starValue <= selectedRatingValue) {
        star.classList.add("active");
      } else {
        star.classList.remove("active");
      }
    }
  });
}

let activeStars = ratingStars.querySelectorAll(".active");
for (let activeStar of activeStars) {
  activeStar.style.color = "#f77f00";
}
              
function applyTheme(color) {
    $('.product-card').css('background-color', color);
    var brightness = tinycolor(color).toHsl().l;
    if (brightness < 0.3) {
      $('.product-card').css('color', '#fff');
    } else {
      $('.product-card').css('color', '#333');
    }
  }
              
var currentUserID;
var productCards = document.querySelectorAll(".product-card");
let curr = 0;
var Id_TRIM;

productCards.forEach(function(card) {
  card.addEventListener("mouseover", function() {
    var cardIndex = Array.from(productCards).indexOf(card);
    var id_trim_key = "id_trim-" + cardIndex;
    Id_TRIM = localStorage.getItem(id_trim_key);
    if (!Id_TRIM) {
      Id_TRIM = card.querySelector("[data-id_trim]").dataset.id_trim;
      localStorage.setItem(id_trim_key, Id_TRIM);
    }
    console.log(Id_TRIM);
  });
});

$.ajax({
      url: "get-user-id.php",
      type: "GET",
      success: function(response) {
        currentUserID = response;
      var savedColor = localStorage.getItem("footer-color-" + currentUserID);

      if (savedColor) {
        applyTheme(savedColor);
        $('#color-picker-input').spectrum("set", savedColor);
      }

        ratingStars.addEventListener("click", function() {
          $.ajax({
            url: "update-rating.php",
            type: "POST",
            data: JSON.stringify({rating: parseFloat(ratingInput.value), id_trim: Id_TRIM, user_id: currentUserID}),
            contentType: "application/json",
            success: function(response) {
              console.log("Rating updated successfully");
              console.log(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
              console.log("Error updating rating: " + errorThrown);
            }
          });
        });
      }
    });
            
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



//function sort() {
//  var sort0 = document.getElementById("sortDropdown").value;
//  var val1 = "";
//  var sort1 = "";
//  var order = "";
//  if (sort0 = "Year ASC") {
//    order = "ASC";
//    sort1 = "year_from";
//  }
//  if (sort0 = "Year DESC") {
//    order = "DESC";
//    sort1 = "year_from";
//  }
//  if (sort0 = "Name ASC") {
//    order = "ASC";
//    sort1 = "make";
//  }
//  if (sort0 = "Name DESC") {
//    order = "DESC";
//    sort1 = "make";
//  }
//  displayLoading();
//  
//  var body = JSON.stringify({
//    studentnum: "u22502883",
//    type: "GetAllCars",
//    limit: 2000,
//    apikey: localStorage.getItem("api_key"),
//    search: {
//      make: "",
//    },
//    fuzzy: true,
//    sort: sort1,
//    order: order,
//    return: [
//      "id_trim",
//      "make",
//      "model",
//      "max_speed_km_per_h",
//      "body_type",
//      "engine_type",
//      "transmission",
//      "drive_wheels",
//      "year_from",
//      "image",
//    ],
//  });
//  var req = new XMLHttpRequest();
//  req.open("POST", "https://wheatley.cs.up.ac.za/u22502883/COS216/api.php", true);
//
//  let username = "u22502883";
//  let password = "Mopane123#";
//  let auth = btoa(username + ":" + password);
//  req.setRequestHeader("Authorization", "Basic " + auth);
//
//  req.setRequestHeader("Content-type", "application/json");
//
//  let productContainer = document.querySelector(".product-container");
//  let carData = [];
//    console.log(req.responseText);
//  req.onreadystatechange = function () {
//    if (req.readyState === req.DONE) {
//      hideLoading();
//      if (req.status === 200) {
//        var response1 = JSON.parse(req.responseText);
//          console.log(response1.body);
//        if (response1.data.length === 0) {
//          productContainer.innerHTML = '<div class="center-text"><h2 class="no-results">No results found</h2></div>';
//        } else {
//          let uniqueMakes = [];
//          for (let i = 0; i < response1.data.length; i++) {
//            if (uniqueMakes.indexOf(response1.data[i].make) === -1) {
//              uniqueMakes.push(response1.data[i].make);
//              carData.push(response1.data[i]);
//            }
//          }
//
//        carData = carData.slice(0, 20);
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
//            carImage.src = `${carData[currentIndex].image}`;
//
//            let carHeading = document.createElement("h2");
//            carHeading.innerHTML = `${carMake} ${carModel}`;
//              
//            let carIdTrim = document.createElement("p");
//            carIdTrim.dataset.id_trim = carData[currentIndex].id_trim;
//            localStorage.setItem("id_trim-" + currentIndex, carData[currentIndex].id_trim);
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
//            carYearFrom.innerHTML = `Release Year: ${carData[currentIndex].year_from}`;
//
//                       let ratingContainer = document.createElement("div");
//ratingContainer.classList.add("rating-container");
//
//let ratingLabel = document.createElement("label");
//ratingLabel.classList.add("rating-label");
//ratingLabel.textContent = "Rate this car: ";
//
//let ratingStars = document.createElement("div");
//ratingStars.classList.add("rating-stars");
//for (let i = 0; i < 5; i++) {
//  let star = document.createElement("span");
//  star.classList.add("star");
//  star.dataset.value = i + 0.5;
//  ratingStars.appendChild(star);
//}
//
//let ratingInput = document.createElement("input");
//ratingInput.classList.add("rating-input");
//ratingInput.type = "hidden";
//ratingInput.name = "rating";
//              
//
//
//ratingContainer.appendChild(ratingLabel);
//ratingContainer.appendChild(ratingStars);
//ratingContainer.appendChild(ratingInput);
//
//productCard.appendChild(carImage);
//productCard.appendChild(carHeading);
//productCard.appendChild(carIdTrim);
//productCard.appendChild(carBodyType);
//productCard.appendChild(carMaxSpeed);
//productCard.appendChild(carEngineType);
//productCard.appendChild(carTransmission);
//productCard.appendChild(carDriveWheels);
//productCard.appendChild(carYearFrom);
//productCard.appendChild(ratingContainer);
//
//row.appendChild(productCard);
//
//ratingContainer.style.display = "flex";
//ratingContainer.style.flexDirection = "column";
//ratingContainer.style.alignItems = "center";
//ratingContainer.style.marginTop = "1.5rem";
//
//ratingLabel.style.fontSize = "1.0rem";
//ratingLabel.style.marginBottom = "0.5rem";
//ratingLabel.style.fontWeight = "bold";
//
//ratingStars.style.display = "flex";
//ratingStars.style.justifyContent = "center";
//
//let stars = ratingStars.querySelectorAll(".star");
//for (let star of stars) {
//  star.style.fontSize = "2.0rem";
//  star.style.color = "#ccc";
//  star.style.cursor = "pointer";
//  star.style.margin = "0 0.5rem";
//}
//              
//let selectedRatingValue = 0;
//for (let star of stars) {
//  star.addEventListener("click", function(event) {
//    let selectedStar = event.target;
//    selectedRatingValue = parseFloat(selectedStar.dataset.value);
//    ratingInput.value = selectedRatingValue;
//    ratingLabel.textContent = selectedRatingValue;
//
//    for (let star of stars) {
//      let starValue = parseFloat(star.dataset.value);
//      if (starValue <= selectedRatingValue) {
//        star.classList.add("active");
//      } else {
//        star.classList.remove("active");
//      }
//    }
//  });
//}
//
//let activeStars = ratingStars.querySelectorAll(".active");
//for (let activeStar of activeStars) {
//  activeStar.style.color = "#f77f00";
//}
//              
//function applyTheme(color) {
//    $('.product-card').css('background-color', color);
//    var brightness = tinycolor(color).toHsl().l;
//    if (brightness < 0.3) {
//      $('.product-card').css('color', '#fff');
//    } else {
//      $('.product-card').css('color', '#333');
//    }
//  }
//              
//var currentUserID;
//var productCards = document.querySelectorAll(".product-card");
//let curr = 0;
//var Id_TRIM;
//
//productCards.forEach(function(card) {
//  card.addEventListener("mouseover", function() {
//    var cardIndex = Array.from(productCards).indexOf(card);
//    var id_trim_key = "id_trim-" + cardIndex;
//    Id_TRIM = localStorage.getItem(id_trim_key);
//    if (!Id_TRIM) {
//      Id_TRIM = card.querySelector("[data-id_trim]").dataset.id_trim;
//      localStorage.setItem(id_trim_key, Id_TRIM);
//    }
//    console.log(Id_TRIM);
//  });
//});
//
//$.ajax({
//      url: "get-user-id.php",
//      type: "GET",
//      success: function(response) {
//        currentUserID = response;
//      var savedColor = localStorage.getItem("footer-color-" + currentUserID);
//
//      if (savedColor) {
//        applyTheme(savedColor);
//        $('#color-picker-input').spectrum("set", savedColor);
//      }
//
//        ratingStars.addEventListener("click", function() {
//          $.ajax({
//            url: "update-rating.php",
//            type: "POST",
//            data: JSON.stringify({rating: parseFloat(ratingInput.value), id_trim: Id_TRIM, user_id: currentUserID}),
//            contentType: "application/json",
//            success: function(response) {
//              console.log("Rating updated successfully");
//              console.log(response);
//            },
//            error: function(jqXHR, textStatus, errorThrown) {
//              console.log("Error updating rating: " + errorThrown);
//            }
//          });
//        });
//      }
//    });
//            
//            
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
//};
//req.send(body);
//}

//var sortDropdown = document.getElementById("sortDropdown");
//sortDropdown.addEventListener("change", sort);

const dropdown = document.querySelector('.f');
let selectedOption = dropdown.value;

dropdown.addEventListener('change', function() {
  selectedOption = dropdown.value;
  localStorage.setItem("filter-option-" + currentUserID, selectedOption);
  console.log(selectedOption);
});
var currentUserID;
$.ajax({
  url: "get-user-id.php",
  type: "GET",
  success: function(response) {
    currentUserID = response;
    var savedFilter = localStorage.getItem("filter-" + currentUserID);

    const updateFilterButton = document.getElementById('save-filter');
    updateFilterButton.addEventListener("click", function() {
      $.ajax({
        url: "update-filter.php",
        type: "POST",
        data: JSON.stringify({filter: selectedOption.toString()}),
        contentType: "application/json",
        success: function(response) {
          alert("Filter Saved Successfully!");
          console.log("Filter updated successfully");
          console.log(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log("Error updating filter: " + errorThrown);
        }
      });
    });
  }
});


let makeDropdown = document.querySelector('select[name="make"]');
let makes = [];

let req = new XMLHttpRequest();
let data = {
  "studentnum":"u12345678",
  "type":"GetAllCars",
  "limit":2000,
  "apikey":"a9198b68355f78830054c31a39916b7f",
  "search":{
      "make":"",
  },
  "fuzzy": true,
  "sort":"make",
  "order": "ASC",
  "return":[
      "id_trim","make", "model", "engine_type", "drive_wheels", "body_type", "transmission"
  ]
};

req.open("POST", "https://wheatley.cs.up.ac.za/api/", true);
req.setRequestHeader("Content-type", "application/json");
req.onreadystatechange = function () {
  if (req.readyState == 4 && req.status == 200) {
    let response = JSON.parse(req.responseText);
    for (let i = 0; i < response.data.length; i++) {
      let make = response.data[i].make;
      if (!makes.includes(make)) {
        makes.push(make);
      }
    }
    makes.sort();
    for (let i = 0; i < makes.length; i++) {
      let option = document.createElement('option');
      option.textContent = makes[i];
      option.value = makes[i];
      makeDropdown.appendChild(option);
    }
  }
};
req.send(JSON.stringify(data));

let modelDropdown = document.querySelector('select[name="model"]');
let models = [];

let req1 = new XMLHttpRequest();
req1.open("POST", "https://wheatley.cs.up.ac.za/api/", true);
req1.setRequestHeader("Content-type", "application/json");
req1.onreadystatechange = function () {
  if (req1.readyState == 4 && req1.status == 200) {
    let response1 = JSON.parse(req1.responseText);
    for (let i = 0; i < response1.data.length; i++) {
      let make = response1.data[i].make;
      let model = response1.data[i].model;
      let modelName = `${model} [${make}]`;
      if (!models.includes(modelName)) {
        models.push(modelName);
      }
    }
    models.sort(function(a, b) {
      let makeA = a.substring(a.indexOf("[") + 1, a.indexOf("]"));
      let makeB = b.substring(b.indexOf("[") + 1, b.indexOf("]"));
      return makeA.localeCompare(makeB);
    });
    for (let i = 0; i < models.length; i++) {
      let option1 = document.createElement('option');
      option1.textContent = models[i];
      option1.value = models[i];
      modelDropdown.appendChild(option1);
    }
  }
};
req1.send(JSON.stringify(data));

let engineDropdown = document.querySelector('select[name="fuel"]');
let enginetypes = [];

let req2 = new XMLHttpRequest();
req2.open("POST", "https://wheatley.cs.up.ac.za/api/", true);
req2.setRequestHeader("Content-type", "application/json");
req2.onreadystatechange = function () {
  if (req2.readyState == 4 && req2.status == 200) {
    let response2 = JSON.parse(req2.responseText);
    for (let i = 0; i < response2.data.length; i++) {
      let engine = response2.data[i].engine_type;
      if (!enginetypes.includes(engine)) {
        enginetypes.push(engine);
      }
    }
    makes.sort();
    for (let i = 0; i < enginetypes.length; i++) {
      let option2 = document.createElement('option');
      option2.textContent = enginetypes[i];
      option2.value = enginetypes[i];
      engineDropdown.appendChild(option2);
    }
  }
};
req2.send(JSON.stringify(data));

let wheelsDropdown = document.querySelector('select[name="wheels"]');
let drivewheels = [];

let req3 = new XMLHttpRequest();
req3.open("POST", "https://wheatley.cs.up.ac.za/api/", true);
req3.setRequestHeader("Content-type", "application/json");
req3.onreadystatechange = function () {
  if (req3.readyState == 4 && req3.status == 200) {
    let response3 = JSON.parse(req3.responseText);
    for (let i = 0; i < response3.data.length; i++) {
      let wheel = response3.data[i].drive_wheels;
      if (!drivewheels.includes(wheel)) {
        drivewheels.push(wheel);
      }
    }
    makes.sort();
    for (let i = 0; i < drivewheels.length; i++) {
      let option3 = document.createElement('option');
      option3.textContent = drivewheels[i];
      option3.value = drivewheels[i];
      wheelsDropdown.appendChild(option3);
    }
  }
};
req3.send(JSON.stringify(data));

let bodyDropdown = document.querySelector('select[name="body"]');
let bodies = [];

let req4 = new XMLHttpRequest();
req4.open("POST", "https://wheatley.cs.up.ac.za/api/", true);
req4.setRequestHeader("Content-type", "application/json");
req4.onreadystatechange = function () {
  if (req4.readyState == 4 && req4.status == 200) {
    let response4 = JSON.parse(req4.responseText);
    for (let i = 0; i < response4.data.length; i++) {
      let body = response4.data[i].body_type;
      if (!bodies.includes(body)) {
        bodies.push(body);
      }
    }
    makes.sort();
    for (let i = 0; i < bodies.length; i++) {
      let option4 = document.createElement('option');
      option4.textContent = bodies[i];
      option4.value = bodies[i];
      bodyDropdown.appendChild(option4);
    }
  }
};
req4.send(JSON.stringify(data));

let transDropdown = document.querySelector('select[name="trans"]');
let transmissions = [];

let req5 = new XMLHttpRequest();
req5.open("POST", "https://wheatley.cs.up.ac.za/api/", true);
req5.setRequestHeader("Content-type", "application/json");
req5.onreadystatechange = function () {
  if (req5.readyState == 4 && req5.status == 200) {
    let response5 = JSON.parse(req5.responseText);
    for (let i = 0; i < response5.data.length; i++) {
      let trans = response5.data[i].transmission;
      if (!transmissions.includes(trans)) {
        transmissions.push(trans);
      }
    }
    makes.sort();
    for (let i = 0; i < transmissions.length; i++) {
      let option5 = document.createElement('option');
      option5.textContent = transmissions[i];
      option5.value = transmissions[i];
      transDropdown.appendChild(option5);
    }
  }
};
req5.send(JSON.stringify(data));


let productContainer = document.querySelector('.product-container');

let findButton = document.getElementById('findButton');

findButton.addEventListener('click', getMatchingCars);

function getMatchingCars() {
  let selectedMake = makeDropdown.value;
  let selectedModel = modelDropdown.value;
  let selectedTrans = transDropdown.value;
  let selectedEngine = engineDropdown.value;
  let selectedBody = bodyDropdown.value;
  let selectedWheels = wheelsDropdown.value;

  if (!selectedMake && !selectedModel && !selectedTrans && !selectedEngine && !selectedBody && !selectedWheels) {
    productContainer.innerHTML = '<div class="center-text"><h2 class="no-results">Please select at least one option</h2></div>';
    return;
  }

  let reqdisp = new XMLHttpRequest();
  reqdisp.open('POST', 'https://wheatley.cs.up.ac.za/api/', true);
  reqdisp.setRequestHeader('Content-type', 'application/json');

  let data = {
    'studentnum': 'u12345678',
    'type': 'GetAllCars',
    'limit': 450,
    'apikey': 'a9198b68355f78830054c31a39916b7f',
    'search': {
      'make': selectedMake,
      'model': selectedModel,
      'transmission': selectedTrans,
      'engine_type': selectedEngine,
      'body_type': selectedBody,
      'drive_wheels': selectedWheels
    },
    'fuzzy': true,
    'sort': 'max_speed_km_per_h',
    'order': 'DESC',
    'return': ['id_trim', 'make', 'model']
  };

  reqdisp.onload = function() {
    if (reqdisp.readyState === reqdisp.DONE) {
      if (reqdisp.status === 200) {
        let responsedisp = JSON.parse(reqdisp.responseText);
        if (responsedisp.data.length === 0) {
          productContainer.innerHTML = '<div class="center-text"><h2 class="no-results">No results found</h2></div>';
        } else {
          productContainer.innerHTML = '';
          let numRows = Math.ceil(Math.min(responsedisp.data.length, 8) / 4);
          let currentIndex = 0;
          for (let i = 0; i < numRows; i++) {
            let row = document.createElement('tr');
            for (let j = 0; j < 4; j++) {
              if (currentIndex >= Math.min(responsedisp.data.length, 8)) {
                break;
              }

              let carMake = responsedisp.data[currentIndex].make;
              let carModel = responsedisp.data[currentIndex].model;
              let carImage = document.createElement('img');               
              let productCard = document.createElement('td');
              productCard.classList.add('product-card');

              let reqImage = new XMLHttpRequest();
              let imageUrl = `https://wheatley.cs.up.ac.za/api/getimage?brand=${carMake}&model=${carModel}`;
              reqImage.open('GET', imageUrl, true);
              reqImage.responseType = 'text';
              reqImage.onload = function() {
                if (reqImage.readyState === reqImage.DONE) {
                  if (reqImage.status === 200) {
                    let imageLink = reqImage.response;
                    carImage.src = imageLink;
                    productCard.appendChild(carImage);
                    row.appendChild(productCard);
                    currentIndex++;
                  } else {
                    console.log('Error: ' + reqImage.status);
                  }
                }
              };

              reqImage.send();

              

              let carHeading = document.createElement('h2');
              carHeading.innerText = `${carMake} ${carModel}`;

              productCard.appendChild(carHeading);

              row.appendChild(productCard);
              currentIndex++;
            }
            productContainer.appendChild(row);
          }
        }
      } else {
        console.log('Error: ' + reqdisp.status);
      }
    }
  };

  reqdisp.send(JSON.stringify(data));
};


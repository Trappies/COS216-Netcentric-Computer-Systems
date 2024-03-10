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
      "id_trim","make", "model", "engine_type", "drive_wheels", "body_type", "transmission", "max_speed_km_per_h", "year_from"
  ]
};

let car1Dropdown = document.querySelector('select[name="car1"]');
let car1s = [];

let car2Dropdown = document.querySelector('select[name="car2"]');
let car2s = [];

let req = new XMLHttpRequest();
req.open("POST", "https://wheatley.cs.up.ac.za/api/", true);
req.setRequestHeader("Content-type", "application/json");
req.onreadystatechange = function () {
  if (req.readyState == 4 && req.status == 200) {
    let response = JSON.parse(req.responseText);
    for (let i = 0; i < response.data.length; i++) {
      let car = response.data[i].make + " " + response.data[i].model;
      if (!car1s.includes(car)) {
        car1s.push(car);
      }
      if (!car2s.includes(car)) {
        car2s.push(car);
      }
    }
    car1s.sort();
    car2s.sort();
    for (let i = 0; i < car1s.length; i++) {
      let option = document.createElement('option');
      option.textContent = car1s[i];
      option.value = car1s[i];
      car1Dropdown.appendChild(option);
    }
    for (let i = 0; i < car2s.length; i++) {
      let option2 = document.createElement('option');
      option2.textContent = car2s[i];
      option2.value = car2s[i];
      car2Dropdown.appendChild(option2);
    }
  }
};
req.send(JSON.stringify(data));



let tableRows = document.querySelectorAll('table tr');

function updateTable() {
  let car1 = car1Dropdown.value;
  let car2 = car2Dropdown.value;
  if (car1 && car2){
    let dataRows = [    {property: "Property", car1Value: "", car2Value: ""},    {property: "Body-Type", car1Value: "", car2Value: ""},    {property: "Transmission", car1Value: "", car2Value: ""},    {property: "Top Speed", car1Value: "", car2Value: ""},    {property: "Engine-Type", car1Value: "", car2Value: ""},    {property: "Wheel-Drive", car1Value: "", car2Value: ""},    {property: "Release-Year", car1Value: "", car2Value: ""}];
    let req = new XMLHttpRequest();
    req.open("POST", "https://wheatley.cs.up.ac.za/api/", true);
    req.setRequestHeader("Content-type", "application/json");
    req.onreadystatechange = function () {
      if (req.readyState == 4 && req.status == 200) {
        let response = JSON.parse(req.responseText);
        for (let i = 0; i < response.data.length; i++) {
          let car = response.data[i].make + " " + response.data[i].model;
          if (car === car1) {
                dataRows[0].car1Value = response.data[i].make + " " + response.data[i].model;
                dataRows[1].car1Value = response.data[i].body_type;
                dataRows[2].car1Value = response.data[i].transmission;
                dataRows[3].car1Value = response.data[i].max_speed_km_per_h + " km/h";
                dataRows[4].car1Value = response.data[i].engine_type;
                dataRows[5].car1Value = response.data[i].drive_wheels;
                dataRows[6].car1Value = response.data[i].year_from;
              
                let car1ImageReq = new XMLHttpRequest();
                car1ImageReq.open("GET", `https://wheatley.cs.up.ac.za/api/getimage?brand=${response.data[i].make}&model=${response.data[i].model}`, true);
                car1ImageReq.responseType = 'text';
                car1ImageReq.onload = function() {
                if (this.status === 200) {
                    let imageLink = car1ImageReq.response;
                    let car1Image = document.getElementById("car1-image");
                    car1Image.src = imageLink;
                }
            };
            car1ImageReq.send();
          } else if (car === car2) {
              dataRows[0].car2Value = response.data[i].make + " " + response.data[i].model;
              dataRows[1].car2Value = response.data[i].body_type;
              dataRows[2].car2Value = response.data[i].transmission;
              dataRows[3].car2Value = response.data[i].max_speed_km_per_h  + " km/h";
              dataRows[4].car2Value = response.data[i].engine_type;
              dataRows[5].car2Value = response.data[i].drive_wheels;
              dataRows[6].car2Value = response.data[i].year_from;
              
              let car12ImageReq = new XMLHttpRequest();
              car12ImageReq.open("GET", `https://wheatley.cs.up.ac.za/api/getimage?brand=${response.data[i].make}&model=${response.data[i].model}`, true);
              car12ImageReq.responseType = 'text';
              car12ImageReq.onload = function() {
              if (this.status === 200) {
                let imageLink2 = car12ImageReq.response;
                let car2Image = document.getElementById("car2-image");
                car2Image.src = imageLink2;
              }
            };
            car12ImageReq.send();
        }
      }
      for (let i = 0; i < dataRows.length; i++) {
        tableRows[i+1].children[1].textContent = dataRows[i].car1Value;
        tableRows[i+1].children[2].textContent = dataRows[i].car2Value;
      }
    }
  };
  req.send(JSON.stringify(data));
  }
}

car1Dropdown.addEventListener('change', updateTable);
car2Dropdown.addEventListener('change', updateTable);



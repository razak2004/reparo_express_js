// geting the logged user data
const cus = JSON.parse(localStorage.getItem("oneUser"));
// getting customer data from local storage
let customers = JSON.parse(localStorage.getItem("users"));
// getting workshop data from local storage
const workshops = JSON.parse(localStorage.getItem("workshops"));
// finding the logged user data
let log_cus = customers.find((e) => {
  if (e["user_id"] === cus) {
    return true;
  }
});
// finding the logged user's vehicle data
Customer_vehicles = JSON.parse(localStorage.getItem("Customer_vehicles"));
let cus_vehicle = Customer_vehicles.find((e) => {
  if (e["CustomerId"] === cus) {
    return true;
  }
});

// finding the index of the user data
let index = customers.indexOf(log_cus);
// finding the index of the user's vehicle data
let vehicleIndex = Customer_vehicles.indexOf(cus_vehicle);

// getting the html tag with the help of an id and assign a value
let profileName = document.getElementById("h_name"); // user's name
// user's Image
let profileImage = document.getElementById("C_profile");
// assigning a value into the variable
profileName.innerText = "Hi ! " + log_cus["name"];
// to show the user name in the profile editting page
let P_name = document.getElementById("name");
let P_phone = document.getElementById("phone");
let P_password = document.getElementById("password");
// assinging a value for those variable
P_name.value = log_cus["name"];
P_phone.value = log_cus["number"];
P_password.value = log_cus["password"];
P_password.setAttribute("disabled", true);
P_phone.setAttribute("disabled", true);
// profile page

//personal form ;
// getting an id from a personal form
let personal_form = document.getElementById("personal_form");
// adding the event listener to listen submit event
personal_form.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent default actions  of form
  let profileName = document.getElementById("name"); // getting html element of name
  profileName.addEventListener("change", () => {
    // added event listener to listen an event of change
    let check = profileName.value; // getting value when it changed
    let alp = hasnotAlphabet(check); // checking the value has alphabet
    if (alp === true) {
      Notify.error("please enter name without a special character or number "); // if alphabet has contain numbers or special characters give an alert
    }
    if (check.length > 15) {
      Notify.error("not more than 15 characters "); // if the number of characters is more than 15 gives an alert
    }
  });
  // getting the data from the form
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let address = document.getElementById("address").value;
  let city = document.getElementById("city_state").value;
  let image = document.getElementById("profilepic").value;

  //making as an object

  let object = { name, email, address, city, image };

  // updating data with the previous data
  let updateObj = Object.assign(log_cus, object);
  // updating the data
  customers[index] = updateObj;
  // setting into local storage
  localStorage.setItem("users", JSON.stringify(customers));
  // redirect to vehicle form
  openprofile("Vehicle", "W_pro");

  //disable the account
});

// personal form ended

//vehicle form
const vehicle_Form = document.getElementById("vehicle_Form");
// to listen submit event
vehicle_Form.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent default actions
  // getting value from the form
  let vehicleType = document.getElementById("v_type").value;
  let fuelType = document.getElementById("f_type").value;
  let VehicleCompany = document.getElementById("v_company").value;
  let vehicleModel = document.getElementById("model").value;
  let year1 = document.getElementById("year1").value;
  let year2 = document.getElementById("year2").value;
  let year3 = document.getElementById("year3").value;
  let year4 = document.getElementById("year4").value;
  let vehicleYear = "";
  vehicleYear += year1 + year2 + year3 + year4;
  let vehicleNumber1 = document.getElementById("v_num1").value;
  let vehicleNumber2 = document.getElementById("v_num2").value;
  let vehicleNumber3 = document.getElementById("v_num3").value;
  let vehicleNumber4 = document.getElementById("v_num4").value;
  let vehicleImage = document.getElementById("v_img").value;
  let vehicleNumber = "";
  vehicleNumber +=
    vehicleNumber1 +
    "-" +
    vehicleNumber2 +
    "-" +
    vehicleNumber3 +
    "-" +
    vehicleNumber4;

  let vehicleObject = {
    vehicleType,
    fuelType,
    VehicleCompany,
    vehicleModel,
    vehicleYear,
    vehicleNumber,
    vehicleImage,
  };

  // pushing to vehicle array
  // Assigning to existing data
  let update = Object.assign(cus_vehicle, vehicleObject);
  Customer_vehicles[vehicleIndex] = update;
  localStorage.setItem("Customer_vehicles", JSON.stringify(Customer_vehicles));
  alert("updated your vehicle details successfully");
  window.location.href = "./showprofile.html";
});

// validation for year
let year1 = document.getElementById("year1");
let year2 = document.getElementById("year2");
let year3 = document.getElementById("year3");
let year4 = document.getElementById("year4");
year1.addEventListener("change", (e) => {
  e = year1.value;
  let f = hasNumber(e);
  if (f != true) {
    Notify.error("Number are only allowed to be entered");
  }
  if (e.length != 1) {
    Notify.error("Only 1 number are allowed in 1 box");
  }
}); // year 1
year2.addEventListener("change", (e) => {
  e = year2.value;
  let f = hasNumber(e);
  if (f != true) {
    Notify.error("Number are only allowed to be entered");
  }
  if (e.length != 1) {
    Notify.error("Only 1 number are allowed in 1 box");
  }
}); // year 2
year3.addEventListener("change", (e) => {
  e = year3.value;
  let f = hasNumber(e);
  if (f != true) {
    Notify.error("Number are only allowed to be entered");
  }
  if (e.length != 1) {
    Notify.error("Only 1 number are allowed in 1 box");
  }
}); // year 3
year4.addEventListener("change", (e) => {
  e = year4.value;
  let f = hasNumber(e);
  if (f != true) {
    Notify.error("Number are only allowed to be entered");
  }
  if (e.length != 1) {
    Notify.error("Only 1 number are allowed in 1 box");
  }
}); // yearv 4
let vNum1 = document.getElementById("v_num1"); // for TN
vNum1.addEventListener("change", (e) => {
  e = vNum1.value;
  let f = hasAlp(e);
  if (f != true || e.length != 2) {
    Notify.error("State code should be in 2 letters and uppercase");
  }
});
let vNum2 = document.getElementById("v_num2"); // for 00
vNum2.addEventListener("change", (e) => {
  e = vNum2.value;
  let f = hasNumber(e);
  if (f != true) {
    Notify.error("Number are only allowed to be entered");
  }
  if (e.length != 2) {
    Notify.error("Only 2 number are allowed");
  }
});
let vNum3 = document.getElementById("v_num3"); // for district code
vNum3.addEventListener("change", (e) => {
  e = vNum3.value;
  let f = hasAlp(e);
  if (f != true) {
    Notify.error("code should be in uppercase   ");
  }
  if (e.length > 2) {
    Notify.error(" not more 2 letters should be enter  ");
  }
});

let vNum4 = document.getElementById("v_num4"); // for number
vNum4.addEventListener("change", (e) => {
  e = vNum4.value;
  let f = hasNumber(e);
  if (f != true) {
    Notify.error("Number are only allowed to be entered");
  }
  if (e.length != 4) {
    Notify.error(" 4 numbers should be entered");
  }
});

//vehicle-company
const select_vehicle_Type = document.getElementById("v_type");
select_vehicle_Type.addEventListener("change", (event) => {
  type = event.target.value;
  if (type === "Two Wheelers") {
    createCompany(two_wheeler_company, "v_company");
  } else if (type === "Three Wheelers") {
    createCompany(three_wheeler_company, "v_company");
  } else if (type === "Four Wheelers") {
    createCompany(four_wheeler_company, "v_company");
  }
});
//vehicle-models
const select_VehicleCompany = document.getElementById("v_company");
select_VehicleCompany.addEventListener("change", (event) => {
  VehicleCompany = event.target.value;
  if (type === "Two Wheelers") {
    createVehicle(two_wheeler_company, "model", VehicleCompany);
    // createCompany(two_wheeler_company, "v_company");
  } else if (type === "Three Wheelers") {
    createVehicle(three_wheeler_company, "model", VehicleCompany);
  } else if (type === "Four Wheelers") {
    createVehicle(four_wheeler_company, "model", VehicleCompany);
  }
});

function show(arr) {
  let P_name = document.getElementById("name");
  let P_phone = document.getElementById("phone");
  let P_password = document.getElementById("password");
  let email = document.getElementById("email");
  let address = document.getElementById("address");
  let city = document.getElementById("city_state");
  let image = document.getElementById("profilepic");
  // let vehicleType = document.getElementById("v_type");
  // let fuelType = document.getElementById("f_type");
  // let VehicleCompany = document.getElementById("v_company");
  // let vehicleModel = document.getElementById("model");
  // let vehicleYear = document.getElementById("year");
  // let vehicleNumber = document.getElementById("v_num");
  // let vehicleImage = document.getElementById("v_img");

  //showing values
  P_name.value = arr["name"];
  P_phone.value = arr["number"];
  P_password.value = arr["password"];
  email.value = arr["email"];
  address.value = arr["address"];
  city.value = arr["city"];
  image.value = arr["image"];
}

// json for vehicles

const two_wheeler_company = [
  {
    company: "Select-Your-company",
  },
  {
    company: "Bajaj Auto",
    vehicles: [
      "select-your-model",
      "Splendor Plus",
      "HF Deluxe",
      "Passion Pro",
      "Glamour",
      "Xtreme 160R",
      "Xpulse 200",
      "Destini 125",
      "Maestro Edge 110",
      "Pleasure Plus",
      "Super Splendor",
      "Maestro Edge 125",
      "Xtreme 200S",
      "Glamour Blaze",
      "Destini 125 Platinum",
      "Splendor iSmart Plus",
      "HF Deluxe i3s",
      "Splendor+ Black and Accent",
      "Xpulse 200T",
      "Glamour Xtec",
      "Maestro Edge 110 Stealth Edition",
    ],
  },
  {
    company: "Hero MotoCorp",
    vehicles: [
      "select-your-model",
      "Splendor Plus",
      "HF Deluxe",
      "Passion Pro",
      "Glamour",
      "Xtreme 160R",
      "Xpulse 200",
      "Destini 125",
      "Maestro Edge 110",
      "Pleasure Plus",
      "Super Splendor",
      "Maestro Edge 125",
      "Xtreme 200S",
      "Glamour Blaze",
      "Destini 125 Platinum",
      "Splendor iSmart Plus",
      "HF Deluxe i3s",
      "Splendor+ Black and Accent",
      "Xpulse 200T",
      "Glamour Xtec",
      "Maestro Edge 110 Stealth Edition",
    ],
  },
  {
    company: "TVS Motor Company",
    vehicles: [
      "select-your-model",
      "Apache RTR 160 4V",
      "Apache RTR 200 4V",
      "Apache RR 310",
      "Star City Plus",
      "Jupiter",
      "Scooty Pep Plus",
      "NTORQ 125",
      "XL100",
      "Victor",
      "Sport",
      "iQube Electric",
      "Apache RTR 180",
      "Apache RTR 160",
      "Scooty Zest 110",
      "Scooty Streak",
      "Wego",
      "Max 125",
      "Phoenix 125",
      "Scooty Pep",
      "XL HD 100",
    ],
  },
  {
    company: "Honda Motorcycle and Scooter India",
    vehicles: [
      "select-your-model",
      "Activa 6G",
      "Activa 125",
      "Shine",
      "SP 125",
      "Hornet 2.0",
      "X-Blade",
      "Livo",
      "CD 110 Dream",
      "Grazia 125",
      "CB350RS",
      "CB350 Highness",
      "Gold Wing",
      "CBR 650R",
      "Africa Twin Adventure Sports",
      "Dio",
      "Cliq",
      "Aviator",
      "Dream Yuga",
      "Dream Neo",
      "Navi",
    ],
  },
  {
    company: "Royal Enfield",
    vehicles: [
      "select-your-model",
      "Classic 350",
      "Bullet 350",
      "Meteor 350",
      "Himalayan",
      "Interceptor 650",
      "Continental GT 650",
      "Bullet Trials Works Replica 350",
      "Classic 350 Redditch",
      "Classic 500",
      "Thunderbird 350",
      "Thunderbird 500",
      "Bullet Electra 350",
      "Bullet Electra 500",
      "Classic 350 Signals Edition",
      "Classic 350 Gunmetal Grey",
      "Classic 350 Chrome",
      "Continental GT 650 Custom",
      "Himalayan Adventure",
      "Himalayan Sleet",
      "Interceptor 650 Custom",
    ],
  },
  {
    company: "Suzuki Motorcycle India",
    vehicles: [
      "select-your-model",
      "Access 125",
      "Burgman Street",
      "Burgman 125",
      "Gixxer SF",
      "Gixxer SF 250",
      "Gixxer",
      "Hayabusa",
      "Intruder",
      "Let's",
      "RM-Z250",
      "RM-Z450",
      "SV650X",
      "V-Strom 650XT",
      "V-Strom 1000XT",
      "V-Strom 1050XT",
      "Gixxer 250",
      "Gixxer SF MotoGP",
      "GSX-S750",
      "GSX-S1000",
      "RM85",
    ],
  },
  {
    company: "Yamaha Motor India",
    vehicles: [
      "select-your-model",
      "FZ-S",
      "FZ Fi",
      "FZ 25",
      "FZS 25",
      "MT-15",
      "YZF R15 V3",
      "YZF R1M",
      "YZF R1",
      "MT-09",
      "Fascino 125",
      "RayZR 125",
      "RayZR 125 Street Rally",
      "Aerox 155",
      "YZF-R3",
      "XSR155",
      "XSR700",
      "VMAX",
      "MT-07",
      "Tracer 900 GT",
      "YZF-R6",
    ],
  },
  {
    company: "KTM India",
    vehicles: [
      "select-your-model",
      "125 Duke",
      "200 Duke",
      "250 Duke",
      "390 Duke",
      "RC 125",
      "RC 200",
      "RC 390",
      "Adventure 390",
      "Adventure 250",
      "Adventure 200",
      "RC 16",
      "790 Duke",
      "125 Adventure",
      "250 Adventure",
      "390 Adventure",
      "450 SX-F",
      "250 SX",
      "250 SX-F",
      "150 XC-W TPI",
      "250 XC-F",
    ],
  },
  {
    company: "Jawa Motorcycles",
    vehicles: [
      "select-your-model",
      "Jawa",
      "Jawa Forty Two",
      "Jawa Perak",
      "Yezdi Roadking",
      "Yezdi CL-II",
      "Yezdi Deluxe",
      "Yezdi Monarch",
      "BSA Goldstar",
      "BSA Roadster",
      "BSA Fury",
      "BSA Hornet",
      "BSA Scrambler",
      "BSA Tracker",
      "Jawa 300",
      "Jawa 90th Anniversary Edition",
      "Jawa 42 2.1",
      "Jawa Perak BS6",
      "Yezdi Roadking 250",
      "Yezdi CL-II 250",
      "Yezdi Monarch 250",
    ],
  },
];

const three_wheeler_company = [
  {
    company: "Select-Your-company",
  },
  {
    company: "Bajaj Auto",
    vehicles: [
      "select-your-model",
      "Bajaj RE Compact 2S",
      "Bajaj RE Compact 4S",
      "Bajaj RE Optima",
      "Bajaj RE Optima - Cargo",
      "Bajaj RE Optima - DX",
      "Bajaj RE Optima - DX LPG",
      "Bajaj RE City",
      "Bajaj RE City - LPG",
      "Bajaj RE Maxima",
      "Bajaj RE Maxima - CNG",
    ],
  },
  {
    company: "Piaggio ",
    vehicles: [
      "select-your-model",
      "Piaggio Ape City",
      "Piaggio Ape Xtra LDX",
      "Piaggio Ape DX",
      "Piaggio Ape E-City",
      "Piaggio Ape E-City FX",
      "Piaggio Ape E-City LDX",
      "Piaggio Ape E-City Plus",
      "Piaggio Ape Auto DX",
      "Piaggio Ape Auto DXL",
      "Piaggio Ape Auto DXL CNG",
    ],
  },
  {
    company: "TVS Motors",
    vehicles: [
      "select-your-model",
      "TVS King",
      "TVS King Deluxe",
      "TVS King Duramax",
      "TVS King Max",
      "TVS King 4S",
      "TVS King DS",
      "TVS XL100",
      "TVS XL100 Comfort",
      "TVS XL100 Heavy Duty",
      "TVS XL100 Winner Edition",
    ],
  },
  {
    company: "Atul Auto",
    vehicles: [
      "select-your-model",
      "Atul Gem",
      "Atul Smart",
      "Atul Elite",
      "Atul Gemini",
      "Atul Gem Paxx",
      "Atul Gem Cargo",
      "Atul Shakti",
      "Atul Shakti Passenger",
      "Atul Shakti Cargo",
      "Atul Gemini Passenger",
    ],
  },
  {
    company: "Mahindra & Mahindra",
    vehicles: [
      "select-your-model",
      "Mahindra Alfa",
      "Mahindra Alfa DX",
      "Mahindra Alfa Plus",
      "Mahindra Alfa Champ",
      "Mahindra Treo",
      "Mahindra Treo Yaari",
      "Mahindra Treo Zor",
      "Mahindra Alfa Load",
      "Mahindra Alfa Comfy",
      "Mahindra Alfa Mini",
    ],
  },
];

const four_wheeler_company = [
  {
    company: "Select-Your-company",
  },
  {
    company: "Maruti Suzuki",
    vehicles: [
      "select-your-model",
      "Alto",
      "Swift",
      "Dzire",
      "Wagon R",
      "Ertiga",
      "Celerio",
      "Baleno",
      "Vitara Brezza",
      "S-Presso",
      "Ignis",
    ],
  },
  {
    company: "Hyundai",
    vehicles: [
      "select-your-model",
      "i20",
      "Creta",
      "Verna",
      "Venue",
      "Grand i10 Nios",
      "Aura",
      "Santro",
      "Kona Electric",
      "Elantra",
      "Tucson",
    ],
  },
  {
    company: "Tata Motors",
    vehicles: [
      "select-your-model",
      "Tiago",
      "Altroz",
      "Nexon",
      "Harrier",
      "Tigor",
      "Safari",
      "Hexa",
      "Gravitas",
      "Punch",
      "Sumo",
    ],
  },
  {
    company: "Mahindra & Mahindra",
    vehicles: [
      "select-your-model",
      "Scorpio",
      "XUV500",
      "Thar",
      "Bolero",
      "KUV100 NXT",
      "TUV300",
      "Marazzo",
      "Verito",
      "Alturas G4",
      "Xylo",
    ],
  },
  {
    company: "Kia Motors",
    vehicles: [
      "select-your-model",
      "Seltos",
      "Carnival",
      "Sonet",
      "Stinger",
      "Rio",
      "K5",
      "K900",
      "Sportage",
      "Niro",
      "Optima",
    ],
  },
  {
    company: "Toyota Kirloskar",
    vehicles: [
      "select-your-model",
      "Fortuner",
      "Innova Crysta",
      "Glanza",
      "Camry",
      "Vellfire",
      "Yaris",
      "Urban Cruiser",
      "Land Cruiser",
      "Etios",
      "Corolla Altis",
    ],
  },
  {
    company: "Honda Cars India",
    vehicles: [
      "select-your-model",
      "Honda City",
      "Honda Civic",
      "Honda Amaze",
      "Honda WR-V",
      "Honda Jazz",
      "Honda CR-V",
      "Honda Accord",
      "Honda BR-V",
      "Honda Brio",
      "Honda Mobilio",
    ],
  },
  {
    company: "Renault India",
    vehicles: [
      "select-your-model",
      "Renault Kwid",
      "Renault Triber",
      "Renault Duster",
      "Renault Captur",
      "Renault Kiger",
      "Renault Lodgy",
      "Renault Scala",
      "Renault Pulse",
      "Renault Fluence",
      "Renault Koleos",
    ],
  },
  {
    company: "Ford",
    vehicles: [
      "select-your-model",
      "Fiesta",
      "Focus",
      "Mustang",
      "F-150",
      "Explorer",
      "Escape",
      "Edge",
      "Bronco",
      "Maverick",
      "Ranger",
    ],
  },
  {
    company: "volkswagen",
    vehicles: [
      "select-your-model",
      "Golf",
      "Polo",
      "Passat",
      "Tiguan",
      "Jetta",
      "Arteon",
      "Touareg",
      "Atlas",
      "ID.4",
      "Up!",
    ],
  },
];

// function to create company options
// function  allow user to create company for the users
function createCompany(array, id) {
  const options = document.getElementById(id);
  while (options.hasChildNodes()) {
    // remove existing child elements
    options.firstChild.remove();
  }

  for (let i = 0; i < array.length; i++) {
    let option = document.createElement("option");
    option.setAttribute("value", array[i]["company"]);
    option.innerText = array[i]["company"];
    options.append(option);
  }
}

// function to create vehicles option

function createVehicle(array, id, model) {
  // function to append the  models of the vehicle according to the comapnay selected
  const options = document.getElementById(id);
  while (options.hasChildNodes()) {
    options.firstChild.remove(); // remove child elements
  }
  let finded = array.find((F) => F.company === model); // finding the comapany

  for (let i = 0; i < finded["vehicles"].length; i++) {
    // appending the model options
    let option = document.createElement("option");
    option.setAttribute("value", finded["vehicles"][i]);
    option.innerText = finded["vehicles"][i];
    options.append(option);
  }
}
//open profile
function openprofile(serviceName, bId) {
  // function enables user to open  the selected form
  var ser_cont, i, button;
  ser_cont = document.getElementsByClassName("container");
  for (i = 0; i < ser_cont.length; i++) {
    ser_cont[i].style.display = "none";
  }
  button = document.getElementsByClassName("button");
  for (i = 0; i < button.length; i++) {
    button[i].style.backgroundColor = "";
    button[i].style.color = "black";
  }
  document.getElementById(serviceName).style.display = "flex";
  document.getElementById(bId).style.backgroundColor = "black";
  document.getElementById(bId).style.color = "white";
  // document.getElementById(bId).style.color = "black";
}

// console.log(finded);

// for (let j = 0; j < finded["vehicles"].length; j++) {
//   console.log(finded["vehicles"][j]);
// }

// }
// createVehicles(, "");
// console.log(two_wheeler_company[1]["vehicles"]);

// function to disable Input feilds
// function dis(classes) {
//   let className = document.getElementsByClassName(classes);

//   for (let i = 0; i < className.length; i++) {
//     className[i].disabled = true;
//   }
// }
// let className = document.getElementsByClassName("profileClass");

// for (let i = 0; i < className.length; i++) {
//   className[i].disabled = true;
// }

// function for notification div
function showNotification(id, obj) {
  let mechanics = JSON.parse(localStorage.getItem("mechanics"));
  let bookMech = mechanics.find((e) => {
    if (e["user_id"] == obj["mechanicId"]) {
      return true;
    }
  });
  // create the outer div element with class "notification"
  const notificationDiv = document.createElement("div");
  notificationDiv.classList.add("notification");

  // create the "details" div element with class "details"
  const detailsDiv = document.createElement("div");
  detailsDiv.classList.add("details");

  // create the "mechDetail" div element with class "mechDetail"
  const mechDetailDiv = document.createElement("div");
  mechDetailDiv.classList.add("mechDetail");

  // create the "mech" div element with class "mech"
  const mechDiv = document.createElement("div");
  mechDiv.classList.add("mech");

  // create the image element and set its source attribute to an empty string
  const imgElem = document.createElement("img");
  imgElem.setAttribute("src", bookMech["profile_pic"]);

  // create the "distance" span element with class "material-symbols-outlined navigate"
  const distanceSpan = document.createElement("span");
  distanceSpan.classList.add("material-symbols-outlined", "navigate");
  distanceSpan.textContent = " distance ";

  // create the "info" span element with class "material-symbols-outlined"
  const infoSpan = document.createElement("span");
  infoSpan.classList.add("material-symbols-outlined");
  infoSpan.textContent = " info ";

  // append the image and two span elements to the "mech" div element
  mechDiv.appendChild(imgElem);
  mechDiv.appendChild(distanceSpan);
  mechDiv.appendChild(infoSpan);

  // create the "p" element and set its text content to "Your mechanic is arriving soon"
  const mechP = document.createElement("p");
  mechP.textContent = "Your mechanic is arriving soon";

  // append the "mech" div and "p" element to the "mechDetail" div
  mechDetailDiv.appendChild(mechDiv);
  mechDetailDiv.appendChild(mechP);

  // create the "otp" div element with class "otp"
  const otpDiv = document.createElement("div");
  otpDiv.classList.add("otp");

  // create the "h3" element and set its text content to "Your Otp : 3030"
  const otpH3 = document.createElement("h3");
  otpH3.textContent = "Your Otp : " + obj["OTP"];

  // create the "p" element and set its text content to "Don't share with anyone"
  const otpP = document.createElement("p");
  otpP.textContent = "Don't share with anyone";

  // append the "h3" and "p" elements to the "otp" div
  otpDiv.appendChild(otpH3);
  otpDiv.appendChild(otpP);

  // append the "mechDetail" and "otp" divs to the "details" div
  detailsDiv.appendChild(mechDetailDiv);
  detailsDiv.appendChild(otpDiv);

  // create the "button" div element with class "button"
  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("button");

  // create the "Call" button element with a "phone_forwarded" icon and "Call" text content
  const callButton = document.createElement("button");
  const callIcon = document.createElement("span");
  callIcon.classList.add("material-symbols-outlined");
  callIcon.textContent = " phone_forwarded ";
  callButton.appendChild(callIcon);
  const call = document.createElement("a");
  call.setAttribute("href", "tel:" + bookMech["number"]);
  call.innerText = "Call";

  callButton.appendChild(call);
  buttonDiv.append(callButton);

  // create the "Cancel" button element with a "cancel" icon, red background color, and "Cancel" text content
  const cancelButton = document.createElement("button");
  const cancelIcon = document.createElement("span");
  cancelIcon.classList.add("material-symbols-outlined");
  cancelIcon.innerText = " cancel ";
  cancelButton.appendChild(cancelIcon);
  cancelButton.appendChild(document.createTextNode("Cancel"));
  cancelButton.setAttribute("id", "cancel");

  buttonDiv.append(cancelButton);
  notificationDiv.append(detailsDiv);
  notificationDiv.append(buttonDiv);

  let apend = document.querySelector(id);
  apend.append(notificationDiv);
}

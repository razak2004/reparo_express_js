// getting logged user's id from local storage
const cus = JSON.parse(localStorage.getItem("oneUser"));
// getting  user data who are already present in local storage
let customers = JSON.parse(localStorage.getItem("users"));
// getting the Customers vehicle data from the local storage
let Customer_vehicles = JSON.parse(localStorage.getItem("Customer_vehicles"));
// getting mechanic data from the local storage =
let mechanics = JSON.parse(localStorage.getItem("mechanics"));
// getting workshop data of mechanics from  local storage
const workshops = JSON.parse(localStorage.getItem("workshops"));
// getting the service data which mechanic done
let services = JSON.parse(localStorage.getItem("mechServices"));

// getting the logged user's object from the user data
let log_cus = customers.find((e) => {
  if (e["user_id"] === cus) {
    return true;
  }
});

// getting the logged user's vehicle  object from the vehicle data
let cus_vehicle = Customer_vehicles.find((e) => {
  if (e["CustomerId"] === cus) {
    return true;
  }
});
// selected vehicle type workshops
let workshopVehicleType = workshops.filter((e) => {
  if (cus_vehicle["vehicleType"] == e["workshopType"]) {
    return true;
  }
});
// selected workshop location
let workshopLocation = workshopVehicleType.filter((e) => {
  if (log_cus["city"] == e["workshopCity"]) {
    return true;
  }
});

// creates workshop card to show to users
function createWorkshop(arr, id) {
  try {
    // looping for creating dynamic cards for the workshops
    for (let i = 0; i < arr.length; i++) {
      // Creating work shop card
      let card = document.createElement("div");
      card.setAttribute("class", "shopDiv");
      // Creating work shop card's image
      let card_image = document.createElement("img");
      card_image.setAttribute("src", arr[i]["workshopImage"]);
      card_image.setAttribute("alt", "workshopImage");
      // appending image to the card
      card.append(card_image);
      // Creating work shop card's description
      let card_description = document.createElement("div");
      card_description.setAttribute("class", "desc");
      // appending description to the card
      card.append(card_description);
      // Creating work shop inner descriptions
      let card_in_desc = document.createElement("div");

      card_in_desc.setAttribute("class", "desc_top");

      //appending to the description
      card_description.append(card_in_desc);

      // Creating work shop card's title
      let workShop_title = document.createElement("h3");
      workShop_title.innerText = arr[i]["workshopName"];
      card_in_desc.append(workShop_title);
      //Creating book marks
      let bookMarkButton = document.createElement("button");
      let bookMark = document.createElement("i");
      bookMark.setAttribute("class", "material-symbols-outlined");
      bookMark.innerText = "bookmark";
      bookMarkButton.append(bookMark);
      card_in_desc.append(bookMarkButton);
      // appending to the outer div

      //container

      let card_des_container = document.createElement("div");
      card_des_container.setAttribute("class", "descContainer");
      card_description.append(card_des_container);

      //left

      let left_cont = document.createElement("div");
      left_cont.setAttribute("class", "desc_left");
      card_des_container.append(left_cont);
      // ratings
      let ratings = document.createElement("p");
      ratings.innerText = "ratings";

      let ratingStar = document.createElement("p");
      ratingStar.innerText = "⭐⭐⭐⭐⭐";

      left_cont.append(ratings);
      left_cont.append(ratingStar);

      //right

      let right_cont = document.createElement("div");
      right_cont.setAttribute("class", "desc_right");
      card_des_container.append(right_cont);

      //location

      let location_p = document.createElement("p");
      location_p.innerText = arr[i]["workshopCity"];
      right_cont.appendChild(location_p);

      //open or close

      let Open_div = document.createElement("div");
      Open_div.setAttribute("class", "rightO_C");
      right_cont.append(Open_div);

      let open = document.createElement("p");
      open.innerText = "Open";
      Open_div.append(open);

      let slash = document.createElement("p");
      slash.innerText = "/";
      Open_div.append(slash);

      let close = document.createElement("p");
      close.innerText = "Closed";
      Open_div.append(close);

      //bottom

      let cont_bottom = document.createElement("div");
      cont_bottom.setAttribute("class", "desc_bottom");
      card_description.append(cont_bottom);

      //button
      // while clicking the view button the current view of the card will be gone
      // and detail veiw of the workshop will be appear
      // while clicking the call button you are  able to call the workshop's owner
      // while clicking the direction button you are able to see the workshop's location
      let view = document.createElement("button"); // view button
      view.setAttribute(
        "onclick",
        "workshopDetail(" + arr[i]["workshopId"] + ")"
      );
      let call = document.createElement("button");
      let direction = document.createElement("button");
      // appending the buttons to the container
      cont_bottom.append(view);
      cont_bottom.append(call);
      cont_bottom.append(direction);
      // creating icons for the buttons
      let view_icon = document.createElement("i");
      let call_icon = document.createElement("i");
      let direction_icon = document.createElement("i");

      view_icon.setAttribute("class", "material-symbols-outlined");
      call_icon.setAttribute("class", "material-symbols-outlined");
      direction_icon.setAttribute("class", "material-symbols-outlined");

      view_icon.innerHTML = "visibility";
      call_icon.innerHTML = "call";
      direction_icon.innerHTML = "pin_drop";

      let view_p = document.createElement("p");
      let call_p = document.createElement("a");
      call_p.setAttribute("href", "tel:" + arr[i]["workshopNumber"]);
      let direction_p = document.createElement("a"); // direction button
      direction_p.setAttribute(
        "href",
        "https://www.google.com/maps/search/" +
          arr[i]["workshopAddress"] +
          "," +
          arr[i]["workshopCity"]
      );

      view_p.innerText = "view";
      call_p.innerText = "call";
      direction_p.innerText = "direction";

      view.append(view_icon);
      view.append(view_p);

      call.append(call_icon);
      call.append(call_p);

      direction.append(direction_icon);
      direction.append(direction_p);

      // appending the card  to the html container
      let appendOf = document.getElementById(id);
      appendOf.append(card);
    }
  } catch (error) {}
}

createWorkshop(workshopLocation, "nearByShops"); // creating workshops cards

// this function allows the user to delete their account
function delUser() {
  // confirmation of the deletion of their account
  let conform = confirm("Would u like to delete your account");
  // if the really wants to delete the conform will have a boolean true
  if (conform == true) {
    let deletedUser = [];
    // creating an array for the deleted users
    if (localStorage.getItem("deletedUser") != null) {
      // if there is already delete user data available it will store in deleted user array
      deletedUser = JSON.parse(localStorage.getItem("deletedUser"));
    }
    let index = customers.indexOf(log_cus); // finding the index of the logged user
    // saving the user into the deleted array
    deletedUser.push(log_cus);
    // storing into the local storage
    localStorage.setItem("deletedUser", JSON.stringify(deletedUser));
    // deleting the logged user from the customers array
    customers.splice(index, 1);
    // storing the user data into the local storage
    localStorage.setItem("users", JSON.stringify(customers));
    alert("your account deleted successfully");
    // redirecting to the index page
    window.location.href = "../../index.html";
  }
}

//details of the workshops
// this function enable the user to see the details of the workshop they visited
// this function accepts workshop id as a parameters
function workshopDetail(id) {
  const detailPage = document.querySelector(".workshopDetails");
  detailPage.style.display = "flex";
  // finding the selected mechanic from mechanic data
  let selectWorkshop = workshops.find((e) => {
    if (e["workshopId"] == id) {
      return true;
    }
  });
  // finding the selected mechanic from mechanic data
  let selectmechanic = mechanics.find((e) => {
    if (e["WorkshopId"] == id) {
      return true;
    }
  });
  // finding the selected service  from service data
  let selectService = services.find((e) => {
    if (e["workshopId"] == id) {
      return true;
    }
  });
  console.log(selectmechanic);
  // using the found data showing to the user respectively
  // appending workshop
  // image
  const workshopImageDetail = document.getElementById("workshopImageDetail");
  workshopImageDetail.setAttribute("src", selectWorkshop["workshopImage"]);
  // workshop name
  const workName = document.getElementById("workName");
  workName.innerText = selectWorkshop["workshopName"];
  // started
  const Started = document.getElementById("Started");
  Started.innerText = "Started On " + selectWorkshop["startedOn"];
  // open timing
  const openT = document.getElementById("openT");
  openT.innerText = "Open @ " + selectWorkshop["openTiming"];
  // close timing
  const closeT = document.getElementById("closeT");
  closeT.innerText = "Close @ " + selectWorkshop["closeTiming"];

  // workshop description

  const type = document.getElementById("type");
  type.innerText = selectWorkshop["workshopType"];

  const city = document.getElementById("city");
  city.innerText = selectWorkshop["workshopCity"];

  // apending mechanic details
  // mechanic Image
  const mechanicImage = document.getElementById("mechanicImage");
  mechanicImage.setAttribute("src", selectmechanic["profile_pic"]);
  // mechanic name
  const mechName = document.getElementById("mechName");
  mechName.innerText = selectmechanic["name"];
  // mechanic number
  const mechPhone = document.getElementById("mechPhone");
  mechPhone.innerText = selectmechanic["number"];
  // mechanic Email
  const mechEmail = document.getElementById("mechEmail");
  mechEmail.innerText = selectmechanic["email"];
  // mechanic Email
  const mechExperience = document.getElementById("mechExperience");
  // mechanic Experience
  mechExperience.innerText = selectmechanic["experience"];
  // mechanic Specialization
  const mechSpl = document.getElementById("mechSpl");
  mechSpl.innerText = selectmechanic["specialized"];

  const direction = document.getElementById("direction");
  direction.setAttribute(
    "href",
    "https://www.google.com/maps/search/" +
      selectWorkshop["workshopAddress"] +
      "," +
      selectWorkshop["workshopCity"]
  );
  // showing the service data to the customer
  const generalCost = document.getElementById("generalCost");
  generalCost.innerText = "Cost @ " + selectService["generalCost"];

  const standardCost = document.getElementById("standardCost");
  standardCost.innerText = "Cost @ " + selectService["standardCost"];
  const premeiumCost = document.getElementById("premeiumCost");
  premeiumCost.innerText = "Cost @ " + selectService["premeiumCost"];
  const fullbodyCost = document.getElementById("fullbodyCost");
  fullbodyCost.innerText = "Cost @ " + selectService["fullbodyCost"];
  const brkdownCost = document.getElementById("brkdownCost");
  brkdownCost.innerText = "Cost @ " + selectService["brkdownCost"];
  const bookingMechanicBtn = document.getElementById("bookingMechanicBtn");
  // by clicking this (bookMechanic) function user able to book mechanic with their user id and mechanic id
  bookingMechanicBtn.setAttribute(
    "onclick",
    "bookMechanic(" + log_cus["user_id"] + "," + selectmechanic["user_id"] + ")"
  );
}

function exitDetail() {
  // this function enable user to exit woirkshop detail page
  const detailPage = document.querySelector(".workshopDetails");
  detailPage.style.display = "none";
}

function exitBookMechanic() {
  // this function enable user to exit booking  page
  const book_div = document.getElementById("book_div");
  book_div.style.display = "none";
}

// services
const maintanceService = [
  "Oil change",
  "Brake adjustment",
  "Tire pressure check",
  "Battery replacement",
  "Headlight bulb replacement",
  "Taillight bulb replacement",
  "Indicator bulb replacement",
  "Clutch cable adjustment",
  "Throttle cable adjustment",
  "Engine tuning",
  "Engine oil top-up",
  "Coolant top-up",
  "Brake fluid top-up",
  "Power steering fluid top-up",
  "Gearbox oil top-up",
  "Transmission oil top-up",
  "Fuel filter replacement",
  "Fuel tank cleaning",
  "Fuel injector cleaning",
  "Ignition system check",
  "Suspension check",
  "Wheel alignment",
  "Seat height adjustment",
  "Air filter replacement",
  "Spark plug replacement",
];

const repairService = [
  "Brake pad replacement",
  "Brake disc replacement",
  "Fuel pump replacement",
  "Fuel tank replacement",
  "Alternator replacement",
  "Starter motor replacement",
  "Radiator replacement",
  "Coolant hose replacement",
  "Thermostat replacement",
  "Fan belt replacement",
  "Drive belt replacement",
  "Timing belt replacement",
  "Timing chain replacement",
  "Head gasket replacement",
  "Valve adjustment",
  "Transmission rebuild",
  "Brake caliper rebuild",
  "Steering rack replacement",
  "Shock absorber replacement",
  "Suspension bushing replacement",
  "CV joint replacement",
  "Drive shaft replacement",
  "Wheel bearing replacement",
  "Power steering pump replacement",
  "Windshield replacement",
  "Window regulator replacement",
  "Door lock actuator replacement",
  "Oxygen sensor replacement",
  "Mass air flow sensor replacement",
  "Camshaft position sensor replacement",
  "Crankshaft position sensor replacement",
  "Knock sensor replacement",
  "Fuel pressure regulator replacement",
];

const upgrade = [
  "Performance exhaust installation",
  "High-performance air filter installation",
  "Performance ECU tuning",
  "Bigger carburetor installation",
  "Custom suspension installation",
  "Aftermarket shock absorber installation",
  "Big bore kit installation",
  "Performance camshaft installation",
  "Custom paint job",
  "LED lighting upgrade",
  "Aftermarket seat installation",
  "Saddlebag installation",
  "Windshield installation",
  "Engine guard installation",
  "High-performance brake upgrade",
  "Aftermarket wheel installation",
  "Engine swap",
  "Handlebar upgrade",
  "Fender eliminator kit installation",
  "Upgraded chain and sprocket installation",
];

const electric = [
  "Battery replacement",
  "Alternator replacement",
  "Starter motor replacement",
  "Spark plug replacement",
  "Ignition coil replacement",
  "Regulator/Rectifier replacement",
  "Stator replacement",
  "Headlight bulb replacement",
  "Taillight bulb replacement",
  "Indicator bulb replacement",
  "Turn signal switch replacement",
  "Ignition switch replacement",
  "Horn repair or replacement",
  "Fuel gauge repair or replacement",
  "Speedometer repair or replacement",
  "Tachometer repair or replacement",
  "Wiring harness repair or replacement",
  "Fuse replacement",
  "Relay replacement",
  "ECU replacement or programming",
];

//function to append the list of services
function appendList(array, id, cls) {
  for (let i = 0; i < array.length; i++) {
    // loop for the multiple service
    let container = document.createElement("div");
    container.setAttribute("class", cls);
    let bolt = document.createElement("span"); // icon
    bolt.setAttribute("class", "material-symbols-outlined");
    bolt.innerText = "bolt";
    container.append(bolt);
    let service = document.createElement("p");
    service.innerText = array[i]; // service name
    container.append(service);
    let cont_append = document.querySelector(id);
    cont_append.append(container); // appending the services into the container
  }
}
// geting the html element of the service container
const bookingService = document.getElementById("book_select_service");
// adding event listener to listen the event of change
bookingService.addEventListener("change", (e) => {
  const options = document.querySelector(".serviceSelector");
  // const price = document.querySelector("#price");
  while (options.hasChildNodes()) {
    // while there is an service it will remove and append the selected list of services
    options.firstChild.remove();
  }
  let targetService = e.target.value;
  if (targetService == "maintance") {
    appendList(maintanceService, ".serviceSelector", "selectService");
    // price.innerText = selectService["generalCost"];
  }
  if (targetService == "Repair") {
    appendList(repairService, ".serviceSelector", "selectService");
    // price.innerText = selectService["standardCost"];
  }
  if (targetService == "Upgrade") {
    appendList(upgrade, ".serviceSelector", "selectService");
    // price.innerText = selectService["premeiumCost "];
  }
  if (targetService == "Electrical") {
    appendList(electric, ".serviceSelector", "selectService");
    // price.innerText = selectService["generalCost"];
  }
});
// appending the service
appendList(electric, "#general", "serviceContent");
appendList(maintanceService, "#brkdown", "serviceContent");
appendList(repairService, "#standard", "serviceContent");
appendList(upgrade, "#premieum", "serviceContent");
appendList(electric, "#full", "serviceContent");

// function for booking mechanic  ;

function bookMechanic(customerId, mechanicId) {
  const book_div = document.getElementById("book_div");
  book_div.style.display = "flex";
  // let mechanics = JSON.parse(localStorage.getItem("mechanics"));
  // let customers = JSON.parse(localStorage.getItem("users"));
  // let Customer_vehicles = JSON.parse(localStorage.getItem("Customer_vehicles"));
  // let selectService = JSON.parse(localStorage.getItem("mechServices"));

  // geting the data of the looged user
  let bookingUser = customers.find((e) => {
    if (customerId == e["user_id"]) {
      return true;
    }
  });
  // geting the data of the looged user's  vehicle

  let customerVehicle = Customer_vehicles.find((e) => {
    if (customerId === e["CustomerId"]) {
      return true;
    }
  });
  // and the  mechanic which they trying to book
  let bookingMechanic = mechanics.find((e) => {
    if (mechanicId == e["user_id"]) {
      return true;
    }
  });

  // geting accessing the html element and showimng the respecting details
  // const mechBookname = document.getElementById("mechBookname");
  // mechBookname.innerText = bookingMechanic["name"];
  // const mechSplIn = document.getElementById("mechSplIn");
  // mechSplIn.innerText = bookingMechanic["specialized"];
  // const mechExp = document.getElementById("mechExp");
  // mechExp.innerText = bookingMechanic["experience"];
  // const mechNum = document.getElementById("mechNum");
  // mechNum.innerText = bookingMechanic["number"];
  // const mechanicEmail = document.getElementById("mechanicEmail");
  // mechanicEmail.innerText = bookingMechanic["email"];
  // const mechImage = document.getElementById("mechImage");
  // mechImage.setAttribute("src", bookingMechanic["profile_pic"]);

  // const custName = document.getElementById("custName");
  // custName.innerText = bookingUser["name"];
  // const custNum = document.getElementById("custNum");
  // custNum.innerText = bookingUser["number"];
  // const custEmail = document.getElementById("custEmail");
  // custEmail.innerText = bookingUser["email"];
  // const custAddress = document.getElementById("custAddress");
  // custAddress.innerText = bookingUser["address"];
  // const custCity = document.getElementById("custCity");
  // custCity.innerText = bookingUser["city"];

  // const vehicleCompany = document.getElementById("vehicleCompany");
  // vehicleCompany.innerText = customerVehicle["VehicleCompany"];
  // const vehicleModel = document.getElementById("vehicleModel");
  // vehicleModel.innerText = customerVehicle["vehicleModel"];
  // const vehicleYear = document.getElementById("vehicleYear");
  // vehicleYear.innerText = customerVehicle["vehicleYear"];
  // const vehicleNumber = document.getElementById("vehicleNumber");
  // vehicleNumber.innerText = customerVehicle["vehicleNumber"];
  // const vehiclefuel = document.getElementById("vehiclefuel");
  // vehiclefuel.innerText = customerVehicle["fuelType"];

  // const conBtn = document.getElementById("confirmBtn");
  // conBtn.setAttribute(
  //   "onclick",
  //   "confirmBookingBtn(" + customerId + "," + mechanicId + ")"
  // );
  // Get the HTML elements by their IDs
  const mechBookname = document.getElementById("mechBookname"); // mechanic's name
  const mechSplIn = document.getElementById("mechSplIn"); // mechanic's specialization
  const mechExp = document.getElementById("mechExp"); // mechanic's experience
  const mechNum = document.getElementById("mechNum"); // mechanic's contact number
  const mechanicEmail = document.getElementById("mechanicEmail"); // mechanic's email
  const mechImage = document.getElementById("mechImage"); // mechanic's profile picture
  const custName = document.getElementById("custName"); // customer's name
  const custNum = document.getElementById("custNum"); // customer's contact number
  const custEmail = document.getElementById("custEmail"); // customer's email
  const custAddress = document.getElementById("custAddress"); // customer's address
  const custCity = document.getElementById("custCity"); // customer's city
  const vehicleCompany = document.getElementById("vehicleCompany"); // customer's vehicle company
  const vehicleModel = document.getElementById("vehicleModel"); // customer's vehicle model
  const vehicleYear = document.getElementById("vehicleYear"); // customer's vehicle year
  const vehicleNumber = document.getElementById("vehicleNumber"); // customer's vehicle number
  const vehiclefuel = document.getElementById("vehiclefuel"); // customer's vehicle fuel type
  const conBtn = document.getElementById("confirmBtn"); // confirmation button

  // Set the text/content of the HTML elements using data from an object called "bookingMechanic"
  mechBookname.innerText = bookingMechanic["name"]; // set the mechanic's name
  mechSplIn.innerText = bookingMechanic["specialized"]; // set the mechanic's specialization
  mechExp.innerText = bookingMechanic["experience"]; // set the mechanic's experience
  mechNum.innerText = bookingMechanic["number"]; // set the mechanic's contact number
  mechanicEmail.innerText = bookingMechanic["email"]; // set the mechanic's email
  mechImage.setAttribute("src", bookingMechanic["profile_pic"]); // set the mechanic's profile picture

  // Set the text/content of the HTML elements using data from an object called "bookingUser"
  custName.innerText = bookingUser["name"]; // set the customer's name
  custNum.innerText = bookingUser["number"]; // set the customer's contact number
  custEmail.innerText = bookingUser["email"]; // set the customer's email
  custAddress.innerText = bookingUser["address"]; // set the customer's address
  custCity.innerText = bookingUser["city"]; // set the customer's city

  // Set the text/content of the HTML elements using data from an object called "customerVehicle"
  vehicleCompany.innerText = customerVehicle["VehicleCompany"]; // set the customer's vehicle company
  vehicleModel.innerText = customerVehicle["vehicleModel"]; // set the customer's vehicle model
  vehicleYear.innerText = customerVehicle["vehicleYear"]; // set the customer's vehicle year
  vehicleNumber.innerText = customerVehicle["vehicleNumber"]; // set the customer's vehicle number
  vehiclefuel.innerText = customerVehicle["fuelType"]; // set the customer's vehicle fuel type

  // Set an onclick function to the confirmation button using the customer and mechanic IDs
  conBtn.setAttribute(
    "onclick",
    "confirmBookingBtn(" + customerId + "," + mechanicId + ")"
  );
}
// function to confirm button
function confirmBookingBtn(custId, servId) {
  let book_select_service = document.getElementById("book_select_service");
  let type = book_select_service.value;

  confirmBookMech(custId, servId, type);
}

// function to raise request
function confirmBookMech(cusId, mechId, type) {
  //confirming booking
  let con = confirm("Are you sure to book mechanic");
  if (con == true) {
    const serviceArr = JSON.parse(localStorage.getItem("mechServices"));
    // finding booked service from customer
    const bookedSer = serviceArr.find((e) => {
      if (e["mechanicId"] == mechId) {
        return true;
      }
    });
    let customerId = cusId;
    let mechanicId = mechId;
    let bookingId = Date.now();
    let cusActivityId = bookingId + 1;
    let date = new Date();
    let request = true;
    console.log(bookedSer);

    let cost = 0;
    // checking and assigning the cost of service
    if (type == "maintance") {
      cost = bookedSer["generalCost"];
    } else if (type == "Repair") {
      cost = bookedSer["standardCost"];
    } else if (type == "Upgrade") {
      cost = bookedSer["premeiumCost"];
    } else if (type == "Electrical") {
      cost = bookedSer["generalCost"];
    }
    //assigning as an object
    let booking = {
      customerId,
      mechanicId,
      bookingId,
      date,
      cost,
      type,
      request,
      cusActivityId,
    };

    // pushing into activity array
    // create booking array
    let bookings = [];
    if (JSON.parse(localStorage.getItem("bookings")) != null) {
      // if already exists we have storing it
      bookings = JSON.parse(localStorage.getItem("bookings"));
    }
    // create customer's  Activity
    let custActivity = {
      bookingId: booking["bookingId"],
      customerId: booking["customerId"],
    };
    // pushing the booking data into bookings array
    bookings.push(booking);
    // creates customer Activity object
    let customerActivity = {};
    customerActivity["activity"] = [];
    customerActivity["notification"] = [];

    if (JSON.parse(localStorage.getItem("customerActivity")) != null) {
      // storing the existing data of the customer's activity
      customerActivity = JSON.parse(localStorage.getItem("customerActivity"));
    }
    // pushing the activity of the customer in the activity array

    customerActivity["activity"].push(custActivity);
    // setting the data of booking and the activity into local storage
    localStorage.setItem("bookings", JSON.stringify(bookings));
    localStorage.setItem("customerActivity", JSON.stringify(customerActivity));

    //  this function helps to  sending  and accepting the request of the customer   to the mechanic
    mechRequest(booking);
    // this function helps the user to see the booking status
    bookingSts(booking);
  } else {
    return;
  }
}

//function to send the request from  customer to mechanic
function mechRequest(obj) {
  // created the object of notification to show thw request of the customer
  let notification = {
    notificationId: obj["cusActivityId"] + 1, // assinging the data to the object
    notificationType: "booking",
    raisedStatus: true,
    raisedMechId: obj["mechanicId"],
    raisedBookingId: obj["bookingId"],
    notificationSeen: false,
    acceptBooking: false,
  };
  // creates the object of mechanic object

  let mechActivity = {
    notification: [],
    activity: [],
  };

  if (JSON.parse(localStorage.getItem("mechActivity")) != null) {
    // if activity already present stores into the variable
    mechActivity = JSON.parse(localStorage.getItem("mechActivity"));
  }

  // to notify mechanic about the raised request
  mechActivity.notification.push(notification);
  // setting up to the local storge
  localStorage.setItem("mechActivity", JSON.stringify(mechActivity));
}

// dom for booking status
function bookingSts(obj) {
  // const bookingStatus = document.querySelector(".bookingStatus");
  // bookingStatus.style.display = "flex";
  // const book_div = document.getElementById("book_div");
  // book_div.style.display = "none";
  // const mechs = JSON.parse(localStorage.getItem("mechanics"));
  // const vehicles = JSON.parse(localStorage.getItem("Customer_vehicles"));
  // let bookMech = mechs.find((e) => {
  //   if (e["user_id"] == obj["mechanicId"]) {
  //     return true;
  //   }
  // });
  // let bookVehicle = vehicles.find((e) => {
  //   if (e["CustomerId"] == obj["customerId"]) {
  //     return true;
  //   }
  // });

  // Get the element with class "bookingStatus"
  const bookingStatus = document.querySelector(".bookingStatus");

  // Set the CSS display property of the bookingStatus element to "flex"
  bookingStatus.style.display = "flex";

  // Get the element with ID "book_div"
  const book_div = document.getElementById("book_div");

  // Set the CSS display property of the book_div element to "none"
  book_div.style.display = "none";

  // Find the mechanic object that matches the mechanic ID in the input object
  let bookMech = mechanics.find((e) => {
    if (e["user_id"] == obj["mechanicId"]) {
      return true;
    }
  });

  // Find the customer vehicle object that matches the customer ID in the input object
  let bookVehicle = Customer_vehicles.find((e) => {
    if (e["CustomerId"] == obj["customerId"]) {
      return true;
    }
  });

  // create a new div element and assign it to the bookingContainer variable
  let bookingContainer = document.createElement("div");
  bookingContainer.setAttribute("class", "bookingStatus-container");
  let bookingMechDetails = document.createElement("div");
  bookingMechDetails.setAttribute("class", "mechBooking");
  // append bookingMechDetails to bookingContainer
  bookingContainer.append(bookingMechDetails);
  // showing mechanic image
  let mechImg = document.createElement("img");
  mechImg.setAttribute("src", bookMech["img"]);
  mechImg.setAttribute("alt", "mechanic img");
  bookingMechDetails.append(mechImg); // appending mechanic image
  // Creating mechanic details  and appending to the html
  let mechName = document.createElement("p");
  mechName.innerText = bookMech["name"];
  bookingMechDetails.append(mechName);
  let vehicleName = document.createElement("p");
  vehicleName.innerText =
    bookVehicle["vehicleModel"] + "," + bookVehicle["VehicleCompany"];
  bookingMechDetails.append(vehicleName);
  let service = document.createElement("p");
  service.innerText = "Service: " + obj["type"];
  bookingMechDetails.append(service);
  let serviceCost = document.createElement("p");
  serviceCost.innerText = "Cost: " + obj["cost"];
  bookingMechDetails.append(serviceCost);

  // cancel button
  let cancel = document.createElement("button");
  cancel.innerText = "Cancel Request";
  bookingMechDetails.append(cancel);

  // appending to outerdiv

  bookingStatus.append(bookingContainer);
}

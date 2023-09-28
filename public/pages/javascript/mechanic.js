const logMech = JSON.parse(localStorage.getItem("oneUser"));
let mechanics = JSON.parse(localStorage.getItem("mechanics"));
let log_cus = mechanics.find(function (e) {
  if (e["user_id"] == logMech) {
    return true;
  }
});
console.log(log_cus);
let workshops = JSON.parse(localStorage.getItem("workshops"));
let mechWorkshop = workshops.find((e) => {
  if (e["mechanicId"] === logMech) {
    return true;
  }
});
console.log(mechWorkshop);
let services = JSON.parse(localStorage.getItem("mechServices"));
let oneService = services.find((e) => {
  if (e["workshopId"] == mechWorkshop["workshopId"]) {
    return true;
  }
});
console.log(oneService);

let index = mechanics.indexOf(log_cus);
let mechWorkshopIndex = workshops.indexOf(mechWorkshop);
let serviceIndex = workshops.indexOf(oneService);

function openprofile(serviceName, bId) {
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
function openProServices(id) {
  let tag = document.getElementsByClassName("serviceList");
  for (let i = 0; i < tag.length; i++) {
    tag[i].style.display = "none";
  }
  document.getElementById(id).style.display = "flex";
}

// edit profile

function validatePrice(x, y) {
  y = document.getElementById(x);
  y.addEventListener("change", (e) => {
    e = y.value;
    let check = hasNumber(e);
    if (check === false) {
      Notify.error("price should not be in alphabets or special characters");
    }
    if (e.length > 6) {
      Notify.error("amount is not more than 100000");
    }
  });
}

function delUser() {
  let conform = confirm("Would u like to delete your account");
  if (conform === true) {
    let deletedUser = [];
    if (localStorage.getItem("deletedUser") != null) {
      deletedUser = JSON.parse(localStorage.getItem("deletedUser"));
    }
    deletedUser.push(log_cus);
    localStorage.setItem("deletedUser", JSON.stringify(deletedUser));
    mechanics.splice(index, 1);
    alert("your account deleted successfully");
    localStorage.setItem("mechanics", JSON.stringify(mechanics));
    window.location.href = "../../index.html";
  }
}

// create notification card function
function notificationCard(arr) {
  try {
    if (arr.length == 0) {
      let p = document.createElement("h1");
      p.innerText = "You didn't get any notification till now";
      let overallAppend = document.getElementById("notification");
      overallAppend.append(p);
    } else {
      const booking = JSON.parse(localStorage.getItem("bookings"));
      const customers = JSON.parse(localStorage.getItem("users"));
      const customerVehicles = JSON.parse(
        localStorage.getItem("Customer_vehicles")
      );
      for (let i = arr.length - 1; i >= 0; i--) {
        // outer div
        let bookingId = arr[i]["raisedBookingId"];
        let currentBook = booking.find((e) => {
          if (bookingId == e["bookingId"]) {
            return true;
          }
        });
        let bookedCustomer = customers.find((e) => {
          if (e["user_id"] == currentBook["customerId"]) {
            return true;
          }
        });
        let bookedVehicle = customerVehicles.find((e) => {
          if (bookedCustomer["vehicle_id"] == e["VehicleId"]) {
            return true;
          }
        });
        console.log(bookedVehicle);

        let notify = document.createElement("div");
        notify.setAttribute("class", "notify");
        //inner div - 1
        let separate = document.createElement("div");
        separate.setAttribute("class", "separate");
        notify.append(separate); //append to outer div
        //content of inner div
        let innerImg = document.createElement("img"); //customer img
        innerImg.setAttribute("src", bookedCustomer["image"]);
        innerImg.setAttribute("alt", "customerProfile");
        separate.append(innerImg);
        //details
        let contentContainer = document.createElement("div"); // detail container
        contentContainer.setAttribute("class", "container");
        separate.append(contentContainer);
        //value contianer for name
        let nameContainer = document.createElement("div");
        nameContainer.setAttribute("class", "content");
        // name icon
        let nameIcon = document.createElement("span");
        nameIcon.setAttribute("class", "material-symbols-outlined");
        nameIcon.innerText = "badge";
        nameContainer.append(nameIcon);
        // name
        let showName = document.createElement("p");
        showName.innerText = bookedCustomer["name"];
        nameContainer.append(showName);
        contentContainer.append(nameContainer); //appending to the content div
        //value contianer for company
        let companyContainer = document.createElement("div");
        companyContainer.setAttribute("class", "content");
        // company icon
        let companyIcon = document.createElement("span");
        companyIcon.setAttribute("class", "material-symbols-outlined");
        companyIcon.innerText = "emoji_transportation";
        companyContainer.append(companyIcon);
        // company
        let showCompany = document.createElement("p");
        showCompany.innerText = bookedVehicle["VehicleCompany"];
        companyContainer.append(showCompany);
        contentContainer.append(companyContainer); //appending to the content div
        //value contianer for model
        let modelContainer = document.createElement("div");
        modelContainer.setAttribute("class", "content");
        // model icon
        let modelIcon = document.createElement("span");
        modelIcon.setAttribute("class", "material-symbols-outlined");
        modelIcon.innerText = "emoji_transportation";
        modelContainer.append(modelIcon);
        // model
        let showmodel = document.createElement("p");
        showmodel.innerText = bookedVehicle["vehicleModel"];
        modelContainer.append(showmodel);
        contentContainer.append(modelContainer); //appending to the content div
        //value contianer for year
        let yearContainer = document.createElement("div");
        yearContainer.setAttribute("class", "content");
        // year icon
        let yearIcon = document.createElement("span");
        yearIcon.setAttribute("class", "material-symbols-outlined");
        yearIcon.innerText = "calendar_month";
        yearContainer.append(yearIcon);
        // year
        let showyear = document.createElement("p");
        showyear.innerText = bookedVehicle["vehicleYear"];
        yearContainer.append(showyear);
        //fuel icon
        let fuelIcon = document.createElement("span");
        fuelIcon.setAttribute("class", "material-symbols-outlined");
        fuelIcon.innerText = "local_gas_station";
        //fuel
        let showFuel = document.createElement("p");
        showFuel.innerText = bookedVehicle["fuelType"];
        yearContainer.append(fuelIcon);
        yearContainer.append(showFuel);
        contentContainer.append(yearContainer); //appending to the content div

        //inner div -  2
        let separate2 = document.createElement("div");
        separate2.setAttribute("class", "separate");
        // content
        let contentContainer2 = document.createElement("div");
        contentContainer2.setAttribute("class", "container");

        //value contianer for number
        let numberContainer = document.createElement("div");
        numberContainer.setAttribute("class", "content");
        // number icon
        let numberIcon = document.createElement("span");
        numberIcon.setAttribute("class", "material-symbols-outlined");
        numberIcon.innerText = "123";
        numberContainer.append(numberIcon);
        // number
        let shownumber = document.createElement("p");
        shownumber.innerText = bookedVehicle["vehicleNumber"];
        numberContainer.append(shownumber);
        contentContainer2.append(numberContainer); //appending to the content div
        //value contianer for service
        let serviceContainer = document.createElement("div");
        serviceContainer.setAttribute("class", "content");
        // service
        let showservice = document.createElement("p");
        showservice.innerText = "Service : " + currentBook["type"];
        serviceContainer.append(showservice);
        contentContainer2.append(serviceContainer); //appending to the content div
        //value contianer for address
        let addressContainer = document.createElement("div");
        addressContainer.setAttribute("class", "content");
        // address icon
        let addressIcon = document.createElement("span");
        addressIcon.setAttribute("class", "material-symbols-outlined");
        addressIcon.innerText = "home";
        addressContainer.append(addressIcon);
        // address
        let showaddress = document.createElement("p");
        showaddress.innerText = bookedCustomer["address"];
        addressContainer.append(showaddress);
        contentContainer2.append(addressContainer); //appending to the content div
        //value contianer for city
        let cityContainer = document.createElement("div");
        cityContainer.setAttribute("class", "content");
        // city icon
        let cityIcon = document.createElement("span");
        cityIcon.setAttribute("class", "material-symbols-outlined");
        cityIcon.innerText = "location_city";
        cityContainer.append(cityIcon);
        // city
        let showcity = document.createElement("p");
        showcity.innerText = bookedCustomer["city"];
        cityContainer.append(showcity);
        contentContainer2.append(cityContainer); //appending to the content div
        //overall append
        separate2.append(contentContainer2);

        //vehicle image
        let vehicleImg = document.createElement("img");
        vehicleImg.setAttribute("src", bookedVehicle["vehicleImage"]);
        vehicleImg.setAttribute("alt", "vehicleimage");
        separate2.append(vehicleImg);
        notify.append(separate2);

        //buttoncontainer
        let buttonContainer = document.createElement("div");
        buttonContainer.setAttribute("class", "buttonContain");
        if (currentBook["bookingStatus"] == true) {
          let buttonAccept = document.createElement("button");

          buttonAccept.innerText =
            "Booking Accepted on : " + currentBook["date"];
          buttonContainer.append(buttonAccept);
          buttonAccept.style.backgroundColor = "aqua";
          buttonAccept.style.width = "90%";
        } else if (currentBook["bookingStatus"] == false) {
          let buttonAccept = document.createElement("button");
          buttonAccept.innerText =
            "Booking rejected on : " + currentBook["date"];
          buttonContainer.append(buttonAccept);
          buttonAccept.style.backgroundColor = "red";
          buttonAccept.style.width = "90%";
          buttonAccept.style.color = "white";
        } else {
          // accept button
          let acceptButton = document.createElement("button");
          acceptButton.setAttribute("class", "accept");
          acceptButton.setAttribute(
            "onclick",
            "acceptBooking(" + currentBook["bookingId"] + ")"
          );
          //currency icon
          let currency = document.createElement("span");
          currency.setAttribute("class", "material-symbols-outlined");
          currency.innerText = "currency_rupee";
          acceptButton.append(currency);
          // amount
          let amount = document.createElement("p");
          amount.innerText = currentBook["cost"];
          acceptButton.append(amount);
          // accpet icon
          let acceptIcon = document.createElement("span");
          acceptIcon.setAttribute("class", "material-symbols-outlined");
          acceptIcon.innerText = "sync_saved_locally";
          acceptButton.append(acceptIcon);
          buttonContainer.append(acceptButton);
          // reject button
          let rejectButton = document.createElement("button");
          rejectButton.setAttribute("class", "reject");
          rejectButton.setAttribute(
            "onclick",
            "rejectBooking(" + currentBook["bookingId"] + ")"
          );
          //reject
          let reject = document.createElement("p");
          reject.innerText = "reject";
          rejectButton.append(reject);
          // icon
          let rejectIcon = document.createElement("span");
          rejectIcon.setAttribute("class", "material-symbols-outlined");
          rejectIcon.innerText = "cancel";
          rejectButton.append(rejectIcon);
          buttonContainer.append(rejectButton);
        }

        notify.append(buttonContainer);

        let overallAppend = document.getElementById("notification");
        overallAppend.append(notify);
      }
    }
  } catch (err) {}
}

const mechActivities = JSON.parse(localStorage.getItem("mechActivity"));
let mechNotifications = mechActivities["notification"];
let logMechActivities = mechNotifications.filter((e) => {
  if (e["raisedMechId"] == logMech) {
    return true;
  }
});

// notificationCard(logMechActivities);

// function to accept booking
function acceptBooking(id) {
  let con = confirm("Are you want to accept this request");
  let bookings = JSON.parse(localStorage.getItem("bookings"));
  let acceptBooking = bookings.find((e) => {
    if (e["bookingId"] == id) {
      return true;
    }
  });
  if (con == true) {
    acceptBooking["bookingStatus"] = true;
    acceptBooking["OTP"] = generateOTP();
    acceptBooking["otpStatus"] = false;
    let index = bookings.indexOf(acceptBooking);
    bookings[index] = acceptBooking;
    // customer Notification
    let cusAct = JSON.parse(localStorage.getItem("customerActivity"));
    let cusNotification = cusAct["notification"];
    let obj = {
      customerId: acceptBooking["customerId"],
      bookingId: acceptBooking["bookingId"],
      notificationId: Date.now(),
    };
    cusNotification.push(obj);

    localStorage.setItem("customerActivity", JSON.stringify(cusAct));
    //mechanic activity
    let mechActivity = JSON.parse(localStorage.getItem("mechActivity"));
    let mechanicAct = mechActivity["activity"];
    let mechanicActObj = {
      bookingId: acceptBooking["bookingId"],
      mechId: acceptBooking["mechanicId"],
    };
    mechanicAct.push(mechanicActObj);
    localStorage.setItem("mechActivity", JSON.stringify(mechActivity));
    // mechanic activity
    localStorage.setItem("bookings", JSON.stringify(bookings));
    window.location.href =
      "./mechActivity.html?bookingId=" + acceptBooking["bookingId"];
  }
}

//function to reject booking
function rejectBooking(id) {
  let con = confirm("Are you want to reject this request");
  let bookings = JSON.parse(localStorage.getItem("bookings"));
  const rejectBooking = bookings.find((e) => {
    if (e["bookingId"] === id) {
      return true;
    }
  });
  if (con == true) {
    rejectBooking["bookingStatus"] = false;
    console.log(bookings);

    let index = bookings.indexOf(rejectBooking);
    console.log(index);
    bookings[index] = rejectBooking;
    let cusAct = JSON.parse(localStorage.getItem("customerActivity"));
    let cusNotification = cusAct["notification"];
    let obj = {
      customerId: rejectBooking["customerId"],
      bookingId: rejectBooking["bookingId"],
      notificationId: Date.now(),
    };
    cusNotification.push(obj);
    localStorage.setItem("customerActivity", JSON.stringify(cusAct));

    localStorage.setItem("bookings", JSON.stringify(bookings));
  }
}

// function to generate otp
function generateOTP() {
  // Define a string of possible characters for the OTP
  const possibleChars = "0123456789";

  // Initialize an empty string to store the OTP
  let OTP = "";

  // Generate a random 4-digit number by picking a random character from the possibleChars string four times
  for (let i = 0; i < 4; i++) {
    OTP += possibleChars.charAt(
      Math.floor(Math.random() * possibleChars.length)
    );
  }

  // Return the OTP
  return OTP;
}

// Example usage:

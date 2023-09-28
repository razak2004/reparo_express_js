function getWorkshopByUserId(id) {
  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Define the URL for your Spring Boot GET endpoint
  var url = "http://localhost:8080/workshop/getWorkshopByUserId?userId=" + id;
  let user = {};
  // Configure the request
  xhr.open("GET", url, false);

  // Set up a callback function to handle the response
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Successful response
      var responseData = xhr.responseText;
      var jsonObject = eval("(" + responseData + ")");
      user = jsonObject;
      // console.log(parsedData);
    } else {
      // Error response
      console.error("Error:", xhr.statusText);
    }
  };

  // Set up a callback function to handle network errors
  xhr.onerror = function () {
    console.error("Network error occurred");
  };

  // Send the GET request
  xhr.send();
  return user;
}
function getUnAcceptedBooking(id) {
  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Define the URL for your Spring Boot GET endpoint
  var url =
    "http://localhost:8080/workshop/getAllUnAcceptedBooking?workshopId=" + id; // Replace with your actual endpoint URL

  let bookings = [];

  // Configure the request
  xhr.open("GET", url, false);

  // Set up a callback function to handle the response
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Successful response
      var responseData = xhr.responseText;
      bookings = JSON.parse(responseData);
    } else {
      // Error response
      console.error("Error:", xhr.statusText);
    }
  };

  // Set up a callback function to handle network errors
  xhr.onerror = function () {
    console.error("Network error occurred");
  };

  // Send the GET request
  xhr.send();
  return bookings;
}
function createBookingCard(obj, id, workshopId) {
  // Create the outer div element with the "bookingCard" class
  const bookingCard = document.createElement("div");
  bookingCard.classList.add("bookingCard");

  // Create and append the h4 element
  const heading = document.createElement("h4");
  heading.textContent = "Some One Needs Your Help";
  bookingCard.appendChild(heading);

  // Create and append the information div elements
  const infoDivs = [
    { icon: "badge", text: obj["vehicleInfo"]["userInfo"]["name"] },
    {
      icon: "directions_car",
      text:
        obj["vehicleInfo"]["vehicleCompany"] +
        "," +
        obj["vehicleInfo"]["vehicleModel"],
    },
    { icon: "dialpad", text: obj["vehicleInfo"]["vehicleNumber"] },
    { icon: "problem", text: obj["problem"] },
    { icon: "map", text: "Distance " + obj["distance"].toFixed(2) + " kms" },
  ];

  infoDivs.forEach((info) => {
    const infoDiv = document.createElement("div");
    infoDiv.classList.add("info");
    const iconSpan = document.createElement("span");
    iconSpan.classList.add("material-symbols-outlined");
    iconSpan.textContent = info.icon;
    infoDiv.appendChild(iconSpan);
    infoDiv.appendChild(document.createTextNode(info.text));
    bookingCard.appendChild(infoDiv);
  });

  // Create and append the button container div
  const btnContainer = document.createElement("div");
  btnContainer.classList.add("btnContainer");

  // Create and append the "pin_drop" link
  const locationLink = document.createElement("a");
  locationLink.href =
    "https://www.google.com/maps/search/" + obj["bookedAddress"];
  const locationIcon = document.createElement("span");
  locationIcon.classList.add("material-symbols-outlined");
  locationIcon.textContent = "pin_drop";
  locationLink.appendChild(locationIcon);
  locationLink.appendChild(document.createTextNode("location"));
  btnContainer.appendChild(locationLink);

  // Create and append the "phone_in_talk" link
  const callLink = document.createElement("a");
  callLink.href = "tel:+91" + obj["vehicleInfo"]["userInfo"]["number"];
  const callIcon = document.createElement("span");
  callIcon.classList.add("material-symbols-outlined");
  callIcon.textContent = "phone_in_talk";
  callLink.appendChild(callIcon);
  callLink.appendChild(document.createTextNode("Call"));
  btnContainer.appendChild(callLink);

  // Create and append the button container for "Accept" and "Reject" buttons
  const actionBtnContainer = document.createElement("div");
  actionBtnContainer.classList.add("btnContainer");

  // Create and append the "Accept" button
  const acceptButton = document.createElement("button");
  acceptButton.addEventListener("click", () => {
    acceptBooking(workshopId, obj["bookingId"]);
  });
  acceptButton.id = "acceptButton";
  const acceptIcon = document.createElement("span");
  acceptIcon.classList.add("material-symbols-outlined");
  acceptIcon.textContent = "verified";
  acceptButton.appendChild(acceptIcon);
  acceptButton.appendChild(document.createTextNode("Accept"));
  actionBtnContainer.appendChild(acceptButton);

  // Create and append the "Reject" button
  const rejectButton = document.createElement("button");
  rejectButton.id = "cancelButton";
  rejectButton.textContent = "Reject";
  rejectButton.addEventListener("click", () => {
    let con = confirm("Are you sure to cancel this Booking");
    if (con) {
      let s = cancelBooking(obj["bookingId"], "workshop");
      // localStorage.removeItem("")
    }
  });
  actionBtnContainer.appendChild(rejectButton);

  // Append the button container for "Accept" and "Reject" buttons to the main card
  bookingCard.appendChild(btnContainer);
  bookingCard.appendChild(actionBtnContainer);

  const appendObj = document.getElementById(id);
  // Append the main card to the document body or another container element
  appendObj.appendChild(bookingCard);
}
function generateOTP(length) {
  const charset = "0123456789";
  let otp = "";
  const charsetLength = charset.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charsetLength);
    otp += charset[randomIndex];
  }

  return otp;
}
function acceptBooking(workshopId, bookingId) {
  let con = confirm("Want to accept this booking");
  if (con) {
    let data = { workshopId, bookingId, otp: generateOTP(4) };

    const url = "http://localhost:8080/booking/acceptBooking";

    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();
    let booking = {};

    // Configure the request
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-Type", "application/json"); // Set the content type to JSON

    // Define a callback function to handle the response
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Successful response
        const response = xhr.responseText;
        booking = JSON.parse(response);
        console.log("response", booking);
      } else {
        // Error response
        console.error("Error:", xhr.statusText);
      }
    };

    // Define a callback function to handle network errors
    xhr.onerror = function () {
      console.error("Network error occurred");
    };
    // Send the POST request with the JSON data

    xhr.send(JSON.stringify(data));
    localStorage.setItem("liveAcceptedBookingId", booking["bookingId"]);
    window.location.reload();
  } else return;
}
function getBookingByIdApi(id) {
  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Define the URL for your Spring Boot GET endpoint
  var url = "http://localhost:8080/booking/getBookingById?bookingId=" + id; // Replace with your actual endpoint URL

  let bookings = {};

  // Configure the request
  xhr.open("GET", url, false);

  // Set up a callback function to handle the response
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Successful response
      var responseData = xhr.responseText;
      bookings = JSON.parse(responseData);
    } else {
      // Error response
      console.error("Error:", xhr.statusText);
    }
  };

  // Set up a callback function to handle network errors
  xhr.onerror = function () {
    console.error("Network error occurred");
  };

  // Send the GET request
  xhr.send();
  return bookings;
}
function createOtpCard(tag, obj) {
  // Create the OTP container div
  const otpContainer = document.createElement("div");
  otpContainer.className = "otp-container";

  // Create the heading
  const heading = document.createElement("h3");
  heading.textContent = "Enter OTP";

  // Create the "Cancel Booking" button
  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancel Booking";
  cancelButton.addEventListener("click", () => {
    let con = confirm("Are you sure to cancel this Booking");
    if (con) {
      let s = cancelBooking(obj["bookingId"], "workshop");
      // localStorage.removeItem("")
    }
  });

  // Append the button to the heading
  heading.appendChild(cancelButton);

  // Create the paragraph
  const paragraph = document.createElement("p");
  paragraph.textContent = "We have sent an OTP to Customer";

  // Create the OTP form
  const form = document.createElement("form");

  // Create a div to contain OTP input fields
  const otpInputsContainer = document.createElement("div");

  // Create OTP input fields
  for (let i = 1; i <= 4; i++) {
    const otpInput = document.createElement("input");
    otpInput.type = "text";
    otpInput.required = true;
    otpInput.className = "otp-input";
    otpInput.maxLength = 1;
    otpInput.id = "otp-input-" + i;
    otpInputsContainer.appendChild(otpInput);
  }

  // Create the "Verify" button
  const verifyButton = document.createElement("button");
  verifyButton.type = "submit";
  verifyButton.className = "otp-submit";
  verifyButton.textContent = "Verify";
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let num = "";
    for (let i = 1; i <= 4; i++) {
      num += document.getElementById("otp-input-" + i).value;
    }
    if (num == obj["otp"]) {
      let id = otpVerify(obj["bookingId"]);
      alert("Thanks For contacting our Customer");
      if (!isNaN(id)) window.location.reload();
    }
  });

  // Create the button container div
  const btnContainer = document.createElement("div");
  btnContainer.className = "btnContainer";

  // Create the "location" link
  const locationLink = document.createElement("a");
  locationLink.href = "";
  locationLink.innerHTML =
    '<span class="material-symbols-outlined"> near_me </span> location';

  // Create the "call" link
  const callLink = document.createElement("a");
  callLink.href = "";
  callLink.innerHTML =
    '<span class="material-symbols-outlined"> phone_in_talk </span> call';

  // Append elements to the button container
  btnContainer.appendChild(locationLink);
  btnContainer.appendChild(callLink);

  // Append all elements to the OTP container
  otpContainer.appendChild(heading);
  otpContainer.appendChild(paragraph);
  form.appendChild(otpInputsContainer);
  form.appendChild(verifyButton);
  otpContainer.appendChild(form);
  otpContainer.appendChild(btnContainer);

  // Append the OTP container to the document body or any other desired container
  document.querySelector(tag).appendChild(otpContainer);
}

function otpVerify(bookingId) {
  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Define the URL for your Spring Boot GET endpoint
  var url =
    "http://localhost:8080/service/createServiceList?bookingId=" + bookingId; // Replace with your actual endpoint URL

  let id;

  // Configure the request
  xhr.open("GET", url, false);

  // Set up a callback function to handle the response
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Successful response
      var responseData = xhr.responseText;
      id = responseData;
    } else {
      // Error response
      console.error("Error:", xhr.statusText);
    }
  };

  // Set up a callback function to handle network errors
  xhr.onerror = function () {
    console.error("Network error occurred");
  };

  // Send the GET request
  xhr.send();
  return id;
}

function createServiceDiv(obj, id) {
  // Create a div element with the "service" class
  const serviceDiv = document.createElement("div");
  serviceDiv.classList.add("service");

  // Create a span element for the "settings" icon
  const settingsIcon = document.createElement("span");
  settingsIcon.classList.add("material-symbols-outlined");
  settingsIcon.textContent = " settings ";

  // Create a paragraph element for the service name
  const serviceName = document.createElement("p");
  serviceName.textContent = obj["serviceName"];

  // Create an h3 element for the currency and amount
  const currencyIcon = document.createElement("span");
  currencyIcon.classList.add("material-symbols-outlined");
  currencyIcon.textContent = " currency_rupee ";

  const amount = document.createElement("h3");
  amount.appendChild(currencyIcon);
  amount.appendChild(document.createTextNode(obj["servicePrice"]));

  // Create two "i" elements for the "edit" and "delete" icons
  const editIcon = document.createElement("i");
  editIcon.classList.add("material-symbols-outlined");
  editIcon.textContent = " edit ";
  editIcon.addEventListener("click", () => {
    createUpdateServiceForm(obj);
  });

  const deleteIcon = document.createElement("i");

  deleteIcon.classList.add("material-symbols-outlined");
  deleteIcon.style.color = "#fe3044";
  deleteIcon.textContent = " delete ";

  deleteIcon.addEventListener("click", () => {
    // alert("chk");
    deleteServiceApi(obj["serviceId"]);
    window.location.reload();
  });

  // Append all elements to the serviceDiv
  serviceDiv.appendChild(settingsIcon);
  serviceDiv.appendChild(serviceName);
  serviceDiv.appendChild(amount);
  serviceDiv.appendChild(editIcon);
  serviceDiv.appendChild(deleteIcon);

  // Append the serviceDiv to the document body or another container element
  document.querySelector(id).appendChild(serviceDiv);
}
function getServiceList(bookingId) {
  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Define the URL for your Spring Boot GET endpoint
  var url =
    "http://localhost:8080/service/getServiceListByBookingId?bookingId=" +
    bookingId;
  let service = {};
  // Configure the request
  xhr.open("GET", url, false);

  // Set up a callback function to handle the response
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Successful response
      var responseData = xhr.responseText;

      service = JSON.parse(responseData);
      // console.log(parsedData);
    } else {
      // Error response
      console.error("Error:", xhr.statusText);
    }
  };

  // Set up a callback function to handle network errors
  xhr.onerror = function () {
    console.error("Network error occurred");
  };

  // Send the GET request
  xhr.send();
  return service;
}

function createServiceApi(obj) {
  {
    const url = "http://localhost:8080/service/createService";

    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();
    let id = "";

    // Configure the request
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-Type", "application/json");

    // Define a callback function to handle the response
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Successful response
        const response = xhr.responseText;
        id = response;
      } else {
        // Error response
        console.error("Error:", xhr.statusText);
        alert(error);
      }
    };

    // Define a callback function to handle network errors
    xhr.onerror = function () {
      console.error("Network error occurred");
    };

    // Send the POST request with the JSON data
    xhr.send(JSON.stringify(obj));
    return id;
  }
}
function updateServiceApi(obj) {
  const url = "http://localhost:8080/service/updateService";

  // Create a new XMLHttpRequest object
  const xhr = new XMLHttpRequest();
  let id = "";

  // Configure the request
  xhr.open("POST", url, false);
  xhr.setRequestHeader("Content-Type", "application/json");

  // Define a callback function to handle the response
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Successful response
      const response = xhr.responseText;
      id = response;
    } else {
      // Error response
      console.error("Error:", xhr.statusText);
      alert(error);
    }
  };

  // Define a callback function to handle network errors
  xhr.onerror = function () {
    console.error("Network error occurred");
  };

  // Send the POST request with the JSON data
  xhr.send(JSON.stringify(obj));
  return id;
}
function deleteServiceApi(id) {
  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Define the URL for your Spring Boot GET endpoint
  var url = "http://localhost:8080/service/deleteService?serviceId=" + id; // Replace with your actual endpoint URL
  let chk = "";

  // Configure the request
  xhr.open("GET", url, false);

  // Set up a callback function to handle the response
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Successful response
      chk = xhr.responseText;
    } else {
      // Error response
      console.error("Error:", xhr.statusText);
    }
  };

  // Set up a callback function to handle network errors
  xhr.onerror = function () {
    console.error("Network error occurred");
  };

  // Send the GET request
  xhr.send();
  return chk;
}

function stringValidation(str, strName) {
  const regex = /^[a-zA-Z ]+$/;
  if (!regex.test(str) || str == "") {
    Notify.error(
      strName +
        " can't be null or does not contains numbers and special characters "
    );
  }
  return regex.test(str);
}
function priceValidation(num) {
  if (isNaN(num))
    Notify.error(
      "Alphabets and special characters or not acceptable for price"
    );
  if (num < 0) Notify.error("price Cant be less than 0");
  if (num > 9999) Notify.error("price Cant be more  than 10000");
  return num > 0 && num < 10000;
}

function openCreateServiceForm(listId) {
  const serviceForm = document.getElementById("createServiceForm");
  serviceForm.style.display = "flex";
  const listForm = document.getElementById("serviceDetailDiv");
  listForm.style.display = "none";
  serviceForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.querySelector("#serviceName").value;
    const price = document.querySelector("#servicePrice").value;

    let chk = stringValidation(name, "service name");
    let pri = priceValidation(price);
    if (chk && pri) {
      let obj = {
        serviceName: name,
        servicePrice: price,
        serviceListId: listId,
      };
      let id = createServiceApi(obj);
      window.location.reload();
    }
  });
}
function closeCreateServiceForm() {
  const serviceForm = document.getElementById("createServiceForm");
  serviceForm.style.display = "none";
  const listForm = document.getElementById("serviceDetailDiv");
  listForm.style.display = "flex";
}

function cancelBooking(id, user) {
  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();
  let chk;

  // Define the URL for your Spring Boot GET endpoint
  var url =
    "http://localhost:8080/booking/cancelBooking?bookingId=" +
    id +
    "&user=" +
    user;
  // Configure the request
  xhr.open("GET", url, false);

  // Set up a callback function to handle the response
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Successful response
      chk = xhr.responseText;

      // console.log(parsedData);
    } else {
      // Error response
      console.error("Error:", xhr.statusText);
    }
  };

  // Set up a callback function to handle network errors
  xhr.onerror = function () {
    console.error("Network error occurred");
  };

  // Send the GET request
  xhr.send();
  localStorage.removeItem("liveAcceptedBookingId");
  window.location.reload();
  return chk;
}

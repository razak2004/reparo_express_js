// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
  set,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD2heEjfk-ZZFgHKLbyQ1rCaXKAAQi8Qm4",
  authDomain: "reparo-c2273.firebaseapp.com",
  databaseURL: "https://reparo-c2273-default-rtdb.firebaseio.com",
  projectId: "reparo-c2273",
  storageBucket: "reparo-c2273.appspot.com",
  messagingSenderId: "199284904929",
  appId: "1:199284904929:web:e6bda7e3b41bb3e079f8a0",
  measurementId: "G-B8QVYWWTE9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let db = getDatabase();
const starCountRef = ref(db, "bookings/");
onValue(starCountRef, (snapshot) => {
  let bookings = snapshot.val();
  localStorage.setItem("bookings", JSON.stringify(bookings));
});
const starWorkRef = ref(db, "workshop/");
onValue(starWorkRef, (snapshot) => {
  let workshops = snapshot.val();
  localStorage.setItem("workshops", JSON.stringify(workshops));
});
const starUsersRef = ref(db, "users/");
onValue(starUsersRef, (snapshot) => {
  let users = snapshot.val();
  localStorage.setItem("users", JSON.stringify(users));
});
let bookings = JSON.parse(localStorage.getItem("bookings"));
let workshops = JSON.parse(localStorage.getItem("workshops"));
let users = JSON.parse(localStorage.getItem("users"));

let loggedWorkShopId = localStorage.getItem("loginWorkShop");
let loggedWorkShop = workshops.find((e) => {
  if (loggedWorkShopId == e["workShopID"]) {
    return true;
  }
});
let near = [];
if (loggedWorkShop != undefined || null) {
  near = bookings.filter((e) => {
    if (e["city"] == loggedWorkShop["workshopCity"]) {
      return true;
    }
  });
}

console.log(bookings);
console.log(loggedWorkShop);
for (let i = 0; i < near.length; i++) {
  let arr = near[i]["rejectWorkshop"];
  let checkReject;
  if (arr != undefined) {
    checkReject = arr.find((e) => {
      if (e == loggedWorkShopId) {
        return true;
      }
    });
  }
  // console.log(near[i]["customer_id"]);
  let liveUser = users.find((e) => {
    if (e["user_id"] == near[i]["customer_id"]) {
      return true;
    }
  });
  console.log(users);
  console.log(liveUser);
  console.log(near[i]);

  if (
    near[i]["raisedStatus"] == true ||
    checkReject == undefined ||
    near[i]["acceptBooking"] == false ||
    near[i]["acceptBooking"] != loggedWorkShopId
  ) {
    if (near[i]["raisedStatus"] == true && near[i]["acceptBooking"] == false) {
      bookingWorkshopDiv(near[i], liveUser, ".workshopSection", true);
    } else if (
      near[i]["acceptBooking"] == loggedWorkShopId &&
      near[i]["otpVerify"] == undefined
    ) {
      otpVerification(near[i], liveUser, ".workshopSection");
    } else if (
      near[i]["otpVerify"] == true &&
      near[i]["serviceList"] == undefined
    ) {
      serviceList(near[i], ".workshopSection");
    } else if (
      near[i]["serviceAccept"] == undefined &&
      near[i]["raisedStatus"] == true
    ) {
      waiting(liveUser, ".workshopSection");
    } else if (
      near[i]["serviceAccept"] === true &&
      near[i]["acceptBooking"] == loggedWorkShopId
    ) {
      bookingAccepted(near[i], ".workshopSection");
    } else if (
      near[i]["serviceAccept"] === false &&
      near[i]["acceptBooking"] == loggedWorkShopId
    ) {
      bookingRejected(near[i], ".workshopSection");
    }
  } else {
    bookingWorkshopDiv(near[i], liveUser, ".workshopSection", false);
  }
}
console.log(loggedWorkShop);

// functions
function acceptBooking(id) {
  let check = confirm("Are you want to Accept this request");
  if (check == true) {
    let bookObj = bookings.find((e) => {
      if (id == e["booking_id"]) {
        return true;
      }
    });
    bookObj["acceptBooking"] = loggedWorkShopId;
    bookObj["OTP"] = generateOTP();
    let index = bookings.indexOf(bookObj);
    bookings[index] = bookObj;
    set(ref(db, "bookings/"), bookings);
    alert(" Booking Accepted please make a call with the customer ");
    window.location.reload();
  }
}

function rejectBooking(id) {
  let check = confirm("Are you want to reject this request");
  if (check == true) {
    let bookObj = bookings.find((e) => {
      if (id == e["booking_id"]) {
        return true;
      }
    });
    let index = bookings.indexOf(bookObj);
    if (bookObj["rejectWorkshop"] == undefined || null) {
      bookObj["rejectWorkshop"] = [];
      bookObj["rejectWorkshop"].push(loggedWorkShopId);
    } else {
      bookObj["rejectWorkshop"].push(loggedWorkShopId);
    }
    bookings[index] = bookObj;
    set(ref(db, "bookings/"), bookings);
    location.reload();
  } else {
    return;
  }
}
function bookingWorkshopDiv(obj, customerObj, classID, status) {
  // Create the main container element
  const bookingCard = document.createElement("div");
  bookingCard.classList.add("bookingCard");

  // Create the heading element
  const heading = document.createElement("h2");
  heading.textContent = "Customer is waiting for you !";

  // Create the span element for the symbol
  const symbolSpan = document.createElement("span");
  symbolSpan.classList.add("material-symbols-outlined");
  symbolSpan.textContent = "settings_input_antenna";

  // Append the symbol span to the heading
  heading.appendChild(symbolSpan);

  // Append the heading to the booking card
  bookingCard.appendChild(heading);

  // Create the bookingMid container
  const bookingMid = document.createElement("div");
  bookingMid.classList.add("bookingMid");

  // Create the output containers
  const outputContainer1 = document.createElement("div");
  outputContainer1.classList.add("outputCont");
  const outputContainer2 = document.createElement("div");
  outputContainer2.classList.add("outputCont");
  const outputContainer3 = document.createElement("div");
  outputContainer3.classList.add("outputContainer");

  // Create the headings for each output container
  const heading1 = document.createElement("h4");
  heading1.textContent = "Name : " + customerObj["name"];

  const heading2 = document.createElement("h5");
  heading2.textContent =
    "Vehicle : " +
    obj["vehicleModel"] +
    "," +
    obj["vehicleCompany"] +
    "," +
    obj["vehicleType"];

  const heading3 = document.createElement("h4");
  heading3.textContent = "Problem : " + obj["vehicleProblem"];

  // Append the headings to the output containers
  outputContainer1.appendChild(heading1);
  outputContainer2.appendChild(heading2);
  outputContainer3.appendChild(heading3);

  // Append the output containers to the bookingMid container
  bookingMid.appendChild(outputContainer1);
  bookingMid.appendChild(outputContainer2);
  bookingMid.appendChild(outputContainer3);

  bookingCard.append(bookingMid);

  // Create the bookingBottom container
  const bookingBottom = document.createElement("div");
  bookingBottom.classList.add("bookingBottom");

  // Create the button containers
  const buttonContainer1 = document.createElement("div");
  buttonContainer1.classList.add("buttonContainer");
  const buttonContainer2 = document.createElement("div");
  buttonContainer2.classList.add("buttonContainer");

  // Create the Accept and Reject buttons
  const acceptButton = document.createElement("button");
  acceptButton.addEventListener("click", () => {
    acceptBooking(obj["booking_id"]);
  });
  acceptButton.classList.add("accept");
  acceptButton.textContent = "Accept";

  const rejectButton = document.createElement("button");
  rejectButton.addEventListener("click", () => {
    rejectBooking(obj["booking_id"]);
  });
  rejectButton.classList.add("reject");
  rejectButton.textContent = "Reject";

  // Append the Accept and Reject buttons to the first button container
  buttonContainer1.appendChild(acceptButton);
  buttonContainer1.appendChild(rejectButton);

  // Create the Location button
  const locationButton = document.createElement("button");
  locationButton.classList.add("direction");

  // Create the span element for the symbol in the Location button
  const location = document.createElement("a");
  location.setAttribute(
    "href",
    "https://www.google.com/maps/search/" + obj["address"] + "," + obj["state"]
  );
  location.innerText = "location";
  location.style.color = "white";
  location.style.textDecoration = "none";

  // Append the symbol span to the Location button
  locationButton.append(location);
  // locationButton.textContent = "";

  // Append the Location button to the second button container
  buttonContainer2.appendChild(locationButton);

  // Append the button containers to the bookingBottom container
  bookingBottom.appendChild(buttonContainer1);
  bookingBottom.appendChild(buttonContainer2);
  if (status == true) {
    bookingCard.append(bookingBottom);
  } else {
    let cancledBooking = document.createElement("div");
    cancledBooking.classList.add("cancledBooking");
    cancledBooking.textContent = "This request has been rejected";
    bookingCard.append(cancledBooking);
  }

  let appendDiv = document.querySelector(classID);

  // Append all elements to the document body or a target container element
  appendDiv.appendChild(bookingCard);
}
// function for each service
function oneService(obj, id) {
  // Create a div element with class "serviceContainer"
  const div = document.createElement("div");
  div.className = "serviceContainer";

  // Create a span element with class "material-symbols-outlined" and text content "settings_suggest"
  const span = document.createElement("span");
  span.className = "material-symbols-outlined";
  span.textContent = "settings_suggest";

  // Create an h4 element with the text content "Service Name"
  const h4 = document.createElement("h4");
  h4.textContent = obj["serviceName"];

  // Create an i element with class "material-symbols-outlined" and text content "currency_rupee"
  const i = document.createElement("i");
  i.className = "material-symbols-outlined";
  i.textContent = "currency_rupee";

  // Create an input element with type "tel"
  const input = document.createElement("input");
  input.setAttribute("id", "serviceNo:" + obj["eachServiceId"]);
  input.type = "tel";
  input.value = obj["serviceAmount"];
  input.disabled = true;

  // Append the span, h4, i, and input elements to the div element
  div.appendChild(span);
  div.appendChild(h4);
  div.appendChild(i);
  div.appendChild(input);

  if (obj["serviceName"] && obj["serviceAmount"] != null) {
    document.getElementById(id).appendChild(div);
  }

  // Append the div element to the document body or any other desired parent element
}
function serviceList(obj, cls) {
  // obj["serviceList"] = [];
  let arr = [];
  // Create the main div element
  const div = document.createElement("div");
  div.className = "serviceList";

  // Create the h2 element
  const h2 = document.createElement("h2");
  h2.textContent = "Customer's Services";

  // Create the button inside h2
  const addButton = document.createElement("button");
  addButton.id = "addButton";

  // Create the span element inside the button
  const addButtonSpan = document.createElement("span");
  addButtonSpan.className = "material-symbols-outlined";
  addButtonSpan.textContent = " library_add ";

  // Create the 'Add' text inside the button
  const addButtonText = document.createTextNode("Add");

  // Append the span and text to the button
  addButton.appendChild(addButtonSpan);
  addButton.appendChild(addButtonText);
  addButton.addEventListener("click", () => {
    let eachServiceId = Date.now();
    let serviceName = prompt("Enter the service ");
    let serviceAmount = prompt("Enter the price ");
    let obj = {
      eachServiceId,
      serviceName,
      serviceAmount,
    };
    console.log(obj);
    oneService(obj, "prependService");

    arr.push(obj);
    let total = 0;
    arr.forEach((e) => {
      if (e.serviceAmount != null) {
        total += parseInt(e.serviceAmount);
      }
    });
    document.getElementById("total").value = total;
  });

  // Append the button to the h2
  h2.appendChild(addButton);

  // Append the h2 to the main div
  div.appendChild(h2);

  // Create the div element with class 'serviceListContainer'
  const serviceListContainer = document.createElement("div");
  serviceListContainer.className = "serviceListContainer";
  serviceListContainer.id = "prependService";

  // Append the serviceListContainer to the main div
  div.appendChild(serviceListContainer);

  // Create the h3 element
  const h3 = document.createElement("h3");

  // Create the first span inside h3
  const totalAmountSpan = document.createElement("span");
  totalAmountSpan.textContent = "Total Amount : ";

  // Create the second span inside h3
  const currencySpan = document.createElement("span");
  currencySpan.className = "material-symbols-outlined";
  currencySpan.textContent = " currency_rupee ";

  // Create the input element inside h3
  const totalInput = document.createElement("input");
  totalInput.type = "tel";
  totalInput.id = "total";
  totalInput.value = "00";
  totalInput.required = true;
  totalInput.disabled = true;

  // Append the spans and input to the h3
  h3.appendChild(totalAmountSpan);
  h3.appendChild(currencySpan);
  h3.appendChild(totalInput);

  // Append the h3 to the main div
  div.appendChild(h3);

  // Create the button at the end
  const sendButton = document.createElement("button");
  sendButton.addEventListener("click", () => {
    let check = confirm("Are you want to send the list to the customer");
    if (check == true) {
      obj["serviceList"] = arr;
      let index = bookings.indexOf(obj);
      bookings[index] = obj;
      set(ref(db, "bookings/"), bookings);
      alert("bill send to the customer");
      window.location.reload();
    }
  });

  // Create the span element inside the button
  const sendButtonSpan = document.createElement("span");
  sendButtonSpan.className = "material-symbols-outlined";
  sendButtonSpan.textContent = " send ";

  // Create the 'Send to customer' text inside the button
  const sendButtonText = document.createTextNode("Send to customer");

  // Append the span and text to the button
  sendButton.appendChild(sendButtonSpan);
  sendButton.appendChild(sendButtonText);

  // Append the button to the main div
  div.appendChild(sendButton);

  document.querySelector(cls).appendChild(div);

  // Now you can append the 'div' element to your desired container in the document.
}

// otp verification card
function otpVerification(obj, cus, cls) {
  // Create the main div element
  const div = document.createElement("div");
  div.className = "connectVerification";

  // Create the h4 element
  const h4 = document.createElement("h4");
  h4.innerHTML = "Please make a Call with customer <br />To get OTP";

  // Create the button
  const callButton = document.createElement("button");
  callButton.innerHTML = "Call";

  // Create the span element inside the button
  const callButtonSpan = document.createElement("span");
  callButtonSpan.className = "material-symbols-outlined";
  callButtonSpan.innerHTML = " smartphone ";

  // Create the phone number text inside the button
  const phoneNumberText = document.createTextNode(cus["number"]);

  // Append the span and text to the button
  callButton.appendChild(callButtonSpan);
  callButton.appendChild(phoneNumberText);

  // Create the h5 element
  const h5 = document.createElement("h5");
  h5.textContent = "Verify your otp :";

  // Create the form element
  const form = document.createElement("form");
  form.action = "";
  form.id = "acceptOtpForm";

  // Create the otpInput div
  const otpInputDiv = document.createElement("div");
  otpInputDiv.className = "otpInput";

  // Create the span element inside otpInputDiv
  const otpInputSpan = document.createElement("span");
  otpInputSpan.className = "material-symbols-outlined";
  otpInputSpan.innerHTML = " dialpad ";

  // Create the input element inside otpInputDiv
  const otpInput = document.createElement("input");
  otpInput.type = "text";

  // Append the span and input to otpInputDiv
  otpInputDiv.appendChild(otpInputSpan);
  otpInputDiv.appendChild(otpInput);

  // Create the Verify button
  const verifyButton = document.createElement("button");
  verifyButton.setAttribute("type", "submit");
  verifyButton.textContent = "Verify";

  // Append otpInputDiv and verifyButton to the form
  form.appendChild(otpInputDiv);
  form.appendChild(verifyButton);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let otp = otpInput.value;
    if (otp == obj["OTP"]) {
      obj["otpVerify"] = true;
      let index = bookings.indexOf(obj);
      bookings[index] = obj;
      set(ref(db, "bookings/"), bookings);

      alert("Thanks for contacting our customer");
      window.location.reload();
    } else {
      alert("invalid OTP");
    }
  });

  // Append h4, callButton, h5, and form to the main div
  div.appendChild(h4);
  div.appendChild(callButton);
  div.appendChild(h5);
  div.appendChild(form);

  // Now you can append the 'div' element to your desired container in the document.
  document.querySelector(cls).appendChild(div);
}

// waiting
function waiting(obj, cls) {
  // Create the main container div element
  var waitingResponseDiv = document.createElement("div");
  waitingResponseDiv.className = "waitingResponse";

  // Create the img element
  var imgElement = document.createElement("img");
  imgElement.src = "../../assets/images/workshop/wait.gif";
  imgElement.alt = "waitingResponse";

  // Create the h3 element
  var h3Element = document.createElement("h3");
  h3Element.textContent = "Waiting for Customer response";

  // Create the a element
  var aElement = document.createElement("a");
  aElement.setAttribute("href", "tel:" + obj["number"]);

  // Create the span element
  var spanElement = document.createElement("span");
  spanElement.className = "material-symbols-outlined";
  spanElement.textContent = "phone_in_talk";

  // Create the text node for "Call"
  var callText = document.createTextNode(" Call");

  // Append the span and text node to the a element
  aElement.appendChild(spanElement);
  aElement.appendChild(callText);

  // Append the img, h3, and a elements to the main container div
  waitingResponseDiv.appendChild(imgElement);
  waitingResponseDiv.appendChild(h3Element);
  waitingResponseDiv.appendChild(aElement);

  // Append the main container div to the document body
  document.querySelector(cls).appendChild(waitingResponseDiv);
}

function bookingAccepted(obj, cls) {
  // Create the main div element
  var divElement = document.createElement("div");
  divElement.setAttribute("class", "acceptService");

  // Create the h2 element
  var h2Element = document.createElement("h2");
  var h2Text = document.createTextNode("Customer accept your services");
  h2Element.appendChild(h2Text);

  // Create the button element
  var buttonElement = document.createElement("button");
  var buttonElement = document.createElement("button");
  const location = document.createElement("a");
  location.setAttribute(
    "href",
    "https://www.google.com/maps/search/" + obj["address"] + "," + obj["state"]
  );
  location.innerText = "location";
  location.style.color = "white";
  location.style.textDecoration = "none";
  // var buttonText = document.createTextNode("okay");
  buttonElement.appendChild(location);

  // Append the h2 and button elements to the div element
  divElement.appendChild(h2Element);
  divElement.appendChild(buttonElement);
  document.querySelector(cls).append(divElement);
}
function bookingRejected(obj, cls) {
  // Create the main div element
  var divElement = document.createElement("div");
  divElement.setAttribute("class", "acceptService");

  // Create the h2 element
  var h2Element = document.createElement("h2");
  var h2Text = document.createTextNode("Customer rejected your services");
  h2Element.appendChild(h2Text);
  var h3Element = document.createElement("h3");
  var h3Text = document.createTextNode("Reason : " + obj["rejectReason"]);
  h3Element.appendChild(h3Text);

  // Create the button element

  // Append the h2 and button elements to the div element
  divElement.appendChild(h2Element);
  divElement.appendChild(h3Element);
  // divElement.appendChild(buttonElement);
  document.querySelector(cls).append(divElement);
}

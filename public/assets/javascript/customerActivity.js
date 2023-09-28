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
const starWorkshopRef = ref(db, "workshop/");
onValue(starWorkshopRef, (snapshot) => {
  let workshops = snapshot.val();
  localStorage.setItem("workshops", JSON.stringify(workshops));
});

function cancelRequest(obj) {
  let check = confirm("Are you Want to cancel this request");
  if (check == true) {
    let index = bookings.indexOf(obj);
    obj["raisedStatus"] = false;
    bookings[index] = obj;
    set(ref(db, "bookings/"), bookings);
    window.location.href = "./cust.html";
    alert("your Request has been cancelled");
  }
}

function liveBookingCard(obj, id) {
  // Create section element
  const section = document.createElement("section");
  section.setAttribute("id", "finding_workshop");

  // Create image element
  const img = document.createElement("img");
  img.setAttribute("src", "../../assets/images/customer/way.gif");
  img.setAttribute("alt", "finding");
  section.appendChild(img);

  // Create heading element
  const heading = document.createElement("h2");
  heading.textContent = "Finding Workshops near you";

  // Create span element with class
  const span = document.createElement("span");
  span.setAttribute("class", "material-symbols-outlined");
  span.textContent = " pin_drop ";

  // Append span to the heading
  heading.appendChild(span);
  section.appendChild(heading);

  // Create div element with class
  const div = document.createElement("div");
  div.setAttribute("class", "timer");

  // Create text node for estimated time
  const timeText = document.createTextNode("estimated Time 1 min");
  div.appendChild(timeText);

  // Create span elements for minutes and seconds
  const minutesSpan = document.createElement("span");
  minutesSpan.setAttribute("id", "minutes");
  minutesSpan.textContent = "00";
  const secondsSpan = document.createElement("span");
  secondsSpan.setAttribute("id", "seconds");
  secondsSpan.textContent = "00";

  // Append minutes and seconds spans to the div
  div.appendChild(minutesSpan);
  div.appendChild(document.createTextNode(" : "));
  div.appendChild(secondsSpan);

  // Append the div to the section
  section.appendChild(div);

  // Create button element
  const button = document.createElement("button");
  button.addEventListener("click", () => {
    cancelRequest(obj);
  });
  button.setAttribute("class", "cancel");
  button.textContent = "Cancel Request";
  section.appendChild(button);
  let appId = document.getElementById(id);
  appId.append(section);
}

// function for otp verification
function otpVerifyFunc(obj, wrk, id) {
  // Create section element
  const section = document.createElement("section");
  section.classList.add("OtpConfirmation");

  // Create h5 element for OTP message
  const otpMessage = document.createElement("h5");
  otpMessage.textContent = "Share the OTP to get your service";
  section.appendChild(otpMessage);

  // Create h3 element for OTP code
  const otpCode = document.createElement("h3");
  otpCode.id = "otpH3";
  otpCode.textContent = "OTP : " + obj["OTP"];
  section.appendChild(otpCode);

  // Create img element for workshop image
  const workshopImage = document.createElement("img");
  workshopImage.src = wrk["image"];
  workshopImage.alt = "workshop";
  section.appendChild(workshopImage);

  // Create h5 element for workshop name
  const workshopName = document.createElement("h5");
  workshopName.textContent = "WorkShop Name : " + wrk["workshopName"];
  const workshopNum = document.createElement("div");
  workshopNum.textContent = "WorkShopNumber : " + wrk["number"];
  section.appendChild(workshopName);
  section.appendChild(workshopNum);

  // Create h5 element for mechanic contact message
  const contactMessage = document.createElement("h5");
  contactMessage.textContent = wrk["name"] + " will contact you shortly";
  section.appendChild(contactMessage);

  // Create button container
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button");

  // Create Call button
  const callButton = document.createElement("a");
  callButton.textContent = "Call";
  callButton.addEventListener("click", () => {
    callButton.href = "tel:" + wrk["number"];
  });

  buttonContainer.appendChild(callButton);

  // Create Direction button
  const directionButton = document.createElement("a");
  directionButton.addEventListener("click", () => {
    directionButton.href =
      "https://www.google.com/maps/search/" +
      wrk["workshopAddress"] +
      "," +
      wrk["workshopCity"] +
      "," +
      wrk["workshopState"];
  });
  directionButton.textContent = "Direction";
  buttonContainer.appendChild(directionButton);

  section.appendChild(buttonContainer);

  // Append the section to the document body or any desired container
  document.getElementById(id).append(section);
}

// function for waiting card
function waitingCard(obj, id) {
  alert(
    "Thanks for cunsulting our mechanic kindly wait for some time to get your service list and amount  "
  );
  // Create the elements
  const section = document.createElement("section");
  section.setAttribute("class", "waitingCard");

  const img = document.createElement("img");
  img.setAttribute("src", "../../assets/images/workshop/wait.gif");
  img.setAttribute("alt", "waiting");

  const h2 = document.createElement("h3");
  h2.textContent = "Waiting For Your service list";

  let timer = document.createElement("div");
  timer.className = "timer";
  timer.style.width = "100px";

  const minutesSpan = document.createElement("span");
  minutesSpan.setAttribute("id", "minutes");
  minutesSpan.textContent = "00";
  const p = document.createElement("p");
  p.innerText = ":";
  const secondsSpan = document.createElement("span");
  secondsSpan.setAttribute("id", "seconds");
  secondsSpan.textContent = "00";
  startTimer();
  timer.append(minutesSpan);
  timer.append(p);
  timer.append(secondsSpan);

  const button = document.createElement("button");
  button.textContent = "Cancel";

  // Append the elements to the section
  section.appendChild(img);
  section.appendChild(h2);
  section.appendChild(timer);
  section.appendChild(button);

  // Add the section to the document body or any other parent element
  document.getElementById(id).appendChild(section);
}

// function for service list
function oneService(obj, id) {
  // Create a div element with class "serviceContainer"
  const div = document.createElement("div");
  div.className = "serviceContainerList";

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
    id.appendChild(div);
  }

  // Append the div element to the document body or any other desired parent element
}
function serviceList(obj, cls) {
  // obj["serviceList"] = [];
  const arr = obj["serviceList"];
  // Create the main div element
  const div = document.createElement("div");
  div.className = "serviceList";

  // Create the h2 element
  const h2 = document.createElement("h2");
  h2.textContent = "Your Expected  Services";

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

  let total = 0;
  // adding service

  arr.forEach((element) => {
    oneService(element, serviceListContainer);
    total += parseInt(element.serviceAmount);
  });
  totalInput.value = total;

  // Append the spans and input to the h3
  h3.appendChild(totalAmountSpan);
  h3.appendChild(currencySpan);
  h3.appendChild(totalInput);

  // Append the h3 to the main div
  div.appendChild(h3);

  let buttonContainer = document.createElement("div");
  buttonContainer.className = "btnContainer";
  div.appendChild(buttonContainer);
  let acceptBtn = document.createElement("button");
  acceptBtn.style.backgroundColor = "green";
  acceptBtn.innerText = "Accept";
  acceptBtn.addEventListener("click", () => {
    let check = confirm("Confirm your service");
    if (check == true) {
      obj["serviceAccept"] = true;
      let index = bookings.indexOf(obj);
      alert("Thanks for using our website  mechanic will arrive shortly ");
      bookings[index] = obj;
      set(ref(db, "bookings/"), bookings);
    }
  });

  buttonContainer.append(acceptBtn);
  let rejectBtn = document.createElement("button");
  rejectBtn.addEventListener("click", () => {
    let check = confirm("Are you want to reject this service ");
    let reason = prompt("Kindly enter the reason for your cancellation");
    if (check == true) {
      obj["serviceAccept"] = false;
      obj["rejectReason"] = reason;
      let index = bookings.indexOf(obj);
      bookings[index] = obj;
      set(ref(db, "bookings/"), bookings);
      alert("Thanks For the feed back");
      window.location.href = "./cust.html";
    }
  });
  rejectBtn.style.backgroundColor = "red";
  rejectBtn.innerText = "Cancel";
  buttonContainer.append(rejectBtn);
  let cancelBtn = document.createElement("button");

  cancelBtn.id = "cancelBtn";
  cancelBtn.innerText = "Contact workshop";
  div.append(cancelBtn);

  document.querySelector(cls).appendChild(div);

  // Now you can append the 'div' element to your desired container in the document.
}

let bookings = JSON.parse(localStorage.getItem("bookings"));
let workshops = JSON.parse(localStorage.getItem("workshops"));
let customerId = localStorage.getItem("LoginUser");
let liveArr = bookings.filter((e) => {
  if (e["customer_id"] == customerId) {
    return true;
  }
});
let livObj = liveArr.find((e) => {
  if (e["raisedStatus"] == true) {
    return true;
  }
});
console.log(livObj);
let bookedWorkshop;
if (livObj["acceptBooking"] != false) {
  bookedWorkshop = workshops.find((e) => {
    if (e["workShopID"] == livObj["acceptBooking"]) {
      return true;
    }
  });
}
console.log(bookedWorkshop);

if (livObj != undefined) {
  if (livObj["raisedStatus"] == true && livObj["acceptBooking"] == false) {
    liveBookingCard(livObj, "activitySection");
    startTimer();
    let cancelButton = document.getElementById("CancelnotfindCard");
    cancelButton.addEventListener("click", () => {
      cancelRequest(livObj);
    });
  } else if (
    livObj["acceptBooking"] != false &&
    livObj["otpVerify"] == undefined
  ) {
    alert("We found a workshop for you !!");
    otpVerifyFunc(livObj, bookedWorkshop, "activitySection");
  } else if (
    livObj["otpVerify"] == true &&
    livObj["serviceList"] == undefined
  ) {
    waitingCard(livObj, "activitySection");
  } else if (
    livObj["serviceList"] != undefined &&
    livObj["serviceAccept"] == undefined
  ) {
    serviceList(livObj, "#activitySection");
  } else if (livObj["serviceAccept"] == true) {
    let h2 = document.createElement("h2");
    h2.innerText = "Our mechanic Will contact you shortly";
    document.getElementById("activitySection").appendChild(h2);
  }
}

// feed back

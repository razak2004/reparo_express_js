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
console.log(db);
let workShops = [];

const starCountRef = ref(db, "workshop/");
onValue(starCountRef, (snapshot) => {
  workShops = snapshot.val();
  localStorage.setItem("workshops", JSON.stringify(workShops));
});
const starBookingsRef = ref(db, "bookings/");
onValue(starBookingsRef, (snapshot) => {
  let bookings = snapshot.val();
  localStorage.setItem("bookings", JSON.stringify(bookings));
});
const starUsersRef = ref(db, "users/");
onValue(starUsersRef, (snapshot) => {
  let users = snapshot.val();
  localStorage.setItem("users", JSON.stringify(users));
});

let arr = [];

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
function serviceList(cls) {
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
// let users = JSON.parse(localStorage.getItem("users"));
// let bookings = JSON.parse(localStorage.getItem("bookings"));
// let workshop = JSON.parse(localStorage.getItem("workshops"));
// let loggedWorkShopId = localStorage.getItem("loginWorkShop");

// let confirmedBooking = bookings.find((e) => {
//   if (e["acceptBooking"] == loggedWorkShopId) {
//     return true;
//   }
// });
// if (confirmedBooking != undefined) {
//   let bookedUser = users.find((e) => {
//     if (e["user_id"] == confirmedBooking["customer_id"]) {
//       return true;
//     }
//   });
// }

// console.log(bookedUser);
// // if(){}
// if (confirmedBooking != undefined || null) {
//   if (confirmedBooking["otpVerify"] == undefined) {
//     otpVerification(confirmedBooking, bookedUser, ".workshopSection");
//   } else {
//     serviceList(".workshopSection");
//   }
// }

// service List
// let serviceAddBtn = document.getElementById("addButton");
// if (serviceAddBtn != undefined) {
//   serviceAddBtn.addEventListener("click", () => {
//     let eachServiceId = Date.now();
//     let serviceName = prompt("Enter the service ");
//     let serviceAmount = prompt("Enter the price ");
//     let obj = {
//       eachServiceId,
//       serviceName,
//       serviceAmount,
//     };
//     console.log(obj);
//     oneService(obj, "prependService");

//     arr.push(obj);
//     let total = 0;
//     arr.forEach((e) => {
//       if (e.serviceAmount != null) {
//         total += parseInt(e.serviceAmount);
//       }
//     });
//     document.getElementById("total").value = total;
//   });
// }

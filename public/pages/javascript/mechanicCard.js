function createBookingOtp(id) {
  let bookings = JSON.parse(localStorage.getItem("bookings"));
  let bookedService = bookings.find((e) => {
    if (e["bookingId"] == id) {
      return true;
    }
  });
  let customers = JSON.parse(localStorage.getItem("users"));
  let serviceCustomer = customers.find((e) => {
    if (e["user_id"] == bookedService["customerId"]) {
      return true;
    }
  });

  let customerVehicles = JSON.parse(localStorage.getItem("Customer_vehicles"));
  let bookedVehicle = customerVehicles.find((e) => {
    if (e["CustomerId"] == serviceCustomer["user_id"]) {
      return true;
    }
  });
  // Create main container div
  const bookingOtpDiv = document.createElement("div");
  bookingOtpDiv.classList.add("bookingOtp");

  // Create content div
  const conDiv = document.createElement("div");
  conDiv.classList.add("con");

  // Create customer info div
  const customerDiv = document.createElement("div");
  customerDiv.classList.add("showContent");
  const customerImg = document.createElement("img");
  customerImg.setAttribute("src", serviceCustomer["image"]);
  customerImg.setAttribute("alt", "customerImg");
  customerDiv.appendChild(customerImg);
  const customerName = document.createElement("p");
  customerName.textContent = serviceCustomer["name"];
  customerDiv.appendChild(customerName);
  conDiv.appendChild(customerDiv);

  // Create vehicle info div
  const vehicleDiv = document.createElement("div");
  vehicleDiv.classList.add("showContent");
  const vehicleIcon = document.createElement("span");
  vehicleIcon.classList.add("material-symbols-outlined");
  vehicleIcon.textContent = " motorcycle ";
  vehicleDiv.appendChild(vehicleIcon);
  const vehicleType = document.createElement("p");
  vehicleType.textContent =
    bookedVehicle["vehicleModel"] + ":" + bookedVehicle["VehicleCompany"];
  vehicleDiv.appendChild(vehicleType);
  conDiv.appendChild(vehicleDiv);

  // Create vehicle number div
  const vehicleNumberDiv = document.createElement("div");
  vehicleNumberDiv.classList.add("showContent");
  const vehicleNumberIcon = document.createElement("span");
  vehicleNumberIcon.setAttribute("class", "material-symbols-outlined");
  vehicleNumberIcon.innerText = " pin ";
  vehicleNumberDiv.appendChild(vehicleNumberIcon);
  vehicleNumberDiv.textContent =
    "vehicle number : " + bookedVehicle["vehicleNumber"];
  conDiv.appendChild(vehicleNumberDiv);

  // Create service type div
  const serviceTypeDiv = document.createElement("div");
  serviceTypeDiv.classList.add("showContent");
  const serviceTypeIcon = document.createElement("span");
  serviceTypeIcon.classList.add("material-symbols-outlined");
  serviceTypeIcon.textContent = " home_repair_service ";
  serviceTypeDiv.appendChild(serviceTypeIcon);
  serviceTypeDiv.textContent = "service : " + bookedService["type"];
  conDiv.appendChild(serviceTypeDiv);

  // Create cost div
  const costDiv = document.createElement("div");
  costDiv.classList.add("showContent");
  const costIcon = document.createElement("span");
  costIcon.classList.add("material-symbols-outlined");
  costIcon.textContent = " currency_rupee ";
  costDiv.appendChild(costIcon);
  costDiv.textContent = "cost : " + bookedService["cost"];
  conDiv.appendChild(costDiv);

  // Append content div to main container div
  bookingOtpDiv.appendChild(conDiv);

  // Create OTP container div
  const otpConDiv = document.createElement("div");
  otpConDiv.classList.add("otpCon");
  const otpForm = document.createElement("form");
  otpForm.setAttribute("action", "");

  const otpInput = document.createElement("input");
  otpInput.setAttribute("type", "num");
  otpInput.setAttribute("pattern", "[0-9]{4}");
  otpInput.setAttribute("required", true);

  otpForm.appendChild(otpInput);
  const otpSubmitButton = document.createElement("button");
  otpSubmitButton.setAttribute("type", "submit");
  otpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let check = otpInput.value;
    if (check == bookedService["OTP"]) {
      alert("OTP matched");
    } else {
      alert("OTP not matched ");
      return;
    }
  });
  const otpSubmitIcon = document.createElement("span");
  otpSubmitIcon.classList.add("material-symbols-outlined");
  otpSubmitIcon.textContent = " vpn_key ";
  otpSubmitButton.appendChild(otpSubmitIcon);
  otpSubmitButton.textContent = "Submit OTP";
  otpForm.appendChild(otpSubmitButton);
  const cancelBtn = document.createElement("button");
  cancelBtn.setAttribute("id", "cancel");
  cancelBtn.textContent = "Cancel";
  otpForm.appendChild(cancelBtn);
  otpConDiv.appendChild(otpForm);
  bookingOtpDiv.append(otpConDiv);

  // Create a div element with class "navigate"
  const navigateDiv = document.createElement("div");
  navigateDiv.className = "navigate";

  // Create the first anchor element with the "call" link
  const callLink = document.createElement("a");
  callLink.href = "tel:" + serviceCustomer["number"];
  navigateDiv.appendChild(callLink);

  // Create the phone icon span element
  const phoneSpan = document.createElement("span");
  phoneSpan.className = "material-symbols-outlined";
  phoneSpan.textContent = "phone_in_talk";
  callLink.appendChild(phoneSpan);

  // Add the "call" text after the phone icon
  const callText = document.createTextNode("call");
  callLink.appendChild(callText);

  // Create the second anchor element with the "direction" link
  const directionLink = document.createElement("a");
  directionLink.href =
    "https://www.google.com/maps/search/" +
    serviceCustomer["address"] +
    "," +
    serviceCustomer["city"];
  navigateDiv.appendChild(directionLink);

  // Create the location icon span element
  const locationSpan = document.createElement("span");
  locationSpan.className = "material-symbols-outlined";
  locationSpan.textContent = "near_me";
  directionLink.appendChild(locationSpan);

  // Add the "direction" text after the location icon
  const directionText = document.createTextNode("direction");
  directionLink.appendChild(directionText);

  // Add the navigateDiv to the document
  bookingOtpDiv.appendChild(navigateDiv);

  let append = document.getElementById("otpValidation");
  append.append(bookingOtpDiv);
}

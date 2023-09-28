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
    let con = confirm("Are you want to accept this Booking");
    if (con) {
      let data = {
        workshopId,
        bookingId: obj["bookingId"],
        otp: generateOTP(4),
      };
      let response = BookingServiceApi.acceptBooking(data);
      if (response.statusCode == 200) {
        let booking = JSON.parse(response.data);
        let id = booking["bookingId"];
        sessionStorage.setItem("liveAcceptedBookingId", idToToken(id));
        window.location.reload();
      } else {
        Notify.error(response.error);
      }
      console.log(data);
    }
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
      let res = BookingServiceApi.cancelBooking(obj["bookingId"], "workshop");
      if (res.statusCode == 200) {
        Notify.success("Booking Canceled Successfully");
        sessionStorage.removeItem("liveAcceptedBookingId");
        window.location.reload();
      }
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
      let serviceResponse = ServiceListServiceApi.createServiceList(
        obj["bookingId"]
      );
      if (serviceResponse.statusCode == 200) {
        alert("Thanks for contacting our customer ");
        Notify.success("Thanks for contacting our customer ");
        window.location.reload();
      } else {
        Notify.error(serviceResponse.error);
      }
    } else {
      Notify.error("invalid OTP ");
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
    let deleteResponse = ServiceListServiceApi.deleteService(obj["serviceId"]);
    if (deleteResponse.statusCode == 200) {
      window.location.reload();
    } else {
      notify.error(deleteResponse.error);
    }
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
    let pri = priceValidate(price);
    if (chk && pri) {
      let obj = {
        serviceName: name,
        servicePrice: price,
        serviceListId: listId,
      };
      let serviceResponse = ServiceListServiceApi.createService(obj);
      if (serviceResponse.statusCode == 200) {
        window.location.reload();
      } else {
        Notify.error(serviceResponse.error);
      }
    }
  });
}
function closeCreateServiceForm() {
  window.location.reload();
}
function createUpdateServiceForm(obj) {
  document.getElementById("serviceDetailDiv").style.display = "none";
  // Create the form element
  var createServiceForm = document.createElement("form");
  createServiceForm.id = "createServiceForm";

  // Create the h4 element
  var h4 = document.createElement("h4");
  // h4.innerHTML =
  //   '<span  class="material-symbols-outlined">text_select_jump_to_beginning</span>edit Service';

  var h4Span = document.createElement("span");
  h4Span.className = "material-symbols-outlined";
  h4Span.innerText = "text_select_jump_to_beginning";
  h4Span.addEventListener("click", () => {
    window.location.reload();
  });
  var p = document.createElement("p");
  p.innerText = "edit Service";
  h4.append(h4Span);
  h4.append(p);
  // Create the first div element with input for service name
  var div1 = document.createElement("div");
  div1.className = "info";
  var span1 = document.createElement("span");
  span1.className = "material-symbols-outlined";
  span1.textContent = "settings";
  var input1 = document.createElement("input");
  input1.type = "text";
  input1.required = true;
  input1.id = "serviceName";
  input1.value = obj["serviceName"];
  div1.appendChild(span1);
  div1.appendChild(input1);

  // Create the second div element with input for service price
  var div2 = document.createElement("div");
  div2.className = "info";
  var span2 = document.createElement("span");
  span2.className = "material-symbols-outlined";
  span2.textContent = "currency_rupee";
  var input2 = document.createElement("input");
  input2.type = "text";
  input2.required = true;
  input2.id = "servicePrice";
  input2.value = obj["servicePrice"];
  input2.pattern = "[0-9]{1,4}";
  input2.title =
    "price should not be more than 9999 or less than 0 and doesnot contain empty space";
  div2.appendChild(span2);
  div2.appendChild(input2);

  // Create the submit button
  var submitButton = document.createElement("button");
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    let serviceName = input1.value;
    let servicePrice = input2.value;
    let chk1 = stringValidation(serviceName, "serviceName");
    let chk2 = priceValidate(servicePrice);
    if (chk1 && chk2) {
      let obj1 = {
        serviceName,
        servicePrice,
        serviceId: obj["serviceId"],
        serviceListId: obj["serviceListId"],
      };
      let serviceResponse = ServiceListServiceApi.updateService(obj1);
      if (serviceResponse.statusCode == 200) {
        window.location.reload();
      } else {
        Notify.error(serviceResponse.error);
      }
    }
  });
  submitButton.type = "submit";
  var span3 = document.createElement("span");
  span3.className = "material-symbols-outlined";
  span3.textContent = "edit";
  submitButton.appendChild(span3);
  submitButton.appendChild(document.createTextNode("edit Service"));

  // Append all elements to the form
  createServiceForm.appendChild(h4);
  createServiceForm.appendChild(div1);
  createServiceForm.appendChild(div2);
  createServiceForm.appendChild(submitButton);

  // Append the form to the document body or another desired location
  document.getElementById("otpDiv").appendChild(createServiceForm);
}

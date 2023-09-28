function createVehicleApi(data) {
  const url = "http://localhost:8080/vehicle/createVehicle"; // Replace with your Spring Boot backend URL

  // Data to send in the request body

  // Create a new XMLHttpRequest object
  const xhr = new XMLHttpRequest();
  let id = "";

  // Configure the request
  xhr.open("POST", url, false);
  xhr.setRequestHeader("Content-Type", "application/json"); // Set the content type to JSON

  // Define a callback function to handle the response
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Successful response
      const response = xhr.responseText;
      id = response;
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
  return id;
}
function createBookingApi(data) {
  const url = "http://localhost:8080/booking/createBooking"; // Replace with your Spring Boot backend URL

  // Data to send in the request body

  // Create a new XMLHttpRequest object
  const xhr = new XMLHttpRequest();
  let id = "";

  // Configure the request
  xhr.open("POST", url, false);
  xhr.setRequestHeader("Content-Type", "application/json"); // Set the content type to JSON

  // Define a callback function to handle the response
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Successful response
      const response = xhr.responseText;
      id = response;
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
  return id;
}
function findNearByWorkshopsApi(id) {
  try {
    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Define the URL for your Spring Boot GET endpoint
    var url = "http://localhost:8080/booking/nearWorkshops?bookingId=" + id;

    let user = [];

    // Configure the request
    xhr.open("GET", url, false);

    // Set up a callback function to handle the response
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Successful response
        var responseData = xhr.responseText;

        // You can parse the response as JSON if it's JSON data

        user = JSON.parse(responseData);
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
    return {
      status: 200,
      message: "Success",
      data: user,
    };
  } catch (error) {
    console.log("error", error);
    return {
      status: error.code,
      message: "No Workshop Found",
    };
  }
}

function oneWorkshopCard(obj, id) {
  let workshop = obj["workshopInfo"];
  // Create the workshop div element
  const workshopDiv = document.createElement("div");
  workshopDiv.className = "workshop";

  // Create the icon element for the store
  const storeIcon = document.createElement("i");
  storeIcon.className = "material-symbols-outlined";
  storeIcon.textContent = "store";

  // Create the detail div element
  const detailDiv = document.createElement("div");
  detailDiv.className = "detail";

  // Create the first info div element
  const infoDiv1 = document.createElement("div");
  infoDiv1.className = "info";

  // Create the icon element for storefront
  const storefrontIcon = document.createElement("p");
  storefrontIcon.className = "material-symbols-outlined";
  storefrontIcon.textContent = "storefront";

  // Create the workshop name element
  const workshopName = document.createElement("p");
  workshopName.textContent = workshop["workshopName"];

  // Append the icon and name to the first info div
  infoDiv1.appendChild(storefrontIcon);
  infoDiv1.appendChild(workshopName);

  // Create the second info div element
  const infoDiv2 = document.createElement("div");
  infoDiv2.className = "info";

  // Create the icon element for pedal bike
  const pedalBikeIcon = document.createElement("p");
  pedalBikeIcon.className = "material-symbols-outlined";
  pedalBikeIcon.textContent = "pedal_bike";

  // Create the text for 2 wheelers
  const twoWheelersText = document.createTextNode(
    workshop["workshopType"] + " Wheelers"
  );

  // Append the icon and text to the second info div
  infoDiv2.appendChild(pedalBikeIcon);
  infoDiv2.appendChild(twoWheelersText);

  // Create the third info div element
  const infoDiv3 = document.createElement("div");
  infoDiv3.className = "info";

  // Create the icon element for phone in talk
  const phoneInTalkIcon = document.createElement("p");
  phoneInTalkIcon.className = "material-symbols-outlined";
  phoneInTalkIcon.textContent = "phone_in_talk";

  // Create the phone number text
  const phoneNumberText = document.createTextNode(workshop["user"]["number"]);

  // Append the icon and phone number to the third info div
  infoDiv3.appendChild(phoneInTalkIcon);
  infoDiv3.appendChild(phoneNumberText);

  // Create the btn div element
  const btnDiv = document.createElement("div");
  btnDiv.className = "btn";

  // Create the distance text
  const distanceText = document.createElement("p");
  distanceText.textContent = obj["distance"].toFixed(2) + " km";

  // Create the anchor (a) element
  const anchorElement = document.createElement("a");
  anchorElement.className = "material-symbols-outlined";
  anchorElement.href =
    "https://www.google.com/maps/place/" + workshop["workshopAddress"];
  anchorElement.textContent = "home_pin";

  // Create the span element for visibility
  const visibilitySpan = document.createElement("span");
  visibilitySpan.className = "material-symbols-outlined";
  visibilitySpan.textContent = "visibility";

  // Append the distance, anchor, and span to the btn div
  btnDiv.appendChild(distanceText);
  btnDiv.appendChild(anchorElement);
  btnDiv.appendChild(visibilitySpan);

  // Append all the elements to the workshop div
  workshopDiv.appendChild(storeIcon);
  workshopDiv.appendChild(detailDiv);
  detailDiv.appendChild(infoDiv1);
  detailDiv.appendChild(infoDiv2);
  detailDiv.appendChild(infoDiv3);
  workshopDiv.appendChild(btnDiv);
  let workshopContain = document.getElementById(id);

  // Append the workshop div to the document body or any other desired container
  workshopContain.appendChild(workshopDiv);
}

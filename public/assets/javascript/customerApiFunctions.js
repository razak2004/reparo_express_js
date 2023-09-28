function createWorkshop(obj, id) {
  // Create elements
  const div = document.createElement("div");
  div.classList.add("workShopCard");

  const icon = document.createElement("span");
  icon.classList.add("material-symbols-outlined");
  icon.innerText = "store";

  const img = document.createElement("img");
  img.setAttribute("src", obj["image"]);
  img.setAttribute("alt", "workshop image");

  const h3 = document.createElement("h3");
  h3.textContent = obj["workshopName"];

  const cardMidDiv = document.createElement("div");
  cardMidDiv.classList.add("cardMid");

  const ratingsDiv = document.createElement("div");
  ratingsDiv.classList.add("content");
  const ratingsH6 = document.createElement("h6");
  ratingsH6.textContent = "Ratings: ⭐⭐⭐⭐";
  ratingsDiv.appendChild(ratingsH6);

  const typeDiv = document.createElement("div");
  typeDiv.classList.add("content");
  const typeH6 = document.createElement("h6");
  typeH6.textContent = "Type: " + obj["type"] + " Wheelers";
  typeDiv.appendChild(typeH6);

  const addressDiv = document.createElement("div");
  addressDiv.classList.add("content");
  const addressH6 = document.createElement("h6");
  addressH6.textContent =
    "Address: " + obj["address"] + "," + obj["city"] + "," + obj["state"];
  addressDiv.appendChild(addressH6);

  const button = document.createElement("button");
  button.addEventListener("click", () => {
    openView(obj);
  });

  const span = document.createElement("span");
  span.setAttribute("class", "material-symbols-outlined");
  span.innerText = "visibility";
  button.append(span);
  let p = document.createElement("p");
  p.innerText = "View";
  button.append(p);

  if (obj["image"] == null) div.appendChild(icon);
  // Append elements to their respective parents
  else div.appendChild(img);

  div.appendChild(h3);
  div.appendChild(cardMidDiv);

  cardMidDiv.appendChild(ratingsDiv);
  cardMidDiv.appendChild(typeDiv);
  cardMidDiv.appendChild(addressDiv);

  div.appendChild(button);

  // Append the created DOM to a parent element on the page
  const parentElement = document.getElementById(id);
  parentElement.appendChild(div);
}

function openView(obj) {
  const container = document.getElementById("workshopsContainer");
  container.style.display = "none";
  const workshopCard = document.getElementById("workshopCard");
  workshopCard.style.display = "flex";
}
//get live location
function getLiveLocation(latitude, longitude) {
  let address = {};
  const apiUrl = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`;

  const xhr = new XMLHttpRequest();
  xhr.open("GET", apiUrl, false);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        try {
          const data = JSON.parse(xhr.responseText);
          const arr = data["display_name"].split(",");
          address = {
            streetAddress: "",
            city: arr[arr.length - 4].trim(),
            state: arr[arr.length - 3].trim(),
            country: arr[arr.length - 1].trim(),
          };
          for (let i = 0; i < arr.length - 4; i++) {
            address["streetAddress"] += arr[i] + ",";
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      } else {
        console.error("Request failed with status:", xhr.status);
      }
    }
  };

  xhr.send();

  return address;
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
function createOtpCard(obj, id) {
  // Create the elements
  const otpCardDiv = document.createElement("div");
  otpCardDiv.id = "otpCard";

  const h4 = document.createElement("h4");
  h4.textContent =
    obj["workshopInfo"]["workshopName"] + " accepted your request";

  const p = document.createElement("p");
  p.textContent = "Share this otp to the Workshop owner";

  const h5 = document.createElement("h5");
  h5.textContent = obj["otp"];

  const locationLink = document.createElement("a");
  locationLink.href = "#";
  const locationIcon = document.createElement("i");
  locationIcon.className = "material-symbols-outlined";
  locationIcon.textContent = " near_me ";
  locationLink.href =
    "https://www.google.com/maps/place/" +
    obj["workshopInfo"]["workshopAddress"];

  locationLink.appendChild(locationIcon);
  locationLink.appendChild(document.createTextNode(" Location"));

  const phoneLink = document.createElement("a");
  phoneLink.href = "";
  const num = document.createElement("p");
  const phoneIcon = document.createElement("i");
  phoneIcon.className = "material-symbols-outlined";
  phoneIcon.textContent = " phone_in_talk ";
  num.innerText = obj["workshopInfo"]["user"]["number"];
  // document.createTextNode();
  phoneLink.appendChild(phoneIcon);
  phoneLink.appendChild(num);

  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancel Booking";
  cancelButton.addEventListener("click", () => {
    let con = confirm("Are you sure want to cancel this booking");
    if (con) {
      cancelBooking(obj["bookingId"], "user");
    }
  });

  // Append elements to the otpCardDiv
  otpCardDiv.appendChild(h4);
  otpCardDiv.appendChild(p);
  otpCardDiv.appendChild(h5);
  otpCardDiv.appendChild(locationLink);
  otpCardDiv.appendChild(phoneLink);
  otpCardDiv.appendChild(cancelButton);

  // Append the otpCardDiv to the document body or any other desired location
  document.querySelector(id).appendChild(otpCardDiv);
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
  localStorage.removeItem("livebookingId");
  window.location.reload();
  return chk;
}

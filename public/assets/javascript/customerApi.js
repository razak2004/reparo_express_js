let latitude;
let longitude;
navigator.geolocation.getCurrentPosition(async function (position) {
  latitude = await position.coords.latitude;
  longitude = await position.coords.longitude;
});
function getUserByid(id) {
  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Define the URL for your Spring Boot GET endpoint
  var url = "http://localhost:8080/user/findById?id=" + id; // Replace with your actual endpoint URL

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
function getAllWorkshops(id) {
  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Define the URL for your Spring Boot GET endpoint
  var url = "http://localhost:8080/workshop/getAllWorkshops?id=" + id; // Replace with your actual endpoint URL

  let workshops = [];

  // Configure the request
  xhr.open("GET", url, false);

  // Set up a callback function to handle the response
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Successful response
      var responseData = xhr.responseText;
      workshops = JSON.parse(responseData);
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
  return workshops;
}
let userId = localStorage.getItem("loginUserId");
let liveBookingId = localStorage.getItem("livebookingId");
if (userId != null) {
  let user = getUserByid(userId);
  let userName = document.getElementById("userName");
  if (userName != null) {
    userName.innerText = "Hi " + user.name + " ! !";
    let workshops = getAllWorkshops(userId);
    console.log(workshops);
    for (let i = 0; i < workshops.length; i++) {
      createWorkshop(workshops[i], "workshops");
    }
  }
  const liveAddressButton = document.getElementById("liveAddress");
  if (liveAddressButton != null) {
    liveAddressButton.addEventListener("click", () => {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          let add = getLiveLocation(latitude, longitude);
          console.log(add);
          const bookingAddress = document.getElementById("address");
          bookingAddress.value = add.streetAddress;
        },
        function (error) {
          // Handle errors, such as permission denied or unavailable location services
          console.error("Error getting location: " + error.message);
        }
      );
    });
  }

  const bookingForm = document.getElementById("liveBookingForm");
  if (bookingForm != null) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let existBooking = sessionStorage.getItem("livebookingId");
      if (existBooking != null) {
        alert("you have requested a service cancel it to create another");
        window.location.href = "./customerActivity.html";
      } else {
        let country = document.getElementById("countries");
        let state = document.getElementById("state");
        let city = document.getElementById("district");
        let address = document.getElementById("address").value;
        let type = document.getElementById("vehicleType");
        let company = document.getElementById("vehicleCompany");
        let model = document.getElementById("vehicleModel");
        let vehicleNumber = document.getElementById("vehicleNumber").value;
        let vehicleYear = document.getElementById("vehicleYear").value;
        let problem = document.getElementById("vehicleProblem").value;

        let validYear = vehicleYearValidation(vehicleYear);
        let validVehicleNumber = validateVehicleNumber(vehicleNumber);
        let validateProblem = problemValidation(problem);
        let validAddress = addressValidation(address);

        if (
          validVehicleNumber &&
          validYear &&
          validateProblem &&
          validAddress
        ) {
          let con = confirm("Confirm to search workshop near you ");
          if (con) {
            let vehicle = {
              userId: localStorage.getItem("loginUserId"),
              vehicleType: type.value,
              vehicleNumber,
              vehicleYear,
              vehicleCompany: company.value,
              vehicleModel: model.value,
            };
            let id = createVehicleApi(vehicle);
            let bookingData = {
              bookedVehicleId: id,
              problem,
              bookedCountry: country.value,
              bookedState: state.value,
              bookedAddress: address,
              bookedCity: city.value,
              bookedLatitude: latitude,
              bookedLongitude: longitude,
            };

            console.log("booking", bookingData);
            let bookingId;
            try {
              bookingId = createBookingApi(bookingData);
            } catch (error) {
              alert(error);
            }
            localStorage.setItem("livebookingId", bookingId);
            window.location.href = "./customerActivity.html";
          } else {
            return;
          }
        } else return;
      }
    });
  }
} else {
  alert("Please login first");
  window.location.href("../../index.html");
}

isUserLogged();
let id = sessionStorage.getItem("loggedUserId");
let userId = tokenToId(id);
let response = UserServiceApi.findUserById(userId);
if (response.statusCode == 200) {
  let user = JSON.parse(response.data);
  document.getElementById("userName").innerText = "Hi " + user.name + " !!    ";
  let latitude;
  let longitude;
  navigator.geolocation.getCurrentPosition(async function (position) {
    latitude = await position.coords.latitude;
    longitude = await position.coords.longitude;
  });
  let workshopResponse = WorkshopServiceApi.getAllWorkshops(userId);
  let workshops = JSON.parse(workshopResponse.data);
  for (let i = 0; i < workshops.length; i++) {
    createWorkshop(workshops[i], "workshops");
  }

  // workshop present or not
  const district = document.getElementById("district");
  district.addEventListener("change", (e) => {
    const selectedDistrict = e.target.value;
    let response = WorkshopServiceApi.isWorkshopPresent(selectedDistrict);
    if (response.statusCode != 200) {
      Notify.error("Sorry " + user.name + " " + response.error);
      alert("Sorry " + user.name + " " + response.error);
    }
  });

  // live address Button
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
        let country = document.getElementById("countries").value;
        let state = document.getElementById("state").value;
        let city = document.getElementById("district").value;
        let address = document.getElementById("address").value;
        let type = document.getElementById("vehicleType");
        let company = document.getElementById("vehicleCompany");
        let model = document.getElementById("vehicleModel");
        let vehicleNumber = document.getElementById("vehicleNumber").value;
        let vehicleYear = document.getElementById("vehicleYear").value;
        let problem = document.getElementById("vehicleProblem").value;

        let response = WorkshopServiceApi.isWorkshopPresent(city);
        if (response.statusCode != 200) {
          Notify.error("Sorry " + user.name + " " + response.error);
          alert("Sorry " + user.name + " " + response.error);
          return;
        }

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
              userId: userId,
              vehicleType: type.value,
              vehicleNumber,
              vehicleYear,
              vehicleCompany: company.value,
              vehicleModel: model.value,
            };

            let response = VehicleServiceApi.createVehicle(vehicle);
            if (response.statusCode == 200) {
              let vehicleId = JSON.parse(response.data);
              let bookingData = {
                bookedVehicleId: vehicleId,
                problem,
                bookedCountry: country,
                bookedState: state,
                bookedAddress: address,
                bookedCity: city,
                bookedLatitude: latitude,
                bookedLongitude: longitude,
              };
              console.log(bookingData);
              let bookingResponse =
                BookingServiceApi.createBooking(bookingData);
              //   console.log(bookingResponse);
              if (bookingResponse.statusCode == 200) {
                let response = JSON.parse(bookingResponse.data);
                sessionStorage.setItem("liveBookingId", idToToken(response));
                window.location.href = "./customerActivity.html";
              } else {
                alert(response.error);
                Notify.error(response.error);
                return;
              }
            } else {
              Notify.error(response.error);
              alert(response.error);
              return;
            }
          } else {
            return;
          }
        } else return;
      }
    });
  }
} else {
  Notify.error(response.error);
}

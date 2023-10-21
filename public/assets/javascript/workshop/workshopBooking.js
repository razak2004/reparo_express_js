isUserLogged();
let userToken = sessionStorage.getItem("loggedUserId");
let userId = tokenToId(userToken);
let workshopResponse = WorkshopServiceApi.findWorkshopByUserId(userId);
let workshop = JSON.parse(workshopResponse.data);
console.log(workshop);
let liveBookingId = sessionStorage.getItem("liveAcceptedBookingId");
if (liveBookingId == null) {
  let bookingResponse = WorkshopServiceApi.findBookings(workshop.workshopId);
  let bookings = JSON.parse(bookingResponse.data);
  if (bookings == null) {
    document.getElementById("headBooking").innerText = "No available bookings";
  } else {
    if (bookings.length != 0) {
      for (let i = 0; i < bookings.length && i < 3; i++) {
        if (bookings[i]["live"]) {
          createBookingCard(
            bookings[i],
            "bookingContainer",
            workshop["workshopId"]
          );
        }
      }
      console.log(bookings);
    } else {
      document.getElementById("headBooking").innerText =
        "No available bookings";
    }
  }
} else {
  let bookingId = tokenToId(liveBookingId);
  let response = BookingServiceApi.findBookingById(bookingId);
  let bookingData = JSON.parse(response.data);
  if (bookingData.request == false) {
    alert("Sorry Customer Cancelled  the booking ");
    sessionStorage.removeItem("liveAcceptedBookingId");
    window.location.reload();
  }
  if (bookingData["otp"] != 0) {
    // Live Tracking  ;
    createOtpCard("#otpDiv", bookingData);
    // const lat = bookingData.bookedLatitude;
    // const lon = bookingData.bookedLongitude;
    // const meclat = bookingData.mecLatitude;
    // const meclon = bookingData.mecLongitude;
    // let dif = lat - meclat;
    // let disLon = lon - meclon;
    // let difCom = dif / 10;
    // let i = 1;

    // console.log(dif + " " + difCom);

    // const btn = document.getElementById("liveBtn");
    // btn.style.display = "flex";
    // btn.addEventListener("click", () => {
    //   if ("geolocation" in navigator) {
    //     navigator.geolocation.getCurrentPosition(async function (position) {
    //       // Get the latitude and longitude from the position object
    //       let latitude = await position.coords.latitude;
    //       let longitude = await position.coords.longitude;
    //       latitude = latitude - difCom * i;
    //       i++;

    //       let booking = { id: bookingId, role: 3, latitude, longitude };
    //       let bookResp = BookingServiceApi.updateLiveBooking(booking);
    //       let data = JSON.parse(bookResp.data);
    //       console.log(data);
    //       let distance = document.getElementById("distanceKm");
    //       distance.innerText = data.distance;
    //     });
    //   }
    // });
    // setInterval(() => {
    //   btn.click();
    // }, 4000);
    // Live Tracking
    // Initial coordinates of Point 1 and Point 2
  } else {
    let serviceListResponse = ServiceListServiceApi.findServiceListByBookingId(
      bookingData["bookingId"]
    );
    let serviceList = JSON.parse(serviceListResponse.data);
    if (!serviceList["live"]) {
      document.getElementById("serviceDetailDiv").style.display = "flex";

      document.getElementById("Total").innerText = serviceList["serviceAmount"];
      let serviceArr = serviceList["listOfServices"];
      if (serviceArr.length != 0) {
        for (let i = 0; i < serviceArr.length; i++) {
          createServiceDiv(serviceArr[i], ".serviceLists");
        }
      }
      const addServiceBtn = document.getElementById("addserviceButtom");
      if (addServiceBtn != null) {
        addServiceBtn.addEventListener("click", () => {
          openCreateServiceForm(serviceList["listId"]);
        });
      }
      const liveBtn = document.getElementById("sendButton");
      if (liveBtn != null) {
        liveBtn.addEventListener("click", () => {
          let span = document.createElement("span");
          span.className = "material-symbols-outlined";
          span.innerText = "rocket";
          document.getElementById("serviceDetailDiv").style.display = "none";

          document.querySelector(".rocket_launch").append(span);
          setInterval(() => {
            let liveResp = ServiceListServiceApi.makeServiceListLive(
              serviceList["listId"]
            );
            if (liveResp.statusCode == 200) {
              window.location.reload();
            }
          }, 2000);
        });
      }
    } else {
      document.getElementById("headBooking").innerText =
        "Your List has been sent to the customer ";
      setInterval(() => {
        sessionStorage.removeItem("liveAcceptedBookingId");
        window.location.reload();
      }, 2000);
    }

    console.log(serviceList);
  }
  console.log(bookingData);
}

let button = document.createElement("input");
button.click();

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
    createOtpCard("#otpDiv", bookingData);
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

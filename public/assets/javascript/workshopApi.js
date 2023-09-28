let userId = localStorage.getItem("loginUserId");
if (userId != null) {
  let user = getWorkshopByUserId(userId);
  console.log(user);
  let liveBookingId = localStorage.getItem("liveAcceptedBookingId");
  if (liveBookingId != null) {
    let booking = getBookingByIdApi(liveBookingId);
    console.log(booking);
    if (booking["otp"] != 0) {
      createOtpCard("#otpDiv", booking);
    } else {
      //
      let serv = getServiceList(booking["bookingId"]);
      //  for(let obj :serv.)
      console.log(serv);
      const serviceDiv = document.getElementById("serviceDetailDiv");
      serviceDiv.style.display = "flex";

      document.getElementById("Total").innerText = serv["serviceAmount"];
      const addserviceButton = document.getElementById("addserviceButtom");
      addserviceButton.addEventListener("click", () => {
        openCreateServiceForm(serv["listId"]);
      });
      const cancelButton = document.getElementById("cancelButton");
      cancelButton.addEventListener("click", () => {
        let con = confirm("Are you sure to cancel this Booking");
        if (con) {
          let s = cancelBooking(booking["bookingId"], "workshop");
          // localStorage.removeItem("")
        }
      });
      let arr = serv["listOfServices"];
      for (let i = 0; i < arr.length; i++) {
        createServiceDiv(arr[i], ".serviceLists");
      }
    }
  } else {
    let bookings = getUnAcceptedBooking(user.workshopId);
    bookings.sort((a, b) => a.distance - b.distance);
    if (bookings.length != 0) {
      for (let i = 0; i < bookings.length && i < 3; i++) {
        if (bookings[i]["live"]) {
          createBookingCard(
            bookings[i],
            "bookingContainer",
            user["workshopId"]
          );
        }
      }
      console.log(bookings);
    } else {
      document.getElementById("headBooking").innerText =
        "No available bookings";
    }
  }
}

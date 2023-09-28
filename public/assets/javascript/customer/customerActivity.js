isUserLogged();
let liveBooking = sessionStorage.getItem("liveBookingId");
if (liveBooking != null) {
  document.getElementById("bookingNotfound").style.display = "none";
  let bookingId = tokenToId(liveBooking);
  let response = BookingServiceApi.findBookingById(bookingId);
  let booking = JSON.parse(response.data);
  console.log(booking);
  if (booking["acceptStatus"] == false && booking["live"] == true) {
    document.getElementById("waitingCard").style.display = "flex";

    let workshopResponse = BookingServiceApi.findNearByWorkshops(bookingId);
    let workshops = JSON.parse(workshopResponse.data);
    workshops.sort((a, b) => a.distance - b.distance);
    let i = 0;
    const intervalId = setInterval(() => {
      if (i < 3) {
        let h2 = document.getElementById("workshopNo");
        h2.innerText = "Founded " + (i + 1) + " Workshop near you";
        oneWorkshopCard(workshops[i], "container");
      }
      i++;
    }, 5000);
    let cancelBtn = document.getElementById("cancelButton");
    cancelBtn.addEventListener("click", () => {
      let con = confirm("Are you want to cancel the request");
      if (con) {
        let response = BookingServiceApi.cancelBooking(bookingId, "user");
        if (response.statusCode == 200) {
          alert("your booking has been cancelled successfully");
          sessionStorage.removeItem("liveBookingId");
          window.location.reload();
        } else {
          Notify.error(response.error);
        }
      }
    });
    console.log(workshops);
  } else if (
    booking["acceptStatus"] &&
    booking["live"] &&
    booking["otp"] != 0
  ) {
    createOtpCard(booking, ".otpCard");
  } else if (
    booking["acceptStatus"] &&
    booking["live"] &&
    booking["otp"] == 0
  ) {
    let serviceListResponse =
      ServiceListServiceApi.findServiceListByBookingId(bookingId);
    let serviceList = JSON.parse(serviceListResponse.data);
    console.log(serviceList);
    if (serviceList.live) {
      document.getElementById("totalRupees").innerText =
        serviceList["serviceAmount"];
      let serArr = serviceList["listOfServices"];
      console.log(serArr);
      for (let i = 0; i < serArr.length; i++) {
        createServiceDiv(serArr[i], ".serviceLists");
      }

      document.getElementById("serviceDetailDiv").style.display = "flex";
      const cancelButton = document.getElementById("cancelBtn");
      cancelButton.addEventListener("click", () => {
        let con = confirm("Are you want to cancel your service list");
        if (con) {
          let cancelReason = prompt(
            "please enter the reason for your cancellation"
          );
          let data = { cancelReason, serviceListId: serviceList["listId"] };
          let resp = ServiceListServiceApi.rejectServiceList(data);
          if (resp.statusCode == 200) {
            alert("thanks For Your feedback");
            sessionStorage.removeItem("liveBookingId");
            window.location.href = "./cust.html";
          }
        }
      });
      const accBtn = document.getElementById("accBtn");
      if (accBtn != null) {
        accBtn.addEventListener("click", () => {
          let resp = ServiceListServiceApi.acceptServiceList(
            serviceList["listId"]
          );
          if (resp.statusCode == 200) {
            alert("Thanks for using Our application for your concerns");
            sessionStorage.removeItem("liveBookingId");
            window.location.href = "./cust.html";
          }
        });
      }
    } else {
      document.getElementById("serviceWaitingCard").style.display = "flex";
    }
  }
}

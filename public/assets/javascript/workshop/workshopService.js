isUserLogged();
let tok = sessionStorage.getItem("loggedUserId");
let userId = tokenToId(tok);
let workshopResponse = WorkshopServiceApi.findWorkshopByUserId(userId);
let workshop = JSON.parse(workshopResponse.data);
let workshopId = workshop["workshopId"];
alert(workshopId);
let bookingRes = BookingServiceApi.findBookingByWorkshopId(workshopId);
if (bookingRes.statusCode == 200) {
  let bookingArr = JSON.parse(bookingRes.data);
  console.log(bookingArr);
} else {
  Notify.error(bookingRes.error);
}

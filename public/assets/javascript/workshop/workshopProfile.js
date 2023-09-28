isUserLogged();
let tok = sessionStorage.getItem("loggedUserId");
let userId = tokenToId(tok);
let workshopResponse = WorkshopServiceApi.findWorkshopByUserId(userId);
let workshop = JSON.parse(workshopResponse.data);
console.log(workshop);
document.getElementById("ownerName").value = workshop.user.name;
document.getElementById("ownerNumber").value = workshop.user.number;
document.getElementById("workshopName").value = workshop.workshopName;
document.getElementById("workshopType").value =
  workshop.workshopType + " Wheelers";
document.getElementById("workshopAddress").value = workshop.workshopAddress;
document.getElementById("city").value = workshop.workshopCity;
document.getElementById("state").value = workshop.workshopState;
document.getElementById("country").value = workshop.workshopCountry;

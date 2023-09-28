isUserLogged();
let id = sessionStorage.getItem("loggedUserId");
let userId = tokenToId(id);
let response = UserServiceApi.findUserById(userId);
const app = document.querySelector("#app");
app.addEventListener("click", () => {
  document.querySelector(".logBtnCont").style.display = "flex";
  setInterval(() => {
    document.querySelector(".logBtnCont").style.display = "none";
  }, 5000);
});
const logoutBtn = document.getElementById("logout");
if (logoutBtn != null) {
  logoutBtn.onclick = function () {
    let con = confirm("Are you sure to logout");
    if (con) {
      sessionStorage.removeItem("loggedUserId");
      window.location.href = "../../index.html";
    }
  };
}

if (response.statusCode == 200) {
  let user = JSON.parse(response.data);
  document.getElementById("profileName").innerText = user.name;
  document.getElementById("profileNumber").innerText = user.number;
  let vehicleResp = VehicleServiceApi.getVehicleByUserId(user.id);
  if (vehicleResp.statusCode == 200) {
    let vehicles = JSON.parse(vehicleResp.data);
    for (let i = 0; i < vehicles.length; i++) {
      profileVehicleCard(vehicles[i], ".vehicleContainer", i + 1);
    }
  } else {
    document.querySelector(".vehicleContainer").innerText = vehicleResp.error;
  }
} else {
  Notify.error(response.error);
}

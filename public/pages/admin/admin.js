let cusArray = JSON.parse(localStorage.getItem("users"));
let cusVehicles = JSON.parse(localStorage.getItem("Customer_vehicles"));
let mechArray = JSON.parse(localStorage.getItem("mechanics"));
let workshops = JSON.parse(localStorage.getItem("workshops"));
let mechServices = JSON.parse(localStorage.getItem("mechServices"));

let n = cusArray.length;
let m = mechArray.length;
function createCard(ar, id, funcName) {
  for (let i = 0; i < ar.length; i++) {
    let card = document.createElement("div");
    card.setAttribute("class", "cust");
    let image = document.createElement("img");
    image.setAttribute("src", ar[i]["image"]);
    image.setAttribute("alt", "image");
    card.append(image);
    let num = document.createElement("p");
    num.innerText = "ID : " + ar[i]["user_id"];
    card.append(num);
    let name = document.createElement("p");
    name.innerText = "Name : " + ar[i]["name"];
    card.append(name);
    let anchor = document.createElement("a");
    let icon = document.createElement("i");
    icon.setAttribute("class", "material-symbols-outlined");
    anchor.setAttribute("onclick", funcName + "(" + ar[i]["user_id"] + ")");
    anchor.innerText = "view";
    icon.innerText = "visibility";
    anchor.append(icon);
    card.append(anchor);
    let app = document.getElementById(id);
    app.append(card);
  }
}

// function openDetail(id) {
//   let check = checkID(id);
//   if (check == true) {
//     cusDetail(id);
//   }
//   if (check === false) {
//     mechDetails(id);
//   }
// }

// function checkID(id) {
//   let selectCustomer = cusArray.find((e) => {
//     if (id == e["user_id"]) {
//       return true;
//     }
//   });
//   let selectMechanic = mechArray.find((e) => {
//     if (e["user_id"] == id) {
//       return false;
//     }
//   });
// }
// function to detail page
function cusDetail(id) {
  let card = document.querySelector(".detailCard");
  card.style.display = "block";

  let selectCustomer = cusArray.find((e) => {
    if (id == e["user_id"]) {
      return true;
    }
  });
  let selectVehicle = cusVehicles.find((e) => {
    if (id == e["CustomerId"]) {
      return true;
    }
  });
  console.log(selectVehicle);

  const profileImg = document.getElementById("pDetail_img");
  profileImg.setAttribute("src", selectCustomer["image"]);
  const userID = document.getElementById("userId");
  const name = document.getElementById("dName");
  const number = document.getElementById("dNum");
  const email = document.getElementById("dEmail");
  const pass = document.getElementById("dPass");
  const address = document.getElementById("dAddress");
  const city = document.getElementById("dCity");

  // vehicle details
  const vehicleId = document.getElementById("vehicleId");
  const vehicleImage = document.getElementById("vehicleDetail_img");
  const type = document.getElementById("vehicleType");
  const fuel = document.getElementById("fuel");
  const company = document.getElementById("company");
  const model = document.getElementById("model");
  const year = document.getElementById("year");
  const vehicleNum = document.getElementById("vehicleNumber");

  userID.innerText = selectCustomer["user_id"];
  name.innerText = selectCustomer["name"];
  number.innerText = selectCustomer["number"];
  email.innerText = selectCustomer["email"];
  pass.innerText = selectCustomer["password"];
  address.innerText = selectCustomer["address"];
  city.innerText = selectCustomer["city"];
  // alert(id);
  // append value
  vehicleId.innerText = selectVehicle["VehicleId"];
  vehicleImage.setAttribute("src", selectVehicle["vehicleImage"]);
  type.innerText = selectVehicle["vehicleType"];
  fuel.innerText = selectVehicle["fuelType"];
  company.innerText = selectVehicle["VehicleCompany"];
  model.innerText = selectVehicle["vehicleModel"];
  year.innerText = selectVehicle["vehicleYear"];
  vehicleNum.innerText = selectVehicle["vehicleNumber"];
}
// function to back
function exitDetail() {
  let card = document.querySelector(".detailCard");
  card.style.display = "none";
}

function mechDetails(id) {
  try {
    let card = document.querySelector(".detailCard");
    card.style.display = "block";

    selectMechanic = mechArray.find((e) => {
      if (e["user_id"] == id) {
        return true;
      }
    });

    selectWorkshop = workshops.find((e) => {
      if (id == e["mechanicId"]) {
        return true;
      }
    });
    selectService = mechServices.find((e) => {
      if (e["mechanicId"] == id) {
        return true;
      }
    });

    const detailImg = document.getElementById("detailImg");
    const userId = document.getElementById("userId");
    const dName = document.getElementById("dName");
    const dNum = document.getElementById("dNum");
    const dEmail = document.getElementById("dEmail");
    const dPass = document.getElementById("dPass");
    const specialized = document.getElementById("specialized");
    const experience = document.getElementById("experience");
    const workshopImage = document.getElementById("WorkshopImage");
    const workshopId = document.getElementById("workshopId");
    const workshopName = document.getElementById("workshopName");
    const workshopNum = document.getElementById("workshopNum");
    const workshopAddress = document.getElementById("workshopAddress");
    const city = document.getElementById("city");
    const open = document.getElementById("open");
    const close = document.getElementById("close");
    const start = document.getElementById("start");
    const type = document.getElementById("type");
    const serviceId = document.getElementById("serviceId");
    const generalCost = document.getElementById("generalCost");
    const standardCost = document.getElementById("standardCost");
    const premeiumCost = document.getElementById("premeiumCost");
    const electricCost = document.getElementById("electricCost");
    const brkdownCost = document.getElementById("brkdownCost");

    detailImg.innerText = selectMechanic["profile_pic"];
    userId.innerText = selectMechanic["user_id"];
    dName.innerText = selectMechanic["name"];
    dNum.innerText = selectMechanic["number"];
    dEmail.innerText = selectMechanic["email"];
    dPass.innerText = selectMechanic["password"];
    specialized.innerText = selectMechanic["specialized"];
    experience.innerText = selectMechanic["experience"];

    workshopImage.innerText = selectWorkshop["workshopImage"];
    workshopId.innerText = selectWorkshop["workshopId"];
    workshopName.innerText = selectWorkshop["workshopName"];
    workshopNum.innerText = selectWorkshop["workshopNumber"];
    workshopAddress.innerText = selectWorkshop["workshopAddress"];
    city.innerText = selectWorkshop["workshopCity"];
    open.innerText = selectWorkshop["openTiming"];
    close.innerText = selectWorkshop["closeTiming"];
    start.innerText = selectWorkshop["startedOn"];
    type.innerText = selectWorkshop["workshopType"];

    serviceId.innerText = selectService["serviceId"];
    generalCost.innerText = selectService["generalCost"];
    standardCost.innerText = selectService["standardCost"];
    premeiumCost.innerText = selectService["premeiumCost"];
    electricCost.innerText = selectService["electricCost"];
    brkdownCost.innerText = selectService["brkdownCost"];
  } catch (err) {}
}

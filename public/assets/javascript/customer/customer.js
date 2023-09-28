// filter
const filterButton = document.getElementById("filter");
filterButton.addEventListener("mouseover", () => {
  let filterCont = document.getElementById("filterButtons");
  filterCont.style.display = "flex";
});

// inner filter button
const innerFilter = document.getElementById("filterButtons");
innerFilter.addEventListener("mouseout", () => {
  innerFilter.style.display = "none";
  //   locationInput.style.display = "none";
  //   vehicleInput.style.display = "none";
});
innerFilter.addEventListener("mouseover", () => {
  innerFilter.style.display = "flex";
});
// locationFilter
const locButton = document.getElementById("locationFil");
locButton.addEventListener("click", () => {
  let locationInput = document.getElementById("locationInp");
  locationInput.style.display = "flex";
  vehicleInput.style.display = "none";
});
//location input filter
let locationInput = document.getElementById("locationInp");
locationInput.addEventListener("mouseover", () => {
  innerFilter.style.display = "flex";
  locationInput.style.display = "flex";
  vehicleInput.style.display = "none";
  locButton.style.color = "white";
  locButton.style.backgroundColor = "black";
});
locationInput.addEventListener("mouseout", () => {
  innerFilter.style.display = "none";
  locationInput.style.display = "none";
  vehicleInput.style.display = "none";
});
const vehButton = document.getElementById("vehicleFil");
vehButton.addEventListener("click", () => {
  let vehicleInput = document.getElementById("vehicleInp");
  vehicleInput.style.display = "flex";
  locationInput.style.display = "none";
});
//location input filter
let vehicleInput = document.getElementById("vehicleInp");
vehicleInput.addEventListener("mouseover", () => {
  innerFilter.style.display = "flex";
  vehicleInput.style.display = "flex";
  vehButton.style.color = "white";
  vehButton.style.backgroundColor = "black";
});
vehicleInput.addEventListener("mouseout", () => {
  innerFilter.style.display = "none";
  vehicleInput.style.display = "none";
});
// end of the filters

let countryArr = document.getElementById("countries");
let stateArr = document.getElementById("state");
let districtArr = document.getElementById("district");

const authToken = getToken();
async function getData(endpoint) {
  const token = await authToken;
  const response = await fetch(
    `https://www.universal-tutorial.com/api/${endpoint}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.auth_token}`,
        Accept: "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
}
async function getToken() {
  const response = await fetch(
    `https://www.universal-tutorial.com/api/getaccesstoken`,
    {
      method: "GET",
      headers: {
        "api-token":
          "5G63Z8Pifh6ZHt4N2togj-GElSMBCwt9hK4pIMIM1j3y0HsbZTpD_V-89QK1uxEStNQ",
        Accept: "application/json",
        "user-email": "utchikanna3108@gmail.com",
      },
    }
  );
  const data = await response.json();
  return data;
}
async function showData() {
  const dataArr = await getData("countries");
  const stateList = await getData(`states/${dataArr[0]["country_name"]}`);
  let option;

  for (const element of dataArr) {
    option = document.createElement("option");

    option.value = element["country_name"];
    option.text = element["country_name"];
    countryArr.appendChild(option);
  }
  for (const element of stateList) {
    option = document.createElement("option");
    option.value = element["state_name"];
    option.text = element["state_name"];
    stateArr.appendChild(option);
  }
}
showData();
countryArr.addEventListener("change", async () => {
  const dataArr = await getData(`states/${countryArr.value}`);
  stateArr.innerHTML = "";

  for (const element of dataArr) {
    var option = document.createElement("option");
    option.value = element["state_name"];
    option.text = element["state_name"];
    stateArr.appendChild(option);
  }
});
stateArr.addEventListener("change", async () => {
  const dataArr = await getData(`cities/${stateArr.value}`);
  districtArr.innerHTML = "";

  for (const element of dataArr) {
    var option = document.createElement("option");
    option.value = element["city_name"];
    option.text = element["city_name"];
    districtArr.appendChild(option);
  }
});

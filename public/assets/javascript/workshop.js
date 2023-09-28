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
let loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener("click", () => {
  openDiv("#workshopLoginForm", "#workshopRegisterForm");
});
let signBtn = document.getElementById("signBtn");
signBtn.addEventListener("click", () => {
  openDiv("#workshopRegisterForm", "#workshopLoginForm");
});

// workshop registration

//name validation
let signUpName = document.getElementById("signName");
signUpName.addEventListener("change", (e) => {
  e = signUpName.value;
  let check = hasnotAlphabet(e);
  if (check == true) {
    Notify.error("Name only contain alphabets");
  }
});
// details
let ownerName = document.getElementById("ownerName");
ownerName.addEventListener("change", (e) => {
  e = ownerName.value;
  let check = hasnotAlphabet(e);
  if (check == true) {
    Notify.error("Name only contain alphabets");
  }
});
//workshop name
let workshopName = document.getElementById("workshopName");
workshopName.addEventListener("change", (e) => {
  e = workshopName.value;
  let check = hasnotAlphabet(e);
  if (check == true) {
    Notify.error("Name only contain alphabets");
  }
});

//number validation

let signUpNumber = document.getElementById("signNumber");
signUpNumber.addEventListener("change", (e) => {
  e = signUpNumber.value;
  let check = hasNumber(e);
  if (check == false) {
    Notify.error("Only Numbers are accepted");
  }
  if (e.length != 10) {
    Notify.error("Number should be 10 digits");
  }
});
let OwnerNumber = document.getElementById("ownerNumber");
OwnerNumber.addEventListener("change", (e) => {
  e = OwnerNumber.value;
  let check = hasNumber(e);
  if (check == false) {
    Notify.error("Only Numbers are accepted");
  }
  if (e.length != 10) {
    Notify.error("Number should be 10 digits");
  }
});

let checkPassword = document.getElementById("signPassword");
checkPassword.addEventListener("change", (e) => {
  e = checkPassword.value;
  let numberCheck = isAlphaNumericPassword(e);
  let len = e.length;
  if (numberCheck == false) {
    Notify.error("only Alphanumeric Characters  are accepted");
  }
  if (len > 10 || len < 6) {
    Notify.error("password should be more than 6 digits");
  }
});

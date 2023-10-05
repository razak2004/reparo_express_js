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
let signUser;

let workshopRegister = sessionStorage.getItem("signWorkshopUserid");
if (workshopRegister != null) {
  let id = tokenToId(workshopRegister);
  let response = UserServiceApi.findUserById(id);
  let user = JSON.parse(response.data);
  document.getElementById("workshopRegisterForm").style.display = "none";
  const workshopForm = document.getElementById("workshopForm");
  workshopForm.style.display = "flex";
  if (workshopForm != null) {
    const stName = document.getElementById("ownerName");
    stName.value = user.name;
    stName.disabled = true;
    const stNum = document.getElementById("ownerNumber");
    stNum.value = user.number;
    stNum.disabled = true;
    let workshopNameTag = document.getElementById("workshopName");
    workshopNameTag.addEventListener("change", () => {
      stringValidation(workshopNameTag.value, "workshop name");
    });
    let workshopaddressTag = document.getElementById("address");
    workshopaddressTag.addEventListener("change", () => {
      addressValidation(workshopaddressTag.value);
    });
    let GeneralCostTag = document.getElementById("GeneralCost");
    GeneralCostTag.addEventListener("change", () => {
      priceValidate(workshopaddressTag.value);
    });
    let electricCostTag = document.getElementById("electricCost");
    electricCostTag.addEventListener("change", () => {
      priceValidate(electricCostTag.value);
    });
    let SuspensionCostTag = document.getElementById("SuspensionCost");
    SuspensionCostTag.addEventListener("change", () => {
      priceValidate(SuspensionCostTag.value);
    });
    let engineCostTag = document.getElementById("engineCost");
    engineCostTag.addEventListener("change", () => {
      priceValidate(engineCostTag.value);
    });

    workshopForm.addEventListener("submit", (e) => {
      e.preventDefault();

      let workshopName = workshopNameTag.value;
      let workshopCountry = document.getElementById("countries").value;
      let workshopState = document.getElementById("state").value;
      let workshopCity = document.getElementById("district").value;
      let workshopAddress = workshopaddressTag.value;
      let workshopType = document.getElementById("vehicleType").value;
      let workshopOpenTime = document.getElementById("openTime").value;
      let workshopCloseTime = document.getElementById("closeTime").value;
      let generalServicePrice = GeneralCostTag.value;
      let engineServicePrice = electricCostTag.value;
      let electricalServicePrice = SuspensionCostTag.value;
      let suspensionServicePrice = engineCostTag.value;
      let chk =
        stringValidation(workshopName, "workshopName") &&
        addressValidation(workshopAddress) &&
        priceValidate(generalServicePrice) &&
        priceValidate(engineServicePrice) &&
        priceValidate(electricalServicePrice) &&
        priceValidate(suspensionServicePrice);
      if (chk) {
        let workshopObj = {
          workshopName,
          workshopCountry,
          workshopState,
          workshopCity,
          workshopAddress,
          workshopType,
          workshopOpenTime,
          workshopCloseTime,
          generalServicePrice,
          engineServicePrice,
          electricalServicePrice,
          suspensionServicePrice,
          latitude: 0,
          longitude: 0,
        };
        // get latitude and longitude
        navigator.geolocation.getCurrentPosition(
          async function (position) {
            workshopObj.latitude = position.coords.latitude;
            workshopObj.longitude = position.coords.longitude;
            let response = WorkshopServiceApi.createWorkShop(workshopObj, id);
            if (response.statusCode == 200) {
              Notify.success("Your Workshop is successfully registered");
              sessionStorage.removeItem("signWorkshopUserid");
              openDiv("#workshopLoginForm", "#workshopForm");
            } else {
              Notify.error(response.error);
              return;
            }
          },
          function (error) {
            // Handle errors, such as user denying permission or unable to determine location
            console.error("Error getting location: " + error.message);
          }
        );
      } else {
        return;
      }
    });
  }
}

// workshop registration form
const signUpForm = document.getElementById("workshopRegisterForm");
// signUp form
if (signUpForm != null) {
  let nameTag = document.getElementById("signName");
  nameTag.addEventListener("change", () => {
    stringValidation(nameTag.value, "name");
  });
  let numberTag = document.getElementById("signNumber");
  numberTag.addEventListener("change", () => {
    phoneNumberValidation(numberTag.value);
  });
  let passwordTag = document.getElementById("signPassword");
  passwordTag.addEventListener("change", () => {
    passwordValidation(passwordTag.value);
  });

  signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let name = nameTag.value;
    let number = numberTag.value;
    let password = passwordTag.value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    if (password != confirmPassword) {
      Notify.error("pasword not matching");
      return;
    }

    let nameValid = stringValidation(name, "name");
    let numberValid = phoneNumberValidation(number);
    let passwordValid = passwordValidation(password);

    if (nameValid && numberValid & passwordValid) {
      let data = {
        name,
        number,
        password,
        role: 3,
      };
      // service is form user Service class
      let response = UserServiceApi.createUser(data);
      if (response.statusCode == 200) {
        Notify.success("Account Created SuccessFully");
        let obj = JSON.parse(response.data);
        sessionStorage.setItem("signWorkshopUserid", idToToken(obj.id));
        window.location.reload();
      } else {
        Notify.error(response.error);
        return;
      }
    }
  });
}
const loginForm = document.getElementById("workshopLoginForm");
if (loginForm != null) {
  let numberTag = document.getElementById("loginNumber");
  numberTag.addEventListener("change", () => {
    phoneNumberValidation(numberTag.value);
  });
  let passwordTag = document.getElementById("loginPassword");
  passwordTag.addEventListener("change", () => {
    passwordValidation(passwordTag.value);
  });
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let number = numberTag.value;
    let password = passwordTag.value;
    let numberValid = phoneNumberValidation(number);
    let passwordValid = passwordValidation(password);
    if (numberValid && passwordValid) {
      let user = { number, password };
      // service is from user service class
      let response = UserServiceApi.loginUser(user);
      if (response.statusCode == 200) {
        let data = JSON.parse(response.data);
        sessionStorage.setItem("loggedUserId", idToToken(data.id));
        alert(data.name + " successfully logged in");
        if (data.role == 2) {
          window.location.href = "./Customer/cust.html";
        } else if (data.role == 3) {
          window.location.href = "./workshop/workshop.html";
        } else {
          alert("admin");
        }
      } else {
        Notify.error(response.error);
        return;
      }
    }
  });
}

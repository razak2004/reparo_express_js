let id;
let userRes = {};
function addUser(data) {
  const url = "http://localhost:8080/user/createUser";

  // Create a new XMLHttpRequest object
  const xhr = new XMLHttpRequest();
  let id = "";

  // Configure the request
  xhr.open("POST", url, false);
  xhr.setRequestHeader("Content-Type", "application/json");

  // Define a callback function to handle the response
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Successful response
      const response = xhr.responseText;
      id = response;

      if (isNumber(response)) {
        Notify.success("Account created successfully");
      } else {
        Notify.error(response);
      }
      id = response;
    } else {
      // Error response
      console.error("Error:", xhr.statusText);
      alert(error);
    }
  };

  // Define a callback function to handle network errors
  xhr.onerror = function () {
    console.error("Network error occurred");
  };

  // Send the POST request with the JSON data
  xhr.send(JSON.stringify(data));
  return id;
}
function getUserBynum(num) {
  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Define the URL for your Spring Boot GET endpoint
  var url = "http://localhost:8080/user/findByNum?number=" + num; // Replace with your actual endpoint URL

  let user = {};

  // Configure the request
  xhr.open("GET", url, false);

  // Set up a callback function to handle the response
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Successful response
      var responseData = xhr.responseText;

      // You can parse the response as JSON if it's JSON data

      var jsonObject = eval("(" + responseData + ")");
      user = jsonObject;
      // console.log(parsedData);
    } else {
      // Error response
      console.error("Error:", xhr.statusText);
    }
  };

  // Set up a callback function to handle network errors
  xhr.onerror = function () {
    console.error("Network error occurred");
  };

  // Send the GET request
  xhr.send();
  return user;
}
function addWorkshop(data, userId) {
  const url = "http://localhost:8080/workshop/createWorkshop?userId=" + userId;

  // Create a new XMLHttpRequest object
  const xhr = new XMLHttpRequest();
  let id = "";

  // Configure the request
  xhr.open("POST", url, false);
  xhr.setRequestHeader("Content-Type", "application/json"); // Set the content type to JSON

  // Define a callback function to handle the response
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Successful response
      const response = xhr.responseText;
      if (isNumber(response)) {
        Notify.success("Now you are the member of our company");
        alert(response);
      } else {
        Notify.error(response);
      }
      id = response;
    } else {
      // Error response
      console.error("Error:", xhr.statusText);
    }
  };

  // Define a callback function to handle network errors
  xhr.onerror = function () {
    console.error("Network error occurred");
  };

  // Send the POST request with the JSON data
  xhr.send(JSON.stringify(data));
  return id;
}

// workshop
const numberForm = document.getElementById("numberForm");
if (numberForm != null) {
  numberForm.addEventListener("submit", async (e) => {
    // Add 'async' keyword here
    e.preventDefault();
    let name = document.getElementById("signName").value;
    let number = document.getElementById("signNumber").value;
    let password = document.getElementById("signPassword").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if (password != confirmPassword) {
      Notify.error("Passwords do not match");
      return;
    }

    let nameValid = stringValidation(name, "name");
    let numberValid = phoneNumberValidation(number);
    let passwordValid = passwordValidation(password);

    if (nameValid && numberValid & passwordValid) {
      let user = {
        name,
        number,
        password,
        role: 3,
      };

      id = await addUser(user);
      if (isNumber(id)) {
        userRes = await getUserBynum(user.number);
        openDiv("#workshopForm", "#numberForm");

        const stName = document.getElementById("ownerName");
        stName.value = userRes.name;
        const stNum = document.getElementById("ownerNumber");
        stNum.value = userRes.number;
      } else {
        const sign = document.getElementById("numberForm");
        sign.style.display = "none";

        document.getElementById("workshopLoginForm").style.display = "flex";
      }
    }
    // let passwordValid = ;
  });
}

const workshopForm = document.getElementById("workshopForm");
if (workshopForm != null) {
  workshopForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    let image = document.getElementById("image").value;
    let workshopName = document.getElementById("workshopName").value;
    let country = document.getElementById("countries").value;
    let state = document.getElementById("state").value;
    let city = document.getElementById("district").value;
    let address = document.getElementById("address").value;
    let type = document.getElementById("vehicleType").value;
    let openTime = document.getElementById("openTime").value;
    let closeTime = document.getElementById("closeTime").value;
    let generalPrice = document.getElementById("GeneralCost").value;
    let enginePrice = document.getElementById("engineCost").value;
    let electricalPrice = document.getElementById("electricCost").value;
    let suspensionPrice = document.getElementById("SuspensionCost").value;

    let workshopObj = {
      workshopName,
      country,
      state,
      city,
      address,
      type,
      openTime,
      closeTime,
      generalPrice,
      enginePrice,
      electricalPrice,
      suspensionPrice,
      image,
      latitude: 0,
      longitude: 0,
    };
    // get latitude and longitude
    navigator.geolocation.getCurrentPosition(
      async function (position) {
        workshopObj.latitude = position.coords.latitude;
        workshopObj.longitude = position.coords.longitude;
        let workshopId = await addWorkshop(workshopObj, id);
        if (isNumber(workshopId) && workshopId != 0) {
          Notify.success("Thank you for registering your workShop");
          openDiv("#workshopLoginForm", "#workshopForm");
        } else {
          return;
        }
      },
      function (error) {
        // Handle errors, such as user denying permission or unable to determine location
        console.error("Error getting location: " + error.message);
      }
    );
  });
}

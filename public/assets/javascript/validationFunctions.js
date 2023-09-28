// validate Vehicle number
function openDiv(openDiv, closeDiv) {
  let div1 = document.querySelector(openDiv);
  let div2 = document.querySelector(closeDiv);
  div1.style.display = "flex";
  div2.style.display = "none";
}

function validateVehicleNumber(vehicleNumber) {
  // Regular expression pattern for a simplified Indian vehicle number
  const pattern = /^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/;

  // Check if the vehicleNumber matches the pattern
  if (pattern.test(vehicleNumber)) {
    return true; // Valid vehicle number
  } else {
    return false; // Invalid vehicle number
  }
}
function vehicleYearValidation(year) {
  if (year > 2023) {
    Notify.error("Year cant be in future");
    return false;
  }
  if (isNaN(year)) {
    Notify.error("Year should not have Alaphabets ");
    return false;
  }
  if (year < 1900) {
    Notify.error("Year cant be less than 1900");
    return false;
  }
  return true;
}
function problemValidation(str) {
  const regex = /^[a-zA-Z ]+$/;
  if (!regex.test(str) || str == "") {
    Notify.error("problem Should not contain numbers");
  }
  return regex.test(str);
}
function addressValidation(str) {
  const regex = /^[a-zA-Z0-9\s.,'#\-]+(\s[A-Za-z0-9\-#]+)?$/;
  if (!regex.test(str) || str == "") {
    Notify.error(
      "Address Should not contain any special character except (,) "
    );
  }
  return regex.test(str);
}
function stringValidation(str, strName) {
  const regex = /^[a-zA-Z ]+$/;
  if (!regex.test(str) || str == "") {
    Notify.error(
      strName +
        " can't be null or does not contains numbers and special characters "
    );
  }
  if (str.trim() == "") {
    Notify.error(strName + "Cant be empty");
    return false;
  }
  return regex.test(str);
}
function phoneNumberValidation(num) {
  const numRegex = /^[0-9]{10}$/;
  if (!numRegex.test(num) || num == "") {
    Notify.error(
      "phone Number cant contain Alphabet or contain only 10 digits"
    );
  }
  return numRegex.test(num);
}
//
function passwordValidation(pass) {
  const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,10}$/;
  if (!passRegex.test(pass) || pass == "") {
    Notify.error("password Must be in Alphanumeric Character between 6 to 10");
  }
  return passRegex.test(pass);
}
function priceValidate(price) {
  if (price < 0) Notify.error("price cant be less than 0");
  if (price > 9999) Notify.error("price cant be more than 9999");
  return price > 0 && price < 9999;
}
function idToToken(userId) {
  return btoa(userId); // Encode the user ID to base64
}

// Function to convert a user token to a user ID
function tokenToId(userToken) {
  return atob(userToken); // Decode the base64 user token to get the user ID
}

function isUserLogged() {
  let id = sessionStorage.getItem("loggedUserId");
  if (id == null) {
    alert("please try to login");
    window.location.href = "../../index.html";
  }
}

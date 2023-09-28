// checking the existing user

function checkUser(obj) {
  try {
    // Initialize empty arrays for users and mechanics
    let users = [];
    if (localStorage.getItem("users") != null) {
      // If users exist in localStorage, parse and assign to users array
      users = JSON.parse(localStorage.getItem("users"));
    }
    let mechanics = [];
    if (localStorage.getItem("mechanics") != null) {
      // If mechanics exist in localStorage, parse and assign to mechanics array
      mechanics = JSON.parse(localStorage.getItem("mechanics"));
    }

    // Initialize validation variable to false
    let validation = false;

    // Check if user with given phone number already exists
    const customer = users.find((e) => {
      if (obj["number"] === e["number"]) {
        // If user already exists, set validation to true and display error message
        validation = true;
        Notify.error("User Already present please try to login");
        container.classList.add("sign-up-mode");
        return false;
      }
      return false;
    });

    // Check if mechanic with given phone number already exists
    const mechanic = mechanics.find((e) => {
      if (obj["number"] === e["number"]) {
        // If mechanic already exists, set validation to true and display error message
        validation = true;
        Notify.error("User Already present please try to login ");
        container.classList.add("sign-up-mode");
        return false;
      }
      return false;
    });

    // Return validation variable
    return validation;
  } catch (error) {
    console.log(error);
  }
}

// function to create User
function createUser(obj, chck) {
  try {
    // Declare an empty array to store user data
    let users = [];
    // Check if any user data already exists in local storage, and if so, parse it and store it in the users array
    if (localStorage.getItem("users") != null) {
      users = JSON.parse(localStorage.getItem("users"));
    }
    // Declare an empty array to store customer vehicle data
    let Customer_vehicles = [];
    // Check if any customer vehicle data already exists in local storage, and if so, parse it and store it in the Customer_vehicles array
    if (localStorage.getItem("Customer_vehicles") != null) {
      Customer_vehicles = JSON.parse(localStorage.getItem("Customer_vehicles"));
    }
    // Create a new object to store the relationship between the customer and their vehicle
    let vehicleObj = {
      CustomerId: obj["user_id"],
      VehicleId: obj["vehicle_id"],
    };
    // If the check parameter is false, push the user object and vehicle object into their respective arrays and store them in local storage
    if (chck === false) {
      users.push(obj);
      Customer_vehicles.push(vehicleObj);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem(
        "Customer_vehicles",
        JSON.stringify(Customer_vehicles)
      );
      // Display a success message to the user and add a class to the container element to switch to the sign-up mode
      alert("account created successfully...");
      container.classList.add("sign-up-mode");
    }
  } catch (error) {}
}

// function to create mechanic
function createMechanic(obj, chck) {
  try {
    // Initialize empty arrays for mechanics, workshops, and mechanic services
    let mechanics = [];
    if (localStorage.getItem("mechanics") != null) {
      // If mechanics exist in localStorage, parse and assign to mechanics array
      mechanics = JSON.parse(localStorage.getItem("mechanics"));
    }
    let workshops = [];
    if (localStorage.getItem("workshops") != null) {
      // If workshops exist in localStorage, parse and assign to workshops array
      workshops = JSON.parse(localStorage.getItem("workshops"));
    }
    let mechServices = [];
    if (localStorage.getItem("mechServices") != null) {
      // If mechanic services exist in localStorage, parse and assign to mechServices array
      mechServices = JSON.parse(localStorage.getItem("mechServices"));
    }

    // Create object with mechanic ID and workshop ID
    let workObj = { mechanicId: obj["user_id"], workshopId: obj["WorkshopId"] };
    // Create object with mechanic ID, workshop ID, and service ID
    let serObj = {
      mechanicId: obj["user_id"],
      workshopId: obj["WorkshopId"],
      serviceId: obj["serviceId"],
    };

    // If chck is false, add mechanic, workshop, and mechanic service objects to localStorage
    if (chck === false) {
      mechanics.push(obj);
      workshops.push(workObj);
      mechServices.push(serObj);
      localStorage.setItem("mechServices", JSON.stringify(mechServices));
      localStorage.setItem("workshops", JSON.stringify(workshops));
      localStorage.setItem("mechanics", JSON.stringify(mechanics));
      console.log(mechanics);
      alert("account created as mechanic successfully...");
      container.classList.add("sign-up-mode");
    }
  } catch (error) {}
}

// function for logging as a admin
function adminLogin(num, pass) {
  try {
    // Check if the provided phone number is equal to the admin phone number
    if (num == 8124311602) {
      // If phone number is correct, check if the provided password is correct
      if (pass == 123456) {
        // If password is correct, display welcome message and redirect to admin dashboard
        alert("Welcome back to your company sir");
        window.location.href = "./admin/dashboard.html";
        return true;
      }
      // If password is incorrect, display error message
      alert("password is incorrect");
      return false;
    } else {
      // If phone number is incorrect, return false
      return false;
    }
  } catch (error) {}
}

// function to read user's data and login according to their role
function read(num, pass) {
  try {
    //get user data from localstorage
    let get_data = JSON.parse(localStorage.getItem("users"));
    //get mechanic data from localstorage
    let mechanic_data = JSON.parse(localStorage.getItem("mechanics"));
    //flag to check if user or mechanic data is found or not
    let findData = false;
    //find the user with given phone number in the user data
    const select_user = get_data.find(function (user) {
      const customerPhone = user["number"];
      const customerName = user["name"];
      //if phone number matches
      if (num === customerPhone) {
        findData = true;
        //if password matches
        if (pass === user["password"]) {
          //show success message and store the user id in localstorage
          alert(customerName + "! Your account logged in successfully");
          localStorage.setItem("oneUser", JSON.stringify(user["user_id"]));
          //if email not provided, redirect to profile page
          if (user["email"] == undefined) {
            window.location.href = "./customer/cus_profile.html";
          } else {
            //else redirect to customer dashboard
            window.location.href = "./customer/cust.html";
          }
          return findData;
        }
        //show error message if password is incorrect
        Notify.error("Password is incorrect Please check");
        return findData;
      }
      return findData;
    });
    //if user data not found, search for mechanic data
    if (findData != true) {
      const mech = mechanic_data.find(function (user) {
        const mechPhone = user["number"];
        const mechName = user["name"];
        //if phone number matches
        if (num === mechPhone) {
          findData = true;
          //if password matches
          if (pass === user["password"]) {
            //show success message and store the mechanic id in localstorage
            alert(mechName + "! Your account logged as mechanic  successfully");
            localStorage.setItem("oneUser", JSON.stringify(user["user_id"]));
            //if email not provided, redirect to mechanic profile page
            if (user["email"] == undefined) {
              window.location.href = "./Mechanic/profile.html";
            } else {
              //else redirect to mechanic dashboard
              window.location.href = "./Mechanic/mech.html";
            }
            return findData;
          }
          //show error message if password is incorrect
          Notify.error("Password is incorrect Please check");
          return findData;
        }
        return findData;
      });
    }
    //show error message if user or mechanic data not found
    if (findData != true) {
      alert("User not found enter correct number or create an account ");
    }
    console.log(select_user);
  } catch (error) {}
}

const sign_in_btn = document.getElementById("sign-in-btn");
const sign_in_btn2 = document.getElementById("sign-in-btn2");
const sign_up_btn = document.getElementById("sign-up-btn");
const sign_up_btn2 = document.getElementById("sign-up-btn2");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});
sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});
sign_up_btn2.addEventListener("click", () => {
  container.classList.add("sign-up-mode2");
});
sign_in_btn2.addEventListener("click", () => {
  container.classList.remove("sign-up-mode2");
});

//name validation
let signUpName = document.getElementById("name"); // get the element with the ID "name"
signUpName.addEventListener("change", () => {
  // add an event listener for when the input changes
  let check = signUpName.value; // get the value of the input
  let alp = hasnotAlphabet(check); // check if the input contains any non-alphabetic characters
  if (alp === true) {
    // if it does, display an error message
    Notify.error("please enter name without a special character or number ");
  }
  if (check.length > 15) {
    // check if the input is longer than 15 characters
    Notify.error("not more than 15 characters ");
  }
});

//number validation
let signUpNum = document.getElementById("number"); // get the element with the ID "number"
signUpNum.addEventListener("change", () => {
  // add an event listener for when the input changes
  let check = signUpNum.value; // get the value of the input
  let number = hasNumber(check); // check if the input contains only numeric characters
  if (check.length != 10) {
    // check if the input is exactly 10 characters long
    Notify.error("number should be in  10 characters");
  }
  if (number === false) {
    // if it contains non-numeric characters, display an error message
    Notify.error("Number can only accepted");
  }
});

//password validation
let signUpPass = document.getElementById("password"); // get the element with the ID "password"
signUpPass.addEventListener("change", () => {
  // add an event listener for when the input changes
  let check = signUpPass.value; // get the value of the input
  if (check.length != 6) {
    // check if the input is exactly 6 characters long
    Notify.error("password should be contain only 6 characters");
  }
});

//login validation
//number validation
let loginNum = document.getElementById("log_num"); // get the element with the ID "log_num"
loginNum.addEventListener("change", () => {
  // add an event listener for when the input changes
  let check = loginNum.value; // get the value of the input
  let number = hasNumber(check); // check if the input contains only numeric characters
  if (check.length != 10) {
    // check if the input is exactly 10 characters long
    Notify.error("number should be in  10 characters");
  }
  if (number === false) {
    // if it contains non-numeric characters, display an error message
    Notify.error("Number can only accepted");
  }
});

//password validation
let loginPass = document.getElementById("log_pass"); // get the element with the ID "log_pass"
loginPass.addEventListener("change", () => {
  // add an event listener for when the input changes
  let check = loginPass.value; // get the value of the input
  if (check.length != 6) {
    // check if the input is exactly 6 characters long
    Notify.error("password should be contain only 6 characters");
  }
});
// Get the sign up form element
const sign_up = document.getElementById("sign_up_form");

// Add an event listener for when the form is submitted
sign_up.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the form from submitting normally

  // Get form data
  const user_id = Date.now(); // Generate a unique user ID using the current timestamp
  const name = document.getElementById("name").value;
  const number = document.getElementById("number").value;
  const password = document.getElementById("password").value;
  const c_password = document.getElementById("confirmPassword").value;
  const customerRadio = document.getElementById("customerRadio").checked;
  const mechanicRadio = document.getElementById("mechanicRadio").checked;

  // Check if passwords match
  if (password != c_password) {
    Notify.error("confirm password is incorrect please check");
    return false; // Stop form submission
  }

  // Create user object
  const user = { user_id, name, number, password };

  // Check if user already exists
  let sign = checkUser(user);

  // Create new user based on radio button selection
  if (customerRadio === true) {
    // If customer radio button is checked
    user.check = "customer"; // Add a "check" property with value "customer"
    user.vehicle_id = user_id + 2; // Generate a unique vehicle ID for the user
    createUser(user, sign); // Create the user
  } else if (mechanicRadio === true) {
    // If mechanic radio button is checked
    user.check = "mechanic"; // Add a "check" property with value "mechanic"
    user.WorkshopId = user_id + 2; // Generate a unique workshop ID for the mechanic
    user.serviceId = user_id + 4; // Generate a unique service ID for the mechanic
    createMechanic(user, sign); // Create the mechanic
  }
});

// Get the login form element
const login = document.getElementById("login_form");

// Add an event listener for when the form is submitted
login.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the form from submitting normally

  // Get form data
  const num = document.getElementById("log_num").value;
  const pass = document.getElementById("log_pass").value;

  // Check if user is an admin
  let admin = adminLogin(num, pass);
  if (admin == false) {
    // If user is not an admin
    read(num, pass); // Check if user exists and log them in
  }
});

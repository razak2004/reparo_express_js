// Define the data to be sent in the POST request

const signUpButton = document.getElementById("signButton");
signUpButton.addEventListener("click", () => {
  signUpForm.style.display = "flex";
});
const loginButton = document.getElementById("loginButton");
loginButton.addEventListener("click", () => {
  loginForm.style.display = "flex";
});

const signLogOut = document.getElementById("signLogOut");
signLogOut.addEventListener("click", () => {
  signUpForm.style.display = "none";
});
const LoginExit = document.getElementById("LoginExit");
LoginExit.addEventListener("click", () => {
  loginForm.style.display = "none";
});
const signLoginBtn = document.getElementById("signLoginBtn");
if (signLoginBtn != null) {
  signLoginBtn.addEventListener("click", () => {
    openDiv("#loginForm", "#signUpForm");
  });
}
const loginsignBtn = document.getElementById("LoginSignBtn");
if (loginsignBtn != null) {
  loginsignBtn.addEventListener("click", () => {
    openDiv("#signUpForm", "#loginForm");
  });
}
// user registration form
const signUpForm = document.getElementById("signUpForm");
// signUp form
if (signUpForm != null) {
  const passwordInput = document.querySelector("#password");
  const CpasswordInput = document.querySelector("#confirmPassword");
  const eye = document.querySelector("#eye");
  eye.addEventListener("click", function () {
    this.classList.toggle("fa-eye-slash");
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
  });
  const Ceye = document.querySelector("#Ceye");
  Ceye.addEventListener("click", function () {
    this.classList.toggle("fa-eye-slash");
    const type =
      CpasswordInput.getAttribute("type") === "password" ? "text" : "password";
    CpasswordInput.setAttribute("type", type);
  });
  let nameTag = document.getElementById("name");
  nameTag.addEventListener("change", () => {
    stringValidation(nameTag.value, "name");
  });
  let numberTag = document.getElementById("number");
  numberTag.addEventListener("change", () => {
    phoneNumberValidation(numberTag.value);
  });
  let passwordTag = document.getElementById("password");
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
        role: 2,
      };

      let response = UserServiceApi.createUser(data);
      if (response.statusCode == 200) {
        Notify.success("Account Created SuccessFully");
        openDiv("#loginForm", "#signUpForm");
      } else {
        Notify.error(response.error);
        return;
      }
    }
  });
}
const loginForm = document.getElementById("loginForm");
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

      let response = UserServiceApi.loginUser(user);
      if (response.statusCode == 200) {
        let data = JSON.parse(response.data);
        sessionStorage.setItem("loggedUserId", idToToken(data.id));
        alert(data.name + " successfully logged in");
        if (data.role == 2) {
          window.location.href = "./pages/Customer/cust.html";
        } else if (data.role == 3) {
          window.location.href = "./pages/workshop/workshop.html";
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

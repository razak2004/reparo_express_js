// function used to apped the array of elements into the service sectin
function appendList(array, id, cls) {
  for (let i = 0; i < array.length; i++) {
    let container = document.createElement("div");
    container.setAttribute("class", cls);
    let bolt = document.createElement("span");
    bolt.setAttribute("class", "material-symbols-outlined");
    bolt.innerText = "bolt";
    container.append(bolt);
    let service = document.createElement("p");
    service.innerText = array[i];
    container.append(service);
    // let tick = document.createElement("span");
    // tick.setAttribute("class", "material-symbols-outlined");
    // tick.innerText = "add_task";
    // container.append(tick);

    let cont_append = document.querySelector(id);
    cont_append.append(container);
  }
}

// function for open div

function generateOTP() {
  // Define a string of possible characters for the OTP
  const possibleChars = "0123456789";

  // Initialize an empty string to store the OTP
  let OTP = "";

  // Generate a random 4-digit number by picking a random character from the possibleChars string four times
  for (let i = 0; i < 4; i++) {
    OTP += possibleChars.charAt(
      Math.floor(Math.random() * possibleChars.length)
    );
  }

  // Return the OTP
  return OTP;
}

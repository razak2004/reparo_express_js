// let workShops = JSON.parse(localStorage.getItem("workshops"));

//

// filter function
function filter(arr, val, id) {
  let fliterArr = arr.filter((e) => {
    if (e["workshopType"] == val) {
      return true;
    }
  });
  let section = document.getElementById(id);
  while (section.hasChildNodes()) {
    // remove existing child elements
    section.firstChild.remove();
  }
  for (let i = 0; i < fliterArr.length; i++) {
    createWorkshop(fliterArr[i], id);
  }
}

let filterTwoWheeler = document.getElementById("twoWheeler");
filterTwoWheeler.addEventListener("click", () => {
  filter(workShops, "2 wheelers", "workshops");
});
let filterThreeWheeler = document.getElementById("threeWheeler");
filterThreeWheeler.addEventListener("click", () => {
  filter(workShops, "3 wheelers", "workshops");
});
let filterFourWheeler = document.getElementById("fourWheeler");
filterFourWheeler.addEventListener("click", () => {
  filter(workShops, "4 wheelers", "workshops");
});

// search
const searchbar = document.getElementById("searchbar");
const cards = document.getElementsByClassName("workShopCard");

searchbar.addEventListener("input", () => {
  for (const element of cards) {
    if (
      element.innerHTML.toLowerCase().includes(searchbar.value.toLowerCase())
    ) {
      element.style.display = "flex";
    } else {
      element.style.display = "none";
    }
  }
});

function createCompany(array, id) {
  const options = document.getElementById(id);
  while (options.hasChildNodes()) {
    // remove existing child elements
    options.firstChild.remove();
  }

  for (let i = 0; i < array.length; i++) {
    let option = document.createElement("option");
    option.setAttribute("value", array[i]["company"]);
    option.innerText = array[i]["company"];
    options.append(option);
  }
}

function createVehicle(array, id, model) {
  // function to append the  models of the vehicle according to the comapnay selected
  const options = document.getElementById(id);
  while (options.hasChildNodes()) {
    options.firstChild.remove(); // remove child elements
  }
  let finded = array.find((F) => F.company === model); // finding the comapany

  for (let i = 0; i < finded["vehicles"].length; i++) {
    // appending the model options
    let option = document.createElement("option");
    option.setAttribute("value", finded["vehicles"][i]);
    option.innerText = finded["vehicles"][i];
    options.append(option);
  }
}

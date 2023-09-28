// home page section 2 div container
// json data section 2 for  container -----
let sec_2_data = [
  {
    title: "Courteous",
    Description:
      "We see this as an Oppurtunity to save our customer's time energy and frustration. Our customer also appretiate for the timely communication we provide regarding their questions and concerns",
    image: { src: "./assets/images/home/sec2_image1.jpg", alt: "Courteous" },
  },
  {
    title: "Trust Worthy",
    Description:
      "Connect with certified mechanics who provide expert and trustworthy car repairs and maintenance services through our online mechanic app.",
    image: { src: "./assets/images/home/trust.jpg", alt: "cont" },
  },
  {
    title: "Affordable",
    Description:
      "Access a range of maintenance services, Get quality car repairs and maintenance services at a fair price with our Reparo.",
    image: { src: "./assets/images/home/affordable.png", alt: "cont" },
  },
  {
    title: "Expert Mechanics",
    Description:
      "Our app connects you with highly skilled mechanics who have the knowledge and experience to diagnose and repair any issue with your vehicle. ",
    image: { src: "./assets/images/home/expert mechanic.jpg", alt: "cont" },
  },
  {
    title: "Convenient ",
    Description:
      "Our app makes it easy to get the car repairs and maintenance services you need. Simply book an appointment, and our mechanics will provide quality service at a fair price.",
    image: { src: "./assets/images/home/convinient.jpg", alt: "cont" },
  },
];

// sec 4 service list
// json for bike service card
let bike_service = [
  {
    title: "Tune - up",
    Description:
      " A bike tune-up involves adjusting the gears and brakes, checking the chain and other components for wear, and making sure that everything is properly aligned and lubricate",
    image: { src: "./assets/images/home/services/bike_tune.jpg", alt: "tune" },
  },
  {
    title: "Wheel truing",
    Description:
      "  Over time, bike wheels can become slightly bent or misaligned. Wheel truing involves using special tools to adjust the spokes and ensure that the wheel is perfectly straight and round.",
    image: {
      src: "./assets/images/home/services/bike_wheel.jfif",
      alt: "wheel",
    },
  },
  {
    title: "Chain  replacement",
    Description:
      "The chain and cassette are critical components of a bike's drivetrain, and they can wear out over time. When this happens, they may need to be replaced to ensure that the bike shifts smoothly and efficiently.",
    image: {
      src: "./assets/images/home/services/bike_chain.jpg",
      alt: "chain",
    },
  },
  {
    title: "Brake pad replacement",
    Description:
      "Bike brake pads wear down over time and will eventually need to be replaced. This is important for safety, as worn brake pads can reduce stopping power and increase the risk of accidents.",
    image: {
      src: "./assets/images/home/services/bike_brake.jpg",
      alt: "brakePad",
    },
  },
  {
    title: "Suspension service",
    Description:
      " If a bike has front or rear suspension, it may need to be serviced periodically to keep it functioning properly. This can involve replacing worn seals and oil, adjusting the air pressure, and making sure that the suspension is properly tuned for the rider's weight and riding style",
    image: {
      src: "./assets/images/home/services/bike_suspension.jfif",
      alt: "suspension",
    },
  },
];
// bike service end
// online bike service
let online_bike_service = [
  "Oil change",
  "Brake adjustment",
  "Chain tightening",
  "Chain lubrication",
  "Air filter replacement",
  "Spark plug replacement",
  "Tire pressure check",
  "Tire replacement",
  "Battery replacement",
  "Headlight bulb replacement",
  "Taillight bulb replacement",
  "Indicator bulb replacement",
  "Clutch cable adjustment",
  "Throttle cable adjustment",
  "Engine tuning",
  "Engine oil top-up",
  "Coolant top-up",
  "Brake fluid top-up",
  "Power steering fluid top-up",
  "Gearbox oil top-up",
  "Transmission oil top-up",
  "Fuel filter replacement",
  "Fuel tank cleaning",
  "Carburetor cleaning",
  "Throttle body cleaning",
  "Exhaust system cleaning",
  "Radiator cleaning",
  "Chain cleaning",
  "Fuel injector cleaning",
  "Ignition system check",
  "Suspension check",
  "Wheel alignment",
  "Handlebar adjustment",
  "Seat height adjustment",
  "Exhaust system replacement",
  "Carburetor replacement",
  "Fuel pump replacement",
  "Fuel tank replacement",
  "Speedometer cable replacement",
  "Drive belt replacement",
  "Wheel bearing replacement",
  "Shock absorber replacement",
  "Fork oil replacement",
  "Brake pad replacement",
  "Brake disc replacement",
  "Clutch plate replacement",
  "Engine rebuild",
  "Carburetor rebuild",
  "Transmission rebuild",
  "Brake caliper rebuild",
  "Fork rebuild",
  "Radiator replacement",
  "Coolant hose replacement",
  "Thermostat replacement",
  "Starter motor replacement",
  "Alternator replacement",
  "CDI unit replacement",
  "Regulator rectifier replacement",
  "Wiring harness replacement",
  "Fuel tank rust removal",
  "Custom paint job",
  "Bodywork repairs",
  "Seat reupholstering",
];

//  Json for car Service card starts
let car_service = [
  {
    title: "Oil Change",
    Description:
      "This is the most frequent service required for a car. The oil change involves replacing the oil and oil filter in the car's engine. This helps keep the engine running smoothly and prevents excessive wear and tear on engine components.",
    image: {
      src: "./assets/images/home/services/car_oil.jfif",
      alt: "oil Change",
    },
  },
  {
    title: "Brake Service",
    Description:
      "The brakes on a car are critical for safety. Brake service involves inspecting and replacing brake pads, rotors, calipers, and brake fluid to ensure the braking system is working correctly.",
    image: { src: "./assets/images/home/services/car_brake.jpg", alt: "brake" },
  },
  {
    title: "Tire Rotation",
    Description:
      "Tires wear out unevenly due to various factors such as weight distribution and driving conditions. Regular tire rotation ensures even wear on all tires, which prolongs their lifespan and improves vehicle handling.",
    image: { src: "./assets/images/home/services/car_tyre.jpeg", alt: "tyre" },
  },
  {
    title: "Battery Service",
    Description:
      "The car's battery is responsible for powering the electrical system, starting the engine, and keeping the vehicle running. A battery service involves inspecting and cleaning battery terminals, checking the voltage, and replacing the battery if necessary.",
    image: {
      src: "./assets/images/home/services/car_battery.jpg",
      alt: "battery",
    },
  },
  {
    title: "Tune-up",
    Description:
      "A tune-up is a comprehensive service that involves replacing spark plugs, ignition wires, air and fuel filters, and other critical components of the engine. This helps improve fuel economy, engine performance, and overall reliability.",
    image: {
      src: "./assets/images/home/services/car_tune.jpg",
      alt: "carTune",
    },
  },
];
// car ends
// online car service
let online_car_service = [
  "Oil change",
  "Brake adjustment",
  "Brake pad replacement",
  "Brake disc replacement",
  "Tire pressure check",
  "Tire replacement",
  "Battery replacement",
  "Headlight bulb replacement",
  "Taillight bulb replacement",
  "Indicator bulb replacement",
  "Clutch cable adjustment",
  "Throttle cable adjustment",
  "Engine tuning",
  "Engine oil top-up",
  "Coolant top-up",
  "Brake fluid top-up",
  "Power steering fluid top-up",
  "Gearbox oil top-up",
  "Transmission oil top-up",
  "Fuel filter replacement",
  "Fuel tank cleaning",
  "Fuel pump replacement",
  "Fuel tank replacement",
  "Fuel injector cleaning",
  "Ignition system check",
  "Suspension check",
  "Wheel alignment",
  "Handlebar adjustment",
  "Seat height adjustment",
  "Exhaust system replacement",
  "Catalytic converter replacement",
  "Muffler replacement",
  "Air filter replacement",
  "Spark plug replacement",
  "Alternator replacement",
  "Starter motor replacement",
  "Radiator replacement",
  "Coolant hose replacement",
  "Thermostat replacement",
  "Fan belt replacement",
  "Drive belt replacement",
  "Timing belt replacement",
  "Timing chain replacement",
  "Head gasket replacement",
  "Valve adjustment",
  "Engine rebuild",
  "Transmission rebuild",
  "Brake caliper rebuild",
  "Steering rack replacement",
  "Shock absorber replacement",
  "Suspension bushing replacement",
  "CV joint replacement",
  "Drive shaft replacement",
  "Wheel bearing replacement",
  "Power steering pump replacement",
  "Windshield replacement",
  "Window regulator replacement",
  "Door lock actuator replacement",
  "Battery cable replacement",
  "Oxygen sensor replacement",
  "Mass air flow sensor replacement",
  "Camshaft position sensor replacement",
  "Crankshaft position sensor replacement",
  "Knock sensor replacement",
  "Fuel pressure regulator replacement",
];

//  Json for auto Service card starts
let auto_service = [
  {
    title: "",
    Description:
      "The engine oil in a 3-wheeler auto needs to be changed regularly to ensure smooth engine operation and to prevent damage to engine components. This is typically done every 3,000-5,000 km, depending on the manufacturer's recommendations.",
    image: { src: "", alt: "" },
  },
  {
    title: "Air filter replacement",
    Description:
      "The air filter in a 3-wheeler auto helps prevent dust and other particles from entering the engine and causing damage. It is recommended to replace the air filter every 5,000 km or more frequently if the vehicle is operated in dusty or dirty environments.",
    image: { src: "", alt: "" },
  },
  {
    title: "Brake system service:",
    Description:
      "The brakes in a 3-wheeler auto are a critical safety component that need to be maintained regularly to ensure reliable operation. Brake pads, brake shoes, and brake fluids may need to be replaced periodically to maintain optimal braking performance.",
    image: { src: "", alt: "" },
  },
  {
    title: "Spark plug replacement",
    Description:
      "The spark plugs in a 3-wheeler auto play a critical role in the combustion process. Worn or damaged spark plugs can cause misfires, poor fuel economy, and other issues. It is recommended to replace the spark plugs every 10,000-15,000 km, depending on the manufacturer's recommendations.",
    image: { src: "", alt: "" },
  },
  {
    title: "Wheel alignment",
    Description:
      " Proper wheel alignment and balancing are essential for smooth and safe operation of a 3-wheeler auto. Improper alignment can cause uneven tire wear and handling issues, while unbalanced wheels can cause vibration and other problems. It is recommended to have the wheels aligned and balanced every 5,000-10,000 km, depending on the usage and driving conditions.",
    image: { src: "", alt: "" },
  },
];
// online auto service
let online_auto_service = [
  "Oil change",
  "Brake adjustment",
  "Chain tightening",
  "Chain lubrication",
  "Air filter replacement",
  "Spark plug replacement",
  "Tire pressure check",
  "Tire replacement",
  "Battery replacement",
  "Headlight bulb replacement",
  "Taillight bulb replacement",
  "Indicator bulb replacement",
  "Clutch cable adjustment",
  "Throttle cable adjustment",
  "Engine tuning",
  "Engine oil top-up",
  "Coolant top-up",
  "Brake fluid top-up",
  "Power steering fluid top-up",
  "Gearbox oil top-up",
  "Transmission oil top-up",
  "Fuel filter replacement",
  "Fuel tank cleaning",
  "Carburetor cleaning",
  "Throttle body cleaning",
  "Exhaust system cleaning",
  "Radiator cleaning",
  "Chain cleaning",
  "Fuel injector cleaning",
  "Ignition system check",
  "Suspension check",
  "Wheel alignment",
  "Handlebar adjustment",
  "Seat height adjustment",
  "Exhaust system replacement",
  "Carburetor replacement",
  "Fuel pump replacement",
  "Fuel tank replacement",
  "Speedometer cable replacement",
  "Drive belt replacement",
  "Wheel bearing replacement",
  "Shock absorber replacement",
  "Fork oil replacement",
  "Brake pad replacement",
  "Brake disc replacement",
  "Clutch plate replacement",
  "Engine rebuild",
  "Carburetor rebuild",
  "Transmission rebuild",
  "Brake caliper rebuild",
  "Fork rebuild",
  "Radiator replacement",
  "Coolant hose replacement",
  "Thermostat replacement",
  "Starter motor replacement",
  "Alternator replacement",
  "CDI unit replacement",
  "Regulator rectifier replacement",
  "Wiring harness replacement",
  "Fuel tank rust removal",
  "Custom paint job",
  "Bodywork repairs",
  "Seat reupholstering",
  "Steering column adjustment",
  "Rear axle replacement",
  "Wheel balance check",
  "CV joint replacement",
  "Drive shaft replacement",
  "Engine mount replacement",
  "Fuel injector replacement",
  "Suspension bushing replacement",
  "Brake master cylinder replacement",
  "Power steering pump replacement",
  "Windshield replacement",
  "Window regulator replacement",
];

// function createDiv accepts array and id as a parameter
// append div cards according to the number of elements in an array on the div which passed as an argument
function createDiv(input, id) {
  // for loop for creating cards with different data
  for (let i = 0; i < input.length; i++) {
    let div_container = document.createElement("div"); // card
    div_container.setAttribute("class", "sec4Container"); // adding class to the card
    let cont_img = document.createElement("img"); // card's image
    cont_img.setAttribute("class", "sec4Container_img");
    cont_img.setAttribute("src", input[i]["image"]["src"]); // different source for diffent images
    cont_img.setAttribute("alt", input[i]["image"]["alt"]);
    div_container.append(cont_img); // appending the image into the card
    let h3 = document.createElement("h3"); // Card heading
    h3.innerText = input[i]["title"]; // Different heading accourding according to the card
    div_container.append(h3); // append heading below card's image
    let p = document.createElement("p"); // creates paragraph tag
    p.innerText = input[i]["Description"]; // differnt content
    div_container.append(p); // append below heading
    let append_div = document.getElementById(id); // get the html div's id
    // finally appending the card into the id
    append_div.append(div_container);
  }
}
// creating dynamic div's for section 2
createDiv(sec_2_data, "sec2_bottom");
// creating dynamic div's for section 4  bike service
createDiv(bike_service, "bike");
// creating dynamic div's for section 4  car service
createDiv(car_service, "car");
// creating dynamic div's for section 4  auto service
createDiv(auto_service, "auto");

// end

// function of tab header
function openServices(serviceName, bId) {
  // Get all elements with class "sec4_container"
  var ser_cont, i, button;
  ser_cont = document.getElementsByClassName("sec4_container");

  // Loop through all elements with class "sec4_container"
  for (i = 0; i < ser_cont.length; i++) {
    // Hide each element by setting its display to "none"
    ser_cont[i].style.display = "none";
  }

  // Get all elements with class "linkButton"
  button = document.getElementsByClassName("linkButton");

  // Loop through all elements with class "linkButton"
  for (i = 0; i < button.length; i++) {
    // Remove the background color from each element by setting it to an empty string
    button[i].style.backgroundColor = "";
  }

  // Display the element with the specified ID by setting its display to "flex"
  document.getElementById(serviceName).style.display = "flex";

  // Set the background color of the element with the specified ID to gray
  document.getElementById(bId).style.backgroundColor = "#6c757d";
}

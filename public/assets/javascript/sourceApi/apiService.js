class UserServiceApi {
  static createUser(user) {
    let xhr = new XMLHttpRequest();
    const url = "http://localhost:8080/api/reparo/user/createUser";
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-Type", "application/json", "application/xml");
    let response;
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Successful response
        response = xhr.responseText;
      } else {
        console.error("Error:", xhr.statusText);
      }
    };
    xhr.onerror = function () {
      console.error("Network error occurred");
    };
    xhr.send(JSON.stringify(user));
    return JSON.parse(response);
  }
  static loginUser(user) {
    let xhr = new XMLHttpRequest();
    const url = "http://localhost:8080/api/reparo/user/loginUser";
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-Type", "application/json", "application/xml");
    let response;
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Successful response
        response = xhr.responseText;
      } else {
        console.error("Error:", xhr.statusText);
      }
    };
    xhr.onerror = function () {
      console.error("Network error occurred");
    };
    xhr.send(JSON.stringify(user));
    return JSON.parse(response);
  }

  static findUserByNum(number) {
    let xhr = new XMLHttpRequest();
    const url =
      "http://localhost:8080/api/reparo/user/findByNum?number=" + number;
    xhr.open("GET", url, false);

    let response;
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Successful response
        response = xhr.responseText;
      } else {
        console.error("Error:", xhr.statusText);
      }
    };
    xhr.onerror = function () {
      console.error("Network error occurred");
    };
    xhr.send();
    return JSON.parse(response);
  }
  static findUserById(id) {
    let xhr = new XMLHttpRequest();
    const url = "http://localhost:8080/api/reparo/user/findById?id=" + id;
    xhr.open("GET", url, false);

    let response;
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Successful response
        response = xhr.responseText;
      } else {
        console.error("Error:", xhr.statusText);
      }
    };
    xhr.onerror = function () {
      console.error("Network error occurred");
    };
    xhr.send();
    return JSON.parse(response);
  }
}
class VehicleServiceApi {
  static createVehicle(vehicle) {
    let xhr = new XMLHttpRequest();
    const url = "http://localhost:8080/api/reparo/vehicle/createVehicle";
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-Type", "application/json", "application/xml");
    let response;
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Successful response
        response = xhr.responseText;
      } else {
        console.error("Error:", xhr.statusText);
      }
    };
    xhr.onerror = function () {
      console.error("Network error occurred");
    };
    xhr.send(JSON.stringify(vehicle));
    return JSON.parse(response);
  }
  static getVehicleByUserId(id) {
    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Define the URL for your Spring Boot GET endpoint
    var url =
      "http://localhost:8080/api/reparo/vehicle/findVehicleByUserId?userId=" +
      id; // Replace with your actual endpoint URL

    let vehicle;

    // Configure the request
    xhr.open("GET", url, false);

    // Set up a callback function to handle the response
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Successful response
        vehicle = xhr.responseText;
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
    return JSON.parse(vehicle);
  }
}
class WorkshopServiceApi {
  static createWorkShop(workshop, userId) {
    let xhr = new XMLHttpRequest();
    const url =
      "http://localhost:8080/api/reparo/workshop/createWorkshop?userId=" +
      userId;
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-Type", "application/json", "application/xml");
    let response;
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Successful response
        response = xhr.responseText;
      } else {
        console.error("Error:", xhr.statusText);
      }
    };
    xhr.onerror = function () {
      console.error("Network error occurred");
    };
    xhr.send(JSON.stringify(workshop));
    return JSON.parse(response);
  }
  static getAllWorkshops(id) {
    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Define the URL for your Spring Boot GET endpoint
    var url =
      "http://localhost:8080/api/reparo/workshop/getAllWorkshops?id=" + id; // Replace with your actual endpoint URL

    let workshops;

    // Configure the request
    xhr.open("GET", url, false);

    // Set up a callback function to handle the response
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Successful response
        workshops = xhr.responseText;
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
    return JSON.parse(workshops);
  }
  static findWorkshopByUserId(id) {
    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Define the URL for your Spring Boot GET endpoint
    var url =
      "http://localhost:8080/api/reparo/workshop/getWorkshopByUserId?userId=" +
      id; // Replace with your actual endpoint URL

    let workshops;

    // Configure the request
    xhr.open("GET", url, false);

    // Set up a callback function to handle the response
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Successful response
        workshops = xhr.responseText;
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
    return JSON.parse(workshops);
  }
  static findBookings(id) {
    var xhr = new XMLHttpRequest();

    // Define the URL for your Spring Boot GET endpoint
    var url =
      "http://localhost:8080/api/reparo/workshop/getAllUnAcceptedBooking?workshopId=" +
      id;
    let bookings;

    // Configure the request
    xhr.open("GET", url, false);

    // Set up a callback function to handle the response
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Successful response
        bookings = xhr.responseText;
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
    return JSON.parse(bookings);
  }
  static isWorkshopPresent(area) {
    var xhr = new XMLHttpRequest();

    // Define the URL for your Spring Boot GET endpoint
    var url =
      "http://localhost:8080/api/reparo/workshop/isWorkshopPresent?area=" +
      area;
    let bookings;

    // Configure the request
    xhr.open("GET", url, false);

    // Set up a callback function to handle the response
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Successful response
        bookings = xhr.responseText;
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
    return JSON.parse(bookings);
  }
}

class BookingServiceApi {
  static createBooking(booking) {
    let xhr = new XMLHttpRequest();
    const url = "http://localhost:8080/api/reparo/booking/createBooking";
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-Type", "application/json", "application/xml");
    let response;
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Successful response
        response = xhr.responseText;
      } else {
        console.error("Error:", xhr.statusText);
      }
    };
    xhr.onerror = function () {
      console.error("Network error occurred");
    };
    xhr.send(JSON.stringify(booking));
    return JSON.parse(response);
  }
  static updateLiveBooking(booking) {
    let xhr = new XMLHttpRequest();
    const url = "http://localhost:8080/api/reparo/booking/updateBooking";
    xhr.open("PUT", url, false);
    xhr.setRequestHeader("Content-Type", "application/json", "application/xml");
    let response;
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Successful response
        response = xhr.responseText;
      } else {
        console.error("Error:", xhr.statusText);
      }
    };
    xhr.onerror = function () {
      console.error("Network error occurred");
    };
    xhr.send(JSON.stringify(booking));
    return JSON.parse(response);
  }
  // workshopId,bookingId,OTP,
  static acceptBooking(acceptObj) {
    let xhr = new XMLHttpRequest();
    const url = "http://localhost:8080/api/reparo/booking/acceptBooking";
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-Type", "application/json", "application/xml");
    let response;
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Successful response
        response = xhr.responseText;
      } else {
        console.error("Error:", xhr.statusText);
      }
    };
    xhr.onerror = function () {
      console.error("Network error occurred");
    };
    xhr.send(JSON.stringify(acceptObj));
    return JSON.parse(response);
  }
  static findNearByWorkshops(bookingId) {
    var xhr = new XMLHttpRequest();

    // Define the URL for your Spring Boot GET endpoint
    var url =
      "http://localhost:8080/api/reparo/booking/nearWorkshops?bookingId=" +
      bookingId; // Replace with your actual endpoint URL

    let workshops;

    // Configure the request
    xhr.open("GET", url, false);

    // Set up a callback function to handle the response
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Successful response
        workshops = xhr.responseText;
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
    return JSON.parse(workshops);
  }
  static findBookingById(id) {
    var xhr = new XMLHttpRequest();

    // Define the URL for your Spring Boot GET endpoint
    var url =
      "http://localhost:8080/api/reparo/booking/getBookingById?bookingId=" + id; // Replace with your actual endpoint URL

    let booking;

    // Configure the request
    xhr.open("GET", url, false);

    // Set up a callback function to handle the response
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Successful response
        booking = xhr.responseText;
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
    return JSON.parse(booking);
  }
  static cancelBooking(id, user) {
    var xhr = new XMLHttpRequest();

    // Define the URL for your Spring Boot GET endpoint
    var url =
      "http://localhost:8080/api/reparo/booking/cancelBooking?bookingId=" +
      id +
      "&user=" +
      user; // if user = "user" - cancel booking by user side else cancel booking by workshop side

    let booking;

    // Configure the request
    xhr.open("GET", url, false);

    // Set up a callback function to handle the response
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Successful response
        booking = xhr.responseText;
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
    return JSON.parse(booking);
  }
  static findBookingByWorkshopId(workshopId) {
    var xhr = new XMLHttpRequest();

    // Define the URL for your Spring Boot GET endpoint
    var url =
      "http://localhost:8080/api/reparo/booking/getBookingsByWorkshopId?workshopId=" +
      workshopId; // Replace with your actual endpoint URL

    let booking;

    // Configure the request
    xhr.open("GET", url, false);

    // Set up a callback function to handle the response
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Successful response
        booking = xhr.responseText;
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
    return JSON.parse(booking);
  }
}
class ServiceListServiceApi {
  static createServiceList(bookingId) {
    var xhr = new XMLHttpRequest();

    // Define the URL for your Spring Boot GET endpoint
    var url =
      "http://localhost:8080/api/reparo/service/createServiceList?bookingId=" +
      bookingId; // Replace with your actual endpoint URL

    let data;

    // Configure the request
    xhr.open("GET", url, false);

    // Set up a callback function to handle the response
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Successful response
        data = xhr.responseText;
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
    return JSON.parse(data);
  }
  static createService(service) {
    let xhr = new XMLHttpRequest();
    const url = "http://localhost:8080/api/reparo/service/createService";
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-Type", "application/json", "application/xml");
    let response;
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Successful response
        response = xhr.responseText;
      } else {
        console.error("Error:", xhr.statusText);
      }
    };
    xhr.onerror = function () {
      console.error("Network error occurred");
    };
    xhr.send(JSON.stringify(service));
    return JSON.parse(response);
  }
  static findServiceListByBookingId(bookingId) {
    var xhr = new XMLHttpRequest();

    // Define the URL for your Spring Boot GET endpoint
    var url =
      "http://localhost:8080/api/reparo/service/getServiceListByBookingId?bookingId=" +
      bookingId; // Replace with your actual endpoint URL

    let data;

    // Configure the request
    xhr.open("GET", url, false);

    // Set up a callback function to handle the response
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Successful response
        data = xhr.responseText;
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
    return JSON.parse(data);
  }
  static updateService(service) {
    let xhr = new XMLHttpRequest();
    const url = "http://localhost:8080/api/reparo/service/updateService";
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-Type", "application/json", "application/xml");
    let response;
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Successful response
        response = xhr.responseText;
      } else {
        console.error("Error:", xhr.statusText);
      }
    };
    xhr.onerror = function () {
      console.error("Network error occurred");
    };
    xhr.send(JSON.stringify(service));
    return JSON.parse(response);
  }
  static deleteService(serviceId) {
    var xhr = new XMLHttpRequest();

    // Define the URL for your Spring Boot GET endpoint
    var url =
      "http://localhost:8080/api/reparo/service/deleteService?serviceId=" +
      serviceId; // Replace with your actual endpoint URL

    let data;

    // Configure the request
    xhr.open("GET", url, false);

    // Set up a callback function to handle the response
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Successful response
        data = xhr.responseText;
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
    return JSON.parse(data);
  }
  static makeServiceListLive(listId) {
    var xhr = new XMLHttpRequest();

    // Define the URL for your Spring Boot GET endpoint
    var url =
      "http://localhost:8080/api/reparo/service/makeServiceLive?serviceDetailId=" +
      listId; // Replace with your actual endpoint URL

    let data;

    // Configure the request
    xhr.open("GET", url, false);

    // Set up a callback function to handle the response
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Successful response
        data = xhr.responseText;
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
    return JSON.parse(data);
  }
  static rejectServiceList(service) {
    let xhr = new XMLHttpRequest();
    const url = "http://localhost:8080/api/reparo/service/rejectServiceList";
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-Type", "application/json", "application/xml");
    let response;
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Successful response
        response = xhr.responseText;
      } else {
        console.error("Error:", xhr.statusText);
      }
    };
    xhr.onerror = function () {
      console.error("Network error occurred");
    };
    xhr.send(JSON.stringify(service));
    return JSON.parse(response);
  }
  static acceptServiceList(listId) {
    var xhr = new XMLHttpRequest();

    // Define the URL for your Spring Boot GET endpoint
    var url =
      "http://localhost:8080/api/reparo/service/acceptServiceList?listId=" +
      listId; // Replace with your actual endpoint URL

    let data;

    // Configure the request
    xhr.open("GET", url, false);

    // Set up a callback function to handle the response
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Successful response
        data = xhr.responseText;
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
    return JSON.parse(data);
  }
}

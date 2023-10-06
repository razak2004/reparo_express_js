const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

// Serve static files (HTML, CSS, JS) from the "public" directory
app.use(express.static("public"));

// Define custom middleware to handle non-existent URLs
app.use((req, res, next) => {
  const requestedPath = path.join(__dirname, "public", req.url);

  // Check if the requested file exists
  fs.access(requestedPath, fs.constants.F_OK, (err) => {
    if (err) {
      // File doesn't exist, redirect to the custom error page
      return res.status(404).redirect("/error.html");
    }

    // File exists, continue processing the request
    next();
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

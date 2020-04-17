// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require('morgan');
const cors = require('cors');

app.use(cors());

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
// app.use(express.static("public"));

// Separated Routes for each Resource
const usersRoutes = require("./routes/users");
const dietaryRestrictionsRoutes = require("./routes/dietaryRestrictions");
const userDataRoutes = require("./routes/userData");

// Mount all resource routes
app.use("/api/users", usersRoutes());
app.use("/api/restrictions", dietaryRestrictionsRoutes());
app.use("/api/user-data", userDataRoutes());


// Home page
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.send('ok')
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});


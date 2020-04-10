// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require('morgan');
const Sequelize = require('sequelize')

// PG database client/connection setup
const db = require("./lib/db");

db.authenticate()
  .then(() => console.log("Database Connected..."))
  .catch((err) => console.log("Error: ", err));

// Sequelize Models
const User = require('./db/models/User')(db)
const Dietary_restriction = require('./db/models/Dietary_restriction')(db)
const User_dietary_restriction = require('./db/models/User_dietary_restriction')(db)
const Favourite = require('./db/models/Favourite')(db)
const User_favourite = require('./db/models/User_favourite')(db)

db.sync({ alter: true })
  .then(res => console.log('db populated'))

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  // User.create({ username: 'bort', email: 'sampson@test.com', password: '12345' })
  res.render("index");

});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

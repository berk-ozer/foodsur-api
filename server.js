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
const Sequelize = require('sequelize');
const axios = require('axios')

app.use(cors());

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

// Seeds
const dietaryRestrictionSeed = require('./db/seeds/seedDietaryRestriction');

// Sync database
// db.sync({ alter: true })
//   .then(res => { console.log('db populated') })
//   // Run seed if table is not already seeded
//   .then(() => Dietary_restriction.count())
//   .then(count => {
//     if (count !== 10) {
//       dietaryRestrictionSeed(db);
//     }
//   });


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
app.use("/api/users", usersRoutes(db));
app.use("/api/restrictions", dietaryRestrictionsRoutes(db));
app.use("/api/user-data", userDataRoutes(db));


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  // axios.get(`https://api.edamam.com/api/food-database/parser?nutrition-type=logging&ingr=cheese&app_id=${process.env.FOOD_DB_ID}&app_key=${process.env.FOOD_DB_KEY}`)
  //   .then(res => console.log(res.data))
  //   .then(res => axios.post(`https://api.edamam.com/api/food-database/nutrients?app_id=${process.env.NUTRITION_DB_ID}&app_key=${process.env.NUTRITION_DB_KEY}`, {
  //     "ingredients": [
  //       {
  //         "quantity": 1,
  //         "measureURI": "http://www.edamam.com/ontologies/edamam.owl#Measure_unit",
  //         "foodId": "food_bnbh4ycaqj9as0a9z7h9xb2wmgat"
  //       }
  //     ]
  //   }))
  //   // .then(res => console.log(res))
  //   .catch(err => console.log(err))
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});


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

db.sync({ alter: true })
  .then(res => console.log('db populated'))

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  axios.get('https://api.edamam.com/api/food-database/parser?nutrition-type=logging&ingr=cheese&app_id=7e7111eb&app_key=e019f6e0efdddb975bcbea5eeeb91c8c')
    .then(res => console.log(res.data.hints))
    .then(res => axios.post('https://api.edamam.com/api/food-database/nutrients?app_id=edc61ca8&app_key=b9f17ae7284f840d6dd1ef3cbcdcde9e', {
      "ingredients": [
        {
          "quantity": 1,
          "measureURI": "http://www.edamam.com/ontologies/edamam.owl#Measure_unit",
          "foodId": "food_bnbh4ycaqj9as0a9z7h9xb2wmgat"
        }
      ]
    }))
    .then(res => console.log(res))
    .catch(err => console.log(err))
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});


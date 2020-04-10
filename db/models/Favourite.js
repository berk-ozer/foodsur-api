const Sequelize = require("sequelize");
const db = require("../../lib/db");

const Favourite = db.define("favourite", {
  name: {
    type: Sequelize.STRING,
  }
});

module.exports = Favourite;

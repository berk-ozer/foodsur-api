const Sequelize = require("sequelize");
const db = require("../../lib/db");

const User_favourite = db.define("user_favourite", {
  user_id: {
    type: Sequelize.INTEGER,
  },
  favourite_id: {
    type: Sequelize.INTEGER
  }
});

module.exports = User_favourite;

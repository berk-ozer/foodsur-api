const Sequelize = require("sequelize");
const db = require("../../lib/db");

const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  }
});

module.exports = User;

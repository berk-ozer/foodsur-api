const Sequelize = require("sequelize");
const db = require("../../lib/db");

const Dietary_restriction = db.define("dietary_restriction", {
  name: {
    type: Sequelize.STRING,
  }
});

module.exports = Dietary_restriction;

const Sequelize = require("sequelize");
const db = require("../../lib/db");

const user_dietary_restriction = db.define("user_dietary_restriction", {
  user_id: {
    type: Sequelize.INTEGER,
  },
  restriction_id: {
    type: Sequelize.INTEGER
  }
});

module.exports = user_dietary_restriction;

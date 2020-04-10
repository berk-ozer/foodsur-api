const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../lib/db");

const User_dietary_restriction = db.define("user_dietary_restriction", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  restriction_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});
User_dietary_restriction.sync()


module.exports = User_dietary_restriction;

const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../lib/db");

const User_favourite = db.define("user_favourite", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  favourite_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});
User_favourite.sync()

module.exports = User_favourite;

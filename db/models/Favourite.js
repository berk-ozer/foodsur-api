const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../lib/db");

const Favourite = db.define("favourite", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
Favourites.sync()

module.exports = Favourite;

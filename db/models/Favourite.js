const { Sequelize, DataTypes } = require("sequelize");

module.exports = (db) => {
  const Favourite = db.define("favourite", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Favourite;
}


const { Sequelize, DataTypes } = require("sequelize");

module.exports = (db) => {
  const Favourite = db.define("favourite", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Favourite;
}


const { Sequelize, DataTypes } = require("sequelize");

module.exports = (db) => {
  const Favourite = db.define("favourite", {
    api_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Favourite;
}


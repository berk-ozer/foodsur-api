const { Sequelize, DataTypes } = require("sequelize");

module.exports = (db) => {
  const Dietary_restriction = db.define("dietary_restriction", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Dietary_restriction

}

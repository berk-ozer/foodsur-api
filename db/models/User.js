const { Sequelize, DataTypes } = require("sequelize");

module.exports = (db) => {
  const User = db.define("user", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return User
};

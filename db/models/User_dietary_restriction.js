const { Sequelize, DataTypes } = require("sequelize");

module.exports = (db) => {
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
  return User_dietary_restriction;
}


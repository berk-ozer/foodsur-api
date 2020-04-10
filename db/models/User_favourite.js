const { Sequelize, DataTypes } = require("sequelize");


module.exports = (db) => {
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
  return User_favourite;
}


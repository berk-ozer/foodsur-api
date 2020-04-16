'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserFavourite = sequelize.define('UserFavourite', {
    userId: DataTypes.INTEGER,
    favouriteId: DataTypes.INTEGER
  }, {});
  UserFavourite.associate = function(models) {
    // associations can be defined here
  };
  return UserFavourite;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function (models) {
    User.belongsToMany(models.DietaryRestriction, {
      through: 'UserDietaryRestrictions',
      foreignKey: 'userId',
      otherKey: 'dietaryRestrictionId'
    });
    User.belongsToMany(models.Favourite, {
      through: 'UserFavourites',
      foreignKey: 'userId',
      otherKey: 'favouriteId'
    })
  };
  return User;
};

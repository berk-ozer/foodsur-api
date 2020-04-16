'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: DataTypes.UUID,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.belongsToMany(models.DietaryRestriction, {
      through: 'UserDietaryRestrictions',
      foreignKey: 'userId',
      otherKey: 'dietaryRestrictionId'
    });
  };
  return User;
};

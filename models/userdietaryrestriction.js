'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserDietaryRestriction = sequelize.define('UserDietaryRestriction', {
    userId: DataTypes.INTEGER,
    dietaryRestrictionId: DataTypes.INTEGER
  }, {});
  UserDietaryRestriction.associate = function(models) {
    // associations can be defined here
  };
  return UserDietaryRestriction;
};

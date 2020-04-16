'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserDietaryRestriction = sequelize.define('UserDietaryRestriction', {
    userId: DataTypes.UUID,
    dietaryRestrictionId: DataTypes.UUID
  }, {});
  UserDietaryRestriction.associate = function(models) {
    // associations can be defined here
  };
  return UserDietaryRestriction;
};

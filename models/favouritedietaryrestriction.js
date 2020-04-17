'use strict';
module.exports = (sequelize, DataTypes) => {
  const FavouriteDietaryRestriction = sequelize.define('FavouriteDietaryRestriction', {
    favouriteId: DataTypes.INTEGER,
    dietaryRestrictionId: DataTypes.INTEGER
  }, {});
  FavouriteDietaryRestriction.associate = function(models) {
    // associations can be defined here
  };
  return FavouriteDietaryRestriction;
};

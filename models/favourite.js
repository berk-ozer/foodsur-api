'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favourite = sequelize.define('Favourite', {
    apiId: DataTypes.STRING,
    name: DataTypes.STRING,
    calories: DataTypes.DECIMAL(10, 2),
    carbs: DataTypes.DECIMAL(10, 2),
    protein: DataTypes.DECIMAL(10, 2),
    fat: DataTypes.DECIMAL(10, 2)
  }, {});
  Favourite.associate = function (models) {
    Favourite.belongsToMany(models.User, {
      through: 'UserFavourites',
      foreignKey: 'favouriteId',
      otherKey: 'userId'
    }),
      Favourite.belongsToMany(models.DietaryRestriction, {
        through: 'FavouriteDietaryRestrictions',
        foreignKey: 'favouriteId',
        otherKey: 'dietaryRestrictionId'
      })
  };
  return Favourite;
};

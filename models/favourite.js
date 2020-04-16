'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favourite = sequelize.define('Favourite', {
    apiId: DataTypes.STRING,
    name: DataTypes.STRING
  }, {});
  Favourite.associate = function (models) {
    Favourite.belongsToMany(models.User, {
      through: 'UserFavourites',
      foreignKey: 'favouriteId',
      otherKey: 'userId'
    })
  };
  return Favourite;
};

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favourite = sequelize.define('Favourite', {
    apiId: DataTypes.STRING,
    name: DataTypes.STRING
  }, {});
  Favourite.associate = function(models) {
    // associations can be defined here
  };
  return Favourite;
};
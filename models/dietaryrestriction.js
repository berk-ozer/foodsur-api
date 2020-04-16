'use strict';
module.exports = (sequelize, DataTypes) => {
  const DietaryRestriction = sequelize.define('DietaryRestriction', {
    id: DataTypes.UUID,
    name: DataTypes.STRING,
    tagType: DataTypes.STRING
  }, {});
  DietaryRestriction.associate = function(models) {
    DietaryRestriction.belongsToMany(models.User, {
      through: 'UserDietaryRestrictions',
      foreignKey: 'dietaryRestrictionId',
      otherKey: 'userId'
    })
  };
  return DietaryRestriction;
};

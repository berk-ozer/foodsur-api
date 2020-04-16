'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UserDietaryRestrictions', [{
      userId: 1,
      dietaryRestrictionId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 1,
      dietaryRestrictionId: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 2,
      dietaryRestrictionId: 6,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 3,
      dietaryRestrictionId: 7,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 3,
      dietaryRestrictionId: 9,
      createdAt: new Date(),
      updatedAt: new Date()
    },]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserDietaryRestrictions', null, {});
  }
};

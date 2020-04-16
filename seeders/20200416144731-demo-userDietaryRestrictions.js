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
      dietaryRestrictionId: 4,
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
      dietaryRestrictionId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 2,
      dietaryRestrictionId: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 3,
      dietaryRestrictionId: 6,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 3,
      dietaryRestrictionId: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    },]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserDietaryRestrictions', null, {});
  }
};

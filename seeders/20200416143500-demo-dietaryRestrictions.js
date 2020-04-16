'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('DietaryRestrictions', [{
      name: 'Vegan',
      tagType: 'health',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Vegetarian',
      tagType: 'health',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Sugar-conscious',
      tagType: 'health',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Peanut-free',
      tagType: 'health',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Tree-nut-free',
      tagType: 'health',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Alcohol-free',
      tagType: 'health',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Balanced diet',
      tagType: 'diet',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'High-protein diet',
      tagType: 'diet',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Low-fat diet',
      tagType: 'diet',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Low-carb diet',
      tagType: 'diet',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('DietaryRestrictions', null, {});
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'John',
      email: 'john@gmail.com',
      password: 'secret',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'Sally',
      email: 'sally@gmail.com',
      password: 'secret',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'Sam',
      email: 'sam@gmail.com',
      password: 'secret',
      createdAt: new Date(),
      updatedAt: new Date()
    },]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};

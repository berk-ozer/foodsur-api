'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Favourites', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      apiId: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      calories: {
        type: Sequelize.DECIMAL(10, 2)
      },
      carbs: {
        type: Sequelize.DECIMAL(10, 2)
      },
      protein: {
        type: Sequelize.DECIMAL(10, 2)
      },
      fat: {
        type: Sequelize.DECIMAL(10, 2)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Favourites');
  }
};

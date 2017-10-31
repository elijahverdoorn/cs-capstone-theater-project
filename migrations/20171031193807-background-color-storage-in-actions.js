'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
		queryInterface.addColumn('Actions', 'redValue', Sequelize.INTEGER)
		queryInterface.addColumn('Actions', 'greenValue', Sequelize.INTEGER)
		queryInterface.addColumn('Actions', 'blueValue', Sequelize.INTEGER)
  },

  down: (queryInterface, Sequelize) => {
		queryInterface.removeColumn('Actions', 'redValue')
		queryInterface.removeColumn('Actions', 'greenValue')
		queryInterface.removeColumn('Actions', 'blueValue')
  }
};

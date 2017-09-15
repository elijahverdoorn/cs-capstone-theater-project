'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
		return quertyInterface.createTable('ActionType', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			name: {
				type: Sequelize.STRING
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			modifiedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		})
  },

  down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('ActionType')
  }
};


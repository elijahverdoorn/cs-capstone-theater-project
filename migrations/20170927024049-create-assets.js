'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
		queryInterface.createTable('Assets', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			name: {
				type: Sequelize.STRING
			},
			path: {
				type: Sequelize.STRING
			},
			assetTypeId: {
				type: Sequelize.INTEGER
			},
			showId: {
				type: Sequelize.INTEGER
			}
		})
  },

  down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Assets')
  }
};

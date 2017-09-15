'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Actions', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			address: {
				type: Sequelize.STRING
			},
			duration: {
				type: Sequelize.DECIMAL
			},
			name: {
				type: Sequelize.STRING
			},
			description: {
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
		return queryInterface.dropTable('Actions')
  }
}

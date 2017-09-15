'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		queryInterface.addColumn('Actions', 'deviceId', Sequelize.INTEGER, {
			allowNull: false,
			references: {
				model: 'Devices',
				key: 'id'
			},
			onUpdate: 'CASCADE',
			onDelete: 'SET NULL'
		})
	},

	down: (queryInterface, Sequelize) => {
		queryInterface.removeColumn('Actions', 'deviceId')
	}
}


'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		queryInterface.addColumn('Actions', 'cueId', Sequelize.INTEGER, {
			allowNull: false,
			references: {
				model: 'Cues',
				key: 'id'
			},
			onUpdate: 'CASCADE',
			onDelete: 'SET NULL'
		})
	},

	down: (queryInterface, Sequelize) => {
		queryInterface.removeColumn('Actions', 'cueId')
	}
}

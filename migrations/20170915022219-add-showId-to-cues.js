'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
		queryInterface.addColumn('Cues', 'showId', Sequelize.INTEGER, {
			allowNull: false,
			references: {
				model: 'Shows',
				key: 'id'
			},
			onUpdate: 'CASCADE',
			onDelete: 'SET NULL'
		})
  },

  down: (queryInterface, Sequelize) => {
		queryInterface.removeColumn('Cues', 'showId')
  }
}

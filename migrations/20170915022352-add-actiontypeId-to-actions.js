'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
		queryInterface.addColumn('Actions', 'actionTypeId', Sequelize.INTEGER, {
			allowNull: false,
			references: {
				model: 'ActionTypes',
				key: 'id'
			},
			onUpdate: 'CASCADE',
			onDelete: 'SET NULL'
		})
  },

  down: (queryInterface, Sequelize) => {
		queryInterface.removeColumn('Actions', 'actionTypeId')
  }
}

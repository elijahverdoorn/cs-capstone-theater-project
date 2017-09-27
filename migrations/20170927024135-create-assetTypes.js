'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('AssetTypes', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			name: {
				type: Sequelize.STRING
			},
			mime: {
				type: Sequelize.STRING
			}
		})
  },

  down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('AssetTypes')
  }
};

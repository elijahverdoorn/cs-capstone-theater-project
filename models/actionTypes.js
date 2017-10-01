'use strict'

module.exports = (sequelize, DataTypes) => {
	const ActionTypes = sequelize.define('ActionTypes', {
		name: DataTypes.STRING,
		mime: DataTypes.STRING
	}, {
		freezeTableName: true
	})

	return ActionTypes
}

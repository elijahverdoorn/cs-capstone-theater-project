'use strict'

module.exports = (sequelize, DataTypes) => {
	const Actions = sequelize.define('Actions', {
		address: DataTypes.STRING,
		duration: DataTypes.DECIMAL,
		name: DataTypes.STRING,
		description: DataTypes.STRING
	}, {
		freezeTableName: true
	})

	Actions.associate = (models) => {
		Actions.belongsTo(models.Cues, { as: 'cue' })
		Actions.belongsTo(models.ActionTypes, { as: 'actionType' })
		Actions.belongsTo(models.Devices, { as: 'device' })
	}

	return Actions
}

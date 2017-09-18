'use strict'

module.exports = (sequelize, DataTypes) => {
	const Shows = sequelize.define('Shows', {
		name: DataTypes.STRING,
		director: DataTypes.STRING
	}, {
		freezeTableName: true
	})

	return Shows
}

'use strict'

module.exports = (sequelize, DataTypes) => {
	const Assets = sequelize.define('Assets', {
		id: DataTypes.INTEGER,
		name: DataTypes.STRING,
		path: DataTypes.STRING,
		assetTypeId: DataTypes.STRING,
		showId: DataTypes.INTEGER
	}, {
		freezeTableName: true,
		timestamps: true
	})

	Assets.associate = (models) => {
		Assets.belongsTo(models.Show, { as: 'show' })
	}

	return Assets
}

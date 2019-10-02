'use strict'

module.exports = (sequelize, DataTypes) => {
    const country = sequelize.define('country', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        country: DataTypes.STRING,
        code: DataTypes.STRING,
        currency_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'currency',
                key: 'id'
            }
        }
    },
        {
            freezeTableName: true,
            timestamps: false,
            omitNull: true,
            underscored: true

        });
    country.associate = (models) => {
        country.hasMany(models.department, {
            foreignKey: 'country_id'
        });
        country.hasMany(models.user, {
            foreignKey: 'country_id'
        });
    }
    return country
}

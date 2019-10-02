'use strict'

module.exports = (sequelize, DataTypes) => {
    const currency = sequelize.define('currency', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        currency: DataTypes.STRING
    },
    {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true

    });
    currency.associate = (models) => {
        currency.hasOne(models.country, {
            foreignKey: 'currency_id'
        });
    }
    return currency
}


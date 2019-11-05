'use strict'

const Sequelize = require('sequelize')

module.exports = (sequelize, DataType) => {
    const unavailable = sequelize.define('unavailable', {
        id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
        user_id: {
            type: DataType.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        time: Sequelize.TIME
    },
    {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true
    });
    unavailable.associate = (models) => {
        unavailable.belongsTo(models.user);
    }
    return unavailable
};

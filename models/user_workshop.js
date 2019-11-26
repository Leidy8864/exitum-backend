'use strict'

const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    const user_workshop = sequelize.define('user_workshop', {
        user_id: { type: DataTypes.INTEGER, primaryKey: true },
        workshop_id: { type: DataTypes.INTEGER, primaryKey: true },
        status: {
            type: DataTypes.ENUM,
            values: ['ACCEPTED', 'PENDING', 'REJECTED']
        },
        rate: Sequelize.TINYINT
    },
    {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true
    })
    return user_workshop
};
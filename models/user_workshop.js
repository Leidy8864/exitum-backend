'use strict'

const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    const university = sequelize.define('user_workshop', {
        user_id: { type: DataTypes.INTEGER, primaryKey: true },
        workshop_id: { type: DataTypes.INTEGER, primaryKey: true },
        rate: Sequelize.TINYINT
    },
    {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true
    })
    return university
};
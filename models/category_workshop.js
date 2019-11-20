'use strict'

const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    const university = sequelize.define('category_workshop', {
        category_id: { type: DataTypes.INTEGER, primaryKey: true },
        workshop_id: { type: DataTypes.INTEGER, primaryKey: true }
    },
    {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true
    })
    return university
};
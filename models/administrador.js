'use strict'

const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    const administrador = sequelize.define('administrador', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        status: Sequelize.TINYINT
    },
    {
        freezeTableName: true,
        timestamps: false,
        omitNull: true
    });

    return administrador
}
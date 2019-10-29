'use strict';

const Sequelize = require('sequelize')

module.exports = (sequelize, DataType) => {
    const appointment = sequelize.define('appointment', {
        id: {
            autoIncrement: true,
            type: DataType.INTEGER,
            primaryKey: true,
        },
        from_user_id: { 
            type: DataType.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
         },
        to_user_id: { 
            type: DataType.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
         },
        date: Sequelize.DATE ,
        time: Sequelize.TIME,
        type: {
            type: DataType.ENUM,
            values: ['reunion', 'recordatorio']
        },
        description: DataType.TEXT,
        status: DataType.BOOLEAN
    }, {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true
    });
    return appointment;
};
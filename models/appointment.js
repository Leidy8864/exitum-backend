'use strict';
module.exports = (sequelize, DataType) => {
    const appointment = sequelize.define('appointment', {
        hour_id: { type: DataType.INTEGER, primaryKey: true },
        user_id: { type: DataType.INTEGER, primaryKey: true },
        date: DataType.DATEONLY,
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
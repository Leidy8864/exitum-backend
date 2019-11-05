'use strict';
module.exports = (sequelize, DataType) => {
    const schedule = sequelize.define('schedule', {
        hour_id: { type: DataType.INTEGER, primaryKey: true },
        user_id: { type: DataType.INTEGER, primaryKey: true },
        break: DataType.BOOLEAN,
    }, {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true
    });
    return schedule;
};
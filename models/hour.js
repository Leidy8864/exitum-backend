'use strict';
module.exports = (sequelize, DataType) => {
    const hour = sequelize.define('hour', {
        id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
        hour: DataType.STRING,
    }, {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true
    });
    hour.associate = function (models) {
        hour.belongsToMany(models.hour, {
            as: { singular: 'toHourUserSchedule', plural: 'toHourUserSchedules' },
            through: models.schedule,
            foreignKey: 'hour_id',
            otherKey: 'user_id'
        })
        hour.belongsToMany(models.hour, {
            as: { singular: 'toHourUserAppointment', plural: 'toHourUserAppointments' },
            through: models.appointment,
            foreignKey: 'hour_id',
            otherKey: 'user_id'
        })
    };
    return hour;
};
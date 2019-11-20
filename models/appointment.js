'use strict';

const Sequelize = require('sequelize')

module.exports = (sequelize, DataType) => {
    const appointment = sequelize.define('appointment', {
        id: {
            autoIncrement: true,
            type: DataType.INTEGER,
            primaryKey: true,
        },
        title: { type: DataType.STRING },
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
    appointment.associate = (models) => {
        appointment.belongsTo(models.user, {
            as: 'fromAppointmentUser',
            foreignKey: 'from_user_id',
			otherKey: 'to_user_id'
        });
        appointment.belongsTo(models.user, {
            as: 'toAppointmentUser',
            foreignKey: 'to_user_id',
			otherKey: 'from_user_id'
        });
    }
    return appointment;
};
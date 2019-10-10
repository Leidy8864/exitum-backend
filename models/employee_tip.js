'use strict'

module.exports = (sequelize, DataTypes) => {
    const employee_tip = sequelize.define('employee_tip', {
        tip_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'tip',
                key: 'id'
            },
            primaryKey: true
        },
        employee_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'employee',
                key: 'id'
            },
            primaryKey: true
        },
        checked: DataTypes.BOOLEAN
    },
    {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true

    })
    return employee_tip
};
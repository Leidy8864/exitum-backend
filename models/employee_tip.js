'use strict'

module.exports = (sequelize, DataTypes) => {
    const employee_tip = sequelize.define('employee_tip', {
        tip_id: {
            type: DataTypes.INTEGER,
            references: {
                references: {
                    model: 'tip',
                    key: 'id'
                }
            }
        },
        employee_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'employee',
                key: 'id'
            }
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
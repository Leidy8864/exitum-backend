'use strict'

module.exports = (sequelize, DataTypes) => {
    const employee_type = sequelize.define('employee_type', {
        employee_id: {
            type: DataTypes.INTEGER,
            references: {
                references: {
                    model: 'employee',
                    key: 'id'
                }
            }
        },
        type_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'type',
                key: 'id'
            }
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true

    })
    return employee_type
}
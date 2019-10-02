'use strict'

module.exports = (sequelize, DataTypes) => {
    const employee_skill = sequelize.define('employee_skill', {
        employee_id: {
            type: DataTypes.INTEGER,
            references: {
                references: {
                    model: 'employee',
                    key: 'id'
                }
            }
        },
        skill_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'skill',
                key: 'id'
            }
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
        omitNull: true
    });
    return employee_skill
}
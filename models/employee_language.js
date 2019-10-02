'use strict'

module.exports = (sequelize, DataTypes) => {
    const employee_language = sequelize.define('employee_language', {
        employee_id: {
            type: DataTypes.INTEGER,
            references: {
                references: {
                    model: 'employee',
                    key: 'id'
                }
            }
        },
        language_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'language',
                key: 'id'
            }
        },
        level_id: { 
            type: DataTypes.INTEGER,
            references: {
                model: 'level',
                key: 'id'
            }
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true

    });
    return employee_language
}

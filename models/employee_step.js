'use strict'

const model_employee = (sequelize, DataType) => {
    const employee_step = sequelize.define('employee_step', {
        employee_id: {
            type: DataType.INTEGER,
            references: {
                model: 'employee',
                key: 'id'
            }
        },
        step_id: {
            type: DataType.INTEGER,
            references: {
                model: 'step',
                key: 'id'
            }
        },
        tip_completed: DataType.INTEGER,
        icon_count_tip: DataType.STRING,
        state: {
            type: DataType.ENUM,
            values: ['completado', 'incompleto'],
            allowNull: false
        },
        date_initial: DataType.DATE
    },
        {
            freezeTableName: true,
            timestamps: false,
            omitNull: true,
            underscored: true

        });
    employee_step.associate = (models) => {
        employee_step.belongsTo(models.step, {
            foreignKey: 'step_id'
        });
    }
    return employee_step
}

module.exports = model_employee
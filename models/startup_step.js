'use strict'

const model_startup = (sequelize, DataType) => {
    const startup_step = sequelize.define('startup_step', {
        startup_id: {
            type: DataType.INTEGER,
            references: {
                model: 'startup',
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
    startup_step.associate = (models) => {
        startup_step.belongsTo(models.step, {
            foreignKey: 'step_id'
        });
    }
    return startup_step
}

module.exports = model_startup
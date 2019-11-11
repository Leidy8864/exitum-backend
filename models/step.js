'use strict'

module.exports = (sequelize, DataType) => {
    const step = sequelize.define('step', {
        id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
        icon: DataType.STRING,
        step: DataType.STRING,
        stage_id: {
            type: DataType.INTEGER,
            references: {
                model: 'stage',
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
    step.associate = (models) => {
        step.belongsTo(models.stage,{
            foreignKey : 'stage_id'
        });
        step.hasMany(models.tip, {
            foreignKey: 'step_id'
        });
        step.hasMany(models.challenge, {
            foreignKey: 'step_id'
        });
        step.hasMany(models.startup_step, {
            foreignKey: 'step_id'
        });
        step.hasMany(models.employee_step, {
            foreignKey: 'step_id'
        });
    }
    return step
};
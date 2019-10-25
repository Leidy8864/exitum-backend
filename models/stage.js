'use strict'

module.exports = (sequelize, DataType) => {
    const stage = sequelize.define('stage', {
        id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
        stage: DataType.STRING,
        description: DataType.TEXT,
        type: {
            type: DataType.ENUM,
            values: ['startup', 'employee'],
            allowNull: false
        },
    },
        {
            freezeTableName: true,
            timestamps: false,
            omitNull: true,
            underscored: true

        });
    stage.associate = (models) => {
        stage.hasMany(models.startup, {
            foreignKey: 'stage_id'
        });
        stage.hasMany(models.step, {
            foreignKey: 'stage_id'
        });
        stage.hasMany(models.employee, {
            foreignKey: 'stage_id'
        });
        stage.hasMany(models.challenge, {
            foreignKey: 'stage_id'
        });
    }
    return stage
};
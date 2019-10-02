'use strict'

module.exports = (sequelize, DataType) => {
    const stage = sequelize.define('stage', {
        id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
        stage: DataType.STRING,
        description: DataType.TEXT,
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
        stage.hasMany(models.tip,{
            foreignKey : 'stage_id'
        });
        stage.hasMany(models.employee, {
            foreignKey: 'stage_id'
        });
    }
    return stage
};
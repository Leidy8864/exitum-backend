'use strict'

module.exports = (sequelize, DataType) => {
    const tip = sequelize.define('tip', {
        id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
        tip: DataType.STRING,
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
    tip.associate = (models) => {
        tip.belongsToMany(models.startup, {
            through: 'startup_tip',
            foreignKey: 'tip_id'
        });
        tip.belongsTo(models.stage,{
            foreignKey : 'stage_id'
        });
        tip.belongsToMany(models.employee,{
            through : 'employee_tip',
            foreignKey : 'tip_id'
        });
    }
    return tip
};
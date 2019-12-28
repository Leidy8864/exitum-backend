'use strict'

module.exports = (sequelize, DataType) => {
    const tip = sequelize.define('tip', {
        id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
        tip: DataType.STRING,
        description: DataType.STRING,
        step_id: {
            type: DataType.INTEGER,
            references: {
                model: 'step',
                key: 'id'
            }
        },
        type: DataType.STRING,
        duration_days: DataType.INTEGER
    },
    {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true
    });
    tip.associate = (models) => {
        tip.hasMany(models.challenge, {
            foreignKey: 'tip_id'
        });
        tip.hasMany(models.file_tip, {
            foreignKey: 'tip_id'
        });
        tip.belongsTo(models.step, {
            foreignKey: 'step_id'
        });
        tip.belongsToMany(models.skill, {
            as: { singular: 'skill', plural: 'skills' },
            through: models.tip_skill,
            foreignKey: 'tip_id',
            otherKey: 'skill_id'
        });
        tip.hasMany(models.tip_skill, {
            foreignKey: 'tip_id'
        })
        tip.belongsToMany(models.category, {
            as: { singular: 'category', plural: 'categories' },
            through: models.tip_category,
            foreignKey: 'tip_id',
            otherKey: 'category_id'
        });
        tip.hasMany(models.tip_category, {
            foreignKey: 'tip_id'
        })
        // tip.belongsToMany(models.employee, {
        //     through: 'employee_tip',
        //     foreignKey: 'tip_id'
        // });
        // tip.belongsToMany(models.startup, {
        //     through: 'startup_tip',
        //     foreignKey: 'tip_id'
        // });
        
    }
    return tip
};
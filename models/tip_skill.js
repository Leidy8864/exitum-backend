'use strict'

module.exports = (sequelize, DataType) => {
    const tip_skill = sequelize.define('tip_skill', {
        tip_id: {
            type: DataType.INTEGER,
            references: {
                model: 'tip',
                key: 'id'
            },
            primaryKey: true
        },
        skill_id: {
            type: DataType.INTEGER,
            references: {
                model: 'skill',
                key: 'id'
            },
            primaryKey: true
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        underscored: true

    });
    tip_skill.associate = function (models) {
        tip_skill.belongsTo(models.tip, {
            foreignKey: 'tip_id'
        });
        tip_skill.belongsTo(models.skill, {
            foreignKey: 'skill_id'
        });
    };
    return tip_skill
}

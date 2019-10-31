'use strict'

module.exports = (sequelize, DataTypes) => {
    const skill_user = sequelize.define('skill_user', {
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                references: {
                    model: 'user',
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
    skill_user.associate = function (models) {
        skill_user.belongsTo(models.skill, {
            foreignKey: 'skill_id'
        });
    };
    return skill_user
}
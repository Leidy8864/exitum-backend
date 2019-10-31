'use strict'

module.exports = (sequelize, DataTypes) => {
    const advertisement_skill = sequelize.define('advertisement_skill', {
        advertisement_id: {
            type: DataTypes.INTEGER,
            references: {
                references: {
                    model: 'advertisement_skill',
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
    advertisement_skill.associate = function (models) {
        advertisement_skill.belongsTo(models.skill, {
            foreignKey: 'skill_id'
        });
    };
    return advertisement_skill
}